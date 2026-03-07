import logger from "@libresuite/logger";
import type { Service } from "@libresuite/types";
import { GenericError } from "@libresuite/types";
import { createProxyMiddleware } from "http-proxy-middleware";
import { config } from "@/lib";

function createServiceProxy(service: Service) {
  return createProxyMiddleware({
    target: `${service.host}:${service.port}`,
    changeOrigin: config.proxyOptions.changeOrigin,
    timeout: config.proxyOptions.timeout,
    proxyTimeout: config.proxyOptions.proxyTimeout,
    pathRewrite: { [service.route]: "" },
    on: {
      proxyReq: (proxyReq, req) => {
        const body = (req as { body?: unknown }).body;
        if (!body) return;

        const contentType = String(proxyReq.getHeader("Content-Type") ?? "");
        let bodyData: string | undefined;

        if (contentType.includes("application/json")) {
          bodyData = typeof body === "string" ? body : JSON.stringify(body);
        } else if (contentType.includes("application/x-www-form-urlencoded")) {
          bodyData = typeof body === "string" ? body : new URLSearchParams(body as Record<string, string>).toString();
        }

        if (!bodyData) return;

        proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
      },
      error: (error) => {
        logger.error({
          message: `Proxy error → ${service.name} (error: ${error})`,
          status: 502,
          owner: config.name,
        });
        return new GenericError(`Proxy error → ${service.name}`, "ERROR_MESSAGES.INTERNAL_SERVER_ERROR.code", 500);
      },
    },
  });
}

export default createServiceProxy;

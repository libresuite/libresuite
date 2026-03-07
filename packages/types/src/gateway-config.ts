import type Service from "./service";
import type ServiceConfig from "./service-config";

type GatewayConfig = ServiceConfig & {
  services: Service[];
  proxyOptions: {
    changeOrigin: boolean;
    timeout: number;
    proxyTimeout: number;
  };
};

export default GatewayConfig;

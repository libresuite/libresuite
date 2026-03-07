import type Middleware from "./middleware";
import type Route from "./route";

type ServiceConfig = {
  host: string;
  port: number;
  name: string;
  middlewares?: {
    pre: Middleware[];
    post: Middleware[];
  };
  routes?: Route[];
  databaseUrl?: string;
  kafkaBrokers?: string[];
};

export default ServiceConfig;

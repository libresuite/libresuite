import Env from "@libresuite/env";
import Logger from "@libresuite/logger";
import app from "@/app";

const env = new Env();

env.load();

const port = env.get("PORT", "number");
const name = env.get("NAME", "string");

app.listen(port, () => {
  Logger.info({
    message: `Server is running on port ${port}`,
    owner: name,
  });
});

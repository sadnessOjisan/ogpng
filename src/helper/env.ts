import { EnvType } from "../types/util/env";

export default (): EnvType => {
  // vercelの環境変数VERCEL_ENVで 'development', 'production', 'test' を指定する
  const env = process.env.DEPLOY_ENV;
  if (env !== "development" && env !== "production" && env !== "test") {
    throw new Error("invalid env");
  }
  return env;
};

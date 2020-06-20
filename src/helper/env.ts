import { EnvType } from "../types/util/env";

export default (): EnvType => {
  // vercelの環境変数VERCEL_ENVで 'development', 'production', 'test' を指定する
  const env = process.env.NEXT_PUBLIC_DEPLOY_ENV;
  console.log(
    "process.env.NEXT_PUBLIC_DEPLOY_ENV",
    process.env.NEXT_PUBLIC_DEPLOY_ENV
  );
  if (env !== "development" && env !== "production" && env !== "test") {
    console.log("process.env.NODE_ENV", process.env.NODE_ENV);
    return process.env.NODE_ENV;
  }
  return env;
};

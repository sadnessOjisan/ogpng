import { EnvType } from "../types/util/env";

export default (): EnvType => {
  // vercelの環境変数VERCEL_ENVで 'development', 'production', 'test' を指定する
  const env = process.env.NEXT_PUBLIC_DEPLOY_ENV;
  //@ts-ignore
  return env || "production";
};

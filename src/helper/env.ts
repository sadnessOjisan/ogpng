import { EnvType } from "../types/util/env";

export default (): EnvType => {
  // vercelの環境変数VERCEL_ENVで 'development', 'production', 'test' を指定する
  return process.env.NODE_ENV;
};

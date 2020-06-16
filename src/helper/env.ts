import { EnvType } from "../types/util/env";

export default (): EnvType => {
  // vercelの環境変数VERCEL_ENVで 'development', 'production', 'test' を指定する
  console.log(process.env);
  console.log("NODE_ENV", process.env.NODE_ENV);
  return process.env.NODE_ENV;
};

import gcsPath from "../constatns/gcsPath";
import { EnvType } from "../types/util/env";

export default (pid: string, env: EnvType) => {
  if (env === "test") {
    throw new Error("いまはtest環境は使っていない");
  }
  return gcsPath[env];
};

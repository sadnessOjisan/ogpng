import { EnvType } from "../types/util/env";
import hostingURL from "../constatns/hostingURL";

export default (env: EnvType) => {
  if (env === "test") {
    throw new Error("いまはtest環境は使っていない");
  }
  return hostingURL[env];
};

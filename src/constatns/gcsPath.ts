import { EnvType } from "../types/util/env";

const gscPath: { [key in EnvType]: string } = {
  development: "https://storage.cloud.google.com/ogpng-dev-ca280.appspot.com",
  production: "",
  test: "",
};

export default gscPath;

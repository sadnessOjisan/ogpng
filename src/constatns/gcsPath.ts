import { EnvType } from "../types/util/env";

const gscPath: { [key in EnvType]: string } = {
  development: "https://storage.googleapis.com/ogpng-dev-ca280.appspot.com",
  production: "https://storage.googleapis.com/ogpng-fed0a.appspot.com",
  test: "https://storage.googleapis.com/ogpng-dev-ca280.appspot.com",
};

export default gscPath;

import { EnvType } from "../types/util/env";

const hostingURL: { [key in EnvType]: string } = {
  development: "https://dev.ogpng.vercel.app",
  production: "https://ogpng.vercel.app",
  test: "https://test.ogpng.vercel.app",
};

export default hostingURL;

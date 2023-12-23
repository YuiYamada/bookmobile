import { defineConfig } from "$fresh/server.ts";
import twindPlugin from "$fresh/plugins/tailwind.ts";
import twindConfig from "./tailwind.config.ts";

export default defineConfig({
  plugins: [twindPlugin(twindConfig)],
});

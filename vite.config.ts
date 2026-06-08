import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: {
    preset: "vercel",
    force: true,
    vercel: {
      functionName: "__server",
    },
  },
  tanstackStart: {
    server: { entry: "server" },
  },
});
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { generateSitemap } = require("./scripts/generate-sitemap.cjs");

function dynamicSitemapPlugin(apiBaseUrl?: string) {
  return {
    name: "dynamic-sitemap-middleware",
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        const url = req.url ? req.url.split("?")[0] : "";
        if (url === "/sitemap.xml" || url === "/sitemap") {
          try {
            const xml = await generateSitemap(apiBaseUrl);
            res.setHeader("Content-Type", "application/xml; charset=utf-8");
            res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
            return res.end(xml);
          } catch (err) {
            console.error("[SITEMAP] Dynamic generation error:", err);
            next();
          }
        } else {
          next();
        }
      });
    },
    configurePreviewServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        const url = req.url ? req.url.split("?")[0] : "";
        if (url === "/sitemap.xml" || url === "/sitemap") {
          try {
            const xml = await generateSitemap(apiBaseUrl);
            res.setHeader("Content-Type", "application/xml; charset=utf-8");
            return res.end(xml);
          } catch (err) {
            next();
          }
        } else {
          next();
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const PORT = Number(env.VITE_PORT);
  const API_BASE_URL = env.VITE_API_BASE_URL;

  return {
    plugins: [react(), tailwindcss(), dynamicSitemapPlugin(API_BASE_URL)],
    server: {
      port: PORT,
      proxy: {
        "/api": {
          target: API_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },

    preview: {
      port: PORT,
      strictPort: true,
    },
    define: {
      "process.env.VITE_API_BASE_URL": JSON.stringify(API_BASE_URL),
    },
  };
});

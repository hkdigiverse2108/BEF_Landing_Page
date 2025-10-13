import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const PORT = Number(env.VITE_PORT);
  const API_BASE_URL = env.VITE_API_BASE_URL;

  return {
    plugins: [react(), tailwindcss()],
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
    define: {
      "process.env.VITE_API_BASE_URL": JSON.stringify(API_BASE_URL),
    },
  };
});

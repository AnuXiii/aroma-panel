import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	plugins: [tailwindcss()],
	appType: "spa",
	base: "/",
	server: {
		open: true,
	},
	build: {
		rollupOptions: {
			input: {
				main: "./index.html",
			},
		},
		assetsDir: "assets",
	},
});

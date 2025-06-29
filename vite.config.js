import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
	plugins: [tailwindcss()],
	base: "/",
	build: {
		rollupOptions: {
			input: {
				main: "./index.html",
				home: "./src/pages/home.html",
				gallery: "./src/pages/gallery.html",
				menu: "./src/pages/menu.html",
				menuItem: "./src/pages/menu-item.html",
				published: "./src/pages/published.html",
				login: "./src/pages/login.html",
			},
		},
	},
});

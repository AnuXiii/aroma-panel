import Toast from "./components/Toast";
import FormController from "./utils/FormController";

class Router {
	constructor(routes) {
		this.routes = routes;
		this.currentPath = window.location.pathname;

		// Add event listener for popstate (browser back/forward)
		window.addEventListener("popstate", () => this.handleRoute());

		// Add click event listener to navigation links
		document.addEventListener("click", (e) => {
			if (e.target.closest(".router-link")) {
				e.preventDefault();
				const link = e.target.closest(".router-link");
				const href = link.getAttribute("href");
				this.navigate(href);
			}
		});

		// Initial route
		this.handleRoute();
	}

	async handleRoute() {
		const path = window.location.pathname;
		const route = this.routes.find((route) => route.path === path);

		try {
			// insert fetched data on this variable
			let content;

			if (path === "/") {
				// Load home page content
				const response = await fetch("/src/pages/home.html");
				content = await response.text();
			} else if (route) {
				// Load menu content
				const response = await fetch(`/src/pages${route.path}.html`);
				content = await response.text();
			} else {
				// Fallback to home page
				const response = await fetch("/src/pages/home.html");
				content = await response.text();
			}

			// Update content
			document.querySelector("main").innerHTML = content;
			// init form controller
			FormController();
			//

			// Update active link in navigation
			document.querySelectorAll(".router-link").forEach((link) => {
				link.classList.remove("active");
				if (link.getAttribute("href") === path) {
					link.classList.add("active");
				}
			});
		} catch (error) {
			Toast("صفحه بارگزاری نشد", "bg-rose-500");
		}
	}

	navigate(path) {
		window.history.pushState({}, "", path);
		this.handleRoute();
	}
}

export default Router;

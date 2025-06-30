import Toast from "./components/Toast";
import { FormController } from "./utils/FormController";
import { initPublishedCategories } from "./utils/getAllCategoreis";
import { checkLogin, loginController } from "./login";
import Loader from "./components/Loader";
import { account } from "./appwriteClinet";

// Import new components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Gallery from "./pages/Gallery";
import Menu from "./pages/Menu";
import MenuItem from "./pages/MenuItem";
import Published from "./pages/Published";

const getUsername = async () => {
	try {
		const user = await account.get();
		return user.name || "ناشناس";
	} catch (error) {
		return "ناشناس";
	}
};

const createSuccessContent = async () => {
	const username = await getUsername();

	return `
		<section class="section flex-center gap-8 flex-col">
			<c-title
				data-title="کاربر ${username} خوش آمدید"
				data-sub-title="">
			</c-title>
			<div class="text-center">
				<div class="bg-green-500/10 border border-green-500/30 rounded-lg py-6 px-10 mb-6">
					<ion-icon name="checkmark-circle" class="text-4xl text-green-500 mb-4"></ion-icon>
					<h3 class="text-xl font-semibold text-green-400 mb-2">ورود موفقیت آمیز بود</h3>
				</div>
			</div>
		</section>
	`;
};

class Router {
	constructor(routes) {
		this.routes = routes;
		this.init();

		// Add click event listener to navigation links
		document.addEventListener("click", (e) => {
			if (e.target.closest(".router-link")) {
				e.preventDefault();
				const link = e.target.closest(".router-link");
				const href = link.getAttribute("href");
				this.navigate(href);
			}
		});
	}

	async init() {
		const isLoggedIn = await checkLogin();

		if (!isLoggedIn && window.location.pathname !== "/login") {
			window.location.href = "/login";
			return;
		}

		if (isLoggedIn && window.location.pathname === "/login") {
			window.location.href = "/home";
			return;
		}

		// Initial route
		this.handleRoute();
		// Add event listener for popstate (browser back/forward)
		window.addEventListener("popstate", () => this.handleRoute());
	}

	async handleRoute() {
		const path = window.location.pathname;
		// const route = this.routes.find((route) => route.path === path);

		if (path !== "/login" && path !== "/") {
			const isLoggedIn = await checkLogin();
			if (!isLoggedIn) {
				window.location.href = "/login";
				return;
			}
		}

		try {
			// insert fetched data on this variable
			let content;
			Loader(document.querySelector(".wrapper-inner"), true);

			if (path === "/") {
				content = Home();
			} else if (path === "/login") {
				const isLoggedIn = await checkLogin();
				if (isLoggedIn) {
					content = await createSuccessContent();
				} else {
					content = Login();
					Toast(`لطفا وارد حساب کاربر خود شوید`, "bg-rose-500");
				}
			} else if (path === "/gallery") {
				content = Gallery();
			} else if (path === "/menu") {
				content = Menu();
			} else if (path === "/menu-item") {
				content = MenuItem();
			} else if (path === "/published") {
				content = Published();
			} else {
				content = Home();
			}

			// Update content
			document.querySelector("main").innerHTML = content;

			// Initialize page-specific functionality
			if (path === "/published") {
				initPublishedCategories();
			}

			// Update active link in navigation
			document.querySelectorAll(".router-link").forEach((link) => {
				link.classList.remove("active");
				if (link.getAttribute("href") === path) {
					link.classList.add("active");

					// every time when page changed we are running FormController function
					FormController();

					// run login controller when user trying to log in into the account
					loginController();

					// reset the navgiation buttons and navigation when page is changed
					document.querySelector(".nav-button").firstElementChild.classList.remove("hidden");
					document.querySelector(".nav-button").lastElementChild.classList.add("hidden");
					document.querySelector(".navigation").classList.remove("active");
				}
			});
		} catch (error) {
			Toast("صفحه بارگزاری نشد", "bg-rose-500");
		}

		Loader(document.querySelector(".wrapper-inner"), false);
	}

	async navigate(path) {
		// بررسی احراز هویت قبل از navigation
		if (path !== "/login" && path !== "/") {
			const isLoggedIn = await checkLogin();
			if (!isLoggedIn) {
				window.location.href = "/login";
				return;
			}
		}

		window.history.pushState({}, "", path);
		this.handleRoute();
	}
}

export default Router;

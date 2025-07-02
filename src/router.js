import Toast from "./components/Toast";
import { FormController } from "./utils/FormController";
import { initPublishedCategories } from "./utils/getAllCategoreis";
import { checkLogin, loginController } from "./login";
import { Loader } from "./components/Loader";
import { account } from "./appwriteClinet";
import { initDescGenerator } from "./utils/descGenerator";

// Import pages components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Gallery from "./pages/Gallery";
import Menu from "./pages/Menu";
import MenuItem from "./pages/MenuItem";
import Published from "./pages/Published";

// get current user name from appwrite account
const getUsername = async () => {
	try {
		const user = await account.get();
		return user.name || "ناشناس";
	} catch (error) {
		return "ناشناس";
	}
};

// Create Success message on login page
const createSuccessContent = async () => {
	// get current user name from getUsername() function
	const username = await getUsername();
	return `
		<section class="section flex-center gap-8 flex-col">
			<c-title
				data-title="کاربر ${username /* res => admin... */} خوش آمدید"
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

// Error Message generator when page is not loading or invalid URL
const createErrorPage = () => {
	return `
		<c-title></c-title>
		<div class="section flex-center flex-col gap-9 fade-in">
			<img src="/images/404-error.svg" alt="404 error" loading="lazy" class="w-full h-112"/>
			<h1 class="font-bold text-2xl text-center text-rose-500">متاسفانه صفحه فوق بارگزاری نشد</h1>
		</div>
	`;
};

class Router {
	constructor() {
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

		// Handle browser back/forward buttons
		window.addEventListener("popstate", () => this.handleRoute());
	}

	async init() {
		const isLoggedIn = await checkLogin();
		const path = window.location.pathname;

		if (!isLoggedIn && path !== "/login") {
			this.navigate("/login");
			return;
		}

		if (isLoggedIn && path === "/login") {
			this.navigate("/home");
			return;
		}

		// Initial route
		this.handleRoute();
	}

	async handleRoute() {
		const path = window.location.pathname;

		if (path !== "/login" && path !== "/" && path !== "/home") {
			const isLoggedIn = await checkLogin();
			if (!isLoggedIn) {
				this.navigate("/login");
				return;
			}
		}

		try {
			Loader(document.querySelector(".wrapper-inner"), true);
			let content;

			// Normalize path
			const normalizedPath = path === "/" ? "/home" : path;

			switch (normalizedPath) {
				case "/home":
					content = Home();
					document.title = "Home";
					break;
				case "/login":
					const isLoggedIn = await checkLogin();
					// if user is logged in account when clicked to login page show success message and welcome
					if (isLoggedIn) {
						content = await createSuccessContent();
						document.title = "Welcome";
					} else {
						content = Login();
						document.title = "Login";
						setTimeout(() => Toast(`لطفا وارد حساب کاربری خود شوید`, "bg-rose-500"), 1000);
					}
					break;
				case "/gallery":
					content = Gallery();
					document.title = "Gallery";
					break;
				case "/menu":
					content = Menu();
					document.title = "Menu";
					break;
				case "/menu-item":
					content = MenuItem();
					document.title = "Menu Item";
					break;
				case "/published":
					content = Published();
					document.title = "Published";
					break;
				default:
					content = Home();
			}

			// Update content
			document.querySelector("main").innerHTML = content;

			// Initialize page-specific functionality
			if (normalizedPath === "/published") {
				initPublishedCategories();
			}

			if (normalizedPath === "/published" || "/menu-item") {
				initDescGenerator();
			}

			// Update active link in navigation
			document.querySelectorAll(".router-link").forEach((link) => {
				link.classList.remove("active");
				if (link.getAttribute("href") === normalizedPath) {
					link.classList.add("active");

					// every time when page changed we are running FormController function
					FormController();

					// run login controller when user trying to log in into the account
					loginController();

					// reset the navigation buttons and navigation when page is changed
					document.querySelector(".nav-button").firstElementChild.classList.remove("hidden");
					document.querySelector(".nav-button").lastElementChild.classList.add("hidden");
					document.querySelector(".navigation").classList.remove("active");
				}
			});
		} catch (error) {
			Toast("صفحه بارگزاری نشد", "bg-rose-500");
			document.querySelector("main").innerHTML = createErrorPage();
		}

		Loader(document.querySelector(".wrapper-inner"), false);
	}

	navigate(path) {
		window.history.pushState({}, "", path);
		this.handleRoute();
	}
}

export default Router;

import { account } from "./appwriteClinet";
import Toast from "./components/Toast";
import { submitStatusController } from "./utils/FormController";

async function checkLogin() {
	try {
		await account.get();

		return true;
	} catch (error) {
		return false;
	}
}

async function loginUser(email, password) {
	const submitBtn = document.querySelector(".btn-submit");
	try {
		submitStatusController(submitBtn, true, "", "add");
		await account.createEmailPasswordSession(email, password);
		window.location.href = "/";
	} catch (error) {
		submitStatusController(submitBtn, false, "ورود", "");
		if (error.code == 429) {
			Toast("تعداد درخواست غیر مجاز", "bg-rose-500");
			return;
		}
		Toast("ایمیل یا رمز عبور اشتباه است", "bg-rose-500");
	}
}

async function loginController() {
	const loginForm = document.getElementById("login-form");

	if (loginForm) {
		loginForm.addEventListener("submit", (e) => {
			e.preventDefault();

			const email = document.getElementById("email").value;
			const password = document.getElementById("password").value;

			loginUser(email, password);
		});
	}
}

export { checkLogin, loginController };

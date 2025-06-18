import Toast from "../components/Toast";

function submitStatusController(state, text, action) {
	const submitBtn = document.querySelector(".btn-submit");

	if (submitBtn) {
		submitBtn.disabled = state;
		submitBtn.textContent = text;
		action === "add" ? submitBtn.classList.add("loading") : submitBtn.classList.remove("loading");
	}
}

function FormController() {
	const form = document.querySelector(".form");

	if (!form) return;

	form.addEventListener("submit", async (e) => {
		e.preventDefault();

		const formData = new FormData(form);
		const data = Object.fromEntries(formData.entries());

		const inputs = form.querySelectorAll(".input");
		const hasEmpty = [...inputs].some((input) => input.value.trim() === "");

		if (hasEmpty) {
			Toast("لطفا تمامی ورودی‌ ها را پر کنید", "bg-rose-500");
			return;
		}

		try {
			submitStatusController(true, "", "loading");

			const response = await fetch(`http://localhost:3000/${form.getAttribute("id")}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (response.ok) {
				Toast("فرم با موفقیت ثبت شد", "bg-green-500");
				form.reset();
			} else {
				Toast("خطا در ارسال فرم", "bg-rose-500");
				submitStatusController(false, "ارسال", "");
			}
		} catch (error) {
			Toast("مشکلی رخ داد", "bg-rose-500");
			submitStatusController(false, "ارسال", "");
		} finally {
			submitStatusController(false, "ارسال", "");
		}
	});
}

export default FormController;

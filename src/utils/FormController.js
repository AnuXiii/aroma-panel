import Toast from "../components/Toast";

function submitStatusController(target, status, text, action) {
	if (target) {
		target.disabled = status;
		target.textContent = text;
		action === "add" ? target.classList.add("loading") : target.classList.remove("loading");
	}
}

function FormController() {
	const form = document.querySelector(".form");
	if (!form) return;

	form.addEventListener("submit", (e) => {
		e.preventDefault();
	});

	const submitBtn = document.querySelector(".btn-submit");
	submitBtn.addEventListener("click", async (e) => {
		const formData = new FormData(form);
		const data = Object.fromEntries(formData.entries());

		const inputs = form.querySelectorAll(".input");
		const hasEmpty = [...inputs].some((input) => input.value.trim() === "");

		if (hasEmpty) {
			Toast("لطفا تمامی ورودی‌ ها را پر کنید", "bg-rose-500");
			return;
		}

		try {
			submitStatusController(submitBtn, true, "", "loading");

			const response = await fetch(`http://localhost:3000/${form.getAttribute("id")}`, {
				method: "POST",
				body: JSON.stringify(data),
			});

			if (response.ok) {
				Toast("فرم با موفقیت ثبت شد", "bg-green-500");
				form.reset();
			} else {
				Toast("خطا در ارسال فرم", "bg-rose-500");
				submitStatusController(submitBtn, false, "ارسال", "");
			}
		} catch (error) {
			Toast("مشکلی رخ داد", "bg-rose-500");
			submitStatusController(submitBtn, false, "ارسال", "");
		} finally {
			submitStatusController(submitBtn, false, "ارسال", "");
		}
	});
}

export default FormController;

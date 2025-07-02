import Toast from "../components/Toast";

const geminiApiKey = import.meta.env.VITE_APP_GEMINI_API_KEY;

function initDescGenerator() {
	const generateDescBtn = document.getElementById("generate-desc");
	if (generateDescBtn) {
		generateDescBtn.addEventListener("click", generateDescription);
	}
}

async function generateDescription(e) {
	const generateDescBtn = e.target;
	if (!generateDescBtn) return;

	const titleInput = document.getElementById("title");
	const title = titleInput?.value.trim();

	if (!title) {
		Toast("لطفا ابتدا نام محصول را وارد کنید", "bg-rose-500");
		return;
	}

	generateDescBtn.classList.add("active");
	generateDescBtn.textContent = "در حال تولید...";

	try {
		const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`;
		const prompt = `یک توضیح کوتاه و جذاب درباره محصولی به نام «${title}» بنویس که در یک کافه سرو می‌شود. توضیحات باید حداکثر 180 کاراکتر باشد و حداقل 150 کاراکتر و مشتری را به امتحان کردن این محصول ترغیب کند.`;

		const response = await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				contents: [{ parts: [{ text: prompt }] }],
			}),
		});

		if (!response.ok) {
			Toast("خطا در بر قراری ارتباط با سرور", "bg-rose-500");
		}

		const data = await response.json();
		const description = data.candidates[0].content.parts[0].text;
		const descTextarea = document.getElementById("desc");

		if (descTextarea) {
			descTextarea.value = "";
			descTextarea.value = description;
			Toast("توضیحات با موفقیت تولید شد", "bg-green-500");
		}
	} catch (error) {
		Toast("خطایی در تولید توضیحات رخ داد", "bg-rose-500");
	} finally {
		generateDescBtn.classList.remove("active");
		generateDescBtn.textContent = "تولید خودکار";
	}
}

export { initDescGenerator };

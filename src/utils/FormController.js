import Toast from "../components/Toast";
import { storage, db, BUCKET_ID, DB_ID } from "../appwriteClinet";

// Getting the IDs for each database section
const GALLERY_COLS_ID = import.meta.env.VITE_APPWRITE_GALLERY_COLS_ID;
const MENUS_ID = import.meta.env.VITE_APPWRITE_MENU_ID;
const MENUS_ITEMS_ID = import.meta.env.VITE_APPWRITE_ITEMS_ID;

// submit controller for submit button element when data is sending & wating & ending
function submitStatusController(target, status, text, action) {
	if (target) {
		target.disabled = status;
		target.textContent = text;
		action === "add" ? target.classList.add("loading") : target.classList.remove("loading");
	}
}

// handler for remove image on upload section and select default value of select box
function formResetor() {
	document.querySelector(".img-preview").classList.add("hidden");
	document.querySelector(".selected-display span").textContent = "انتخاب کنید";
}

// mapping all form IDs
const formMap = {
	gallery: GALLERY_COLS_ID,
	menu: MENUS_ID,
	items: MENUS_ITEMS_ID,
};

/* the form controller handle the form submitting / send data - upload file to storage / catch errors 
=> running if page in the current page has element have .form class */
function FormController() {
	const form = document.querySelector(".form");
	if (!form) return;

	// form id === formMap[item]
	const formId = form.getAttribute("id");
	const collectionId = formMap[formId];
	const submitBtn = form.querySelector(".btn-submit");

	form.addEventListener("submit", async (e) => {
		e.preventDefault();

		// control empty inputs when form is submitted
		const inputs = form.querySelectorAll(".input");
		// output => true or false
		const hasEmpty = [...inputs].some((input) => input.value.trim() === "");
		if (hasEmpty) {
			Toast("لطفا تمامی ورودی‌ها را پر کنید", "bg-rose-500");
			return;
		}

		// catch the file and send it
		const formData = new FormData(form);
		const data = Object.fromEntries(formData.entries());

		const fileInput = form.querySelector("input[type='file']");
		const file = fileInput?.files[0];

		try {
			submitStatusController(submitBtn, true, "", "add");

			// upload file on appwrite storage
			let uploadedFile;
			const uniqueID = `${formId}-${Date.now()}`;
			if (file) {
				const result = await storage.createFile(BUCKET_ID, uniqueID, file);
				uploadedFile = result.$id;
				data.image = uploadedFile;
			}

			// sign and create data in database with unique id
			await db.createDocument(DB_ID, collectionId, uniqueID, data);

			Toast("اطلاعات با موفقیت ارسال شد", "bg-green-500");

			// reset the all form inputs and remove preview image from upload section and select default value on select box
			form.reset();
			formResetor();
		} catch (error) {
			if (error.code == 401) {
				Toast("نیاز به دسترسی ادمین", "bg-rose-500");
				return;
			}
			Toast("پاسخی از سرور دریافت نشد", "bg-rose-500");
		} finally {
			submitStatusController(submitBtn, false, "ارسال", "");
		}
	});
}

export { FormController, submitStatusController, formResetor, formMap };

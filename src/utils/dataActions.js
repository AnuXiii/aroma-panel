import Toast from "../components/Toast";
import { DB_ID, storage, BUCKET_ID, db } from "../appwriteClinet";
import { submitStatusController, formResetor, formMap } from "./FormController";
import Loader from "../components/Loader";

// used in edit item function
const MENUS_ITEMS_ID = import.meta.env.VITE_APPWRITE_ITEMS_ID;

// delete item handler
async function deleteItem(tr) {
	// get the target element for removing on database and ui
	const id = tr.getAttribute("id");
	// split the target element with (-) sign and get first element from array
	const dbTarget = id.split("-")[0];

	try {
		// trying to remove the target element from ui and database
		// trying to remove the target element image from ui and storage
		Loader(tr, true);
		await db.deleteDocument(DB_ID, formMap[dbTarget], id);
		await storage.deleteFile(BUCKET_ID, id);

		// remove from ui with smoth transition
		if (document.startViewTransition) {
			document.startViewTransition(() => {
				tr.remove();
			});
		} else {
			tr.remove();
		}
	} catch (error) {
		// if target element is not deleted show Toast message and also in console
		if (error.code == 401) {
			Toast("نیاز به دسترسی ادمین", "bg-rose-500");
			Loader(tr, false);
			return;
		}
		Toast("لطفا دوباره امتحان کنید", "bg-rose-500");
	}
}

// edit item handler
async function editItem(tr) {
	// get the target element for editing on database and ui
	const id = tr.getAttribute("id");
	// get the target element title
	const currentTitle = tr.querySelector(".td-title");

	const editModal = document.getElementById("editModal");
	// show modal
	editModal.classList.remove("hidden");

	// if click outside of modal then closed
	editModal.addEventListener("click", (e) => {
		if (!e.target.closest(".modal-content")) {
			editModal.classList.add("hidden");
		}
	});

	// if click close button modal closed
	const closeModal = document.getElementById("closeModal");
	closeModal.addEventListener("click", () => {
		editModal.classList.add("hidden");
	});

	const form = document.getElementById("items");
	const imageInput = document.getElementById("image");
	const submitBtn = document.querySelector(".btn-submit");

	form.addEventListener("submit", async (e) => {
		e.preventDefault();

		// control empty inputs when form is submitted same as in FormController file
		const inputs = form.querySelectorAll(".input");
		const hasEmpty = [...inputs].some((input) => input.value.trim() === "");
		if (hasEmpty) {
			Toast("لطفا تمامی ورودی‌ها را پر کنید", "bg-rose-500");
			return;
		}

		// get the form data
		const formData = new FormData(form);
		const newImage = imageInput.files[0];
		const data = {};

		/* This code will take all the form data (except the field with name="image") 
		from the FormData object and store it in the data object. */
		for (let [key, value] of formData.entries()) {
			if (key !== "image") {
				data[key] = value;
			}
		}

		try {
			submitStatusController(submitBtn, true, "", "add");

			// update the target document passing database id , collection id , target id and new data from form
			await db.updateDocument(DB_ID, MENUS_ITEMS_ID, id, data);

			// if image is existing
			if (newImage) {
				// Delete old file
				await storage.deleteFile(BUCKET_ID, id);
				// Upload new file with same id
				await storage.createFile(BUCKET_ID, id, newImage);
				// Update target element img src
				const img = tr.querySelector("img");
				img.src = URL.createObjectURL(newImage);
			}

			// Update target element text title
			currentTitle.textContent = data.title || currentTitle.textContent;

			// All operations are reset
			editModal.classList.add("hidden");
			Toast("محصول با موفقیت ویرایش شد", "bg-green-500");
			form.reset();
			formResetor();
		} catch (error) {
			if (error.code == 401) {
				Toast("نیاز به دسترسی ادمین", "bg-rose-500");
				return;
			}
			Toast("خطا در ویرایش محصول", "bg-rose-500");
		} finally {
			submitStatusController(submitBtn, false, "ویرایش", "");
		}
	});
}

export { deleteItem, editItem };

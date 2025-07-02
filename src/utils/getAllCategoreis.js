import Toast from "../components/Toast";
import { db, DB_ID, getImageUrl, Query } from "../appwriteClinet";
import { Loader, ImageLoader } from "../components/Loader";
import { formMap } from "./FormController";
import { deleteItem, editItem } from "./dataActions";
import { searchItemByName } from "./search";

// data title Fields map
const titleFieldMap = {
	gallery: "col",
	menu: "menu-title",
	items: "title",
};

// initsialize published categoreis when window is loaded in /published page
function initPublishedCategories() {
	const publishedCategoreis = document.querySelector(".published-categoreis");
	const sortOptions = document.querySelector(".options-list");

	if (!publishedCategoreis) return;

	let currentCollectionId;
	let currentDbTarget;
	let currentSortQuery = [Query.orderDesc("$id")];

	publishedCategoreis.addEventListener("click", (e) => {
		const validTarget = e.target.closest(".get-category-btn");

		if (!validTarget) return;

		if (publishedCategoreis.querySelector(".active")) {
			publishedCategoreis.querySelector(".active").classList.remove("active");
		}

		validTarget.classList.add("active");
		currentDbTarget = validTarget.getAttribute("data-db");
		currentCollectionId = formMap[currentDbTarget];

		// show current data function with current collection ID and database Target
		showData(currentCollectionId, currentDbTarget, currentSortQuery);
	});

	// sort data by custom select box value when clicked each item
	sortOptions.addEventListener("click", (e) => {
		const validTarget = e.target.closest("li");

		if (!validTarget) return;

		const value = validTarget.dataset.value;

		if (value === "newset") {
			currentSortQuery = [Query.orderDesc("$id")];
		} else if (value === "oldset") {
			currentSortQuery = [Query.orderAsc("$id")];
		} else {
			currentSortQuery = [Query.orderAsc("$id")];
		}

		if (currentCollectionId && currentDbTarget) {
			showData(currentCollectionId, currentDbTarget, currentSortQuery);
		}
	});

	// Initialize with first button
	publishedCategoreis.querySelectorAll(".get-category-btn")[0]?.click();
	searchItemByName();
}

async function showData(collectionId, dbTarget, sortBy) {
	let items = [];

	const publishedTable = document.querySelector(".published-table");
	publishedTable.innerHTML = "";

	try {
		// when data is loading we shoed spin loader component on publishedTable container
		Loader(publishedTable, true);
		const getItems = await db.listDocuments(DB_ID, collectionId, sortBy);
		items = getItems.documents;
	} catch (error) {
		// when data is not loaded we are removing spin loader component and show Toast error message in console also
		Loader(publishedTable, false);
		Toast("خطا در دریافت اطلاعات", "bg-rose-500");
	}

	// when data is loaded remove loader component and init titleField
	Loader(publishedTable, false);
	const titleField = titleFieldMap[dbTarget];

	dataGenerator(items, titleField, publishedTable);
}

function dataGenerator(items, titleField, container) {
	items.forEach((item, index) => {
		const tr = document.createElement("tr");
		tr.setAttribute("id", item.$id);
		tr.style.viewTransitionName = item.$id;
		tr.innerHTML = `
		<td class="bg-neutral-800 text-cream/80 text-2xl font-mono w-12 h-12 border-l border-solid border-white/20">${
			index + 1
		}</td>
		<td class="bg-neutral-900 text-cream/80 py-4 px-8 td-title">${item[titleField] || "بدون عنوان"}</td>
		<td class="bg-neutral-900 text-cream/80 py-4 px-8">
			<img
				src="${getImageUrl(item.$id)}"
				alt="image"
				loading="lazy"
				class="w-16 h-16 max-w-16 object-cover border border-solid border-white/10 rounded-lg mx-auto" />
		</td>
		<td class="bg-neutral-900 text-cream/80 py-4 px-8">
			<div class="flex-center gap-8">
		<!-- if user in menu items page we showing edit item button -->
		${
			titleField == "title"
				? `
			<button
				title="ویرایش آیتم"
				aria-label="ویرایش آیتم"
				class="edit-item btn w-max bg-green-500 outline-green-500 border-neutral-900 shadow-[0_8px_20px] shadow-green-500/50">
				<ion-icon name="pencil"></ion-icon>
			</button>
			`
				: ""
		}
				<button
					title="حذف آیتم"
					aria-label="حذف آیتم"
					class="delete-item btn w-max bg-rose-500 outline-rose-500 border-neutral-900 shadow-[0_8px_20px] shadow-rose-500/50">
					<ion-icon name="trash"></ion-icon>
				</button>
			</div>
		</td>
		`;
		container.append(tr);

		// adding deleteItem function to click event on delete button element
		tr.querySelector(".delete-item").addEventListener("click", () => {
			deleteItem(tr);
		});

		// if user in menu-items page adding editItem function to click event on edit button element
		if (titleField == "title") {
			tr.querySelector(".edit-item").addEventListener("click", () => {
				editItem(tr);
			});
		}

		// adding loader to the image
		const img = tr.querySelector("img");
		ImageLoader(img);
	});
}

export { initPublishedCategories, showData };

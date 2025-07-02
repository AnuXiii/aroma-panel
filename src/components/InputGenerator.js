import Toast from "./Toast";

// the input generator web component used for generate different any type's of inputs and textarea
// <c-input data-type="file" data-id="id" data-label="upload image" data-tooltip="image formats allowed to upload jpg, png, svg"></c-input>
class InputGenerator extends HTMLElement {
	connectedCallback() {
		const type = this.dataset.type || "text";
		const id = this.dataset.id || "";
		const label = this.dataset.label || "";
		const tooltip = this.dataset.tooltip || "";

		let inputHtml = "";

		// check what type is it for generating input or textarea
		switch (type) {
			case "file":
				inputHtml = `
                    <i class="flex-center">
                        <ion-icon name="add-circle"></ion-icon>
                    </i>
                    <input  accept="image/png, image/jpeg, image/jpg" type="file" id="image" name="image" required class="input hidden" />
					<div class="img-preview w-full rounded-lg mx-auto bg-contain bg-center bg-no-repeat justify-center items-center h-42 hidden" style="background-image:url('/images/black-dots.svg')">
						<button type="button" class="delete-img text-3xl text-rose-500 bg-black w-14 h-14 flex-center rounded-lg border border-solid border-white/20 duration-200 hover:bg-rose-500 hover:text-black">
							<ion-icon name="trash"></ion-icon>
						</button>
					</div>
                `;
				break;
			case "number":
				inputHtml = `
                    <input minlength="2" maxlength="3" type="tel" inputmode="number" id="${id}" name="${id}" required class="input"/>
                `;
				break;
			case "text":
				inputHtml = `
                    <input type="text" id="${id}" name="${id}" required class="input"/>
                `;
				break;
			case "textarea":
				inputHtml = `
					<textarea id="${id}" name="${id}" required class="input max-h-32 min-h-26"></textarea>
					<button title="تولید خودکار توضیحات" aria-label="auto description generator" tabindex="0" id="generate-desc" class="generate-desc" type="button">تولید خودکار</button>
				`;
				break;
			default:
				inputHtml = `
                    <input type="${type}" id="${id}" name="${id}" required class="input"/>
                `;
		}

		this.innerHTML = `
            <label class="${type == "file" ? "file" : ""} relative" for="${type == "file" ? "image" : id}">
			${
				tooltip !== ""
					? `<button class="input-tooltip" type="button">
							<i class="dot" type="button">
								<ion-icon name="help-outline"></ion-icon>
							</i>
							<span>${tooltip}</span>
						</button>`
					: ""
			}
			${
				type == "file"
					? `
                ${inputHtml}				
				<span class="label-text">${label}</span>
				`
					: `
				${label != "" ? `<span class="label-text">${label}</span>` : ""}
				${inputHtml}				
				`
			}
            </label>
        `;

		this.uploadFileHandler();
		this.textareaValidator();
	}

	uploadFileHandler() {
		// handle the upload section
		let MAX_FILE_SIZE = 2 * 1024 * 1024; // Control Max file size to 2MB
		const fileInputContainer = this.querySelector(".file");
		const fileInput = this.querySelector('input[type="file"]');
		const imagePreview = this.querySelector(".img-preview");
		const deleteImagePreview = this.querySelector(".delete-img");

		if (!fileInputContainer) return;

		// upload files with drag and drop API
		fileInputContainer.addEventListener("dragover", () => {
			fileInputContainer.classList.add("dragged");
		});

		fileInputContainer.addEventListener("dragleave", () => {
			fileInputContainer.classList.remove("dragged");
		});

		fileInputContainer.addEventListener("drop", (e) => {
			fileInputContainer.classList.remove("dragged");
			const file = e.dataTransfer.files[0];
			showUploadedImage(file);

			// create new DataTransfer for adding the image file
			const dataTransfer = new DataTransfer();
			dataTransfer.items.add(file);
			fileInput.files = dataTransfer.files;
		});

		// handle file input when changed
		fileInput.addEventListener("change", (e) => showUploadedImage(e.target.files[0]));
		deleteImagePreview.addEventListener("click", removeUploadedImage);

		function showUploadedImage(fileData) {
			const file = fileData;

			if (file) {
				const url = URL.createObjectURL(file);
				imagePreview.classList.replace("hidden", "flex");
				imagePreview.style.backgroundImage = `url('${url}')`;
			} else {
				Toast("فایل انتخابی معتبر نیست فقط تصویر مجاز می باشد", "bg-rose-500");
			}

			if (file.size > MAX_FILE_SIZE) {
				Toast("حجم فایل باید کمتر از 2 مگابایت باشد", "bg-rose-500");
				removeUploadedImage();
			}
		}

		// remove uploaded image handler
		function removeUploadedImage() {
			imagePreview.classList.replace("flex", "hidden");
			imagePreview.style.backgroundImage = "";
			fileInput.value = "";
		}
	}

	textareaValidator() {
		// check textarea for controling max chars => 200 char for appwrite
		const textarea = document.querySelector("textarea");
		const maxChar = 200;

		if (!textarea) return;
		textarea.addEventListener("input", () => {
			if (textarea.value.length > maxChar) {
				textarea.value = textarea.value.slice(0, maxChar);
			}
		});
	}
}

customElements.define("c-input", InputGenerator);

export default InputGenerator;

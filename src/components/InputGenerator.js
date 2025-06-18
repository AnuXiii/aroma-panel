import Toast from "./Toast";

class InputGenerator extends HTMLElement {
	connectedCallback() {
		const type = this.dataset.type || "text";
		const id = this.dataset.id || "";
		const label = this.dataset.label || "";

		let inputHtml = "";

		switch (type) {
			case "file":
				inputHtml = `
                    <i class="flex-center">
                        <ion-icon name="add-circle"></ion-icon>
                    </i>
                    <input accept="image/png, image/jpeg" type="file" id="${id}" name="${id}" required class="input hidden" />
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
					<textarea id="${id}" name="${id}" required class="input max-h-32 min-h-[50px]"></textarea>
				`;
				break;
			default:
				inputHtml = `
                    <input type="text" id="${id}" name="${id}" required class="input"/>
                `;
		}

		this.innerHTML = `
            <label class="${type}">
			${
				type == "file"
					? `
                ${inputHtml}				
				<span class="label-text">${label}</span>
				`
					: `
				<span class="label-text">${label}</span>	
				${inputHtml}				
				`
			}
            </label>
        `;

		// Upload Controller Functions
		const fileInput = this?.querySelector('input[type="file"]');
		const imagePreview = this?.querySelector(".img-preview");
		const deleteImagePreview = this?.querySelector(".delete-img");
		let MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

		if (!fileInput || !imagePreview || !deleteImagePreview) return;

		fileInput.addEventListener("change", showUploadedImage);
		deleteImagePreview.addEventListener("click", removeUploadedImage);

		function showUploadedImage(e) {
			const file = e.target.files[0];

			if (file && file.type.startsWith("image/")) {
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

		function removeUploadedImage() {
			imagePreview.classList.replace("flex", "hidden");
			imagePreview.style.backgroundImage = "";
			fileInput.value = "";
		}
	}
}

customElements.define("c-input", InputGenerator);

export default InputGenerator;

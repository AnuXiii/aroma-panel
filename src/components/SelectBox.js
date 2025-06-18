class SelectBox extends HTMLElement {
	connectedCallback() {
		const id = this.dataset.id || "select-box";
		const defaultValue = this.dataset.default || "";
		let options = [];
		options = JSON.parse(this.dataset.options || "[]");

		this.innerHTML = `
			<div class="select-box relative select-none">
				<div class="selected-display flex-between-center cursor-pointer p-3 border border-solid border-white/10 rounded-lg bg-gradient-to-r from-yellow/20 via-neutral-900 to-neutral-800">
					<span>انتخاب کنید</span>
					<ion-icon name="chevron-down-outline" class="icon transition-transform duration-200 ease-custom"></ion-icon>
				</div>
				<ul class="options-list divide-y divide-white/20 duration-400 absolute w-full bg-neutral-800 rounded-lg mt-2 h-0 max-h-[150px] overflow-y-auto z-10">
					${options
						.map(
							(item, index) => `
						<li data-value="${
							item.value || index
						}" class="p-3 cursor-pointer hover:bg-neutral-700 transition-colors duration-150 rounded-lg">${
							item.text || item
						}</li>
						`
						)
						.join("")}
				</ul>
				<input class="input select-input hidden" type="text" id="${id}" name="${id}"
				value="${defaultValue}" required/>
			</div>
        `;

		this.initSelectBox();
	}

	initSelectBox() {
		const selectedDisplay = this.querySelector(".selected-display");
		const optionsList = this.querySelector(".options-list");
		const arrowIcon = this.querySelector(".icon");
		const selectInput = this.querySelector(".select-input");

		let isOpen;

		selectedDisplay.addEventListener("click", toggleDropdown);
		function toggleDropdown() {
			isOpen = arrowIcon.classList.toggle("rotate-180");

			if (isOpen) {
				optionsList.style.height = optionsList.scrollHeight + "px";
			} else {
				optionsList.style.height = "0";
			}
		}

		optionsList.addEventListener("click", (e) => Selected(e));
		function Selected(e) {
			const validTarget = e.target.closest("li");
			const selectDisplayValue = selectedDisplay.querySelector("span");

			if (validTarget) {
				selectDisplayValue.textContent = validTarget.textContent;
				selectInput.value = validTarget.dataset.value;
				toggleDropdown();
			}
		}

		document.addEventListener("click", (event) => {
			if (isOpen && !this.contains(event.target)) {
				toggleDropdown();
			}
		});
	}
}

customElements.define("c-select", SelectBox);

export default SelectBox;

class SelectBox extends HTMLElement {
	constructor() {
		super();
		this.isOpen = false;
	}

	connectedCallback() {
		const id = this.dataset.id || "select-box";
		const defaultValue = this.dataset.default || "";
		let options = [];
		options = JSON.parse(this.dataset.options || "[]");

		this.innerHTML = `
			<div class="select-box relative select-none">
				<div class="selected-display flex-between-center cursor-pointer p-3 border border-solid border-white/10 rounded-lg bg-gradient-to-r from-yellow/20 via-neutral-900 to-neutral-800">
					<span>دسته بندی</span>
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

		this.selectedDisplay = this.querySelector(".selected-display");
		this.optionsList = this.querySelector(".options-list");
		this.arrowIcon = this.querySelector(".icon");
		this.selectInput = this.querySelector(".select-input");

		this.selectedDisplay.addEventListener("click", this.toggleDropdown.bind(this));
		this.optionsList.addEventListener("click", this.selectOption.bind(this));
		document.addEventListener("click", this.closeDropdownOutside.bind(this));
	}

	disconnectedCallback() {
		document.removeEventListener("click", this.closeDropdownOutside.bind(this));
	}

	toggleDropdown() {
		this.isOpen = !this.isOpen;
		if (this.isOpen) {
			this.optionsList.style.height = this.optionsList.scrollHeight + "px";
			this.arrowIcon.classList.add("rotate-180");
		} else {
			this.optionsList.style.height = "0";
			this.arrowIcon.classList.remove("rotate-180");
		}
	}

	selectOption(event) {
		const selectedLi = event.target.closest("li");
		if (selectedLi) {
			const value = selectedLi.dataset.value;
			const text = selectedLi.textContent;
			this.selectedDisplay.querySelector("span").textContent = text;
			this.selectInput.value = value;
			this.toggleDropdown();
		}
	}

	closeDropdownOutside(event) {
		if (!this.contains(event.target) && this.isOpen) {
			this.toggleDropdown();
		}
	}
}

customElements.define("c-select", SelectBox);

export default SelectBox;

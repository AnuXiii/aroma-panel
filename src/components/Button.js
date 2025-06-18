class Button extends HTMLElement {
	connectedCallback() {
		const value = this.dataset.value || "دکمه";
		const type = this.dataset.type || "button";
		const href = this.dataset.href || "";

		let html = "";

		switch (type) {
			case "button":
				html = `<button tabindex="0" type="button" aria-label="${value}" class="btn mt-12 btn-submit">${value}</button>`;
				break;
			case "link":
				html = `<a href="${href}" aria-label="${value}" class="btn mt-12 btn-link">${value}</a>`;
				break;
			default:
				html = `<button tabindex="0" type="button" aria-label="${value}" class="btn mt-12 btn-submit">${value}</button>`;
		}

		this.innerHTML = html;
	}
}

customElements.define("c-button", Button);

export default Button;

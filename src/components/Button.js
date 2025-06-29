// the button web component used in form elements
// <c-button data-value="button" data-type="submit" data-href="#test">
class Button extends HTMLElement {
	connectedCallback() {
		const value = this.dataset.value || "دکمه";
		const type = this.dataset.type || "button"; // نوع پیش‌فرض button
		const href = this.dataset.href || "";

		let html = "";

		switch (type) {
			case "button":
				html = `<button tabindex="0" type="button" aria-label="${value}" class="btn btn-submit">${value}</button>`;
				break;
			case "submit":
				html = `<button tabindex="0" type="submit" aria-label="${value}" class="btn btn-submit">${value}</button>`;
				break;
			case "link":
				html = `<a href="${href}" aria-label="${value}" class="btn btn-link">${value}</a>`;
				break;
			default:
				html = `<button tabindex="0" type="button" aria-label="${value}" class="btn btn-submit">${value}</button>`;
		}

		this.innerHTML = html;
	}
}

customElements.define("c-button", Button);

export default Button;

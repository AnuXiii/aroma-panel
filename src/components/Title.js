class Title extends HTMLElement {
	connectedCallback() {
		const title = this.dataset.title || "";
		const subTitle = this.dataset.subTitle || "";
		const back = this.dataset.back || "false";

		this.innerHTML = `
            <div class="title-container">
				${
					back == "true"
						? `<button class="back-btn flex-center gap-2 mb-20 text-cream/70 duration-200 hover:text-yellow">
								<ion-icon name="arrow-forward"></ion-icon>
								<span>بازگشت به عقب</span>
							</button>`
						: ""
				}
		        <h1 class="title">${title}</h1>
		        <p class="sub-title">${subTitle}</p>
	        </div>
        `;

		this.querySelector(".back-btn")?.addEventListener("click", () => {
			window.history.back();
		});
	}
}

customElements.define("c-title", Title);

export default Title;

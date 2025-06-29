// the title component using for title of the pages
// data-title="test" data-sub-title="test" data-back="boolean"
class Title extends HTMLElement {
	connectedCallback() {
		const title = this.dataset.title || "";
		const subTitle = this.dataset.subTitle || "";
		const back = this.dataset.back || "false";

		this.innerHTML = `
            <div class="title-container">
				<div class="flex-between-center mb-20">
						${
							back == "true"
								? `<button class="back-btn flex-center gap-2 text-cream/70 duration-200 hover:text-yellow">
								<ion-icon name="arrow-forward"></ion-icon>
								<span>بازگشت به عقب</span>
							</button>`
								: ""
						}
					<button class="nav-button flex justify-center items-center md:hidden text-4xl bg-yellow p-2 rounded-lg">
						<ion-icon name="menu-outline"></ion-icon>
						<ion-icon name="close-outline" class="hidden"></ion-icon>
					</button>
				</div>
		        <h1 class="title">${title}</h1>
		        <p class="sub-title">${subTitle}</p>
	        </div>
        `;

		this.querySelector(".back-btn")?.addEventListener("click", () => {
			window.history.back();
		});

		// navigation open and close handler
		const navButton = this.querySelector(".nav-button");
		navButton.addEventListener("click", navHandler);

		function navHandler() {
			const navigation = document.querySelector(".navigation");
			navButton.firstElementChild.classList.toggle("hidden");
			navButton.lastElementChild.classList.toggle("hidden");
			navigation.classList.toggle("active");
		}
	}
}

customElements.define("c-title", Title);

export default Title;

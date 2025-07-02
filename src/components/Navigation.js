import { routes, logo } from "../constants";
class Navigation extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
            <nav class="navigation flex-column">
                <a class="router-link bg-transparent flex-center border-b border-solid border-yellow/20" href="${
									logo.path
								}" title="${logo.name}">
                    <img src="${logo.src}" alt="logo" class="w-20 h-20 object-cover mx-auto"/>
                </a>

            ${routes
							.map(
								(route) => `
				<li role="listitem" class="w-full relative flex-between mb-6">
					<a
						href="${route.path}"
						role="link"
						title="${route.name}"
						aria-label="${route.name}"
						class="flex-center md:flex-between gap-4 btn-link router-link">
						<ion-icon class="text-3xl" name="${route.icon}"></ion-icon>
                        <span class="flex-1 max-md:hidden">${route.name}</span>
					</a>
				</li>
                `
							)
							.join("")}
			</nav>
        `;
	}
}

customElements.define("c-navigation", Navigation);

export default Navigation;

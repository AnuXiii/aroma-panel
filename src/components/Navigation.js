import routes from "../constants";
import { logo } from "../constants";

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
								(map) => `
				<li role="listitem" class="w-full relative flex-between mb-6">
					<a
						href="${map.path}"
						role="link"
						title="${map.name}"
						aria-label="${map.name}"
						class="flex-center md:flex-between gap-4 btn-link router-link">
						<ion-icon class="text-3xl" name="${map.icon}"></ion-icon>
                        <span class="flex-1 max-md:hidden">${map.name}</span>
					</a>
                    <i class="tooltip flex-center">
                        ${map.name}
                    </i>
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

// Loader component for div's and sections when data is catching is showed
function Loader(parent, isLoading = true) {
	const existingLoader = parent.querySelector(".loader");
	if (existingLoader) {
		existingLoader.remove();
	}

	if (!isLoading) return;

	const loader = document.createElement("div");
	loader.className = "loader flex-center";
	loader.innerHTML = `<div class="spin"></div>`;

	if (!parent.style.position !== "relative") {
		parent.style.position = "relative";
	}

	parent.appendChild(loader);
}

function ImageLoader(imgElement) {
	const loaderOverlay = document.createElement("div");
	loaderOverlay.className = "loader flex-center";
	loaderOverlay.innerHTML = `<div class="spin"></div>`;

	const imgContainer = imgElement.parentElement;
	if (imgContainer.style.position !== "relative") {
		imgContainer.style.position = "relative";
	}

	imgContainer.appendChild(loaderOverlay);

	imgElement.addEventListener("load", () => {
		loaderOverlay.remove();
	});

	imgElement.addEventListener("error", () => {
		loaderOverlay.remove();
		imgElement.src = "/images/no-image.jpg";
	});
}

export { Loader, ImageLoader };

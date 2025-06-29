// Loader component for div's and sections when data is catching is showed
const Loader = (parent, isLoading = true) => {
	const existingLoader = parent.querySelector(".loader");
	if (existingLoader) {
		existingLoader.remove();
	}

	if (!isLoading) return;

	const loader = document.createElement("div");
	loader.className = "loader flex-center";
	loader.innerHTML = `
		<div class="spin"></div>
	`;

	parent.style.position = "relative";
	parent.appendChild(loader);
};

// Image loader function
const ImageLoader = (imgElement) => {
	// Create loader overlay for image
	const loaderOverlay = document.createElement("div");
	loaderOverlay.className = "loader flex-center";
	loaderOverlay.innerHTML = `
		<div class="spin"></div>
	`;

	// Make image container relative if not already
	const imgContainer = imgElement.parentElement;
	if (imgContainer.style.position !== "relative") {
		imgContainer.style.position = "relative";
	}

	imgContainer.appendChild(loaderOverlay);

	// Hide loader when image loads
	imgElement.addEventListener("load", () => {
		loaderOverlay.remove();
	});

	// Hide loader if image fails to load
	imgElement.addEventListener("error", () => {
		loaderOverlay.remove();
		imgElement.src = "/images/no-image.jpg"; // fallback image is target image is not loaded
	});
};

export default Loader;
export { ImageLoader };

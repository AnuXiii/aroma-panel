function searchItemByName() {
	const searchInput = document.getElementById("search");

	searchInput.addEventListener("input", () => {
		const query = searchInput.value.trim();
		const titles = document.querySelectorAll(".published-table tr .td-title");

		if (!query) {
			titles.forEach((el) => {
				el.closest("tr").style.display = "table-row";
			});
		}

		[...titles].forEach((el) => {
			const match = el.textContent.includes(query);
			el.closest("tr").style.display = match ? "table-row" : "none";
		});
	});
}

export { searchItemByName };

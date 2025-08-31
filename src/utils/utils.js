const overlay = document.querySelector(".overlay");

export function disableScroll() {
	const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
	document.body.style.paddingRight = `${scrollbarWidth}px`;
	document.body.classList.add("overflow-hidden-with-padding");
}

export function enableScroll() {
	document.body.style.paddingRight = "";
	document.body.classList.remove("overflow-hidden-with-padding");
}

// export function showOverlay() {
//   overlay.style.display = "block";
//   disableScroll();
// }

// export function hideOverlay() {
//   overlay.style.display = "none";
//   enableScroll();
// }

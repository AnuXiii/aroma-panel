import Toastify from "toastify-js";
function Toast(msg, type = "bg-yellow") {
	Toastify({
		text: msg,
		duration: 3000,
		gravity: "top",
		position: "left",
		className: type,
		style: {
			boxShadow: "none",
		},
	}).showToast();
}

export default Toast;

import Toastify from "toastify-js";

// Toast function to show alerts / messages and ... with custom colors and custom messages
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

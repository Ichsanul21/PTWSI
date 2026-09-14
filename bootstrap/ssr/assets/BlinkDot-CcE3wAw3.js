import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Components/ui/BlinkDot.jsx
function BlinkDot({ className = "", light = false }) {
	const color = light ? "bg-white" : "bg-ink";
	return /* @__PURE__ */ jsxs("span", {
		className: `relative inline-flex h-2.5 w-2.5 shrink-0 ${className}`,
		"aria-hidden": "true",
		children: [/* @__PURE__ */ jsx("span", { className: `absolute inset-0 rounded-full ${color}` }), /* @__PURE__ */ jsx("span", { className: `absolute inset-0 animate-dot-ping rounded-full ${light ? "bg-white/60" : "bg-ink/40"}` })]
	});
}
//#endregion
export { BlinkDot as t };

//# sourceMappingURL=BlinkDot-CcE3wAw3.js.map
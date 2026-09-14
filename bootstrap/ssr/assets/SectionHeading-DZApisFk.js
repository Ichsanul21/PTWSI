import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Components/ui/SectionHeading.jsx
function SectionHeading({ eyebrow, title, className = "", dark = false }) {
	return /* @__PURE__ */ jsxs("div", {
		className: `max-w-4xl ${className}`,
		children: [eyebrow && /* @__PURE__ */ jsx("p", {
			className: `kicker mb-5 ${dark ? "text-white/60" : "text-ink/50"}`,
			children: eyebrow
		}), /* @__PURE__ */ jsx("h2", {
			className: `display-lg ${dark ? "text-white" : ""}`,
			children: title
		})]
	});
}
//#endregion
export { SectionHeading as t };

//# sourceMappingURL=SectionHeading-DZApisFk.js.map
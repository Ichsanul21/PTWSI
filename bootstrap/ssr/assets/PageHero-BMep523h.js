import { t as Reveal } from "./Reveal-Qg1-elCF.js";
import { t as BlinkDot } from "./BlinkDot-CcE3wAw3.js";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Components/ui/PageHero.jsx
function PageHero({ eyebrow, title, lead, meta }) {
	return /* @__PURE__ */ jsxs("section", {
		className: "relative overflow-hidden bg-white",
		children: [
			/* @__PURE__ */ jsx("div", { className: "dot-grid absolute inset-0 opacity-60" }),
			/* @__PURE__ */ jsx("div", { className: "absolute -top-40 left-1/2 h-96 w-[60rem] max-w-none -translate-x-1/2 rounded-full bg-brand-600/10 blur-3xl" }),
			/* @__PURE__ */ jsxs("div", {
				className: "container-site relative pb-16 pt-40 lg:pb-20 lg:pt-48",
				children: [
					/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("p", {
						className: "kicker flex items-center gap-4 text-ink/50",
						children: [/* @__PURE__ */ jsx(BlinkDot, {}), eyebrow]
					}) }),
					/* @__PURE__ */ jsx(Reveal, {
						delay: 100,
						children: /* @__PURE__ */ jsx("h1", {
							className: "display-xl mt-8 max-w-5xl",
							children: title
						})
					}),
					/* @__PURE__ */ jsx(Reveal, {
						delay: 180,
						children: /* @__PURE__ */ jsx("div", { className: "divider-line mt-10" })
					}),
					(lead || meta) && /* @__PURE__ */ jsx(Reveal, {
						delay: 240,
						children: /* @__PURE__ */ jsxs("div", {
							className: "mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
							children: [lead && /* @__PURE__ */ jsx("p", {
								className: "max-w-xl text-base leading-relaxed text-fog sm:text-lg",
								children: lead
							}), meta && /* @__PURE__ */ jsx("p", {
								className: "shrink-0 font-mono text-xs uppercase tracking-[0.18em] text-ink/40",
								children: meta
							})]
						})
					})
				]
			})
		]
	});
}
//#endregion
export { PageHero as t };

//# sourceMappingURL=PageHero-BMep523h.js.map
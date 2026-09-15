import { a as useTrans, i as localizedPath, n as Reveal, t as PublicLayout } from "./PublicLayout-Qw7MZTfy.js";
import { t as PageHero } from "./PageHero-BYflm3Wk.js";
import { c as alt, s as SERVICE_IMAGES } from "./media-BkzI3eDn.js";
import { t as Seo } from "./Seo-DAd7HCP1.js";
import { t as ServiceIcon } from "./ServiceIcon-hMszGnNW.js";
import { Link } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/Services/Index.jsx
function ServicesIndex({ services }) {
	const { t, locale } = useTrans();
	const buildHref = (path) => localizedPath(locale, path);
	return /* @__PURE__ */ jsxs(PublicLayout, { children: [
		/* @__PURE__ */ jsx(Seo, { title: locale === "en" ? "Services | PT Wall Street Indonesia" : "Layanan | PT Wall Street Indonesia" }),
		/* @__PURE__ */ jsx(PageHero, {
			eyebrow: t("nav.services"),
			title: locale === "en" ? "Three testing divisions for mining & infrastructure" : "Tiga divisi pengujian untuk tambang & infrastruktur",
			lead: locale === "en" ? "Every division runs on accountable standards: SNI, ASTM, AASHTO, JIS and ISRM." : "Setiap divisi berjalan dengan standar yang dapat dipertanggungjawabkan: SNI, ASTM, AASHTO, JIS dan ISRM."
		}),
		/* @__PURE__ */ jsx("section", {
			className: "section-pad section-gradient-subtle border-t border-ink/10",
			children: /* @__PURE__ */ jsx("div", {
				className: "container-site",
				children: /* @__PURE__ */ jsx("div", {
					className: "grid gap-8",
					children: services.map((s, i) => /* @__PURE__ */ jsx(Reveal, {
						delay: i * 80,
						children: /* @__PURE__ */ jsxs(Link, {
							href: buildHref(`/layanan/${s.slug}`),
							className: "group grid overflow-hidden rounded-2xl border border-ink/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-600/40 hover:shadow-xl lg:grid-cols-12",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "relative aspect-[16/10] w-full overflow-hidden lg:col-span-5 lg:aspect-auto lg:min-h-[280px]",
								children: [SERVICE_IMAGES[s.slug] || s.cover_url ? /* @__PURE__ */ jsx("img", {
									src: s.cover_url || SERVICE_IMAGES[s.slug].src,
									alt: alt(SERVICE_IMAGES[s.slug] ?? {
										id: s.name_id,
										en: s.name_en
									}, locale),
									loading: "lazy",
									decoding: "async",
									className: "absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
								}) : /* @__PURE__ */ jsx("span", {
									className: "absolute inset-0 flex items-center justify-center bg-ink/5 text-ink/70 transition-colors duration-200 group-hover:bg-brand-600 group-hover:text-white",
									children: /* @__PURE__ */ jsx(ServiceIcon, {
										name: s.icon,
										className: "h-12 w-12"
									})
								}), /* @__PURE__ */ jsx("div", {
									className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-5",
									children: /* @__PURE__ */ jsx("span", {
										className: "font-mono text-[11px] uppercase tracking-[0.14em] text-white/85",
										children: s.standards
									})
								})]
							}), /* @__PURE__ */ jsxs("span", {
								className: "flex flex-col justify-center p-8 sm:p-10 lg:col-span-7",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "font-mono text-sm text-brand-600",
										children: String(i + 1).padStart(2, "0")
									}),
									/* @__PURE__ */ jsx("span", {
										className: "display-lg mt-3 block transition-colors group-hover:text-brand-600",
										children: s[`name_${locale}`] ?? s.name_id
									}),
									/* @__PURE__ */ jsx("span", {
										className: "mt-3 block max-w-2xl text-sm leading-relaxed text-ink/60 sm:text-base",
										children: s[`short_${locale}`] ?? s.short_id
									}),
									/* @__PURE__ */ jsxs("span", {
										className: "mt-6 flex items-center justify-between gap-4",
										children: [/* @__PURE__ */ jsx("span", {
											className: "font-mono text-[11px] uppercase tracking-[0.14em] text-ink/40",
											children: s.standards
										}), /* @__PURE__ */ jsx("span", {
											className: "flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-200 group-hover:border-brand-600 group-hover:bg-brand-600 group-hover:text-white",
											children: /* @__PURE__ */ jsx("svg", {
												className: "h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5",
												viewBox: "0 0 24 24",
												fill: "none",
												stroke: "currentColor",
												strokeWidth: "2",
												strokeLinecap: "round",
												strokeLinejoin: "round",
												children: /* @__PURE__ */ jsx("path", { d: "M5 12h14M13 6l6 6-6 6" })
											})
										})]
									})
								]
							})]
						})
					}, s.slug))
				})
			})
		})
	] });
}
//#endregion
export { ServicesIndex as default };

//# sourceMappingURL=Index-CtZ3el6b.js.map
import { i as useTrans, n as Button, r as localizedPath, t as PublicLayout } from "./PublicLayout-DG3kgI-p.js";
import { t as Reveal } from "./Reveal-Qg1-elCF.js";
import { t as PageHero } from "./PageHero-BMep523h.js";
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
			children: /* @__PURE__ */ jsxs("div", {
				className: "container-site",
				children: [/* @__PURE__ */ jsx("div", {
					className: "border-t border-ink/10",
					children: services.map((s, i) => /* @__PURE__ */ jsx(Reveal, {
						delay: i * 80,
						children: /* @__PURE__ */ jsxs(Link, {
							href: buildHref(`/layanan/${s.slug}`),
							className: "group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-600/40 hover:shadow-xl sm:py-10 lg:grid-cols-12",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "font-mono text-sm text-ink/35 lg:col-span-1",
									children: String(i + 1).padStart(2, "0")
								}),
								SERVICE_IMAGES[s.slug] || s.cover_url ? /* @__PURE__ */ jsx("img", {
									src: s.cover_url || SERVICE_IMAGES[s.slug].src,
									alt: alt(SERVICE_IMAGES[s.slug] ?? {
										id: s.name_id,
										en: s.name_en
									}, locale),
									loading: "lazy",
									decoding: "async",
									className: "hidden h-12 w-12 rounded object-cover lg:col-span-1 lg:block"
								}) : /* @__PURE__ */ jsx("span", {
									className: "hidden h-12 w-12 items-center justify-center rounded bg-ink/5 text-ink/70 transition-colors duration-200 group-hover:bg-brand-600 group-hover:text-white lg:col-span-1 lg:flex",
									children: /* @__PURE__ */ jsx(ServiceIcon, {
										name: s.icon,
										className: "h-6 w-6"
									})
								}),
								/* @__PURE__ */ jsxs("span", {
									className: "lg:col-span-7",
									children: [/* @__PURE__ */ jsx("span", {
										className: "display-lg block transition-colors group-hover:text-brand-600",
										children: s[`name_${locale}`] ?? s.name_id
									}), /* @__PURE__ */ jsx("span", {
										className: "mt-2 block max-w-2xl text-sm leading-relaxed text-ink/60",
										children: s[`short_${locale}`] ?? s.short_id
									})]
								}),
								/* @__PURE__ */ jsxs("span", {
									className: "flex items-center justify-between gap-4 lg:col-span-3 lg:justify-end",
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
						})
					}, s.slug))
				}), /* @__PURE__ */ jsx(Reveal, {
					delay: 160,
					children: /* @__PURE__ */ jsxs("div", {
						className: "mt-14 flex flex-col gap-6 rounded-2xl cta-gradient p-8 text-white sm:p-10 lg:flex-row lg:items-center lg:justify-between",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
							className: "text-2xl font-bold sm:text-3xl",
							children: locale === "en" ? "Cannot find the method you need?" : "Tidak menemukan metode yang Anda butuhkan?"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-2 max-w-xl text-sm leading-relaxed text-white/75",
							children: locale === "en" ? "Contact us. The laboratory can tailor test methods to your project needs." : "Hubungi kami. Laboratorium dapat menyesuaikan metode uji dengan kebutuhan proyek."
						})] }), /* @__PURE__ */ jsx(Button, {
							href: buildHref("/kontak"),
							variant: "light",
							size: "lg",
							className: "shrink-0 self-start lg:self-auto",
							children: t("common.cta_quote")
						})]
					})
				})]
			})
		})
	] });
}
//#endregion
export { ServicesIndex as default };

//# sourceMappingURL=Index-Bqm9Xghx.js.map
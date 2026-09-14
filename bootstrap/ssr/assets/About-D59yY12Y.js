import { i as useTrans, r as localizedPath, t as PublicLayout } from "./PublicLayout-DG3kgI-p.js";
import { t as Reveal } from "./Reveal-Qg1-elCF.js";
import { t as SectionHeading } from "./SectionHeading-DZApisFk.js";
import { t as PageHero } from "./PageHero-BMep523h.js";
import { c as alt, t as ABOUT_IMAGE } from "./media-BkzI3eDn.js";
import { Head, Link, usePage } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/About.jsx
var VALUES = [
	{
		key: "accuracy",
		title_id: "Akurasi",
		title_en: "Accuracy",
		body_id: "Setiap angka yang kami laporkan dapat ditelusuri kembali ke prosedur dan standar yang berlaku.",
		body_en: "Every figure we report traces back to applicable procedures and standards."
	},
	{
		key: "speed",
		title_id: "Kecepatan",
		title_en: "Speed",
		body_id: "Jadwal pengerjaan yang jelas dan kabar aktif. Waktu Anda di lapangan terlalu berharga untuk menunggu tanpa kepastian.",
		body_en: "Clear turnaround schedules and proactive updates. Your time on site is too valuable for silent waiting."
	},
	{
		key: "integrity",
		title_id: "Integritas",
		title_en: "Integrity",
		body_id: "Hasil yang jujur dan transparan, tanpa kompromi pada keselamatan desain.",
		body_en: "Honest, transparent results, no compromise on design safety."
	}
];
function About({ services }) {
	const { t, locale } = useTrans();
	const site = usePage().props.site;
	const about = site?.about ?? {};
	const buildHref = (path) => localizedPath(locale, path);
	return /* @__PURE__ */ jsxs(PublicLayout, { children: [
		/* @__PURE__ */ jsx(Head, { children: /* @__PURE__ */ jsx("title", { children: "Tentang | PT Wall Street Indonesia" }) }),
		/* @__PURE__ */ jsx(PageHero, {
			eyebrow: t("nav.about"),
			title: locale === "en" ? "A soil & rock lab built for Kalimantan industry" : "Lab tanah & batuan yang dibangun untuk industri Kalimantan",
			lead: locale === "en" ? "An internationally standardised geomechanics, soil & rock testing laboratory, on target for the Kalimantan mining sector." : "Laboratorium pengujian geomekanika, tanah & batuan berstandar internasional, tepat sasaran untuk sektor pertambangan Kalimantan.",
			meta: "0.5036ºS / 117.1214ºE"
		}),
		/* @__PURE__ */ jsx("section", {
			className: "section-pad border-t border-ink/10 bg-white",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container-site",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "grid gap-14 lg:grid-cols-12",
					children: [/* @__PURE__ */ jsx(Reveal, {
						className: "lg:col-span-5",
						children: /* @__PURE__ */ jsx(SectionHeading, {
							eyebrow: t("nav.about"),
							title: about[`lead_${locale}`] ?? about.lead_id ?? ""
						})
					}), /* @__PURE__ */ jsx(Reveal, {
						delay: 120,
						className: "lg:col-span-7",
						children: /* @__PURE__ */ jsxs("div", {
							className: "space-y-6",
							children: [
								/* @__PURE__ */ jsx("p", {
									className: "text-xl leading-relaxed text-ink",
									children: about[`lead_${locale}`] ?? about.lead_id
								}),
								/* @__PURE__ */ jsx("p", {
									className: "leading-relaxed text-ink/60",
									children: about[`body_${locale}`] ?? about.body_id
								}),
								/* @__PURE__ */ jsx("blockquote", {
									className: "rounded border-l-2 border-brand-600 bg-brand-50 p-7 text-lg font-medium leading-relaxed text-ink",
									children: site?.brand?.[`tagline_${locale}`] ?? site?.brand?.tagline_id
								})
							]
						})
					})]
				}), /* @__PURE__ */ jsx(Reveal, {
					delay: 160,
					children: /* @__PURE__ */ jsxs("figure", {
						className: "relative mt-14 overflow-hidden rounded-lg border border-ink/10",
						children: [/* @__PURE__ */ jsx("img", {
							src: ABOUT_IMAGE.src,
							alt: alt(ABOUT_IMAGE, locale),
							loading: "lazy",
							decoding: "async",
							className: "aspect-[21/9] w-full object-cover"
						}), /* @__PURE__ */ jsx("figcaption", {
							className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent px-6 pb-5 pt-14 font-mono text-[11px] uppercase tracking-[0.14em] text-white/85",
							children: locale === "en" ? "Materials testing laboratory" : "Laboratorium pengujian material"
						})]
					})
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "section-pad border-t border-ink/10 bg-white",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container-site",
				children: [/* @__PURE__ */ jsx(SectionHeading, {
					eyebrow: locale === "en" ? "Our values" : "Nilai Kami",
					title: locale === "en" ? "Principles behind every report" : "Prinsip yang menopang setiap laporan"
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-12 grid gap-5 md:grid-cols-3",
					children: VALUES.map((v, i) => /* @__PURE__ */ jsx(Reveal, {
						delay: i * 120,
						children: /* @__PURE__ */ jsxs("div", {
							className: "h-full rounded-lg border border-ink/10 bg-white p-8 transition-colors duration-200 hover:border-ink/25 sm:p-10",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ jsx("span", {
										className: "font-mono text-sm text-brand-600",
										children: String(i + 1).padStart(2, "0")
									}), /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-brand-600" })]
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "mt-10 text-2xl font-bold text-ink",
									children: v[`title_${locale}`]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-4 text-sm leading-relaxed text-ink/60",
									children: v[`body_${locale}`]
								})
							]
						})
					}, v.key))
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "section-pad border-t border-ink/10 bg-white",
			children: /* @__PURE__ */ jsx("div", {
				className: "container-site",
				children: /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", {
					className: "rounded-lg border border-ink/10 bg-ink/[0.02] p-8 sm:p-12",
					children: [/* @__PURE__ */ jsx(SectionHeading, {
						eyebrow: t("nav.services"),
						title: locale === "en" ? "Explore our testing divisions" : "Jelajahi divisi pengujian kami"
					}), /* @__PURE__ */ jsx("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: services.map((s) => /* @__PURE__ */ jsx(Link, {
							href: buildHref(`/layanan/${s.slug}`),
							className: "rounded border border-ink/15 px-5 py-2.5 font-mono text-[13px] uppercase tracking-[0.04em] text-ink/70 transition-colors hover:border-brand-600 hover:bg-brand-600 hover:text-white",
							children: s[`name_${locale}`] ?? s.name_id
						}, s.slug))
					})]
				}) })
			})
		})
	] });
}
//#endregion
export { About as default };

//# sourceMappingURL=About-D59yY12Y.js.map
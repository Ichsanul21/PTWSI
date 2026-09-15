import { a as useTrans, n as Reveal, t as PublicLayout } from "./PublicLayout-Qw7MZTfy.js";
import { t as SectionHeading } from "./SectionHeading-DZApisFk.js";
import { t as PageHero } from "./PageHero-BYflm3Wk.js";
import { o as PROJECT_FALLBACKS } from "./media-BkzI3eDn.js";
import { t as Seo } from "./Seo-DAd7HCP1.js";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/Clients.jsx
var SECTORS = [
	{
		key: "mining",
		label_id: "Pertambangan",
		label_en: "Mining",
		icon: "mining"
	},
	{
		key: "construction",
		label_id: "Konstruksi",
		label_en: "Construction",
		icon: "construction"
	},
	{
		key: "infrastructure",
		label_id: "Infrastruktur & Jalan",
		label_en: "Infrastructure & Roads",
		icon: "directions_rail"
	},
	{
		key: "dam",
		label_id: "Bendungan / Dam",
		label_en: "Dams",
		icon: "water_dam"
	},
	{
		key: "energy",
		label_id: "Energi & Pembangkit",
		label_en: "Energy & Power Plants",
		icon: "electric_bolt"
	},
	{
		key: "ikn",
		label_id: "IKN",
		label_en: "IKN",
		icon: "location_city"
	}
];
var FALLBACK_CLIENT_LOGO = "/images/clients/logo-alenkosa-icon.png";
function Clients({ clients, projects }) {
	const { locale } = useTrans();
	return /* @__PURE__ */ jsxs(PublicLayout, { children: [
		/* @__PURE__ */ jsx(Seo, { title: locale === "en" ? "Clients & Portfolio | PT Wall Street Indonesia" : "Klien & Portofolio | PT Wall Street Indonesia" }),
		/* @__PURE__ */ jsx(PageHero, {
			eyebrow: locale === "en" ? "Clients & Portfolio" : "Klien & Portofolio",
			title: locale === "en" ? "Trusted across mining & infrastructure" : "Terpercaya di sektor pertambangan & infrastruktur",
			lead: locale === "en" ? "We serve companies across sectors that demand certainty in soil, rock and environmental testing quality." : "Kami melayani perusahaan di berbagai sektor yang membutuhkan kepastian kualitas pengujian tanah, batuan dan lingkungan."
		}),
		/* @__PURE__ */ jsx("section", {
			className: "section-pad section-gradient-subtle border-t border-ink/10",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container-site",
				children: [
					/* @__PURE__ */ jsxs(Reveal, { children: [/* @__PURE__ */ jsx(SectionHeading, {
						eyebrow: locale === "en" ? "Sectors" : "Sektor",
						title: locale === "en" ? "Who we serve" : "Yang kami layani"
					}), /* @__PURE__ */ jsx("div", {
						className: "mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
						children: SECTORS.map((sector, i) => /* @__PURE__ */ jsxs("div", {
							className: "group flex items-center gap-4 rounded-lg border border-ink/10 bg-white p-6 transition-colors duration-200 hover:border-ink/25 hover:shadow-lg hover:shadow-brand-600/10",
							children: [/* @__PURE__ */ jsx("span", {
								className: "icon-wrapper icon-wrapper-sm",
								children: /* @__PURE__ */ jsx("span", {
									className: "material-symbols-outlined",
									children: sector.icon
								})
							}), /* @__PURE__ */ jsx("span", {
								className: "text-xl font-bold text-ink",
								children: locale === "en" ? sector.label_en : sector.label_id
							})]
						}, sector.key))
					})] }),
					/* @__PURE__ */ jsx(Reveal, {
						delay: 120,
						children: /* @__PURE__ */ jsxs("div", {
							className: "mt-20",
							children: [/* @__PURE__ */ jsx(SectionHeading, {
								eyebrow: locale === "en" ? "Clients" : "Klien",
								title: locale === "en" ? "Companies who trust us" : "Perusahaan yang mempercayai kami"
							}), /* @__PURE__ */ jsxs("div", {
								className: "mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4",
								children: [clients.length === 0 && /* @__PURE__ */ jsx("p", {
									className: "col-span-full rounded-lg border border-dashed border-ink/15 px-6 py-12 text-center text-ink/50",
									children: locale === "en" ? "Client logotypes will appear here." : "Logo klien akan ditampilkan di sini."
								}), clients.map((c) => /* @__PURE__ */ jsxs("a", {
									href: c.website || "#",
									target: c.website ? "_blank" : void 0,
									rel: "noreferrer",
									title: c.name,
									className: "flex h-32 flex-col items-center justify-center gap-2 rounded-xl border border-ink/10 bg-white p-4 text-center transition-all duration-200 hover:-translate-y-1 hover:border-brand-600/40 hover:shadow-lg hover:shadow-brand-600/10",
									children: [c.logo ? /* @__PURE__ */ jsx("img", {
										src: `/storage/${c.logo}`,
										alt: c.name,
										loading: "lazy",
										decoding: "async",
										className: "max-h-12 max-w-[70%] object-contain"
									}) : /* @__PURE__ */ jsx("img", {
										src: FALLBACK_CLIENT_LOGO,
										alt: "",
										"aria-hidden": "true",
										loading: "lazy",
										decoding: "async",
										className: "h-11 w-11 rounded-lg border border-ink/10 object-contain p-1"
									}), /* @__PURE__ */ jsx("span", {
										className: "line-clamp-2 text-center text-xs font-bold leading-snug text-ink/70",
										children: c.name
									})]
								}, c.id))]
							})]
						})
					}),
					projects.length > 0 && /* @__PURE__ */ jsx(Reveal, {
						delay: 160,
						children: /* @__PURE__ */ jsxs("div", {
							className: "mt-20",
							children: [/* @__PURE__ */ jsx(SectionHeading, {
								eyebrow: "Portofolio",
								title: locale === "en" ? "Selected projects" : "Proyek terpilih"
							}), /* @__PURE__ */ jsx("div", {
								className: "mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3",
								children: projects.map((p) => {
									const name = p[`name_${locale}`] ?? p.name_id;
									const location = p[`location_${locale}`] ?? p.location_id;
									const summary = p[`summary_${locale}`] ?? p.summary_id;
									const cover = p.cover_url ? { src: p.cover_url } : PROJECT_FALLBACKS[p.id % PROJECT_FALLBACKS.length];
									return /* @__PURE__ */ jsxs("div", {
										className: "group flex h-full flex-col overflow-hidden rounded-lg border border-ink/10 bg-white transition-colors duration-200 hover:border-ink/25",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "relative aspect-[16/10] overflow-hidden",
											children: [
												/* @__PURE__ */ jsx("img", {
													src: cover.src,
													alt: name,
													loading: "lazy",
													decoding: "async",
													className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
												}),
												/* @__PURE__ */ jsxs("div", {
													className: "absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/60 via-black/10 to-transparent p-6",
													children: [/* @__PURE__ */ jsx("span", {
														className: "relative rounded border border-white/25 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/85",
														children: p.category
													}), /* @__PURE__ */ jsx("span", {
														className: "relative font-mono text-xs text-white/70",
														children: p.year
													})]
												}),
												p.is_featured && /* @__PURE__ */ jsx("span", {
													className: "absolute right-3 top-3 rounded bg-brand-600 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-white",
													children: "Featured"
												})
											]
										}), /* @__PURE__ */ jsxs("div", {
											className: "flex flex-1 flex-col p-6",
											children: [
												/* @__PURE__ */ jsx("h3", {
													className: "text-xl font-bold leading-snug text-ink",
													children: name
												}),
												/* @__PURE__ */ jsxs("p", {
													className: "mt-2 font-mono text-xs uppercase tracking-[0.1em] text-ink/40",
													children: [
														p.client_name || p.client?.name,
														location && /* @__PURE__ */ jsxs("span", { children: [" · ", location] }),
														p.year && /* @__PURE__ */ jsxs("span", { children: [" · ", p.year] })
													]
												}),
												summary && /* @__PURE__ */ jsx("p", {
													className: "mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-ink/60",
													children: summary
												}),
												p.highlights?.length > 0 && /* @__PURE__ */ jsx("ul", {
													className: "mt-auto space-y-1.5 pt-4",
													children: p.highlights.slice(0, 3).map((h, i) => /* @__PURE__ */ jsxs("li", {
														className: "flex items-start gap-2 font-mono text-xs text-ink/50",
														children: [/* @__PURE__ */ jsx("span", {
															className: "mt-0.5 text-brand-600",
															children: "▸"
														}), h]
													}, i))
												})
											]
										})]
									}, p.id);
								})
							})]
						})
					})
				]
			})
		})
	] });
}
//#endregion
export { Clients as default };

//# sourceMappingURL=Clients-BvOE9BfS.js.map
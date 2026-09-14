import { i as useTrans, t as PublicLayout } from "./PublicLayout-B0huDJIh.js";
import { t as Reveal } from "./Reveal-Qg1-elCF.js";
import { t as SectionHeading } from "./SectionHeading-DZApisFk.js";
import { t as PageHero } from "./PageHero-BMep523h.js";
import { o as PROJECT_FALLBACKS } from "./media-BkzI3eDn.js";
import { t as Seo } from "./Seo-DAd7HCP1.js";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/Clients.jsx
var SECTORS = [
	"Pertambangan",
	"Konstruksi",
	"Infrastruktur & Jalan",
	"Bendungan / Dam",
	"Energi & Pembangkit",
	"IKN"
];
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
			className: "section-pad border-t border-ink/10 bg-white",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container-site",
				children: [
					/* @__PURE__ */ jsxs(Reveal, { children: [/* @__PURE__ */ jsx(SectionHeading, {
						eyebrow: locale === "en" ? "Sectors" : "Sektor",
						title: locale === "en" ? "Who we serve" : "Yang kami layani"
					}), /* @__PURE__ */ jsx("div", {
						className: "mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
						children: SECTORS.map((sector, i) => /* @__PURE__ */ jsxs("div", {
							className: "group flex items-center gap-4 rounded-lg border border-ink/10 bg-white p-6 transition-colors duration-200 hover:border-ink/25",
							children: [/* @__PURE__ */ jsx("span", {
								className: "font-mono text-sm text-brand-600",
								children: String(i + 1).padStart(2, "0")
							}), /* @__PURE__ */ jsx("span", {
								className: "text-xl font-bold text-ink",
								children: sector
							})]
						}, sector))
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
								}), clients.map((c) => /* @__PURE__ */ jsx("a", {
									href: c.website || "#",
									target: c.website ? "_blank" : void 0,
									rel: "noreferrer",
									className: "flex h-24 items-center justify-center rounded-lg border border-ink/10 bg-ink/[0.02] p-4 transition-colors duration-200 hover:border-ink/25",
									children: c.logo ? /* @__PURE__ */ jsx("img", {
										src: `/storage/${c.logo}`,
										alt: c.name,
										loading: "lazy",
										decoding: "async",
										className: "max-h-12 max-w-[70%] object-contain grayscale transition-all hover:grayscale-0"
									}) : /* @__PURE__ */ jsx("span", {
										className: "text-center text-sm font-semibold text-ink/50",
										children: c.name
									})
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

//# sourceMappingURL=Clients-snWINOJP.js.map
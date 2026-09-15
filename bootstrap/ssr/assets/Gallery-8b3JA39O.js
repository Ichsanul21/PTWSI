import { a as useTrans, i as localizedPath, n as Reveal, r as Button, t as PublicLayout } from "./PublicLayout-Qw7MZTfy.js";
import { t as PageHero } from "./PageHero-BYflm3Wk.js";
import { c as alt, r as GALLERY_BANNER } from "./media-BkzI3eDn.js";
import { t as Seo } from "./Seo-DAd7HCP1.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
//#region resources/js/Pages/Gallery.jsx
function Gallery({ items, services }) {
	const { t, locale } = useTrans();
	const buildHref = (path) => localizedPath(locale, path);
	const categories = ["Semua", ...new Set(items.map((i) => i.category).filter(Boolean))];
	const [active, setActive] = useState("Semua");
	const visible = active === "Semua" ? items : items.filter((i) => i.category === active);
	return /* @__PURE__ */ jsxs(PublicLayout, { children: [
		/* @__PURE__ */ jsx(Seo, { title: locale === "en" ? "Gallery | PT Wall Street Indonesia" : "Galeri | PT Wall Street Indonesia" }),
		/* @__PURE__ */ jsx(PageHero, {
			eyebrow: locale === "en" ? "Gallery" : "Galeri",
			title: locale === "en" ? "Inside the laboratory" : "Dokumentasi aktivitas laboratorium",
			lead: locale === "en" ? "Testing activity, equipment and project documentation. Tangible proof of field quality." : "Kegiatan pengujian, peralatan dan dokumentasi proyek. Bukti nyata kualitas pengerjaan di lapangan."
		}),
		/* @__PURE__ */ jsx("section", {
			className: "section-pad border-t border-ink/10 bg-white",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container-site",
				children: [categories.length > 1 && /* @__PURE__ */ jsx("div", {
					className: "mb-10 flex flex-wrap gap-2",
					children: categories.map((c) => /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => setActive(c),
						className: `rounded px-5 py-2.5 font-mono text-[13px] uppercase tracking-[0.04em] transition-colors ${active === c ? "bg-ink text-white" : "border border-ink/15 text-ink/60 hover:border-ink/30 hover:text-ink"}`,
						children: c
					}, c))
				}), visible.length === 0 ? /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", {
					className: "rounded-lg border border-dashed border-ink/15 px-8 py-20 text-center",
					children: [
						/* @__PURE__ */ jsx("img", {
							src: GALLERY_BANNER.src,
							alt: alt(GALLERY_BANNER, locale),
							loading: "lazy",
							decoding: "async",
							className: "mx-auto mb-10 aspect-[21/9] w-full max-w-3xl rounded-lg border border-ink/10 object-cover"
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "display-lg",
							children: locale === "en" ? "Gallery is being assembled" : "Galeri sedang dirakit"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mx-auto mt-4 max-w-lg text-ink/60",
							children: locale === "en" ? "Testing activity, equipment and project documentation will appear here to reinforce credibility." : "Dokumentasi kegiatan uji, peralatan dan proyek akan tampil di sini untuk memperkuat kredibilitas."
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-8 flex justify-center",
							children: /* @__PURE__ */ jsx(Button, {
								href: buildHref("/kontak"),
								size: "lg",
								children: t("common.cta_quote")
							})
						})
					]
				}) }) : /* @__PURE__ */ jsx("div", {
					className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
					children: visible.map((item, i) => /* @__PURE__ */ jsx(Reveal, {
						delay: i % 3 * 80,
						children: /* @__PURE__ */ jsxs("figure", {
							className: "group relative h-full overflow-hidden rounded-lg border border-ink/10 bg-ink/[0.03]",
							children: [/* @__PURE__ */ jsx("div", {
								className: "aspect-[4/3] w-full overflow-hidden",
								children: item.media ? /* @__PURE__ */ jsx("img", {
									src: `/storage/${item.media}`,
									alt: item.title,
									loading: "lazy",
									decoding: "async",
									className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
								}) : /* @__PURE__ */ jsx("div", {
									className: "flex h-full w-full items-center justify-center",
									children: /* @__PURE__ */ jsx("span", {
										className: "font-mono text-[11px] uppercase tracking-[0.14em] text-ink/40",
										children: item.title
									})
								})
							}), /* @__PURE__ */ jsx("figcaption", {
								className: "absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 bg-gradient-to-t from-black/85 via-black/30 to-transparent px-6 pb-5 pt-14",
								children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
									className: "text-sm font-bold text-white",
									children: item.title
								}), item.category && /* @__PURE__ */ jsx("p", {
									className: "mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-brand-300",
									children: item.category
								})] })
							})]
						})
					}, item.id))
				})]
			})
		})
	] });
}
//#endregion
export { Gallery as default };

//# sourceMappingURL=Gallery-8b3JA39O.js.map
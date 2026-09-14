import { i as useTrans, r as localizedPath, t as PublicLayout } from "./PublicLayout-B0huDJIh.js";
import { t as Reveal } from "./Reveal-Qg1-elCF.js";
import { t as PageHero } from "./PageHero-BMep523h.js";
import { a as INSIGHT_IMAGES, c as alt } from "./media-BkzI3eDn.js";
import { t as Seo } from "./Seo-DAd7HCP1.js";
import { Link } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/Insights/Index.jsx
function InsightsIndex({ insights }) {
	const { t, locale } = useTrans();
	const buildHref = (path) => localizedPath(locale, path);
	return /* @__PURE__ */ jsxs(PublicLayout, { children: [
		/* @__PURE__ */ jsx(Seo, { title: locale === "en" ? "Insight | PT Wall Street Indonesia" : "Insight | PT Wall Street Indonesia" }),
		/* @__PURE__ */ jsx(PageHero, {
			eyebrow: t("nav.insights"),
			title: locale === "en" ? "Geotechnical & mining industry notes" : "Wawasan industri geoteknik & pertambangan",
			lead: locale === "en" ? "Articles and notes from the laboratory team on soil, rock, environmental testing and industry best practice." : "Artikel dan catatan dari tim laboratorium seputar pengujian tanah, batuan, lingkungan dan praktik terbaik industri."
		}),
		/* @__PURE__ */ jsx("section", {
			className: "section-pad border-t border-ink/10 bg-white",
			children: /* @__PURE__ */ jsx("div", {
				className: "container-site",
				children: insights?.length > 0 ? /* @__PURE__ */ jsx("div", {
					className: "grid gap-5 md:grid-cols-2 lg:grid-cols-3",
					children: insights.map((post, i) => /* @__PURE__ */ jsx(Reveal, {
						delay: i * 80,
						children: /* @__PURE__ */ jsxs(Link, {
							href: buildHref(`/insight/${post.slug}`),
							className: "group flex h-full flex-col overflow-hidden rounded-lg border border-ink/10 bg-white transition-colors duration-200 hover:border-ink/25",
							children: [/* @__PURE__ */ jsx("div", {
								className: "relative aspect-[16/9] overflow-hidden",
								children: /* @__PURE__ */ jsx("img", {
									src: post.cover ? `/storage/${post.cover}` : INSIGHT_IMAGES[i % INSIGHT_IMAGES.length].src,
									alt: post.cover ? post[`title_${locale}`] ?? post.title_id : alt(INSIGHT_IMAGES[i % INSIGHT_IMAGES.length], locale),
									loading: "lazy",
									decoding: "async",
									className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
								})
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex flex-1 flex-col p-7",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center justify-between gap-4",
										children: [/* @__PURE__ */ jsx("span", {
											className: "font-mono text-[11px] uppercase tracking-[0.14em] text-brand-700",
											children: post.type
										}), /* @__PURE__ */ jsx("span", {
											className: "font-mono text-xs text-ink/40",
											children: new Intl.DateTimeFormat(locale === "en" ? "en-US" : "id-ID", { dateStyle: "medium" }).format(new Date(post.published_at))
										})]
									}),
									/* @__PURE__ */ jsx("h2", {
										className: "mt-6 text-xl font-bold leading-snug text-ink transition-colors group-hover:text-brand-600",
										children: post[`title_${locale}`] ?? post.title_id
									}),
									/* @__PURE__ */ jsx("p", {
										className: "mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-ink/60",
										children: post[`excerpt_${locale}`] ?? post.excerpt_id
									}),
									/* @__PURE__ */ jsx("span", {
										className: "mt-6 inline-block font-mono text-[13px] uppercase tracking-[0.04em] text-ink underline decoration-ink/30 underline-offset-8 transition-colors group-hover:decoration-ink",
										children: t("insight.read_more")
									})
								]
							})]
						})
					}, post.slug))
				}) : /* @__PURE__ */ jsxs("div", {
					className: "rounded-lg border border-dashed border-ink/15 px-8 py-20 text-center",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "display-lg",
						children: locale === "en" ? "No articles published yet" : "Belum ada artikel diterbitkan"
					}), /* @__PURE__ */ jsx("p", {
						className: "mx-auto mt-4 max-w-lg text-ink/60",
						children: locale === "en" ? "Insight content is on its way. Check back for geotechnical, mining and environmental updates." : "Konten wawasan akan segera hadir. Pantau halaman ini untuk update geoteknik, pertambangan, dan lingkungan."
					})]
				})
			})
		})
	] });
}
//#endregion
export { InsightsIndex as default };

//# sourceMappingURL=Index-Cgn8gHwm.js.map
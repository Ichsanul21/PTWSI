import { i as useTrans, n as Button, r as localizedPath, t as PublicLayout } from "./PublicLayout-B0huDJIh.js";
import { a as INSIGHT_IMAGES } from "./media-BkzI3eDn.js";
import { t as Seo } from "./Seo-DAd7HCP1.js";
import { Link } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/Insights/Show.jsx
function InsightShow({ post, related }) {
	const { t, locale } = useTrans();
	const buildHref = (path) => localizedPath(locale, path);
	const title = post[`title_${locale}`] ?? post.title_id;
	const excerpt = post[`excerpt_${locale}`] ?? post.excerpt_id;
	const body = (post[`body_${locale}`] ?? post.body_id ?? "").split(/\n\s*\n/).filter(Boolean);
	const date = new Intl.DateTimeFormat(locale === "en" ? "en-US" : "id-ID", { dateStyle: "long" }).format(new Date(post.published_at));
	const category = post[`category_${locale}`] || post.category_id;
	const imgSrc = post.cover ? `/storage/${post.cover}` : INSIGHT_IMAGES[(post.id ?? 0) % INSIGHT_IMAGES.length].src;
	return /* @__PURE__ */ jsxs(PublicLayout, { children: [/* @__PURE__ */ jsx(Seo, {
		title: `${title} | PT Wall Street Indonesia`,
		description: `${excerpt}. ${post[`title_${locale}`]}`
	}), /* @__PURE__ */ jsxs("article", { children: [/* @__PURE__ */ jsxs("header", {
		className: "relative overflow-hidden bg-white",
		children: [/* @__PURE__ */ jsx("div", { className: "dot-grid absolute inset-0 opacity-60" }), /* @__PURE__ */ jsxs("div", {
			className: "container-site relative pb-16 pt-40 lg:pb-20 lg:pt-48",
			children: [
				/* @__PURE__ */ jsxs(Link, {
					href: buildHref("/insight"),
					className: "group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-ink/50 transition-colors hover:text-ink",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "transition-transform group-hover:-translate-x-1",
							children: "←"
						}),
						" ",
						t("common.cta_back")
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-8 flex flex-wrap items-center gap-3",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "rounded bg-brand-600 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-white",
							children: post.type
						}),
						/* @__PURE__ */ jsx("span", {
							className: "font-mono text-xs uppercase tracking-[0.1em] text-ink/40",
							children: date
						}),
						category && /* @__PURE__ */ jsx("span", {
							className: "rounded border border-ink/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/60",
							children: category
						})
					]
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "display-xl mt-6 max-w-5xl",
					children: title
				}),
				excerpt && /* @__PURE__ */ jsx("p", {
					className: "mt-6 max-w-3xl text-lg leading-relaxed text-ink/60",
					children: excerpt
				}),
				/* @__PURE__ */ jsx("div", { className: "divider-line mt-10" })
			]
		})]
	}), /* @__PURE__ */ jsxs("div", {
		className: "section-pad border-t border-ink/10 bg-white",
		children: [/* @__PURE__ */ jsx("div", {
			className: "container-site",
			children: /* @__PURE__ */ jsx("figure", {
				className: "relative mb-14 overflow-hidden rounded-lg border border-ink/10",
				children: /* @__PURE__ */ jsx("img", {
					src: imgSrc,
					alt: title,
					loading: "lazy",
					decoding: "async",
					className: "aspect-[21/9] w-full object-cover"
				})
			})
		}), /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-4xl px-6 lg:px-8",
			children: [
				body.length > 0 ? /* @__PURE__ */ jsx("div", {
					className: "rounded-lg border border-ink/10 bg-white p-8 shadow-xl shadow-black/5 sm:p-12",
					children: body.map((para, i) => /* @__PURE__ */ jsx("p", {
						className: "mb-6 text-[17px] leading-relaxed text-ink/80 last:mb-0",
						children: para
					}, i))
				}) : /* @__PURE__ */ jsx("p", {
					className: "rounded-lg border border-dashed border-ink/15 px-8 py-16 text-center text-ink/50",
					children: t("insight.pending_body")
				}),
				related.length > 0 && /* @__PURE__ */ jsxs("div", {
					className: "mt-16",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-2xl font-bold text-ink",
						children: t("insight.related")
					}), /* @__PURE__ */ jsx("div", {
						className: "mt-6 grid gap-5 md:grid-cols-3",
						children: related.map((r) => /* @__PURE__ */ jsxs(Link, {
							href: buildHref(`/insight/${r.slug}`),
							className: "group flex h-full flex-col rounded-lg border border-ink/10 bg-white p-6 transition-colors duration-200 hover:border-ink/25",
							children: [/* @__PURE__ */ jsx("p", {
								className: "font-mono text-[11px] uppercase tracking-[0.14em] text-brand-700",
								children: r.type
							}), /* @__PURE__ */ jsx("h3", {
								className: "mt-3 font-bold leading-snug text-ink transition-colors group-hover:text-brand-600",
								children: r[`title_${locale}`]
							})]
						}, r.slug))
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-16 text-center",
					children: /* @__PURE__ */ jsx(Button, {
						href: buildHref("/kontak"),
						size: "lg",
						children: t("common.cta_quote")
					})
				})
			]
		})]
	})] })] });
}
//#endregion
export { InsightShow as default };

//# sourceMappingURL=Show-DLL4n532.js.map
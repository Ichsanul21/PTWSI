import { i as useTrans, n as Button, r as localizedPath, t as PublicLayout } from "./PublicLayout-B0huDJIh.js";
import { t as Reveal } from "./Reveal-Qg1-elCF.js";
import { t as SectionHeading } from "./SectionHeading-DZApisFk.js";
import { t as BlinkDot } from "./BlinkDot-CcE3wAw3.js";
import { a as INSIGHT_IMAGES, c as alt, s as SERVICE_IMAGES } from "./media-BkzI3eDn.js";
import { t as Seo } from "./Seo-DAd7HCP1.js";
import { t as ServiceIcon } from "./ServiceIcon-hMszGnNW.js";
import { Link } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
//#region resources/js/Pages/Services/Show.jsx
function ServiceShow({ service, related }) {
	const { t, locale } = useTrans();
	const [open, setOpen] = useState(-1);
	const buildHref = (path) => localizedPath(locale, path);
	const name = service[`name_${locale}`] ?? service.name_id;
	const description = service[`description_${locale}`] ?? service.description_id;
	const categories = service.test_categories ?? service.testCategories ?? [];
	const band = SERVICE_IMAGES[service.slug] ?? INSIGHT_IMAGES[0];
	return /* @__PURE__ */ jsxs(PublicLayout, { children: [
		/* @__PURE__ */ jsx(Seo, { title: `${name} | PT Wall Street Indonesia` }),
		/* @__PURE__ */ jsxs("header", {
			className: "relative overflow-hidden bg-white",
			children: [
				/* @__PURE__ */ jsx("div", { className: "dot-grid absolute inset-0 opacity-60" }),
				/* @__PURE__ */ jsx("div", { className: "absolute -top-40 left-1/2 h-96 w-[60rem] max-w-none -translate-x-1/2 rounded-full bg-brand-600/10 blur-3xl" }),
				/* @__PURE__ */ jsxs("div", {
					className: "container-site relative pb-16 pt-40 lg:pb-20 lg:pt-48",
					children: [/* @__PURE__ */ jsxs(Reveal, { children: [/* @__PURE__ */ jsxs(Link, {
						href: buildHref("/layanan"),
						className: "group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-ink/50 transition-colors hover:text-ink",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "transition-transform group-hover:-translate-x-1",
								children: "←"
							}),
							" ",
							t("common.cta_back")
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "mt-8 flex items-start gap-5",
						children: [/* @__PURE__ */ jsx("span", {
							className: "hidden h-14 w-14 shrink-0 items-center justify-center rounded bg-brand-600 text-white sm:flex",
							children: /* @__PURE__ */ jsx(ServiceIcon, {
								name: service.icon,
								className: "h-7 w-7"
							})
						}), /* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("p", {
								className: "kicker flex items-center gap-3 text-ink/50",
								children: [/* @__PURE__ */ jsx(BlinkDot, {}), t("nav.services")]
							}),
							/* @__PURE__ */ jsx("h1", {
								className: "display-xl mt-5 max-w-5xl",
								children: name
							}),
							/* @__PURE__ */ jsx("div", {
								className: "mt-5 flex flex-wrap items-center gap-3",
								children: /* @__PURE__ */ jsx("span", {
									className: "rounded border border-ink/15 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-ink/60",
									children: service.standards
								})
							})
						] })]
					})] }), /* @__PURE__ */ jsx(Reveal, {
						delay: 180,
						children: /* @__PURE__ */ jsx("div", { className: "divider-line mt-10" })
					})]
				})
			]
		}),
		(description || categories.length > 0) && /* @__PURE__ */ jsx("section", {
			className: "section-pad border-t border-ink/10 bg-white",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container-site",
				children: [
					/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("figure", {
						className: "relative mb-14 overflow-hidden rounded-lg border border-ink/10",
						children: [/* @__PURE__ */ jsx("img", {
							src: band.src,
							alt: alt(band, locale),
							loading: "lazy",
							decoding: "async",
							className: "aspect-[21/9] w-full object-cover"
						}), /* @__PURE__ */ jsx("figcaption", {
							className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent px-6 pb-5 pt-14 font-mono text-[11px] uppercase tracking-[0.14em] text-white/85",
							children: service.standards
						})]
					}) }),
					description && /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx("div", {
						className: "max-w-3xl text-lg leading-relaxed text-ink/75",
						children: description
					}) }),
					categories.length > 0 && /* @__PURE__ */ jsx(Reveal, {
						delay: 120,
						children: /* @__PURE__ */ jsx("div", {
							className: "mt-14 border-t border-ink/10",
							children: categories.map((cat, ci) => {
								const tests = cat.tests ?? [];
								return /* @__PURE__ */ jsxs("div", {
									className: "border-b border-ink/10",
									children: [/* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: () => setOpen(open === ci ? -1 : ci),
										"aria-expanded": open === ci,
										className: "group flex w-full items-center justify-between gap-4 py-6 text-left sm:py-7",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-4",
											children: [
												/* @__PURE__ */ jsx("span", {
													className: "font-mono text-sm text-ink/40",
													children: String(ci + 1).padStart(2, "0")
												}),
												/* @__PURE__ */ jsx("h2", {
													className: "text-xl font-bold text-ink transition-colors group-hover:text-brand-600 sm:text-2xl",
													children: cat[`name_${locale}`] ?? cat.name_id
												}),
												/* @__PURE__ */ jsxs("span", {
													className: "hidden font-mono text-xs text-ink/40 sm:inline",
													children: [
														"(",
														tests.length,
														" metode)"
													]
												})
											]
										}), /* @__PURE__ */ jsx("span", {
											className: `flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-xl leading-none transition-all duration-300 ${open === ci ? "rotate-45 border-brand-600 bg-brand-600 text-white" : "border-ink/15 text-ink"}`,
											children: "+"
										})]
									}), /* @__PURE__ */ jsx("div", {
										className: `grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.625,0.05,0,1)] ${open === ci ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`,
										children: /* @__PURE__ */ jsx("div", {
											className: "min-h-0 overflow-hidden",
											children: /* @__PURE__ */ jsx("div", {
												className: "grid gap-3 pb-10 md:grid-cols-2",
												children: tests.map((test) => /* @__PURE__ */ jsxs("div", {
													className: "rounded-lg border border-ink/10 bg-ink/[0.02] p-5",
													children: [
														/* @__PURE__ */ jsx("p", {
															className: "font-medium text-ink/90",
															children: test[`name_${locale}`] ?? test.name_id
														}),
														(test.standards?.length ?? 0) > 0 && /* @__PURE__ */ jsxs("p", {
															className: "mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink/40",
															children: [
																t("common.standards"),
																": ",
																test.standards.join(" · ")
															]
														}),
														test[`description_${locale}`] && /* @__PURE__ */ jsx("p", {
															className: "mt-2 text-sm leading-relaxed text-ink/60",
															children: test[`description_${locale}`]
														})
													]
												}, test.slug))
											})
										})
									})]
								}, ci);
							})
						})
					})
				]
			})
		}),
		related?.length > 0 && /* @__PURE__ */ jsx("section", {
			className: "section-pad border-t border-ink/10 bg-white",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container-site",
				children: [/* @__PURE__ */ jsx(SectionHeading, {
					eyebrow: locale === "en" ? "More" : "Lainnya",
					title: locale === "en" ? "Other testing divisions" : "Divisi pengujian lain"
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-12 grid gap-5 md:grid-cols-2",
					children: related.map((s, i) => /* @__PURE__ */ jsx(Reveal, {
						delay: i * 100,
						children: /* @__PURE__ */ jsxs(Link, {
							href: buildHref(`/layanan/${s.slug}`),
							className: "group flex h-full items-start gap-5 rounded-lg border border-ink/10 bg-white p-7 transition-colors duration-200 hover:border-ink/25",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "flex h-12 w-12 shrink-0 items-center justify-center rounded bg-ink/5 text-ink/70 transition-colors group-hover:bg-brand-600 group-hover:text-white",
									children: /* @__PURE__ */ jsx(ServiceIcon, {
										name: s.icon,
										className: "h-6 w-6"
									})
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex-1",
									children: [/* @__PURE__ */ jsx("h3", {
										className: "text-xl font-bold text-ink transition-colors group-hover:text-brand-600",
										children: s[`name_${locale}`] ?? s.name_id
									}), /* @__PURE__ */ jsx("p", {
										className: "mt-2 text-sm leading-relaxed text-ink/60",
										children: s[`short_${locale}`] ?? s.short_id
									})]
								}),
								/* @__PURE__ */ jsx("span", {
									className: "text-ink/40 transition-all group-hover:translate-x-1 group-hover:text-brand-600",
									children: "→"
								})
							]
						})
					}, s.slug))
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "border-t border-ink/10 bg-white pb-24 lg:pb-32",
			children: /* @__PURE__ */ jsx("div", {
				className: "container-site",
				children: /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-6 rounded-lg bg-brand-600 p-8 text-white sm:p-10 lg:flex-row lg:items-center lg:justify-between",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
						className: "text-2xl font-bold sm:text-3xl",
						children: t("common.cta_quote")
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-2 text-white/75",
						children: locale === "en" ? "Tell us your testing needs. We reply within 24 hours." : "Ceritakan kebutuhan pengujian Anda. Kami balas dalam 1×24 jam."
					})] }), /* @__PURE__ */ jsx(Button, {
						href: buildHref("/kontak") + "#lead",
						variant: "light",
						size: "lg",
						className: "shrink-0 self-start lg:self-auto",
						children: locale === "en" ? "Contact the Lab Team" : "Hubungi Tim Lab"
					})]
				}) })
			})
		})
	] });
}
//#endregion
export { ServiceShow as default };

//# sourceMappingURL=Show-CsLMXobE.js.map
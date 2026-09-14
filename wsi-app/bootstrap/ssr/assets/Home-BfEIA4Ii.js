import { i as useTrans, n as Button, r as localizedPath, t as PublicLayout } from "./PublicLayout-B0huDJIh.js";
import { t as Reveal } from "./Reveal-Qg1-elCF.js";
import { t as SectionHeading } from "./SectionHeading-DZApisFk.js";
import { a as INSIGHT_IMAGES, c as alt, i as HERO_IMAGE, n as FIELD_STRIP, s as SERVICE_IMAGES } from "./media-BkzI3eDn.js";
import { t as ServiceIcon } from "./ServiceIcon-hMszGnNW.js";
import { Head, Link, usePage } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Children, cloneElement, useEffect, useRef, useState } from "react";
//#region resources/js/Components/ui/CountUp.jsx
function splitValue(raw) {
	const str = String(raw ?? "");
	const match = str.match(/^([\d.,]+)(.*)$/);
	if (!match) return {
		numeric: null,
		rest: str
	};
	return {
		numeric: parseFloat(match[1].replace(/,/g, "")) || 0,
		rest: match[2]
	};
}
function CountUp({ value, suffix = "", prefix = "", duration = 1600, decimals = 0, className = "" }) {
	const ref = useRef(null);
	const raf = useRef(0);
	const [display, setDisplay] = useState(() => splitValue(value).numeric === null ? String(value ?? "") : "0");
	useEffect(() => {
		const { numeric, rest } = splitValue(value);
		const tail = `${rest}${suffix}`;
		const format = (n) => `${n.toFixed(decimals)}${tail}`;
		const reduceMotion = typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (numeric === null) {
			setDisplay(String(value ?? ""));
			return;
		}
		const el = ref.current;
		if (!el || !("IntersectionObserver" in window) || reduceMotion) {
			setDisplay(format(numeric));
			return;
		}
		let started = false;
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting || started) return;
				started = true;
				const t0 = performance.now();
				const tick = (now) => {
					const progress = Math.min((now - t0) / duration, 1);
					const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
					setDisplay(format(numeric * eased));
					if (progress < 1) raf.current = requestAnimationFrame(tick);
				};
				raf.current = requestAnimationFrame(tick);
				observer.disconnect();
			});
		}, { threshold: .4 });
		observer.observe(el);
		return () => {
			observer.disconnect();
			cancelAnimationFrame(raf.current);
		};
	}, [
		value,
		duration,
		decimals,
		suffix
	]);
	return /* @__PURE__ */ jsxs("span", {
		ref,
		className,
		children: [prefix, display]
	});
}
//#endregion
//#region resources/js/Components/ui/Marquee.jsx
function Marquee({ children, speed = 150, reverse = false, className = "", gapClass = "gap-16 pr-16" }) {
	const trackRef = useRef(null);
	const paused = useRef(false);
	useEffect(() => {
		const track = trackRef.current;
		if (!track) return;
		let raf = 0;
		let last = performance.now();
		let x = 0;
		const tick = (now) => {
			const dt = Math.min(64, now - last) / 1e3;
			last = now;
			if (!paused.current && !document.hidden) {
				const half = track.scrollWidth / 2;
				if (half > 0) {
					x += (reverse ? 1 : -1) * speed * dt;
					x = reverse ? (x % half + half) % half - half : -((-x % half + half) % half);
					track.style.transform = `translate3d(${x}px, 0, 0)`;
				}
			}
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [speed, reverse]);
	const items = Children.toArray(children);
	const renderSet = (prefix) => items.map((child, i) => cloneElement(child, { key: `${prefix}-${i}` }));
	return /* @__PURE__ */ jsx("div", {
		className: `marquee-mask overflow-hidden ${className}`,
		onMouseEnter: () => {
			paused.current = true;
		},
		onMouseLeave: () => {
			paused.current = false;
		},
		children: /* @__PURE__ */ jsx("div", {
			ref: trackRef,
			className: "flex w-max will-change-transform",
			children: [0, 1].map((half) => /* @__PURE__ */ jsx("div", {
				className: `flex items-center ${gapClass}`,
				"aria-hidden": half === 1,
				children: renderSet(half)
			}, half))
		})
	});
}
//#endregion
//#region resources/js/Pages/Home.jsx
var SECTORS = [
	"Pertambangan Batubara",
	"Infrastruktur",
	"Bendungan",
	"Energi",
	"Tambang Bawah Tanah",
	"Tambang Terbuka",
	"IKN & Jalan Tol",
	"ESG & AMDAL"
];
var VIDEO_ID = "DLnb-pSftRI";
function Hero() {
	const { t, locale } = useTrans();
	const hero = usePage().props.site?.hero ?? {};
	const { locale: lc } = usePage().props;
	const buildHref = (path) => localizedPath(locale, path);
	return /* @__PURE__ */ jsxs("section", {
		className: "relative overflow-hidden bg-ink",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "absolute inset-0 overflow-hidden",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ jsx("img", {
						src: HERO_IMAGE.src,
						alt: "",
						loading: "eager",
						decoding: "async",
						className: "kenburns absolute inset-0 h-full w-full object-cover"
					}),
					/* @__PURE__ */ jsx("iframe", {
						className: "yt-cover",
						src: `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&fs=0&iv_load_policy=3`,
						title: lc === "en" ? "Laboratory background video" : "Video latar laboratorium",
						allow: "autoplay; encrypted-media",
						referrerPolicy: "strict-origin-when-cross-origin",
						tabIndex: -1
					}),
					/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" })
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "container-site relative pb-16 pt-24 lg:pb-20 lg:pt-32",
				children: [
					/* @__PURE__ */ jsx(Reveal, {
						delay: 100,
						children: /* @__PURE__ */ jsx("h1", {
							className: "display mt-8 max-w-6xl text-white",
							children: hero[`title_${lc}`] ?? ""
						})
					}),
					/* @__PURE__ */ jsx(Reveal, {
						delay: 180,
						children: /* @__PURE__ */ jsx("div", { className: "mt-10 h-px w-full bg-white/25" })
					}),
					/* @__PURE__ */ jsx(Reveal, {
						delay: 240,
						children: /* @__PURE__ */ jsxs("div", {
							className: "mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between",
							children: [/* @__PURE__ */ jsx("p", {
								className: "max-w-xl text-base leading-relaxed text-white/75 sm:text-lg",
								children: hero[`subtitle_${lc}`] ?? ""
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex shrink-0 items-start gap-6 font-mono text-xs uppercase tracking-[0.14em] text-white/60",
								children: [/* @__PURE__ */ jsx("span", { children: "0.5036ºS" }), /* @__PURE__ */ jsx("span", { children: "117.1214ºE" })]
							})]
						})
					}),
					/* @__PURE__ */ jsx(Reveal, {
						delay: 300,
						children: /* @__PURE__ */ jsxs("div", {
							className: "mt-10 flex flex-wrap items-center gap-4",
							children: [/* @__PURE__ */ jsx(Button, {
								href: buildHref("/kontak") + "#lead",
								size: "lg",
								variant: "primary",
								children: hero[`cta_primary_${lc}`] ?? t("common.cta_quote")
							}), /* @__PURE__ */ jsx(Button, {
								href: buildHref("/layanan"),
								size: "lg",
								variant: "glass",
								children: hero[`cta_secondary_${lc}`] ?? t("common.cta_services")
							})]
						})
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "relative border-t border-white/15",
				children: /* @__PURE__ */ jsx(Marquee, {
					speed: 150,
					className: "py-7",
					gapClass: "gap-16 pr-16",
					children: SECTORS.map((s, i) => /* @__PURE__ */ jsxs("span", {
						className: "flex items-center gap-16 whitespace-nowrap font-mono text-xs uppercase tracking-[0.25em] text-white/60",
						children: [s, /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-brand-400" })]
					}, i))
				})
			})
		]
	});
}
function Stats() {
	const stats = usePage().props.site?.stats ?? [];
	const { locale } = usePage().props;
	if (!stats.length) return null;
	return /* @__PURE__ */ jsx("section", {
		className: "bg-ink",
		children: /* @__PURE__ */ jsx("div", {
			className: "container-site",
			children: /* @__PURE__ */ jsx("div", {
				className: "grid gap-10 py-14 sm:grid-cols-3 lg:py-16",
				children: stats.map((s, i) => /* @__PURE__ */ jsxs(Reveal, {
					delay: i * 120,
					children: [/* @__PURE__ */ jsx("p", {
						className: "display-lg text-white",
						children: /* @__PURE__ */ jsx(CountUp, {
							value: s.value,
							suffix: s.suffix ?? ""
						})
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-3 font-mono text-xs uppercase tracking-[0.18em] text-white/50",
						children: s[`label_${locale}`] ?? s.label_id
					})]
				}, i))
			})
		})
	});
}
function ClientTile({ c, n }) {
	return /* @__PURE__ */ jsxs("a", {
		href: c.website || "#",
		target: c.website ? "_blank" : void 0,
		rel: "noreferrer",
		className: "group flex h-24 w-56 shrink-0 items-center gap-4 rounded-lg border border-ink/10 bg-white px-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-600 hover:shadow-xl hover:shadow-brand-600/10",
		children: [/* @__PURE__ */ jsx("span", {
			className: "font-mono text-xs text-brand-600",
			children: String(n + 1).padStart(2, "0")
		}), c.logo ? /* @__PURE__ */ jsx("img", {
			src: `/storage/${c.logo}`,
			alt: c.name,
			loading: "lazy",
			decoding: "async",
			className: "max-h-10 max-w-[70%] object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
		}) : /* @__PURE__ */ jsx("span", {
			className: "text-sm font-bold leading-snug text-ink/60 transition-colors group-hover:text-ink",
			children: c.name
		})]
	});
}
function ClientMarquee({ clients }) {
	const { t, locale } = useTrans();
	const buildHref = (path) => localizedPath(locale, path);
	if (!clients?.length) return null;
	return /* @__PURE__ */ jsxs("section", {
		className: "overflow-hidden bg-white",
		children: [/* @__PURE__ */ jsx("div", {
			className: "container-site pt-16",
			children: /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-end justify-between gap-6",
				children: [/* @__PURE__ */ jsx(SectionHeading, {
					eyebrow: t("nav.clients"),
					title: t("common.our_clients")
				}), /* @__PURE__ */ jsx(Link, {
					href: buildHref("/klien"),
					className: "font-mono text-[13px] uppercase tracking-[0.04em] text-ink underline decoration-ink/30 underline-offset-8 transition-colors hover:decoration-ink",
					children: t("common.see_all")
				})]
			}) })
		}), /* @__PURE__ */ jsx(Marquee, {
			speed: 150,
			reverse: true,
			className: "pb-14 pt-10",
			gapClass: "gap-5 pr-5",
			children: clients.map((c, i) => /* @__PURE__ */ jsx(ClientTile, {
				c,
				n: i
			}, c.id))
		})]
	});
}
function Services({ services }) {
	const { t, locale } = useTrans();
	const buildHref = (path) => localizedPath(locale, path);
	return /* @__PURE__ */ jsx("section", {
		className: "section-pad bg-white",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container-site",
			children: [/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-end justify-between gap-6",
				children: [/* @__PURE__ */ jsx(SectionHeading, {
					eyebrow: t("nav.services"),
					title: t("home.services_title")
				}), /* @__PURE__ */ jsx(Link, {
					href: buildHref("/layanan"),
					className: "font-mono text-[13px] uppercase tracking-[0.04em] text-ink underline decoration-ink/30 underline-offset-8 transition-colors hover:decoration-ink",
					children: t("common.see_all")
				})]
			}) }), /* @__PURE__ */ jsx("div", {
				className: "mt-12 border-t border-ink/10",
				children: services.map((s, i) => {
					const name = s[`name_${locale}`] ?? s.name_id;
					const short = s[`short_${locale}`] ?? s.short_id;
					const imgSrc = s.cover_url || SERVICE_IMAGES[s.slug]?.src;
					const imgAlt = s.cover_url ? name : alt(SERVICE_IMAGES[s.slug], locale);
					return /* @__PURE__ */ jsx(Reveal, {
						delay: i * 80,
						children: /* @__PURE__ */ jsxs(Link, {
							href: buildHref(`/layanan/${s.slug}`),
							className: "group grid items-center gap-5 border-b border-ink/10 py-8 transition-colors duration-200 hover:bg-ink/[0.02] sm:py-10 lg:grid-cols-12",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "font-mono text-sm text-ink/35 lg:col-span-1",
									children: String(i + 1).padStart(2, "0")
								}),
								imgSrc ? /* @__PURE__ */ jsx("img", {
									src: imgSrc,
									alt: imgAlt,
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
									className: "lg:col-span-8",
									children: [/* @__PURE__ */ jsx("span", {
										className: "display-lg block transition-colors group-hover:text-brand-600",
										children: name
									}), /* @__PURE__ */ jsx("span", {
										className: "mt-2 block max-w-2xl text-sm leading-relaxed text-ink/60",
										children: short
									})]
								}),
								/* @__PURE__ */ jsxs("span", {
									className: "flex items-center justify-between gap-4 lg:col-span-2 lg:justify-end",
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
					}, s.slug);
				})
			})]
		})
	});
}
var WHYS = [
	{
		no: "01",
		title_id: "Spesialis Geomekanika Murni",
		title_en: "Pure Geomechanics Specialists",
		body_id: "Fokus penuh pada tanah, batuan, dan air. Setiap hasil uji terdokumentasi dan dapat dipertanggungjawabkan.",
		body_en: "Fully focused on soil, rock, and water. Every result documented and accountable."
	},
	{
		no: "02",
		title_id: "Standar Nasional & Internasional",
		title_en: "National & International Standards",
		body_id: "Setiap prosedur mengacu pada SNI, ASTM, AASHTO, JIS, atau ISRM sesuai kebutuhan proyek Anda.",
		body_en: "Every procedure follows SNI, ASTM, AASHTO, JIS, or ISRM to suit your project."
	},
	{
		no: "03",
		title_id: "Cepat, Terjangkau, Dekat Tambang",
		title_en: "Fast, Affordable, Close to the Mine",
		body_id: "Dari Samarinda, sampel Anda tidak perlu dikirim ke Jawa. Hemat biaya logistik dan terima hasil lebih cepat.",
		body_en: "From Samarinda, your samples never travel to Java. Save logistics cost and get results sooner."
	}
];
function Why() {
	const { t } = useTrans();
	const { locale: lc } = usePage().props;
	return /* @__PURE__ */ jsx("section", {
		className: "section-pad border-t border-ink/10 bg-white",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container-site",
			children: [/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx(SectionHeading, {
				eyebrow: t("nav.about"),
				title: t("home.why_title")
			}) }), /* @__PURE__ */ jsx("div", {
				className: "mt-12 grid gap-5 md:grid-cols-3",
				children: WHYS.map((w, i) => /* @__PURE__ */ jsx(Reveal, {
					delay: i * 120,
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex h-full flex-col rounded-lg border border-ink/10 bg-white p-8 transition-colors duration-200 hover:border-ink/25 sm:p-10",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ jsx("span", {
									className: "font-mono text-sm text-brand-600",
									children: w.no
								}), /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-brand-600" })]
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "mt-10 text-2xl font-bold leading-tight text-ink sm:mt-14",
								children: w[`title_${lc}`]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-4 text-sm leading-relaxed text-ink/60",
								children: w[`body_${lc}`]
							})
						]
					})
				}, w.no))
			})]
		})
	});
}
function FieldStrip() {
	const { locale } = useTrans();
	return /* @__PURE__ */ jsx("section", {
		className: "border-t border-ink/10 bg-white",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container-site section-pad",
			children: [/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx("p", {
				className: "kicker text-ink/50",
				children: locale === "en" ? "From pit to laboratory" : "Dari lapangan ke laboratorium"
			}) }), /* @__PURE__ */ jsx("div", {
				className: "mt-10 grid gap-5 sm:grid-cols-3",
				children: FIELD_STRIP.map((img, i) => /* @__PURE__ */ jsx(Reveal, {
					delay: i * 120,
					children: /* @__PURE__ */ jsxs("figure", {
						className: "group relative overflow-hidden rounded-lg border border-ink/10",
						children: [/* @__PURE__ */ jsx("img", {
							src: img.src,
							alt: alt(img, locale),
							loading: "lazy",
							decoding: "async",
							className: "aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
						}), /* @__PURE__ */ jsx("figcaption", {
							className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent px-5 pb-4 pt-12 font-mono text-[11px] uppercase tracking-[0.14em] text-white/90",
							children: alt(img, locale)
						})]
					})
				}, img.src))
			})]
		})
	});
}
function TestMenu({ menu }) {
	const { t, locale } = useTrans();
	const [open, setOpen] = useState(-1);
	const buildHref = (path) => localizedPath(locale, path);
	if (!menu?.length) return null;
	return /* @__PURE__ */ jsx("section", {
		className: "section-pad border-t border-ink/10 bg-white",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container-site",
			children: [/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx(SectionHeading, {
				eyebrow: t("section.menu_tests_label"),
				title: t("common.menu_tests")
			}) }), /* @__PURE__ */ jsx(Reveal, {
				delay: 120,
				children: /* @__PURE__ */ jsxs("div", {
					className: "mt-12 border-t border-ink/10",
					children: [menu.map((group, gi) => /* @__PURE__ */ jsxs("div", {
						className: "border-b border-ink/10",
						children: [/* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: () => setOpen(open === gi ? -1 : gi),
							"aria-expanded": open === gi,
							className: "group flex w-full items-center justify-between gap-4 py-7 text-left sm:py-8",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-5",
								children: [/* @__PURE__ */ jsx("span", {
									className: "font-mono text-sm text-ink/40",
									children: String(gi + 1).padStart(2, "0")
								}), /* @__PURE__ */ jsx("h3", {
									className: "text-xl font-bold text-ink transition-colors group-hover:text-brand-600 sm:text-2xl",
									children: group[`service_${locale}`] ?? group.service_id
								})]
							}), /* @__PURE__ */ jsx("span", {
								className: `flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-xl leading-none transition-all duration-300 ${open === gi ? "rotate-45 border-brand-600 bg-brand-600 text-white" : "border-ink/15 text-ink"}`,
								children: "+"
							})]
						}), /* @__PURE__ */ jsx("div", {
							className: `grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.625,0.05,0,1)] ${open === gi ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`,
							children: /* @__PURE__ */ jsx("div", {
								className: "min-h-0 overflow-hidden",
								children: /* @__PURE__ */ jsx("div", {
									className: "grid gap-10 pb-10 md:grid-cols-3",
									children: group.categories.map((cat, ci) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
										className: "kicker text-ink/40",
										children: cat[`name_${locale}`] ?? cat.name_id
									}), /* @__PURE__ */ jsx("ul", {
										className: "mt-5 space-y-3",
										children: cat.tests.map((test) => /* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx("span", {
											className: "text-sm font-medium text-ink/85",
											children: test[`name_${locale}`] ?? test.name_id
										}), (test.standards?.length ?? 0) > 0 && /* @__PURE__ */ jsx("span", {
											className: "mt-0.5 block font-mono text-[10px] uppercase tracking-[0.12em] text-ink/40",
											children: test.standards.join(" · ")
										})] }, test.slug))
									})] }, ci))
								})
							})
						})]
					}, group.slug)), /* @__PURE__ */ jsx("div", {
						className: "border-b border-ink/10 py-6",
						children: /* @__PURE__ */ jsx(Link, {
							href: buildHref("/layanan"),
							className: "font-mono text-[13px] uppercase tracking-[0.04em] text-ink underline decoration-ink/30 underline-offset-8 transition-colors hover:decoration-ink",
							children: t("common.download_sheet")
						})
					})]
				})
			})]
		})
	});
}
function InsightsTeaser({ insights }) {
	const { t, locale } = useTrans();
	const buildHref = (path) => localizedPath(locale, path);
	if (!insights?.length) return null;
	return /* @__PURE__ */ jsx("section", {
		className: "section-pad border-t border-ink/10 bg-white",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container-site",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-end justify-between gap-6",
				children: [/* @__PURE__ */ jsx(SectionHeading, {
					eyebrow: t("nav.insights"),
					title: t("home.insights_title")
				}), /* @__PURE__ */ jsx(Link, {
					href: buildHref("/insight"),
					className: "font-mono text-[13px] uppercase tracking-[0.04em] text-ink underline decoration-ink/30 underline-offset-8 transition-colors hover:decoration-ink",
					children: t("common.see_all")
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "mt-12 grid gap-5 md:grid-cols-3",
				children: insights.map((post, i) => /* @__PURE__ */ jsx(Reveal, {
					delay: i * 120,
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
								/* @__PURE__ */ jsx("h3", {
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
			})]
		})
	});
}
function Home({ services, menu, insights, clients }) {
	return /* @__PURE__ */ jsxs(PublicLayout, { children: [
		/* @__PURE__ */ jsx(Head, { children: /* @__PURE__ */ jsx("title", { children: "PT Wall Street Indonesia | Laboratorium Tanah, Batuan & Lingkungan" }) }),
		/* @__PURE__ */ jsx(Hero, {}),
		/* @__PURE__ */ jsx(Stats, {}),
		/* @__PURE__ */ jsx(Services, { services }),
		/* @__PURE__ */ jsx(Why, {}),
		/* @__PURE__ */ jsx(ClientMarquee, { clients }),
		/* @__PURE__ */ jsx(FieldStrip, {}),
		/* @__PURE__ */ jsx(TestMenu, { menu }),
		/* @__PURE__ */ jsx(InsightsTeaser, { insights })
	] });
}
//#endregion
export { Home as default };

//# sourceMappingURL=Home-BfEIA4Ii.js.map
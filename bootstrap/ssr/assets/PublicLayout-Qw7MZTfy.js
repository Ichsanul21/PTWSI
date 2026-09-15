import { Link, usePage } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from "react";
//#region resources/js/hooks/useTrans.js
function useTrans() {
	const { translations, locale } = usePage().props;
	return {
		t: useMemo(() => (key, fallback = "") => {
			if (translations && translations[key]) return translations[key];
			return fallback || key;
		}, [translations]),
		locale
	};
}
function localizedPath(locale, path) {
	if (path === "/") return locale === "en" ? "/en" : "/";
	return locale === "en" ? `/en${path}` : path;
}
//#endregion
//#region resources/js/Components/ui/Button.jsx
var variants = {
	primary: "bg-brand-600 text-white hover:bg-brand-500 focus-visible:ring-brand-500",
	secondary: "bg-ink/5 text-ink hover:bg-ink/10 focus-visible:ring-ink/20",
	glass: "border border-white/25 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 focus-visible:ring-white/50",
	light: "bg-cream text-ink hover:bg-white focus-visible:ring-white",
	underline: "bg-transparent text-ink underline decoration-ink/30 underline-offset-8 hover:decoration-ink focus-visible:ring-ink/20",
	underlineLight: "bg-transparent text-white underline decoration-white/40 underline-offset-8 hover:decoration-white focus-visible:ring-white/50"
};
var sizes = {
	none: "px-0 py-1 text-[13px]",
	sm: "px-4 py-2 text-xs",
	md: "px-6 py-3 text-[13px]",
	lg: "px-8 py-4 text-sm"
};
function Button({ as = "link", href = "#", variant = "primary", size = "md", className = "", children, external = false, block = false, ...rest }) {
	const classes = `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded font-mono font-medium uppercase leading-none tracking-[0.04em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-[0.98] ${block ? "w-full" : ""} ${variants[variant]} ${sizes[size]} ${className}`;
	if (as === "button") return /* @__PURE__ */ jsx("button", {
		className: classes,
		...rest,
		children
	});
	if (external) return /* @__PURE__ */ jsx("a", {
		href,
		className: classes,
		target: "_blank",
		rel: "noopener noreferrer",
		...rest,
		children
	});
	return /* @__PURE__ */ jsx(Link, {
		href,
		className: classes,
		...rest,
		children
	});
}
//#endregion
//#region resources/js/Components/AppHeader.jsx
var NAV = [
	{
		key: "nav.home",
		path: "/"
	},
	{
		key: "nav.about",
		path: "/tentang"
	},
	{
		key: "nav.services",
		path: "/layanan"
	},
	{
		key: "nav.clients",
		path: "/klien"
	},
	{
		key: "nav.insights",
		path: "/insight"
	},
	{
		key: "nav.gallery",
		path: "/galeri"
	},
	{
		key: "nav.contact",
		path: "/kontak"
	}
];
function AppHeader() {
	const { t, locale } = useTrans();
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);
	const { url } = usePage();
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 24);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	const normalized = url === "/en" ? "/en" : url;
	const floating = scrolled;
	const isActive = (path) => {
		if (path === "/") return normalized === "/" || normalized === "/en";
		return normalized.startsWith(path) || normalized.startsWith(`/en${path}`);
	};
	const buildHref = (path) => localizedPath(locale, path);
	const langHref = locale === "en" ? localizedPath("id", url === "/en" ? "/" : url.replace(/^\/en/, "")) : `/en${url}`;
	const navLink = (active) => `whitespace-nowrap px-3 py-2 font-mono text-[13px] uppercase tracking-[0.035em] transition-opacity duration-150 hover:opacity-60 ${active ? "text-brand-600" : "text-ink"}`;
	return /* @__PURE__ */ jsxs("header", {
		className: "fixed inset-x-0 top-0 z-50",
		children: [/* @__PURE__ */ jsx("div", {
			className: "w-full",
			children: /* @__PURE__ */ jsxs("div", {
				className: `mx-auto flex w-full items-center justify-between gap-3 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${floating ? "mt-3 max-w-[90%] rounded-lg border border-black/10 bg-white/50 px-4 py-3 shadow-lg shadow-black/5 sm:mt-6 sm:max-w-[70rem] sm:px-5" : "mt-0 max-w-full rounded-none border-b border-black/10 bg-white/85 px-5 py-4 sm:px-8"}`,
				children: [
					/* @__PURE__ */ jsxs(Link, {
						href: buildHref("/"),
						className: "flex shrink-0 items-center gap-3",
						"aria-label": "PT Wall Street Indonesia",
						children: [/* @__PURE__ */ jsx("img", {
							src: "/images/logo-bulat.png",
							alt: "PT Wall Street Indonesia",
							className: "h-9 w-9 rounded-full object-cover"
						}), /* @__PURE__ */ jsx("span", {
							className: "hidden text-sm font-bold tracking-wide text-ink min-[420px]:block",
							children: "WALL STREET INDONESIA"
						})]
					}),
					/* @__PURE__ */ jsx("nav", {
						className: "hidden min-w-0 flex-1 items-center justify-center xl:flex",
						"aria-label": "Primary",
						children: NAV.map((item) => /* @__PURE__ */ jsx(Link, {
							href: buildHref(item.path),
							className: navLink(isActive(item.path)),
							children: t(item.key)
						}, item.key))
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex shrink-0 items-center gap-3",
						children: [
							/* @__PURE__ */ jsx(Link, {
								href: langHref,
								className: "hidden font-mono text-xs font-medium tracking-[0.1em] text-ink/50 transition-colors hover:text-ink sm:block",
								children: locale === "en" ? "ID" : "EN"
							}),
							/* @__PURE__ */ jsx(Button, {
								href: buildHref("/kontak") + "#lead",
								variant: "primary",
								size: "sm",
								className: "hidden whitespace-nowrap sm:inline-flex",
								children: t("common.cta_quote")
							}),
							/* @__PURE__ */ jsx("button", {
								type: "button",
								"aria-label": "Menu",
								onClick: () => setOpen(!open),
								className: "flex h-10 w-10 items-center justify-center rounded border border-black/10 bg-black/5 text-ink xl:hidden",
								children: /* @__PURE__ */ jsx("svg", {
									className: "h-5 w-5",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "2",
									strokeLinecap: "round",
									children: open ? /* @__PURE__ */ jsx("path", { d: "M6 6l12 12M18 6L6 18" }) : /* @__PURE__ */ jsx("path", { d: "M4 7h16M4 12h16M4 17h16" })
								})
							})
						]
					})
				]
			})
		}), open && /* @__PURE__ */ jsx("div", {
			className: floating ? "nav-shell pt-2" : "px-4 pt-2 sm:px-6",
			children: /* @__PURE__ */ jsxs("div", {
				className: "animate-menu-in rounded-lg border border-black/10 bg-white/95 p-3 shadow-2xl shadow-black/10 backdrop-blur-xl xl:hidden",
				children: [
					/* @__PURE__ */ jsx("nav", {
						className: "flex flex-col",
						"aria-label": "Mobile",
						children: NAV.map((item) => /* @__PURE__ */ jsx(Link, {
							href: buildHref(item.path),
							onClick: () => setOpen(false),
							className: `rounded px-4 py-3 font-mono text-[13px] uppercase tracking-[0.035em] transition-colors ${isActive(item.path) ? "bg-black/5 text-brand-700" : "text-ink hover:bg-black/[0.03]"}`,
							children: t(item.key)
						}, item.key))
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-2 flex items-center gap-3 border-t border-black/10 px-4 pt-4",
						children: /* @__PURE__ */ jsx(Link, {
							href: langHref,
							onClick: () => setOpen(false),
							className: "font-mono text-xs font-medium text-ink/50",
							children: locale === "en" ? "BAHASA INDONESIA (ID)" : "ENGLISH (EN)"
						})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col gap-2 p-2",
						children: [/* @__PURE__ */ jsx(Button, {
							href: "/admin/login",
							variant: "secondary",
							size: "md",
							block: true,
							onClick: () => setOpen(false),
							children: t("nav.login")
						}), /* @__PURE__ */ jsx(Button, {
							href: buildHref("/kontak") + "#lead",
							variant: "primary",
							size: "md",
							block: true,
							onClick: () => setOpen(false),
							children: t("common.cta_quote")
						})]
					})
				]
			})
		})]
	});
}
//#endregion
//#region resources/js/Components/AppFooter.jsx
function AppFooter() {
	const { t, locale } = useTrans();
	const brand = usePage().props.site?.brand ?? {};
	const buildHref = (path) => localizedPath(locale, path);
	return /* @__PURE__ */ jsx("footer", {
		className: "bg-white pb-6 pt-10",
		children: /* @__PURE__ */ jsx("div", {
			className: "container-site",
			children: /* @__PURE__ */ jsxs("div", {
				className: "rounded-lg bg-ink p-8 text-white sm:p-10",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-10 lg:grid-cols-12",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "lg:col-span-5",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "flex items-center gap-3",
									children: /* @__PURE__ */ jsx("img", {
										src: "/images/logo-white.png",
										alt: brand.name ?? "PT Wall Street Indonesia",
										className: "h-8 w-auto"
									})
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-5 max-w-md text-sm leading-relaxed text-white/65",
									children: t("footer.about")
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-4 font-mono text-xs uppercase tracking-[0.18em] text-brand-300",
									children: brand.tagline_id ?? t("common.tagline")
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "grid gap-8 sm:grid-cols-3 lg:col-span-7",
							children: [
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
									className: "kicker mb-5 text-white/40",
									children: t("footer.services")
								}), /* @__PURE__ */ jsx("ul", {
									className: "space-y-3",
									children: [
										{
											id: "Geomekanika & Mekanika Tanah",
											en: "Geomechanics & Soil Mechanics",
											path: "/layanan/geomekanika"
										},
										{
											id: "Mekanika Batuan & Petrofisika",
											en: "Rock Mechanics & Petrophysics",
											path: "/layanan/mekanika-batuan"
										},
										{
											id: "Hidrogeologi & Lingkungan",
											en: "Hydrogeology & Environment",
											path: "/layanan/hidrogeologi-lingkungan"
										}
									].map((s) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
										href: buildHref(s.path),
										className: "font-mono text-[13px] uppercase tracking-[0.032em] text-white/75 transition-opacity hover:opacity-60",
										children: locale === "en" ? s.en : s.id
									}) }, s.path))
								})] }),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
									className: "kicker mb-5 text-white/40",
									children: t("footer.pages")
								}), /* @__PURE__ */ jsx("ul", {
									className: "space-y-3",
									children: [
										{
											key: "nav.about",
											path: "/tentang"
										},
										{
											key: "nav.clients",
											path: "/klien"
										},
										{
											key: "nav.insights",
											path: "/insight"
										},
										{
											key: "nav.gallery",
											path: "/galeri"
										},
										{
											key: "nav.contact",
											path: "/kontak"
										}
									].map((p) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
										href: buildHref(p.path),
										className: "font-mono text-[13px] uppercase tracking-[0.032em] text-white/75 transition-opacity hover:opacity-60",
										children: t(p.key)
									}) }, p.path))
								})] }),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
									className: "kicker mb-5 text-white/40",
									children: t("footer.contact")
								}), /* @__PURE__ */ jsxs("ul", {
									className: "space-y-2 text-sm text-white/75",
									children: [
										brand.phones?.map((phone) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
											href: `tel:${phone.replace(/-/g, "")}`,
											className: "transition-opacity hover:opacity-60",
											children: phone
										}) }, phone)),
										/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
											href: `mailto:${brand.email}`,
											className: "break-all transition-opacity hover:opacity-60",
											children: brand.email
										}) }),
										/* @__PURE__ */ jsx("li", {
											className: "pt-2 text-white/50",
											children: brand.working_hours
										}),
										/* @__PURE__ */ jsx("li", {
											className: "text-white/50",
											children: brand[`address_${locale}`] ?? brand.address_id
										})
									]
								})] })
							]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between",
						children: [
							/* @__PURE__ */ jsxs("p", {
								className: "font-mono text-xs text-white/50",
								children: [
									"© ",
									(/* @__PURE__ */ new Date()).getFullYear(),
									" ",
									brand.name ?? "PT Wall Street Indonesia",
									". ",
									t("footer.rights")
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "font-mono text-xs uppercase tracking-[0.12em] text-white/40",
								children: t("common.made_in")
							}),
							/* @__PURE__ */ jsx(Link, {
								href: "/admin",
								className: "font-mono text-xs text-white/50 transition-opacity hover:opacity-60",
								children: t("footer.admin")
							})
						]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-4 font-mono text-[11px] text-white/30",
						children: t("footer.credits")
					})
				]
			})
		})
	});
}
//#endregion
//#region resources/js/Components/ui/Reveal.jsx
var EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
function Reveal({ children, className = "", delay = 0, as: Tag = "div" }) {
	const ref = useRef(null);
	const [visible, setVisible] = useState(false);
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const reduceMotion = typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (!("IntersectionObserver" in window) || reduceMotion) {
			setVisible(true);
			return;
		}
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setVisible(true);
					observer.unobserve(entry.target);
				}
			});
		}, {
			threshold: .1,
			rootMargin: "0px 0px -10% 0px"
		});
		observer.observe(el);
		return () => observer.disconnect();
	}, []);
	return /* @__PURE__ */ jsx(Tag, {
		ref,
		className: `${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"} ${className}`,
		style: {
			transitionProperty: "opacity, transform",
			transitionDuration: "650ms",
			transitionTimingFunction: EASE,
			transitionDelay: `${delay}ms`,
			willChange: visible ? "auto" : "opacity, transform"
		},
		children
	});
}
//#endregion
//#region resources/js/Components/ui/CtaBand.jsx
function CtaBand({ title, lead }) {
	const { t, locale } = useTrans();
	const buildHref = (path) => localizedPath(locale, path);
	const brand = usePage().props.site?.brand ?? {};
	const phone = brand.phones?.[0] ?? "";
	const email = brand.email ?? "";
	const address = brand[`address_${locale}`] ?? brand.address_id ?? "";
	const hours = brand.working_hours ?? "";
	return /* @__PURE__ */ jsxs("section", {
		className: "relative overflow-hidden",
		"aria-labelledby": "cta-heading",
		children: [
			/* @__PURE__ */ jsx("div", { className: "absolute inset-0 cta-gradient" }),
			/* @__PURE__ */ jsx("div", { className: "absolute inset-0 dot-grid-light opacity-60" }),
			/* @__PURE__ */ jsxs("div", {
				className: "absolute inset-0",
				children: [
					/* @__PURE__ */ jsx("div", { className: "floating-shape floating-shape-1" }),
					/* @__PURE__ */ jsx("div", { className: "floating-shape floating-shape-2" }),
					/* @__PURE__ */ jsx("div", { className: "floating-shape floating-shape-3" })
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "container-site relative py-16 lg:py-24",
				children: /* @__PURE__ */ jsxs("div", {
					className: "relative grid items-center gap-12 lg:grid-cols-12",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "relative lg:col-span-7",
						children: [
							/* @__PURE__ */ jsx(Reveal, {
								delay: 100,
								children: /* @__PURE__ */ jsx("h2", {
									id: "cta-heading",
									className: "display-xl font-bold text-white",
									children: title ?? (locale === "en" ? "Ready to start your testing project?" : "Siap memulai proyek pengujian Anda?")
								})
							}),
							/* @__PURE__ */ jsx(Reveal, {
								delay: 180,
								children: /* @__PURE__ */ jsx("p", {
									className: "mt-6 max-w-lg text-lg leading-relaxed text-white/80",
									children: lead ?? (locale === "en" ? "Tell us your soil, rock, or environmental testing needs. Our team responds within 24 hours on working days." : "Ceritakan kebutuhan pengujian tanah, batuan, atau lingkungan Anda. Tim kami merespons dalam 1×24 jam pada jam kerja.")
								})
							}),
							/* @__PURE__ */ jsx(Reveal, {
								delay: 240,
								children: /* @__PURE__ */ jsx("ul", {
									className: "mt-8 grid gap-3 sm:grid-cols-3",
									children: (locale === "en" ? [
										{
											icon: "schedule",
											text: "Quote response within 24 hours on working days"
										},
										{
											icon: "verified",
											text: "SNI · ASTM · AASHTO · ISRM accountable standards"
										},
										{
											icon: "local_shipping",
											text: "Close to the mine — no need to ship samples to Java"
										}
									] : [
										{
											icon: "schedule",
											text: "Respons penawaran 1×24 jam pada jam kerja"
										},
										{
											icon: "verified",
											text: "Standar SNI · ASTM · AASHTO · ISRM terdokumentasi"
										},
										{
											icon: "local_shipping",
											text: "Dekat tambang — sampel tak perlu dikirim ke Jawa"
										}
									]).map((item) => /* @__PURE__ */ jsxs("li", {
										className: "flex items-start gap-3 rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur",
										children: [/* @__PURE__ */ jsx("span", {
											className: "material-symbols-outlined text-white",
											children: item.icon
										}), /* @__PURE__ */ jsx("span", {
											className: "text-xs font-medium leading-relaxed text-white/90",
											children: item.text
										})]
									}, item.text))
								})
							}),
							/* @__PURE__ */ jsxs(Reveal, {
								delay: 300,
								children: [/* @__PURE__ */ jsxs("div", {
									className: "mt-8 flex flex-wrap items-center gap-4",
									children: [/* @__PURE__ */ jsx(Button, {
										href: buildHref("/kontak") + "#lead",
										size: "lg",
										variant: "light",
										children: t("common.cta_quote")
									}), /* @__PURE__ */ jsx(Button, {
										href: buildHref("/layanan"),
										size: "lg",
										variant: "underlineLight",
										children: t("common.cta_services")
									})]
								}), (phone || email) && /* @__PURE__ */ jsxs("p", {
									className: "mt-6 font-mono text-xs uppercase tracking-[0.14em] text-white/70",
									children: [
										phone && /* @__PURE__ */ jsx("a", {
											href: `tel:${phone.replace(/-/g, "")}`,
											className: "underline-offset-4 hover:underline",
											children: phone
										}),
										phone && email && /* @__PURE__ */ jsx("span", {
											className: "mx-3 text-white/30",
											children: "·"
										}),
										email && /* @__PURE__ */ jsx("a", {
											href: `mailto:${email}`,
											className: "underline-offset-4 hover:underline",
											children: email
										})
									]
								})]
							})
						]
					}), /* @__PURE__ */ jsx("div", {
						className: "relative lg:col-span-5",
						children: /* @__PURE__ */ jsx(Reveal, {
							delay: 350,
							children: /* @__PURE__ */ jsxs("div", {
								className: "relative overflow-hidden rounded-2xl border border-white/25 shadow-2xl",
								children: [
									/* @__PURE__ */ jsx("img", {
										src: "/images/lab-soil.jpg",
										alt: locale === "en" ? "Soil testing in the laboratory" : "Pengujian tanah di laboratorium",
										loading: "lazy",
										decoding: "async",
										className: "aspect-[4/3] w-full object-cover"
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent p-6 pt-16",
										children: [/* @__PURE__ */ jsx("p", {
											className: "font-mono text-[11px] uppercase tracking-[0.14em] text-white/85",
											children: locale === "en" ? "Materials testing laboratory · Samarinda" : "Laboratorium pengujian material · Samarinda"
										}), (address || hours) && /* @__PURE__ */ jsxs("p", {
											className: "mt-2 line-clamp-2 text-sm leading-relaxed text-white/75",
											children: [
												address,
												address && hours ? " · " : "",
												hours
											]
										})]
									}),
									/* @__PURE__ */ jsx("span", {
										className: "absolute left-4 top-4 rounded-full border border-white/30 bg-black/40 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-white backdrop-blur",
										children: locale === "en" ? "24h response" : "Respons 24 jam"
									})
								]
							})
						})
					})]
				})
			})
		]
	});
}
//#endregion
//#region resources/js/Components/ui/WhatsAppFloat.jsx
function WhatsAppFloat() {
	const page = usePage().props;
	const { t, locale } = useTrans();
	const phone = page.site?.brand?.phone_wa;
	if (!phone) return null;
	return /* @__PURE__ */ jsx("a", {
		href: `https://wa.me/${phone}`,
		target: "_blank",
		rel: "noopener noreferrer",
		"aria-label": t("common.cta_wa"),
		className: "fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/20 transition-transform duration-300 hover:scale-110 active:scale-95",
		children: /* @__PURE__ */ jsx("svg", {
			className: "h-7 w-7",
			viewBox: "0 0 24 24",
			fill: "currentColor",
			children: /* @__PURE__ */ jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" })
		})
	});
}
//#endregion
//#region resources/js/Layouts/PublicLayout.jsx
function PublicLayout({ children, hideCta = false }) {
	const { url } = usePage();
	const isContact = url?.includes("/kontak");
	return /* @__PURE__ */ jsxs("div", {
		className: "flex min-h-screen flex-col bg-white text-ink",
		children: [
			/* @__PURE__ */ jsx(AppHeader, {}),
			/* @__PURE__ */ jsx("main", {
				className: "flex-1",
				children
			}),
			!hideCta && !isContact && /* @__PURE__ */ jsx(CtaBand, {}),
			/* @__PURE__ */ jsx(AppFooter, {}),
			/* @__PURE__ */ jsx(WhatsAppFloat, {})
		]
	});
}
//#endregion
export { useTrans as a, localizedPath as i, Reveal as n, Button as r, PublicLayout as t };

//# sourceMappingURL=PublicLayout-Qw7MZTfy.js.map
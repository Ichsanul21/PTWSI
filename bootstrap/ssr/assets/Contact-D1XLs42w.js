import { i as useTrans, n as Button, r as localizedPath, t as PublicLayout } from "./PublicLayout-DG3kgI-p.js";
import { t as Reveal } from "./Reveal-Qg1-elCF.js";
import { t as PageHero } from "./PageHero-BMep523h.js";
import { t as Seo } from "./Seo-DAd7HCP1.js";
import { useForm, usePage } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
//#region resources/js/Pages/Contact.jsx
var inputClass = "w-full rounded border border-black/15 bg-white px-4 py-3 text-sm text-[#19191a] placeholder:text-[#19191a]/35 transition-colors focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20";
function Contact({ services }) {
	const { t, locale } = useTrans();
	const brand = usePage().props.site?.brand ?? {};
	const flash = usePage().props.flash ?? {};
	const buildHref = (path) => localizedPath(locale, path);
	const form = useForm({
		name: "",
		company: "",
		email: "",
		phone: "",
		service_id: "",
		message: "",
		website: ""
	});
	const [sent, setSent] = useState(false);
	const submit = (e) => {
		e.preventDefault();
		form.post(buildHref("/kontak"), {
			preserveScroll: true,
			onSuccess: () => {
				form.reset();
				setSent(true);
			}
		});
	};
	return /* @__PURE__ */ jsxs(PublicLayout, { children: [
		/* @__PURE__ */ jsx(Seo, { title: locale === "en" ? "Contact | PT Wall Street Indonesia" : "Kontak | PT Wall Street Indonesia" }),
		/* @__PURE__ */ jsx(PageHero, {
			eyebrow: t("nav.contact"),
			title: locale === "en" ? "Start your testing project" : "Mulai proyek pengujian Anda",
			lead: locale === "en" ? "Tell us your soil, rock or environmental testing needs. Our team responds within 24 hours on working days." : "Ceritakan kebutuhan pengujian tanah, batuan atau lingkungan. Tim kami merespons dalam 1×24 jam pada jam kerja.",
			meta: "0.5036ºS / 117.1214ºE"
		}),
		/* @__PURE__ */ jsx("section", {
			className: "section-pad border-t border-ink/10 bg-white",
			children: /* @__PURE__ */ jsx("div", {
				className: "container-site",
				children: /* @__PURE__ */ jsxs("div", {
					className: "grid gap-8 lg:grid-cols-12",
					children: [/* @__PURE__ */ jsx(Reveal, {
						className: "lg:col-span-7",
						children: /* @__PURE__ */ jsxs("div", {
							id: "lead",
							className: "scroll-mt-32 rounded-lg border border-ink/10 bg-white p-8 shadow-xl shadow-black/5 sm:p-10",
							children: [
								/* @__PURE__ */ jsx("h2", {
									className: "text-2xl font-bold text-ink sm:text-3xl",
									children: t("contact.lead_form")
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-2 text-sm text-ink/50",
									children: t("contact.lead_note")
								}),
								(sent || flash.success) && /* @__PURE__ */ jsxs("div", {
									className: "animate-menu-in mt-6 flex items-start gap-3 rounded border border-ink/10 bg-cream p-4 text-sm text-ink",
									children: [/* @__PURE__ */ jsx("span", {
										className: "text-brand-600",
										children: "✓"
									}), /* @__PURE__ */ jsx("span", { children: t("form.success") })]
								}),
								form.errors && Object.keys(form.errors).length > 0 && /* @__PURE__ */ jsx("div", {
									className: "animate-menu-in mt-6 rounded border border-red-200 bg-red-50 p-4",
									children: Object.values(form.errors).map((err, i) => /* @__PURE__ */ jsx("p", {
										className: "text-sm text-red-700",
										children: err
									}, i))
								}),
								/* @__PURE__ */ jsxs("form", {
									onSubmit: submit,
									className: "mt-8 grid gap-5 sm:grid-cols-2",
									noValidate: true,
									children: [
										/* @__PURE__ */ jsxs("div", {
											style: {
												position: "absolute",
												left: "-9999px"
											},
											"aria-hidden": "true",
											children: [/* @__PURE__ */ jsx("label", {
												htmlFor: "f-website",
												children: "Website"
											}), /* @__PURE__ */ jsx("input", {
												id: "f-website",
												type: "text",
												value: form.data.website,
												onChange: (e) => form.setData("website", e.target.value),
												tabIndex: -1,
												autoComplete: "off"
											})]
										}),
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("label", {
											htmlFor: "f-name",
											className: "mb-1.5 block font-mono text-xs uppercase tracking-[0.1em] text-ink/50",
											children: [t("form.name"), " *"]
										}), /* @__PURE__ */ jsx("input", {
											id: "f-name",
											value: form.data.name,
											onChange: (e) => form.setData("name", e.target.value),
											placeholder: t("form.name_ph"),
											className: inputClass,
											required: true
										})] }),
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
											htmlFor: "f-company",
											className: "mb-1.5 block font-mono text-xs uppercase tracking-[0.1em] text-ink/50",
											children: t("form.company")
										}), /* @__PURE__ */ jsx("input", {
											id: "f-company",
											value: form.data.company,
											onChange: (e) => form.setData("company", e.target.value),
											placeholder: t("form.company_ph"),
											className: inputClass
										})] }),
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("label", {
											htmlFor: "f-email",
											className: "mb-1.5 block font-mono text-xs uppercase tracking-[0.1em] text-ink/50",
											children: [t("form.email"), " *"]
										}), /* @__PURE__ */ jsx("input", {
											id: "f-email",
											type: "email",
											value: form.data.email,
											onChange: (e) => form.setData("email", e.target.value),
											placeholder: "nama@perusahaan.com",
											className: inputClass,
											required: true
										})] }),
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
											htmlFor: "f-phone",
											className: "mb-1.5 block font-mono text-xs uppercase tracking-[0.1em] text-ink/50",
											children: t("form.phone")
										}), /* @__PURE__ */ jsx("input", {
											id: "f-phone",
											type: "tel",
											value: form.data.phone,
											onChange: (e) => form.setData("phone", e.target.value),
											placeholder: "08xx-xxxx-xxxx",
											className: inputClass
										})] }),
										/* @__PURE__ */ jsxs("div", {
											className: "sm:col-span-2",
											children: [/* @__PURE__ */ jsx("label", {
												htmlFor: "f-service",
												className: "mb-1.5 block font-mono text-xs uppercase tracking-[0.1em] text-ink/50",
												children: t("form.service")
											}), /* @__PURE__ */ jsxs("select", {
												id: "f-service",
												value: form.data.service_id,
												onChange: (e) => form.setData("service_id", e.target.value),
												className: inputClass,
												children: [/* @__PURE__ */ jsx("option", {
													value: "",
													children: t("form.service_ph")
												}), services.map((s) => /* @__PURE__ */ jsx("option", {
													value: s.id,
													children: s[`name_${locale}`] ?? s.name_id
												}, s.id))]
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "sm:col-span-2",
											children: [/* @__PURE__ */ jsx("label", {
												htmlFor: "f-message",
												className: "mb-1.5 block font-mono text-xs uppercase tracking-[0.1em] text-ink/50",
												children: t("form.message")
											}), /* @__PURE__ */ jsx("textarea", {
												id: "f-message",
												rows: "5",
												value: form.data.message,
												onChange: (e) => form.setData("message", e.target.value),
												placeholder: t("form.message_ph"),
												className: inputClass
											})]
										}),
										/* @__PURE__ */ jsx("div", {
											className: "sm:col-span-2",
											children: /* @__PURE__ */ jsx(Button, {
												as: "button",
												type: "submit",
												size: "lg",
												disabled: form.processing,
												className: "w-full disabled:opacity-60 sm:w-auto",
												children: form.processing ? "…" : t("common.cta_send")
											})
										})
									]
								})
							]
						})
					}), /* @__PURE__ */ jsx(Reveal, {
						delay: 120,
						className: "lg:col-span-5",
						children: /* @__PURE__ */ jsxs("div", {
							className: "space-y-5",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "rounded-lg border border-ink/10 bg-ink/[0.02] p-8",
									children: [/* @__PURE__ */ jsx("h3", {
										className: "kicker mb-5 text-ink/40",
										children: locale === "en" ? "Direct contact" : "Hubungi langsung"
									}), /* @__PURE__ */ jsxs("ul", {
										className: "space-y-5 text-sm",
										children: [
											brand.phones?.map((phone) => /* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx("span", {
												className: "block font-mono text-xs uppercase tracking-[0.1em] text-ink/40",
												children: "WhatsApp / Telepon"
											}), /* @__PURE__ */ jsx("a", {
												href: `tel:${phone.replace(/-/g, "")}`,
												className: "mt-1 block text-2xl font-bold text-ink transition-colors hover:text-brand-600",
												children: phone
											})] }, phone)),
											/* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx("span", {
												className: "block font-mono text-xs uppercase tracking-[0.1em] text-ink/40",
												children: "Email"
											}), /* @__PURE__ */ jsx("a", {
												href: `mailto:${brand.email}`,
												className: "mt-1 block break-all font-semibold text-ink transition-colors hover:text-brand-600",
												children: brand.email
											})] }),
											/* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx("span", {
												className: "block font-mono text-xs uppercase tracking-[0.1em] text-ink/40",
												children: t("footer.working_hours")
											}), /* @__PURE__ */ jsx("span", {
												className: "mt-1 block font-medium text-ink/80",
												children: brand.working_hours
											})] })
										]
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "rounded-lg border border-ink/10 bg-ink/[0.02] p-8",
									children: [
										/* @__PURE__ */ jsx("h3", {
											className: "kicker mb-4 text-ink/40",
											children: t("footer.find_us")
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-sm leading-relaxed text-ink/70",
											children: brand[`address_${locale}`] ?? brand.address_id
										}),
										/* @__PURE__ */ jsx("p", {
											className: "mt-4 font-mono text-xs uppercase tracking-[0.14em] text-ink/40",
											children: "0.5036ºS / 117.1214ºE"
										})
									]
								}),
								/* @__PURE__ */ jsxs("a", {
									href: `https://wa.me/${brand.phone_wa ?? ""}`,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "group flex items-center justify-between rounded-lg bg-brand-600 p-6 text-white transition-colors duration-200 hover:bg-brand-500",
									children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
										className: "text-xl font-bold",
										children: t("common.cta_wa")
									}), /* @__PURE__ */ jsx("p", {
										className: "mt-1 font-mono text-xs uppercase tracking-[0.1em] text-white/70",
										children: locale === "en" ? "Fastest response on working days" : "Respon tercepat pada jam kerja"
									})] }), /* @__PURE__ */ jsx("span", {
										className: "flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-lg transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1",
										children: "↗"
									})]
								})
							]
						})
					})]
				})
			})
		})
	] });
}
//#endregion
export { Contact as default };

//# sourceMappingURL=Contact-D1XLs42w.js.map
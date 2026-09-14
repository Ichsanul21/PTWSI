import { a as Input, r as Field, s as Textarea } from "./ui-Co_CMEy0.js";
import { t as AdminLayout } from "./AdminLayout-CKOMJvzr.js";
import { useForm } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/Admin/Settings/Edit.jsx
function Group({ label, children }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-2xl border border-slate-200 bg-white p-6",
		children: [/* @__PURE__ */ jsx("h2", {
			className: "mb-5 font-display font-bold text-slate-900",
			children: label
		}), /* @__PURE__ */ jsx("div", {
			className: "grid gap-5 sm:grid-cols-2",
			children
		})]
	});
}
function AdminSettings({ settings }) {
	const form = useForm({
		brand: settings.brand,
		hero: settings.hero,
		about: settings.about,
		stats: settings.stats,
		seo: settings.seo
	});
	const setNested = (group, key, value) => {
		form.setData(group, {
			...form.data[group],
			[key]: value
		});
	};
	const submit = (e) => {
		e.preventDefault();
		form.put("/admin/settings", { preserveScroll: true });
	};
	return /* @__PURE__ */ jsx(AdminLayout, {
		title: "Pengaturan Situs",
		children: /* @__PURE__ */ jsxs("form", {
			onSubmit: submit,
			className: "space-y-6",
			children: [
				/* @__PURE__ */ jsxs(Group, {
					label: "Brand & Kontak",
					children: [
						/* @__PURE__ */ jsx(Field, {
							label: "Nama Perusahaan",
							children: /* @__PURE__ */ jsx(Input, {
								value: form.data.brand?.name ?? "",
								onChange: (e) => setNested("brand", "name", e.target.value)
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Tagline (ID)",
							children: /* @__PURE__ */ jsx(Input, {
								value: form.data.brand?.tagline_id ?? "",
								onChange: (e) => setNested("brand", "tagline_id", e.target.value)
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Tagline (EN)",
							children: /* @__PURE__ */ jsx(Input, {
								value: form.data.brand?.tagline_en ?? "",
								onChange: (e) => setNested("brand", "tagline_en", e.target.value)
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "WhatsApp (format 62…)",
							children: /* @__PURE__ */ jsx(Input, {
								value: form.data.brand?.phone_wa ?? "",
								onChange: (e) => setNested("brand", "phone_wa", e.target.value)
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Email",
							children: /* @__PURE__ */ jsx(Input, {
								value: form.data.brand?.email ?? "",
								onChange: (e) => setNested("brand", "email", e.target.value)
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Jam Operasional",
							children: /* @__PURE__ */ jsx(Input, {
								value: form.data.brand?.working_hours ?? "",
								onChange: (e) => setNested("brand", "working_hours", e.target.value)
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "sm:col-span-2",
							children: /* @__PURE__ */ jsx(Field, {
								label: "Telepon (pisah koma)",
								children: /* @__PURE__ */ jsx(Input, {
									value: (form.data.brand?.phones ?? []).join(", "),
									onChange: (e) => setNested("brand", "phones", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))
								})
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "sm:col-span-2",
							children: /* @__PURE__ */ jsx(Field, {
								label: "Alamat (ID)",
								children: /* @__PURE__ */ jsx(Input, {
									value: form.data.brand?.address_id ?? "",
									onChange: (e) => setNested("brand", "address_id", e.target.value)
								})
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "sm:col-span-2",
							children: /* @__PURE__ */ jsx(Field, {
								label: "Alamat (EN)",
								children: /* @__PURE__ */ jsx(Input, {
									value: form.data.brand?.address_en ?? "",
									onChange: (e) => setNested("brand", "address_en", e.target.value)
								})
							})
						})
					]
				}),
				/* @__PURE__ */ jsxs(Group, {
					label: "Hero (Beranda)",
					children: [
						/* @__PURE__ */ jsx(Field, {
							label: "Judul (ID)",
							children: /* @__PURE__ */ jsx(Input, {
								value: form.data.hero?.title_id ?? "",
								onChange: (e) => setNested("hero", "title_id", e.target.value)
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Judul (EN)",
							children: /* @__PURE__ */ jsx(Input, {
								value: form.data.hero?.title_en ?? "",
								onChange: (e) => setNested("hero", "title_en", e.target.value)
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "sm:col-span-2",
							children: /* @__PURE__ */ jsx(Field, {
								label: "Subjudul (ID)",
								children: /* @__PURE__ */ jsx(Textarea, {
									rows: 2,
									value: form.data.hero?.subtitle_id ?? "",
									onChange: (e) => setNested("hero", "subtitle_id", e.target.value)
								})
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "sm:col-span-2",
							children: /* @__PURE__ */ jsx(Field, {
								label: "Subjudul (EN)",
								children: /* @__PURE__ */ jsx(Textarea, {
									rows: 2,
									value: form.data.hero?.subtitle_en ?? "",
									onChange: (e) => setNested("hero", "subtitle_en", e.target.value)
								})
							})
						})
					]
				}),
				/* @__PURE__ */ jsxs(Group, {
					label: "Tentang",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "sm:col-span-2",
							children: /* @__PURE__ */ jsx(Field, {
								label: "Lead (ID)",
								children: /* @__PURE__ */ jsx(Textarea, {
									rows: 3,
									value: form.data.about?.lead_id ?? "",
									onChange: (e) => setNested("about", "lead_id", e.target.value)
								})
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "sm:col-span-2",
							children: /* @__PURE__ */ jsx(Field, {
								label: "Lead (EN)",
								children: /* @__PURE__ */ jsx(Textarea, {
									rows: 3,
									value: form.data.about?.lead_en ?? "",
									onChange: (e) => setNested("about", "lead_en", e.target.value)
								})
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "sm:col-span-2",
							children: /* @__PURE__ */ jsx(Field, {
								label: "Body (ID)",
								children: /* @__PURE__ */ jsx(Textarea, {
									rows: 4,
									value: form.data.about?.body_id ?? "",
									onChange: (e) => setNested("about", "body_id", e.target.value)
								})
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "sm:col-span-2",
							children: /* @__PURE__ */ jsx(Field, {
								label: "Body (EN)",
								children: /* @__PURE__ */ jsx(Textarea, {
									rows: 4,
									value: form.data.about?.body_en ?? "",
									onChange: (e) => setNested("about", "body_en", e.target.value)
								})
							})
						})
					]
				}),
				/* @__PURE__ */ jsxs(Group, {
					label: "Statistik (count-up di Beranda)",
					children: [(form.data.stats ?? []).map((s, i) => /* @__PURE__ */ jsxs("div", {
						className: "grid gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 sm:col-span-2 sm:grid-cols-4",
						children: [
							/* @__PURE__ */ jsx(Input, {
								value: s.value ?? "",
								onChange: (e) => setStat(form, i, "value", e.target.value),
								placeholder: "nilai (cth: 60+)"
							}),
							/* @__PURE__ */ jsx(Input, {
								value: s.suffix ?? "",
								onChange: (e) => setStat(form, i, "suffix", e.target.value),
								placeholder: "suffix (cth: %)"
							}),
							/* @__PURE__ */ jsx(Input, {
								value: s.label_id ?? "",
								onChange: (e) => setStat(form, i, "label_id", e.target.value),
								placeholder: "label ID"
							}),
							/* @__PURE__ */ jsx(Input, {
								value: s.label_en ?? "",
								onChange: (e) => setStat(form, i, "label_en", e.target.value),
								placeholder: "label EN"
							})
						]
					}, i)), /* @__PURE__ */ jsx("div", {
						className: "sm:col-span-2",
						children: /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => form.setData("stats", [...form.data.stats ?? [], {
								value: "",
								suffix: "",
								label_id: "",
								label_en: ""
							}]),
							className: "text-sm font-semibold text-brand-600 hover:text-brand-700",
							children: "+ Tambah statistik"
						})
					})]
				}),
				/* @__PURE__ */ jsxs(Group, {
					label: "SEO Lokasi (Schema.org)",
					children: [
						/* @__PURE__ */ jsx(Field, {
							label: "Latitude",
							children: /* @__PURE__ */ jsx(Input, {
								value: form.data.seo?.lat ?? "",
								onChange: (e) => setNested("seo", "lat", e.target.value)
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Longitude",
							children: /* @__PURE__ */ jsx(Input, {
								value: form.data.seo?.lng ?? "",
								onChange: (e) => setNested("seo", "lng", e.target.value)
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "sm:col-span-2",
							children: /* @__PURE__ */ jsx(Field, {
								label: "Meta Description (ID)",
								children: /* @__PURE__ */ jsx(Textarea, {
									rows: 2,
									value: form.data.seo?.description_id ?? "",
									onChange: (e) => setNested("seo", "description_id", e.target.value)
								})
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "sm:col-span-2",
							children: /* @__PURE__ */ jsx(Field, {
								label: "Meta Description (EN)",
								children: /* @__PURE__ */ jsx(Textarea, {
									rows: 2,
									value: form.data.seo?.description_en ?? "",
									onChange: (e) => setNested("seo", "description_en", e.target.value)
								})
							})
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "flex justify-end",
					children: /* @__PURE__ */ jsx("button", {
						type: "submit",
						disabled: form.processing,
						className: "rounded-xl bg-brand-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 hover:bg-brand-500 disabled:opacity-60",
						children: form.processing ? "Menyimpan…" : "Simpan Pengaturan"
					})
				})
			]
		})
	});
}
function setStat(form, i, key, value) {
	const next = [...form.data.stats];
	next[i] = {
		...next[i],
		[key]: value
	};
	form.setData("stats", next);
}
//#endregion
export { AdminSettings as default };

//# sourceMappingURL=Edit-BVgyiyTw.js.map
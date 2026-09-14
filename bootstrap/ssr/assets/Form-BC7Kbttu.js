import { a as Input, c as Toggle, r as Field, s as Textarea } from "./ui-Co_CMEy0.js";
import { t as AdminLayout } from "./AdminLayout-CKOMJvzr.js";
import { Link, useForm } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/Admin/Services/Form.jsx
function AdminServiceForm({ service, categories }) {
	const editing = Boolean(service);
	const form = useForm(editing ? {
		name_id: service.name_id,
		name_en: service.name_en,
		slug: service.slug,
		icon: service.icon ?? "terrain",
		short_id: service.short_id ?? "",
		short_en: service.short_en ?? "",
		standards: service.standards ?? "",
		description_id: service.description_id ?? "",
		description_en: service.description_en ?? "",
		cover: null,
		order: service.order,
		is_active: service.is_active
	} : {
		name_id: "",
		name_en: "",
		slug: "",
		icon: "terrain",
		short_id: "",
		short_en: "",
		standards: "",
		description_id: "",
		description_en: "",
		cover: null,
		order: 99,
		is_active: true
	});
	const submit = (e) => {
		e.preventDefault();
		if (editing) form.put(`/admin/services/${service.id}`, { preserveScroll: true });
		else form.post("/admin/services", { preserveScroll: true });
	};
	return /* @__PURE__ */ jsxs(AdminLayout, {
		title: editing ? `Edit: ${service.name_id}` : "Tambah Layanan",
		children: [/* @__PURE__ */ jsxs("form", {
			onSubmit: submit,
			className: "grid gap-8 lg:grid-cols-3",
			children: [/* @__PURE__ */ jsx("div", {
				className: "grid gap-5 rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2",
				children: /* @__PURE__ */ jsxs("div", {
					className: "grid gap-5 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ jsx(Field, {
							label: "Nama (Indonesia) *",
							error: form.errors.name_id,
							children: /* @__PURE__ */ jsx(Input, {
								value: form.data.name_id,
								onChange: (e) => form.setData("name_id", e.target.value),
								required: true
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Nama (English) *",
							error: form.errors.name_en,
							children: /* @__PURE__ */ jsx(Input, {
								value: form.data.name_en,
								onChange: (e) => form.setData("name_en", e.target.value),
								required: true
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Slug",
							hint: "= kosong: otomatis dari nama ID",
							children: /* @__PURE__ */ jsx(Input, {
								value: form.data.slug,
								onChange: (e) => form.setData("slug", e.target.value)
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Standar",
							hint: "ex: SNI, ASTM, ISRM",
							children: /* @__PURE__ */ jsx(Input, {
								value: form.data.standards,
								onChange: (e) => form.setData("standards", e.target.value)
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Short (Indonesia)",
							children: /* @__PURE__ */ jsx(Input, {
								value: form.data.short_id,
								onChange: (e) => form.setData("short_id", e.target.value)
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Short (English)",
							children: /* @__PURE__ */ jsx(Input, {
								value: form.data.short_en,
								onChange: (e) => form.setData("short_en", e.target.value)
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Deskripsi (Indonesia)",
							children: /* @__PURE__ */ jsx(Textarea, {
								rows: 6,
								value: form.data.description_id,
								onChange: (e) => form.setData("description_id", e.target.value)
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Deskripsi (English)",
							children: /* @__PURE__ */ jsx(Textarea, {
								rows: 6,
								value: form.data.description_en,
								onChange: (e) => form.setData("description_en", e.target.value)
							})
						})
					]
				})
			}), /* @__PURE__ */ jsxs("div", {
				className: "space-y-5",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "rounded-2xl border border-slate-200 bg-white p-6",
					children: [/* @__PURE__ */ jsx("p", {
						className: "mb-4 text-sm font-semibold text-slate-900",
						children: "Pengaturan"
					}), /* @__PURE__ */ jsxs("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ jsx(Field, {
								label: "Ikon",
								children: /* @__PURE__ */ jsxs("select", {
									value: form.data.icon,
									onChange: (e) => form.setData("icon", e.target.value),
									className: "w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900",
									children: [
										/* @__PURE__ */ jsx("option", {
											value: "terrain",
											children: "terrain (tanah)"
										}),
										/* @__PURE__ */ jsx("option", {
											value: "gem",
											children: "gem (batuan)"
										}),
										/* @__PURE__ */ jsx("option", {
											value: "droplets",
											children: "droplets (air)"
										})
									]
								})
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Urutan",
								children: /* @__PURE__ */ jsx(Input, {
									type: "number",
									value: form.data.order,
									onChange: (e) => form.setData("order", e.target.value)
								})
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Cover",
								hint: "jpg/png/webp, max 5MB",
								error: form.errors.cover,
								children: /* @__PURE__ */ jsx(Input, {
									type: "file",
									accept: "image/jpeg,image/png,image/webp",
									onChange: (e) => form.setData("cover", e.target.files[0])
								})
							}),
							editing && service.cover && /* @__PURE__ */ jsx("img", {
								src: `/storage/${service.cover}`,
								alt: "Cover saat ini",
								className: "w-full rounded-xl border border-slate-100 object-cover"
							}),
							/* @__PURE__ */ jsx(Toggle, {
								checked: form.data.is_active,
								onChange: (v) => form.setData("is_active", v),
								label: "Tampilkan di situs"
							})
						]
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "rounded-2xl border border-slate-200 bg-white p-6",
					children: [/* @__PURE__ */ jsx("p", {
						className: "mb-4 text-sm font-semibold text-slate-900",
						children: "Aksi"
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ jsx("button", {
							type: "submit",
							disabled: form.processing,
							className: "flex-1 rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-500 disabled:opacity-60",
							children: form.processing ? "Menyimpan…" : "Simpan"
						}), /* @__PURE__ */ jsx(Link, {
							href: "/admin/services",
							className: "rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50",
							children: "Batal"
						})]
					})]
				})]
			})]
		}), editing && categories?.length > 0 && /* @__PURE__ */ jsxs("div", {
			className: "mt-10 rounded-2xl border border-slate-200 bg-white p-6",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "mb-4 flex items-center justify-between",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "font-display font-bold text-slate-900",
					children: "Kategori dalam layanan ini"
				}), /* @__PURE__ */ jsx(Link, {
					href: `/admin/test-categories?service=${service.id}`,
					className: "text-sm font-semibold text-brand-600",
					children: "Kelola →"
				})]
			}), /* @__PURE__ */ jsx("ul", {
				className: "divide-y divide-slate-100",
				children: categories.map((c) => /* @__PURE__ */ jsxs("li", {
					className: "flex items-center justify-between py-3 text-sm",
					children: [/* @__PURE__ */ jsx("span", {
						className: "font-medium text-slate-900",
						children: c.name_id
					}), /* @__PURE__ */ jsxs("span", {
						className: "text-slate-400",
						children: [c.tests_count, " metode"]
					})]
				}, c.id))
			})]
		})]
	});
}
//#endregion
export { AdminServiceForm as default };

//# sourceMappingURL=Form-BC7Kbttu.js.map
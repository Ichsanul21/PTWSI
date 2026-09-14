import { a as Input, c as Toggle, r as Field, s as Textarea } from "./ui-Co_CMEy0.js";
import { t as AdminLayout } from "./AdminLayout-CKOMJvzr.js";
import { Link, useForm } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/Admin/Insights/Form.jsx
var EMPTY = {
	title_id: "",
	title_en: "",
	type: "insight",
	category_id: "",
	category_en: "",
	author: "",
	excerpt_id: "",
	excerpt_en: "",
	body_id: "",
	body_en: "",
	cover: null,
	published_at: "",
	is_published: false
};
function AdminInsightForm({ insight }) {
	const editing = Boolean(insight);
	const form = useForm(editing ? {
		title_id: insight.title_id,
		title_en: insight.title_en ?? "",
		type: insight.type ?? "insight",
		category_id: insight.category_id ?? "",
		category_en: insight.category_en ?? "",
		author: insight.author ?? "",
		excerpt_id: insight.excerpt_id ?? "",
		excerpt_en: insight.excerpt_en ?? "",
		body_id: insight.body_id ?? "",
		body_en: insight.body_en ?? "",
		cover: null,
		published_at: insight.published_at?.slice(0, 10) ?? "",
		is_published: insight.is_published
	} : EMPTY);
	const submit = (e) => {
		e.preventDefault();
		if (editing) form.put(`/admin/insights/${insight.id}`, { preserveScroll: true });
		else form.post("/admin/insights", { preserveScroll: true });
	};
	return /* @__PURE__ */ jsx(AdminLayout, {
		title: editing ? `Edit: ${insight.title_id}` : "Tulis Artikel",
		children: /* @__PURE__ */ jsxs("form", {
			onSubmit: submit,
			className: "grid gap-8 lg:grid-cols-3",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "grid gap-5 rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2",
				children: [
					/* @__PURE__ */ jsx(Field, {
						label: "Judul (Indonesia) *",
						error: form.errors.title_id,
						children: /* @__PURE__ */ jsx(Input, {
							value: form.data.title_id,
							onChange: (e) => form.setData("title_id", e.target.value),
							required: true
						})
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Judul (English)",
						children: /* @__PURE__ */ jsx(Input, {
							value: form.data.title_en,
							onChange: (e) => form.setData("title_en", e.target.value)
						})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-5 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ jsx(Field, {
								label: "Tipe",
								children: /* @__PURE__ */ jsxs("select", {
									value: form.data.type,
									onChange: (e) => form.setData("type", e.target.value),
									className: "w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900",
									children: [
										/* @__PURE__ */ jsx("option", {
											value: "insight",
											children: "Insight"
										}),
										/* @__PURE__ */ jsx("option", {
											value: "artikel",
											children: "Artikel"
										}),
										/* @__PURE__ */ jsx("option", {
											value: "edukasi",
											children: "Edukasi"
										})
									]
								})
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Kategori (ID)",
								children: /* @__PURE__ */ jsx(Input, {
									value: form.data.category_id,
									onChange: (e) => form.setData("category_id", e.target.value),
									placeholder: "ex: Geomekanika"
								})
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Author",
								children: /* @__PURE__ */ jsx(Input, {
									value: form.data.author,
									onChange: (e) => form.setData("author", e.target.value)
								})
							})
						]
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Ringkasan (ID)",
						children: /* @__PURE__ */ jsx(Textarea, {
							rows: 2,
							value: form.data.excerpt_id,
							onChange: (e) => form.setData("excerpt_id", e.target.value)
						})
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Ringkasan (EN)",
						children: /* @__PURE__ */ jsx(Textarea, {
							rows: 2,
							value: form.data.excerpt_en,
							onChange: (e) => form.setData("excerpt_en", e.target.value)
						})
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Isi (Indonesia)",
						children: /* @__PURE__ */ jsx(Textarea, {
							rows: 12,
							value: form.data.body_id,
							onChange: (e) => form.setData("body_id", e.target.value),
							placeholder: "Tulis isi artikel di sini.\n\nParagraf dipisah baris kosong."
						})
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Isi (English)",
						children: /* @__PURE__ */ jsx(Textarea, {
							rows: 12,
							value: form.data.body_en,
							onChange: (e) => form.setData("body_en", e.target.value)
						})
					})
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "space-y-5",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "rounded-2xl border border-slate-200 bg-white p-6",
					children: [/* @__PURE__ */ jsx("p", {
						className: "mb-4 text-sm font-semibold text-slate-900",
						children: "Publikasi"
					}), /* @__PURE__ */ jsxs("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ jsx(Field, {
								label: "Tanggal Terbit",
								hint: form.data.is_published ? "otomatis = sekarang jika kosong" : "",
								children: /* @__PURE__ */ jsx(Input, {
									type: "date",
									value: form.data.published_at,
									onChange: (e) => form.setData("published_at", e.target.value)
								})
							}),
							/* @__PURE__ */ jsx(Toggle, {
								checked: form.data.is_published,
								onChange: (v) => form.setData("is_published", v),
								label: "Terbitkan"
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
							editing && insight.cover && /* @__PURE__ */ jsx("img", {
								src: `/storage/${insight.cover}`,
								alt: "Cover saat ini",
								className: "w-full rounded-xl border border-slate-100 object-cover"
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
							className: "flex-1 rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white hover:bg-brand-500 disabled:opacity-60",
							children: form.processing ? "Menyimpan…" : "Simpan"
						}), /* @__PURE__ */ jsx(Link, {
							href: "/admin/insights",
							className: "rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50",
							children: "Batal"
						})]
					})]
				})]
			})]
		})
	});
}
//#endregion
export { AdminInsightForm as default };

//# sourceMappingURL=Form-CLZrptcf.js.map
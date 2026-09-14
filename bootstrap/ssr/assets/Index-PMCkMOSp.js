import { a as Input, c as Toggle, n as DeleteButton, o as Select, r as Field } from "./ui-Co_CMEy0.js";
import { t as AdminLayout } from "./AdminLayout-CKOMJvzr.js";
import { useForm } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
//#region resources/js/Pages/Admin/Gallery/Index.jsx
var ASPECTS = [
	"4:3",
	"1:1",
	"3:2",
	"16:9"
];
var CATEGORIES = [
	"Lab",
	"Peralatan",
	"Proyek",
	"Aktivitas",
	"Lainnya"
];
var EMPTY = {
	title: "",
	category: "Lab",
	aspect: "4:3",
	order: 0,
	media: null,
	is_published: true
};
function AdminGallery({ items }) {
	const [editing, setEditing] = useState(null);
	const isEdit = Boolean(editing);
	const form = useForm(isEdit ? {
		title: editing.title,
		category: editing.category ?? "Lab",
		aspect: editing.aspect ?? "4:3",
		order: editing.order,
		media: null,
		is_published: editing.is_published
	} : EMPTY, {});
	const submit = (e) => {
		e.preventDefault();
		if (isEdit) form.put(`/admin/gallery/${editing.id}`, {
			preserveScroll: true,
			onSuccess: () => setEditing(null)
		});
		else form.post("/admin/gallery", {
			preserveScroll: true,
			onSuccess: () => form.reset()
		});
	};
	const aspectCls = {
		"4:3": "aspect-[4/3]",
		"1:1": "aspect-square",
		"3:2": "aspect-[3/2]",
		"16:9": "aspect-video"
	};
	return /* @__PURE__ */ jsx(AdminLayout, {
		title: "Galeri",
		children: /* @__PURE__ */ jsxs("div", {
			className: "grid gap-8 lg:grid-cols-3",
			children: [/* @__PURE__ */ jsx("div", {
				className: "lg:col-span-2",
				children: /* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-2 gap-4 sm:grid-cols-3",
					children: [items.length === 0 && /* @__PURE__ */ jsx("p", {
						className: "col-span-full rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center text-slate-400",
						children: "Belum ada item galeri."
					}), items.map((item) => /* @__PURE__ */ jsxs("div", {
						className: "group overflow-hidden rounded-2xl border border-slate-200 bg-white",
						children: [/* @__PURE__ */ jsxs("div", {
							className: `${aspectCls[item.aspect] ?? "aspect-[4/3]"} relative bg-slate-100`,
							children: [item.media ? /* @__PURE__ */ jsx("img", {
								src: `/storage/${item.media}`,
								alt: item.title,
								className: "h-full w-full object-cover",
								loading: "lazy",
								decoding: "async"
							}) : /* @__PURE__ */ jsx("div", {
								className: "flex h-full items-center justify-center bg-gradient-to-br from-brand-700 to-ink text-white/70",
								children: /* @__PURE__ */ jsx("span", {
									className: "font-mono text-[10px] uppercase tracking-widest",
									children: "No media"
								})
							}), !item.is_published && /* @__PURE__ */ jsx("span", {
								className: "absolute left-2 top-2 rounded-full bg-slate-900/80 px-2 py-0.5 font-mono text-[10px] text-white",
								children: "draft"
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between px-4 py-3",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "text-sm font-semibold text-slate-900",
								children: item.title
							}), /* @__PURE__ */ jsx("p", {
								className: "text-xs text-slate-400",
								children: item.category
							})] }), /* @__PURE__ */ jsxs("div", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => setEditing(item),
									className: "text-sm font-medium text-brand-600 hover:text-brand-700",
									children: "Edit"
								}), /* @__PURE__ */ jsx(DeleteButton, { href: `/admin/gallery/${item.id}` })]
							})]
						})]
					}, item.id))]
				})
			}), /* @__PURE__ */ jsxs("div", {
				className: "rounded-2xl border border-slate-200 bg-white p-6",
				children: [/* @__PURE__ */ jsx("p", {
					className: "mb-4 text-sm font-semibold text-slate-900",
					children: isEdit ? "Edit Item" : "Tambah Item"
				}), /* @__PURE__ */ jsxs("form", {
					onSubmit: submit,
					encType: "multipart/form-data",
					className: "space-y-4",
					children: [
						/* @__PURE__ */ jsx(Field, {
							label: "Judul *",
							error: form.errors.title,
							children: /* @__PURE__ */ jsx(Input, {
								value: form.data.title,
								onChange: (e) => form.setData("title", e.target.value),
								required: true
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Kategori",
							children: /* @__PURE__ */ jsx(Select, {
								value: form.data.category,
								onChange: (e) => form.setData("category", e.target.value),
								children: CATEGORIES.map((c) => /* @__PURE__ */ jsx("option", {
									value: c,
									children: c
								}, c))
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Rasio",
							children: /* @__PURE__ */ jsx(Select, {
								value: form.data.aspect,
								onChange: (e) => form.setData("aspect", e.target.value),
								children: ASPECTS.map((a) => /* @__PURE__ */ jsx("option", {
									value: a,
									children: a
								}, a))
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Gambar",
							hint: "jpg/png/webp, max 5MB",
							error: form.errors.media,
							children: /* @__PURE__ */ jsx(Input, {
								type: "file",
								accept: "image/jpeg,image/png,image/webp",
								onChange: (e) => form.setData("media", e.target.files[0])
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
						/* @__PURE__ */ jsx(Toggle, {
							checked: form.data.is_published,
							onChange: (v) => form.setData("is_published", v),
							label: "Tampilkan"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex gap-3 pt-1",
							children: [/* @__PURE__ */ jsx("button", {
								type: "submit",
								disabled: form.processing,
								className: "flex-1 rounded-xl bg-brand-600 py-2.5 text-sm font-semibold text-white hover:bg-brand-500 disabled:opacity-60",
								children: form.processing ? "…" : "Simpan"
							}), isEdit && /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => {
									setEditing(null);
									form.reset();
								},
								className: "rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50",
								children: "Batal"
							})]
						})
					]
				}, isEdit ? editing.id : "new")]
			})]
		})
	});
}
//#endregion
export { AdminGallery as default };

//# sourceMappingURL=Index-PMCkMOSp.js.map
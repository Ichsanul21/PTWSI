import { a as Input, c as Toggle, o as Select, r as Field, s as Textarea } from "./ui-Co_CMEy0.js";
import { t as AdminLayout } from "./AdminLayout-CKOMJvzr.js";
import { Link, useForm } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/Admin/Projects/Form.jsx
var EMPTY = {
	name_id: "",
	name_en: "",
	slug: "",
	category: "",
	location_id: "",
	location_en: "",
	year: "",
	client_id: "",
	client_name: "",
	summary_id: "",
	summary_en: "",
	highlights: "",
	is_featured: false,
	is_published: true,
	cover: null
};
function AdminProjectForm({ project, clients }) {
	const editing = Boolean(project);
	const form = useForm(editing ? {
		name_id: project.name_id,
		name_en: project.name_en ?? "",
		slug: project.slug,
		category: project.category ?? "",
		location_id: project.location_id ?? "",
		location_en: project.location_en ?? "",
		year: project.year ?? "",
		client_id: project.client_id ?? "",
		client_name: project.client_name ?? "",
		summary_id: project.summary_id ?? "",
		summary_en: project.summary_en ?? "",
		highlights: project.highlights?.join("\n") ?? "",
		is_featured: project.is_featured,
		is_published: project.is_published,
		cover: null
	} : EMPTY, {});
	const submit = (e) => {
		e.preventDefault();
		if (editing) form.put(`/admin/projects/${project.id}`, { preserveScroll: true });
		else form.post("/admin/projects", { preserveScroll: true });
	};
	return /* @__PURE__ */ jsx(AdminLayout, {
		title: editing ? `Edit: ${project.name_id}` : "Tambah Proyek",
		children: /* @__PURE__ */ jsxs("form", {
			onSubmit: submit,
			encType: "multipart/form-data",
			className: "grid gap-8 lg:grid-cols-3",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "grid gap-5 rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-5 sm:grid-cols-2",
						children: [/* @__PURE__ */ jsx(Field, {
							label: "Nama (ID) *",
							error: form.errors.name_id,
							children: /* @__PURE__ */ jsx(Input, {
								value: form.data.name_id,
								onChange: (e) => form.setData("name_id", e.target.value),
								required: true
							})
						}), /* @__PURE__ */ jsx(Field, {
							label: "Nama (EN)",
							children: /* @__PURE__ */ jsx(Input, {
								value: form.data.name_en,
								onChange: (e) => form.setData("name_en", e.target.value)
							})
						})]
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Slug",
						hint: "kosongkan = otomatis",
						children: /* @__PURE__ */ jsx(Input, {
							value: form.data.slug,
							onChange: (e) => form.setData("slug", e.target.value)
						})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-5 sm:grid-cols-2",
						children: [/* @__PURE__ */ jsx(Field, {
							label: "Kategori (Proyek)",
							children: /* @__PURE__ */ jsx(Input, {
								value: form.data.category,
								onChange: (e) => form.setData("category", e.target.value),
								placeholder: "ex: Bendungan"
							})
						}), /* @__PURE__ */ jsx(Field, {
							label: "Tahun",
							children: /* @__PURE__ */ jsx(Input, {
								value: form.data.year,
								onChange: (e) => form.setData("year", e.target.value),
								placeholder: "2025"
							})
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-5 sm:grid-cols-2",
						children: [/* @__PURE__ */ jsx(Field, {
							label: "Lokasi (ID)",
							children: /* @__PURE__ */ jsx(Input, {
								value: form.data.location_id,
								onChange: (e) => form.setData("location_id", e.target.value)
							})
						}), /* @__PURE__ */ jsx(Field, {
							label: "Lokasi (EN)",
							children: /* @__PURE__ */ jsx(Input, {
								value: form.data.location_en,
								onChange: (e) => form.setData("location_en", e.target.value)
							})
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-5 sm:grid-cols-2",
						children: [/* @__PURE__ */ jsx(Field, {
							label: "Klien (dari daftar)",
							children: /* @__PURE__ */ jsxs(Select, {
								value: form.data.client_id,
								onChange: (e) => form.setData("client_id", e.target.value),
								children: [/* @__PURE__ */ jsx("option", {
									value: "",
									children: "(tanpa relasi)"
								}), clients.map((c) => /* @__PURE__ */ jsx("option", {
									value: c.id,
									children: c.name
								}, c.id))]
							})
						}), /* @__PURE__ */ jsx(Field, {
							label: "Nama Klien (teks)",
							children: /* @__PURE__ */ jsx(Input, {
								value: form.data.client_name,
								onChange: (e) => form.setData("client_name", e.target.value),
								placeholder: "pakai jika belum terdaftar"
							})
						})]
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Ringkasan (ID)",
						children: /* @__PURE__ */ jsx(Textarea, {
							rows: 3,
							value: form.data.summary_id,
							onChange: (e) => form.setData("summary_id", e.target.value)
						})
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Ringkasan (EN)",
						children: /* @__PURE__ */ jsx(Textarea, {
							rows: 3,
							value: form.data.summary_en,
							onChange: (e) => form.setData("summary_en", e.target.value)
						})
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Highlights",
						hint: "satu poin per baris",
						children: /* @__PURE__ */ jsx(Textarea, {
							rows: 4,
							value: form.data.highlights,
							onChange: (e) => form.setData("highlights", e.target.value)
						})
					})
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "space-y-5",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "rounded-2xl border border-slate-200 bg-white p-6",
					children: [/* @__PURE__ */ jsx("p", {
						className: "mb-4 text-sm font-semibold text-slate-900",
						children: "Media & Status"
					}), /* @__PURE__ */ jsxs("div", {
						className: "space-y-4",
						children: [
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
							editing && project.cover && /* @__PURE__ */ jsx("img", {
								src: `/storage/${project.cover}`,
								alt: "Current cover",
								className: "w-full rounded-xl border border-slate-100 object-cover"
							}),
							/* @__PURE__ */ jsx(Toggle, {
								checked: form.data.is_featured,
								onChange: (v) => form.setData("is_featured", v),
								label: "Jadikan Featured"
							}),
							/* @__PURE__ */ jsx(Toggle, {
								checked: form.data.is_published,
								onChange: (v) => form.setData("is_published", v),
								label: "Terbitkan"
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
							href: "/admin/projects",
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
export { AdminProjectForm as default };

//# sourceMappingURL=Form-N_mo9L3u.js.map
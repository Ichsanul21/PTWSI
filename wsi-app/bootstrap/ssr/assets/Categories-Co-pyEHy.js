import { a as Input, n as DeleteButton, r as Field } from "./ui-Co_CMEy0.js";
import { t as AdminLayout } from "./AdminLayout-CKOMJvzr.js";
import { Link, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
//#region resources/js/Pages/Admin/TestMenu/Categories.jsx
function AdminCategories({ services, categories, activeService }) {
	const [mode, setMode] = useState(null);
	const isCreate = mode?.type === "create";
	const isEdit = mode?.type === "edit";
	const form = useForm({
		name_id: isEdit ? mode.category.name_id : "",
		name_en: isEdit ? mode.category.name_en : "",
		order: isEdit ? mode.category.order : 0
	});
	const submit = (e) => {
		e.preventDefault();
		if (isEdit) form.put(`/admin/test-categories/${mode.category.id}`, {
			preserveScroll: true,
			onSuccess: () => setMode(null)
		});
		else if (isCreate) form.post(`/admin/test-categories/${mode.service_id}`, {
			preserveScroll: true,
			onSuccess: () => setMode(null)
		});
	};
	const groupLabel = (cat) => {
		return services.find((x) => x.id === cat.service_id)?.name_id ?? "-";
	};
	return /* @__PURE__ */ jsxs(AdminLayout, {
		title: "Kategori Uji",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mb-6 flex flex-wrap gap-2",
			children: [/* @__PURE__ */ jsx(Link, {
				href: "/admin/test-categories",
				className: `rounded-full px-4 py-2 text-sm font-medium transition-colors ${!activeService ? "bg-ink text-white" : "border border-slate-200 bg-white text-slate-600"}`,
				children: "Semua"
			}), services.map((s) => /* @__PURE__ */ jsx(Link, {
				href: `/admin/test-categories?service=${s.id}`,
				className: `rounded-full px-4 py-2 text-sm font-medium transition-colors ${activeService === s.id ? "bg-ink text-white" : "border border-slate-200 bg-white text-slate-600"}`,
				children: s.name_id
			}, s.id))]
		}), /* @__PURE__ */ jsxs("div", {
			className: "grid gap-8 lg:grid-cols-3",
			children: [/* @__PURE__ */ jsx("div", {
				className: "overflow-x-auto rounded-2xl border border-slate-200 bg-white lg:col-span-2",
				children: /* @__PURE__ */ jsxs("table", {
					className: "w-full min-w-[720px] text-left text-sm",
					children: [/* @__PURE__ */ jsx("thead", {
						className: "border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-400",
						children: /* @__PURE__ */ jsxs("tr", { children: [
							/* @__PURE__ */ jsx("th", {
								className: "px-5 py-3 font-medium",
								children: "Nama"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "px-5 py-3 font-medium",
								children: "Layanan"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "px-5 py-3 font-medium",
								children: "Metode"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "px-5 py-3 font-medium text-right",
								children: "Aksi"
							})
						] })
					}), /* @__PURE__ */ jsxs("tbody", {
						className: "divide-y divide-slate-100",
						children: [categories.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
							colSpan: "4",
							className: "px-5 py-10 text-center text-slate-400",
							children: "Belum ada kategori."
						}) }), categories.map((c) => /* @__PURE__ */ jsxs("tr", {
							className: "hover:bg-slate-50",
							children: [
								/* @__PURE__ */ jsxs("td", {
									className: "px-5 py-3.5",
									children: [/* @__PURE__ */ jsx("p", {
										className: "font-medium text-slate-900",
										children: c.name_id
									}), /* @__PURE__ */ jsx("p", {
										className: "text-xs text-slate-400",
										children: c.name_en
									})]
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-5 py-3.5 text-slate-500",
									children: groupLabel(c)
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-5 py-3.5",
									children: /* @__PURE__ */ jsxs(Link, {
										href: `/admin/test-items?category=${c.id}`,
										className: "font-medium text-brand-600 hover:text-brand-700",
										children: [c.tests_count, " metode →"]
									})
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-5 py-3.5",
									children: /* @__PURE__ */ jsxs("div", {
										className: "flex justify-end gap-4",
										children: [/* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: () => setMode({
												type: "edit",
												category: c
											}),
											className: "font-medium text-brand-600 hover:text-brand-700",
											children: "Edit"
										}), /* @__PURE__ */ jsx(DeleteButton, { href: `/admin/test-categories/${c.id}` })]
									})
								})
							]
						}, c.id))]
					})]
				})
			}), /* @__PURE__ */ jsx("div", {
				className: "rounded-2xl border border-slate-200 bg-white p-6",
				children: !mode ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("p", {
					className: "mb-4 text-sm font-semibold text-slate-900",
					children: "Tambah Kategori"
				}), /* @__PURE__ */ jsx("div", {
					className: "space-y-3",
					children: services.map((s) => /* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => setMode({
							type: "create",
							service_id: s.id
						}),
						className: "w-full rounded-xl border border-slate-200 px-4 py-3 text-left text-sm font-medium text-slate-700 transition-colors hover:border-brand-600 hover:text-brand-600",
						children: ["+ ", s.name_id]
					}, s.id))
				})] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
					className: "mb-4 flex items-center justify-between",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-sm font-semibold text-slate-900",
						children: isEdit ? "Edit Kategori" : "Tambah Kategori"
					}), /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => setMode(null),
						className: "text-xs text-slate-400 hover:text-slate-600",
						children: "✕"
					})]
				}), /* @__PURE__ */ jsxs("form", {
					onSubmit: submit,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ jsx(Field, {
							label: "Nama (ID) *",
							error: form.errors.name_id,
							children: /* @__PURE__ */ jsx(Input, {
								value: form.data.name_id,
								onChange: (e) => form.setData("name_id", e.target.value),
								required: true
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Nama (EN) *",
							error: form.errors.name_en,
							children: /* @__PURE__ */ jsx(Input, {
								value: form.data.name_en,
								onChange: (e) => form.setData("name_en", e.target.value),
								required: true
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Urutan",
							hint: isCreate ? `≥ urutan layanan (default 0)` : "",
							children: /* @__PURE__ */ jsx(Input, {
								type: "number",
								value: form.data.order,
								onChange: (e) => form.setData("order", e.target.value)
							})
						}),
						/* @__PURE__ */ jsx("button", {
							type: "submit",
							disabled: form.processing,
							className: "w-full rounded-xl bg-brand-600 py-2.5 text-sm font-semibold text-white hover:bg-brand-500 disabled:opacity-60",
							children: form.processing ? "…" : "Simpan"
						})
					]
				}, isEdit ? mode.category.id : "new")] })
			})]
		})]
	});
}
//#endregion
export { AdminCategories as default };

//# sourceMappingURL=Categories-Co-pyEHy.js.map
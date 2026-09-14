import { a as Input, n as DeleteButton, r as Field, s as Textarea } from "./ui-Co_CMEy0.js";
import { t as AdminLayout } from "./AdminLayout-CKOMJvzr.js";
import { Link, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
//#region resources/js/Pages/Admin/TestMenu/Items.jsx
var EMPTY = {
	name_id: "",
	name_en: "",
	standards: "",
	description_id: "",
	description_en: "",
	order: 0
};
function AdminItems({ categories, items, activeCategory }) {
	const [mode, setMode] = useState(null);
	const isCreate = mode?.type === "create";
	const isEdit = mode?.type === "edit";
	const form = useForm(isEdit ? {
		name_id: mode.item.name_id,
		name_en: mode.item.name_en ?? "",
		standards: mode.item.standards?.join("\n") ?? "",
		description_id: mode.item.description_id ?? "",
		description_en: mode.item.description_en ?? "",
		order: mode.item.order
	} : {
		...EMPTY,
		category_id: mode?.category_id
	});
	const submit = (e) => {
		e.preventDefault();
		if (isEdit) form.put(`/admin/test-items/${mode.item.id}`, {
			preserveScroll: true,
			onSuccess: () => setMode(null)
		});
		else if (isCreate) form.post("/admin/test-items", {
			preserveScroll: true,
			onSuccess: () => setMode(null)
		});
	};
	const catLabel = (item) => {
		const c = categories.find((x) => x.id === item.category_id);
		return c ? `${c.name_id} - ${c.service?.name_id ?? ""}` : "-";
	};
	return /* @__PURE__ */ jsxs(AdminLayout, {
		title: "Metode Uji",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mb-6 flex flex-wrap gap-2",
			children: [/* @__PURE__ */ jsx(Link, {
				href: "/admin/test-items",
				className: `rounded-full px-4 py-2 text-sm font-medium transition-colors ${!activeCategory ? "bg-ink text-white" : "border border-slate-200 bg-white text-slate-600"}`,
				children: "Semua"
			}), categories.map((c) => /* @__PURE__ */ jsx(Link, {
				href: `/admin/test-items?category=${c.id}`,
				className: `rounded-full px-4 py-2 text-sm font-medium transition-colors ${activeCategory === c.id ? "bg-ink text-white" : "border border-slate-200 bg-white text-slate-600"}`,
				children: c.name_id
			}, c.id))]
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
								children: "Standar"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "px-5 py-3 font-medium",
								children: "Kategori"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "px-5 py-3 font-medium text-right",
								children: "Aksi"
							})
						] })
					}), /* @__PURE__ */ jsxs("tbody", {
						className: "divide-y divide-slate-100",
						children: [items.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
							colSpan: "4",
							className: "px-5 py-10 text-center text-slate-400",
							children: "Belum ada metode uji."
						}) }), items.map((item) => /* @__PURE__ */ jsxs("tr", {
							className: "hover:bg-slate-50",
							children: [
								/* @__PURE__ */ jsxs("td", {
									className: "px-5 py-3.5",
									children: [/* @__PURE__ */ jsx("p", {
										className: "font-medium text-slate-900",
										children: item.name_id
									}), item.name_en && /* @__PURE__ */ jsx("p", {
										className: "text-xs text-slate-400",
										children: item.name_en
									})]
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-5 py-3.5 font-mono text-[11px] text-slate-500",
									children: item.standards?.length ? item.standards.join(", ") : "-"
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-5 py-3.5 text-xs text-slate-500",
									children: catLabel(item)
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-5 py-3.5",
									children: /* @__PURE__ */ jsxs("div", {
										className: "flex justify-end gap-4",
										children: [/* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: () => setMode({
												type: "edit",
												item
											}),
											className: "font-medium text-brand-600 hover:text-brand-700",
											children: "Edit"
										}), /* @__PURE__ */ jsx(DeleteButton, { href: `/admin/test-items/${item.id}` })]
									})
								})
							]
						}, item.id))]
					})]
				})
			}), /* @__PURE__ */ jsx("div", {
				className: "rounded-2xl border border-slate-200 bg-white p-6",
				children: !mode ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("p", {
					className: "mb-4 text-sm font-semibold text-slate-900",
					children: "Tambah Metode"
				}), /* @__PURE__ */ jsx(Field, {
					label: "Kategori",
					children: /* @__PURE__ */ jsxs("select", {
						onChange: (e) => {
							const cat = categories.find((x) => x.id === Number(e.target.value));
							if (cat) setMode({
								type: "create",
								category_id: cat.id
							});
						},
						className: "w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900",
						defaultValue: "",
						children: [/* @__PURE__ */ jsx("option", {
							value: "",
							disabled: true,
							children: "Pilih kategori…"
						}), categories.map((c) => /* @__PURE__ */ jsx("option", {
							value: c.id,
							children: c.name_id
						}, c.id))]
					})
				})] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
					className: "mb-4 flex items-center justify-between",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-sm font-semibold text-slate-900",
						children: isEdit ? "Edit Metode" : "Tambah Metode"
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
							label: "Nama (EN)",
							children: /* @__PURE__ */ jsx(Input, {
								value: form.data.name_en,
								onChange: (e) => form.setData("name_en", e.target.value)
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Standar",
							hint: "pisah dgn baris baru (tiap baris = 1 standar)",
							children: /* @__PURE__ */ jsx(Textarea, {
								rows: 3,
								value: form.data.standards,
								onChange: (e) => form.setData("standards", e.target.value),
								placeholder: "ASTM D 2850\nSNI 03-3387"
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Deskripsi (ID)",
							children: /* @__PURE__ */ jsx(Textarea, {
								rows: 3,
								value: form.data.description_id,
								onChange: (e) => form.setData("description_id", e.target.value)
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Deskripsi (EN)",
							children: /* @__PURE__ */ jsx(Textarea, {
								rows: 3,
								value: form.data.description_en,
								onChange: (e) => form.setData("description_en", e.target.value)
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
						/* @__PURE__ */ jsx("button", {
							type: "submit",
							disabled: form.processing,
							className: "w-full rounded-xl bg-brand-600 py-2.5 text-sm font-semibold text-white hover:bg-brand-500 disabled:opacity-60",
							children: form.processing ? "…" : "Simpan"
						})
					]
				}, isEdit ? mode.item.id : "new")] })
			})]
		})]
	});
}
//#endregion
export { AdminItems as default };

//# sourceMappingURL=Items-DfljEDqh.js.map
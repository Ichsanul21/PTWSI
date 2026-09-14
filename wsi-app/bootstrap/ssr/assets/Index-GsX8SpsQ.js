import { a as Input, c as Toggle, n as DeleteButton, r as Field } from "./ui-Co_CMEy0.js";
import { t as AdminLayout } from "./AdminLayout-CKOMJvzr.js";
import { useForm } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
//#region resources/js/Pages/Admin/Clients/Index.jsx
var EMPTY = {
	name: "",
	website: "",
	order: 0,
	logo: null,
	is_published: true
};
function AdminClients({ clients }) {
	const [editing, setEditing] = useState(null);
	const isEdit = Boolean(editing);
	const form = useForm(isEdit ? {
		name: editing.name,
		website: editing.website ?? "",
		order: editing.order,
		logo: null,
		is_published: editing.is_published
	} : EMPTY, {});
	const submit = (e) => {
		e.preventDefault();
		if (isEdit) form.put(`/admin/clients/${editing.id}`, {
			preserveScroll: true,
			onSuccess: () => setEditing(null)
		});
		else form.post("/admin/clients", {
			preserveScroll: true,
			onSuccess: () => form.reset()
		});
	};
	return /* @__PURE__ */ jsx(AdminLayout, {
		title: "Klien",
		children: /* @__PURE__ */ jsxs("div", {
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
								children: "Logo"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "px-5 py-3 font-medium",
								children: "Status"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "px-5 py-3 font-medium text-right",
								children: "Aksi"
							})
						] })
					}), /* @__PURE__ */ jsxs("tbody", {
						className: "divide-y divide-slate-100",
						children: [clients.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
							colSpan: "4",
							className: "px-5 py-10 text-center text-slate-400",
							children: "Belum ada klien."
						}) }), clients.map((c) => /* @__PURE__ */ jsxs("tr", {
							className: "hover:bg-slate-50",
							children: [
								/* @__PURE__ */ jsxs("td", {
									className: "px-5 py-3.5",
									children: [/* @__PURE__ */ jsx("p", {
										className: "font-medium text-slate-900",
										children: c.name
									}), c.website && /* @__PURE__ */ jsx("p", {
										className: "text-xs text-slate-400",
										children: c.website
									})]
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-5 py-3.5",
									children: c.logo ? /* @__PURE__ */ jsx("img", {
										src: `/storage/${c.logo}`,
										alt: c.name,
										className: "h-9 w-auto rounded border border-slate-100 object-contain"
									}) : /* @__PURE__ */ jsx("span", {
										className: "text-xs text-slate-300",
										children: "-"
									})
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-5 py-3.5",
									children: /* @__PURE__ */ jsx("span", { className: `inline-block h-2.5 w-2.5 rounded-full ${c.is_published ? "bg-emerald-500" : "bg-slate-300"}` })
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-5 py-3.5",
									children: /* @__PURE__ */ jsxs("div", {
										className: "flex justify-end gap-4",
										children: [/* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: () => setEditing(c),
											className: "font-medium text-brand-600 hover:text-brand-700",
											children: "Edit"
										}), /* @__PURE__ */ jsx(DeleteButton, { href: `/admin/clients/${c.id}` })]
									})
								})
							]
						}, c.id))]
					})]
				})
			}), /* @__PURE__ */ jsxs("div", {
				className: "rounded-2xl border border-slate-200 bg-white p-6",
				children: [/* @__PURE__ */ jsx("p", {
					className: "mb-4 text-sm font-semibold text-slate-900",
					children: isEdit ? "Edit Klien" : "Tambah Klien"
				}), /* @__PURE__ */ jsxs("form", {
					onSubmit: submit,
					encType: "multipart/form-data",
					className: "space-y-4",
					children: [
						/* @__PURE__ */ jsx(Field, {
							label: "Nama *",
							error: form.errors.name,
							children: /* @__PURE__ */ jsx(Input, {
								value: form.data.name,
								onChange: (e) => form.setData("name", e.target.value),
								required: true
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Website",
							children: /* @__PURE__ */ jsx(Input, {
								value: form.data.website,
								onChange: (e) => form.setData("website", e.target.value),
								placeholder: "https://"
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Logo",
							hint: "png/svg, max 2MB",
							error: form.errors.logo,
							children: /* @__PURE__ */ jsx(Input, {
								type: "file",
								accept: "image/png,image/svg+xml,image/webp",
								onChange: (e) => form.setData("logo", e.target.files[0])
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
export { AdminClients as default };

//# sourceMappingURL=Index-GsX8SpsQ.js.map
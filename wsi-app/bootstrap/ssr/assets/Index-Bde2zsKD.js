import { n as DeleteButton } from "./ui-Co_CMEy0.js";
import { t as AdminLayout } from "./AdminLayout-CKOMJvzr.js";
import { Link } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/Admin/Services/Index.jsx
function AdminServicesIndex({ services }) {
	return /* @__PURE__ */ jsxs(AdminLayout, {
		title: "Layanan",
		children: [/* @__PURE__ */ jsx("div", {
			className: "mb-6 flex justify-end",
			children: /* @__PURE__ */ jsx(Link, {
				href: "/admin/services/create",
				className: "inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-colors hover:bg-brand-500",
				children: "+ Tambah Layanan"
			})
		}), /* @__PURE__ */ jsx("div", {
			className: "overflow-x-auto rounded-2xl border border-slate-200 bg-white",
			children: /* @__PURE__ */ jsxs("table", {
				className: "w-full min-w-[720px] text-left text-sm",
				children: [/* @__PURE__ */ jsx("thead", {
					className: "border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-400",
					children: /* @__PURE__ */ jsxs("tr", { children: [
						/* @__PURE__ */ jsx("th", {
							className: "px-5 py-3 font-medium",
							children: "#"
						}),
						/* @__PURE__ */ jsx("th", {
							className: "px-5 py-3 font-medium",
							children: "Nama (ID / EN)"
						}),
						/* @__PURE__ */ jsx("th", {
							className: "px-5 py-3 font-medium",
							children: "Slug"
						}),
						/* @__PURE__ */ jsx("th", {
							className: "px-5 py-3 font-medium",
							children: "Kategori"
						}),
						/* @__PURE__ */ jsx("th", {
							className: "px-5 py-3 font-medium",
							children: "Aktif"
						}),
						/* @__PURE__ */ jsx("th", {
							className: "px-5 py-3 font-medium text-right",
							children: "Aksi"
						})
					] })
				}), /* @__PURE__ */ jsx("tbody", {
					className: "divide-y divide-slate-100",
					children: services.map((s) => /* @__PURE__ */ jsxs("tr", {
						className: "hover:bg-slate-50",
						children: [
							/* @__PURE__ */ jsx("td", {
								className: "px-5 py-3.5 text-slate-400",
								children: s.order
							}),
							/* @__PURE__ */ jsxs("td", {
								className: "px-5 py-3.5",
								children: [/* @__PURE__ */ jsx("p", {
									className: "font-medium text-slate-900",
									children: s.name_id
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs text-slate-400",
									children: s.name_en
								})]
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-5 py-3.5 font-mono text-xs text-slate-500",
								children: s.slug
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-5 py-3.5 text-slate-500",
								children: s.test_categories_count
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-5 py-3.5",
								children: /* @__PURE__ */ jsx("span", { className: `inline-block h-2.5 w-2.5 rounded-full ${s.is_active ? "bg-emerald-500" : "bg-slate-300"}` })
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-5 py-3.5",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex justify-end gap-4",
									children: [/* @__PURE__ */ jsx(Link, {
										href: `/admin/services/${s.id}/edit`,
										className: "font-medium text-brand-600 hover:text-brand-700",
										children: "Edit"
									}), /* @__PURE__ */ jsx(DeleteButton, { href: `/admin/services/${s.id}` })]
								})
							})
						]
					}, s.id))
				})]
			})
		})]
	});
}
//#endregion
export { AdminServicesIndex as default };

//# sourceMappingURL=Index-Bde2zsKD.js.map
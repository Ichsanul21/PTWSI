import { n as DeleteButton } from "./ui-Co_CMEy0.js";
import { t as AdminLayout } from "./AdminLayout-CKOMJvzr.js";
import { Link } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/Admin/Projects/Index.jsx
function AdminProjects({ projects }) {
	return /* @__PURE__ */ jsxs(AdminLayout, {
		title: "Proyek",
		children: [/* @__PURE__ */ jsx("div", {
			className: "mb-6 flex justify-end",
			children: /* @__PURE__ */ jsx(Link, {
				href: "/admin/projects/create",
				className: "inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 hover:bg-brand-500",
				children: "+ Tambah Proyek"
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
							children: "Nama"
						}),
						/* @__PURE__ */ jsx("th", {
							className: "px-5 py-3 font-medium",
							children: "Kategori"
						}),
						/* @__PURE__ */ jsx("th", {
							className: "px-5 py-3 font-medium",
							children: "Lokasi & Tahun"
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
					children: [projects.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
						colSpan: "5",
						className: "px-5 py-10 text-center text-slate-400",
						children: "Belum ada proyek."
					}) }), projects.map((p) => /* @__PURE__ */ jsxs("tr", {
						className: "hover:bg-slate-50",
						children: [
							/* @__PURE__ */ jsxs("td", {
								className: "px-5 py-3.5",
								children: [/* @__PURE__ */ jsx("p", {
									className: "font-medium text-slate-900",
									children: p.name_id
								}), p.name_en && /* @__PURE__ */ jsx("p", {
									className: "text-xs text-slate-400",
									children: p.name_en
								})]
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-5 py-3.5 text-slate-500",
								children: p.category ?? "-"
							}),
							/* @__PURE__ */ jsxs("td", {
								className: "px-5 py-3.5 text-xs text-slate-500",
								children: [
									p.location_id ?? "-",
									p.year && /* @__PURE__ */ jsxs("span", {
										className: "ml-2 font-mono text-slate-400",
										children: [
											"(",
											p.year,
											")"
										]
									}),
									/* @__PURE__ */ jsx("br", {}),
									/* @__PURE__ */ jsx("span", {
										className: "text-slate-400",
										children: p.client?.name ?? p.client_name ?? ""
									})
								]
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-5 py-3.5",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx("span", { className: `inline-block h-2.5 w-2.5 rounded-full ${p.is_published ? "bg-emerald-500" : "bg-slate-300"}` }), p.is_featured && /* @__PURE__ */ jsx("span", {
										className: "rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-700",
										children: "Featured"
									})]
								})
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-5 py-3.5",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex justify-end gap-4",
									children: [/* @__PURE__ */ jsx(Link, {
										href: `/admin/projects/${p.id}/edit`,
										className: "font-medium text-brand-600 hover:text-brand-700",
										children: "Edit"
									}), /* @__PURE__ */ jsx(DeleteButton, { href: `/admin/projects/${p.id}` })]
								})
							})
						]
					}, p.id))]
				})]
			})
		})]
	});
}
//#endregion
export { AdminProjects as default };

//# sourceMappingURL=Index-BZhlDJ5Q.js.map
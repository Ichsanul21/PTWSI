import { n as DeleteButton } from "./ui-Co_CMEy0.js";
import { t as AdminLayout } from "./AdminLayout-CKOMJvzr.js";
import { Link } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/Admin/Insights/Index.jsx
function AdminInsightsIndex({ insights }) {
	return /* @__PURE__ */ jsxs(AdminLayout, {
		title: "Artikel Insight",
		children: [/* @__PURE__ */ jsx("div", {
			className: "mb-6 flex justify-end",
			children: /* @__PURE__ */ jsx(Link, {
				href: "/admin/insights/create",
				className: "inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 hover:bg-brand-500",
				children: "+ Tulis Artikel"
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
							children: "Judul"
						}),
						/* @__PURE__ */ jsx("th", {
							className: "px-5 py-3 font-medium",
							children: "Tipe"
						}),
						/* @__PURE__ */ jsx("th", {
							className: "px-5 py-3 font-medium",
							children: "Status"
						}),
						/* @__PURE__ */ jsx("th", {
							className: "px-5 py-3 font-medium",
							children: "Terbit"
						}),
						/* @__PURE__ */ jsx("th", {
							className: "px-5 py-3 font-medium text-right",
							children: "Aksi"
						})
					] })
				}), /* @__PURE__ */ jsxs("tbody", {
					className: "divide-y divide-slate-100",
					children: [insights.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
						colSpan: "5",
						className: "px-5 py-10 text-center text-slate-400",
						children: "Belum ada artikel."
					}) }), insights.map((post) => /* @__PURE__ */ jsxs("tr", {
						className: "hover:bg-slate-50",
						children: [
							/* @__PURE__ */ jsxs("td", {
								className: "px-5 py-3.5",
								children: [/* @__PURE__ */ jsx("p", {
									className: "font-medium text-slate-900",
									children: post.title_id
								}), post.title_en && /* @__PURE__ */ jsx("p", {
									className: "text-xs text-slate-400",
									children: post.title_en
								})]
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-5 py-3.5 text-slate-500",
								children: post.type
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-5 py-3.5",
								children: /* @__PURE__ */ jsx("span", { className: `inline-block h-2.5 w-2.5 rounded-full ${post.is_published ? "bg-emerald-500" : "bg-slate-300"}` })
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-5 py-3.5 text-xs text-slate-400",
								children: post.published_at ?? "-"
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-5 py-3.5",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex justify-end gap-4",
									children: [/* @__PURE__ */ jsx(Link, {
										href: `/admin/insights/${post.id}/edit`,
										className: "font-medium text-brand-600 hover:text-brand-700",
										children: "Edit"
									}), /* @__PURE__ */ jsx(DeleteButton, {
										href: `/admin/insights/${post.id}`,
										label: "Hapus"
									})]
								})
							})
						]
					}, post.id))]
				})]
			})
		})]
	});
}
//#endregion
export { AdminInsightsIndex as default };

//# sourceMappingURL=Index-Ccg9-H49.js.map
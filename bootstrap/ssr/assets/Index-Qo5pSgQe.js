import { t as AdminLayout } from "./AdminLayout-CKOMJvzr.js";
import { Link, router } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/Admin/Enquiries/Index.jsx
var STATUS = {
	new: {
		label: "Baru",
		cls: "bg-blue-50 text-blue-700 border-blue-200"
	},
	contacted: {
		label: "Dihubungi",
		cls: "bg-amber-50 text-amber-700 border-amber-200"
	},
	closed: {
		label: "Selesai",
		cls: "bg-emerald-50 text-emerald-700 border-emerald-200"
	}
};
function AdminEnquiries({ enquiries, status }) {
	const setStatus = (id, next) => router.put(`/admin/enquiries/${id}`, { status: next }, {
		preserveScroll: true,
		preserveState: true
	});
	return /* @__PURE__ */ jsxs(AdminLayout, {
		title: "Enquiries",
		children: [/* @__PURE__ */ jsx("div", {
			className: "mb-6 flex flex-wrap gap-2",
			children: [
				"all",
				"new",
				"contacted",
				"closed"
			].map((s) => /* @__PURE__ */ jsx(Link, {
				href: `/admin/enquiries${s === "all" ? "" : `?status=${s}`}`,
				className: `rounded-full px-4 py-2 text-sm font-medium transition-colors ${status === s ? "bg-ink text-white" : "border border-slate-200 bg-white text-slate-600"}`,
				children: s === "all" ? "Semua" : STATUS[s].label
			}, s))
		}), /* @__PURE__ */ jsxs("div", {
			className: "space-y-4",
			children: [enquiries.length === 0 && /* @__PURE__ */ jsx("p", {
				className: "rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center text-slate-400",
				children: "Tidak ada enquiry."
			}), enquiries.map((e) => /* @__PURE__ */ jsxs("div", {
				className: "rounded-2xl border border-slate-200 bg-white p-6",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap items-start justify-between gap-4",
						children: [/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ jsx("h2", {
									className: "font-display font-bold text-slate-900",
									children: e.name
								}), /* @__PURE__ */ jsx("span", {
									className: `inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${STATUS[e.status]?.cls}`,
									children: STATUS[e.status]?.label
								})]
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "mt-1 text-sm text-slate-500",
								children: [
									e.company && /* @__PURE__ */ jsxs("span", { children: [e.company, " · "] }),
									/* @__PURE__ */ jsx("a", {
										href: `mailto:${e.email}`,
										className: "text-brand-600 hover:underline",
										children: e.email
									}),
									e.phone && /* @__PURE__ */ jsxs("span", { children: [" · ", e.phone] })
								]
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "mt-0.5 text-xs text-slate-400",
								children: [
									e.created_at,
									" · Lokale: ",
									e.locale
								]
							})
						] }), /* @__PURE__ */ jsx("select", {
							value: e.status,
							onChange: (ev) => setStatus(e.id, ev.target.value),
							className: "rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700",
							children: Object.entries(STATUS).map(([k, v]) => /* @__PURE__ */ jsx("option", {
								value: k,
								children: v.label
							}, k))
						})]
					}),
					e.service && /* @__PURE__ */ jsx("div", {
						className: "mt-4",
						children: /* @__PURE__ */ jsxs("span", {
							className: "rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600",
							children: ["Layanan: ", e.service.name_id]
						})
					}),
					e.message && /* @__PURE__ */ jsx("p", {
						className: "mt-4 whitespace-pre-wrap text-sm leading-relaxed text-slate-700",
						children: e.message
					})
				]
			}, e.id))]
		})]
	});
}
//#endregion
export { AdminEnquiries as default };

//# sourceMappingURL=Index-Qo5pSgQe.js.map
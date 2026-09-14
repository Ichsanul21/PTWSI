import { Link, router, usePage } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Components/admin/ui.jsx
function Field({ label, hint, children, error }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "block",
		children: [
			/* @__PURE__ */ jsxs("span", {
				className: "mb-1.5 flex items-baseline gap-2 text-sm font-medium text-slate-700",
				children: [label, hint && /* @__PURE__ */ jsx("span", {
					className: "text-xs font-normal text-slate-400",
					children: hint
				})]
			}),
			children,
			error && /* @__PURE__ */ jsx("span", {
				className: "mt-1 block text-xs font-medium text-red-600",
				children: error
			})
		]
	});
}
var inputBase = "w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm transition-colors focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20";
function Input(props) {
	return /* @__PURE__ */ jsx("input", {
		...props,
		className: `${inputBase} ${props.className ?? ""}`
	});
}
function Textarea(props) {
	return /* @__PURE__ */ jsx("textarea", {
		...props,
		className: `${inputBase} ${props.className ?? ""}`
	});
}
function Select({ children, ...props }) {
	return /* @__PURE__ */ jsx("select", {
		...props,
		className: inputBase,
		children
	});
}
function Toggle({ checked, onChange, label }) {
	return /* @__PURE__ */ jsxs("button", {
		type: "button",
		onClick: () => onChange(!checked),
		className: "flex items-center gap-3 text-sm font-medium text-slate-700",
		children: [/* @__PURE__ */ jsx("span", {
			className: `relative h-6 w-11 rounded-full transition-colors ${checked ? "bg-brand-600" : "bg-slate-300"}`,
			children: /* @__PURE__ */ jsx("span", { className: `absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${checked ? "left-[22px]" : "left-0.5"}` })
		}), label]
	});
}
function Flash() {
	const flash = usePage().props.flash ?? {};
	if (!flash.success && !flash.error) return null;
	return /* @__PURE__ */ jsx("div", {
		className: `mb-6 rounded-xl border px-4 py-3 text-sm font-medium ${flash.success ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-700"}`,
		children: flash.success ?? flash.error
	});
}
function DeleteButton({ href, label = "Hapus" }) {
	const onDelete = (e) => {
		e.preventDefault();
		if (confirm("Yakin ingin menghapus? Tindakan ini tidak bisa dibatalkan.")) router.delete(href, { preserveScroll: true });
	};
	return /* @__PURE__ */ jsx("button", {
		type: "button",
		onClick: onDelete,
		className: "font-medium text-red-600 transition-colors hover:text-red-700",
		children: label
	});
}
function AdminLink({ href, active, children }) {
	return /* @__PURE__ */ jsx(Link, {
		href,
		className: `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${active ? "bg-brand-600 text-white shadow-lg shadow-brand-600/25" : "text-slate-400 hover:bg-white/5 hover:text-white"}`,
		children
	});
}
//#endregion
export { Input as a, Toggle as c, Flash as i, DeleteButton as n, Select as o, Field as r, Textarea as s, AdminLink as t };

//# sourceMappingURL=ui-Co_CMEy0.js.map
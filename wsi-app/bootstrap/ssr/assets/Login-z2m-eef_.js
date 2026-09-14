import { a as Input, r as Field } from "./ui-Co_CMEy0.js";
import { useForm } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/Admin/Login.jsx
function AdminLogin() {
	const form = useForm({
		email: "",
		password: "",
		remember: false
	});
	const submit = (e) => {
		e.preventDefault();
		form.post("/admin/login", { preserveScroll: true });
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "relative flex min-h-screen items-center justify-center overflow-hidden bg-ink px-6",
		children: [/* @__PURE__ */ jsx("div", { className: "dot-grid absolute inset-0 opacity-60" }), /* @__PURE__ */ jsxs("div", {
			className: "relative w-full max-w-md",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "mb-8 flex flex-col items-center gap-3",
					children: [/* @__PURE__ */ jsx("img", {
						src: "/images/logo-bulat.png",
						alt: "PT Wall Street Indonesia",
						className: "h-14 w-14 rounded-full object-cover"
					}), /* @__PURE__ */ jsxs("div", {
						className: "text-center",
						children: [/* @__PURE__ */ jsx("h1", {
							className: "font-display text-xl font-bold text-white",
							children: "Admin Panel"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-1 font-mono text-xs uppercase tracking-[0.18em] text-brand-400",
							children: "PT Wall Street Indonesia"
						})]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "rounded-3xl border border-cream/10 bg-cream p-8 shadow-2xl",
					children: [form.errors.email && /* @__PURE__ */ jsx("div", {
						className: "mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700",
						children: form.errors.email
					}), /* @__PURE__ */ jsxs("form", {
						onSubmit: submit,
						className: "space-y-5",
						children: [
							/* @__PURE__ */ jsx(Field, {
								label: "Email",
								children: /* @__PURE__ */ jsx(Input, {
									type: "email",
									value: form.data.email,
									onChange: (e) => form.setData("email", e.target.value),
									placeholder: "admin@wallstreetindonesia.com",
									required: true,
									autoFocus: true
								})
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Password",
								children: /* @__PURE__ */ jsx(Input, {
									type: "password",
									value: form.data.password,
									onChange: (e) => form.setData("password", e.target.value),
									placeholder: "••••••••",
									required: true
								})
							}),
							/* @__PURE__ */ jsx("button", {
								type: "submit",
								disabled: form.processing,
								className: "w-full rounded-full bg-ink py-3 text-sm font-semibold text-cream transition-colors hover:bg-ink-700 disabled:opacity-60",
								children: form.processing ? "Memproses…" : "Masuk"
							})
						]
					})]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-6 text-center text-xs text-cream/40",
					children: "Staging login: admin@wallstreetindonesia.com / password"
				})
			]
		})]
	});
}
//#endregion
export { AdminLogin as default };

//# sourceMappingURL=Login-z2m-eef_.js.map
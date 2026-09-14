import { Head, usePage } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
//#region resources/js/Components/Seo.jsx
function Seo({ title, description }) {
	const { props } = usePage();
	const locale = props.locale;
	const seo = props.site?.seo ?? {};
	const brand = props.site?.brand?.name ?? "PT Wall Street Indonesia";
	const meta = useMemo(() => {
		const fallback = seo[`description_${locale}`] ?? seo.description_id ?? "";
		const origin = typeof window !== "undefined" ? window.location.origin : "";
		const path = typeof window !== "undefined" ? window.location.pathname : "";
		return {
			description: description || fallback,
			url: `${origin}${path}`,
			image: props.site?.brand?.og_image ?? ""
		};
	}, [
		description,
		locale,
		seo,
		props.site
	]);
	return /* @__PURE__ */ jsxs(Head, { children: [
		/* @__PURE__ */ jsx("title", { children: title }),
		/* @__PURE__ */ jsx("meta", {
			name: "description",
			content: meta.description
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:title",
			content: title
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:description",
			content: meta.description
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:locale",
			content: locale === "id" ? "id_ID" : "en_US"
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:site_name",
			content: brand
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:type",
			content: "website"
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:url",
			content: meta.url
		}),
		meta.image && /* @__PURE__ */ jsx("meta", {
			property: "og:image",
			content: meta.image
		}),
		/* @__PURE__ */ jsx("link", {
			rel: "canonical",
			href: meta.url
		})
	] });
}
//#endregion
export { Seo as t };

//# sourceMappingURL=Seo-DAd7HCP1.js.map
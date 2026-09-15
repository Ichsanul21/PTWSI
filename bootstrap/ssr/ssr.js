import ReactDOMServer from "react-dom/server";
import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import { jsx } from "react/jsx-runtime";
//#region node_modules/laravel-vite-plugin/inertia-helpers/index.js
async function resolvePageComponent(path, pages) {
	for (const p of Array.isArray(path) ? path : [path]) {
		const page = pages[p];
		if (typeof page === "undefined") continue;
		return typeof page === "function" ? page() : page;
	}
	throw new Error(`Page not found: ${path}`);
}
//#endregion
//#region resources/js/ssr.jsx
var renderPage = (page) => createInertiaApp({
	page,
	render: ReactDOMServer.renderToString,
	resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, /* #__PURE__ */ Object.assign({
		"./Pages/About.jsx": () => import("./assets/About-BDd3WlAn.js"),
		"./Pages/Admin/Clients/Index.jsx": () => import("./assets/Index-GsX8SpsQ.js"),
		"./Pages/Admin/Dashboard.jsx": () => import("./assets/Dashboard-Bt7-24Gh.js"),
		"./Pages/Admin/Enquiries/Index.jsx": () => import("./assets/Index-Qo5pSgQe.js"),
		"./Pages/Admin/Gallery/Index.jsx": () => import("./assets/Index-PMCkMOSp.js"),
		"./Pages/Admin/Insights/Form.jsx": () => import("./assets/Form-CLZrptcf.js"),
		"./Pages/Admin/Insights/Index.jsx": () => import("./assets/Index-Ccg9-H49.js"),
		"./Pages/Admin/Login.jsx": () => import("./assets/Login-z2m-eef_.js"),
		"./Pages/Admin/Projects/Form.jsx": () => import("./assets/Form-N_mo9L3u.js"),
		"./Pages/Admin/Projects/Index.jsx": () => import("./assets/Index-BZhlDJ5Q.js"),
		"./Pages/Admin/Services/Form.jsx": () => import("./assets/Form-BC7Kbttu.js"),
		"./Pages/Admin/Services/Index.jsx": () => import("./assets/Index-Bde2zsKD.js"),
		"./Pages/Admin/Settings/Edit.jsx": () => import("./assets/Edit-BVgyiyTw.js"),
		"./Pages/Admin/TestMenu/Categories.jsx": () => import("./assets/Categories-Co-pyEHy.js"),
		"./Pages/Admin/TestMenu/Items.jsx": () => import("./assets/Items-DfljEDqh.js"),
		"./Pages/Clients.jsx": () => import("./assets/Clients-BQjJ2_gC.js"),
		"./Pages/Contact.jsx": () => import("./assets/Contact-D1XLs42w.js"),
		"./Pages/Gallery.jsx": () => import("./assets/Gallery-DeDwlmBv.js"),
		"./Pages/Home.jsx": () => import("./assets/Home-Bqd_hJ9N.js"),
		"./Pages/Insights/Index.jsx": () => import("./assets/Index-D_SNqnw4.js"),
		"./Pages/Insights/Show.jsx": () => import("./assets/Show-CGwZxzsh.js"),
		"./Pages/Services/Index.jsx": () => import("./assets/Index-Bqm9Xghx.js"),
		"./Pages/Services/Show.jsx": () => import("./assets/Show-dKfrHG2t.js")
	})),
	setup: ({ App, props }) => /* @__PURE__ */ jsx(App, { ...props })
});
createServer(renderPage);
//#endregion
export { renderPage as default };

//# sourceMappingURL=ssr.js.map
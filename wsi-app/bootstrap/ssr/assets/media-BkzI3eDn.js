//#region resources/js/Components/ui/media.js
var HERO_IMAGE = {
	src: "/images/hero-mine.jpg",
	id: "Tambang terbuka",
	en: "Open-pit mine"
};
var SERVICE_IMAGES = {
	geomekanika: {
		src: "/images/lab-soil.jpg",
		id: "Pengujian tanah di laboratorium",
		en: "Soil testing in the laboratory"
	},
	"mekanika-batuan": {
		src: "/images/rock-core.jpg",
		id: "Sampel inti batuan",
		en: "Rock core samples"
	},
	"hidrogeologi-lingkungan": {
		src: "/images/water-lab.jpg",
		id: "Pengujian kualitas air",
		en: "Water quality testing"
	}
};
var INSIGHT_IMAGES = [
	{
		src: "/images/excavator.jpg",
		id: "Ekskavator di area tambang",
		en: "Excavator at the mine site"
	},
	{
		src: "/images/dam-boundary.jpg",
		id: "Bendungan dari udara",
		en: "Aerial view of a dam"
	},
	{
		src: "/images/highway.jpg",
		id: "Konstruksi jalan raya",
		en: "Highway construction"
	}
];
var PROJECT_FALLBACKS = [
	...INSIGHT_IMAGES,
	{
		src: "/images/coal-aerial.jpg",
		id: "Area tambang dari udara",
		en: "Aerial view of a mining area"
	},
	{
		src: "/images/haul-truck.jpg",
		id: "Truk tambang",
		en: "Mine haul truck"
	},
	{
		src: "/images/tunnel.jpg",
		id: "Konstruksi terowongan",
		en: "Tunnel construction"
	}
];
var FIELD_STRIP = [
	{
		src: "/images/haul-truck.jpg",
		id: "Armada tambang",
		en: "Mining fleet"
	},
	{
		src: "/images/tunnel.jpg",
		id: "Pekerjaan bawah tanah",
		en: "Underground works"
	},
	{
		src: "/images/coal-aerial.jpg",
		id: "Area konsesi tambang",
		en: "Mining concession area"
	}
];
var ABOUT_IMAGE = {
	src: "/images/lab-soil.jpg",
	id: "Pengujian tanah di laboratorium",
	en: "Soil testing in the laboratory"
};
var GALLERY_BANNER = {
	src: "/images/metro-crane.jpg",
	id: "Dokumentasi proyek konstruksi",
	en: "Construction project documentation"
};
var alt = (img, locale) => locale === "en" ? img.en : img.id;
//#endregion
export { INSIGHT_IMAGES as a, alt as c, HERO_IMAGE as i, FIELD_STRIP as n, PROJECT_FALLBACKS as o, GALLERY_BANNER as r, SERVICE_IMAGES as s, ABOUT_IMAGE as t };

//# sourceMappingURL=media-BkzI3eDn.js.map
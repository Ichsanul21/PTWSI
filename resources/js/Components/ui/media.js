// Local stock photography (Flickr / Wikimedia contributors via Openverse, CC BY / CC BY-SA / public domain).
// See footer credits. Replace with the company's own documentation photos when available.

export const HERO_IMAGE = {
    src: '/images/hero-mine.jpg',
    id: 'Tambang terbuka',
    en: 'Open-pit mine',
}

export const SERVICE_IMAGES = {
    geomekanika: {
        src: '/images/lab-soil.jpg',
        id: 'Pengujian tanah di laboratorium',
        en: 'Soil testing in the laboratory',
    },
    'mekanika-batuan': {
        src: '/images/rock-core.jpg',
        id: 'Sampel inti batuan',
        en: 'Rock core samples',
    },
    'hidrogeologi-lingkungan': {
        src: '/images/water-lab.jpg',
        id: 'Pengujian kualitas air',
        en: 'Water quality testing',
    },
}

export const INSIGHT_IMAGES = [
    { src: '/images/excavator.jpg', id: 'Ekskavator di area tambang', en: 'Excavator at the mine site' },
    { src: '/images/dam-boundary.jpg', id: 'Bendungan dari udara', en: 'Aerial view of a dam' },
    { src: '/images/highway.jpg', id: 'Konstruksi jalan raya', en: 'Highway construction' },
]

export const PROJECT_FALLBACKS = [
    ...INSIGHT_IMAGES,
    { src: '/images/coal-aerial.jpg', id: 'Area tambang dari udara', en: 'Aerial view of a mining area' },
    { src: '/images/haul-truck.jpg', id: 'Truk tambang', en: 'Mine haul truck' },
    { src: '/images/tunnel.jpg', id: 'Konstruksi terowongan', en: 'Tunnel construction' },
]

export const FIELD_STRIP = [
    { src: '/images/haul-truck.jpg', id: 'Armada tambang', en: 'Mining fleet' },
    { src: '/images/tunnel.jpg', id: 'Pekerjaan bawah tanah', en: 'Underground works' },
    { src: '/images/coal-aerial.jpg', id: 'Area konsesi tambang', en: 'Mining concession area' },
]

export const ABOUT_IMAGE = {
    src: '/images/lab-soil.jpg',
    id: 'Pengujian tanah di laboratorium',
    en: 'Soil testing in the laboratory',
}

export const GALLERY_BANNER = {
    src: '/images/metro-crane.jpg',
    id: 'Dokumentasi proyek konstruksi',
    en: 'Construction project documentation',
}

export const alt = (img, locale) => (locale === 'en' ? img.en : img.id)

import { Head, usePage } from '@inertiajs/react'
import { useMemo } from 'react'

export default function Seo({ title, description }) {
    const { props } = usePage()
    const locale = props.locale
    const seo = props.site?.seo ?? {}
    const brand = props.site?.brand?.name ?? 'PT Wall Street Indonesia'

    const meta = useMemo(() => {
        const fallback = seo[`description_${locale}`] ?? seo.description_id ?? ''
        const origin = typeof window !== 'undefined' ? window.location.origin : ''
        const path = typeof window !== 'undefined' ? window.location.pathname : ''
        return {
            description: description || fallback,
            url: `${origin}${path}`,
            image: props.site?.brand?.og_image ?? '',
        }
    }, [description, locale, seo, props.site])

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={meta.description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={meta.description} />
            <meta property="og:locale" content={locale === 'id' ? 'id_ID' : 'en_US'} />
            <meta property="og:site_name" content={brand} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={meta.url} />
            {meta.image && <meta property="og:image" content={meta.image} />}
            <link rel="canonical" href={meta.url} />
        </Head>
    )
}
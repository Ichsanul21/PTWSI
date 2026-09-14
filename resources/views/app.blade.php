<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}" class="scroll-smooth">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title inertia>{{ config('app.name', 'PT Wall Street Indonesia') }}</title>

        @php
            $seo = App\Models\Setting::get('seo', []);
            $brand = App\Models\Setting::get('brand', []);
        @endphp
        <meta name="description" content="{{ $seo['description_' . app()->getLocale()] ?? ($seo['description_id'] ?? '') }}">
        <link rel="canonical" href="{{ url()->current() }}">

        <script type="application/ld+json">
        {
            "@@context": "https://schema.org",
            "@type": "Laboratory",
            "name": "{{ $brand['name'] ?? config('app.name', 'PT Wall Street Indonesia') }}",
            "description": "{{ $seo['description_' . app()->getLocale()] ?? ($seo['description_id'] ?? '') }}",
            "email": "{{ $brand['email'] ?? '' }}",
            "telephone": "{{ isset($brand['phones'][0]) ? $brand['phones'][0] : '' }}",
            "address": {
                "@type": "PostalAddress",
                "@language": "id",
                "streetAddress": "{{ $brand['address_id'] ?? '' }}",
                "addressLocality": "Samarinda",
                "addressRegion": "Kalimantan Timur",
                "postalCode": "75243",
                "addressCountry": "ID"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": "{{ $seo['lat'] ?? '' }}",
                "longitude": "{{ $seo['lng'] ?? '' }}"
            },
            "openingHours": "{{ $brand['working_hours'] ?? '' }}",
            "url": "{{ url('/') }}"
        }
        </script>

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Roboto:wght@400;500;600;700;800&family=Rubik:wght@400;500;600&display=swap" rel="stylesheet">

        <link rel="icon" href="/images/logo-bulat.png" type="image/png">

        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    </head>
    <body class="font-sans antialiased bg-white text-ink selection:bg-brand-600 selection:text-white">
        @inertia
    </body>
</html>
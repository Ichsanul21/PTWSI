<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>404 | {{ config('app.name', 'PT Wall Street Indonesia') }}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Roboto:wght@400;600;700;800&family=Rubik:wght@400;600&display=swap" rel="stylesheet">
        <link rel="icon" href="/images/logo-bulat.png" type="image/png">
        <style>
            @media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
            body{margin:0;background:#fff;color:#082338;font-family:"Plus Jakarta Sans",sans-serif;display:grid;place-items:center;min-height:100vh;overflow:hidden}
            main{position:relative;text-align:center;padding:2rem;max-width:52ch}
            .dots{position:absolute;inset:0;opacity:.6;background-image:radial-gradient(rgba(10,0,23,.08) 1px,transparent 1px);background-size:12px 12px;pointer-events:none}
            .code{font-family:Roboto,sans-serif;font-size:clamp(5rem,18vw,11rem);font-weight:800;line-height:1;color:#082338;margin:0;letter-spacing:-.02em}
            .mono{font-family:"Rubik",monospace;font-size:.78rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(10,0,23,.5)}
            h1{font-size:clamp(1.3rem,3vw,1.8rem);margin:.6em 0 .4em;color:#082338}
            p{color:#5e615d;margin:0 auto 1.8em;max-width:38ch;line-height:1.6}
            .btn{display:inline-flex;align-items:center;gap:.6em;background:#005ca5;color:#fff;text-decoration:none;font-family:"Rubik",monospace;font-size:.85rem;text-transform:uppercase;letter-spacing:.04em;padding:.85em 1.6em;border-radius:4px;transition:background .2s}
            .btn:hover{background:#004b87}
        </style>
    </head>
    <body>
        <main>
            <div class="dots"></div>
            <p class="mono" style="margin-bottom:1.2em">404 · Not Found</p>
            <p class="code">404</p>
            <h1>Halaman tidak ditemukan</h1>
            <p>Sampel yang Anda cari mungkin sudah dipindahkan, atau alamatnya keliru. Seperti hasil uji yang tidak ada. Yang penting segera dilaporkan.</p>
            <a class="btn" href="{{ url('/') }}">Kembali ke Beranda</a>
        </main>
    </body>
</html>

<?php

namespace App\Http\Controllers;

use App\Models\Insight;
use App\Models\Service;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function __invoke(): Response
    {
        $origin = request()->schemeAndHttpHost();
        $now = now()->toAtomString();

        $urls = collect([
            '/',
            '/tentang',
            '/layanan',
            '/klien',
            '/insight',
            '/galeri',
            '/kontak',
            '/en/',
            '/en/tentang',
            '/en/layanan',
            '/en/klien',
            '/en/insight',
            '/en/galeri',
            '/en/kontak',
        ])->map(fn ($p) => ['loc' => $origin.$p, 'lastmod' => $now, 'changefreq' => 'monthly', 'priority' => '0.8'])
            ->concat(
                Service::orderBy('order')->get()->flatMap(function ($service) use ($origin, $now) {
                    return [
                        ['loc' => $origin."/layanan/{$service->slug}", 'lastmod' => $now, 'changefreq' => 'weekly', 'priority' => '0.9'],
                        ['loc' => $origin."/en/layanan/{$service->slug}", 'lastmod' => $now, 'changefreq' => 'weekly', 'priority' => '0.9'],
                    ];
                }),
            )
            ->concat(
                Insight::published()->orderByDesc('published_at')->get()->flatMap(function ($post) use ($origin) {
                    return [
                        ['loc' => $origin."/insight/{$post->slug}", 'lastmod' => $post->published_at?->toAtomString() ?? '', 'changefreq' => 'weekly', 'priority' => '0.7'],
                        ['loc' => $origin."/en/insight/{$post->slug}", 'lastmod' => $post->published_at?->toAtomString() ?? '', 'changefreq' => 'weekly', 'priority' => '0.7'],
                    ];
                }),
            )
            ->map(function ($url) {
                $xml = '  <url>'."\n";
                foreach (['loc', 'lastmod', 'changefreq', 'priority'] as $key) {
                    $xml .= "    <{$key}>".htmlspecialchars($url[$key], ENT_XML1 | ENT_QUOTES, 'UTF-8')."</{$key}>\n";
                }

                return $xml.'  </url>';
            })
            ->implode("\n");

        $xml = '<?xml version="1.0" encoding="UTF-8"?>'."\n"
            .'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'."\n"
            .$urls."\n"
            .'</urlset>'."\n";

        return response($xml, 200, ['Content-Type' => 'application/xml']);
    }
}
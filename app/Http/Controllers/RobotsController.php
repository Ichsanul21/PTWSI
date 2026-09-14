<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;

class RobotsController extends Controller
{
    public function __invoke(): Response
    {
        $origin = request()->schemeAndHttpHost();

        $txt = "User-agent: *\n"
            ."Allow: /\n"
            ."Disallow: /admin\n"
            ."Sitemap: {$origin}/sitemap.xml\n";

        return response($txt, 200, ['Content-Type' => 'text/plain']);
    }
}
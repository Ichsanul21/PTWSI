<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    public function handle(Request $request, Closure $next): Response
    {
        $segment = $request->segment(1);
        $locale = match ($segment) {
            'en' => 'en',
            'id' => 'id',
            default => session('locale', 'id'),
        };

        if (in_array($segment, ['en', 'id'], true)) {
            session(['locale' => $locale]);
        }

        app()->setLocale($locale);

        return $next($request);
    }
}
<?php

namespace App\Http\Middleware;

use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $locale = app()->getLocale();

        return [
            ...parent::share($request),
            'locale' => $locale,
            'translations' => json_decode(file_get_contents(lang_path("{$locale}.json")), true),
            'flash' => ['success' => session('success'), 'error' => session('error')],
            'auth' => [
                'user' => Auth::check() ? ['name' => Auth::user()->name, 'email' => Auth::user()->email] : null,
            ],
            'site' => [
                'brand' => Setting::get('brand'),
                'hero' => Setting::get('hero'),
                'about' => Setting::get('about'),
                'contact' => Setting::get('brand'),
                'stats' => Setting::get('stats'),
            ],
        ];
    }
}
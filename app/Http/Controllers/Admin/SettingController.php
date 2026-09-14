<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('Admin/Settings/Edit', [
            'settings' => [
                'brand' => Setting::get('brand') ?? [],
                'hero' => Setting::get('hero') ?? [],
                'about' => Setting::get('about') ?? [],
                'stats' => Setting::get('stats') ?? [],
                'seo' => Setting::get('seo') ?? [],
            ],
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'brand' => ['nullable', 'array'],
            'hero' => ['nullable', 'array'],
            'about' => ['nullable', 'array'],
            'stats' => ['nullable', 'array'],
            'seo' => ['nullable', 'array'],
        ]);

        foreach ($data as $key => $value) {
            if ($value !== null) {
                Setting::rememberedSet($key, $value);
            }
        }

        return redirect()->route('admin.settings.edit')->with('success', 'Pengaturan disimpan.');
    }
}
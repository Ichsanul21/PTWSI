<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Insight;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class InsightController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Insights/Index', [
            'insights' => Insight::orderByDesc('id')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Insights/Form', [
            'insight' => null,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);

        if ($request->hasFile('cover')) {
            $data['cover'] = $request->file('cover')->store('insights', 'public');
        }

        Insight::create($data);

        return redirect()->route('admin.insights.index')->with('success', 'Artikel ditambahkan.');
    }

    public function edit(Insight $insight): Response
    {
        return Inertia::render('Admin/Insights/Form', [
            'insight' => $insight,
        ]);
    }

    public function update(Request $request, Insight $insight): RedirectResponse
    {
        $data = $this->validated($request);

        if ($request->hasFile('cover')) {
            if ($insight->cover) {
                Storage::disk('public')->delete($insight->cover);
            }
            $data['cover'] = $request->file('cover')->store('insights', 'public');
        }

        $insight->update($data);

        return redirect()->route('admin.insights.index')->with('success', 'Artikel diperbarui.');
    }

    public function destroy(Insight $insight): RedirectResponse
    {
        if ($insight->cover) {
            Storage::disk('public')->delete($insight->cover);
        }
        $insight->delete();

        return redirect()->route('admin.insights.index')->with('success', 'Artikel dihapus.');
    }

    private function validated(Request $request): array
    {
        $data = $request->validate([
            'title_id' => ['required', 'string', 'max:255'],
            'title_en' => ['nullable', 'string', 'max:255'],
            'type' => ['nullable', 'string', 'max:50'],
            'category_id' => ['nullable', 'string', 'max:100'],
            'category_en' => ['nullable', 'string', 'max:100'],
            'author' => ['nullable', 'string', 'max:120'],
            'excerpt_id' => ['nullable', 'string', 'max:500'],
            'excerpt_en' => ['nullable', 'string', 'max:500'],
            'body_id' => ['nullable', 'string'],
            'body_en' => ['nullable', 'string'],
            'cover' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'published_at' => ['nullable', 'date'],
            'is_published' => ['nullable', 'boolean'],
        ]);

        $data['slug'] = Str::slug($data['title_id']).'-'.Str::random(4);
        $data['is_published'] = $request->boolean('is_published');
        $data['published_at'] = $data['is_published']
            ? ($data['published_at'] ?? now())
            : ($data['published_at'] ?? null);

        return $data;
    }
}
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\TestCategory;
use App\Models\TestItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class TestMenuController extends Controller
{
    public function categoryIndex(Request $request): Response
    {
        return Inertia::render('Admin/TestMenu/Categories', [
            'services' => Service::orderBy('order')->get(),
            'categories' => TestCategory::with('service')
                ->withCount('tests')
                ->when($request->integer('service'), fn ($q, $id) => $q->where('service_id', $id))
                ->orderBy('service_id')
                ->orderBy('order')
                ->get(),
            'activeService' => $request->integer('service') ?: null,
        ]);
    }

    public function categoryStore(Request $request, Service $service): RedirectResponse
    {
        $data = $request->validate([
            'name_id' => ['required', 'string', 'max:255'],
            'name_en' => ['required', 'string', 'max:255'],
            'order' => ['nullable', 'integer'],
        ]);

        TestCategory::create($data + [
            'service_id' => $service->id,
            'slug' => Str::slug($data['name_id']).'-'.Str::random(4),
        ]);

        return back()->with('success', 'Kategori ditambahkan.');
    }

    public function categoryUpdate(Request $request, TestCategory $category): RedirectResponse
    {
        $category->update($request->validate([
            'name_id' => ['required', 'string', 'max:255'],
            'name_en' => ['required', 'string', 'max:255'],
            'order' => ['nullable', 'integer'],
        ]));

        return back()->with('success', 'Kategori diperbarui.');
    }

    public function categoryDestroy(TestCategory $category): RedirectResponse
    {
        $category->tests()->delete();
        $category->delete();

        return back()->with('success', 'Kategori dihapus.');
    }

    public function itemIndex(Request $request): Response
    {
        return Inertia::render('Admin/TestMenu/Items', [
            'categories' => TestCategory::with('service')->orderBy('service_id')->orderBy('order')->get(),
            'items' => TestItem::with('category.service')
                ->when($request->integer('category'), fn ($q, $id) => $q->where('category_id', $id))
                ->orderBy('category_id')
                ->orderBy('order')
                ->get(),
            'activeCategory' => $request->integer('category') ?: null,
        ]);
    }

    public function itemStore(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'category_id' => ['required', 'exists:test_categories,id'],
            'name_id' => ['required', 'string', 'max:255'],
            'name_en' => ['nullable', 'string', 'max:255'],
            'standards' => ['nullable', 'string', 'max:1000'],
            'description_id' => ['nullable', 'string', 'max:2000'],
            'description_en' => ['nullable', 'string', 'max:2000'],
            'order' => ['nullable', 'integer'],
        ]);

        $data['standards'] = $this->parseStandards($data['standards'] ?? '');

        TestItem::create($data + [
            'slug' => Str::slug($data['name_id']).'-'.Str::random(4),
        ]);

        return back()->with('success', 'Metode uji ditambahkan.');
    }

    public function itemUpdate(Request $request, TestItem $item): RedirectResponse
    {
        $data = $request->validate([
            'name_id' => ['required', 'string', 'max:255'],
            'name_en' => ['nullable', 'string', 'max:255'],
            'standards' => ['nullable', 'string', 'max:1000'],
            'description_id' => ['nullable', 'string', 'max:2000'],
            'description_en' => ['nullable', 'string', 'max:2000'],
            'order' => ['nullable', 'integer'],
        ]);

        $data['standards'] = $this->parseStandards($data['standards'] ?? '');

        $item->update($data);

        return back()->with('success', 'Metode uji diperbarui.');
    }

    public function itemDestroy(TestItem $item): RedirectResponse
    {
        $item->delete();

        return back()->with('success', 'Metode uji dihapus.');
    }

    private function parseStandards(string $raw): array
    {
        return collect(preg_split('/[\n,]+/', $raw))
            ->map(fn ($s) => trim($s))
            ->filter()
            ->values()
            ->all();
    }
}
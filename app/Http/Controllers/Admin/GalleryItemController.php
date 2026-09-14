<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GalleryItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class GalleryItemController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Gallery/Index', [
            'items' => GalleryItem::orderBy('order')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:80'],
            'aspect' => ['nullable', 'string', 'max:10'],
            'order' => ['nullable', 'integer'],
            'is_published' => ['nullable', 'boolean'],
            'media' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
        ]);

        if ($request->hasFile('media')) {
            $data['media'] = $request->file('media')->store('gallery', 'public');
        }

        GalleryItem::create($data + ['is_published' => $request->boolean('is_published')]);

        return back()->with('success', 'Item galeri ditambahkan.');
    }

    public function update(Request $request, GalleryItem $galleryItem): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:80'],
            'aspect' => ['nullable', 'string', 'max:10'],
            'order' => ['nullable', 'integer'],
            'is_published' => ['nullable', 'boolean'],
            'media' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
        ]);

        if ($request->hasFile('media')) {
            if ($galleryItem->media) {
                Storage::disk('public')->delete($galleryItem->media);
            }
            $data['media'] = $request->file('media')->store('gallery', 'public');
        }

        $data['is_published'] = $request->boolean('is_published');
        $galleryItem->update($data);

        return back()->with('success', 'Item galeri diperbarui.');
    }

    public function destroy(GalleryItem $galleryItem): RedirectResponse
    {
        if ($galleryItem->media) {
            Storage::disk('public')->delete($galleryItem->media);
        }
        $galleryItem->delete();

        return back()->with('success', 'Item galeri dihapus.');
    }
}
<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\GalleryItem;
use App\Models\Insight;
use App\Models\Project;
use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('Home', [
            'services' => $this->serviceCards(),
            'menu' => $this->testMenu(),
            'clients' => Client::published()->orderBy('order')->get(['id', 'name', 'logo', 'website']),
            'insights' => Insight::published()
                ->latest('published_at')
                ->limit(3)
                ->get(['slug', 'title_id', 'title_en', 'excerpt_id', 'excerpt_en', 'cover', 'published_at', 'type']),
        ]);
    }

    public function about(): Response
    {
        return Inertia::render('About', [
            'services' => $this->serviceCards(),
        ]);
    }

    public function services(): Response
    {
        return Inertia::render('Services/Index', [
            'services' => $this->serviceCards(),
        ]);
    }

    public function serviceDetail(string $slug): Response
    {
        $service = Service::where('slug', $slug)
            ->where('is_active', true)
            ->with(['testCategories.tests'])
            ->firstOrFail();

        return Inertia::render('Services/Show', [
            'service' => $service,
            'related' => $this->serviceCards()->where('slug', '!==', $service->slug)->values(),
        ]);
    }

    public function clients(): Response
    {
        return Inertia::render('Clients', [
            'services' => $this->serviceCards(),
            'clients' => Client::published()->orderBy('order')->get(['id', 'name', 'logo', 'website']),
            'projects' => Project::published()
                ->orderByDesc('is_featured')
                ->orderByDesc('year')
                ->get([
                    'id', 'name_id', 'name_en', 'slug', 'category', 'location_id', 'location_en',
                    'year', 'client_name', 'summary_id', 'summary_en', 'highlights', 'cover', 'is_featured',
                ])
                ->map(fn (Project $p) => [
                    ...$p->only([
                        'id', 'name_id', 'name_en', 'slug', 'category', 'location_id', 'location_en',
                        'year', 'client_name', 'summary_id', 'summary_en', 'highlights', 'is_featured',
                    ]),
                    'cover_url' => $p->cover_url,
                ]),
        ]);
    }

    public function insights(): Response
    {
        return Inertia::render('Insights/Index', [
            'insights' => Insight::published()->latest('published_at')->get(),
        ]);
    }

    public function insightDetail(string $slug): Response
    {
        $post = Insight::where('slug', $slug)
            ->published()
            ->firstOrFail();

        return Inertia::render('Insights/Show', [
            'post' => $post,
            'related' => Insight::published()
                ->where('id', '!=', $post->id)
                ->latest('published_at')
                ->limit(3)
                ->get(['slug', 'title_id', 'title_en', 'published_at', 'type']),
        ]);
    }

    public function gallery(): Response
    {
        return Inertia::render('Gallery', [
            'services' => $this->serviceCards(),
            'items' => GalleryItem::published()->orderBy('order')->get(),
        ]);
    }

    public function contact(): Response
    {
        return Inertia::render('Contact', [
            'services' => $this->serviceCards(),
        ]);
    }

    private function serviceCards(): \Illuminate\Support\Collection
    {
        return Service::where('is_active', true)
            ->orderBy('order')
            ->get(['id', 'name_id', 'name_en', 'slug', 'icon', 'short_id', 'short_en', 'standards', 'cover'])
            ->map(function (Service $service) {
                return [
                    'id' => $service->id,
                    'name_id' => $service->name_id,
                    'name_en' => $service->name_en,
                    'slug' => $service->slug,
                    'icon' => $service->icon,
                    'short_id' => $service->short_id,
                    'short_en' => $service->short_en,
                    'standards' => $service->standards,
                    'cover_url' => $service->cover ? asset('storage/'.$service->cover) : null,
                ];
            });
    }

    private function testMenu(): array
    {
        return Service::where('is_active', true)
            ->orderBy('order')
            ->with(['testCategories' => fn ($q) => $q->with('tests')])
            ->get()
            ->map(fn (Service $service) => [
                'service_id' => $service->name_id,
                'service_en' => $service->name_en,
                'slug' => $service->slug,
                'categories' => $service->testCategories->map(fn ($cat) => [
                    'name_id' => $cat->name_id,
                    'name_en' => $cat->name_en,
                    'tests' => $cat->tests->map(fn ($test) => [
                        'slug' => $test->slug,
                        'name_id' => $test->name_id,
                        'name_en' => $test->name_en,
                        'standards' => $test->standards ?? [],
                    ]),
                ]),
            ])
            ->all();
    }
}
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Enquiry;
use App\Models\GalleryItem;
use App\Models\Insight;
use App\Models\Project;
use App\Models\Service;
use App\Models\TestCategory;
use App\Models\TestItem;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $days = collect(range(13, 0))->map(fn ($i) => now()->subDays($i)->startOfDay());
        $counts = Enquiry::where('created_at', '>=', now()->subDays(13)->startOfDay())
            ->selectRaw('date(created_at) as d, count(*) as c')
            ->groupBy('d')
            ->pluck('c', 'd');

        $trend = $days->map(fn ($d) => [
            'label' => $d->translatedFormat('d M'),
            'count' => (int) ($counts[$d->format('Y-m-d')] ?? 0),
        ])->values();

        $byStatus = collect(['new' => 'Baru', 'contacted' => 'Dihubungi', 'closed' => 'Selesai'])
            ->map(fn ($label, $status) => [
                'status' => $status,
                'label' => $label,
                'count' => Enquiry::where('status', $status)->count(),
            ])
            ->values();

        $testsPerService = Service::orderBy('order')
            ->with(['testCategories' => fn ($q) => $q->withCount('tests')])
            ->get(['id', 'name_id'])
            ->map(fn ($s) => [
                'name' => $s->name_id,
                'categories' => $s->testCategories->count(),
                'tests' => $s->testCategories->sum('tests_count'),
            ])
            ->values();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'services' => Service::count(),
                'tests' => TestItem::count(),
                'insights' => Insight::count(),
                'enquiries' => Enquiry::count(),
                'new_enquiries' => Enquiry::where('status', 'new')->count(),
            ],
            'weekEnquiries' => Enquiry::where('created_at', '>=', now()->subDays(7))->count(),
            'categoriesCount' => TestCategory::count(),
            'trend' => $trend,
            'byStatus' => $byStatus,
            'testsPerService' => $testsPerService,
            'content' => [
                'clients' => Client::count(),
                'projects' => Project::count(),
                'gallery' => GalleryItem::count(),
                'insights_published' => Insight::where('is_published', true)->count(),
                'insights_draft' => Insight::where('is_published', false)->count(),
            ],
            'recentEnquiries' => Enquiry::with('service:id,name_id')
                ->latest()
                ->limit(8)
                ->get(),
        ]);
    }
}

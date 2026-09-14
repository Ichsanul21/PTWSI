<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\ClientController;
use App\Http\Controllers\Admin\EnquiryController as AdminEnquiryController;
use App\Http\Controllers\Admin\GalleryItemController;
use App\Http\Controllers\Admin\InsightController as AdminInsightController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\ServiceController as AdminServiceController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\TestMenuController;
use App\Http\Controllers\EnquiryController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\RobotsController;
use App\Http\Controllers\SitemapController;
use Illuminate\Support\Facades\Route;

Route::get('/sitemap.xml', SitemapController::class)->name('sitemap');
Route::get('/robots.txt', RobotsController::class)->name('robots');

foreach (['id' => null, 'en' => 'en'] as $locale => $prefix) {
    $name = $locale === 'en' ? 'en.' : '';

    Route::prefix($prefix)->group(function () use ($name) {
        Route::get('/', [PageController::class, 'home'])->name("{$name}home");
        Route::get('/tentang', [PageController::class, 'about'])->name("{$name}about");
        Route::get('/layanan', [PageController::class, 'services'])->name("{$name}services");
        Route::get('/layanan/{slug}', [PageController::class, 'serviceDetail'])->name("{$name}services.show");
        Route::get('/klien', [PageController::class, 'clients'])->name("{$name}clients");
        Route::get('/insight', [PageController::class, 'insights'])->name("{$name}insights");
        Route::get('/insight/{slug}', [PageController::class, 'insightDetail'])->name("{$name}insights.show");
        Route::get('/galeri', [PageController::class, 'gallery'])->name("{$name}gallery");
        Route::get('/kontak', [PageController::class, 'contact'])->name("{$name}contact");
        Route::post('/kontak', [EnquiryController::class, 'store'])->middleware('throttle:5,10')->name("{$name}contact.submit");
    });
}

Route::middleware('guest')->group(function () {
    Route::get('/admin/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/admin/login', [AuthController::class, 'login']);
});

Route::middleware('auth')->prefix('admin')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('admin.logout');

    Route::get('/', [DashboardController::class, 'index'])->name('admin.dashboard');

    Route::get('/services', [AdminServiceController::class, 'index'])->name('admin.services.index');
    Route::get('/services/create', [AdminServiceController::class, 'create'])->name('admin.services.create');
    Route::post('/services', [AdminServiceController::class, 'store'])->name('admin.services.store');
    Route::get('/services/{service}/edit', [AdminServiceController::class, 'edit'])->name('admin.services.edit');
    Route::put('/services/{service}', [AdminServiceController::class, 'update'])->name('admin.services.update');
    Route::delete('/services/{service}', [AdminServiceController::class, 'destroy'])->name('admin.services.destroy');

    Route::get('/test-categories', [TestMenuController::class, 'categoryIndex'])->name('admin.categories.index');
    Route::post('/test-categories/{service}', [TestMenuController::class, 'categoryStore'])->name('admin.categories.store');
    Route::put('/test-categories/{category}', [TestMenuController::class, 'categoryUpdate'])->name('admin.categories.update');
    Route::delete('/test-categories/{category}', [TestMenuController::class, 'categoryDestroy'])->name('admin.categories.destroy');

    Route::get('/test-items', [TestMenuController::class, 'itemIndex'])->name('admin.items.index');
    Route::post('/test-items', [TestMenuController::class, 'itemStore'])->name('admin.items.store');
    Route::put('/test-items/{item}', [TestMenuController::class, 'itemUpdate'])->name('admin.items.update');
    Route::delete('/test-items/{item}', [TestMenuController::class, 'itemDestroy'])->name('admin.items.destroy');

    Route::get('/insights', [AdminInsightController::class, 'index'])->name('admin.insights.index');
    Route::get('/insights/create', [AdminInsightController::class, 'create'])->name('admin.insights.create');
    Route::post('/insights', [AdminInsightController::class, 'store'])->name('admin.insights.store');
    Route::get('/insights/{insight}/edit', [AdminInsightController::class, 'edit'])->name('admin.insights.edit');
    Route::put('/insights/{insight}', [AdminInsightController::class, 'update'])->name('admin.insights.update');
    Route::delete('/insights/{insight}', [AdminInsightController::class, 'destroy'])->name('admin.insights.destroy');

    Route::get('/enquiries', [AdminEnquiryController::class, 'index'])->name('admin.enquiries.index');
    Route::put('/enquiries/{enquiry}', [AdminEnquiryController::class, 'updateStatus'])->name('admin.enquiries.update');

    Route::get('/settings', [SettingController::class, 'edit'])->name('admin.settings.edit');
    Route::put('/settings', [SettingController::class, 'update'])->name('admin.settings.update');

    Route::get('/clients', [ClientController::class, 'index'])->name('admin.clients.index');
    Route::post('/clients', [ClientController::class, 'store'])->name('admin.clients.store');
    Route::put('/clients/{client}', [ClientController::class, 'update'])->name('admin.clients.update');
    Route::delete('/clients/{client}', [ClientController::class, 'destroy'])->name('admin.clients.destroy');

    Route::get('/gallery', [GalleryItemController::class, 'index'])->name('admin.gallery.index');
    Route::post('/gallery', [GalleryItemController::class, 'store'])->name('admin.gallery.store');
    Route::put('/gallery/{galleryItem}', [GalleryItemController::class, 'update'])->name('admin.gallery.update');
    Route::delete('/gallery/{galleryItem}', [GalleryItemController::class, 'destroy'])->name('admin.gallery.destroy');

    Route::get('/projects', [ProjectController::class, 'index'])->name('admin.projects.index');
    Route::get('/projects/create', [ProjectController::class, 'create'])->name('admin.projects.create');
    Route::post('/projects', [ProjectController::class, 'store'])->name('admin.projects.store');
    Route::get('/projects/{project}/edit', [ProjectController::class, 'edit'])->name('admin.projects.edit');
    Route::put('/projects/{project}', [ProjectController::class, 'update'])->name('admin.projects.update');
    Route::delete('/projects/{project}', [ProjectController::class, 'destroy'])->name('admin.projects.destroy');
});
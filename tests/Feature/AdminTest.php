<?php

namespace Tests\Feature;

use App\Models\Service;
use App\Models\TestCategory;
use App\Models\TestItem;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;

    protected function setUp(): void
    {
        parent::setUp();
        $this->admin = User::factory()->create();
    }

    public function test_guest_is_redirected_from_admin(): void
    {
        $this->get('/admin')->assertRedirect('/admin/login');
    }

    public function test_admin_dashboard_shows_analytics(): void
    {
        \App\Models\Enquiry::create([
            'name' => 'Tes Analitik',
            'email' => 'tes@mail.com',
            'phone' => '081234',
            'message' => 'test',
            'status' => 'new',
            'locale' => 'id',
        ]);

        $response = $this->actingAs($this->admin)->get('/admin');

        $response->assertOk();
        $response->assertSee('Ringkasan aktivitas', false);
        $response->assertSee('Tren Enquiry Masuk', false);
        $response->assertSee('Status Enquiry', false);
        $response->assertSee('Metode per Layanan', false);
        $response->assertSee('Ketersediaan Konten', false);
    }

    public function test_admin_can_manage_services(): void
    {
        $this->actingAs($this->admin)
            ->post('/admin/services', [
                'name_id' => 'Divisi Test',
                'name_en' => 'Test Division',
                'slug' => '',
                'icon' => 'terrain',
                'short_id' => 'Singkat',
                'short_en' => 'Short',
                'standards' => 'SNI, ASTM',
                'description_id' => 'Deskripsi',
                'description_en' => 'Description',
                'order' => 9,
                'is_active' => true,
            ])
            ->assertRedirect('/admin/services');

        $service = Service::where('name_id', 'Divisi Test')->first();

        $this->assertNotNull($service);
        $this->assertSame('divisi-test', $service->slug);

        $this->actingAs($this->admin)
            ->put("/admin/services/{$service->id}", [
                'name_id' => 'Divisi Test 2',
                'name_en' => 'Test Division 2',
                'slug' => 'divisi-test-2',
                'icon' => 'terrain',
                'short_id' => 'x',
                'short_en' => 'x',
                'order' => 9,
            ])
            ->assertRedirect('/admin/services');

        $this->assertDatabaseHas('services', ['name_id' => 'Divisi Test 2']);

        $this->actingAs($this->admin)->delete("/admin/services/{$service->id}");
        $this->assertDatabaseMissing('services', ['id' => $service->id]);
    }

    public function test_admin_can_manage_test_categories_and_items(): void
    {
        $service = Service::create([
            'name_id' => 'SV',
            'name_en' => 'SV',
            'slug' => 'sv',
        ]);

        $this->actingAs($this->admin)
            ->post("/admin/test-categories/{$service->id}", [
                'name_id' => 'Kategori A',
                'name_en' => 'Category A',
                'order' => 1,
            ])
            ->assertSessionHasNoErrors();

        $category = TestCategory::where('name_id', 'Kategori A')->first();
        $this->assertNotNull($category);

        $this->actingAs($this->admin)
            ->post('/admin/test-items', [
                'category_id' => $category->id,
                'name_id' => 'Triaxial UU Test',
                'name_en' => 'Triaxial UU Test',
                'standards' => "ASTM D 2850\nSNI 03-3387",
                'order' => 1,
            ])
            ->assertSessionHasNoErrors();

        $item = TestItem::where('category_id', $category->id)->first();
        $this->assertNotNull($item);
        $this->assertSame(['ASTM D 2850', 'SNI 03-3387'], $item->standards);
    }

    public function test_enquiry_form_saves_to_db(): void
    {
        $this->from('/kontak')->post('/kontak', [
            'name' => 'Budi',
            'company' => 'PT Tambang',
            'email' => 'budi@mail.com',
            'phone' => '081234',
            'service_id' => null,
            'message' => 'Perlu uji triaxial',
        ])->assertRedirect('/kontak');

        $this->assertDatabaseHas('enquiries', ['email' => 'budi@mail.com', 'status' => 'new']);
    }

    public function test_enquiry_status_can_be_updated_by_admin(): void
    {
        $enquiry = \App\Models\Enquiry::create([
            'name' => 'Budi',
            'email' => 'budi@mail.com',
            'phone' => '081234',
            'message' => 'test',
            'status' => 'new',
            'locale' => 'id',
        ]);

        $this->actingAs($this->admin)
            ->put("/admin/enquiries/{$enquiry->id}", ['status' => 'contacted'])
            ->assertSessionHasNoErrors();

        $this->assertDatabaseHas('enquiries', ['id' => $enquiry->id, 'status' => 'contacted']);
    }

    public function test_admin_can_manage_insights(): void
    {
        $this->actingAs($this->admin)
            ->post('/admin/insights', [
                'title_id' => 'Pentingnya Uji Triaxial',
                'title_en' => 'Why Triaxial Matters',
                'type' => 'insight',
                'category_id' => 'Geomekanika',
                'category_en' => 'Geomechanics',
                'author' => 'WSI',
                'excerpt_id' => 'Ringkasan',
                'excerpt_en' => 'Excerpt',
                'body_id' => "Paragraf satu\n\nParagraf dua",
                'body_en' => 'Body',
                'published_at' => '2026-09-13',
                'is_published' => true,
            ])
            ->assertSessionHasNoErrors();

        $post = \App\Models\Insight::where('title_id', 'Pentingnya Uji Triaxial')->first();
        $this->assertNotNull($post);
        $this->assertTrue($post->is_published);
        $this->assertArrayHasKey('slug', $post->getAttributes());

        $this->actingAs($this->admin)
            ->put("/admin/insights/{$post->id}", [
                'title_id' => 'Pentingnya Uji Triaxial 2',
                'title_en' => 'Why Triaxial Matters 2',
                'type' => 'insight',
                'category_id' => 'Geomekanika',
                'category_en' => 'Geomechanics',
                'author' => 'WSI',
                'excerpt_id' => 'x',
                'excerpt_en' => 'x',
                'body_id' => 'Body',
                'body_en' => 'Body',
                'is_published' => false,
            ])
            ->assertSessionHasNoErrors();

        $this->assertDatabaseHas('insights', ['id' => $post->id, 'title_id' => 'Pentingnya Uji Triaxial 2', 'is_published' => false]);
    }

    public function test_admin_can_update_settings(): void
    {
        $this->actingAs($this->admin)->put('/admin/settings', [
            'brand' => ['name' => 'Wall Street Indonesia', 'phones' => ['0813-4651-3256']],
            'hero' => ['title_id' => 'Hero ID', 'title_en' => 'Hero EN'],
            'about' => ['lead_id' => 'Lead', 'lead_en' => 'Lead EN'],
        ])->assertSessionHasNoErrors();

        $this->assertDatabaseHas('settings', ['key' => 'brand', 'value' => '{"name":"Wall Street Indonesia","phones":["0813-4651-3256"]}']);
    }

    public function test_admin_can_manage_clients(): void
    {
        $this->actingAs($this->admin)
            ->post('/admin/clients', [
                'name' => 'PT Klien',
                'website' => 'https://klien.com',
                'order' => 1,
                'is_published' => true,
            ])
            ->assertSessionHasNoErrors();

        $client = \App\Models\Client::where('name', 'PT Klien')->first();
        $this->assertNotNull($client);
        $this->assertTrue($client->is_published);

        $this->actingAs($this->admin)
            ->put("/admin/clients/{$client->id}", [
                'name' => 'PT Klien 2',
                'website' => 'https://klien2.com',
                'order' => 1,
            ])
            ->assertSessionHasNoErrors();

        $this->assertDatabaseHas('clients', ['id' => $client->id, 'name' => 'PT Klien 2']);
    }

    public function test_admin_can_manage_gallery_items(): void
    {
        $this->actingAs($this->admin)
            ->post('/admin/gallery', [
                'title' => 'Triaxial Setup',
                'category' => 'Lab',
                'aspect' => '16:9',
                'order' => 1,
                'is_published' => true,
            ])
            ->assertSessionHasNoErrors();

        $this->assertDatabaseHas('gallery_items', ['title' => 'Triaxial Setup', 'is_published' => true]);
    }

    public function test_admin_can_manage_projects(): void
    {
        $this->actingAs($this->admin)
            ->post('/admin/projects', [
                'name_id' => 'Proyek Pilot',
                'name_en' => 'Pilot Project',
                'slug' => '',
                'category' => 'Tambang',
                'location_id' => 'Samarinda',
                'year' => '2026',
                'client_id' => null,
                'client_name' => 'PT Pilot',
                'summary_id' => 'Deskripsi',
                'summary_en' => 'Description',
                'highlights' => "Satu\nDua",
                'is_featured' => true,
                'is_published' => true,
            ])
            ->assertSessionHasNoErrors();

        $project = \App\Models\Project::where('slug', 'like', 'proyek-pilot%')->first();
        $this->assertNotNull($project);
        $this->assertEquals(['Satu', 'Dua'], $project->highlights);
        $this->assertTrue($project->is_featured);
    }

    public function test_public_clients_page_loads_with_dynamic_data(): void
    {
        \App\Models\Client::create(['name' => 'PT A', 'is_published' => true]);

        $this->get('/klien')->assertOk()->assertInertia(fn (\Inertia\Testing\AssertableInertia $page) => $page->component('Clients'));
        $this->get('/en/klien')->assertOk()->assertInertia(fn (\Inertia\Testing\AssertableInertia $page) => $page->component('Clients'));
    }

    public function test_public_gallery_page_loads(): void
    {
        \App\Models\GalleryItem::create(['title' => 'Lab Shot', 'is_published' => true]);

        $this->get('/galeri')->assertOk()->assertInertia(fn (\Inertia\Testing\AssertableInertia $page) => $page->component('Gallery'));
    }
}
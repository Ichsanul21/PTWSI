<?php

namespace Database\Seeders;

use App\Models\GalleryItem;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class GallerySeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            ['file' => 'tunnel.jpg', 'title' => 'Pekerjaan terowongan', 'category' => 'Lapangan', 'aspect' => '16:9', 'order' => 1],
            ['file' => 'lab-soil.jpg', 'title' => 'Uji tanah di laboratorium', 'category' => 'Laboratorium', 'aspect' => '4:3', 'order' => 2],
            ['file' => 'haul-truck.jpg', 'title' => 'Armada tambang', 'category' => 'Lapangan', 'aspect' => '4:3', 'order' => 3],
            ['file' => 'excavator.jpg', 'title' => 'Ekskavator di PIT', 'category' => 'Lapangan', 'aspect' => '1:1', 'order' => 4],
            ['file' => 'water-lab.jpg', 'title' => 'Analisis kualitas air', 'category' => 'Laboratorium', 'aspect' => '4:3', 'order' => 5],
            ['file' => 'rock-core.jpg', 'title' => 'Sampel inti batuan', 'category' => 'Peralatan', 'aspect' => '3:2', 'order' => 6],
        ];

        foreach ($items as $i => $item) {
            $filename = 'gallery/g'.($i + 1).'.jpg';
            Storage::disk('public')->put($filename, file_get_contents(public_path('images/'.$item['file'])));

            GalleryItem::updateOrCreate(
                ['title' => $item['title']],
                [
                    'media' => $filename,
                    'media_type' => 'image',
                    'category' => $item['category'],
                    'aspect' => $item['aspect'],
                    'order' => $item['order'],
                    'is_published' => true,
                ]
            );
        }
    }
}

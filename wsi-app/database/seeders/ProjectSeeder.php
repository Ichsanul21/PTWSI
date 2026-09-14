<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Project;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            [
                'slug' => 'uji-tanah-timbunan-pit-c',
                'name_id' => 'Uji Tanah Timbunan PIT C',
                'name_en' => 'PIT C Embankment Soil Testing',
                'category' => 'Tambang',
                'location_id' => 'Sangatta, Kalimantan Timur',
                'location_en' => 'Sangatta, East Kalimantan',
                'year' => '2024',
                'client_name' => 'PT Borneo Mineral Persada',
                'client_by_name' => 'PT Borneo Mineral Persada',
                'summary_id' => 'Uji pemampatan, geser, dan CBR untuk desain timbunan dan jalan angkut.',
                'summary_en' => 'Compaction, shear, and CBR testing for embankment and haul-road design.',
                'highlights' => ['42 sampel tanah', 'Triaxial UU dan CU', 'Laporan 14 hari kerja'],
                'cover_file' => 'tunnel.jpg',
                'is_featured' => true,
            ],
            [
                'slug' => 'investigasi-bendungan-balikpapan',
                'name_id' => 'Investigasi Fondasi Bendungan',
                'name_en' => 'Dam Foundation Investigation',
                'category' => 'Bendungan',
                'location_id' => 'Balikpapan, Kalimantan Timur',
                'location_en' => 'Balikpapan, East Kalimantan',
                'year' => '2023',
                'client_name' => 'PT IKN Infrastruktur Pratama',
                'client_by_name' => 'PT IKN Infrastruktur Pratama',
                'summary_id' => 'Uji konsolidasi dan permeabilitas untuk analisis rembesan dan penurunan.',
                'summary_en' => 'Consolidation and permeability testing for seepage and settlement analysis.',
                'highlights' => ['Uji konsolidasi 12 titik', 'Permeabilitas falling head', 'Rekomendasi grouting'],
                'cover_file' => 'dam-boundary.jpg',
                'is_featured' => true,
            ],
            [
                'slug' => 'uji-cbr-jalan-akses-ikn',
                'name_id' => 'Uji CBR Jalan Akses IKN',
                'name_en' => 'IKN Access Road CBR Testing',
                'category' => 'Infrastruktur',
                'location_id' => 'IKN, Kalimantan Timur',
                'location_en' => 'IKN, East Kalimantan',
                'year' => '2025',
                'client_name' => 'PT Kutai Konstruksi Mandiri',
                'client_by_name' => 'PT Kutai Konstruksi Mandiri',
                'summary_id' => 'Uji CBR lapangan dan laboratorium untuk desain perkerasan jalan.',
                'summary_en' => 'Field and laboratory CBR testing for pavement design.',
                'highlights' => ['CBR 28 titik', 'Kompaksi modified', 'Sesuai spesifikasi Bina Marga'],
                'cover_file' => 'highway.jpg',
                'is_featured' => false,
            ],
            [
                'slug' => 'kajian-air-asam-tambang',
                'name_id' => 'Kajian Air Asam Tambang',
                'name_en' => 'Acid Mine Drainage Study',
                'category' => 'Lingkungan',
                'location_id' => 'Sangatta, Kalimantan Timur',
                'location_en' => 'Sangatta, East Kalimantan',
                'year' => '2023',
                'client_name' => 'PT Mahakam Coalindo',
                'client_by_name' => 'PT Mahakam Coalindo',
                'summary_id' => 'Uji ABA dan kualitas air untuk rencana pengelolaan air tambang.',
                'summary_en' => 'ABA and water quality testing for mine water management planning.',
                'highlights' => ['ABA 36 sampel', 'pH dan logam terlarut', 'Neraca air asam'],
                'cover_file' => 'coal-aerial.jpg',
                'is_featured' => false,
            ],
            [
                'slug' => 'uji-fondasi-jembatan-mahakam',
                'name_id' => 'Uji Fondasi Jembatan Mahakam',
                'name_en' => 'Mahakam Bridge Foundation Testing',
                'category' => 'Infrastruktur',
                'location_id' => 'Samarinda, Kalimantan Timur',
                'location_en' => 'Samarinda, East Kalimantan',
                'year' => '2022',
                'client_name' => 'PT Berau Sumber Daya',
                'client_by_name' => 'PT Berau Sumber Daya',
                'summary_id' => 'Uji kuat tekan batuan dan geser tanah untuk fondasi jembatan.',
                'summary_en' => 'Rock compressive and soil shear testing for bridge foundations.',
                'highlights' => ['UCS 24 sampel inti', 'Direct shear', 'Parameter desain fondasi'],
                'cover_file' => 'metro-crane.jpg',
                'is_featured' => false,
            ],
        ];

        foreach ($projects as $i => $data) {
            $filename = 'projects/p'.($i + 1).'.jpg';
            Storage::disk('public')->put($filename, file_get_contents(public_path('images/'.$data['cover_file'])));

            $clientId = Client::where('name', $data['client_by_name'])->first()?->id;
            unset($data['cover_file'], $data['client_by_name']);

            Project::updateOrCreate(
                ['slug' => $data['slug']],
                $data + ['cover' => $filename, 'client_id' => $clientId, 'is_published' => true]
            );
        }
    }
}

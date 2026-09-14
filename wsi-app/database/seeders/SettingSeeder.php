<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Setting;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            'brand' => [
                'name' => 'PT Wall Street Indonesia',
                'short_name' => 'Wall Street Indonesia',
                'tagline_id' => 'Laboratorium Pengujian Tanah, Batuan & Lingkungan',
                'tagline_en' => 'Soil, Rock & Environmental Testing Laboratory',
                'phone_wa' => '6281346513256',
                'email' => 'wallstreet.office@gmail.com',
                'phones' => ['0813-4651-3256', '0822-5255-8768'],
                'address_id' => 'Jl. Kadrie Oening, Perum Pandan Harum Hill, Air Hitam, Samarinda Ulu, Samarinda, Kalimantan Timur 75243',
                'address_en' => 'Jl. Kadrie Oening, Pandan Harum Hill Residence, Air Hitam, Samarinda Ulu, Samarinda, East Kalimantan 75243',
                'working_hours' => 'Senin – Sabtu, 08.00 – 17.00 WITA',
            ],
            'hero' => [
                'title_id' => 'Hasil Uji Presisi untuk Tambang, Bendungan, dan Infrastruktur',
                'title_en' => 'Precision Test Results for Mines, Dams, and Infrastructure',
                'subtitle_id' => 'Laboratorium geomekanika, hidrogeologi, dan lingkungan di Samarinda. Melayani pengujian tanah, batuan, dan air untuk industri pertambangan dan infrastruktur sejak 2022.',
                'subtitle_en' => 'A geomechanics, hydrogeology, and environmental laboratory in Samarinda. Serving soil, rock, and water testing for the mining and infrastructure industries since 2022.',
                'cta_primary_id' => 'Minta Penawaran',
                'cta_primary_en' => 'Request a Quote',
                'cta_secondary_id' => 'Lihat Layanan',
                'cta_secondary_en' => 'Explore Services',
            ],
            'stats' => [
                ['value' => 'SNI', 'suffix' => '', 'label_id' => 'Standar Nasional & Internasional', 'label_en' => 'National & International Standards'],
                ['value' => '60+', 'suffix' => '', 'label_id' => 'Metode Pengujian', 'label_en' => 'Test Methods'],
                ['value' => '24', 'suffix' => ' jam', 'label_id' => 'Respons Penawaran', 'label_en' => 'Quote Response'],
            ],
            'about' => [
                'lead_id' => 'Laboratorium spesialis geomekanika, hidrogeologi, dan lingkungan dengan peralatan berstandar internasional di jantung Kalimantan Timur.',
                'lead_en' => 'A specialist laboratory for geomechanics, hydrogeology, and the environment, running international-standard equipment in the heart of East Kalimantan.',
                'body_id' => 'PT Wall Street Indonesia berdiri sejak 2022 untuk menjawab kebutuhan industri tambang dan infrastruktur di Kalimantan akan pengujian tanah, batuan, dan air yang cepat, akurat, dan terjangkau. Dari Samarinda, kami memangkas biaya dan waktu logistik sampel bagi klien di Kalimantan Timur, Kalimantan Selatan, dan IKN.',
                'body_en' => 'PT Wall Street Indonesia has operated since 2022 to serve the Kalimantan mining and infrastructure industry with fast, accurate, and affordable soil, rock, and water testing. From Samarinda, we cut sample-logistics cost and time for clients across East Kalimantan, South Kalimantan, and IKN.',
            ],
            'seo' => [
                'description_id' => 'Laboratorium geomekanika, hidrogeologi, dan lingkungan di Samarinda, Kalimantan Timur. Pengujian tanah, batuan, dan air berstandar SNI, ASTM, AASHTO, JIS, dan ISRM untuk pertambangan dan infrastruktur.',
                'description_en' => 'A geomechanics, hydrogeology, and environmental laboratory in Samarinda, East Kalimantan. SNI, ASTM, AASHTO, JIS, and ISRM soil, rock, and water testing for mining and infrastructure.',
                'lat' => '-0.5071',
                'lng' => '117.1529',
            ],
        ];

        foreach ($settings as $key => $value) {
            Setting::updateOrCreate(
                ['key' => $key],
                ['value' => $value, 'group' => $key]
            );
        }
    }
}
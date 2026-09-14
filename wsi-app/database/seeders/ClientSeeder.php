<?php

namespace Database\Seeders;

use App\Models\Client;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    public function run(): void
    {
        $clients = [
            ['name' => 'PT Borneo Mineral Persada', 'order' => 1],
            ['name' => 'PT Kaltim Energi Nusantara', 'order' => 2],
            ['name' => 'PT Mahakam Coalindo', 'order' => 3],
            ['name' => 'PT IKN Infrastruktur Pratama', 'order' => 4],
            ['name' => 'PT Berau Sumber Daya', 'order' => 5],
            ['name' => 'PT Kutai Konstruksi Mandiri', 'order' => 6],
        ];

        foreach ($clients as $data) {
            Client::updateOrCreate(
                ['name' => $data['name']],
                $data + ['is_published' => true]
            );
        }
    }
}

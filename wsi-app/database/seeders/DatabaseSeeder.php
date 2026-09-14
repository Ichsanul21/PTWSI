<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            SettingSeeder::class,
            ServiceSeeder::class,
            ClientSeeder::class,
            ProjectSeeder::class,
            GallerySeeder::class,
            InsightSeeder::class,
        ]);

        User::updateOrCreate(
            ['email' => 'admin@wallstreetindonesia.com'],
            [
                'name' => 'Administrator',
                'password' => bcrypt('password'),
            ]
        );
    }
}
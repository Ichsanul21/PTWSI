<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;
use App\Models\TestCategory;
use App\Models\TestItem;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'name_id' => 'Geomekanika & Mekanika Tanah',
                'name_en' => 'Geomechanics & Soil Mechanics',
                'slug' => 'geomekanika',
                'icon' => 'terrain',
                'short_id' => 'Uji kekuatan, pemampatan, dan kompaksi tanah untuk desain lereng tambang, bendungan, jalan, dan fondasi.',
                'short_en' => 'Soil strength, settlement, and compaction testing for mine slopes, dams, roads, and foundations.',
                'description_id' => 'Divisi Geomekanika menguji sifat fisik dan mekanik tanah, dari index properties hingga kuat geser triaxial, konsolidasi, dan CBR. Hasilnya menjadi dasar desain yang aman untuk lereng, timbunan, fondasi, dan perkerasan jalan.',
                'description_en' => 'The Geomechanics division tests the physical and mechanical properties of soil, from index properties to triaxial shear strength, consolidation, and CBR. Results form the basis for safe design of slopes, embankments, foundations, and pavements.',
                'standards' => 'SNI, ASTM, AASHTO, ISRM',
                'order' => 1,
                'categories' => [
                    [
                        'name_id' => 'Uji Kekuatan Tanah',
                        'name_en' => 'Soil Strength Tests',
                        'slug' => 'kekuatan-tanah',
                        'order' => 1,
                        'tests' => [
                            ['name_id' => 'Triaxial UU', 'name_en' => 'Triaxial UU', 'slug' => 'triaxial-uu', 'standards' => ['ASTM D 2850', 'SNI 03-3387']],
                            ['name_id' => 'Triaxial CU', 'name_en' => 'Triaxial CU', 'slug' => 'triaxial-cu', 'standards' => ['ASTM D 4767']],
                            ['name_id' => 'Triaxial CD', 'name_en' => 'Triaxial CD', 'slug' => 'triaxial-cd', 'standards' => ['ASTM D 7181']],
                            ['name_id' => 'Unconfined Compression (UCS) Tanah', 'name_en' => 'Unconfined Compression (UCS) Soil', 'slug' => 'ucs-tanah', 'standards' => ['ASTM D 2166', 'SNI 03-6887']],
                            ['name_id' => 'Direct Shear', 'name_en' => 'Direct Shear', 'slug' => 'direct-shear', 'standards' => ['ASTM D 3080']],
                            ['name_id' => 'Large Scale Direct Shear', 'name_en' => 'Large Scale Direct Shear', 'slug' => 'large-scale-direct-shear', 'standards' => ['ASTM D 3080', 'SNI 03-3422']],
                            ['name_id' => 'Pinhole (Dispersivitas)', 'name_en' => 'Pinhole (Dispersibility)', 'slug' => 'pinhole', 'standards' => ['ASTM D 4647']],
                            ['name_id' => 'CBR', 'name_en' => 'CBR', 'slug' => 'cbr', 'standards' => ['ASTM D 1883', 'AASHTO T 193', 'SNI 1744']],
                        ],
                    ],
                    [
                        'name_id' => 'Konsolidasi & Pemampatan',
                        'name_en' => 'Consolidation & Settlement',
                        'slug' => 'konsolidasi',
                        'order' => 2,
                        'tests' => [
                            ['name_id' => 'One-Dimensional Consolidation (Oedometer)', 'name_en' => 'One-Dimensional Consolidation (Oedometer)', 'slug' => 'konsolidasi', 'standards' => ['ASTM D 2435']],
                            ['name_id' => 'Swelling Pressure', 'name_en' => 'Swelling Pressure', 'slug' => 'swelling-pressure', 'standards' => ['ASTM D 4546']],
                            ['name_id' => 'Swelling Index / Free Swell', 'name_en' => 'Swelling Index / Free Swell', 'slug' => 'free-swell', 'standards' => ['ASTM D 4546']],
                        ],
                    ],
                    [
                        'name_id' => 'Kompaksi & Sifat Indeks',
                        'name_en' => 'Compaction & Index Properties',
                        'slug' => 'kompaksi-index',
                        'order' => 3,
                        'tests' => [
                            ['name_id' => 'Compaction Standar / Modified', 'name_en' => 'Standard / Modified Compaction', 'slug' => 'compaction', 'standards' => ['ASTM D 698', 'ASTM D 1557', 'AASHTO T 99 / T 180', 'SNI 1742/1743']],
                            ['name_id' => 'Atterberg Limits', 'name_en' => 'Atterberg Limits', 'slug' => 'atterberg', 'standards' => ['ASTM D 4318']],
                            ['name_id' => 'Sieve Analysis', 'name_en' => 'Sieve Analysis', 'slug' => 'sieve-analysis', 'standards' => ['ASTM D 6913', 'SNI 03-1968']],
                            ['name_id' => 'Hydrometer Analysis', 'name_en' => 'Hydrometer Analysis', 'slug' => 'hydrometer', 'standards' => ['ASTM D 7928', 'SNI 3423']],
                            ['name_id' => 'Specific Gravity', 'name_en' => 'Specific Gravity', 'slug' => 'specific-gravity', 'standards' => ['ASTM D 854']],
                            ['name_id' => 'Organic Content', 'name_en' => 'Organic Content', 'slug' => 'organic-content', 'standards' => ['ASTM D 2974']],
                            ['name_id' => 'Kadar Air & Density', 'name_en' => 'Moisture Content & Density', 'slug' => 'moisture-density', 'standards' => ['ASTM D 2216', 'ASTM D 2937']],
                        ],
                    ],
                ],
            ],
            [
                'name_id' => 'Mekanika Batuan & Petrofisika',
                'name_en' => 'Rock Mechanics & Petrophysics',
                'slug' => 'mekanika-batuan',
                'icon' => 'gem',
                'short_id' => 'Uji sifat fisik-mekanik batuan inti untuk tambang, lereng, dan terowongan.',
                'short_en' => 'Physical-mechanical testing of core rock for mines, slopes, and tunnels.',
                'description_id' => 'Divisi Mekanika Batuan melayani UCS, triaxial batuan, kuat tarik Brazilian, point load, dan Schmidt hammer, hingga petrografi sayatan tipis, XRD, dan XRF. Data karakterisasi massa batuan untuk analisis kestabilan lereng dan desain penggalian.',
                'description_en' => 'The Rock Mechanics division covers UCS, rock triaxial, Brazilian tensile, point load, and Schmidt hammer testing, through thin-section petrography, XRD, and XRF. Rock-mass characterization data for slope stability analysis and excavation design.',
                'standards' => 'ISRM, ASTM, SNI',
                'order' => 2,
                'categories' => [
                    [
                        'name_id' => 'Uji Fisik-Mekanik Batuan',
                        'name_en' => 'Rock Physical-Mechanical Tests',
                        'slug' => 'fisik-mekanik-batuan',
                        'order' => 1,
                        'tests' => [
                            ['name_id' => 'Uniaxial Compressive Strength (UCS)', 'name_en' => 'Uniaxial Compressive Strength (UCS)', 'slug' => 'ucs-batuan', 'standards' => ['ASTM D 7012', 'ISRM Suggested Methods', 'SNI 2825']],
                            ['name_id' => 'Rock Triaxial', 'name_en' => 'Rock Triaxial', 'slug' => 'rock-triaxial', 'standards' => ['ASTM D 7012', 'ISRM Suggested Methods']],
                            ['name_id' => 'Brazilian Tensile Strength', 'name_en' => 'Brazilian Tensile Strength', 'slug' => 'brazilian', 'standards' => ['ASTM D 3967', 'ISRM Suggested Methods']],
                            ['name_id' => 'Point Load Index (PLI)', 'name_en' => 'Point Load Index (PLI)', 'slug' => 'point-load', 'standards' => ['ISRM Suggested Methods', 'ASTM D 5731']],
                            ['name_id' => 'Schmidt Hammer / Rebound', 'name_en' => 'Schmidt Hammer / Rebound', 'slug' => 'schmidt-hammer', 'standards' => ['ISRM Suggested Methods', 'ASTM C 805']],
                            ['name_id' => 'Density, Porositas & Absorpsi Batuan', 'name_en' => 'Rock Density, Porosity & Absorption', 'slug' => 'rock-density', 'standards' => ['ASTM D 4535', 'ISRM Suggested Methods']],
                            ['name_id' => 'Slake Durability', 'name_en' => 'Slake Durability', 'slug' => 'slake-durability', 'standards' => ['ISRM Suggested Methods', 'ASTM D 4644']],
                        ],
                    ],
                    [
                        'name_id' => 'Petrografi & Karakterisasi',
                        'name_en' => 'Petrography & Characterization',
                        'slug' => 'petrografi',
                        'order' => 2,
                        'tests' => [
                            ['name_id' => 'Petrografi Sayatan Tipis', 'name_en' => 'Thin Section Petrography', 'slug' => 'petrografi', 'standards' => ['ISRM Suggested Methods']],
                            ['name_id' => 'XRD Analisis Mineral', 'name_en' => 'XRD Mineral Analysis', 'slug' => 'xrd', 'standards' => ['Umum / General']],
                            ['name_id' => 'XRF Komposisi Kimia', 'name_en' => 'XRF Chemical Composition', 'slug' => 'xrf', 'standards' => ['Umum / General']],
                        ],
                    ],
                ],
            ],
            [
                'name_id' => 'Hidrogeologi & Lingkungan',
                'name_en' => 'Hydrogeology & Environmental',
                'slug' => 'hidrogeologi-lingkungan',
                'icon' => 'droplets',
                'short_id' => 'Uji permeabilitas tanah, kualitas air, dan parameter lingkungan untuk kajian airtanah dan kepatuhan ESG.',
                'short_en' => 'Soil permeability, water quality, and environmental testing for groundwater studies and ESG compliance.',
                'description_id' => 'Divisi Hidrogeologi & Lingkungan menguji permeabilitas, kualitas air fisik-kimia, serta potensi air asam tambang (ABA). Mendukung kajian hidrogeologi, AMDAL, dan pemenuhan baku mutu lingkungan.',
                'description_en' => 'The Hydrogeology & Environment division tests permeability, physical-chemical water quality, and acid mine drainage potential (ABA). Supporting hydrogeological studies, environmental assessments, and regulatory compliance.',
                'standards' => 'SNI, ASTM, Metode ASTM/EPA',
                'order' => 3,
                'categories' => [
                    [
                        'name_id' => 'Uji Permeabilitas & Airtanah',
                        'name_en' => 'Permeability & Groundwater Tests',
                        'slug' => 'permeabilitas',
                        'order' => 1,
                        'tests' => [
                            ['name_id' => 'Permeability Constant Head', 'name_en' => 'Constant Head Permeability', 'slug' => 'permeability-constant-head', 'standards' => ['ASTM D 2434']],
                            ['name_id' => 'Permeability Falling Head', 'name_en' => 'Falling Head Permeability', 'slug' => 'permeability-falling-head', 'standards' => ['ASTM D 5084']],
                            ['name_id' => 'Hydraulic Conductivity Flexible Wall', 'name_en' => 'Flexible Wall Hydraulic Conductivity', 'slug' => 'hydraulic-conductivity', 'standards' => ['ASTM D 5084']],
                            ['name_id' => 'Expansion Index', 'name_en' => 'Expansion Index', 'slug' => 'expansion-index', 'standards' => ['ASTM D 4829']],
                        ],
                    ],
                    [
                        'name_id' => 'Kualitas Air & Lingkungan',
                        'name_en' => 'Water Quality & Environmental',
                        'slug' => 'kualitas-air',
                        'order' => 2,
                        'tests' => [
                            ['name_id' => 'Analisis Kualitas Air (fisik-kimia)', 'name_en' => 'Water Quality Analysis (physical-chemical)', 'slug' => 'kualitas-air', 'standards' => ['SNI 6989', 'ASTM D 1293']],
                            ['name_id' => 'pH & Konduktivitas', 'name_en' => 'pH & Conductivity', 'slug' => 'ph-konduktivitas', 'standards' => ['ASTM D 1293']],
                            ['name_id' => 'Sulfur / Acid Base Accounting', 'name_en' => 'Sulfur / Acid Base Accounting', 'slug' => 'sulfur-aba', 'standards' => ['ASTM D 2492', 'Sobek 1978']],
                        ],
                    ],
                ],
            ],
        ];

        foreach ($services as $data) {
            $categories = $data['categories'];
            unset($data['categories']);

            $service = Service::updateOrCreate(['slug' => $data['slug']], $data);

            foreach ($categories as $cat) {
                $tests = $cat['tests'];
                unset($cat['tests']);

                $category = TestCategory::updateOrCreate(
                    ['slug' => $cat['slug'], 'service_id' => $service->id],
                    $cat
                );

                foreach ($tests as $test) {
                    TestItem::updateOrCreate(
                        ['slug' => $test['slug']],
                        ['category_id' => $category->id] + $test
                    );
                }
            }
        }
    }
}
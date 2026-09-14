<?php

namespace Database\Seeders;

use App\Models\Insight;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class InsightSeeder extends Seeder
{
    public function run(): void
    {
        $posts = [
            [
                'slug' => 'mengapa-uji-triaxial-menentukan-desain-lereng',
                'title_id' => 'Mengapa Uji Triaxial Menentukan Desain Lereng Tambang',
                'title_en' => 'Why Triaxial Testing Defines Mine Slope Design',
                'type' => 'edukasi',
                'category_id' => 'Geomekanika',
                'category_en' => 'Geomechanics',
                'author' => 'Tim Laboratorium WSI',
                'excerpt_id' => 'Parameter kuat geser dari uji triaxial adalah fondasi analisis kestabilan lereng. Ini cara membacanya.',
                'excerpt_en' => 'Shear strength parameters from triaxial tests underpin slope stability analysis. Here is how to read them.',
                'body_id' => "Uji triaxial mengukur kuat geser tanah pada kondisi tegangan yang terkontrol. Dari uji ini diperoleh kohesi dan sudut geser dalam, dua parameter yang menjadi input utama perangkat lunak analisis lereng.\n\nJenis uji dipilih sesuai kondisi lapangan. Triaxial UU cocok untuk pembebanan cepat pada tanah jenuh, sedangkan CU dan CD dipakai ketika drainase dan konsolidasi ikut diperhitungkan. Salah memilih jenis uji berarti salah memodelkan perilaku lereng.\n\nPastikan sampel terganggu seminimal mungkin sejak pengambilan hingga pengujian. Kualitas sampel menentukan kualitas angka desain yang Anda pakai.",
                'body_en' => "Triaxial tests measure soil shear strength under controlled stress. They yield cohesion and internal friction angle, the two parameters that feed slope analysis software.\n\nThe test type must match field conditions. UU suits rapid loading on saturated soil, while CU and CD apply when drainage and consolidation matter. The wrong test type means the wrong slope model.\n\nKeep samples as undisturbed as possible from sampling to testing. Sample quality decides the quality of the design figures you use.",
                'cover_file' => 'excavator.jpg',
                'published_at' => now()->subDays(28),
            ],
            [
                'slug' => 'air-asam-tambang-deteksi-dini-uji-aba',
                'title_id' => 'Air Asam Tambang: Deteksi Dini lewat Uji ABA',
                'title_en' => 'Acid Mine Drainage: Early Detection through ABA Testing',
                'type' => 'edukasi',
                'category_id' => 'Lingkungan',
                'category_en' => 'Environment',
                'author' => 'Tim Laboratorium WSI',
                'excerpt_id' => 'Uji acid base accounting memprediksi potensi air asam tambang sebelum masalah muncul di lapangan.',
                'excerpt_en' => 'Acid base accounting predicts acid mine drainage potential before problems surface on site.',
                'body_id' => "Air asam tambang terbentuk ketika mineral sulfida terpapar udara dan air. Dampaknya pada kualitas air sungai bisa bertahan puluhan tahun, sehingga deteksi dini jauh lebih murah daripada remediasi.\n\nUji ABA mengukur keseimbangan antara potensi pembentukan asam dan kapasitas netralisasi batuan. Hasilnya berupa klasifikasi material: pembentuk asam, peragu, atau bukan pembentuk asam.\n\nKlasifikasi ini menjadi dasar penempatan material timbunan dan desain sistem pengelolaan air. Sertakan uji ABA sejak tahap eksplorasi agar rencana reklamasi tersusun di atas data, bukan asumsi.",
                'body_en' => "Acid mine drainage forms when sulfide minerals meet air and water. Its impact on river quality can last decades, so early detection costs far less than remediation.\n\nABA testing weighs acid-forming potential against rock neutralization capacity. The result classifies material as acid forming, uncertain, or non-acid forming.\n\nThis classification guides waste placement and water management design. Include ABA testing from the exploration stage so reclamation plans rest on data, not assumptions.",
                'cover_file' => 'coal-aerial.jpg',
                'published_at' => now()->subDays(19),
            ],
            [
                'slug' => 'cbr-kompaksi-jalan-angkut-tambang',
                'title_id' => 'CBR dan Kompaksi untuk Jalan Angkut Tambang',
                'title_en' => 'CBR and Compaction for Mine Haul Roads',
                'type' => 'artikel',
                'category_id' => 'Infrastruktur',
                'category_en' => 'Infrastructure',
                'author' => 'Tim Laboratorium WSI',
                'excerpt_id' => 'Jalan angkut yang bergelombang menggerus produktivitas. Kuncinya ada di CBR dan kontrol kompaksi.',
                'excerpt_en' => 'Wavy haul roads eat productivity. The key lies in CBR and compaction control.',
                'body_id' => "Nilai CBR menentukan tebal perkerasan yang dibutuhkan agar jalan angkut tahan terhadap beban gandar alat berat. Tanpa data CBR yang valid, desain perkerasan hanya tebakan.\n\nUji kompaksi laboratorium menetapkan kadar air optimum dan kepadatan kering maksimum sebagai target pemadatan lapangan. Pengujian sand cone atau nuclear density gauge kemudian memverifikasi pencapaiannya.\n\nKombinasi desain berbasis CBR dan kontrol kompaksi yang disiplin menekan biaya perawatan jalan dan konsumsi bahan bakar armada.",
                'body_en' => "CBR values decide the pavement thickness needed to carry heavy equipment axle loads. Without valid CBR data, pavement design is guesswork.\n\nLaboratory compaction tests set the optimum moisture content and maximum dry density targets for field compaction. Sand cone or nuclear density gauge testing then verifies achievement.\n\nCBR-based design combined with disciplined compaction control cuts road maintenance cost and fleet fuel consumption.",
                'cover_file' => 'highway.jpg',
                'published_at' => now()->subDays(11),
            ],
            [
                'slug' => 'membaca-hasil-ucs-batuan',
                'title_id' => 'Membaca Hasil UCS: Dari Sampel Inti ke Angka Desain',
                'title_en' => 'Reading UCS Results: From Core Samples to Design Figures',
                'type' => 'artikel',
                'category_id' => 'Mekanika Batuan',
                'category_en' => 'Rock Mechanics',
                'author' => 'Tim Laboratorium WSI',
                'excerpt_id' => 'Satu angka kuat tekan menyimpan banyak informasi, jika Anda tahu cara membacanya.',
                'excerpt_en' => 'A single compressive strength figure holds plenty of information, if you know how to read it.',
                'body_id' => "Uji kuat tekan uniaksial (UCS) adalah uji batuan paling rutin diminta. Sampel inti dibebani hingga runtuh, dan kuat tekan maksimum dicatat sebagai kapasitas dasar massa batuan.\n\nPerhatikan mode keruntuhan dan kondisi sampel. Retakan aksial pada sampel utuh memberi angka yang dapat dipakai, sedangkan keruntuhan lewat rekahan lama menunjukkan kelemahan struktur, bukan kekuatan material.\n\nGabungkan UCS dengan point load index dan data RQD untuk klasifikasi massa batuan yang andal. Satu parameter tidak pernah cukup untuk keputusan desain.",
                'body_en' => "Uniaxial compressive strength (UCS) is the most routinely requested rock test. Core samples are loaded to failure, and the peak strength is recorded as the baseline rock-mass capacity.\n\nWatch the failure mode and sample condition. Axial splitting of intact samples yields usable figures, while failure along old fractures shows structural weakness, not material strength.\n\nCombine UCS with point load index and RQD data for reliable rock-mass classification. A single parameter is never enough for design decisions.",
                'cover_file' => 'haul-truck.jpg',
                'published_at' => now()->subDays(4),
            ],
        ];

        foreach ($posts as $i => $post) {
            $filename = 'insights/c'.($i + 1).'.jpg';
            Storage::disk('public')->put($filename, file_get_contents(public_path('images/'.$post['cover_file'])));
            unset($post['cover_file']);

            Insight::updateOrCreate(
                ['slug' => $post['slug']],
                $post + ['cover' => $filename, 'is_published' => true]
            );
        }
    }
}

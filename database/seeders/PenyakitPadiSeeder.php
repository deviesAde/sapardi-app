<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class PenyakitPadiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('penyakit_padi')->insert([
            [
                'nama_penyakit' => 'Blast',
                'deskripsi' => 'Blast adalah penyakit pada padi yang disebabkan oleh jamur Pyricularia oryzae. Penyakit ini menyebabkan bercak-bercak pada daun, leher, dan biji.',
                'penyebab' => 'Penyebab utama penyakit ini adalah infeksi jamur Pyricularia oryzae.',
                'saran_penanganan' => 'Penggunaan varietas padi tahan blast, pengaturan jarak tanam, dan penggunaan fungisida dapat mengurangi serangan blast.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_penyakit' => 'Bercak Coklat',
                'deskripsi' => 'Bercak coklat adalah penyakit pada padi yang disebabkan oleh jamur Cochliobolus miyabeanus. Penyakit ini menyebabkan bercak coklat pada daun.',
                'penyebab' => 'Penyebab utama penyakit ini adalah infeksi jamur Cochliobolus miyabeanus.',
                'saran_penanganan' => 'Pemangkasan daun yang terinfeksi dan penggunaan fungisida efektif dapat mengurangi penyebaran bercak coklat.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_penyakit' => 'Hawar Daun',
                'deskripsi' => 'Hawar daun adalah penyakit pada padi yang disebabkan oleh jamur Helminthosporium oryzae. Penyakit ini menyebabkan daun padi menguning dan mati.',
                'penyebab' => 'Penyebab utama penyakit ini adalah infeksi jamur Helminthosporium oryzae.',
                'saran_penanganan' => 'Penggunaan fungisida dan pemusnahan tanaman yang terinfeksi dapat membantu mengatasi hawar daun.',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}

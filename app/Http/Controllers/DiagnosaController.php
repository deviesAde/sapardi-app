<?php

namespace App\Http\Controllers;

use App\Models\Diagnosis;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use GuzzleHttp\Client;
use App\Models\PenyakitPadi;



class DiagnosaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    //     public function store(Request $request)
    // {
    //     // Ambil gambar dari request dan kirim ke Flask API
    //     $image = $request->file('image');  // Ambil gambar dari form request

    //     // Kirim request ke Flask API untuk melakukan prediksi
    //     $client = new Client();
    //     $response = $client->post('http://127.0.0.1:5000/predict', [
    //         'multipart' => [
    //             [
    //                 'name' => 'image',
    //                 'contents' => fopen($image->getPathname(), 'r'),
    //                 'filename' => $image->getClientOriginalName()
    //             ]
    //         ]
    //     ]);

    //     $data = json_decode($response->getBody()->getContents(), true);
    //     $imageUrl = $data['image_url'];  // Ambil URL gambar hasil prediksi dari Flask

    //     // Simpan data ke dalam database
    //     $diagnosis = Diagnosis::create([
    //         'user_id' => 1,
    //         'penyakit_id' => 1,
    //         'gambar_input' => $imageUrl,
    //         'hasil_diagnosis' => $data['results']['predictions'][0]['class'],
    //         'confidence' => $data['results']['predictions'][0]['confidence'],
    //         'metode' => 'kamera',
    //     ]);

    //     return Inertia::render('HasilDiagnosa', [
    //         'image' => $imageUrl,
    //         'label' => $data['results']['predictions'][0]['class'],
    //     ]);
    // }

    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|string',
            'label' => 'required|string',
        ]);

        // Cari penyakit berdasarkan label
        // $penyakit = PenyakitPadi::where('nama_penyakit', 'like', '%' . $request->label . '%')->first();

        // Simpan ke database
        Diagnosis::create([
            'user_id' => 1, // pastikan user sudah login
            'penyakit_id' => 1,
            'gambar_input' => $request->image,
            'hasil_diagnosis' => $request->label,
            'confidence' => 0.0, // jika tidak disertakan, bisa null atau isi manual
            'metode' => 'kamera',
        ]);

        // Kirim data ke halaman hasil diagnosa
        return redirect()->route('hasil.diagnosa')->with([
            'image' => $request->image,
            'label' => $request->label,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

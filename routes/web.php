<?php

use App\Http\Controllers\DiagnosaController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/scan', function () {
    return Inertia::render('scan');
})->name('scan');

Route::get('/hasil-scan-penyakit', [DiagnosaController::class, 'hasilDiagnosa'])->name('hasil.diagnosa');

Route::post('/hasil-scan-penyakit', [DiagnosaController::class, 'store'])->name('hasil.diagnosa');


Route::get ('/chatbot', function () {
    return Inertia::render('chatbot');
})->name('chatbot');

Route::post('/chatbot', function (Request $request) {
    $prompt = $request->input('prompt');

    $response = Http::withHeaders([
        'Authorization' => 'Bearer ' . env('GROQ_API_KEY'),
        'Content-Type' => 'application/json',
    ])->post('https://api.groq.com/openai/v1/chat/completions', [
        'model' => 'meta-llama/llama-4-scout-17b-16e-instruct',
        'messages' => [
            ['role' => 'user', 'content' => $prompt],
        ],
    ]);

    if (!$response->successful()) {
        return response()->json([
            'error' => true,
            'status' => $response->status(),
            'message' => json_decode($response->body(), true),
        ], $response->status());
    }

    return response()->json($response->json());
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('/kelolaAkun', function () {
        return Inertia::render('kelolaAkun');
    })->name('kelolaAkun');
    Route::get('/kelolaPenyakit', function () {
        return Inertia::render('kelolaPenyakit');
    })->name('kelolaPenyakit');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

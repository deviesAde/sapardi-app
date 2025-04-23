<?php

use App\Http\Controllers\DiagnosaController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Admin routes
Route::middleware(['auth', 'verified', RoleMiddleware::class . ':admin'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('admin.dashboard');

    Route::get('/kelolaAkun', function () {
        return Inertia::render('kelolaAkun');
    })->name('kelolaAkun');

    Route::get('/kelolaPenyakit', function () {
        return Inertia::render('kelolaPenyakit');
    })->name('kelolaPenyakit');
});

// User routes
Route::middleware(['auth', 'verified', RoleMiddleware::class . ':user'])->group(function () {
    Route::get('/scan', function () {
        return Inertia::render('scan');
    })->name('user.dashboard');

    Route::get('/hasil-scan-penyakit', [DiagnosaController::class, 'hasilDiagnosa'])->name('hasil.diagnosa');
    Route::post('/hasil-scan-penyakit', [DiagnosaController::class, 'store'])->name('hasil.diagnosa');

    Route::get('/chatbot', function () {
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

    Route::get('/edit', function () {
        return Inertia::render('editProfile', [
        'auth' => [
            'user' => Auth::user(),
        ],
    ]);
    });

});


Route::fallback(function () {
    return Inertia::render('page-not-found', [
        'status' => 404,
        'message' => 'Halaman tidak ditemukan',
    ]);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

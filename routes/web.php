<?php

use App\Http\Controllers\DiagnosaController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\ChatController;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\PenyakitController;
use App\Http\Middleware\TrackUserActivity;
use App\Http\Controllers\DashboardController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Admin routes
Route::middleware(['auth', 'verified', RoleMiddleware::class . ':admin', TrackUserActivity::class])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');

    Route::get('/kelolaAkun', [AccountController::class, 'index'])->name('kelolaAkun');
    Route::resource('accounts', AccountController::class);

    Route::get('/kelolaPenyakit', [PenyakitController::class, 'index'])->name('kelolaPenyakit');
    Route::resource('penyakit', PenyakitController::class);
});

// User routes
Route::middleware(['auth', 'verified', RoleMiddleware::class . ':user', TrackUserActivity::class])->group(function () {
    Route::get('/scan', function () {
        return Inertia::render('scan');
    })->name('user.dashboard');

    Route::get('/hasil-scan-penyakit', [DiagnosaController::class, 'hasilDiagnosa'])->name('hasil.diagnosa');
    Route::post('/hasil-scan-penyakit', [DiagnosaController::class, 'store'])->name('hasil.diagnosa');

    Route::get('/riwayat-scan', [DiagnosaController::class, 'riwayatScan'])->name('riwayat.scan');
    Route::get('/chatbot', [ChatController::class, 'index']);
    Route::post('/chatbot', [ChatController::class, 'store']);
    Route::post('/chatbot/new', [ChatController::class, 'newSession']);
    Route::delete('/chatbot', [ChatController::class, 'clear']);



    Route::get('/edit', function () {
        return Inertia::render('editProfile', [
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    });
});

Route::post('verify-otp', [RegisteredUserController::class, 'verifyOtp'])
    ->name('otp.verify');

Route::fallback(function () {
    return Inertia::render('page-not-found', [
        'status' => 404,
        'message' => 'Halaman tidak ditemukan',
    ]);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

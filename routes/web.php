<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/scan', function () {
    return Inertia::render('scan');
})->name('scan');


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

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

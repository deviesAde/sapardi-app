<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
{
    $users = User::select('id', 'name', 'email', 'last_seen', 'device', 'browser')->get();


$data = $users->map(function ($user) {
    $lastSeen = $user->last_seen ? Carbon::parse($user->last_seen) : null;

    return [
        'id' => $user->id,
        'name' => $user->name,
        'email' => $user->email,
        'status' => $lastSeen && $lastSeen->gt(now()->subMinutes(5)) ? 'online' : 'offline',
        'lastActive' => $lastSeen ? $lastSeen->toIso8601String() : null,
        'device' => "{$user->device} - {$user->browser}",
    ];
});
    return Inertia::render('dashboard', [
        'users' => $data,
    ]);
}
}

<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\PenyakitPadi;
use Illuminate\Http\Request;
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
            'counts' => $this->getCountsData(),
        ]);
    }

    public function getCounts()
    {
        return response()->json($this->getCountsData());
    }

    protected function getCountsData(): array
    {
        return [
            'total_users' => User::count(),
            'total_diseases' => PenyakitPadi::count(),
        ];
    }
}

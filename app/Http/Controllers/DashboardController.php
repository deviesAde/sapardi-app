<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\PenyakitPadi;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        return inertia('dashboard', [
            'counts' => $this->getCountsData()
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

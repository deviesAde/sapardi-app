<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class Logseeder extends Seeder
{
    public function run(): void
    {
        for ($i = 1; $i <= 10; $i++) {
            User::create([
                'name' => "Dummy User {$i}",
                'email' => "dummy{$i}@gmail.com",
                'password' => Hash::make('password'),
                'role' => 'user',
                'last_seen' => Carbon::now()->subMinutes(rand(1, 180)),
                'device' => ['Desktop', 'Mobile', 'Tablet'][array_rand(['Desktop', 'Mobile', 'Tablet'])],
                'browser' => ['Chrome', 'Firefox', 'Safari', 'Edge'][array_rand(['Chrome', 'Firefox', 'Safari', 'Edge'])],
            ]);
        }
    }
}

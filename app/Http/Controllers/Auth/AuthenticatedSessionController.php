<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;

class AuthenticatedSessionController extends Controller
{
    /**
     * Show the login page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }


 public function store(LoginRequest $request): RedirectResponse
{
    $request->authenticate();

    $request->session()->regenerate();


  $redirectUrl = $request->input('redirect', null);

    if ($redirectUrl) {
        return redirect()->to($redirectUrl);
    }


    $role = Auth::user()->role;
    if ($role === 'admin') {
        return redirect()->route('admin.dashboard'); // Admin dashboard
    } elseif ($role === 'user') {
        return redirect('/');
    }


    return redirect('/');

}

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {

        /** @var \App\Models\User $user */
        $user = Auth::user();
        if ($user) {
            $user->update([
                'last_seen' => now()->subMinutes(10), // atau null
            ]);
        }

        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }

}

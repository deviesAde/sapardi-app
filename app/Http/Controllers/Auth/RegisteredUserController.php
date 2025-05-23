<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use App\Mail\SendOtpMail;
use Illuminate\Support\Facades\Mail;


class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    public function showOtp(): Response
    {
        return Inertia::render('auth/verifyOtp');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */public function store(Request $request): RedirectResponse
{
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|lowercase|email|max:255|unique:users,email',
        'password' => ['required', 'confirmed', Rules\Password::defaults()],
    ]);

    // Buat OTP
    $otp = random_int(100000, 999999);


    $request->session()->put('registration_data', [
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'otp' => $otp,
        'otp_expires_at' => now()->addMinutes(10),
    ]);


    Mail::to($request->email)->send(new SendOtpMail($otp));

    // Redirect ke halaman verifikasi OTP
    return redirect()->route('otp.show', ['email' => $request->email]);
}

public function verifyOtp(Request $request)
{
    $request->validate([
        'otp' => 'required|digits:6',
    ]);

    $registrationData = $request->session()->get('registration_data');

    if (!$registrationData) {
        return response()->json(['message' => 'Data registrasi tidak ditemukan'], 400);
    }

    if ($registrationData['otp'] !== (int)$request->otp || $registrationData['otp_expires_at'] < now()) {
        return response()->json(['message' => 'OTP tidak valid atau sudah kedaluwarsa'], 400);
    }

    $user = User::create([
        'name' => $registrationData['name'],
        'email' => $registrationData['email'],
        'password' => $registrationData['password'],
        'is_verified' => true,
        'otp' => $registrationData['otp'],
        'otp_expires_at' => $registrationData['otp_expires_at'],

    ]);


    $request->session()->forget('registration_data');

   return response()->json([
        'status' => 'Verifikasi berhasil',
        'redirect_url' => route('login')
    ]);


}
public function resend(Request $request)
    {


        $registrationData = $request->session()->get('registration_data');

    if (!$registrationData || !isset($registrationData['email'])) {
        return response()->json(['message' => 'Email tidak ditemukan. Silakan registrasi ulang.'], 400);
    }


    $otp = rand(100000, 999999);
    $request->session()->put('registration_data.otp', $otp);
    $request->session()->put('registration_data.otp_expires_at', now()->addMinutes(10));


    Mail::to($registrationData['email'])->send(new \App\Mail\SendOtpMail($otp));

    return response()->json(['message' => 'Kode OTP berhasil dikirim ulang.']);
    }
}

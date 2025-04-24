<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use App\Models\ChatMessage;
use App\Models\ChatSession;
use Inertia\Inertia;
use App\Models\User;

class ChatController extends Controller
{
    public function index(Request $request)
{
    if ($request->wantsJson()) {
        $user = Auth::user();

        $chatSessions = ChatSession::with('messages')
            ->where('user_id', $user->id)
            ->orderByDesc('created_at')
            ->get();

        return response()->json([
            'chatSessions' => $chatSessions,
        ]);
    }

    return Inertia::render('chatbot');
}

    public function store(Request $request)
    {
        $request->validate([
            'prompt' => 'required|string',
        ]);

        $user = Auth::user();
        $prompt = $request->input('prompt');
        $sessionId = $request->input('session_id');


        $session = $sessionId
            ? ChatSession::firstOrCreate(['id' => $sessionId, 'user_id' => $user->id])
            : ChatSession::create(['user_id' => $user->id, 'prompt' => $prompt]);

        // Simpan pesan user
        ChatMessage::create([
            'chat_session_id' => $session->id,
            'role' => 'user',
            'text' => $prompt,
        ]);

        // Kirim prompt ke Groq API
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

       $reply = $response->json()['choices'][0]['message']['content'] ?? 'Tidak ada jawaban';

        // Simpan jawaban dari bot
        ChatMessage::create([
            'chat_session_id' => $session->id,
            'role' => 'bot',
            'text' => $reply,
        ]);

        return response()->json([
            'session_id' => $session->id,
            'messages' => $session->messages()->get(['role', 'text']),
        ]);
    }

    public function newSession()
    {
        $user = Auth::user();
        $session = ChatSession::create([
            'user_id' => $user->id,
            'prompt' => 'New Chat',
        ]);

        return response()->json(['id' => $session->id]);
    }

    public function clear()
    {
    $user = Auth::user();

    $sessions = ChatSession::where('user_id', $user->id)->get();

    foreach ($sessions as $session) {
        $session->messages()->delete(); // hapus semua pesan
        $session->delete(); // hapus sesi
    }

    return response()->json(['message' => 'History cleared']);
    }
}

import axios from 'axios';
import React, { useState } from 'react';

// Tipe data untuk pesan chat
type ChatMessage = {
    role: 'user' | 'bot';
    text: string;
};

// Tipe data untuk sesi chat
type Chat = {
    id: number;
    prompt: string;
    messages: ChatMessage[];
};

const Chatbot: React.FC = () => {
    // State untuk riwayat chat
    const [chatHistory, setChatHistory] = useState<Chat[]>([]);

    // State untuk sesi chat saat ini
    const [currentChat, setCurrentChat] = useState<Chat>({
        id: Date.now(),
        prompt: '',
        messages: [],
    });

    // State untuk input prompt dan status loading
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);

    // Fungsi untuk mengirim pesan
    const handleSend = async () => {
        if (!prompt.trim()) return;

        const userMessage: ChatMessage = { role: 'user', text: prompt };

        // Tambahkan pesan user ke sesi chat saat ini
        setCurrentChat((prev) => ({
            ...prev,
            prompt: prev.prompt || prompt,
            messages: [...prev.messages, userMessage],
        }));

        setLoading(true);
        try {
            // Kirim prompt ke server
            const res = await axios.post('/chatbot', { prompt });
            const botResponse = res.data.choices?.[0]?.message?.content || 'Bot tidak bisa menjawab.';

            const botMessage: ChatMessage = { role: 'bot', text: botResponse };

            // Perbarui sesi chat dengan respons bot
            const updatedChat: Chat = {
                ...currentChat,
                prompt: currentChat.prompt || prompt,
                messages: [...currentChat.messages, userMessage, botMessage],
            };

            setCurrentChat(updatedChat);

            // Perbarui riwayat chat (1 sesi per ID)
            const updatedHistory = chatHistory.filter((chat) => chat.id !== updatedChat.id);
            updatedHistory.unshift(updatedChat);

            // Batasi riwayat hingga 8 entri
            if (updatedHistory.length > 8) {
                updatedHistory.pop();
            }

            setChatHistory(updatedHistory);
        } catch (err) {
            alert('Gagal mendapatkan jawaban dari bot.');
        } finally {
            setPrompt('');
            setLoading(false);
        }
    };

    // Fungsi untuk memilih sesi chat dari riwayat
    const handleSelectHistory = (chat: Chat) => {
        setCurrentChat(chat);
    };

    // Fungsi untuk memulai sesi chat baru
    const handleNewChat = () => {
        setCurrentChat({
            id: Date.now(),
            prompt: '',
            messages: [],
        });
    };

    // Fungsi untuk menghapus seluruh riwayat chat
    const handleClearHistory = () => {
        setChatHistory([]);
    };

    return (
        <div className="flex h-screen bg-[#67AE6E]">
            {/* Area Chat */}
            <div className="m-6 flex flex-1 flex-col rounded-2xl bg-white p-6">
                {/* Header */}
                <div className="mb-4 flex justify-center">
                    <img src="/pakpardi.png" alt="Pak Pardi" className="h-16" />
                </div>
                <div className="mb-4 flex justify-center">
                    <h1 className="text-2xl font-bold text-green-900">Tanya Pak Pardi</h1>
                </div>

                {/* Pesan Chat */}
                <div className="mb-4 flex-1 space-y-4 overflow-y-auto rounded-xl bg-gray-100 p-4">
                    {currentChat.messages.length > 0 ? (
                        currentChat.messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div
                                    className={`max-w-xs rounded-xl p-3 whitespace-pre-wrap ${
                                        msg.role === 'user' ? 'bg-green-400 text-white' : 'bg-gray-300 text-black'
                                    }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex justify-center text-gray-500">
                            <p>Belum ada percakapan. Mulai dengan mengetik pertanyaan di bawah.</p>
                        </div>
                    )}
                </div>

                {/* Input Prompt */}
                <div className="mt-2 flex">
                    <input
                        className="flex-1 rounded-l-xl bg-gray-200 p-3 text-black"
                        placeholder="Ketik pertanyaan..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        disabled={loading}
                    />
                    <button className="rounded-r-xl bg-green-600 px-6 text-white" onClick={handleSend} disabled={loading}>
                        {loading ? '...' : 'Tanya'}
                    </button>
                </div>
            </div>

            {/* Sidebar */}
            <div className="m-6 w-72 rounded-2xl bg-white p-4">
                <h2 className="mb-4 text-2xl font-bold text-green-900">History Chat</h2>
                <div className="space-y-3">
                    {/* Tombol New Chat */}
                    <button onClick={handleNewChat} className="w-full rounded-xl bg-green-500 py-2 text-white hover:bg-green-600">
                        New Chat
                    </button>

                    {/* Tombol Clear History */}
                    <button onClick={handleClearHistory} className="w-full rounded-xl bg-red-500 py-2 text-white hover:bg-red-600">
                        Clear History
                    </button>

                    {/* Riwayat Chat */}
                    {chatHistory.map((chat) => (
                        <div
                            key={chat.id}
                            onClick={() => handleSelectHistory(chat)}
                            className="cursor-pointer rounded-xl bg-gray-100 p-3 text-black hover:bg-gray-200"
                        >
                            {chat.prompt}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Chatbot;

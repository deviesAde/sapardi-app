import { Button } from '@/components/ui/button';
import axios from 'axios';
import { MoveLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react';

type ChatMessage = {
    role: 'user' | 'bot';
    text: string;
};

type ChatSession = {
    id: number;
    prompt: string;
    messages: ChatMessage[];
};

const Chatbot: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(false);
    const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);
    const [sessionId, setSessionId] = useState<number | null>(null);

    // Load all chat history on mount
    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const response = await axios.get('/chatbot');
            const data = response.data.chatSessions;

            // Pastikan data ada sebelum mengakses 'length'
            if (data && Array.isArray(data)) {
                setChatHistory(data); // Setel data ke state chatSessions
            } else {
                setChatHistory([]);
            }
        } catch (error) {
            console.error('Gagal mengambil riwayat:', error);
            setChatHistory([]);
        }
    };

    const cleanBotResponse = (response: string): string => {
        return response.replace(/\*\*/g, ''); 
    };

const handleSend = async () => {
    if (!prompt.trim()) return;

    const userMessage: ChatMessage = { role: 'user', text: prompt };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setLoading(true);

    try {
        const res = await axios.post('/chatbot', {
            prompt,
            session_id: sessionId,
        });

        const session_id = res.data.session_id;
        const botContent = res.data.messages?.at(-1)?.text || 'Bot tidak menjawab';
        const botMessage: ChatMessage = { role: 'bot', text: cleanBotResponse(botContent) };

        setSessionId(session_id);
        setMessages([...updatedMessages, botMessage]);

        fetchHistory();
    } catch (err) {
        if (axios.isAxiosError(err)) {

            const status = err.response?.status;
            const errorMessage = err.response?.data?.message || err.message;
            console.error(`Error ${status}:`, errorMessage);
            alert(`Gagal mendapatkan jawaban dari bot: ${errorMessage}`);
        } else if (err instanceof Error) {

            alert('Gagal mendapatkan jawaban dari bot: ' + err.message);
        } else {

            alert('Terjadi error yang tidak diketahui saat mengirim pesan.');
        }
    } finally {
        setPrompt('');
        setLoading(false);
    }
};

    const handleNewChat = async () => {
        try {
            const res = await axios.post('/chatbot/new');
            setSessionId(res.data.id);
            setMessages([]); // Clear current messages
            setPrompt(''); // Clear the input prompt
            fetchHistory(); // Reload chat history
        } catch (err) {
            console.error('Gagal membuat sesi baru:', err);
        }
    };

    const handleSelectHistory = (chat: ChatSession) => {
        setSessionId(chat.id);
        setMessages(chat.messages);
    };

    const handleClearHistory = async () => {
        await axios.delete('/chatbot');
        setChatHistory([]);
        setSessionId(null);
        setMessages([]);
    };

    return (
        <div className="flex h-screen bg-[#67AE6E]">
            <div className="m-6 flex flex-1 flex-col rounded-2xl bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                    <Button className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600" onClick={() => (window.location.href = '/')}>
                        <MoveLeft className="mr-2 h-4 w-4" />
                        Kembali ke Home
                    </Button>
                    <div className="mb-4 flex justify-center">
                        <img src="/images/landing/botai.png" alt="Pak Pardi" className="h-30" />
                    </div>
                </div>

                <div className="mb-4 flex justify-center">
                    <h1 className="text-2xl font-bold text-green-900">Tanya Pak Pardi</h1>
                </div>

                <div className="mb-4 flex-1 space-y-4 overflow-y-auto rounded-xl bg-gray-100 p-4">
                    {messages.length > 0 ? (
                        messages.map((msg, idx) => (
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
                    <button onClick={handleNewChat} className="w-full rounded-xl bg-green-500 py-2 text-white hover:bg-green-600">
                        New Chat
                    </button>
                    <button onClick={handleClearHistory} className="w-full rounded-xl bg-red-500 py-2 text-white hover:bg-red-600">
                        Clear History
                    </button>
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

export default  Chatbot;

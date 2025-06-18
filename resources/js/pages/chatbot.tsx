import { Button } from '@/components/ui/button';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, MoveLeft, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { History } from 'lucide-react';

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
    const [messagesRef] = useAutoAnimate<HTMLDivElement>();
    const [historyRef] = useAutoAnimate<HTMLDivElement>();
    const [showHistory, setShowHistory] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Check if mobile on mount and resize
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    // Load all chat history on mount
    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const response = await axios.get('/chatbot');
            const data = response.data.chatSessions;

            if (data && Array.isArray(data)) {
                setChatHistory(data);
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
            if (isMobile) setShowHistory(false);
        }
    };

    const handleNewChat = async () => {
        try {
            const res = await axios.post('/chatbot/new');
            setSessionId(res.data.id);
            setMessages([]);
            setPrompt('');
            fetchHistory();
            if (isMobile) setShowHistory(false);
        } catch (err) {
            console.error('Gagal membuat sesi baru:', err);
        }
    };

    const handleSelectHistory = (chat: ChatSession) => {
        setSessionId(chat.id);
        setMessages(chat.messages);
        if (isMobile) setShowHistory(false);
    };

    const handleClearHistory = async () => {
        await axios.delete('/chatbot');
        setChatHistory([]);
        setSessionId(null);
        setMessages([]);
    };

    const toggleHistory = () => {
        setShowHistory(!showHistory);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="relative flex h-screen bg-[#67AE6E]">
            {/* Mobile History Toggle Button */}
            {isMobile && (
                <motion.button
                    onClick={toggleHistory}
                    className="fixed top-4 left-4 z-50 rounded-full bg-white p-2 shadow-md md:hidden"
                    animate={{ opacity: showHistory ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                >
                    <Menu size={24}
                        className="text-black" />
                </motion.button>
            )}

            {/* Main Chat Area */}
            <div
                className={`m-6 flex flex-1 flex-col rounded-2xl bg-white p-6 transition-all duration-300 ${isMobile && showHistory ? 'opacity-50' : 'opacity-100'}`}
            >
                <div className="mb-4 flex items-center justify-between">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600" onClick={() => (window.location.href = '/')}>
                            <MoveLeft className="mr-2 h-4 w-4" />
                            Kembali ke Home
                        </Button>
                    </motion.div>
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mb-4 flex justify-center"
                    >
                        <img src="/images/landing/botai.png" alt="Pak Pardi" className="h-30" />
                    </motion.div>
                </div>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-4 flex justify-center"
                >
                    <h1 className="text-2xl font-bold text-green-900">Tanya Pak Pardi</h1>
                </motion.div>

                <div ref={messagesRef} className="mb-4 flex-1 space-y-4 overflow-y-auto rounded-xl bg-gray-100 p-4">
                    {messages.length > 0 ? (
                        messages.map((msg, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: msg.role === 'user' ? 50 : -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className={`max-w-xs rounded-xl p-3 whitespace-pre-wrap ${
                                        msg.role === 'user' ? 'bg-green-400 text-white' : 'bg-gray-300 text-black'
                                    }`}
                                >
                                    {msg.text}
                                </motion.div>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="flex justify-center text-gray-500"
                        >
                            <p>Belum ada percakapan. Mulai dengan mengetik pertanyaan di bawah.</p>
                        </motion.div>
                    )}
                </div>

                <motion.div whileHover={{ scale: 1.01 }} className="mt-2 flex">
                    <input
                        className="flex-1 rounded-l-xl bg-gray-200 p-3 text-black focus:ring-2 focus:ring-green-500 focus:outline-none"
                        placeholder="Ketik pertanyaan..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        disabled={loading}
                    />
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-r-xl bg-green-600 px-6 text-white"
                        onClick={handleSend}
                        disabled={loading}
                    >
                        {loading ? (
                            <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                                ...
                            </motion.span>
                        ) : (
                            'Tanya'
                        )}
                    </motion.button>
                </motion.div>
            </div>

            {/* Sidebar - Desktop */}
            {!isMobile && (
                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="m-6 w-72 rounded-2xl bg-white p-4"
                >
                    <h2 className="mb-4 text-2xl font-bold text-green-900">History Chat</h2>
                    <div ref={historyRef} className="space-y-3">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleNewChat}
                            className="w-full rounded-xl bg-green-500 py-2 text-white hover:bg-green-600"
                        >
                            New Chat
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleClearHistory}
                            className="w-full rounded-xl bg-red-500 py-2 text-white hover:bg-red-600"
                        >
                            Clear History
                        </motion.button>
                        <AnimatePresence>
                            {chatHistory.map((chat) => (
                                <motion.div
                                    key={chat.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    whileHover={{ scale: 1.02, backgroundColor: '#f0f0f0' }}
                                    onClick={() => handleSelectHistory(chat)}
                                    className="cursor-pointer rounded-xl bg-gray-100 p-3 text-black hover:bg-gray-200"
                                >
                                    {chat.prompt}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </motion.div>
            )}

            {/* Mobile History Panel */}
            <AnimatePresence>
                {isMobile && showHistory && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-40 bg-black"
                            onClick={toggleHistory}
                        />

                        {/* History Panel */}
                        <motion.div
                            initial={{ x: -300 }}
                            animate={{ x: 0 }}
                            exit={{ x: -300 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="fixed top-0 left-0 z-50 h-full w-3/4 max-w-sm rounded-r-2xl bg-white p-4 shadow-xl"
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-green-900">History Chat</h2>
                                <button onClick={toggleHistory} className="p-2">
                                    <X size={24} />
                                </button>
                            </div>
                            <div ref={historyRef} className="h-[calc(100%-100px)] space-y-3 overflow-y-auto">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleNewChat}
                                    className="w-full rounded-xl bg-green-500 py-2 text-white hover:bg-green-600"
                                >
                                    New Chat
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleClearHistory}
                                    className="w-full rounded-xl bg-red-500 py-2 text-white hover:bg-red-600"
                                >
                                    Clear History
                                </motion.button>
                                <AnimatePresence>
                                    {chatHistory.map((chat) => (
                                        <motion.div
                                            key={chat.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -50 }}
                                            whileHover={{ scale: 1.02, backgroundColor: '#f0f0f0' }}
                                            onClick={() => handleSelectHistory(chat)}
                                            className="cursor-pointer rounded-xl bg-gray-100 p-3 text-black hover:bg-gray-200"
                                        >
                                            {chat.prompt}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Chatbot;

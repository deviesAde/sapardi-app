import { usePage } from '@inertiajs/react';
import React from 'react';

const AskSapardiSection: React.FC = () => {
    const { auth } = usePage<{ auth: { user?: { id: number; name: string } } }>().props; // Mengambil data autentikasi dari backend

    const handleChatButtonClick = () => {
        if (auth.user) {

            window.location.href = '/chatbot';
        } else {

            window.location.href = '/login?redirect=/chatbot';
        }
    };

    return (
        <section className="bg-[#6BB976] px-6 py-16 text-green-900">
            <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-4">

                <div className="relative flex flex-col items-center justify-center space-y-6 md:col-span-3">
                    <img src="/images/landing/botai.png" alt="Bot SAPARDI" className="relative z-10 w-[160px] md:w-[500px]" />
                    <div className="text-center">
                        <p className="text-4xl font-semibold text-green-900">Ada Pertanyaan Seputar Padi?</p>
                        <button
                            onClick={handleChatButtonClick}
                            className="mt-3 rounded-xl bg-green-900 px-15 py-2 font-bold text-white shadow-md transition hover:bg-green-950"
                        >
                            Tanya Pak Pardi
                        </button>
                    </div>
                </div>

                {/* Kolom Kanan - Konten (1/4 lebar layar) */}
                <div className="text-center md:col-span-1 md:text-left">
                    <h2 className="mb-4 text-3xl font-bold md:text-4xl">Tanya SAPARDI</h2>
                    <p className="mb-6 max-w-md text-base md:text-lg">
                        Tanyakan informasi seputar tanaman Padi ke <strong>SAPARDI</strong> dan dapatkan pengalaman menggunakan AI untuk mendapatkan
                        informasi - informasi menarik!
                    </p>

                    <div className="inline-block rounded-2xl bg-[#083D2D] p-6 text-center text-white">
                        <p className="mb-3 text-lg font-semibold">Daftar Untuk Memulai Chat</p>
                        <a
                            href="/register"
                            className="rounded-full bg-green-400 px-5 py-2 font-semibold text-green-900 transition hover:bg-green-300"
                        >
                            Daftar
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AskSapardiSection;

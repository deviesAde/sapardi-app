import React from 'react';

const AskSapardiSection: React.FC = () => {
    return (
        <section className="bg-[#6BB976] px-6 py-16 text-green-900">
            <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
                {/* Kolom Kiri - Bot & Ilustrasi */}
                <div className="relative flex flex-col items-center justify-center">
                    <img src="/images/landing/botai.png" alt="Bot SAPARDI" className="relative z-10 w-64 md:w-72" />



                </div>


                <div className="text-center md:text-left">
                    <h2 className="mb-4 text-3xl font-bold md:text-4xl">Tanya SAPARDI</h2>
                    <p className="mb-6 max-w-md text-base md:text-lg">
                        Tanyakan informasi seputar tanaman Padi ke <strong>SAPARDI</strong> dan dapatkan pengalaman menggunakan AI untuk mendapatkan
                        informasi - informasi menarik!
                    </p>

                    <div className="inline-block rounded-2xl bg-[#083D2D] p-6 text-center text-white">
                        <p className="mb-3 text-lg font-semibold">Daftar Untuk Memulai Chat</p>
                        <button className="rounded-full bg-green-400 px-5 py-2 font-semibold text-green-900 transition hover:bg-green-300">
                            Daftar
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AskSapardiSection;

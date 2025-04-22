

import React from 'react';
import { usePage } from '@inertiajs/react';


const Hero = () => {

     const { auth } = usePage<{ auth: { user?: { id: number; name: string } } }>().props; // Mengambil data autentikasi dari backend

     const handleButtonClick = () => {
         if (auth.user) {

             window.location.href = '/scan';
         } else {

             window.location.href = '/login';
         }
     };
    return (
        <div
            className="relative bg-cover bg-center"
            style={{
                backgroundImage: "url('images/landing/bghero.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* <Header /> */}
            <section id="hero" className="relative py-12 sm:py-16 lg:pt-20 lg:pb-36">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-y-8 sm:gap-y-20 lg:grid-cols-2 lg:items-center xl:grid-cols-5">
                        <div className="text-center md:px-16 lg:px-0 lg:text-left xl:col-span-2">
                            <div className="mx-auto max-w-sm sm:max-w-md md:max-w-full">
                                <h1 className="font-pj text-4l text-white-900 leading-tight font-bold sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight">
                                    {' '}
                                    SAPARDI
                                </h1>
                                <h1 className="font-pj text-4l text-white-900 leading-tight font-bold sm:text-4xl sm:leading-tight lg:text-6xl lg:leading-tight">
                                    GOOD RICE, GOOD LIFE
                                </h1>

                                <div className="mt-8 lg:mt-12 lg:flex lg:items-center">
                                    <p className="font-pj text--900 mt-4 text-lg lg:mt-0 lg:ml-4">
                                        <span className="font-bold">Sapardi</span> Sistem Cerdas untuk bantu deteksi penyakit padi sejak dini.
                                        Tingkatkan hasil panen. Minimalkan kerugian anda.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 sm:flex sm:items-center sm:justify-center sm:space-x-5 lg:mt-12 lg:justify-start">
                                <button
                                    onClick={handleButtonClick}
                                    className="font-pj inline-flex items-center justify-center rounded-xl border border-transparent bg-[#123524] px-25 py-4 text-lg font-bold text-white transition-all duration-200 hover:bg-green-600 focus:outline-none"
                                >
                                    Mulai
                                </button>
                            </div>
                        </div>

                        <div className="lg:col-span-3">
                            <img className="mx-auto w-full scale-90 lg:ml-50" src="images/landing/Hero1.png" alt="Hero Image" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Hero;

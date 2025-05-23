'use client';
import React from 'react';

const Footer = () => {
    return (
        <section className="bg-[#123524] py-10 sm:pt-16 lg:pt-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-x-12 gap-y-16 md:col-span-3 lg:grid-cols-6">
                    <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
                        {/* Logo */}
                        <img className="h-9 w-auto" src="images/landing/logo.png" alt="SAPARDI Logo" />

                        <p className="mt-7 text-base leading-relaxed text-gray-300">
                            SAPARDI adalah sistem cerdas berbasis AI untuk membantu deteksi penyakit padi sejak dini. Tingkatkan hasil panen dan
                            minimalkan kerugian Anda dengan solusi kami.
                        </p>

                        <ul className="mt-9 flex items-center space-x-3">
                            <li>
                                <a
                                    href="#"
                                    title="Twitter"
                                    className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-800 text-white transition-all duration-200 hover:bg-green-600 focus:bg-green-600"
                                >
                                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"></path>
                                    </svg>
                                </a>
                            </li>
                            {/* Tambahkan ikon media sosial lainnya */}
                        </ul>
                    </div>

                    <div>
                        <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">Company</p>

                        <ul className="mt-6 space-y-4">
                            <li>
                                <a
                                    href="#about"
                                    title="About"
                                    className="flex text-base text-gray-300 transition-all duration-200 hover:text-green-400 focus:text-green-400"
                                >
                                    Tentang Kami
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#features"
                                    title="Features"
                                    className="flex text-base text-gray-300 transition-all duration-200 hover:text-green-400 focus:text-green-400"
                                >
                                    Fitur Kami
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#works"
                                    title="Works"
                                    className="flex text-base text-gray-300 transition-all duration-200 hover:text-green-400 focus:text-green-400"
                                >
                                    Cara Kerja
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#career"
                                    title="Career"
                                    className="flex text-base text-gray-300 transition-all duration-200 hover:text-green-400 focus:text-green-400"
                                >
                                    Karir
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">Help</p>

                        <ul className="mt-6 space-y-4">
                            <li>
                                <a
                                    href="#support"
                                    title="Customer Support"
                                    className="flex text-base text-gray-300 transition-all duration-200 hover:text-green-400 focus:text-green-400"
                                >
                                    Dukungan Pelanggan
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#terms"
                                    title="Terms & Conditions"
                                    className="flex text-base text-gray-300 transition-all duration-200 hover:text-green-400 focus:text-green-400"
                                >
                                    Syarat & Ketentuan
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#privacy"
                                    title="Privacy Policy"
                                    className="flex text-base text-gray-300 transition-all duration-200 hover:text-green-400 focus:text-green-400"
                                >
                                    Kebijakan Privasi
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>

                <hr className="mt-16 mb-10 border-gray-200" />

                <p className="text-center text-sm text-gray-300">© Copyright 2025, All Rights Reserved by SAPARDI</p>
            </div>
        </section>
    );
};

export default Footer;

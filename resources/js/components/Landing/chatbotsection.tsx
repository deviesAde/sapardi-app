import { usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import React from 'react';
import { useInView } from 'react-intersection-observer';

const AskSapardiSection: React.FC = () => {
    const { auth } = usePage<{ auth: { user?: { id: number; name: string } } }>().props;

    const [botRef, botInView] = useInView({
        triggerOnce: false,
        threshold: 0.1,
    });

    const [textRef, textInView] = useInView({
        triggerOnce: false,
        threshold: 0.1,
    });

    const handleChatButtonClick = () => {
        if (auth.user) {
            window.location.href = '/chatbot';
        } else {
            window.location.href = '/login?redirect=/chatbot';
        }
    };

    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const botAnimation = {
        initial: { y: 0, rotate: 0 },
        animate: {
            y: [-5, 5, -5],
            rotate: [0, 2, -2, 0],
            transition: {
                y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                },
                rotate: {
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                },
            },
        },
    };

    const pulseAnimation = {
        scale: [1, 1.05, 1],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    };

    return (
        <section className="overflow-hidden bg-[#6BB976] px-6 py-16 text-green-900">
            <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-4">
                {/* Left Column - Bot Image (3/4 width) */}
                <motion.div
                    ref={botRef}
                    className="relative flex flex-col items-center justify-center space-y-6 md:col-span-3"
                    initial="hidden"
                    animate={botInView ? 'show' : 'hidden'}
                    variants={container}
                >
                    <motion.div variants={botAnimation} initial="initial" animate={botInView ? 'animate' : 'initial'} className="relative z-10">
                        <img src="/images/landing/botai.png" alt="Bot SAPARDI" className="w-[160px] drop-shadow-lg md:w-[500px]" />
                    </motion.div>

                    <motion.div className="text-center" variants={item}>
                        <motion.p className="text-4xl font-semibold text-green-900" whileHover={{ scale: 1.02 }}>
                            Ada Pertanyaan Seputar Padi?
                        </motion.p>
                        <motion.button
                            onClick={handleChatButtonClick}
                            className="mt-3 rounded-xl bg-green-900 px-15 py-2 font-bold text-white shadow-md transition hover:bg-green-950"
                            whileHover={{
                                scale: 1.05,
                                boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                            }}
                            whileTap={{ scale: 0.95 }}
                            animate={pulseAnimation}
                        >
                            Tanya Pak Pardi
                        </motion.button>
                    </motion.div>
                </motion.div>

                {/* Right Column - Content (1/4 width) */}
                <motion.div
                    ref={textRef}
                    className="text-center md:col-span-1 md:text-left"
                    initial="hidden"
                    animate={textInView ? 'show' : 'hidden'}
                    variants={container}
                >
                    <motion.h2 className="mb-4 text-3xl font-bold md:text-4xl" variants={item} whileHover={{ scale: 1.02 }}>
                        Tanya SAPARDI
                    </motion.h2>

                    <motion.p className="mb-6 max-w-md text-base md:text-lg" variants={item}>
                        Tanyakan informasi seputar tanaman Padi ke <strong className="text-green-950">SAPARDI</strong> dan dapatkan pengalaman
                        menggunakan AI untuk mendapatkan informasi - informasi menarik!
                    </motion.p>

                    <motion.div
                        className="inline-block rounded-2xl bg-[#083D2D] p-6 text-center text-white"
                        variants={item}
                        whileHover={{
                            y: -5,
                            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                        }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <motion.p
                            className="mb-3 text-lg font-semibold"
                            animate={{
                                color: ['#ffffff', '#a5d6a7', '#ffffff'],
                                transition: { duration: 4, repeat: Infinity },
                            }}
                        >
                            Daftar Untuk Memulai Chat
                        </motion.p>
                        <motion.a
                            href="/register"
                            className="rounded-full bg-green-400 px-5 py-2 font-semibold text-green-900 transition hover:bg-green-300"
                            whileHover={{
                                scale: 1.05,
                                backgroundColor: '#86efac',
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Daftar
                        </motion.a>
                    </motion.div>
                </motion.div>
            </div>

            {/* Floating decorative elements */}
            <motion.div
                className="absolute top-20 left-10 h-8 w-8 rounded-full bg-green-800 opacity-20"
                animate={{
                    y: [0, 30, 0],
                    transition: { duration: 8, repeat: Infinity },
                }}
            />
            <motion.div
                className="absolute right-20 bottom-40 h-12 w-12 rounded-full bg-green-700 opacity-15"
                animate={{
                    y: [0, -40, 0],
                    transition: { duration: 10, repeat: Infinity },
                }}
            />
            <motion.div
                className="absolute top-1/3 right-1/4 h-6 w-6 rounded-full bg-green-900 opacity-10"
                animate={{
                    y: [0, 20, 0],
                    x: [0, 20, 0],
                    transition: { duration: 7, repeat: Infinity },
                }}
            />
        </section>
    );
};

export default AskSapardiSection;

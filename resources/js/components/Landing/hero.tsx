import { usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';

const Hero = () => {
    const { auth } = usePage<{ auth: { user?: { id: number; name: string } } }>().props;

    const handleButtonClick = () => {
        if (auth.user) {
            window.location.href = '/scan';
        } else {
            window.location.href = '/login';
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
            },
        },
    };

    const imageVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 0.9,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: 'easeOut',
            },
        },
        hover: {
            scale: 0.92,
            transition: { duration: 0.3 },
        },
    };

    const buttonVariants = {
        hidden: { scale: 0.9, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                delay: 0.6,
                duration: 0.5,
            },
        },
        hover: {
            scale: 1.05,
            backgroundColor: '#1a4d3a',
            transition: { duration: 0.2 },
        },
        tap: {
            scale: 0.95,
        },
    };

    return (
        <div
            className="relative overflow-hidden bg-cover bg-center"
            style={{
                backgroundImage: "url('images/landing/bghero.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <section id="hero" className="relative py-12 sm:py-16 lg:pt-20 lg:pb-36">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="grid grid-cols-1 gap-y-8 sm:gap-y-20 lg:grid-cols-2 lg:items-center xl:grid-cols-5"
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        <motion.div className="text-center md:px-16 lg:px-0 lg:text-left xl:col-span-2" variants={containerVariants}>
                            <div className="mx-auto max-w-sm sm:max-w-md md:max-w-full">
                                <motion.h1
                                    className="font-pj text-4l text-white-900 leading-tight font-bold sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight"
                                    variants={itemVariants}
                                >
                                    SAPARDI
                                </motion.h1>
                                <motion.h1
                                    className="font-pj text-4l text-white-900 mt-4 leading-tight font-bold sm:text-4xl sm:leading-tight lg:text-6xl lg:leading-tight"
                                    variants={itemVariants}
                                    transition={{ delay: 0.2 }}
                                >
                                    GOOD RICE, GOOD LIFE
                                </motion.h1>

                                <motion.div className="mt-8 lg:mt-12 lg:flex lg:items-center" variants={itemVariants} transition={{ delay: 0.4 }}>
                                    <p className="font-pj mt-4 text-lg text-white lg:mt-0 lg:ml-4">
                                        <span className="font-bold">Sapardi</span> Sistem Cerdas untuk bantu deteksi penyakit padi sejak dini.
                                        Tingkatkan hasil panen. Minimalkan kerugian anda.
                                    </p>
                                </motion.div>
                            </div>

                            <motion.div
                                className="mt-8 sm:flex sm:items-center sm:justify-center sm:space-x-5 lg:mt-12 lg:justify-start"
                                variants={itemVariants}
                                transition={{ delay: 0.5 }}
                            >
                                <motion.button
                                    onClick={handleButtonClick}
                                    className="font-pj inline-flex items-center justify-center rounded-xl border border-transparent bg-[#123524] px-25 py-4 text-lg font-bold text-white transition-all duration-200 hover:bg-green-600 focus:outline-none"
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    Mulai
                                </motion.button>
                            </motion.div>
                        </motion.div>

                        <motion.div className="lg:col-span-3" variants={imageVariants}>
                            <motion.img
                                className="mx-auto w-full scale-90 lg:ml-50"
                                src="images/landing/Hero1.png"
                                alt="Hero Image"
                                whileHover="hover"
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Hero;

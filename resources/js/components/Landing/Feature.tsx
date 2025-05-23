import { usePage } from '@inertiajs/react';
import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

type FeatureItemProps = {
    text: string;
    index: number;
};

const FeatureItem: React.FC<FeatureItemProps> = ({ text, index }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: index * 0.1 },
                },
                hidden: { opacity: 0, y: 20 },
            }}
            whileHover={{ scale: 1.02 }}
            className="flex items-start gap-3"
        >
            <motion.img src="/images/icons/iconrice.png" alt="Icon Padi" className="mt-1 h-5 w-5 object-contain" whileHover={{ rotate: 10 }} />
            <p className="text-sm md:text-base">{text}</p>
        </motion.div>
    );
};

const WhyChooseUs: React.FC = () => {
    const { auth } = usePage<{ auth: { user?: { id: number; name: string } } }>().props;
    const controls = useAnimation();
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    const handleButtonClick = () => {
        if (auth.user) {
            window.location.href = '/scan';
        } else {
            window.location.href = '/login?redirect=/scan';
        }
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5 },
        },
    };

    return (
        <section id="features" className="overflow-hidden bg-[#123524] px-6 py-16 text-white">
            <div className="mx-auto max-w-6xl text-center">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-4 text-3xl font-bold md:text-4xl"
                >
                    Kenapa Memilih Kami?
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mx-auto mb-8 max-w-3xl text-base md:text-lg"
                >
                    Dengan <span className="font-semibold text-[#67AE6E]">SAPARDI</span>, Anda mendapatkan solusi cerdas berbasis teknologi AI untuk
                    deteksi penyakit padi secara cepat, akurat, dan mudah digunakan. Kami menggabungkan keahlian di bidang pertanian dan kecerdasan
                    buatan untuk memberikan informasi yang dapat diandalkan. Komitmen kami adalah menyajikan layanan yang ramah pengguna, terus
                    diperbarui, dan relevan dengan kebutuhan lapangan.
                </motion.p>

                <div className="grid items-center gap-8 md:grid-cols-2">
                    <motion.div
                        ref={ref}
                        initial="hidden"
                        animate={controls}
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.1,
                                },
                            },
                        }}
                        className="grid grid-cols-2 place-content-center gap-4"
                    >
                        <motion.img
                            variants={imageVariants}
                            src="images/landing/gambar1.png"
                            alt="Petani dengan tablet"
                            className="h-40 w-full rounded-md object-cover shadow-lg transition-shadow duration-300 hover:shadow-xl md:h-48"
                            whileHover={{ y: -5 }}
                        />
                        <motion.img
                            variants={imageVariants}
                            src="images/landing/gambar2.png"
                            alt="Padi"
                            className="h-40 w-full rounded-md object-cover shadow-lg transition-shadow duration-300 hover:shadow-xl md:h-48"
                            whileHover={{ y: -5 }}
                        />
                        <motion.img
                            variants={imageVariants}
                            src="images/landing/gambar3.png"
                            alt="Penanaman padi"
                            className="col-span-2 mx-auto h-40 w-full rounded-md object-cover shadow-lg transition-shadow duration-300 hover:shadow-xl md:h-48"
                            style={{ maxWidth: '80%' }}
                            whileHover={{ y: -5 }}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-4 text-left"
                    >
                        <FeatureItem index={0} text="Menggunakan AI berbasis scan" />
                        <FeatureItem index={1} text="Dilengkapi ChatBot untuk menunjang kebutuhan anda" />
                        <FeatureItem index={2} text="Dapat Memberikan saran yang tepat dan sesuai dengan penyakit padi anda" />
                        <FeatureItem index={3} text="Data Aktual dari sumber yang terpercaya" />

                        <motion.button
                            onClick={handleButtonClick}
                            className="mt-6 inline-block rounded-md bg-[#67AE6E] px-6 py-3 font-semibold text-white shadow-md transition hover:bg-green-600"
                            whileHover={{
                                scale: 1.05,
                                boxShadow: '0px 5px 15px rgba(103, 174, 110, 0.4)',
                            }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            Mulai Scan!
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;

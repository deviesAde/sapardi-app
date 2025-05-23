import Header from '@/components/Auth/HeaderAuth';
import { usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ScanLine } from 'lucide-react';

interface Diagnosa {
    id: number;
    hasil_diagnosis: string;
    gambar_input: string;
    created_at: string;
    saran_penanganan: string;
}

// Animation variants
const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const title = {
    hidden: { opacity: 0, y: -20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 10,
        },
    },
};

const hoverCard = {
    scale: 1.03,
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
};

export default function RiwayatScan() {
    const { props } = usePage<{ diagnosas: Diagnosa[] }>();
    const [diagnosas, setDiagnosas] = useState<Diagnosa[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading animation
        const timer = setTimeout(() => {
            setDiagnosas(props.diagnosas);
            setIsLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, [props.diagnosas]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Header />

            <motion.header className="mt-4 mb-6 text-center" initial="hidden" animate="show" variants={container}>
                <motion.h1 className="bg-gradient-to-r from-green-600 to-teal-500 bg-clip-text text-3xl font-bold text-transparent" variants={title}>
                    History Scan
                </motion.h1>
                <motion.hr
                    className="mx-auto mt-2 w-1/4 border-t border-gray-300"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                />
            </motion.header>

            <main className="min-h-screen px-4 py-6">
                {isLoading ? (
                    <div className="flex h-64 items-center justify-center">
                        <motion.div
                            className="h-12 w-12 rounded-full border-4 border-green-500 border-t-transparent"
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                        />
                    </div>
                ) : (
                    <motion.div
                        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                        variants={container}
                        initial="hidden"
                        animate="show"
                    >
                        {diagnosas.map((item) => (
                            <motion.div
                                key={item.id}
                                className="overflow-hidden rounded-lg bg-white p-4 shadow-md hover:shadow-lg"
                                whileHover={hoverCard}
                                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                            >
                                <motion.h2
                                    className="mb-2 text-lg font-semibold text-gray-800"
                                    whileHover={{ color: '#059669' }} // emerald-600
                                >
                                    {item.hasil_diagnosis}
                                </motion.h2>

                                <motion.div
                                    className="mb-3 h-70 w-full overflow-hidden rounded"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ type: 'spring' }}
                                >
                                    <img
                                        src={item.gambar_input}
                                        alt={item.hasil_diagnosis}
                                        className="h-full w-full object-cover transition-all duration-300 hover:scale-105"
                                    />
                                </motion.div>

                                <motion.p className="mb-1 text-sm text-gray-600" initial={{ opacity: 0.8 }} whileHover={{ opacity: 1 }}>
                                    <strong className="text-green-600">Tanggal:</strong> {new Date(item.created_at).toLocaleDateString('id-ID')}
                                </motion.p>

                                <motion.div
                                    className="mt-3 rounded-lg bg-green-50 p-3"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <p className="text-sm text-gray-700">
                                        <strong className="text-green-600">Saran Penanganan:</strong> {item.saran_penanganan}
                                    </p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </main>

            {/* Floating action button */}
            {!isLoading && (
                <motion.div
                    className="fixed right-6 bottom-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <button
                        className="rounded-full bg-green-600 p-4 text-white shadow-lg transition-colors hover:bg-green-700"
                        onClick={() => (window.location.href = '/scan')}
                    >
                         <ScanLine className="h-6 w-6" />


                    </button>
                </motion.div>
            )}
        </div>
    );
}

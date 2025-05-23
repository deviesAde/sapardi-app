import { motion } from 'framer-motion';
import React from 'react';

interface CountData {
    total_users: number;
    total_diseases: number;
}

interface CounterItem {
    title: string;
    value: number;
    icon: React.ReactNode;
    bgColor: string;
    description: string;
}

interface CounterDataProps {
    counts?: CountData;
    apiEndpoint?: string;
}

export const CounterData: React.FC<CounterDataProps> = ({ counts, apiEndpoint }) => {
    const [localCounts, setLocalCounts] = React.useState<CountData | null>(counts || null);
    const [isLoading, setIsLoading] = React.useState<boolean>(!counts && !!apiEndpoint);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (apiEndpoint && !counts) {
            const fetchDataCounts = async () => {
                try {
                    setIsLoading(true);
                    const response = await fetch(apiEndpoint);

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const data: CountData = await response.json();
                    setLocalCounts(data);
                } catch (err) {
                    setError(err instanceof Error ? err.message : 'An unknown error occurred');
                } finally {
                    setIsLoading(false);
                }
            };

            fetchDataCounts();
        }
    }, [apiEndpoint, counts]);

    const counterData: CounterItem[] = [
        {
            title: 'Total Pengguna',
            value: localCounts?.total_users || 0,
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                </svg>
            ),
            bgColor: 'bg-gradient-to-br from-green-600 to-green-800',
            description: 'Jumlah total akun pengguna terdaftar',
        },
        {
            title: 'Data Penyakit Tanaman',
            value: localCounts?.total_diseases || 0,
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                </svg>
            ),
            bgColor: 'bg-gradient-to-br from-emerald-500 to-emerald-700',
            description: 'Jumlah data penyakit tanaman dalam sistem',
        },
    ];

    if (isLoading) {
        return (
            <div className="py-5 text-center text-gray-600">
                <div className="mr-2 inline-block h-8 w-8 animate-spin rounded-full border-t-2 border-b-2 border-green-500"></div>
                Memuat data...
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-5 text-center text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 inline-block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Gagal memuat data: {error}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {counterData.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`${item.bgColor} relative overflow-hidden rounded-xl p-6 text-white shadow-lg transition-shadow duration-300 hover:shadow-xl`}
                >
                    <div className="absolute -top-1/2 -left-1/2 h-[200%] w-[200%] rotate-[30deg] bg-gradient-to-br from-white/20 to-transparent opacity-30"></div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="mb-4 rounded-full bg-white/20 p-4">{item.icon}</div>
                        <h3 className="mb-2 text-center text-xl font-semibold">{item.title}</h3>
                        <div className="my-3 text-center text-5xl font-bold">{item.value.toLocaleString()}</div>
                        <p className="text-center text-sm text-white/90">{item.description}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

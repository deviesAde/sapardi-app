import Header from '@/components/Auth/HeaderAuth';
import { usePage } from '@inertiajs/react';

interface Diagnosa {
    id: number;
    hasil_diagnosis: string;
    gambar_input: string;
    created_at: string;
    saran_penanganan: string;
}

export default function RiwayatScan() {
    const { props } = usePage<{ diagnosas: Diagnosa[] }>();
    const diagnosas = props.diagnosas;

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <header className="mt-4 mb-6 text-center">
                <h1 className="text-3xl font-bold text-green-700">History Scan</h1>
                <hr className="mt-2 border-t border-gray-300" />
            </header>
            <main className="min-h-screen bg-gray-100 px-4 py-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {diagnosas.map((item) => (
                        <div key={item.id} className="rounded-lg bg-white p-4 shadow-md hover:shadow-lg">
                            <h2 className="mb-2 text-lg font-semibold text-gray-800">{item.hasil_diagnosis}</h2>
                            <img src={item.gambar_input} alt={item.hasil_diagnosis} className="mb-3 h-70 w-full rounded object-cover" />
                            <p className="mb-1 text-sm text-gray-600">
                                <strong>Tanggal:</strong> {new Date(item.created_at).toLocaleDateString('id-ID')}
                            </p>
                            <p className="text-sm text-gray-700">
                                <strong>Saran Penanganan:</strong> {item.saran_penanganan}
                            </p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

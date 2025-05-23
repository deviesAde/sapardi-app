import Header from '@/components/Auth/HeaderAuth';
import { Button } from '@/components/ui/button';
import { usePage } from '@inertiajs/react';

export default function HasilDiagnosa() {
    const { label, image, penyakit } = usePage().props as {
        label?: string;
        image?: string;
        penyakit?: {
            nama_penyakit: string;
            deskripsi: string;
            penyebab: string;
            saran_penanganan: string;
        };
    };
    console.log('Hasil Diagnosa:', { label, image, penyakit });
    console.log('Image:', image);
    console.log('Label:', label);
    console.log('Penyakit:', penyakit);

    const handleClickButtonSelesai = () => {
        window.location.href = '/scan';
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <Header />

            {/* Main */}
            <main className="mx-auto max-w-6xl p-6">
                <h1 className="mb-6 text-center text-3xl font-bold text-green-700">Hasil Diagnosa</h1>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* Image + label */}
                    <div className="flex flex-col items-center justify-center">
                        <div className="relative w-full overflow-hidden rounded-lg shadow-lg">
                            <img src={image} alt="Hasil Diagnosa" className="w-full object-cover" />
                            {/* Bounding Box */}
                            <div className="bg-opacity-80 absolute top-[25%] left-[30%] border-2 border-orange-500 bg-orange-500 px-2 py-1 text-sm font-semibold text-white">
                                {label}
                            </div>
                        </div>
                        <Button className="mt-6 bg-green-700 text-white hover:bg-green-600" onClick={handleClickButtonSelesai}>
                            Selesai
                        </Button>
                    </div>

                    {/* Deskripsi Penyakit */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">Nama Penyakit :</h2>
                            <p className="mt-2 rounded-md bg-green-100 p-4 text-justify text-sm text-gray-800">
                                {penyakit?.nama_penyakit ?? 'Nama penyakit tidak ditemukan.'}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">Deskripsi Penyakit :</h2>
                            <p className="mt-2 rounded-md bg-green-100 p-4 text-justify text-sm text-gray-800">
                                {penyakit?.deskripsi ?? 'Deskripsi tidak tersedia.'}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">Penyebab :</h2>
                            <p className="mt-2 rounded-md bg-green-100 p-4 text-justify text-sm text-gray-800">
                                {penyakit?.penyebab ?? 'Penyebab belum tersedia.'}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">Saran Penanganan :</h2>
                            <p className="mt-2 rounded-md bg-green-100 p-4 text-justify text-sm text-gray-800">
                                {penyakit?.saran_penanganan ?? 'Saran tidak tersedia.'}
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

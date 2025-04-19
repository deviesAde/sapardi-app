import { Button } from '@/components/ui/button';
import { PageProps } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';

interface FlashProps {
    image: string;
    label: string;
}

interface Props extends PageProps {
    flash: FlashProps;
}

export default function HasilDiagnosa() {
    const { flash } = usePage<Props>().props;

    const image = flash.image; // <- path hasil prediksi
    const label = flash.label; // <- label hasil YOLO

    console.log('Image:', image);
    console.log('Label:', label);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="sticky top-0 z-10 mb-6 w-full bg-green-900 px-6 py-4 text-white shadow">
                <div className="mx-auto flex max-w-4xl items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <img src="/logo.png" alt="Logo" className="h-10" />
                        <span className="text-xl font-bold">SAPARDI</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="font-semibold text-white">Petani1</span>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-green-800">
                            <i className="fas fa-user"></i>
                        </div>
                    </div>
                </div>
            </header>

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
                        <Button className="mt-6 bg-green-700 text-white hover:bg-green-600">Selesai</Button>
                    </div>

                    {/* Deskripsi Penyakit */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">Nama Penyakit :</h2>
                            <p className="mt-2 rounded-md bg-green-100 p-4 text-justify text-sm text-gray-800">
                                Penyakit <strong>daun kering</strong> pada padi, yang juga dikenal sebagai blast atau hawar daun bakteri, adalah
                                penyakit yang disebabkan oleh jamur <em>Pyricularia oryzae</em> atau bakteri <em>Xanthomonas oryzae</em>. Penyakit ini
                                ditandai dengan munculnya bercak berwarna coklat keabu-abuan pada daun yang kemudian mengering, menyebar cepat, dan
                                menyebabkan daun mati. Kondisi ini biasanya muncul saat cuaca lembap dan basah, terutama pada fase vegetatif hingga
                                generatif padi. Serangan parah dapat menurunkan hasil panen secara signifikan karena menghambat proses fotosintesis
                                tanaman.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">Saran Penanganan :</h2>
                            <p className="mt-2 rounded-md bg-green-100 p-4 text-justify text-sm text-gray-800">
                                Penanganan penyakit daun kering dapat dilakukan melalui pendekatan terpadu, seperti menanam varietas padi yang tahan
                                penyakit, menjaga jarak tanam agar sirkulasi udara baik, dan menghindari pemupukan nitrogen secara berlebihan. Jika
                                serangan sudah terjadi, petani bisa menggunakan fungisida berbahan aktif seperti triazol atau strobilurin untuk
                                penyakit jamur, serta bakterisida jika penyebabnya adalah bakteri. Pengelolaan air yang baik dan rotasi tanaman juga
                                membantu mengurangi risiko penyebaran penyakit. Selain itu, monitoring secara rutin sangat penting untuk mendeteksi
                                gejala sejak dini.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

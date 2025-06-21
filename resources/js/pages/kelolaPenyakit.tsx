import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import Swal from 'sweetalert2';

type Penyakit = {
    id: number;
    nama_penyakit: string;
    deskripsi: string;
    penyebab: string;
    saran_penanganan: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kelola Penyakit',
        href: '/kelolaPenyakit',
    },
];

export default function KelolaPenyakit() {
    const { penyakit } = usePage<{ penyakit: Penyakit[] }>().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPenyakit, setEditingPenyakit] = useState<Penyakit | null>(null);
    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        reset,
        processing,
    } = useForm({
        nama_penyakit: '',
        deskripsi: '',
        penyebab: '',
        saran_penanganan: '',
    });

    const [expandedRow, setExpandedRow] = useState<number | null>(null);

    const toggleDetail = (id: number) => {
        setExpandedRow(expandedRow === id ? null : id); // Jika baris sudah diperluas, tutup; jika tidak, buka
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingPenyakit) {
            put(`/penyakit/${editingPenyakit.id}`, {
                onSuccess: () => {
                    reset();
                    setEditingPenyakit(null);
                    setIsModalOpen(false);
                    Swal.fire({
                        title: 'Berhasil!',
                        text: 'Data penyakit berhasil diperbarui.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                },
                onError: (errors) => {
                    Swal.fire({
                        title: 'Error!',
                        text: Object.values(errors).join('\n'),
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                },
            });
        } else {
            post('/penyakit', {
                onSuccess: () => {
                    reset();
                    setIsModalOpen(false);
                    Swal.fire({
                        title: 'Berhasil!',
                        text: 'Data penyakit berhasil ditambahkan.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                },
                onError: (errors) => {
                    Swal.fire({
                        title: 'Error!',
                        text: Object.values(errors).join('\n'),
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                },
            });
        }
    };

    const handleEdit = (penyakit: Penyakit) => {
        setEditingPenyakit(penyakit);
        setData({
            nama_penyakit: penyakit.nama_penyakit,
            deskripsi: penyakit.deskripsi,
            penyebab: penyakit.penyebab,
            saran_penanganan: penyakit.saran_penanganan,
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        const result = await Swal.fire({
            title: 'Apakah Anda yakin?',
            text: 'Data ini akan dihapus secara permanen!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal',
        });

        if (result.isConfirmed) {
            destroy(`/penyakit/${id}`, {
                onSuccess: () => {
                    Swal.fire('Terhapus!', 'Data penyakit berhasil dihapus.', 'success');
                },
                onError: () => {
                    Swal.fire('Error!', 'Gagal menghapus data penyakit.', 'error');
                },
            });
        }
    };

    const openCreateModal = () => {
        setEditingPenyakit(null);
        reset();
        setIsModalOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola Penyakit" />
            <div className="container mx-auto px-12 py-6">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-white-900 text-3xl font-bold">Kelola Penyakit</h1>
                        <p className="text-white-600 mt-2">Halaman untuk mengelola data penyakit</p>
                    </div>
                    <Button onClick={openCreateModal}>Tambah Penyakit Baru</Button>
                </div>

                {/* Penyakit List */}
                <div className="overflow-hidden rounded-lg bg-neutral-900 shadow">
                    <div className="w-full">
                        <table className="w-full divide-y divide-neutral-700">
                            <thead className="bg-neutral-800">
                                <tr>
                                    <th className="w-1/5 px-3 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase">
                                        Nama Penyakit
                                    </th>
                                    <th className="w-2/5 px-3 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase">
                                        Deskripsi
                                    </th>
                                    <th className="w-1/5 px-3 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase">Penyebab</th>
                                    <th className="w-1/5 px-3 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase">
                                        Saran Penanganan
                                    </th>
                                    <th className="w-1/5 px-3 py-3 text-center text-xs font-medium tracking-wider text-gray-300 uppercase">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-700 bg-neutral-900">
                                {penyakit.map((item) => (
                                    <>
                                        {/* Baris Utama */}
                                        <tr key={item.id} className="hover:bg-neutral-800">
                                            <td className="px-3 py-4 text-sm font-medium break-words text-gray-100">{item.nama_penyakit}</td>
                                            <td className="px-3 py-4 text-sm break-words text-gray-400">
                                                {expandedRow === item.id ? item.deskripsi : `${item.deskripsi.slice(0, 80)}...`}
                                            </td>
                                            <td className="px-3 py-4 text-sm break-words text-gray-400">
                                                {item.penyebab.length > 60 ? `${item.penyebab.slice(0, 60)}...` : item.penyebab}
                                            </td>
                                            <td className="px-3 py-4 text-sm break-words text-gray-400">
                                                {item.saran_penanganan.length > 60
                                                    ? `${item.saran_penanganan.slice(0, 60)}...`
                                                    : item.saran_penanganan}
                                            </td>
                                            <td className="px-3 py-4 text-center">
                                                <div className="flex flex-col justify-center gap-1 sm:flex-row">
                                                    <button
                                                        onClick={() => handleEdit(item)}
                                                        className="rounded-md px-2 py-1 text-xs whitespace-nowrap text-white"
                                                        style={{ backgroundColor: '#123524' }}
                                                    >
                                                        <Pencil className="mr-1 inline h-3 w-3" />
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="rounded-md bg-red-600 px-2 py-1 text-xs whitespace-nowrap text-white hover:bg-red-700"
                                                    >
                                                        <Trash2 className="mr-1 inline h-3 w-3" />
                                                        Hapus
                                                    </button>
                                                    <button
                                                        onClick={() => toggleDetail(item.id)}
                                                        className={`rounded-md bg-blue-600 px-2 py-1 text-xs whitespace-nowrap text-white hover:bg-blue-700 ${
                                                            expandedRow === item.id ? 'bg-gray-700' : ''
                                                        }`}
                                                    >
                                                        {expandedRow === item.id ? 'Tutup' : 'Detail'}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>

                                        {/* Baris Detail */}
                                        {expandedRow === item.id && (
                                            <tr>
                                                <td colSpan={5} className="bg-neutral-800 px-6 py-4 text-gray-300">
                                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                                        <div>
                                                            <h3 className="mb-2 text-sm font-medium text-gray-200">Deskripsi:</h3>
                                                            <p className="text-sm text-gray-300">{item.deskripsi}</p>
                                                        </div>
                                                        <div>
                                                            <h3 className="mb-2 text-sm font-medium text-gray-200">Penyebab:</h3>
                                                            <p className="text-sm text-gray-300">{item.penyebab}</p>
                                                        </div>
                                                        <div>
                                                            <h3 className="mb-2 text-sm font-medium text-gray-200">Saran Penanganan:</h3>
                                                            <p className="text-sm text-gray-300">{item.saran_penanganan}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Modal for Create/Edit */}
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>{editingPenyakit ? 'Edit Penyakit' : 'Tambah Penyakit Baru'}</DialogTitle>
                            <DialogDescription>
                                {editingPenyakit ? 'Perbarui informasi penyakit' : 'Tambahkan data penyakit baru ke sistem'}
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <label htmlFor="nama_penyakit" className="block text-sm font-medium text-gray-700">
                                        Nama Penyakit
                                    </label>
                                    <Input
                                        id="nama_penyakit"
                                        placeholder="Nama penyakit"
                                        className="mt-1 block w-full text-white"
                                        value={data.nama_penyakit}
                                        onChange={(e) => setData('nama_penyakit', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700">
                                        Deskripsi
                                    </label>
                                    <Input
                                        id="deskripsi"
                                        placeholder="Deskripsi penyakit"
                                        className="mt-1 block w-full text-white"
                                        value={data.deskripsi}
                                        onChange={(e) => setData('deskripsi', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="penyebab" className="block text-sm font-medium text-gray-700">
                                        Penyebab
                                    </label>
                                    <Input
                                        id="penyebab"
                                        placeholder="Penyebab penyakit"
                                        className="mt-1 block w-full text-white"
                                        value={data.penyebab}
                                        onChange={(e) => setData('penyebab', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="saran_penanganan" className="block text-sm font-medium text-gray-700">
                                        Saran Penanganan
                                    </label>
                                    <Input
                                        id="saran_penanganan"
                                        placeholder="Saran penanganan"
                                        className="mt-1 block w-full text-white"
                                        value={data.saran_penanganan}
                                        onChange={(e) => setData('saran_penanganan', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} disabled={processing}>
                                    Batal
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? (
                                        <span className="flex items-center">
                                            <svg
                                                className="mr-2 -ml-1 h-4 w-4 animate-spin text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Memproses...
                                        </span>
                                    ) : editingPenyakit ? (
                                        'Simpan Perubahan'
                                    ) : (
                                        'Tambah Penyakit'
                                    )}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}

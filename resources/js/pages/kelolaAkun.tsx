import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { Trash2, Pencil} from 'lucide-react';

type Account = {
    id: number;
    name: string;
    email: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kelola Akun',
        href: '/kelolaAkun',
    },
];

export default function KelolaAkun() {
    const { accounts } = usePage<{ accounts: Account[] }>().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAccount, setEditingAccount] = useState<Account | null>(null);
    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        reset,
        processing,
    } = useForm({
        name: '',
        email: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingAccount) {
            put(`/accounts/${editingAccount.id}`, {
                onSuccess: () => {
                    reset();
                    setEditingAccount(null);
                    setIsModalOpen(false);
                    Swal.fire({
                        title: 'Berhasil!',
                        text: 'Akun berhasil diperbarui.',
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
            post('/accounts', {
                onSuccess: () => {
                    reset();
                    Swal.fire({
                        title: 'Berhasil!',
                        text: 'Akun berhasil ditambahkan.',
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

    const handleEdit = (account: Account) => {
        setEditingAccount(account);
        setData({
            name: account.name,
            email: account.email,
            password: '',
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        const result = await Swal.fire({
            title: 'Apakah Anda yakin?',
            text: 'Anda tidak akan dapat mengembalikan ini!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal',
        });

        if (result.isConfirmed) {
            destroy(`/accounts/${id}`, {
                onSuccess: () => {
                    Swal.fire('Terhapus!', 'Akun telah dihapus.', 'success');
                },
                onError: () => {
                    Swal.fire('Error!', 'Gagal menghapus akun.', 'error');
                },
            });
        }
    };

    const openCreateModal = () => {
        setEditingAccount(null);
        reset();
        setIsModalOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola Akun" />
            <div className="container mx-auto px-4 py-6">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-white-900 text-3xl font-bold">Kelola Akun</h1>
                        <p className="text-white-600 mt-2">Halaman untuk mengelola akun pengguna sistem</p>
                    </div>
                    <Button onClick={openCreateModal}>Tambah Akun Baru</Button>
                </div>

                {/* Account List */}
                <div className="overflow-hidden rounded-lg bg-neutral-900 shadow">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-neutral-700">
                            <thead className="bg-neutral-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase">Nama</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase">Email</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-300 uppercase">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-700 bg-neutral-900">
                                {accounts.map((account) => (
                                    <tr key={account.id} className="hover:bg-neutral-800">
                                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-100">{account.name}</td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-400">{account.email}</td>
                                        <td className="space-x-2 px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                            <button
                                                onClick={() => handleEdit(account)}
                                                className="rounded-md px-3 py-1 text-sm text-white"
                                                style={{ backgroundColor: '#123524' }}
                                            >
                                                <Pencil className="mr-4 inline h-4 w-4" />
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(account.id)}
                                                className="rounded-md bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                                            >
                                                <Trash2 className="mr-4 inline h-4 w-4" />
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Modal for Create/Edit */}
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>{editingAccount ? 'Edit Akun' : 'Tambah Akun Baru'}</DialogTitle>
                            <DialogDescription>
                                {editingAccount ? 'Perbarui informasi akun pengguna' : 'Tambahkan akun pengguna baru ke sistem'}
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Nama
                                    </label>
                                    <Input
                                        id="name"
                                        placeholder="Nama lengkap"
                                        className="mt-1 block w-full text-white"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Alamat email"
                                        className="mt-1 block w-full text-white"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <Input
                                        id="password"
                                        type="password"
                                        className="mt-1 block w-full text-white"
                                        placeholder="Password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        required={!editingAccount}
                                    />
                                    {editingAccount && <p className="text-xs text-gray-500">Kosongkan jika tidak ingin mengubah password</p>}
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
                                    ) : editingAccount ? (
                                        'Simpan Perubahan'
                                    ) : (
                                        'Tambah Akun'
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

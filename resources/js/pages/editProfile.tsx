import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Swal from 'sweetalert2';
import { Inertia } from '@inertiajs/inertia';

export default function PengaturanAkun() {
    const nama = 'Petani 1';
    const email = 'Petani1@gmail.com';

    const handleLogOut = async () => {
        const result = await Swal.fire({
            title: 'Apakah Anda yakin ingin keluar?',
            text: 'Anda akan keluar dari akun ini.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Log Out',
            cancelButtonText: 'Batal',
        });

        if (result.isConfirmed) {
            Inertia.post(route('logout')); // Mengirim permintaan POST ke route logout

            Swal.fire({
                icon: 'success',
                title: 'Berhasil Keluar',
                text: 'Anda telah keluar dari akun.',
                confirmButtonColor: '#3085d6',
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-10">
            <h1 className="mb-6 text-3xl font-bold text-black">Pengaturan Akun</h1>
            <Card className="rounded-3xl border border-green-500 bg-green-100 p-8 shadow-md">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-black">Informasi Profil</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="mb-4">
                        <label className="font-semibold text-black">Nama Pengguna :</label>
                        <div className="flex items-center gap-4">
                            <Input disabled type="text" value={nama} />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="font-semibold text-black">Alamat E-mail</label>
                        <div className="flex items-center gap-4">
                            <Input disabled type="email" value={email} />
                        </div>
                    </div>

                    <div className="mt-10 text-right">
                        <button className="rounded bg-red-600 px-8 py-2 text-white" onClick={handleLogOut}>
                            Log Out
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

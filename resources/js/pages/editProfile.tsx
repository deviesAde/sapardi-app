import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Swal from 'sweetalert2';
import { Inertia } from '@inertiajs/inertia';
import Header from '@/components/Auth/HeaderAuth';
import { Button } from '@/components/ui/button';
import { MoveLeft } from 'lucide-react';

export default function PengaturanAkun({ auth }: { auth: { user: { name: string; email: string } } }) {
    const { name, email } = auth.user;

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
        <div className="min-h-screen bg-gray-100">
            <Header />

            <main className="mx-auto w-full max-w-full rounded bg-white p-6 shadow">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold text-green-600">Pengaturan Akun</h1>
                </div>
                <Card className="rounded-3xl border border-green-500 bg-green-100 p-8 shadow-md">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold text-black">Informasi Profil</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4">
                            <label className="font-semibold text-black">Nama Pengguna :</label>
                            <div className="flex items-center gap-4">
                                <Input disabled type="text" value={name} />
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
                        <Button className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600" onClick={() => (window.location.href = '/')}>
                            <MoveLeft className="mr-2 h-4 w-4" />
                            Kembali ke Home
                        </Button>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}

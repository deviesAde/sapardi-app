import Header from '@/components/Auth/HeaderAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Inertia } from '@inertiajs/inertia';
import { motion } from 'framer-motion';
import { Lock, Mail, MoveLeft, Settings, Shield, User } from 'lucide-react';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function PengaturanAkun({ auth }: { auth: { user: { name: string; email: string } } }) {
    const { name, email } = auth.user;
    const [isLoading, setIsLoading] = useState(false);

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
            setIsLoading(true);
            Inertia.post(route('logout'));
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-100">
            <Header />

            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mx-auto w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg"
            >
                <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-green-600">Pengaturan Akun</h1>
                    <p className="mt-2 text-gray-600">Kelola informasi profil dan keamanan akun Anda</p>
                </motion.div>

                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                    {/* Profile Information Card */}
                    <motion.div variants={itemVariants}>
                        <Card className="rounded-xl border border-green-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                            <CardHeader className="pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-green-100 p-3">
                                        <User className="h-6 w-6 text-green-600" />
                                    </div>
                                    <CardTitle className="text-xl font-semibold text-gray-800">Informasi Profil</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 font-medium text-gray-700">
                                        <User className="h-4 w-4" />
                                        Nama Pengguna
                                    </label>
                                    <Input disabled type="text" value={name} className="rounded-lg border-gray-300 bg-gray-50" />
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 font-medium text-gray-700">
                                        <Mail className="h-4 w-4" />
                                        Alamat E-mail
                                    </label>
                                    <Input disabled type="email" value={email} className="rounded-lg border-gray-300 bg-gray-50" />
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Account Actions Card */}
                    <motion.div variants={itemVariants}>
                        <Card className="rounded-xl border border-blue-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                            <CardHeader className="pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-blue-100 p-3">
                                        <Settings className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <CardTitle className="text-xl font-semibold text-gray-800">Aksi Akun</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <Button
                                        variant="outline"
                                        className="flex items-center gap-2 rounded-lg border-green-300 text-green-600 hover:bg-green-50"
                                        onClick={() => (window.location.href = '/')}
                                    >
                                        <MoveLeft className="h-4 w-4" />
                                        Kembali ke Home
                                    </Button>

                                    <Button
                                        variant="destructive"
                                        className="flex items-center gap-2 rounded-lg"
                                        onClick={handleLogOut}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                        ) : (
                                            <Lock className="h-4 w-4" />
                                        )}
                                        Keluar dari Akun
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Security Tips Card */}
                    <motion.div variants={itemVariants}>
                        <Card className="rounded-xl border border-amber-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                            <CardHeader className="pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-amber-100 p-3">
                                        <Shield className="h-6 w-6 text-amber-600" />
                                    </div>
                                    <CardTitle className="text-xl font-semibold text-gray-800">Tips Keamanan</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1 h-2 w-2 rounded-full bg-amber-500"></span>
                                        <span>Jangan bagikan kata sandi Anda dengan siapapun</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1 h-2 w-2 rounded-full bg-amber-500"></span>
                                        <span>Gunakan kata sandi yang kuat dan unik</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1 h-2 w-2 rounded-full bg-amber-500"></span>
                                        <span>Selalu keluar dari akun saat menggunakan perangkat bersama</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>
            </motion.main>
        </div>
    );
}

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kelola Penyakit',
        href: '/kelolaPenyakit',
    },
];

export default function KelolaPenyakit() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola Penyakit" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-2xl font-bold">Kelola Penyakit</h1>
                <p>Halaman ini digunakan untuk mengelola data penyakit.</p>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[50vh] flex-1 overflow-hidden rounded-xl border">
                    {/* Tambahkan konten atau komponen pengelolaan penyakit di sini */}
                </div>
            </div>
        </AppLayout>
    );
}

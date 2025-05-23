import { CounterData } from '@/components/counter-data';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { PageProps } from '@inertiajs/core';
import { Head } from '@inertiajs/react';

interface DashboardProps extends PageProps {
    counts?: {
        total_users: number;
        total_diseases: number;
        active_users: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ counts }: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Counter Data Section */}
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border p-4">
                    <div className="w-full overflow-x-auto">
                        {/* Menggunakan props counts langsung jika tersedia, fallback ke API */}
                        {counts ? <CounterData counts={counts} /> : <CounterData apiEndpoint="/api/dashboard/counts" />}
                    </div>
                </div>
                {/* Additional Content Section */}
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    {/* Konten tambahan bisa dimasukkan di sini */}
                </div>
            </div>
        </AppLayout>
    );
}

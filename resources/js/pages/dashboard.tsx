import { CounterData } from '@/components/counter-data';
import UserStatusLog from '@/components/user-log';
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

type User = {
    id: string;
    name: string;
    email: string;
    status: 'online' | 'offline';
    lastActive: string;
    device: string;
};

interface DashboardProps {
    users: User[];
}

export default function Dashboard({ users, counts }: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border p-4">
                    <div className="w-full overflow-x-auto">
                        {/* Menggunakan props counts langsung jika tersedia, fallback ke API */}
                        {counts ? <CounterData counts={counts} /> : <CounterData apiEndpoint="/api/dashboard/counts" />}
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative h-[400px] overflow-hidden rounded-xl border">
                    <div className="text-sidebar-foreground p-4 text-center text-lg font-bold">Aktivitas Pengguna</div>
                    <UserStatusLog users={users} />
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min"></div>
                {/* Additional Content Section */}
                {/* <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    {/* Konten tambahan bisa dimasukkan di sini */}
                {/* </div> */} */
            </div>
        </AppLayout>
    );
}

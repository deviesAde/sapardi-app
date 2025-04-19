import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ChartBar } from '@/components/chart-user';
import { TableDashboard } from '@/components/table-dashboard';
import { CalendarDash } from '@/components/calender-dashboard';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {/* Elemen pertama */}
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border md:row-span-2 ">
                        <div className="text-sidebar-foreground p-4 text-center text-lg font-bold">Tanggal Hari Ini</div>
                            <CalendarDash />

                    </div>

                    {/* Elemen kedua */}
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative h-[400px] overflow-hidden rounded-xl border">
                        <ChartBar />
                    </div>

                    {/* Elemen ketiga */}
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative h-[400px] overflow-hidden rounded-xl border">
                        <TableDashboard />
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min"></div>
            </div>
        </AppLayout>
    );
}

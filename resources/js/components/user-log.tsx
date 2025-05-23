import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useEffect, useState } from 'react';

// Tipe data User sesuai data yang kamu terima
interface User {
    id: string;
    name: string;
    email: string;
    status: 'online' | 'offline';
    lastActive: string; // tanggal string ISO dari backend
    device: string;
}

// Fungsi format relative time
function formatRelativeTime(dateString: string | null): string {
    if (!dateString) return 'unknown';

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'unknown';

    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} day${days > 1 ? 's' : ''} ago`;
    }
}
// Props untuk komponen
interface UserStatusLogProps {
    users: User[];
}

export default function UserStatusLog({ users }: UserStatusLogProps) {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(interval);
    }, []);

    const onlineCount = users.filter((user) => user.status === 'online').length;

    return (
        <Table>
            <TableCaption>User status log - {users.length} total users</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[250px]">User</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Device</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src={'/placeholder.svg'} alt={user.name} />
                                    <AvatarFallback>
                                        {user.name
                                            .split(' ')
                                            .map((n) => n[0])
                                            .join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-medium">{user.name}</div>
                                    <div className="text-muted-foreground text-sm">{user.email}</div>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            <Badge variant={user.status === 'online' ? 'success' : 'secondary'} className="px-2 py-1">
                                <div className="flex items-center gap-1.5">
                                    <div className={`h-2 w-2 rounded-full ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                                    <span>{user.status === 'online' ? 'Online' : 'Offline'}</span>
                                </div>
                            </Badge>
                            {user.status === 'offline' && (
                                <div className="text-muted-foreground mt-1 text-xs">offline for {formatRelativeTime(user.lastActive)}</div>
                            )}
                        </TableCell>
                        <TableCell>{formatRelativeTime(user.lastActive)}</TableCell>
                        <TableCell>{user.device}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Online Users</TableCell>
                    <TableCell>
                        {onlineCount} of {users.length}
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}



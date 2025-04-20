import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const users = [
    {
        name: 'John Doe',
        email: 'john.doe@example.com',
        
    },
    {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
    },
    {
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
    },
    {
        name: 'Bob Brown',
        email: 'bob.brown@example.com',
    },
];

export function TableDashboard() {
    return (
        <Table>

            <TableHeader>
                <TableRow>
                    <TableHead className="w-[200px]">Name</TableHead>
                    <TableHead>Email</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

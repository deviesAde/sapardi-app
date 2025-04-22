'use client';
import { MobileNav, MobileNavHeader, MobileNavMenu, MobileNavToggle, Navbar, NavbarLogo, NavBody } from '@/components/ui/resizable-navbar';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';
import { CircleUserRound } from 'lucide-react';
import { useState } from 'react';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {Link} from '@inertiajs/react';


export function HeaderAuth() {
    const { auth } = usePage<{ auth: { user?: { id: number; name: string } } }>().props; // Mengambil data autentikasi dari backend
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        Inertia.post('/logout'); // Mengirim permintaan logout ke backend
    };

    return (
        <div className="relative w-full bg-[#123524]">
            <Navbar>
                <NavBody>
                    <NavbarLogo />

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Link href="/edit">
                                <CircleUserRound className="h-8 w-8 text-[#F4D793]" />
                            </Link>
                            <span className="text-[#F4D793]">{auth.user?.name}</span>
                        </div>

                        <Button variant="destructive" onClick={handleLogout}>
                            <LogOut className="mr-2 h-4 w-4" /> Logout
                        </Button>
                    </div>
                </NavBody>

                <MobileNav>
                    <MobileNavHeader>
                        <NavbarLogo />
                        <MobileNavToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
                    </MobileNavHeader>

                    <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
                        <div className="flex w-full flex-col gap-4">
                            <button
                                onClick={handleLogout}
                                className="rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                            >
                                Logout
                            </button>
                        </div>
                    </MobileNavMenu>
                </MobileNav>
            </Navbar>
        </div>
    );
}

export default HeaderAuth;

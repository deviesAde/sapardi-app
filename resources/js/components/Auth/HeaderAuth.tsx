'use client';
import {
    MobileNav,
    MobileNavHeader,
    MobileNavMenu,
    MobileNavToggle,
    Navbar,
    NavbarButton,
    NavbarLogo,
    NavBody,
    NavItems,
} from '@/components/ui/resizable-navbar';
import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/react';
import { CircleUserRound, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';

export function HeaderAuth() {
    const { auth } = usePage<{ auth: { user?: { id: number; name: string } } }>().props; // Mengambil data autentikasi dari backend
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false); // Menambahkan state untuk deteksi scroll

    const navItems = [
        {
            name: 'Home',
            link: '/',
        },
        {
            name: 'Lihat Profil',
            link: '/edit',
        },
    ];

    // Effect untuk memantau scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false); // Jika di atas, beri warna pada header
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        Inertia.post(
            '/logout',
            {},
            {
                onSuccess: () => {
                    console.log('Berhasil logout');
                },
                onError: () => {
                    console.error('Gagal logout');
                },
            },
        );
    };

    return (
        <div className="relative w-full">
            <Navbar
                className={`${
                    isScrolled
                        ? 'fixed top-0 left-0 w-full bg-[rgba(18,53,36,0)] shadow-none' // transparansi lebih kuat saat floating
                        : 'bg-[#123524]'
                } transition-all duration-300`}
            >
                <NavBody>
                    <NavbarLogo />
                    <NavItems items={navItems} className="text-[#F4D793]" />

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Link href="/edit">
                                <CircleUserRound className="h-8 w-8 text-[#F4D793]" />
                            </Link>
                            <span className="text-[#F4D793]">{auth.user?.name}</span>
                        </div>

                        <div className="flex flex-col items-center gap-4">
                            <NavbarButton onClick={handleLogout} variant="primary" className="inline-flex bg-[#eb1026] text-[#edf5f1]">
                                <LogOut className="mr-2 h-4 w-4" />
                                Logout
                            </NavbarButton>
                        </div>
                    </div>
                </NavBody>

                <MobileNav>
                    <MobileNavHeader>
                        <NavbarLogo />
                        <MobileNavToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
                    </MobileNavHeader>

                    <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
                        <div className="flex flex-col gap-4">
                            {navItems.map((item, idx) => (
                                <Link
                                    key={`mobile-link-${idx}`}
                                    href={item.link}
                                    className="block text-[#F4D793]"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="flex flex-col items-center gap-4">
                                <NavbarButton onClick={handleLogout} variant="primary" className="inline-flex bg-[#eb1026] text-[#edf5f1]">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Logout
                                </NavbarButton>
                            </div>
                        </div>
                    </MobileNavMenu>
                </MobileNav>
            </Navbar>
        </div>
    );
}

export default HeaderAuth;

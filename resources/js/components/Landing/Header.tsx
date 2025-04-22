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
import { useState } from 'react';

export function Header() {
    const navItems = [
        {
            name: 'Home',
            link: '#Hero',
        },
        {
            name: 'Tentang Kami',
            link: '#feature',
        },
        {
            name: 'Fitur Kami',
            link: '#features',
        },
    ];

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="relative w-full bg-[#123524]">
            <Navbar>
                <NavBody>
                    <NavbarLogo />
                    <NavItems items={navItems} className="text-[#F4D793]" />
                    <div className="flex items-center gap-4">
                        <NavbarButton href={route('login')} variant="primary" className="bg-[#F4D793] text-[#123524]">
                            Masuk
                        </NavbarButton>
                    </div>
                </NavBody>

                <MobileNav>
                    <MobileNavHeader>
                        <NavbarLogo />
                        <MobileNavToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
                    </MobileNavHeader>

                    <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
                        {navItems.map((item, idx) => (
                            <a
                                key={`mobile-link-${idx}`}
                                href={item.link}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="relative text-[#F4D793]"
                            >
                                <span className="block">{item.name}</span>
                            </a>
                        ))}
                        <div className="flex w-full flex-col gap-4">
                            <NavbarButton
                                href={route('login')}
                                onClick={() => setIsMobileMenuOpen(false)}
                                variant="primary"
                                className="w-full bg-[#F4D793] text-[#123524]"
                            >
                                Masuk
                            </NavbarButton>
                        </div>
                    </MobileNavMenu>
                </MobileNav>
            </Navbar>
        </div>
    );
}

export default Header;

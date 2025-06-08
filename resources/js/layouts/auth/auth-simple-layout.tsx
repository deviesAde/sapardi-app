import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden p-6 md:p-10">
            {/* Animated background with custom colors */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#123524] via-[#1a4a32] to-[#67AE6E] opacity-90"></div>

            {/* Animated floating elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 h-32 w-32 animate-pulse rounded-full bg-white/5 blur-xl"></div>
                <div className="absolute top-3/4 right-1/4 h-24 w-24 animate-pulse rounded-full bg-white/3 blur-lg delay-1000"></div>
                <div className="absolute bottom-1/4 left-1/3 h-20 w-20 animate-bounce rounded-full bg-[#67AE6E]/20 blur-md delay-2000"></div>
            </div>

            {/* Main content container */}
            <div className="relative z-10 w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    {/* Header section with enhanced styling */}
                    <div className="flex flex-col items-center gap-6">
                        <Link
                            href={route('home')}
                            className="group flex flex-col items-center gap-3 font-medium transition-all duration-300 hover:scale-105"
                        >
                            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:bg-white/15 group-hover:shadow-xl">
                                <AppLogoIcon className="h-6 w-6 fill-current text-white" />
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-3 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight text-white">{title}</h1>
                            <p className="mx-auto max-w-xs text-sm leading-relaxed text-white/70">{description}</p>
                        </div>
                    </div>

                    {/* Children content with enhanced container */}
                    <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-md">{children}</div>
                </div>
            </div>

            {/* Subtle grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                    backgroundSize: '20px 20px',
                }}
            ></div>
        </div>
    );
}

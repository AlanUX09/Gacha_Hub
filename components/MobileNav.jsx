"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Home, Gamepad2, Newspaper, Settings, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import BottomSheet from './BottomSheet';

export default function MobileNav() {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    // prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    const navItems = [
        { name: 'Inicio', href: '/', icon: Home },
        { name: 'Catálogo', href: '/juegos', icon: Gamepad2 },
        { name: 'Novedades', href: '/novedades', icon: Newspaper },
        { name: 'Ajustes', href: '/ajustes', icon: Settings },
    ];

    return (
        <>
            <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-20 bg-white/80 backdrop-blur-md border-t border-zinc-200 dark:bg-[#1A1A1A]/80 dark:border-zinc-800 md:hidden pb-safe">
                {navItems.map((item) => {
                    const isActive = (pathname === item.href && item.href !== '/ajustes') || (item.href !== '/' && pathname.startsWith(item.href) && item.href !== '/ajustes') || (item.name === 'Ajustes' && isSettingsOpen);

                    // Special case for Settings which opens the Bottom Sheet
                    if (item.name === 'Ajustes') {
                        return (
                            <button
                                key={item.name}
                                onClick={() => setIsSettingsOpen(true)}
                                className="flex flex-col items-center justify-center relative w-16 h-full cursor-pointer"
                                title={item.name}
                            >
                                {/* Active Indicator Top Line */}
                                {isActive && (
                                    <div className="absolute top-0 w-6 h-1 rounded-b-full bg-zinc-900 dark:bg-white" />
                                )}

                                <div className={`
                  flex items-center justify-center transition-all duration-300
                  ${isActive
                                        ? 'flex-row gap-2 px-4 py-2 mt-1 rounded-2xl bg-[#27272A] text-white dark:bg-white dark:text-zinc-900 w-auto'
                                        : 'text-zinc-500 dark:text-zinc-400 p-2'
                                    }
                `}>
                                    <item.icon className={`shrink-0 ${isActive ? 'w-5 h-5' : 'w-6 h-6'}`} />

                                    {isActive && (
                                        <span className="text-sm font-semibold truncate animate-in fade-in zoom-in duration-200">
                                            {item.name}
                                        </span>
                                    )}
                                </div>
                            </button>
                        );
                    }

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex flex-col items-center justify-center relative w-16 h-full"
                            title={item.name}
                        >
                            {/* Active Indicator Top Line */}
                            {isActive && (
                                <div className="absolute top-0 w-6 h-1 rounded-b-full bg-zinc-900 dark:bg-white" />
                            )}

                            <div className={`
              flex items-center justify-center transition-all duration-300
              ${isActive
                                    ? 'flex-row gap-2 px-4 py-2 mt-1 rounded-2xl bg-[#27272A] text-white dark:bg-white dark:text-zinc-900 w-auto'
                                    : 'text-zinc-500 dark:text-zinc-400 p-2'
                                }
            `}>
                                <item.icon className={`shrink-0 ${isActive ? 'w-5 h-5' : 'w-6 h-6'}`} />

                                {isActive && (
                                    <span className="text-sm font-semibold truncate animate-in fade-in zoom-in duration-200">
                                        {item.name}
                                    </span>
                                )}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* Settings Bottom Sheet Instance */}
            <BottomSheet
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                title="Más opciones"
            >
                {/* Options List */}
                <div className="flex flex-col w-full">
                    {/* Theme Section */}
                    <div className="flex flex-col gap-3">
                        <span className="text-sm text-zinc-500 dark:text-zinc-400 font-medium ml-1">Otros</span>

                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="flex items-center gap-4 w-full h-[52px] px-4 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-[#27272A] dark:hover:bg-[#333333] transition-colors"
                        >
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700/50 text-zinc-700 dark:text-zinc-300">
                                {mounted && (theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />)}
                            </div>
                            <span className="text-base font-semibold text-zinc-900 dark:text-white">
                                {mounted ? (theme === 'dark' ? 'Dark mode' : 'Light mode') : 'Loading...'}
                            </span>
                        </button>
                    </div>

                    {/* Version Details */}
                    <div className="w-full text-center mt-3">
                        <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">Gacha Hub v1.0.0</p>
                    </div>
                </div>
            </BottomSheet>
        </>
    );
}

"use client";

import { useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import MobileNav from '@/components/MobileNav';

export default function ClientLayout({ children }) {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    const pathname = usePathname();

    // Initialize sidebar state based on screen size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsSidebarExpanded(false);
            } else {
                setIsSidebarExpanded(true);
            }
        };

        handleResize(); // run once on mount
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Close sidebar on tablet when navigating
    useEffect(() => {
        if (window.innerWidth < 1024) {
            setIsSidebarExpanded(false);
        }
    }, [pathname]);

    // Consider window size? By default, on mobile Sidebar is hidden entirely, so its width doesn't affect margin,
    // but we can just let Tailwind handle the flex sizes.
    // The layoutwrapper on desktop should be md:ml-64 or md:ml-20.

    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Sidebar isExpanded={isSidebarExpanded} />

            {/* Tablet Overlay - Click to close */}
            {isSidebarExpanded && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsSidebarExpanded(false)}
                />
            )}

            <div className={`flex flex-col h-screen overflow-hidden w-full pb-20 md:pb-0 transition-all duration-300 ${isSidebarExpanded ? 'lg:ml-64 lg:w-[calc(100%-16rem)]' : 'lg:ml-[68px] lg:w-[calc(100%-68px)]'}`}>
                <Header onToggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)} />

                <div className="flex-1 overflow-y-auto w-full">
                    <main className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
                        {children}
                    </main>
                </div>
            </div>

            <MobileNav />
        </ThemeProvider>
    );
}

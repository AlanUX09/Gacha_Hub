"use client";

import { useState, useMemo } from 'react';
import data from '@/mock_data.json';
import Link from 'next/link';

const ALL_TAGS = Array.from(new Set(data.updates.flatMap(u => u.tags)));

export default function NewsPage() {
    const { games, updates } = data;

    const [searchQuery, setSearchQuery] = useState('');
    const [activeTag, setActiveTag] = useState('All');

    const filteredUpdates = useMemo(() => {
        let result = [...updates].sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(u =>
                u.title.toLowerCase().includes(q) ||
                u.summary.toLowerCase().includes(q)
            );
        }

        if (activeTag !== 'All') {
            result = result.filter(u => u.tags.includes(activeTag));
        }

        return result;
    }, [searchQuery, activeTag, updates]);

    return (
        <div className="space-y-10 animate-in fade-in duration-500 relative pb-10">
            <div className="text-center md:text-left px-2">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 flex items-center justify-center md:justify-start gap-4 tracking-tight drop-shadow-sm">
                    <span className="w-2.5 h-12 rounded-full bg-gradient-to-b from-purple-500 to-pink-500 shadow-lg shadow-purple-500/20"></span>
                    Últimas Novedades
                </h1>
                <p className="text-gray-400 text-lg md:text-xl md:pl-3 text-balance">Mantente al tanto de todos los anuncios, eventos y recompensas.</p>
            </div>

            {/* Filters & Search */}
            <div className="bg-[#12121a]/95 backdrop-blur-xl p-6 rounded-[2rem] border border-white/10 space-y-6 sticky top-20 z-40 shadow-2xl shadow-black/50 mx-2">
                <div className="relative">
                    <svg className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Buscar por título o contenido..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#0a0a0e] border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all font-medium text-lg shadow-inner"
                    />
                </div>

                <div className="flex flex-wrap gap-2.5">
                    <button
                        onClick={() => setActiveTag('All')}
                        className={`px-5 py-2.5 rounded-full text-sm font-bold tracking-wide uppercase transition-all duration-300 ${activeTag === 'All'
                                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/40 scale-105'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200 border border-white/5 hover:border-white/10'
                            }`}
                    >
                        Todos
                    </button>
                    {ALL_TAGS.map(tag => (
                        <button
                            key={tag}
                            onClick={() => setActiveTag(tag)}
                            className={`px-5 py-2.5 rounded-full text-sm font-bold tracking-wide uppercase transition-all duration-300 ${activeTag === tag
                                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/40 scale-105'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200 border border-white/5 hover:border-white/10'
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Feed */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 px-2">
                {filteredUpdates.length === 0 ? (
                    <div className="col-span-full py-20 text-center flex flex-col items-center justify-center text-gray-500 bg-[#12121a] rounded-[2rem] border border-white/5 shadow-inner">
                        <svg className="w-16 h-16 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <p className="text-xl font-medium text-gray-400">No se encontraron novedades.</p>
                        <p className="text-sm mt-2">Prueba ajustando los filtros o la búsqueda.</p>
                    </div>
                ) : (
                    filteredUpdates.map(update => {
                        const game = games.find(g => g.id === update.game_id);
                        return (
                            <div key={update.id} className="group flex flex-col bg-[#12121a] rounded-[2rem] border border-white/5 overflow-hidden hover:border-purple-500/40 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-1">
                                <div className="p-1.5 pb-0">
                                    <div className="relative aspect-video rounded-[1.5rem] overflow-hidden mb-5 border border-white/5">
                                        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
                                        <img src={update.thumbnail_url} alt={update.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#12121a]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <Link href={`/juegos/${game?.slug}`} className="absolute top-3 left-3 flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold text-white border border-white/10 shadow-lg hover:bg-black transition-colors hover:scale-105 active:scale-95 duration-200">
                                            <img src={game?.icon_url} alt="" className="w-5 h-5 rounded-md object-cover" />
                                            {game?.name}
                                        </Link>
                                    </div>
                                </div>

                                <div className="px-7 pb-7 flex flex-col flex-1">
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="text-xs font-medium text-gray-400 flex items-center gap-1.5">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                            {new Date(update.published_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </span>
                                        <div className="flex gap-2 ml-auto overflow-hidden">
                                            {update.tags.map(tag => (
                                                <span key={tag} className="px-2.5 py-1 bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-lg text-[9px] font-bold uppercase tracking-wider whitespace-nowrap shadow-sm">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <h2 className="text-xl font-bold text-gray-100 mb-3 group-hover:text-purple-400 transition-colors leading-snug">
                                        {update.title}
                                    </h2>

                                    <p className="text-gray-400 leading-relaxed text-sm mt-auto">
                                        {update.summary}
                                    </p>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    );
}

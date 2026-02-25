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
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 flex items-center justify-center md:justify-start gap-4 tracking-tight text-foreground">
                    <span className="w-2.5 h-12 rounded-full bg-primary"></span>
                    Últimas Novedades
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl md:pl-3 text-balance font-medium">Mantente al tanto de todos los anuncios, eventos y recompensas.</p>
            </div>

            {/* Filters & Search */}
            <div className="bg-card p-6 rounded-3xl border border-border space-y-6 sticky top-20 z-40 shadow-lg mx-2">
                <div className="relative">
                    <svg className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Buscar por título o contenido..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-background border border-border rounded-xl py-4 pl-14 pr-6 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium text-lg shadow-inner"
                    />
                </div>

                <div className="flex flex-wrap gap-2.5">
                    <button
                        onClick={() => setActiveTag('All')}
                        className={`px-5 py-2.5 rounded-full text-sm font-bold tracking-wide uppercase transition-all duration-300 ${activeTag === 'All'
                            ? 'bg-primary text-primary-foreground shadow-md scale-105'
                            : 'bg-secondary text-secondary-foreground hover:bg-muted font-medium border border-border'
                            }`}
                    >
                        Todos
                    </button>
                    {ALL_TAGS.map(tag => (
                        <button
                            key={tag}
                            onClick={() => setActiveTag(tag)}
                            className={`px-5 py-2.5 rounded-full text-sm font-bold tracking-wide uppercase transition-all duration-300 ${activeTag === tag
                                ? 'bg-primary text-primary-foreground shadow-md scale-105'
                                : 'bg-secondary text-secondary-foreground hover:bg-muted font-medium border border-border'
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 px-2">
                {filteredUpdates.length === 0 ? (
                    <div className="col-span-full py-20 text-center flex flex-col items-center justify-center text-muted-foreground bg-card rounded-3xl border border-border shadow-inner">
                        <svg className="w-16 h-16 text-muted-foreground/50 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <p className="text-xl font-medium text-foreground">No se encontraron novedades.</p>
                        <p className="text-sm mt-2">Prueba ajustando los filtros o la búsqueda.</p>
                    </div>
                ) : (
                    filteredUpdates.map(update => {
                        const game = games.find(g => g.id === update.game_id);
                        return (
                            <div key={update.id} className="group flex flex-col bg-card text-card-foreground rounded-3xl border border-border overflow-hidden hover:border-primary/40 hover:shadow-xl transition-all duration-500">
                                <div className="p-1.5 pb-0">
                                    <div className="relative aspect-video rounded-2xl overflow-hidden mb-5 border border-border">
                                        <div className="absolute inset-0 bg-muted animate-pulse" />
                                        <img src={update.thumbnail_url} alt={update.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <Link href={`/juegos/${game?.slug}`} className="absolute top-3 left-3 flex items-center gap-2 bg-secondary/90 backdrop-blur-sm px-3 py-1.5 rounded-xl text-xs font-bold text-secondary-foreground border border-border shadow-md hover:bg-secondary transition-all">
                                            <img src={game?.icon_url} alt="" className="w-5 h-5 rounded-md object-cover" />
                                            {game?.name}
                                        </Link>
                                    </div>
                                </div>

                                <div className="px-7 pb-7 flex flex-col flex-1">
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                            {new Date(update.published_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </span>
                                        <div className="flex gap-2 ml-auto overflow-hidden">
                                            {update.tags.map(tag => (
                                                <span key={tag} className="px-2.5 py-1 bg-accent text-accent-foreground border border-border rounded-lg text-[9px] font-bold uppercase tracking-wider whitespace-nowrap">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">
                                        {update.title}
                                    </h2>

                                    <p className="text-muted-foreground leading-relaxed text-sm mt-auto">
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

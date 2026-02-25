"use client";

import React, { useState } from 'react';

// Si tienes un archivo mock_data.json, puedes importarlo aquí.
// Por ahora, usamos datos locales para visualización inmediata.
const MOCK_GAMES = Array(12).fill({
    id: 1,
    name: "Wuthering Waves",
    developer: "Kuro Games",
    year: "2024",
    platform: ["PC", "Android", "iOS"],
    region: "Global",
    genres: ["ARPG", "Open World"],
    slug: "wuthering-waves"
}).map((game, index) => ({ ...game, id: index + 1 }));

const TAGS = ["All", "Global", "Japan", "Korea", "Global & SEA"];

export default function CatalogPage() {
    const [activeTag, setActiveTag] = useState("All");

    return (
        <div className="flex flex-col gap-6 p-4 md:p-6 w-full max-w-[1600px] mx-auto min-h-screen bg-background text-foreground font-sans">

            {/* 2. Title Header */}
            <header className="flex items-center gap-4 md:gap-6 w-full">
                <div className="bg-card border border-border rounded-2xl size-16 md:size-20 shrink-0 flex items-center justify-center text-primary">
                    {/* Placeholder de Icono */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><path d="M3 9h18" /><path d="M9 21V9" /></svg>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground">Juegos</h1>
                    <p className="text-sm md:text-base text-muted-foreground">Explora el catálogo completo de títulos Gacha.</p>
                </div>
            </header>

            {/* 3. Contenedor de Columnas */}
            <div className="flex flex-col md:flex-row gap-6">

                {/* 4. Columna Izquierda: Sidebar de Filtros (Tablet y Desktop) */}
                <aside className="hidden md:flex flex-col w-64 shrink-0 gap-6">
                    <div className="bg-card border border-border rounded-lg p-4 flex flex-col gap-6 h-fit sticky top-24">

                        {/* Keywords Section */}
                        <div className="flex flex-col gap-3">
                            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Keywords</h3>
                            <div className="flex flex-wrap gap-2">
                                {["Gacha", "Action", "RPG", "Open World", "Strategy"].map(tag => (
                                    <span key={tag} className="bg-secondary text-secondary-foreground rounded-md px-2 py-1 text-xs font-medium cursor-pointer hover:bg-accent transition-colors">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* List Section (Checkboxes) */}
                        <div className="flex flex-col gap-3">
                            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Plataformas</h3>
                            <div className="flex flex-col gap-2">
                                {["PC", "Mobile", "Console"].map(item => (
                                    <label key={item} className="flex items-center gap-2 cursor-pointer group">
                                        <div className="size-4 rounded border border-border bg-muted flex items-center justify-center transition-colors group-hover:border-primary">
                                            {/* Simulate checkbox check */}
                                            <div className="size-2 bg-primary rounded-sm opacity-0 group-hover:opacity-20"></div>
                                        </div>
                                        <span className="text-sm text-foreground">{item}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Slider Section (Mock) */}
                        <div className="flex flex-col gap-3">
                            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Año Lanzamiento</h3>
                            <div className="relative w-full h-1 bg-muted rounded-full mt-2">
                                <div className="absolute left-0 top-0 h-full w-2/3 bg-primary rounded-full"></div>
                                <div className="absolute left-[66%] top-1/2 -translate-y-1/2 size-4 bg-primary rounded-full shadow-sm border-2 border-background cursor-pointer"></div>
                            </div>
                            <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                                <span>2015</span>
                                <span>2025</span>
                            </div>
                        </div>

                    </div>
                </aside>

                {/* 5. Columna Derecha: Contenido Principal */}
                <main className="flex-1 flex flex-col gap-6 w-full">

                    {/* 5A. Barra de Búsqueda y Tags (Tool bar) */}
                    <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between w-full">

                        <div className="flex items-center gap-3 w-full md:w-auto">
                            {/* Mobile Filter Button */}
                            <button className="flex items-center justify-center size-10 rounded-full bg-card border border-border shrink-0 md:hidden text-foreground hover:bg-accent transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>
                            </button>

                            {/* Search Input */}
                            <div className="relative w-full md:w-64">
                                <input
                                    type="text"
                                    placeholder="Buscar juegos..."
                                    className="w-full bg-card border border-border rounded-full px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-all"
                                />
                            </div>
                        </div>

                        {/* Tags de Región */}
                        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                            {TAGS.map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => setActiveTag(tag)}
                                    className={`whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all ${activeTag === tag
                                            ? "bg-foreground text-background"
                                            : "bg-secondary text-secondary-foreground hover:bg-accent"
                                        }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 5B. Grilla de Tarjetas (Game Cards) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 w-full">
                        {MOCK_GAMES.map((game) => (
                            <div key={game.id} className="group bg-card border border-border rounded-lg overflow-hidden flex flex-col hover:border-primary/50 transition-all cursor-pointer shadow-sm hover:shadow-md">

                                {/* Banner */}
                                <div className="bg-destructive h-32 md:h-40 relative flex items-center justify-center overflow-hidden">
                                    <span className="text-5xl font-bold text-destructive-foreground opacity-50 select-none group-hover:scale-110 transition-transform duration-500">WW</span>

                                    {/* Íconos de Plataforma */}
                                    <div className="absolute bottom-2 right-2 flex gap-1">
                                        {Array(3).fill(0).map((_, i) => (
                                            <div key={i} className="bg-background/80 size-5 rounded-full flex items-center justify-center p-1 shadow-sm backdrop-blur-[2px]">
                                                <div className="size-full rounded-full bg-foreground/20"></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Info inferior */}
                                <div className="p-4 flex flex-col flex-1">
                                    <div className="flex justify-between items-center text-[10px] text-muted-foreground mb-1 font-semibold uppercase tracking-wider">
                                        <span>{game.developer}</span>
                                        <span>{game.year}</span>
                                    </div>
                                    <h3 className="text-base md:text-lg font-bold text-card-foreground line-clamp-1 group-hover:text-primary transition-colors">
                                        {game.name}
                                    </h3>

                                    <div className="mt-auto pt-4 flex justify-end">
                                        <span className="bg-secondary text-secondary-foreground text-[10px] font-bold uppercase tracking-wider rounded-md px-2 py-1">
                                            {game.region}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </main>
            </div>
        </div>
    );
}

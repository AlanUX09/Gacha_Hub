import data from '@/mock_data.json';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    return data.games.map((game) => ({
        slug: game.slug,
    }));
}

export default async function GamePage({ params }) {
    const { slug } = await params;
    const game = data.games.find(g => g.slug === slug);

    if (!game) {
        notFound();
    }

    const versions = data.game_versions.filter(v => v.game_id === game.id);
    const gameUpdates = data.updates
        .filter(u => u.game_id === game.id)
        .sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

    return (
        <div className="space-y-12 animate-in fade-in duration-500">
            {/* Game Header */}
            {/* Game Header */}
            <div className="relative rounded-3xl overflow-hidden border border-border bg-card text-card-foreground shadow-lg">
                <div className="absolute inset-0 bg-muted" />
                <img src={game.cover_image_url} alt={game.name} className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />

                <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center md:items-end gap-8 pt-32 md:pt-48">
                    <div className="relative shrink-0">
                        <img src={game.icon_url} alt={game.name} className="relative w-32 h-32 md:w-40 md:h-40 rounded-3xl border-4 border-card shadow-xl object-cover z-10" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">{game.name}</h1>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                            <span className="text-muted-foreground font-semibold bg-muted px-4 py-1.5 rounded-full border border-border">{game.developer}</span>
                            <div className="flex flex-wrap gap-2">
                                {game.genres.map(genre => (
                                    <span key={genre} className="bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                                        {genre}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-2">
                {/* Sidebar: Versions */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold flex items-center gap-3 text-foreground">
                        <span className="w-1.5 h-6 rounded-full bg-primary"></span>
                        Versiones y Regiones
                    </h2>
                    <div className="grid gap-4">
                        {versions.map(version => (
                            <div key={version.id} className="bg-card text-card-foreground p-5 rounded-2xl border border-border hover:border-primary/30 transition-colors shadow-sm">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="font-bold text-lg text-foreground">{version.region}</h3>
                                    <span className="bg-positive/20 text-positive border border-positive/30 px-2.5 py-1 rounded-md text-xs font-bold font-mono">
                                        v{version.current_version}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-4">Editado por: <span className="text-foreground font-medium">{version.publisher}</span></p>
                                <div className="flex flex-wrap gap-2">
                                    {version.platforms.map(platform => (
                                        <span key={platform} className="bg-muted text-muted-foreground border border-border px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider">
                                            {platform}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Content: Updates */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold flex items-center gap-3 text-foreground">
                            <span className="w-1.5 h-6 rounded-full bg-primary"></span>
                            Novedades de {game.name}
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {gameUpdates.length === 0 ? (
                            <p className="text-muted-foreground py-12 text-center bg-card rounded-2xl border border-border font-medium">No hay novedades recientes para este juego.</p>
                        ) : (
                            gameUpdates.map(update => (
                                <Link href={`/novedades`} key={update.id} className="group flex flex-col sm:flex-row gap-5 bg-card text-card-foreground p-4 rounded-3xl border border-border hover:border-primary/30 transition-all duration-300">
                                    <div className="sm:w-56 shrink-0 relative aspect-video sm:aspect-auto sm:h-36 rounded-2xl overflow-hidden border border-border">
                                        <div className="absolute inset-0 bg-muted animate-pulse" />
                                        <img src={update.thumbnail_url} alt={update.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="flex flex-col flex-1 py-1.5 px-2 sm:px-0">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                {new Date(update.published_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </span>
                                            <span className="px-2.5 py-1 bg-accent text-accent-foreground border border-border rounded-lg text-[10px] font-bold uppercase tracking-wider">
                                                {update.tags[0]}
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors leading-snug">
                                            {update.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                                            {update.summary}
                                        </p>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

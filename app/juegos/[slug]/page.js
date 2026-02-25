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
            <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
                <div className="absolute inset-0 bg-[#0a0a0e]" />
                <img src={game.cover_image_url} alt={game.name} className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0e] via-[#0a0a0e]/80 to-transparent" />

                <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center md:items-end gap-8 pt-32 md:pt-48">
                    <div className="relative shrink-0">
                        <div className="absolute -inset-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl blur opacity-30"></div>
                        <img src={game.icon_url} alt={game.name} className="relative w-32 h-32 md:w-40 md:h-40 rounded-3xl border-4 border-[#0a0a0e] shadow-2xl object-cover z-10" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight drop-shadow-sm">{game.name}</h1>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                            <span className="text-gray-300 font-semibold bg-white/5 px-4 py-1.5 rounded-full border border-white/10">{game.developer}</span>
                            <div className="flex flex-wrap gap-2">
                                {game.genres.map(genre => (
                                    <span key={genre} className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
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
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <span className="w-1.5 h-6 rounded-full bg-blue-500"></span>
                        Versiones y Regiones
                    </h2>
                    <div className="grid gap-4">
                        {versions.map(version => (
                            <div key={version.id} className="bg-[#12121a] p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors shadow-lg">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="font-bold text-lg text-gray-100">{version.region}</h3>
                                    <span className="bg-green-500/20 text-green-400 border border-green-500/30 px-2.5 py-1 rounded-md text-xs font-bold font-mono">
                                        v{version.current_version}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-400 mb-4">Editado por: <span className="text-gray-200 font-medium">{version.publisher}</span></p>
                                <div className="flex flex-wrap gap-2">
                                    {version.platforms.map(platform => (
                                        <span key={platform} className="bg-white/5 border border-white/10 text-gray-300 px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider">
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
                        <h2 className="text-2xl font-bold flex items-center gap-3">
                            <span className="w-1.5 h-6 rounded-full bg-purple-500"></span>
                            Novedades de {game.name}
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {gameUpdates.length === 0 ? (
                            <p className="text-gray-400 py-12 text-center bg-[#12121a] rounded-2xl border border-white/5 font-medium">No hay novedades recientes para este juego.</p>
                        ) : (
                            gameUpdates.map(update => (
                                <Link href={`/novedades`} key={update.id} className="group flex flex-col sm:flex-row gap-5 bg-[#12121a] p-4 rounded-3xl border border-white/5 hover:border-purple-500/30 hover:bg-[#15151e] hover:shadow-xl transition-all duration-300">
                                    <div className="sm:w-56 shrink-0 relative aspect-video sm:aspect-auto sm:h-36 rounded-2xl overflow-hidden border border-white/5">
                                        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
                                        <img src={update.thumbnail_url} alt={update.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                                    </div>
                                    <div className="flex flex-col flex-1 py-1.5 px-2 sm:px-0">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xs text-gray-400 font-medium flex items-center gap-1.5">
                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                {new Date(update.published_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </span>
                                            <span className="px-2.5 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                                                {update.tags[0]}
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-[1.15rem] mb-2 text-gray-100 group-hover:text-purple-400 transition-colors leading-snug">
                                            {update.title}
                                        </h3>
                                        <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
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

import data from '@/mock_data.json';
import Link from 'next/link';

export default function GamesCatalog() {
    const { games } = data;

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            <div className="flex flex-col mb-8 px-2">
                <h1 className="text-3xl md:text-4xl flex items-center gap-4 font-bold mb-4">
                    <span className="w-2.5 h-10 rounded-full bg-gradient-to-b from-blue-500 to-indigo-500 shadow-lg shadow-blue-500/20"></span>
                    Catálogo de Juegos
                </h1>
                <p className="text-gray-400 text-lg max-w-2xl pl-1 text-balance">
                    Descubre e infórmate sobre los juegos soportados en nuestro hub.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
                {games.map(game => (
                    <Link href={`/juegos/${game.slug}`} key={game.id} className="group relative rounded-[2rem] overflow-hidden border border-white/10 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300">
                        <div className="aspect-[16/9] overflow-hidden relative">
                            <div className="absolute inset-0 bg-gray-900 animate-pulse" />
                            <img src={game.cover_image_url} alt={game.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0e] via-[#0a0a0e]/60 to-transparent" />
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end gap-5">
                            <div className="shrink-0 relative">
                                <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
                                <img src={game.icon_url} alt={`${game.name} icon`} className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl border-2 border-white/10 shadow-xl object-cover" />
                            </div>
                            <div className="flex-1 pb-1">
                                <h2 className="text-2xl font-bold text-white mb-2 tracking-tight drop-shadow-sm group-hover:text-blue-300 transition-colors">{game.name}</h2>
                                <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-wide">
                                    {game.genres.map(genre => (
                                        <span key={genre} className="bg-white/10 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full text-gray-200">
                                            {genre}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

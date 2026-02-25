import data from '@/mock_data.json';
import Link from 'next/link';

export default function GamesCatalog() {
    const { games } = data;

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            <div className="flex flex-col mb-8 px-2">
                <h1 className="text-3xl md:text-4xl flex items-center gap-4 font-bold mb-4 text-foreground">
                    <span className="w-2.5 h-10 rounded-full bg-primary shadow-sm"></span>
                    Catálogo de Juegos
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl pl-1 text-balance font-medium">
                    Descubre e infórmate sobre los juegos soportados en nuestro hub.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
                {games.map(game => (
                    <Link href={`/juegos/${game.slug}`} key={game.id} className="group relative rounded-3xl overflow-hidden border border-border bg-card text-card-foreground hover:border-primary/50 hover:shadow-xl transition-all duration-300">
                        <div className="aspect-[16/9] overflow-hidden relative">
                            <div className="absolute inset-0 bg-muted animate-pulse" />
                            <img src={game.cover_image_url} alt={game.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end gap-5">
                            <div className="shrink-0 relative">
                                <img src={game.icon_url} alt={`${game.name} icon`} className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl border-2 border-border shadow-md object-cover" />
                            </div>
                            <div className="flex-1 pb-1">
                                <h2 className="text-2xl font-bold text-foreground mb-2 tracking-tight group-hover:text-primary transition-colors">{game.name}</h2>
                                <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-wide">
                                    {game.genres.map(genre => (
                                        <span key={genre} className="bg-secondary text-secondary-foreground border border-border px-2.5 py-1 rounded-full">
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

import data from '@/mock_data.json';
import Link from 'next/link';

export default function Home() {
  const { updates, games } = data;

  // Sort updates by newest
  const recentUpdates = [...updates].sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <section className="text-center py-12 md:py-20 bg-muted/50 rounded-lg border border-border relative overflow-hidden">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight text-foreground">
          Bienvenido a <span className="text-primary underline decoration-primary/30">GachaHub</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4 mt-6 leading-relaxed">
          Tu fuente definitiva para encontrar las últimas noticias, eventos, códigos y actualizaciones de tus juegos Gacha favoritos.
        </p>
      </section>

      <section>
        <div className="flex items-center justify-between mb-8 px-2">
          <h2 className="text-2xl md:text-3xl flex items-center gap-3 font-bold text-foreground">
            <span className="w-2 h-8 rounded-full bg-primary"></span>
            Últimas Novedades
          </h2>
          <Link href="/novedades" className="text-primary hover:underline font-semibold transition-all flex items-center gap-1">
            Ver todas <span className="text-xl leading-none">&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentUpdates.slice(0, 4).map((update) => {
            const game = games.find(g => g.id === update.game_id);
            return (
              <Link href={`/juegos/${game?.slug}`} key={update.id} className="group flex flex-col bg-card text-card-foreground border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative aspect-video overflow-hidden">
                  <div className="absolute inset-0 bg-muted animate-pulse" />
                  <img src={update.thumbnail_url} alt={update.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 bg-secondary/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-semibold text-secondary-foreground border border-border shadow-sm">
                    {game?.name}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span className="font-medium flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                      {new Date(update.published_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                    </span>
                    <span className="px-2 py-0.5 bg-accent text-accent-foreground rounded-full font-semibold uppercase tracking-wider text-[10px]">
                      {update.tags[0]}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg leading-snug mb-2 line-clamp-2 text-foreground group-hover:text-primary transition-colors">
                    {update.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mt-auto">
                    {update.summary}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  );
}

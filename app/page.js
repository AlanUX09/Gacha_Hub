import data from '@/mock_data.json';
import Link from 'next/link';

export default function Home() {
  const { updates, games } = data;

  // Sort updates by newest
  const recentUpdates = [...updates].sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <section className="text-center py-12 md:py-20 bg-gradient-to-b from-indigo-900/20 via-purple-900/10 to-transparent rounded-[2rem] border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-br from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
          Bienvenido a <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-sm">GachaHub</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4 mt-6 leading-relaxed">
          Tu fuente definitiva para encontrar las últimas noticias, eventos, códigos y actualizaciones de tus juegos Gacha favoritos.
        </p>
      </section>

      <section>
        <div className="flex items-center justify-between mb-8 px-2">
          <h2 className="text-2xl md:text-3xl flex items-center gap-3 font-bold">
            <span className="w-2 h-8 rounded-full bg-gradient-to-b from-purple-500 to-pink-500"></span>
            Últimas Novedades
          </h2>
          <Link href="/novedades" className="text-purple-400 hover:text-pink-400 font-semibold transition-colors flex items-center gap-1">
            Ver todas <span className="text-xl leading-none">&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentUpdates.slice(0, 4).map((update) => {
            const game = games.find(g => g.id === update.game_id);
            return (
              <Link href={`/juegos/${game?.slug}`} key={update.id} className="group flex flex-col bg-[#12121a] border border-white/5 rounded-2xl overflow-hidden hover:bg-[#1a1a24] hover:shadow-xl hover:shadow-purple-500/10 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1">
                <div className="relative aspect-video overflow-hidden">
                  <div className="absolute inset-0 bg-gray-800 animate-pulse" />
                  <img src={update.thumbnail_url} alt={update.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-semibold text-white border border-white/10 shadow-sm">
                    {game?.name}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                    <span className="font-medium flex items-center gap-1 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                      {new Date(update.published_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                    </span>
                    <span className="px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-full font-semibold uppercase tracking-wider text-[10px]">
                      {update.tags[0]}
                    </span>
                  </div>
                  <h3 className="font-bold text-[1.1rem] leading-snug mb-2 line-clamp-2 text-gray-100 group-hover:text-purple-400 transition-colors">
                    {update.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 mt-auto">
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

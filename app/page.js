"use client";

import React from 'react';

// MOCK DATA
const HERO_NEWS = {
  id: 1,
  title: "Wuthering Waves: Versión 1.3 disponible próximamente",
  summary: "Descubre todas las novedades del parche 'Paraíso de la Costa', incluyendo nuevos personajes, biomas y optimizaciones de combate.",
  image: "Hero Image",
  tag: "IMPORTANTE",
  game: "Wuthering Waves",
  time: "Hace 3 horas"
};

const REGULAR_NEWS = [
  { id: 2, title: "Drip Marketing: Camellia confirmada", date: "Hoy, 10:00", tag: "Drip Marketing", category: "Banners" },
  { id: 3, title: "Nuevos códigos de canje: 100 Asterites gratis", date: "Hoy, 08:30", tag: "Códigos", category: "Rewards" },
  { id: 4, title: "Actualización de QoL: Mejoras en el inventario", date: "Ayer, 20:15", tag: "QoL", category: "Updates" },
  { id: 5, title: "Zoneless Zen Zero: Evento de 1.1 filtrado", date: "Ayer, 18:00", tag: "Filtración", category: "News" },
];

const EVENTS = [
  { id: 1, title: "Invocación de Destaque: Jinhsi", game: "Wuthering Waves", status: "Termina en 2 días" },
  { id: 2, title: "Evento de Expedición: Desierto Abrasador", game: "Zenless Zone Zero", status: "Termina en 5 días" },
  { id: 3, title: "Misión de Historia: El Regreso del Dragón", game: "Genshin Impact", status: "Activo" },
  { id: 4, title: "Torneo PvP: Arena de Titanes", game: "Solo Leveling: Arise", status: "Próximamente" },
  { id: 5, title: "Banners de Aniversario: 100 Pulls Gratis", game: "Honkai: Star Rail", status: "Termina en 7 días" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 md:p-6 w-full max-w-[1600px] mx-auto min-h-screen bg-background text-foreground font-sans">

      {/* 2. Columna Izquierda (Feed de Noticias - 70%) */}
      <section className="flex flex-col gap-6 lg:w-2/3 xl:w-3/4">

        {/* Noticia Destacada (Hero Card) */}
        <article className="group bg-card border border-border rounded-xl overflow-hidden flex flex-col md:flex-row hover:border-primary/50 transition-all cursor-pointer shadow-sm hover:shadow-md">
          {/* Imagen (Mockup) */}
          <div className="h-48 md:h-auto md:w-1/2 bg-primary/20 flex items-center justify-center relative overflow-hidden shrink-0">
            <span className="text-xl md:text-2xl font-bold text-primary opacity-40 uppercase tracking-widest">{HERO_NEWS.image}</span>
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
          </div>

          {/* Contenido */}
          <div className="p-6 md:w-1/2 flex flex-col justify-center">
            <span className="bg-destructive text-destructive-foreground text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md w-fit mb-4">
              {HERO_NEWS.tag}
            </span>

            <h2 className="text-2xl md:text-3xl font-bold text-card-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
              {HERO_NEWS.title}
            </h2>

            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              {HERO_NEWS.summary}
            </p>

            <div className="mt-auto flex justify-between items-center text-xs font-bold uppercase tracking-widest pt-4 border-t border-border/50">
              <span className="text-primary">{HERO_NEWS.game}</span>
              <span className="text-muted-foreground opacity-70">{HERO_NEWS.time}</span>
            </div>
          </div>
        </article>

        {/* Grilla de Noticias Regulares */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {REGULAR_NEWS.map((news) => (
            <article key={news.id} className="group bg-card border border-border rounded-lg p-4 flex flex-col gap-3 hover:border-primary/40 transition-all cursor-pointer shadow-sm">
              {/* Image Placeholder */}
              <div className="h-32 bg-secondary/40 rounded-md flex items-center justify-center relative overflow-hidden">
                <span className="text-xs font-bold text-secondary-foreground opacity-30 uppercase tracking-widest">Image Preview</span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="bg-secondary text-secondary-foreground text-[9px] font-black uppercase tracking-widest rounded-md px-2 py-0.5 w-fit border border-border/50">
                  {news.tag}
                </span>

                <h3 className="text-lg font-bold text-card-foreground line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                  {news.title}
                </h3>

                <div className="flex justify-between items-center mt-2">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    {news.category}
                  </span>
                  <span className="text-[10px] font-bold text-muted-foreground/60 uppercase">
                    {news.date}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. Columna Derecha (Timeline de Eventos - 30%) */}
      <aside className="flex flex-col gap-6 lg:w-1/3 xl:w-1/4">
        <div className="flex flex-col">
          <h2 className="text-xl font-black font-sans text-foreground border-b-4 border-primary pb-3 uppercase tracking-tighter">
            Eventos Activos
          </h2>
        </div>

        {/* Contenedor del Timeline */}
        <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-6 shadow-sm">
          {EVENTS.map((event, index) => (
            <div key={event.id} className="flex gap-4 group cursor-pointer relative">
              {/* Izquierda (Línea y círculo) */}
              <div className="flex flex-col items-center shrink-0">
                <div className="size-3.5 rounded-full bg-primary ring-4 ring-primary/10 transition-transform group-hover:scale-125 z-10"></div>
                {index !== EVENTS.length - 1 && (
                  <div className="w-[2px] h-full bg-border/40 absolute top-4 left-[7px] -z-0"></div>
                )}
              </div>

              {/* Derecha (Info) */}
              <div className="flex flex-col gap-1 pb-2">
                <h4 className="font-bold text-card-foreground text-sm group-hover:text-primary transition-colors leading-snug">
                  {event.title}
                </h4>
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-wider">
                  {event.game}
                </span>

                <div className="mt-2 flex items-center gap-1.5 bg-accent/30 text-accent-foreground text-[9px] font-black uppercase tracking-widest rounded-full px-2.5 py-1 border border-border/50 w-fit">
                  <div className="size-1.5 rounded-full bg-primary animate-pulse"></div>
                  {event.status}
                </div>
              </div>
            </div>
          ))}

          <button className="mt-2 w-full py-3 rounded-lg border-2 border-dashed border-border text-muted-foreground text-[10px] font-bold uppercase tracking-widest hover:border-primary hover:text-primary transition-all">
            Ver Calendario Completo
          </button>
        </div>

        {/* Banner lateral adicional (Ad/Promotion) */}
        <div className="bg-primary text-primary-foreground rounded-xl p-6 flex flex-col gap-4 relative overflow-hidden group cursor-pointer">
          <div className="absolute -right-4 -bottom-4 size-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          <h3 className="text-xl font-black uppercase italic tracking-tighter leading-none">Únete a la Comunidad</h3>
          <p className="text-xs font-medium opacity-80 leading-relaxed">
            Participa en eventos exclusivos y obtén recompensas únicas en nuestro Discord oficial.
          </p>
          <div className="bg-background/20 backdrop-blur-sm self-start px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-white/10">
            gacha.hub/discord
          </div>
        </div>
      </aside>

    </div>
  );
}

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const inputBase =
  "w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-800 focus:border-neutral-800 bg-white text-neutral-900";

const PixelFontLink = () => (
  <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
);

function useScrollTop(deps) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, deps);
}

function Card({ children }) {
  return <div className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-neutral-100 overflow-hidden">{children}</div>;
}
function Section({ title, children }) {
  return <section className="space-y-3"><h2 className="text-2xl font-semibold">{title}</h2>{children}</section>;
}

function Header({ page, setPage, clearDetail }) {
  return (
    <header className="border-b bg-white sticky top-0 z-10">
      <PixelFontLink />
      <div className="max-w-6xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <button className="tracking-tight text-xl md:text-2xl font-extrabold" style={{ fontFamily: '"Press Start 2P", monospace' }} onClick={() => { setPage("home"); clearDetail(); }}>GALERIA 01</button>
          <button onClick={() => { setPage("postular"); clearDetail(); }} className="inline-flex items-center px-3 py-1.5 rounded-full text-xs border border-neutral-900">Unirse</button>
        </div>
        <nav className="h-12 flex items-center justify-center gap-6 text-sm">
          <button onClick={() => { setPage("exposiciones"); clearDetail(); }} className={page === "exposiciones" ? "font-semibold" : "hover:underline"}>Exposiciones</button>
          <button onClick={() => { setPage("obras"); clearDetail(); }} className={page === "obras" ? "font-semibold" : "hover:underline"}>Obras</button>
          <button onClick={() => { setPage("artistas"); clearDetail(); }} className={page === "artistas" ? "font-semibold" : "hover:underline"}>Artistas</button>
        </nav>
      </div>
    </header>
  );
}

// Small util to fetch JSON from /public/data
async function fetchJSON(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`No se pudo cargar ${path}`);
  return res.json();
}

function Home({ exhibitions, works, artists, openWork, openExhibition, openArtist }) {
  return (
    <div className="space-y-12">
      <Section title="En exhibición">
        <div className="grid md:grid-cols-2 gap-6">
          {exhibitions.slice(0, 2).map((e) => (
            <button key={e.slug} onClick={() => openExhibition(e.slug)}>
              <Card>
                <img src={e.cover} alt={e.title} className="w-full h-64 object-cover" />
                <div className="p-4 text-left">
                  <div className="text-sm text-neutral-500">{e.startDate} — {e.endDate}</div>
                  <div className="font-semibold text-xl">{e.title}</div>
                </div>
              </Card>
            </button>
          ))}
        </div>
      </Section>

      <Section title="Obras recientemente añadidas">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {works.slice(0, 6).map((w) => (
            <button key={w.slug} onClick={() => openWork(w.slug)}>
              <Card>
                <img src={w.image} alt={w.title} className="w-full h-28 object-cover" />
                <div className="p-3 text-left">
                  <div className="text-xs text-neutral-500">{w.year}</div>
                  <div className="text-sm font-medium line-clamp-1">{w.title}</div>
                </div>
              </Card>
            </button>
          ))}
        </div>
      </Section>

      <Section title="Nuevos artistas">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {artists.slice(0, 4).map((a) => (
            <button key={a.slug} onClick={() => openArtist(a.slug)}>
              <Card>
                <div className="p-4 flex gap-4 items-center">
                  <img src={a.avatar} alt={a.name} className="w-16 h-16 rounded-xl object-cover" />
                  <div className="text-left">
                    <div className="font-semibold">{a.name}</div>
                    <div className="text-sm text-neutral-500">{a.location}</div>
                  </div>
                </div>
              </Card>
            </button>
          ))}
        </div>
      </Section>
    </div>
  );
}

function ExhibitionsPage({ list, open }) {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Exposiciones</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((e) => (
          <button key={e.slug} onClick={() => open(e.slug)}>
            <Card>
              <img src={e.cover} alt={e.title} className="w-full h-40 object-cover" />
              <div className="p-4 text-left">
                <div className="text-sm text-neutral-500">{e.startDate} — {e.endDate}</div>
                <div className="font-semibold">{e.title}</div>
              </div>
            </Card>
          </button>
        ))}
      </div>
    </div>
  );
}

function WorksPage({ list, open }) {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Obras</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((w) => (
          <button key={w.slug} onClick={() => open(w.slug)}>
            <Card>
              <img src={w.image} alt={w.title} className="w-full h-40 object-cover" />
              <div className="p-4 text-left">
                <div className="text-sm text-neutral-500">{w.year}</div>
                <div className="font-semibold">{w.title}</div>
              </div>
            </Card>
          </button>
        ))}
      </div>
    </div>
  );
}

function ArtistsPage({ list, open }) {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Artistas</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {list.map((a) => (
          <button key={a.slug} onClick={() => open(a.slug)}>
            <Card>
              <div className="p-4 flex gap-4 items-center">
                <img src={a.avatar} alt={a.name} className="w-16 h-16 rounded-xl object-cover" />
                <div className="text-left">
                  <div className="font-semibold">{a.name}</div>
                  <div className="text-sm text-neutral-500">{a.location}</div>
                </div>
              </div>
            </Card>
          </button>
        ))}
      </div>
    </div>
  );
}

function TechSheet({ w }) {
  return (
    <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-neutral-700">
      <div><dt className="text-neutral-500">Título</dt><dd className="font-medium">{w.title}</dd></div>
      {w.year && <div><dt className="text-neutral-500">Año</dt><dd className="font-medium">{w.year}</dd></div>}
      {w.medium && <div><dt className="text-neutral-500">Técnica</dt><dd className="font-medium">{w.medium}</dd></div>}
      {w.dimensions && <div><dt className="text-neutral-500">Dimensiones</dt><dd className="font-medium">{w.dimensions}</dd></div>}
    </dl>
  );
}

function ExhibitionDetail({ e, works, artists, back, openWork, openArtist }) {
  const worksIn = (e.works || []).map((slug) => works.find((w) => w.slug === slug)).filter(Boolean);
  const artistSlugs = Array.from(new Set(worksIn.map((w) => w.artist_slug)));
  const participants = artistSlugs.map((s) => artists.find((a) => a.slug === s)).filter(Boolean);

  return (
    <div className="space-y-8">
      <button className="text-sm underline" onClick={back}>← Volver</button>
      <div>
        <h1 className="text-3xl font-semibold">{e.title}</h1>
        {participants.length > 0 && (
          <div className="mt-2 text-neutral-700 text-sm flex flex-wrap gap-2 items-center">
            <span className="text-neutral-500">Artistas:</span>
            {participants.map((a) => (
              <button key={a.slug} className="underline underline-offset-2" onClick={() => openArtist(a.slug)}>{a.name}</button>
            ))}
          </div>
        )}
        {e.description && (<p className="mt-4 max-w-3xl leading-relaxed text-neutral-700">{e.description}</p>)}
      </div>

      <div className="space-y-12">
        {worksIn.map((w) => (
          <div key={w.slug} className="space-y-4">
            <img src={w.image} alt={w.title} className="w-full rounded-2xl object-cover" />
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-neutral-700">
              <div><dt className="text-neutral-500">Título</dt><dd className="font-medium">{w.title}</dd></div>
              <div><dt className="text-neutral-500">Artista</dt><dd className="font-medium">{artists.find((a) => a.slug === w.artist_slug)?.name || ""}</dd></div>
              <div><dt className="text-neutral-500">Técnica</dt><dd className="font-medium">{w.medium || ""}</dd></div>
              <div><dt className="text-neutral-500">Año</dt><dd className="font-medium">{w.year || ""}</dd></div>
            </dl>
            <div className="text-sm"><button className="underline" onClick={() => openWork(w.slug)}>Ver detalle de la obra</button></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkDetail({ w, artist, back, openArtist }) {
  return (
    <div className="space-y-6">
      <button className="text-sm underline" onClick={back}>← Volver</button>
      <div className="space-y-4">
        <img src={w.image} alt={w.title} className="w-full rounded-2xl object-cover" />
        <TechSheet w={w} />
        {w.description && (
          <div className="prose prose-sm max-w-none">
            <h3 className="text-lg font-semibold">Sobre la obra</h3>
            <p className="leading-relaxed">{w.description}</p>
          </div>
        )}
        {artist && (
          <div className="text-sm">
            Artista:{" "}
            <button className="underline" onClick={() => openArtist(artist.slug)}>{artist.name}</button>
          </div>
        )}
      </div>
    </div>
  );
}

function ArtistDetail({ a, works, back, openWork }) {
  const list = works.filter((w) => w.artist_slug === a.slug);
  return (
    <div className="space-y-6">
      <button className="text-sm underline" onClick={back}>← Volver</button>
      <div className="grid md:grid-cols-3 gap-6 items-start">
        <img src={a.avatar} alt={a.name} className="w-full rounded-2xl object-cover md:col-span-1" />
        <div className="md:col-span-2">
          <h1 className="text-3xl font-semibold">{a.name}</h1>
          {a.location && <div className="text-neutral-500">{a.location}</div>}
          <p className="mt-4">{a.bio}</p>
          <div className="flex gap-3 mt-4 text-sm">
            {a.website && (<a className="inline-flex items-center px-2 py-1 rounded-full text-xs border border-neutral-900" href={a.website} target="_blank" rel="noreferrer">Web</a>)}
            {a.instagram && (<a className="inline-flex items-center px-2 py-1 rounded-full text-xs border border-neutral-900" href={a.instagram} target="_blank" rel="noreferrer">Instagram</a>)}
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-3">Obras</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((w) => (
            <button key={w.slug} onClick={() => openWork(w.slug)}>
              <Card>
                <img src={w.image} alt={w.title} className="w-full h-40 object-cover" />
                <div className="p-4 text-left">
                  <div className="text-sm text-neutral-500">{w.year}</div>
                  <div className="font-semibold">{w.title}</div>
                </div>
              </Card>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function WorkField({ onChange, value }) {
  function set(field, val) { onChange({ ...value, [field]: val }); }
  return (
    <div className="space-y-3 border rounded-xl p-4 bg-white">
      <div className="font-medium">Obra</div>
      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm mb-1">Imagen</label>
          <input type="file" accept="image/*" className="block w-full text-sm bg-white border border-neutral-300 rounded-lg px-3 py-2"
            onChange={(e) => { const file = e.target.files?.[0]; if (file) { const url = URL.createObjectURL(file); set("imageUrl", url); set("_fileName", file.name); } }} />
          {value.imageUrl && (<img src={value.imageUrl} alt="preview" className="mt-2 w-full h-40 object-cover rounded-lg" />)}
        </div>
        <div className="grid gap-3">
          <div><label className="block text-sm mb-1">Nombre de la obra</label><input className={inputBase} value={value.title || ""} onChange={(e) => set("title", e.target.value)} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-sm mb-1">Año</label><input className={inputBase} value={value.year || ""} onChange={(e) => set("year", e.target.value)} /></div>
            <div><label className="block text-sm mb-1">Técnica</label><input className={inputBase} value={value.medium || ""} onChange={(e) => set("medium", e.target.value)} /></div>
          </div>
          <div><label className="block text-sm mb-1">Dimensiones</label><input className={inputBase} value={value.dimensions || ""} onChange={(e) => set("dimensions", e.target.value)} /></div>
        </div>
      </div>
      <div>
        <label className="block text-sm mb-1">Información adicional</label>
        <textarea className={`${inputBase} min-h-[120px]`} placeholder="Contanos sobre la obra: ¿qué te inspiró?, ¿qué quisiste explorar?, técnicas o procesos, cuánto tardaste, retos, materiales, anécdotas de taller…" value={value.extra || ""} onChange={(e) => set("extra", e.target.value)} />
      </div>
    </div>
  );
}

function PostularPage({ onSubmit, lastMessage }) {
  const [loading, setLoading] = useState(false);
  const [works, setWorks] = useState([{}]);
  function addWork() { setWorks((w) => [...w, {}]); }
  function updateWork(i, val) { setWorks((arr) => arr.map((w, idx) => (idx === i ? val : w))); }
  function removeWork(i) { setWorks((arr) => arr.filter((_, idx) => idx !== i)); }
  function handle(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setLoading(true);
    setTimeout(() => {
      onSubmit({ fullName: String(data.fullName || ""), stageName: String(data.stageName || ""), email: String(data.email || ""), age: String(data.age || ""), country: String(data.country || ""), city: String(data.city || ""), bio: String(data.bio || ""), socials: String(data.socials || ""), works });
      e.target.reset(); setWorks([{}]); setLoading(false);
    }, 400);
  }
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-semibold mb-4">Postular a la galería</h1>
      <p className="text-neutral-600 mb-6">Esta demo guarda la postulación en memoria. En el proyecto real, cada postulación crea un Pull Request para que el equipo la revise.</p>
      <form onSubmit={handle} className="space-y-5 bg-neutral-100 rounded-2xl border border-neutral-200 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
        <div className="grid md:grid-cols-2 gap-4">
          <div><label className="block text-sm mb-1">Nombre completo</label><input name="fullName" required className={inputBase} /></div>
          <div><label className="block text-sm mb-1">Nombre artístico</label><input name="stageName" className={inputBase} /></div>
          <div><label className="block text-sm mb-1">Email</label><input name="email" type="email" required className={inputBase} /></div>
          <div><label className="block text-sm mb-1">Edad</label><input name="age" className={inputBase} /></div>
          <div><label className="block text-sm mb-1">País</label><input name="country" className={inputBase} /></div>
          <div><label className="block text-sm mb-1">Ciudad</label><input name="city" className={inputBase} /></div>
          <div className="md:col-span-2"><label className="block text-sm mb-1">Biografía</label><textarea name="bio" rows={4} className={inputBase} /></div>
          <div className="md:col-span-2"><label className="block text-sm mb-1">Instagram / Página web</label><input name="socials" placeholder="https://instagram.com/…  o  https://tu-sitio.com" className={inputBase} /></div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Añadir obras</h3>
            <button type="button" className="px-4 py-2 rounded-xl bg-neutral-900 text-white border border-neutral-900 hover:bg-neutral-800 shadow" onClick={addWork}>＋ Añadir obra adicional</button>
          </div>
          {works.length === 0 && (<div className="text-sm text-neutral-600">No agregaste obras aún.</div>)}
          <div className="space-y-4">
            {works.map((w, i) => (
              <div key={i} className="relative">
                {works.length > 1 && (<button type="button" onClick={() => removeWork(i)} className="absolute -top-2 -right-2 bg-neutral-900 text-white rounded-full w-7 h-7">×</button>)}
                <WorkField value={w} onChange={(val) => updateWork(i, val)} />
              </div>
            ))}
          </div>
        </div>
        <button className="inline-flex items-center justify-center rounded-xl px-4 py-2 border border-neutral-800 hover:bg-neutral-900 hover:text-white transition" disabled={loading}>{loading ? "Enviando…" : "Enviar postulación"}</button>
        {lastMessage && <div className="text-sm text-neutral-600">{lastMessage}</div>}
      </form>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [detail, setDetail] = useState(null);
  const [toast, setToast] = useState(null);
  const [artists, setArtists] = useState([]);
  const [works, setWorks] = useState([]);
  const [exhibitions, setExhibitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useScrollTop([page, detail]);

  useEffect(() => {
    async function load() {
      try {
        const [a, w, e] = await Promise.all([
          fetchJSON("/data/artists.json"),
          fetchJSON("/data/works.json"),
          fetchJSON("/data/exhibitions.json"),
        ]);
        setArtists(a); setWorks(w); setExhibitions(e);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los datos.");
      } finally {
        setLoading(false);
      }
    }
    load();
    document.title = "GALERIA 01 – Plataforma de arte contemporáneo";
  }, []);

  const openWork = (slug) => setDetail({ type: "work", slug });
  const openExhibition = (slug) => setDetail({ type: "exhibition", slug });
  const openArtist = (slug) => setDetail({ type: "artist", slug });
  const back = () => setDetail(null);

  const currentWork = useMemo(() => works.find((w) => w.slug === detail?.slug), [detail, works]);
  const currentArtist = useMemo(() => artists.find((a) => a.slug === detail?.slug), [detail, artists]);
  const currentExh = useMemo(() => exhibitions.find((e) => e.slug === detail?.slug), [detail, exhibitions]);

  function handleSubmission(payload) {
    setToast("¡Postulación guardada en la demo! (no se guarda en servidor)");
    setTimeout(() => setToast(null), 3000);
  }

  if (loading) return <div className="max-w-6xl mx-auto px-4 py-10">Cargando datos…</div>;
  if (error) return <div className="max-w-6xl mx-auto px-4 py-10 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header page={page} setPage={setPage} clearDetail={() => setDetail(null)} />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <AnimatePresence initial={false} mode="wait">
          <motion.div key={detail ? detail.slug : page} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
            {!detail && page === "home" && (
              <Home exhibitions={exhibitions} works={works} artists={artists} openWork={openWork} openExhibition={openExhibition} openArtist={openArtist} />
            )}
            {!detail && page === "exposiciones" && (<ExhibitionsPage list={exhibitions} open={openExhibition} />)}
            {!detail && page === "obras" && (<WorksPage list={works} open={openWork} />)}
            {!detail && page === "artistas" && (<ArtistsPage list={artists} open={openArtist} />)}
            {!detail && page === "postular" && (
              <div className="grid lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2"><PostularPage onSubmit={handleSubmission} lastMessage={toast} /></div>
                <div className="space-y-4"><h3 className="text-xl font-semibold">Postulaciones (demo)</h3><div className="text-sm text-neutral-600">(En esta demo no listamos aún las postulaciones enviadas)</div></div>
              </div>
            )}
            {detail && detail.type === "exhibition" && currentExh && (
              <ExhibitionDetail e={currentExh} works={works} artists={artists} back={back} openWork={openWork} openArtist={openArtist} />
            )}
            {detail && detail.type === "work" && currentWork && (
              <WorkDetail w={currentWork} artist={artists.find((a) => a.slug === currentWork.artist_slug)} back={back} openArtist={openArtist} />
            )}
            {detail && detail.type === "artist" && currentArtist && (
              <ArtistDetail a={currentArtist} works={works} back={back} openWork={openWork} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="border-t mt-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-neutral-500">© {new Date().getFullYear()} GALERIA 01</div>
      </footer>

      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-sm px-4 py-2 rounded-xl shadow">{toast}</motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

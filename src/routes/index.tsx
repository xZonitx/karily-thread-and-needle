import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import hero from "@/assets/hero.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Karily — Bordados personalizados en Zapotlanejo" },
      { name: "description", content: "Bordados personalizados e industriales para todo tipo de prendas. Cotiza tu diseño en Karily, Zapotlanejo, Jalisco." },
      { property: "og:title", content: "Karily — Bordados personalizados" },
      { property: "og:description", content: "Taller de bordados a la medida con bordadoras profesionales en Zapotlanejo, Jalisco." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const SERVICIOS = [
  { t: "Bordados personalizados", d: "Logotipos, nombres y diseños bordados en playeras, gorras, uniformes y más, con acabado profesional.", i: "✦" },
  { t: "Creación y digitalización de diseños", d: "Convertimos tu idea o logotipo en un archivo de bordado listo para producción, con precisión punto por punto.", i: "✎" },
  { t: "Elaboración de muestras", d: "Bordamos una muestra antes de producir tu pedido para que apruebes colores, tamaño y calidad.", i: "◈" },
];
const GALERIA = [
  { src: g1, alt: "Polo con logotipo bordado" },
  { src: g2, alt: "Gorra con bordado dorado" },
  { src: g3, alt: "Blusa con bordado floral" },
  { src: g4, alt: "Chamarra de trabajo bordada" },
];
const DIRECCION = "Degollado #120 A, Zapotlanejo, Jalisco, México";
const MAPS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(DIRECCION)}`;

const schema = z.object({
  nombre: z.string().trim().min(2, "Escribe tu nombre").max(100),
  contacto: z.string().trim().max(255).refine(
    (v) => z.string().email().safeParse(v).success || /^\+?[\d\s-]{10,15}$/.test(v),
    "Ingresa un correo válido o un WhatsApp de 10 dígitos",
  ),
  servicio: z.string().min(1, "Selecciona un servicio"),
  cantidad: z.coerce.number({ message: "Indica una cantidad" }).int("Debe ser un número entero").min(1, "Mínimo 1 prenda").max(100000),
  descripcion: z.string().trim().min(10, "Describe tu diseño (mínimo 10 caracteres)").max(1000),
});
type Datos = z.infer<typeof schema>;

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Servicios />
      <Galeria />
      <Ubicacion />
      <Cotizacion />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#inicio" className="font-display text-2xl font-extrabold italic text-secondary">Karily</a>
        <div className="hidden gap-6 text-sm md:flex">
          {["servicios", "galeria", "ubicacion"].map((s) => (
            <a key={s} href={`#${s}`} className="capitalize hover:text-secondary">{s === "galeria" ? "Galería" : s === "ubicacion" ? "Ubicación" : "Servicios"}</a>
          ))}
        </div>
        <a href="#cotizar" className="rounded-md bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground hover:opacity-90">Cotizar</a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      <img src={hero} alt="Bordadora industrial cosiendo un diseño floral dorado" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/30" />
      <div className="relative mx-auto max-w-6xl px-4 py-28 md:py-40">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-accent">Taller de bordado · Zapotlanejo</p>
        <h1 className="max-w-2xl text-4xl font-extrabold leading-tight text-primary-foreground md:text-6xl">
          Cada puntada, <span className="italic text-accent">tu historia</span> bordada.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-primary-foreground/85">
          Bordados personalizados e industriales para todo tipo de prendas, con bordadoras profesionales y precisión artesanal.
        </p>
        <a href="#cotizar" className="mt-10 inline-block rounded-md bg-accent px-8 py-4 font-semibold text-accent-foreground shadow-lg transition hover:-translate-y-0.5">
          Solicitar cotización
        </a>
      </div>
    </section>
  );
}

function Titulo({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-12 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-secondary">{kicker}</p>
      <h2 className="mt-2 text-3xl font-extrabold text-primary md:text-4xl">{title}</h2>
      <div className="mx-auto mt-4 h-0.5 w-24 stitch border-x-0 border-b-0" />
    </div>
  );
}

function Servicios() {
  return (
    <section id="servicios" className="mx-auto max-w-6xl px-4 py-20">
      <Titulo kicker="Lo que hacemos" title="Nuestros servicios" />
      <div className="grid gap-6 md:grid-cols-3">
        {SERVICIOS.map((s) => (
          <article key={s.t} className="rounded-lg bg-card p-8 shadow-sm ring-1 ring-border transition hover:-translate-y-1 hover:shadow-md">
            <div className="stitch mb-6 flex h-14 w-14 items-center justify-center rounded-full text-2xl text-secondary">{s.i}</div>
            <h3 className="text-xl font-semibold text-primary">{s.t}</h3>
            <p className="mt-3 text-muted-foreground">{s.d}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Galeria() {
  return (
    <section id="galeria" className="bg-muted py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Titulo kicker="Trabajos" title="Galería" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {GALERIA.map((g) => (
            <figure key={g.alt} className="overflow-hidden rounded-lg bg-card p-2 shadow-sm">
              <img src={g.src} alt={g.alt} loading="lazy" width={1024} height={1024} className="aspect-square w-full rounded object-cover transition duration-500 hover:scale-105" />
              <figcaption className="px-1 pt-2 text-sm text-muted-foreground">{g.alt}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Ubicacion() {
  return (
    <section id="ubicacion" className="mx-auto max-w-6xl px-4 py-20">
      <Titulo kicker="Visítanos" title="Ubicación" />
      <div className="stitch mx-auto max-w-2xl rounded-lg bg-card p-10 text-center">
        <p className="text-2xl font-display text-primary">Degollado #120 A</p>
        <p className="mt-1 text-muted-foreground">Zapotlanejo, Jalisco, México</p>
        <a href={MAPS} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90">
          Abrir en Google Maps
        </a>
      </div>
    </section>
  );
}

const inputCls = "mt-1 w-full rounded-md border border-input bg-card px-3 py-2 outline-none focus:ring-2 focus:ring-ring";

function Cotizacion() {
  const [errors, setErrors] = useState<Partial<Record<keyof Datos, string>>>({});
  const [enviado, setEnviado] = useState<Datos | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const r = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!r.success) {
      const errs: Partial<Record<keyof Datos, string>> = {};
      for (const i of r.error.issues) { const k = i.path[0] as keyof Datos; if (!errs[k]) errs[k] = i.message; }
      setErrors(errs);
      return;
    }
    setErrors({});
    setEnviado(r.data);
  }

  const Err = ({ k }: { k: keyof Datos }) => errors[k] ? <p className="mt-1 text-sm text-destructive">{errors[k]}</p> : null;

  return (
    <section id="cotizar" className="bg-primary py-20 text-primary-foreground">
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-accent">Sin compromiso</p>
          <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">Solicita tu cotización</h2>
        </div>
        <div className="rounded-lg bg-card p-6 text-card-foreground shadow-xl md:p-10">
          {enviado ? (
            <div>
              <h3 className="text-2xl font-semibold text-secondary">¡Gracias, {enviado.nombre}!</h3>
              <p className="mt-2 text-muted-foreground">Recibimos tu solicitud. Este es el resumen:</p>
              <dl className="mt-6 divide-y divide-border">
                {([["Nombre", enviado.nombre], ["Contacto", enviado.contacto], ["Servicio", enviado.servicio], ["Cantidad de prendas", String(enviado.cantidad)], ["Descripción", enviado.descripcion]] as const).map(([k, v]) => (
                  <div key={k} className="grid gap-1 py-3 sm:grid-cols-3"><dt className="font-semibold text-primary">{k}</dt><dd className="sm:col-span-2 break-words">{v}</dd></div>
                ))}
              </dl>
              <button onClick={() => setEnviado(null)} className="mt-6 rounded-md bg-secondary px-5 py-2 font-semibold text-secondary-foreground">Nueva cotización</button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="grid gap-5 md:grid-cols-2">
              <label className="block">Nombre<input name="nombre" className={inputCls} maxLength={100} /><Err k="nombre" /></label>
              <label className="block">Correo o WhatsApp<input name="contacto" className={inputCls} maxLength={255} /><Err k="contacto" /></label>
              <label className="block">Tipo de servicio
                <select name="servicio" defaultValue="" className={inputCls}>
                  <option value="" disabled>Selecciona…</option>
                  {SERVICIOS.map((s) => <option key={s.t}>{s.t}</option>)}
                </select><Err k="servicio" /></label>
              <label className="block">Cantidad de prendas<input name="cantidad" type="number" min={1} className={inputCls} /><Err k="cantidad" /></label>
              <label className="block md:col-span-2">Descripción del diseño<textarea name="descripcion" rows={4} maxLength={1000} className={inputCls} /><Err k="descripcion" /></label>
              <button type="submit" className="md:col-span-2 rounded-md bg-accent px-6 py-3 font-semibold text-accent-foreground hover:opacity-90">Enviar cotización</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-secondary py-12 text-secondary-foreground">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 md:flex-row md:justify-between">
        <div className="stitch flex h-24 w-24 shrink-0 items-center justify-center rounded-md text-xs">Logo CUCEI</div>
        <ul className="space-y-1 text-center text-sm md:text-left">
          <li><strong>Nombre del alumno:</strong> Cesar Emanuel Hernandez Perez</li>
          <li><strong>Materia:</strong> Desarrollo de Aplicaciones Web y Móviles</li>
          <li><strong>Profesor:</strong> Zeus Emanuel Guitierrez Cobian</li>
          <li><strong>Calendario:</strong> 2026-B</li>
        </ul>
        <p className="font-display text-2xl italic">Karily</p>
      </div>
    </footer>
  );
}

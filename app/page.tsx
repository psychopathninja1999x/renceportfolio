import { HeroCollage } from "./components/HeroCollage";
import Image from "next/image";

const PROJECT_IMAGES = {
  lumina:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDNX1j8yPsLF00nuRiazc00rJLOuEAxRG9tDbUAH9Dw1biiXKq1iTHgFpELsTDw7y_XTSf8MafX1SDR79HFajBICYhhwz-dTj4xGPI3jQjKR9gCCQ0i4fOt8DA0ocms-lnnWFa8DiGSEynsl24m1T67hSLTEUTlKuN3oXN9Zkbby62RRFf1DuY3-sCK9wBK6JLm0PVQ3FyczEIx3xqWPDHY-NZuCFnkOl-JnQqJFOr7RhS5mefDHkEnxH0DAg5UJDt7UKJDHPqvwHI",
  aura: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPGr646DgUpJqSWU-8nuKbob0vEDKWo42fT7S6vgLiNJ4qlyVfqDXaJWzf7F2_lBOw6uz6pskA824-t7SJIuPQhbGUJGzpIJ-QOkToOSTHFY4Gp9dEx0r2XIEpn_qKFp0rBX9uGLVuCadeJb1oBFbVyW1YnHHXcAsxhI2cXsNZ47PEGdfNsVsRu8KlKvgUOru2LxRXd8K6FBzHqrDtnFGnvn5rSpn7Ew_TB4DiXDC24BqLrfptWnRnzZ0tewYR58f8hFGXT--I8XI",
};

export default function Home() {
  return (
    <div className="bg-background overflow-x-visible">
      <nav className="fixed top-0 z-[100] flex w-full items-center justify-between px-6 py-6 backdrop-blur-sm bg-white/85 sm:px-8">
        <a
          href="#"
          className="font-sans text-lg font-medium lowercase tracking-tight text-neutral-900 sm:text-xl"
        >
          rence.
        </a>
        <div className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 font-sans text-sm font-medium lowercase text-neutral-800 sm:gap-x-7 sm:text-[0.95rem]">
          <a
            className="transition-opacity hover:opacity-60"
            href="#work"
          >
            branding.
          </a>
          <a
            className="transition-opacity hover:opacity-60"
            href="#work"
          >
            digital content.
          </a>
          <a
            className="transition-opacity hover:opacity-60"
            href="#work"
          >
            print.
          </a>
          <a
            className="transition-opacity hover:opacity-60"
            href="#contact"
          >
            say hi!
          </a>
        </div>
      </nav>

      <HeroCollage />

      <section
        id="work"
        className="bg-surface-container px-8 py-24"
      >
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-12">
          <div id="about" className="flex flex-col gap-6 md:col-span-4">
            <div className="font-label text-xs font-bold uppercase tracking-widest text-primary">
              Selected Works // 2026
            </div>
            <h2 className="font-headline text-4xl font-extrabold leading-tight text-on-surface">
              Crafting digital experiences with a human touch.
            </h2>
            <p className="font-body leading-relaxed text-on-surface-variant">
              I believe that great design isn&apos;t just about how it looks, but
              how it feels. My process involves a rigorous exploration of
              typography, spatial awareness, and tactile feedback.
            </p>
            <div className="pt-4">
              <a
                className="group inline-flex items-center gap-2 font-label font-bold text-primary"
                href="#"
              >
                View All Projects
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                  className="transition-transform group-hover:translate-x-1"
                >
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:col-span-8">
            <article className="rounded-xl bg-surface-container-lowest p-6 ambient-shadow transition-all duration-300 hover:scale-[1.02]">
              <div className="relative mb-6 aspect-[4/5] overflow-hidden rounded-lg bg-surface">
                <Image
                  className="object-cover"
                  src={PROJECT_IMAGES.lumina}
                  alt="Abstract flowing shapes in blue and white"
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <div className="mb-2 font-label text-[10px] font-normal uppercase tracking-widest text-outline">
                Branding &amp; Motion
              </div>
              <h3 className="mb-2 font-headline text-xl font-bold">Lumina Studio</h3>
              <p className="line-clamp-2 font-body text-sm text-on-surface-variant">
                Redefining the visual identity for a next-gen creative agency.
              </p>
            </article>

            <article className="mt-0 rounded-xl bg-surface-container-lowest p-6 ambient-shadow transition-all duration-300 hover:scale-[1.02] sm:mt-12">
              <div className="relative mb-6 aspect-[4/5] overflow-hidden rounded-lg bg-surface">
                <Image
                  className="object-cover"
                  src={PROJECT_IMAGES.aura}
                  alt="Colorful geometric 3D shapes"
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <div className="mb-2 font-label text-[10px] font-normal uppercase tracking-widest text-outline">
                UI/UX Design
              </div>
              <h3 className="mb-2 font-headline text-xl font-bold">Aura Platform</h3>
              <p className="line-clamp-2 font-body text-sm text-on-surface-variant">
                A focus-first interface for the modern minimalist writer.
              </p>
            </article>
          </div>
        </div>
      </section>

      <footer
        id="contact"
        className="flex w-full flex-col items-center justify-between gap-4 bg-surface px-8 py-12 md:flex-row"
      >
        <div className="font-label text-sm uppercase tracking-widest text-slate-500">
          © 2026 Curated Chaos. Built with soul.
        </div>
        <div className="flex gap-8">
          {(["Instagram", "Dribbble", "LinkedIn"] as const).map((label) => (
            <a
              key={label}
              href="#"
              className="font-label text-sm uppercase tracking-widest text-slate-500 underline underline-offset-4 transition-colors duration-200 hover:text-primary"
            >
              {label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-secondary" />
          <span className="font-label text-[10px] uppercase tracking-tighter text-on-surface-variant">
            Available for projects
          </span>
        </div>
      </footer>
    </div>
  );
}

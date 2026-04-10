import { HeroCollage } from "./components/HeroCollage";
import { KukiBrandingSpreads } from "./components/KukiBrandingSpreads";
import { interBranding } from "./fonts";

export default function Home() {
  return (
    <div className="bg-background overflow-x-visible">
      <nav className="fixed top-0 z-[100] flex w-full items-center justify-between px-6 py-6 backdrop-blur-sm bg-white/85 sm:px-8">
        <a
          href="#main"
          className="font-sans text-lg font-medium lowercase tracking-tight text-neutral-900 sm:text-xl"
        >
          rence.
        </a>
        <div className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 font-sans text-sm font-medium lowercase text-neutral-800 sm:gap-x-7 sm:text-[0.95rem]">
          <a
            className="transition-opacity hover:opacity-60"
            href="#branding"
          >
            branding.
          </a>
          <a
            className="transition-opacity hover:opacity-60"
            href="#"
          >
            digital content.
          </a>
          <a
            className="transition-opacity hover:opacity-60"
            href="#"
          >
            print.
          </a>
          <a
            className="transition-opacity hover:opacity-60"
            href="#"
          >
            say hi!
          </a>
        </div>
      </nav>

      <div id="main" className="scroll-mt-0">
        <HeroCollage />
      </div>

      <section
        id="branding"
        className={`scroll-mt-28 ${interBranding.className}`}
      >
        <header className="mx-auto max-w-3xl px-6 pb-6 pt-16 text-center sm:px-8 sm:pt-20">
          <h1 className="text-4xl font-bold lowercase tracking-tight text-neutral-900 sm:text-5xl">
            branding.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-neutral-700 sm:text-lg">
            Turning brand values into visual stories. Every brand has a soul. I
            translate that unique personality into a visual language—from the first
            sketch of a logo to the final texture of a brand pattern.
          </p>
        </header>

        <KukiBrandingSpreads />
      </section>
    </div>
  );
}

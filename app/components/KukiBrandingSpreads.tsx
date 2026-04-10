"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

function brandingSrc(assetDir: string, filename: string) {
  return `/Assets/${encodeURIComponent(assetDir)}/${encodeURIComponent(filename)}`;
}

type Layer = {
  file: string;
  alt: string;
  className: string;
  z: number;
  w: number;
  h: number;
  isNotebook?: boolean;
};

const DIR_STATE_01 = "Branding Page State 01";
const DIR_STATE_02 = "Branding Page State 02";

const LAYERS_01: Layer[] = [
  {
    file: "Blue Notebook.png",
    alt: "Open blue notebook spread",
    className: "inset-0 h-full w-full",
    z: 0,
    w: 1481,
    h: 1075,
    isNotebook: true,
  },
  {
    file: "Polaroid 01.png",
    alt: "Kuki logo on cookie photo",
    className: "left-[5%] top-[4%] w-[26%]",
    z: 10,
    w: 414,
    h: 488,
  },
  {
    file: "Polaroid 02.png",
    alt: "Kuki logo on yellow",
    className: "left-[24%] top-[5%] w-[18%]",
    z: 11,
    w: 290,
    h: 425,
  },
  {
    file: "Main Text.png",
    alt: "Kuki brand story handwritten text",
    className: "left-[7%] top-[38%] w-[35%]",
    z: 12,
    w: 543,
    h: 264,
  },
  {
    file: "Colors - Image.png",
    alt: "Kuki color palette",
    className: "left-[9%] bottom-[7%] w-[37%]",
    z: 13,
    w: 576,
    h: 146,
  },
  {
    file: "Mascot - Image.png",
    alt: "Kuki mascot expressions",
    className: "right-[6%] top-[5%] w-[37%]",
    z: 14,
    w: 550,
    h: 154,
  },
  {
    file: "Pattern - Image.png",
    alt: "Kuki repeating pattern",
    className: "right-[5%] top-[26%] w-[41%]",
    z: 15,
    w: 560,
    h: 226,
  },
  {
    file: "Brand Usage - Image.png",
    alt: "Kuki brand mockups",
    className: "right-[4%] bottom-[6%] w-[43%]",
    z: 16,
    w: 562,
    h: 368,
  },
  {
    file: "Clip 01.png",
    alt: "Black binder clip",
    className: "left-[-3%] top-[12%] w-[11%]",
    z: 20,
    w: 206,
    h: 155,
  },
  {
    file: "Clip 02.png",
    alt: "Metal bulldog clip",
    className: "right-[-2%] top-[16%] w-[11%]",
    z: 21,
    w: 208,
    h: 210,
  },
  {
    file: "Main Logo - Text.png",
    alt: "Label: The Main Logo",
    className: "left-[-13%] top-[-7%] w-[17%]",
    z: 30,
    w: 187,
    h: 182,
  },
  {
    file: "Mascot - Text.png",
    alt: "Label: Mascot",
    className: "right-[-1%] top-[-12%] w-[17%]",
    z: 31,
    w: 239,
    h: 131,
  },
  {
    file: "Pattern - Text.png",
    alt: "Label: Pattern",
    className: "right-[-16%] top-[28%] w-[18%]",
    z: 32,
    w: 269,
    h: 96,
  },
  {
    file: "Color - Text.png",
    alt: "Label: Colors",
    className: "left-[-9%] bottom-[-11%] w-[12%]",
    z: 33,
    w: 129,
    h: 169,
  },
  {
    file: "Brand Usage - Text.png",
    alt: "Label: Brand Usage",
    className: "right-[3%] bottom-[-15%] w-[14%]",
    z: 34,
    w: 190,
    h: 166,
  },
];

const LAYERS_02: Layer[] = [
  {
    file: "Red Notebook.png",
    alt: "Open red notebook spread",
    className: "inset-0 h-full w-full",
    z: 0,
    w: 1451,
    h: 1031,
    isNotebook: true,
  },
  {
    file: "Polaroid 01.png",
    alt: "Pista sa Nayon logo polaroid",
    className: "left-[5%] top-[4%] w-[26%]",
    z: 10,
    w: 409,
    h: 488,
  },
  {
    file: "Polaroid 02.png",
    alt: "Pista sa Nayon logo polaroid",
    className: "left-[24%] top-[5%] w-[18%]",
    z: 11,
    w: 290,
    h: 425,
  },
  {
    file: "Main Text.png",
    alt: "Project description",
    className: "left-[6%] top-[36%] w-[38%]",
    z: 12,
    w: 576,
    h: 318,
  },
  {
    file: "Color - Image.png",
    alt: "Fiesta color palette",
    className: "left-[7%] bottom-[6%] w-[40%]",
    z: 13,
    w: 569,
    h: 306,
  },
  {
    file: "Symbol - Image.png",
    alt: "Brand symbol grid",
    className: "right-[4%] top-[5%] w-[46%]",
    z: 14,
    w: 702,
    h: 468,
  },
  {
    file: "Brand Usage - Image.png",
    alt: "Brand usage photography",
    className: "right-[4%] bottom-[7%] w-[42%]",
    z: 15,
    w: 564,
    h: 415,
  },
  {
    file: "Clip 01.png",
    alt: "Binder clip",
    className: "left-[-3%] top-[14%] w-[11%]",
    z: 20,
    w: 208,
    h: 210,
  },
  {
    file: "Clip 02 - Text.png",
    alt: "Binder clip",
    className: "right-[-2%] top-[16%] w-[11%]",
    z: 21,
    w: 206,
    h: 155,
  },
  {
    file: "The Main Logo - Text.png",
    alt: "Label: The Main Logo",
    className: "left-[-13%] top-[-7%] w-[17%]",
    z: 30,
    w: 187,
    h: 182,
  },
  {
    file: "Color of the Fiesta.png",
    alt: "Label: Colors of the Fiesta",
    className: "left-[-10%] bottom-[-13%] w-[14%]",
    z: 31,
    w: 195,
    h: 211,
  },
  {
    file: "Symbol of Identity.png",
    alt: "Label: Symbol of the Identity",
    className: "right-[-2%] top-[-11%] w-[18%]",
    z: 32,
    w: 279,
    h: 183,
  },
  {
    file: "Brand Usage - Text.png",
    alt: "Label: Brand Usage",
    className: "right-[3%] bottom-[-16%] w-[14%]",
    z: 33,
    w: 190,
    h: 171,
  },
];

type StackedBackNotebook = {
  file: string;
  dir: string;
  w: number;
  h: number;
};

type PageConfig = {
  assetDir: string;
  notebookAssetDir?: string;
  /** Blue (etc.) peeking behind the front notebook — reference stack look. */
  stackedBackNotebook?: StackedBackNotebook;
  layers: Layer[];
  aspectW: number;
  aspectH: number;
  ariaLabel: string;
};

const PAGES: PageConfig[] = [
  {
    assetDir: DIR_STATE_01,
    notebookAssetDir: DIR_STATE_02,
    layers: LAYERS_01,
    aspectW: 1481,
    aspectH: 1075,
    ariaLabel: "Kuki branding scrapbook on a blue notebook",
  },
  {
    assetDir: DIR_STATE_02,
    stackedBackNotebook: {
      file: "Blue Notebook.png",
      dir: DIR_STATE_02,
      w: 1481,
      h: 1075,
    },
    layers: LAYERS_02,
    aspectW: 1451,
    aspectH: 1031,
    ariaLabel: "Pista sa Nayon branding on a red notebook",
  },
];

const HOVER_Z = 120;
const SWIPE_PX = 56;

type QuirkyCustom = {
  index: number;
  total: number;
  direction: number;
  skipEntrance: boolean;
  reduceMotion: boolean;
};

const QUIRKY_VARIANTS = {
  initial: ({
    index,
    direction,
    skipEntrance,
    reduceMotion,
  }: QuirkyCustom) => {
    if (skipEntrance || reduceMotion) {
      return { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 };
    }
    const phase = index * 1.17;
    const push = direction > 0 ? 1 : -1;
    return {
      x: push * (22 + (index % 5) * 9 + Math.sin(phase) * 12),
      y: ((index * 13) % 28) - 14,
      rotate: push * (6 + (index % 4) * 2.5),
      scale: 0.78 + (index % 3) * 0.04,
      opacity: 0,
    };
  },
  animate: ({ index, skipEntrance, reduceMotion }: QuirkyCustom) => {
    if (skipEntrance || reduceMotion) {
      return { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 };
    }
    return {
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 380,
        damping: 20,
        mass: 0.62,
        delay: index * 0.042,
      },
    };
  },
  exit: ({
    index,
    total,
    direction,
    reduceMotion,
  }: QuirkyCustom) => {
    if (reduceMotion) {
      return { opacity: 0, transition: { duration: 0 } };
    }
    const rev = total - 1 - index;
    const push = direction > 0 ? -1 : 1;
    return {
      x: push * (36 + (rev % 5) * 11),
      y: 26 + rev * 7 + (rev % 2) * 10,
      rotate: push * (11 + (rev % 3) * 3),
      scale: 0.62 + (rev % 3) * 0.05,
      opacity: 0,
      transition: {
        duration: 0.34,
        ease: [0.22, 1, 0.36, 1] as const,
        delay: rev * 0.038,
      },
    };
  },
};

function QuirkyLayer({
  layer,
  assetDir,
  index,
  total,
  direction,
  skipEntrance,
  reduceMotion,
}: {
  layer: Layer;
  assetDir: string;
  index: number;
  total: number;
  direction: number;
  skipEntrance: boolean;
  reduceMotion: boolean;
}) {
  const aspect = `${layer.w} / ${layer.h}`;
  const [hover, setHover] = useState(false);
  const custom: QuirkyCustom = {
    index,
    total,
    direction,
    skipEntrance,
    reduceMotion,
  };

  return (
    <motion.div
      className={`absolute ${layer.className} cursor-pointer`}
      style={{
        zIndex: hover ? HOVER_Z : layer.z,
        aspectRatio: aspect,
        transformOrigin: `${45 + (index % 5) * 3}% ${40 + (index % 4) * 5}%`,
      }}
      custom={custom}
      variants={QUIRKY_VARIANTS}
      initial="initial"
      animate="animate"
      exit="exit"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      whileHover={
        reduceMotion
          ? undefined
          : {
              scale: 1.07,
              y: -5,
              rotate: (index % 2 === 0 ? 1 : -1) * 1.2,
              transition: { type: "spring", stiffness: 400, damping: 22 },
            }
      }
    >
      <Image
        src={brandingSrc(assetDir, layer.file)}
        alt={layer.alt}
        width={layer.w}
        height={layer.h}
        className="pointer-events-none h-full w-full object-contain select-none drop-shadow-[0_4px_14px_rgba(0,0,0,0.11)]"
        draggable={false}
        sizes="(max-width: 896px) 95vw, 896px"
      />
    </motion.div>
  );
}

/** 3D curl: outgoing blue bends back as if a new spread is covering from above; reverse when going back. */
function useNotebookCoverVariants(reduceMotion: boolean) {
  return useMemo(
    () => ({
      initial: (dir: number) => {
        if (reduceMotion) return { opacity: 1 };
        if (dir > 0) {
          return {
            rotateX: -13,
            y: "-4.5%",
            opacity: 0.5,
            scale: 1.015,
            transformPerspective: 1200,
          };
        }
        if (dir < 0) {
          return {
            rotateX: 11,
            y: "4.5%",
            opacity: 0.5,
            scale: 0.99,
            transformPerspective: 1200,
          };
        }
        return {};
      },
      animate: {
        rotateX: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        transformPerspective: 1200,
        transition: reduceMotion
          ? { duration: 0 }
          : { duration: 0.52, ease: [0.22, 0.61, 0.36, 1] as const },
      },
      exit: (dir: number) => {
        if (reduceMotion) {
          return { opacity: 0, transition: { duration: 0.12 } };
        }
        if (dir > 0) {
          return {
            rotateX: 26,
            y: "7%",
            opacity: 0.4,
            scale: 0.93,
            transformPerspective: 1200,
            transition: {
              duration: 0.46,
              ease: [0.48, 0.03, 0.58, 1] as const,
            },
          };
        }
        return {
          rotateX: -24,
          y: "-6%",
          opacity: 0.4,
          scale: 0.93,
          transformPerspective: 1200,
          transition: {
            duration: 0.46,
            ease: [0.48, 0.03, 0.58, 1] as const,
          },
        };
      },
    }),
    [reduceMotion],
  );
}

function BrandingSpread({
  pageIndex,
  assetDir,
  notebookAssetDir,
  stackedBackNotebook,
  aspectW,
  aspectH,
  ariaLabel,
  notebook,
  content,
  direction,
  skipEntrance,
  reduceMotion,
}: {
  pageIndex: number;
  assetDir: string;
  notebookAssetDir?: string;
  stackedBackNotebook?: StackedBackNotebook;
  aspectW: number;
  aspectH: number;
  ariaLabel: string;
  notebook: Layer;
  content: Layer[];
  direction: number;
  skipEntrance: boolean;
  reduceMotion: boolean;
}) {
  const notebookCoverVariants = useNotebookCoverVariants(reduceMotion);
  const notebookDir = notebookAssetDir ?? assetDir;
  const showStackUnder = !!stackedBackNotebook;

  return (
    <div
      className="relative mx-auto w-full max-w-4xl touch-manipulation overflow-visible"
      style={{ aspectRatio: `${aspectW} / ${aspectH}` }}
      role="img"
      aria-label={ariaLabel}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-visible [perspective:1200px]"
        aria-hidden
      >
        <AnimatePresence mode="sync">
          {showStackUnder && stackedBackNotebook ? (
            <motion.div
              key="notebook-stack-under"
              className="absolute inset-0 z-[1] h-full w-full"
              initial={
                reduceMotion
                  ? { opacity: 1 }
                  : { opacity: 0, scale: 0.98 }
              }
              animate={{ opacity: 1, scale: 1.03 }}
              transition={{
                opacity: { duration: 0.38, delay: 0.08 },
                scale: { type: "spring", stiffness: 280, damping: 24 },
              }}
              exit={
                reduceMotion
                  ? { opacity: 0, transition: { duration: 0.12 } }
                  : {
                      opacity: 0,
                      scale: 0.99,
                      transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] },
                    }
              }
            >
              <div className="h-full w-full translate-x-[4.8%] translate-y-[4.2%]">
                <Image
                  src={brandingSrc(
                    stackedBackNotebook.dir,
                    stackedBackNotebook.file,
                  )}
                  alt=""
                  width={stackedBackNotebook.w}
                  height={stackedBackNotebook.h}
                  className="h-full w-full object-contain object-center select-none"
                  draggable={false}
                  sizes="(max-width: 896px) 95vw, 896px"
                />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="absolute inset-0 z-[2] h-full w-full [perspective:1200px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`${pageIndex}-${notebook.file}`}
              custom={direction}
              variants={notebookCoverVariants}
              initial={skipEntrance ? false : "initial"}
              animate="animate"
              exit="exit"
              className="h-full w-full"
              style={{
                transformStyle: "preserve-3d",
                transformOrigin: "50% 22%",
                backfaceVisibility: "hidden",
              }}
            >
              <Image
                src={brandingSrc(notebookDir, notebook.file)}
                alt={notebook.alt}
                width={notebook.w}
                height={notebook.h}
                className={`h-full w-full object-contain object-center select-none ${
                  showStackUnder
                    ? "drop-shadow-[0_14px_32px_rgba(0,0,0,0.22)]"
                    : ""
                }`}
                draggable={false}
                priority={pageIndex === 0}
                sizes="(max-width: 896px) 95vw, 896px"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={pageIndex}
          className="absolute inset-0 z-10 overflow-visible"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 1,
            transition: { staggerChildren: 0.03, staggerDirection: -1 },
          }}
        >
          {content.map((layer, i) => (
            <QuirkyLayer
              key={`${pageIndex}-${layer.file}`}
              layer={layer}
              assetDir={assetDir}
              index={i}
              total={content.length}
              direction={direction}
              skipEntrance={skipEntrance}
              reduceMotion={reduceMotion}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function KukiBrandingSpreads() {
  const reduceMotion = useReducedMotion();
  const rm = !!reduceMotion;
  const [pageIndex, setPageIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const firstKukiMount = useRef(true);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (pageIndex !== 0) firstKukiMount.current = false;
  }, [pageIndex]);

  const handleGoNext = useCallback(() => {
    if (pageIndex >= PAGES.length - 1) return;
    setDirection(1);
    setPageIndex((i) => i + 1);
  }, [pageIndex]);

  const handleGoPrev = useCallback(() => {
    if (pageIndex <= 0) return;
    setDirection(-1);
    setPageIndex((i) => i - 1);
  }, [pageIndex]);

  const onPointerDown = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    pointerStart.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const onPointerUp = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      const start = pointerStart.current;
      pointerStart.current = null;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      if (!start) return;
      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;
      if (Math.abs(dx) < Math.abs(dy) * 1.2) return;
      if (dx < -SWIPE_PX) handleGoNext();
      else if (dx > SWIPE_PX) handleGoPrev();
    },
    [handleGoNext, handleGoPrev],
  );

  const page = PAGES[pageIndex];
  const notebook = page.layers.find((l) => l.isNotebook);
  const content = page.layers.filter((l) => !l.isNotebook);
  if (!notebook) {
    return null;
  }

  const skipEntrance = pageIndex === 0 && firstKukiMount.current;

  return (
    <div className="graph-paper-grid">
      <div className="mx-auto max-w-5xl overflow-visible px-4 py-10 sm:px-8 sm:py-16">

        <div
          className="relative select-none"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          style={{ touchAction: "pan-y" }}
        >
          <BrandingSpread
            pageIndex={pageIndex}
            assetDir={page.assetDir}
            notebookAssetDir={page.notebookAssetDir}
            stackedBackNotebook={page.stackedBackNotebook}
            aspectW={page.aspectW}
            aspectH={page.aspectH}
            ariaLabel={page.ariaLabel}
            notebook={notebook}
            content={content}
            direction={direction}
            skipEntrance={skipEntrance}
            reduceMotion={rm}
          />
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {PAGES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Open branding page ${i + 1}`}
              aria-current={i === pageIndex}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${i === pageIndex ? "bg-neutral-800" : "bg-neutral-300 hover:bg-neutral-400"}`}
              onClick={() => {
                if (i === pageIndex) return;
                setDirection(i > pageIndex ? 1 : -1);
                setPageIndex(i);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

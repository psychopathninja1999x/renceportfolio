"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useMemo, useRef, useState } from "react";

/** Local files in `public/Assets` — path segments are encoded for spaces / commas. */
function assetUrl(filename: string) {
  return `/Assets/${encodeURIComponent(filename)}`;
}

/**
 * Display size from PNG pixels — scaled so the largest props (~laptop) reach ~⅓ of
 * a typical viewport width; tiny assets (buds, apple) stay the smallest.
 */
function computeDisplayDimensions(
  naturalWidth: number,
  naturalHeight: number,
): { width: number; height: number } {
  const BASE_SCALE = 0.92;
  const MAX_EDGE_PX = 392;
  const MIN_EDGE_PX = 28;

  let w = Math.round(naturalWidth * BASE_SCALE);
  let h = Math.round(naturalHeight * BASE_SCALE);

  let maxE = Math.max(w, h);
  if (maxE > MAX_EDGE_PX) {
    const r = MAX_EDGE_PX / maxE;
    w = Math.round(w * r);
    h = Math.round(h * r);
  }

  let minE = Math.min(w, h);
  if (minE < MIN_EDGE_PX) {
    const r = MIN_EDGE_PX / minE;
    w = Math.round(w * r);
    h = Math.round(h * r);
    maxE = Math.max(w, h);
    if (maxE > MAX_EDGE_PX) {
      const r2 = MAX_EDGE_PX / maxE;
      w = Math.round(w * r2);
      h = Math.round(h * r2);
    }
  }

  return { width: Math.max(1, w), height: Math.max(1, h) };
}

type CollageAsset = {
  id: string;
  file: string;
  alt: string;
  /** Position only — widths come from intrinsic PNG size + computeDisplayDimensions */
  className: string;
  rotateDeg: number;
  stackOrder: number;
  /** Measured from each PNG in `public/Assets` (IHDR) */
  naturalWidth: number;
  naturalHeight: number;
};

/** Placement tuned to mirror the reference: laptop left, mat right, coffee on headline, etc. */
const COLLAGE_ASSETS: CollageAsset[] = [
  {
    id: "laptop",
    file: "Laptop.png",
    alt: "Laptop",
    className: "absolute top-[4%] left-[0%] sm:left-[1%]",
    rotateDeg: -4,
    stackOrder: 10,
    naturalWidth: 384,
    naturalHeight: 459,
  },
  {
    id: "cutting-mat",
    file: "Cutting Mat.png",
    alt: "Cutting mat",
    className: "absolute bottom-[6%] right-[5%] left-auto",
    rotateDeg: 5,
    stackOrder: 11,
    naturalWidth: 405,
    naturalHeight: 302,
  },
  {
    id: "coffee",
    file: "Coffee.png",
    alt: "Coffee",
    className: "absolute top-[22%] left-[40%] sm:left-[42%]",
    rotateDeg: 11,
    stackOrder: 12,
    naturalWidth: 150,
    naturalHeight: 125,
  },
  {
    id: "wooden-model",
    file: "Wooden Model.png",
    alt: "Wooden artist model",
    className: "absolute bottom-[10%] left-[3%] sm:left-[5%]",
    rotateDeg: -7,
    stackOrder: 13,
    naturalWidth: 174,
    naturalHeight: 332,
  },
  {
    id: "cactus",
    file: "Cactus.png",
    alt: "Cactus",
    className: "absolute top-[12%] right-[12%] sm:right-[18%]",
    rotateDeg: 3,
    stackOrder: 14,
    naturalWidth: 134,
    naturalHeight: 134,
  },
  {
    id: "ipad",
    file: "Ipad.png",
    alt: "Tablet",
    className: "absolute bottom-[8%] left-[43%] sm:left-[45%]",
    rotateDeg: -2,
    stackOrder: 15,
    naturalWidth: 248,
    naturalHeight: 305,
  },
  {
    id: "phone",
    file: "Phone.png",
    alt: "Phone",
    className: "absolute top-[30%] right-[4%] sm:right-[7%]",
    rotateDeg: 8,
    stackOrder: 16,
    naturalWidth: 104,
    naturalHeight: 183,
  },
  {
    id: "pencil",
    file: "Pencil.png",
    alt: "Pencil",
    className: "absolute top-[2%] right-[8%] sm:top-[4%] sm:right-[12%]",
    rotateDeg: -18,
    stackOrder: 17,
    naturalWidth: 135,
    naturalHeight: 190,
  },
  {
    id: "apple",
    file: "Apple.png",
    alt: "Apple",
    className: "absolute bottom-[18%] right-[28%] sm:right-[32%]",
    rotateDeg: 6,
    stackOrder: 18,
    naturalWidth: 83,
    naturalHeight: 83,
  },
  {
    id: "carebear-blue",
    file: "Carebear_Blue.png",
    alt: "Care bear blue",
    className: "absolute bottom-[4%] right-[2%] sm:right-[6%]",
    rotateDeg: -5,
    stackOrder: 19,
    naturalWidth: 77,
    naturalHeight: 141,
  },
  {
    id: "carebear-pink",
    file: "Carebear_Pink.png",
    alt: "Care bear pink",
    className: "absolute top-[1%] left-[22%] sm:left-[26%]",
    rotateDeg: 4,
    stackOrder: 20,
    naturalWidth: 72,
    naturalHeight: 135,
  },
  {
    id: "earphones-1",
    file: "Earphones_1.png",
    alt: "Earphones",
    className: "absolute bottom-[20%] left-[28%] sm:left-[32%]",
    rotateDeg: -12,
    stackOrder: 21,
    naturalWidth: 31,
    naturalHeight: 39,
  },
  {
    id: "earphones-2",
    file: "Earphones_2.png",
    alt: "Earphones",
    className: "absolute bottom-[14%] left-[38%] sm:left-[40%]",
    rotateDeg: 14,
    stackOrder: 22,
    naturalWidth: 30,
    naturalHeight: 38,
  },
  {
    id: "hirono-1",
    file: "Hirono_1.png",
    alt: "Figurine",
    className: "absolute top-[36%] left-[45%] sm:left-[48%]",
    rotateDeg: -3,
    stackOrder: 23,
    naturalWidth: 72,
    naturalHeight: 120,
  },
  {
    id: "hirono-2",
    file: "Hirono_2.png",
    alt: "Figurine",
    className: "absolute top-[44%] left-[50%] sm:left-[52%]",
    rotateDeg: 5,
    stackOrder: 24,
    naturalWidth: 101,
    naturalHeight: 124,
  },
  {
    id: "paper-1",
    file: "Paper-1.png",
    alt: "Paper",
    className: "absolute top-[32%] left-[18%] sm:left-[22%]",
    rotateDeg: -1,
    stackOrder: 25,
    naturalWidth: 125,
    naturalHeight: 78,
  },
  {
    id: "paper",
    file: "Paper.png",
    alt: "Paper",
    className: "absolute top-[38%] left-[12%] sm:left-[16%]",
    rotateDeg: 2,
    stackOrder: 26,
    naturalWidth: 152,
    naturalHeight: 150,
  },
  {
    id: "smiski-1",
    file: "Smiski_1.png",
    alt: "Smiski figure",
    className: "absolute top-[14%] right-[2%] sm:right-[6%]",
    rotateDeg: -9,
    stackOrder: 27,
    naturalWidth: 44,
    naturalHeight: 71,
  },
  {
    id: "smiski-2",
    file: "Smiski_2.png",
    alt: "Smiski figure",
    className: "absolute top-[18%] right-[0%] sm:right-[2%]",
    rotateDeg: 7,
    stackOrder: 28,
    naturalWidth: 48,
    naturalHeight: 84,
  },
  {
    id: "sticker-1",
    file: "Sticker_1.png",
    alt: "Sticker",
    className: "absolute top-[28%] left-[8%] sm:left-[12%]",
    rotateDeg: -6,
    stackOrder: 29,
    naturalWidth: 92,
    naturalHeight: 69,
  },
  {
    id: "portrait",
    file: "Delos Santos, Lawrence David.png",
    alt: "Lawrence David Delos Santos",
    className: "absolute top-[34%] right-[22%] sm:right-[26%]",
    rotateDeg: 1,
    stackOrder: 30,
    naturalWidth: 72,
    naturalHeight: 97,
  },
];

type DraggableItemProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
  rotateDeg: number;
  constraintsRef: React.RefObject<HTMLDivElement | null>;
  stackOrder: number;
  isFront: boolean;
  onFocus: (id: string) => void;
  displayWidth: number;
  displayHeight: number;
};

function DraggableItem({
  id,
  children,
  className = "",
  rotateDeg,
  constraintsRef,
  stackOrder,
  isFront,
  onFocus,
  displayWidth,
  displayHeight,
}: DraggableItemProps) {
  const reduceMotion = useReducedMotion();
  const dragEnabled = !reduceMotion;

  const z = isFront ? 60 : stackOrder;

  return (
    <motion.div
      className={`pointer-events-auto cursor-grab touch-none select-none ${className}`}
      drag={dragEnabled}
      dragConstraints={constraintsRef}
      dragMomentum={false}
      dragElastic={0.06}
      onPointerDown={() => onFocus(id)}
      whileHover={
        reduceMotion ? undefined : { scale: 1.05, transition: { duration: 0.25 } }
      }
      whileDrag={{ scale: 1.05, cursor: "grabbing", zIndex: 80 }}
      style={{
        rotate: rotateDeg,
        zIndex: z,
        width: displayWidth,
        height: displayHeight,
      }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
    >
      {children}
    </motion.div>
  );
}

export function HeroCollage() {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [frontId, setFrontId] = useState<string | null>(null);

  const onFocus = useCallback((id: string) => {
    setFrontId(id);
  }, []);

  const sizedAssets = useMemo(
    () =>
      COLLAGE_ASSETS.map((item) => ({
        ...item,
        display: computeDisplayDimensions(item.naturalWidth, item.naturalHeight),
      })),
    [],
  );

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-visible pt-28 pb-16 graph-paper-grid">
      {/* Drag bounds extend past the hero so pieces can sit / move outside the frame */}
      <div
        ref={constraintsRef}
        className="pointer-events-none absolute left-[-18vw] right-[-18vw] top-[-12vh] bottom-[-22vh] z-0 min-h-0"
        aria-hidden
      />
      <div className="pointer-events-none relative z-10 mx-auto w-full max-w-5xl px-6 sm:px-8">
        <h1 className="text-left font-sans text-3xl font-normal leading-[1.15] tracking-tight text-neutral-900 sm:text-4xl md:text-5xl lg:text-[2.75rem] lg:leading-[1.12]">
          <span className="block font-bold">Hey There,</span>
          <span className="mt-1 block font-medium">
            I&apos;m Rence. I make things look good and feel right. Being messy is
            part of the master plan.
          </span>
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-center font-sans text-base font-normal leading-relaxed text-neutral-700 sm:text-lg">
          I&apos;m a visual designer obsessed with the friction between art and
          function. I don&apos;t just &apos;make logos&apos;—I build visual worlds
          that demand to be touched (or dragged).
        </p>
      </div>

      <div className="pointer-events-none absolute inset-0 z-20 isolate overflow-visible">
        {sizedAssets.map((item) => (
          <DraggableItem
            key={item.id}
            id={item.id}
            className={item.className}
            rotateDeg={item.rotateDeg}
            constraintsRef={constraintsRef}
            stackOrder={item.stackOrder}
            isFront={frontId === item.id}
            onFocus={onFocus}
            displayWidth={item.display.width}
            displayHeight={item.display.height}
          >
            <Image
              className="pointer-events-none h-full w-full object-contain drop-shadow-lg sm:drop-shadow-xl"
              src={assetUrl(item.file)}
              alt={item.alt}
              width={item.naturalWidth}
              height={item.naturalHeight}
              sizes={`${Math.max(item.display.width, 48)}px`}
              priority={item.id === "laptop"}
              draggable={false}
            />
          </DraggableItem>
        ))}
      </div>
    </main>
  );
}

"use client";

import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { ArrowRightIcon } from "@/components/ui/icons";
import { cn } from "@/lib/class-names";

type SliderProps = {
  children: ReactNode;
  labels: {
    region: string;
    previous: string;
    next: string;
    goTo: string;
    slide: string;
  };
  itemClassName?: string;
  className?: string;
};

type SliderState = {
  scrollable: boolean;
  count: number;
  index: number;
  canPrev: boolean;
  canNext: boolean;
};

const INITIAL_STATE: SliderState = {
  scrollable: false,
  count: 0,
  index: 0,
  canPrev: false,
  canNext: false,
};

function fill(template: string, values: Record<string, number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    String(values[key] ?? ""),
  );
}

// scroll stops: every slide + end of track
function getSnapPoints(track: HTMLElement) {
  const inset = parseFloat(getComputedStyle(track).paddingLeft) || 0;
  const max = track.scrollWidth - track.clientWidth;
  if (max <= 1) return { points: [0], max: 0 };

  const points = (Array.from(track.children) as HTMLElement[])
    .map((slide) => Math.max(0, slide.offsetLeft - inset))
    .filter((left) => left <= max + 1);
  const last = points.at(-1) ?? 0;
  if (max - last > 1) points.push(max);
  return { points, max };
}

export function Slider({
  children,
  labels,
  itemClassName,
  className,
}: SliderProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [state, setState] = useState<SliderState>(INITIAL_STATE);
  const slides = Children.toArray(children);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const { points, max } = getSnapPoints(track);
    const left = track.scrollLeft;
    let index = 0;
    points.forEach((point, i) => {
      if (Math.abs(point - left) < Math.abs(points[index] - left)) index = i;
    });
    const next: SliderState = {
      scrollable: max > 1,
      count: points.length,
      index,
      canPrev: left > 1,
      canNext: left < max - 1,
    };
    setState((prev) =>
      prev.scrollable === next.scrollable &&
      prev.count === next.count &&
      prev.index === next.index &&
      prev.canPrev === next.canPrev &&
      prev.canNext === next.canNext
        ? prev
        : next,
    );
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [measure]);

  const goTo = useCallback((target: number) => {
    const track = trackRef.current;
    if (!track) return;
    const { points } = getSnapPoints(track);
    const left = points[Math.min(Math.max(target, 0), points.length - 1)];
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    track.scrollTo({ left, behavior: reduceMotion ? "auto" : "smooth" });
  }, []);

  const onKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(state.index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(state.index - 1);
    }
  };

  const controlClass =
    "bg-surface text-accent-strong border-border hover:bg-secondary inline-flex size-11 items-center justify-center rounded-full border shadow-sm transition-colors aria-disabled:pointer-events-none aria-disabled:opacity-40";

  return (
    <section
      aria-roledescription="carousel"
      aria-label={labels.region}
      className={className}
    >
      <ul
        ref={trackRef}
        tabIndex={0}
        onScroll={measure}
        onKeyDown={onKeyDown}
        className="relative -mx-4 -my-10 flex snap-x snap-mandatory scroll-pl-4 [scrollbar-width:none] gap-4 overflow-x-auto overscroll-x-contain px-4 py-10 sm:gap-6 [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, i) => (
          <li
            key={i}
            aria-roledescription="slide"
            aria-label={fill(labels.slide, { n: i + 1, total: slides.length })}
            className={cn("min-w-0 shrink-0 snap-start", itemClassName)}
          >
            {slide}
          </li>
        ))}
      </ul>

      {state.scrollable ? (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label={labels.previous}
            aria-disabled={!state.canPrev}
            onClick={() => state.canPrev && goTo(state.index - 1)}
            className={controlClass}
          >
            <ArrowRightIcon className="size-5 rotate-180" />
          </button>
          <div className="flex items-center">
            {Array.from({ length: state.count }, (_, i) => (
              <button
                key={i}
                type="button"
                aria-label={fill(labels.goTo, { n: i + 1 })}
                aria-current={i === state.index}
                onClick={() => goTo(i)}
                className="group flex h-8 items-center px-1"
              >
                <span
                  className={cn(
                    "block h-2 rounded-full transition-all duration-300",
                    i === state.index
                      ? "bg-accent-strong w-6"
                      : "bg-accent-strong/30 group-hover:bg-accent-strong/60 w-2",
                  )}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-label={labels.next}
            aria-disabled={!state.canNext}
            onClick={() => state.canNext && goTo(state.index + 1)}
            className={controlClass}
          >
            <ArrowRightIcon className="size-5" />
          </button>
        </div>
      ) : null}
    </section>
  );
}

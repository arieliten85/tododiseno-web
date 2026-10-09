"use client";

import { useEffect } from "react";

const OBSERVER_OPTIONS: IntersectionObserverInit = {
  rootMargin: "0px 0px -8% 0px",
  threshold: 0.12,
};

// marks in-view [data-reveal] els as revealed first so nothing flashes
export function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const targets = [
      ...document.querySelectorAll<HTMLElement>("[data-reveal]"),
    ];
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) return;

    const reveal = (el: HTMLElement) => el.setAttribute("data-revealed", "");

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        reveal(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      }
    }, OBSERVER_OPTIONS);

    for (const el of targets) {
      if (el.getBoundingClientRect().top < window.innerHeight) reveal(el);
      else observer.observe(el);
    }
    root.setAttribute("data-reveal-ready", "");

    return () => {
      observer.disconnect();
      root.removeAttribute("data-reveal-ready");
    };
  }, []);

  return null;
}

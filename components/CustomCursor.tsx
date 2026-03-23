"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot follows instantly
      gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.1, ease: "power2.out" });
      // Ring follows with smooth lag
      gsap.to(ring, { x: mouseX, y: mouseY, duration: 0.35, ease: "power2.out" });
    };

    const onMouseDown = () => {
      gsap.to(ring, { scale: 0.7, duration: 0.2, ease: "power2.out" });
      gsap.to(dot, { scale: 1.5, duration: 0.2, ease: "power2.out" });
    };

    const onMouseUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.4)" });
      gsap.to(dot, { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.4)" });
    };

    const onMouseEnterLink = () => {
      gsap.to(ring, { scale: 1.6, borderColor: "rgba(232,168,56,0.6)", duration: 0.3 });
      gsap.to(dot, { scale: 0.5, backgroundColor: "#E8A838", duration: 0.3 });
    };

    const onMouseLeaveLink = () => {
      gsap.to(ring, { scale: 1, borderColor: "rgba(255,255,255,0.4)", duration: 0.3 });
      gsap.to(dot, { scale: 1, backgroundColor: "#ffffff", duration: 0.3 });
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);

    // Detect hover on interactive elements
    const interactiveElements = document.querySelectorAll("a, button, input, select, textarea, [role='button']");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterLink);
      el.addEventListener("mouseleave", onMouseLeaveLink);
    });

    // Hide on mobile / touch devices
    const mql = window.matchMedia("(pointer: fine)");
    if (!mql.matches) {
      dot.style.display = "none";
      ring.style.display = "none";
    }

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterLink);
        el.removeEventListener("mouseleave", onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#ffffff",
          transform: "translate(-50%, -50%)",
        }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "2px solid rgba(255,255,255,0.4)",
          transform: "translate(-50%, -50%)",
          backdropFilter: "blur(1px)",
        }}
      />
      {/* Hide default cursor globally */}
      <style jsx global>{`
        @media (pointer: fine) {
          *, *::before, *::after {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}

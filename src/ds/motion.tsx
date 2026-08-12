import { Fragment, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import type { FlowNode } from '../content/types';
import { isSoundOn, setSoundOn, sfx } from './soundKit';

/* ── Reveal ──────────────────────────────────────────────────────────────────
   The system's only entrance: 12px rise + fade, 420ms expo-out, 60ms stagger.
   Server-rendered markup is visible; the client entry adds `html.js`, which is
   what makes the hidden state possible in the first place. No JS, no blank page. */

export function Reveal({ delay = 0, children }: { delay?: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`mc-reveal${shown ? ' is-shown' : ''}`}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}

/* ── GeoField ────────────────────────────────────────────────────────────────
   Ambient lattice of outlined squares and circles with slow drift, on canvas.
   Monochrome, never behind long-form text, static frame under reduced motion. */

export function GeoField({
  density = 9,
  speed = 1,
  opacity = 0.5,
  /** Drift radius in px. Enough that the field reads as moving; past ~14 the
   *  lattice starts to shear and the connecting lines look tangled. */
  drift = 12,
}: {
  density?: number;
  speed?: number;
  opacity?: number;
  drift?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const stroke = getComputedStyle(cv).getPropertyValue('color').trim() || '#08090A';
    let raf = 0;
    let t = 0;
    let w = 0;
    let h = 0;

    const resize = () => {
      const r = cv.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      w = r.width;
      h = r.height;
      cv.width = Math.max(1, Math.round(w * dpr));
      cv.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 1;

      const cols = density;
      const rows = Math.max(2, Math.round((density * h) / Math.max(w, 1)));
      const gx = w / (cols + 1);
      const gy = h / (rows + 1);
      const pts: { x: number; y: number; a: number }[] = [];

      for (let i = 1; i <= cols; i++) {
        for (let j = 1; j <= rows; j++) {
          // Low spatial frequency on purpose: neighbours stay close to in
          // phase, so the lattice glides as a whole instead of shearing.
          const phase = t * 0.0011 * speed + (i * 0.3 + j * 0.42);
          pts.push({
            x: i * gx + Math.cos(phase) * drift,
            y: j * gy + Math.sin(phase * 0.8) * drift,
            a: phase,
          });
        }
      }

      pts.forEach((p, k) => {
        const s = 5 + (k % 3) * 3;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.a * 0.4);
        ctx.globalAlpha = opacity * 0.55;
        if (k % 4 === 0) {
          ctx.beginPath();
          ctx.arc(0, 0, s * 0.5, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          ctx.strokeRect(-s / 2, -s / 2, s, s);
        }
        ctx.restore();
      });

      ctx.globalAlpha = opacity * 0.16;
      const reach = Math.max(gx, gy) * 1.15;
      for (let k = 0; k < pts.length; k++) {
        for (let m = k + 1; m < pts.length; m++) {
          if (Math.hypot(pts[k].x - pts[m].x, pts[k].y - pts[m].y) < reach) {
            ctx.beginPath();
            ctx.moveTo(pts[k].x, pts[k].y);
            ctx.lineTo(pts[m].x, pts[m].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      t += 16;
      draw();
      raf = requestAnimationFrame(loop);
    };

    resize();
    draw();
    if (!reduced) loop();

    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(cv);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [density, speed, opacity, drift]);

  return (
    <div className="mc-geofield" aria-hidden="true">
      <canvas ref={ref} />
    </div>
  );
}

/* ── FlowDiagram ─────────────────────────────────────────────────────────────
   Architecture and method as a flow: labelled nodes, dashed hairline edges and
   a signal pulse travelling along them. */

export function FlowDiagram({
  nodes,
  orientation = 'horizontal',
}: {
  nodes: FlowNode[];
  orientation?: 'horizontal' | 'vertical';
}) {
  const vertical = orientation === 'vertical';
  return (
    <div className={`mc-flow${vertical ? ' mc-flow--vertical' : ''}`}>
      {nodes.map((n, i) => (
        <Fragment key={n.label}>
          <div className={`mc-flow__node${n.accent ? ' mc-flow__node--accent' : ''}`}>
            <div className="mc-flow__label">{n.label}</div>
            {n.sub && <div className="mc-flow__sub">{n.sub}</div>}
          </div>
          {i < nodes.length - 1 && (
            <svg
              className="mc-flow__edge"
              viewBox={vertical ? '0 0 4 40' : '0 0 64 4'}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <line
                className="mc-flow__line"
                x1={vertical ? 2 : 0}
                y1={vertical ? 0 : 2}
                x2={vertical ? 2 : 64}
                y2={vertical ? 40 : 2}
              />
              <circle
                className="mc-flow__pulse"
                r="2.5"
                cx={vertical ? 2 : 0}
                cy={vertical ? 0 : 2}
                style={{ animationDelay: `${i * 0.35}s` }}
              />
            </svg>
          )}
        </Fragment>
      ))}
    </div>
  );
}

/* ── SoundToggle ─────────────────────────────────────────────────────────────
   Off by default, never auto-plays, persisted in localStorage. */

export function SoundToggle({ label, onText, offText }: { label: string; onText: string; offText: string }) {
  const [on, setOn] = useState(false);

  // Read after mount: the server has no localStorage, so hydration must match.
  useEffect(() => setOn(isSoundOn()), []);

  return (
    <button
      type="button"
      className="mc-sound"
      aria-pressed={on}
      aria-label={on ? onText : offText}
      onClick={() => {
        const next = !on;
        setSoundOn(next);
        setOn(next);
        if (next) sfx.on();
      }}
    >
      <span className="mc-sound__bars" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      {label}
    </button>
  );
}

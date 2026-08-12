/**
 * Synthesised UI sound — no audio files, just short WebAudio blips.
 * Off by default, never auto-plays, and the choice persists in localStorage.
 *
 * The palette is fixed by the design system: hover 1240Hz/30ms, tick 880Hz/45ms,
 * press 340→520Hz/90ms, reveal 240→380Hz/220ms, gain ≤ 0.05. Everything below is
 * either one of those or a quieter variant of one, never a new instrument.
 *
 * Two rules the system states and this file enforces:
 * sound never plays on its own, and sound never follows scroll.
 */
const KEY = 'mcode.sound';

let ctx: AudioContext | null = null;

export function isSoundOn(): boolean {
  try {
    return localStorage.getItem(KEY) === 'on';
  } catch {
    return false;
  }
}

export function setSoundOn(on: boolean): void {
  try {
    localStorage.setItem(KEY, on ? 'on' : 'off');
  } catch {
    /* private mode — the toggle still works for this session */
  }
}

function audio(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const AC =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

/**
 * Rate limit per channel. Sweeping a cursor across a row of nav items or case
 * cards fires mouseenter far faster than the ear wants — without this the layer
 * turns into a machine gun.
 */
const lastPlayed: Record<string, number> = {};

function gate(channel: string, gapMs: number): boolean {
  const now = typeof performance === 'undefined' ? Date.now() : performance.now();
  if (now - (lastPlayed[channel] ?? -Infinity) < gapMs) return false;
  lastPlayed[channel] = now;
  return true;
}

/** Minor-pentatonic degrees, in semitones. Indexed elements walk up the scale. */
const SCALE = [0, 3, 5, 7, 10];
const step = (i: number) => 2 ** (SCALE[((i % SCALE.length) + SCALE.length) % SCALE.length] / 12);

interface Blip {
  freq?: number;
  dur?: number;
  type?: OscillatorType;
  gain?: number;
  glide?: number;
}

function blip({ freq = 520, dur = 0.07, type = 'sine', gain = 0.045, glide = 0 }: Blip): void {
  const a = audio();
  if (!a) return;
  const osc = a.createOscillator();
  const amp = a.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, a.currentTime);
  if (glide) osc.frequency.exponentialRampToValueAtTime(Math.max(60, freq + glide), a.currentTime + dur);
  amp.gain.setValueAtTime(0, a.currentTime);
  amp.gain.linearRampToValueAtTime(gain, a.currentTime + 0.006);
  amp.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + dur);
  osc.connect(amp);
  amp.connect(a.destination);
  osc.start();
  osc.stop(a.currentTime + dur + 0.02);
}

export const sfx = {
  /** Small controls: buttons, links. `i` walks a scale across a row of siblings. */
  hover(i = 0) {
    if (isSoundOn() && gate('hover', 55)) {
      blip({ freq: 1240 * step(i), dur: 0.03, type: 'sine', gain: 0.012 });
    }
  },

  /** Discrete controls: nav items, toggles, flow nodes. */
  tick(i = 0) {
    if (isSoundOn() && gate('tick', 45)) {
      blip({ freq: 880 * step(i), dur: 0.045, type: 'square', gain: 0.02 });
    }
  },

  /** Large surfaces: case cards. Lower and softer, so size reads in the pitch. */
  enter(i = 0) {
    if (isSoundOn() && gate('enter', 90)) {
      blip({ freq: 660 * step(i), dur: 0.05, type: 'sine', gain: 0.016 });
    }
  },

  /** Committing to something: a click, a submit. */
  press() {
    if (isSoundOn() && gate('press', 40)) {
      blip({ freq: 340, dur: 0.09, type: 'triangle', gain: 0.05, glide: 180 });
    }
  },

  /** Entering a text field. The quietest thing in the kit — it must not startle. */
  focus() {
    if (isSoundOn() && gate('focus', 120)) {
      blip({ freq: 980, dur: 0.025, type: 'sine', gain: 0.01 });
    }
  },

  /** Form accepted. The only two-note gesture, and it only ever follows a click. */
  confirm() {
    if (!isSoundOn()) return;
    blip({ freq: 620, dur: 0.08, type: 'sine', gain: 0.035 });
    setTimeout(() => blip({ freq: 930, dur: 0.16, type: 'sine', gain: 0.03, glide: 120 }), 90);
  },

  /**
   * Defined by the design system for scroll-in reveals, deliberately never
   * wired up: the same system forbids sound that follows scroll.
   */
  reveal() {
    if (isSoundOn()) blip({ freq: 240, dur: 0.22, type: 'sine', gain: 0.03, glide: 140 });
  },

  /** Plays once when the visitor switches sound on — the only unconditional blip. */
  on() {
    blip({ freq: 520, dur: 0.1, type: 'sine', gain: 0.05, glide: 340 });
  },
};

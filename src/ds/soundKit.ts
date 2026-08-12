/**
 * Synthesised UI sound — no audio files, just short WebAudio blips.
 * Off by default, never auto-plays, and the choice persists in localStorage.
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
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

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
  tick: () => isSoundOn() && blip({ freq: 880, dur: 0.045, type: 'square', gain: 0.02 }),
  press: () => isSoundOn() && blip({ freq: 340, dur: 0.09, type: 'triangle', gain: 0.05, glide: 180 }),
  hover: () => isSoundOn() && blip({ freq: 1240, dur: 0.03, type: 'sine', gain: 0.012 }),
  reveal: () => isSoundOn() && blip({ freq: 240, dur: 0.22, type: 'sine', gain: 0.03, glide: 140 }),
  /** Plays once when the visitor switches sound on — the only unconditional blip. */
  on: () => blip({ freq: 520, dur: 0.1, type: 'sine', gain: 0.05, glide: 340 }),
};

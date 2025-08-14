'use client';
import { useState, useEffect } from 'react';

const FILM_WORDS = [
  'Cinematography','Storyboard','Color Grading','Screenplay','Foley',
  'Sound Design','VFX','Key Light','Gaffer','Grip','Blocking','Dailies',
  'ADR','Shot List','Call Sheet','Director\'s Cut','Montage','Aspect Ratio',
  'Slate','Continuity','Rushes','B-Roll','Coverage','Mise-en-scène',
];

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function FilmTicker() {
  const [sequence, setSequence] = useState<string[]>([]);

  useEffect(() => {
    const shuffled = shuffle(FILM_WORDS);
    setSequence([...shuffled, ...shuffled]);
  }, []);

  if (sequence.length === 0) return null; // prevent SSR mismatch

  return (
    <section
      aria-label="Film production terms"
      className="w-full z-50 bg-stone-800 text-white overflow-hidden"
    >
      <div className="relative h-9 flex items-center">
        <div className="ticker group" role="marquee">
          {[0, 1].map(trackIndex => (
            <div key={trackIndex} className="track" aria-hidden={trackIndex === 1}>
              {sequence.map((w, i) => (
                <span
                  key={`${trackIndex}-${i}`}
                  className={`item ${i % 2 === 0 ? 'alt-font italic' : 'font-sans'}`}
                >
                  {w}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .ticker {
          position: relative;
          white-space: nowrap;
        }
        .track {
          display: inline-flex;
          align-items: center;
          gap: 1.25rem;
          animation: ticker-scroll 22s linear infinite;
          will-change: transform;
          padding-right: 1.25rem;
        }
        .group:hover .track {
          animation-play-state: paused;
        }
        .item {
          display: inline-flex;
          align-items: center;
          color: rgba(255,255,255,0.85);
          font-weight: 300;
          font-size: 0.9rem;
          letter-spacing: 0.02em;
          transition: color 0.3s ease;
        }
        .item:hover {
          color: white;
        }
        @media (min-width: 768px) {
          .item {
            font-size: 1rem;
          }
        }
        .dot {
          display: inline-block;
          margin-left: 1rem;
          margin-right: 0.5rem;
          font-size: 1.2rem;
          line-height: 0;
          color: rgba(255,255,255,0.25);
        }
        @keyframes ticker-scroll {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .track { animation: none; }
        }
      `}</style>
    </section>
  );
}

'use client';
import { useState } from 'react';

export default function ProductGallery({ images, name }) {
  const [active, setActive] = useState(0);
  const list = images.length ? images : [null];

  return (
    <div>
      <div className="card" style={{ aspectRatio: '4/5', overflow: 'hidden', marginBottom: 12 }}>
        {list[active] ? (
          <img src={list[active]} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-muted)' }}>No Image</div>
        )}
      </div>
      {list.length > 1 && (
        <div style={{ display: 'flex', gap: 10 }}>
          {list.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: 70, height: 88, padding: 0, border: i === active ? '2px solid var(--color-maroon)' : '1px solid var(--color-line)',
                background: '#fff', overflow: 'hidden'
              }}
            >
              {img && <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

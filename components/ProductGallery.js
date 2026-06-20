'use client';
import { useState } from 'react';

export default function ProductGallery({ images, name }) {
  const [active, setActive] = useState(0);
  const list = images.length ? images : [null];

  return (
    <div>
      <div className="card gallery-main">
        {list[active] ? (
          <img src={list[active]} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-muted)' }}>No Image</div>
        )}
      </div>
      {list.length > 1 && (
        <div className="gallery-thumbs">
          {list.map((img, i) => (
            <button
              key={i}
              className="gallery-thumb"
              onClick={() => setActive(i)}
              style={{ border: i === active ? '2px solid var(--color-maroon)' : '1px solid var(--color-line)' }}
              aria-label={`View image ${i + 1}`}
            >
              {img && <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

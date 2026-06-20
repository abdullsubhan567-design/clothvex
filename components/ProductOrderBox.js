'use client';
import { useState } from 'react';

export default function ProductOrderBox({ product, sizes, colors, whatsapp }) {
  const [size, setSize] = useState(sizes[0] || '');
  const [color, setColor] = useState(colors[0] || '');
  const outOfStock = product.stock <= 0;

  function orderOnWhatsApp() {
    let msg = `Hello! I'd like to order:\n\n*${product.name}*\nPrice: Rs. ${product.price.toLocaleString()}`;
    if (size) msg += `\nSize: ${size}`;
    if (color) msg += `\nColor: ${color}`;
    msg += `\n\nLink: ${typeof window !== 'undefined' ? window.location.href : ''}`;
    const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  }

  return (
    <div>
      {sizes.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <label>Size</label>
          <div className="option-row">
            {sizes.map(s => (
              <button key={s} onClick={() => setSize(s)} className="option-btn" style={{ border: s === size ? '2px solid var(--color-maroon)' : '1px solid var(--color-line)' }}>{s}</button>
            ))}
          </div>
        </div>
      )}

      {colors.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <label>Color</label>
          <div className="option-row">
            {colors.map(c => (
              <button key={c} onClick={() => setColor(c)} className="option-btn" style={{ border: c === color ? '2px solid var(--color-maroon)' : '1px solid var(--color-line)' }}>{c}</button>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginBottom: 20, fontSize: 13, fontWeight: 800, color: outOfStock ? '#b53939' : '#2f8a4d' }}>
        {outOfStock ? 'Currently Out of Stock' : `In Stock (${product.stock} available)`}
      </div>

      <button className="btn btn-whatsapp" onClick={orderOnWhatsApp} disabled={outOfStock} style={{ width: '100%', opacity: outOfStock ? 0.5 : 1, cursor: outOfStock ? 'not-allowed' : 'pointer' }}>
        Order on WhatsApp
      </button>
    </div>
  );
}

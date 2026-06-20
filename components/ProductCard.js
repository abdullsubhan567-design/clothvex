import Link from 'next/link';

export default function ProductCard({ product }) {
  const images = JSON.parse(product.images || '[]');
  const cover = images[0];
  const outOfStock = product.stock <= 0;

  return (
    <Link href={`/product/${product.id}`} className="card" style={{ display: 'block', overflow: 'hidden', transition: 'box-shadow 0.2s ease' }}>
      <div style={{ position: 'relative', aspectRatio: '3/4', background: '#F1E9DD', overflow: 'hidden' }}>
        {cover ? (
          <img src={cover} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-muted)', fontFamily: 'var(--font-display)', fontSize: 18 }}>
            No Image
          </div>
        )}
        {product.oldPrice && (
          <span style={{ position: 'absolute', top: 10, left: 10, background: 'var(--color-maroon)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 9px', letterSpacing: '0.05em' }}>SALE</span>
        )}
        {outOfStock && (
          <span style={{ position: 'absolute', top: 10, right: 10, background: '#2A1A1F', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 9px' }}>OUT OF STOCK</span>
        )}
      </div>
      <div style={{ padding: '16px 16px 18px' }}>
        <div className="eyebrow" style={{ marginBottom: 6 }}>{product.category === 'unstitched' ? 'Unstitched' : 'Stitched'}</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 600, marginBottom: 8, color: 'var(--color-ink)' }}>{product.name}</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontWeight: 800, fontSize: 16, color: 'var(--color-maroon)' }}>Rs. {product.price.toLocaleString()}</span>
          {product.oldPrice && (
            <span style={{ fontSize: 13, color: 'var(--color-muted)', textDecoration: 'line-through' }}>Rs. {product.oldPrice.toLocaleString()}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

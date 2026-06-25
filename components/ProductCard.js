import Link from 'next/link';

export default function ProductCard({ product }) {
  const images = JSON.parse(product.images || '[]');
  const cover = images[0];
  const outOfStock = product.stock <= 0;

  return (
    <Link href={`/product/${product.id}`} className="card card-hover product-card">
      <div className="product-image">
        {cover ? (
          <img src={cover} alt={product.name} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-muted)', fontFamily: 'var(--font-display)', fontSize: 18 }}>
            No Image
          </div>
        )}
        {product.oldPrice && <span className="badge badge-sale">SALE</span>}
        {outOfStock && <span className="badge badge-stock">OUT OF STOCK</span>}
      </div>
      <div className="product-info">
<div className="eyebrow" style={{ marginBottom: 6 }}>
  {product.category === 'unstitched-men'
    ? 'Unstitched Men'
    : product.category === 'unstitched-women'
    ? 'Unstitched Women'
    : product.category === 'stitched_men'
    ? 'Stitched Men'
    : product.category === 'stitched_women'
    ? 'Stitched Women'
    : 'Stitched'}
</div>        <div style={{ fontFamily: 'var(--font-display)', fontSize: 21, fontWeight: 600, marginBottom: 8, color: 'var(--color-ink)', lineHeight: 1.15 }}>{product.name}</div>
        <div className="price-row">
          <span style={{ fontWeight: 800, fontSize: 16, color: 'var(--color-maroon)' }}>Rs. {product.price.toLocaleString()}</span>
          {product.oldPrice && (
            <span style={{ fontSize: 13, color: 'var(--color-muted)', textDecoration: 'line-through' }}>Rs. {product.oldPrice.toLocaleString()}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

import prisma from '../../../lib/prisma';
import { getSettings } from '../../../lib/getSettings';
import PageShell from '../../../components/PageShell';
import ProductGallery from '../../../components/ProductGallery';
import ProductOrderBox from '../../../components/ProductOrderBox';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }) {
  const settings = await getSettings();
  const product = await prisma.product.findUnique({ where: { id: params.id } });
  if (!product) notFound();

  const images = JSON.parse(product.images || '[]');
  const sizes = product.sizes ? product.sizes.split(',').map(s => s.trim()).filter(Boolean) : [];
  const colors = product.colors ? product.colors.split(',').map(c => c.trim()).filter(Boolean) : [];

  return (
    <PageShell settings={settings}>
      <section className="container section-pad">
        <div className="product-detail-grid">
          <ProductGallery images={images} name={product.name} />
          <div className="card" style={{ padding: 'clamp(24px, 4vw, 36px)' }}>
            <div className="eyebrow" style={{ marginBottom: 10 }}>{product.category === 'unstitched' ? 'Unstitched' : 'Stitched'}</div>
            <h1 style={{ fontSize: 'clamp(34px, 5vw, 48px)', marginBottom: 14, lineHeight: 1.05 }}>{product.name}</h1>
            <div className="price-row" style={{ marginBottom: 22 }}>
              <span style={{ fontWeight: 800, fontSize: 26, color: 'var(--color-maroon)' }}>Rs. {product.price.toLocaleString()}</span>
              {product.oldPrice && <span style={{ fontSize: 16, color: 'var(--color-muted)', textDecoration: 'line-through' }}>Rs. {product.oldPrice.toLocaleString()}</span>}
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--color-muted)', marginBottom: 28, whiteSpace: 'pre-wrap' }}>
              {product.description || 'No description provided.'}
            </p>

            <ProductOrderBox product={product} sizes={sizes} colors={colors} whatsapp={settings.whatsapp} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}

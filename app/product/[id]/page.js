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
      <section className="container" style={{ padding: '50px 24px 90px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 56 }}>
          <ProductGallery images={images} name={product.name} />
          <div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>{product.category === 'unstitched' ? 'Unstitched' : 'Stitched'}</div>
            <h1 style={{ fontSize: 38, marginBottom: 14 }}>{product.name}</h1>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 22 }}>
              <span style={{ fontWeight: 800, fontSize: 24, color: 'var(--color-maroon)' }}>Rs. {product.price.toLocaleString()}</span>
              {product.oldPrice && <span style={{ fontSize: 16, color: 'var(--color-muted)', textDecoration: 'line-through' }}>Rs. {product.oldPrice.toLocaleString()}</span>}
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--color-muted)', marginBottom: 28, whiteSpace: 'pre-wrap' }}>
              {product.description || 'No description provided.'}
            </p>

            <ProductOrderBox
              product={product}
              sizes={sizes}
              colors={colors}
              whatsapp={settings.whatsapp}
            />
          </div>
        </div>
      </section>
    </PageShell>
  );
}

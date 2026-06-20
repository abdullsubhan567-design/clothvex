import prisma from '../../../lib/prisma';
import { getSettings } from '../../../lib/getSettings';
import PageShell from '../../../components/PageShell';
import ProductCard from '../../../components/ProductCard';

export const dynamic = 'force-dynamic';

export default async function ShopCategoryPage({ params }) {
  const settings = await getSettings();
  const category = params.category === 'stitched' ? 'stitched' : 'unstitched';

  const products = await prisma.product.findMany({
    where: { category },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <PageShell settings={settings}>
      <section style={{ background: '#F3E9DC', borderBottom: '1px solid var(--color-line)', padding: '50px 24px' }}>
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 8 }}>Collection</div>
          <h1 style={{ fontSize: 42, textTransform: 'capitalize' }}>{category} Fabrics</h1>
        </div>
      </section>

      <section className="container" style={{ padding: '50px 24px 90px' }}>
        {products.length === 0 ? (
          <div className="card" style={{ padding: 50, textAlign: 'center', color: 'var(--color-muted)' }}>
            No {category} products available right now. Please check back soon.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 22 }}>
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>
    </PageShell>
  );
}

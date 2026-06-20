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
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 8 }}>Collection</div>
          <h1 className="page-title" style={{ textTransform: 'capitalize' }}>{category} Fabrics</h1>
        </div>
      </section>

      <section className="container section-pad">
        {products.length === 0 ? (
          <div className="card" style={{ padding: 50, textAlign: 'center', color: 'var(--color-muted)' }}>
            No {category} products available right now. Please check back soon.
          </div>
        ) : (
          <div className="product-grid">
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>
    </PageShell>
  );
}

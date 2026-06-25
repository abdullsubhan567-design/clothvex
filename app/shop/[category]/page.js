import { notFound } from 'next/navigation';
import prisma from '../../../lib/prisma';
import { getSettings } from '../../../lib/getSettings';
import PageShell from '../../../components/PageShell';
import ProductCard from '../../../components/ProductCard';

export const dynamic = 'force-dynamic';

const categoryData = {
  'unstitched-men': {
    title: 'Unstitched For Men',
    emptyText: 'No unstitched men products available right now. Please check back soon.'
  },
  'unstitched-women': {
    title: 'Unstitched For Women',
    emptyText: 'No unstitched women products available right now. Please check back soon.'
  }
};

export default async function ShopCategoryPage({ params }) {
  const settings = await getSettings();
  const category = params.category;

  const currentCategory = categoryData[category];

  if (!currentCategory) {
    notFound();
  }

  const products = await prisma.product.findMany({
    where: { category },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <PageShell settings={settings}>
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 8 }}>
            Collection
          </div>

          <h1 className="page-title">
            {currentCategory.title}
          </h1>
        </div>
      </section>

      <section className="container section-pad">
        {products.length === 0 ? (
          <div
            className="card"
            style={{
              padding: 50,
              textAlign: 'center',
              color: 'var(--color-muted)'
            }}
          >
            {currentCategory.emptyText}
          </div>
        ) : (
          <div className="product-grid">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
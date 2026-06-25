import Link from 'next/link';
import prisma from '../lib/prisma';
import { getSettings } from '../lib/getSettings';
import PageShell from '../components/PageShell';
import ProductCard from '../components/ProductCard';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const settings = await getSettings();

  const featured = await prisma.product.findMany({
    where: { featured: true },
    orderBy: { createdAt: 'desc' },
    take: 8
  });

  const latest = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    take: 8
  });

  const showcase = featured.length ? featured : latest;
  const heroImage = showcase[0] && JSON.parse(showcase[0].images || '[]')[0];

  return (
    <PageShell settings={settings}>
      <section className="hero-section">
        <div className="container hero-grid">
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>
              Unstitched Collection · Made For You
            </div>

            <h1 className="hero-title">Fabric that tells its own story.</h1>

            <p className="hero-copy">
              {settings.tagline} Browse our hand-picked unstitched fabric collection
              for men and women — order in seconds over WhatsApp.
            </p>

            <div className="hero-actions">
              <Link href="/shop/unstitched-women" className="btn btn-primary">
                Shop Unstitched Women
              </Link>

              <Link href="/shop/unstitched-men" className="btn btn-outline">
                Shop Unstitched Men
              </Link>
            </div>
          </div>

          <div className="hero-media">
            {heroImage ? (
              <img src={heroImage} alt="Featured ClothVex product" />
            ) : (
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 24,
                  color: 'var(--color-gold)',
                  textAlign: 'center',
                  padding: 24
                }}
              >
                Add your product photos in Admin →
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="container" style={{ paddingTop: 54 }}>
        <div className="category-grid">
          <Link href="/shop/unstitched-men" className="card card-hover category-card">
            <div className="eyebrow" style={{ marginBottom: 8 }}>
              For Men
            </div>

            <h3 style={{ fontSize: 30, marginBottom: 8 }}>
              Unstitched For Men
            </h3>

            <p
              style={{
                color: 'var(--color-muted)',
                fontSize: 14,
                margin: 0,
                lineHeight: 1.7
              }}
            >
              Premium unstitched fabrics for men, ready to tailor your way.
            </p>
          </Link>

          <Link href="/shop/unstitched-women" className="card card-hover category-card">
            <div className="eyebrow" style={{ marginBottom: 8 }}>
              For Women
            </div>

            <h3 style={{ fontSize: 30, marginBottom: 8 }}>
              Unstitched For Women
            </h3>

            <p
              style={{
                color: 'var(--color-muted)',
                fontSize: 14,
                margin: 0,
                lineHeight: 1.7
              }}
            >
              Elegant unstitched fabrics for women, designed for every occasion.
            </p>
          </Link>
        </div>
      </section>

      <section className="container section-pad">
        <div className="section-head">
          <h2 className="section-title">
            {featured.length ? 'Featured Pieces' : 'Latest Arrivals'}
          </h2>

          <Link
            href="/shop/unstitched-women"
            style={{
              fontSize: 14,
              fontWeight: 800,
              color: 'var(--color-maroon)'
            }}
          >
            View All →
          </Link>
        </div>

        {showcase.length === 0 ? (
          <div
            className="card"
            style={{
              padding: 50,
              textAlign: 'center',
              color: 'var(--color-muted)'
            }}
          >
            No products yet. Add your first product from the Admin Panel.
          </div>
        ) : (
          <div className="product-grid">
            {showcase.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
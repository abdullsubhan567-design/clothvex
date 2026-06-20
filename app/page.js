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

  return (
    <PageShell settings={settings}>
      {/* HERO */}
      <section style={{ background: 'linear-gradient(180deg, #FBF7F2 0%, #F3E9DC 100%)', borderBottom: '1px solid var(--color-line)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 50, alignItems: 'center', padding: '76px 24px 70px' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>Unstitched &amp; Stitched · Made For You</div>
            <h1 style={{ fontSize: 56, lineHeight: 1.08, marginBottom: 22 }}>
              Fabric that tells<br />its own story.
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--color-muted)', maxWidth: 460, marginBottom: 34 }}>
              {settings.tagline} Browse our hand-picked unstitched lawn and khaddar, or go ready-to-wear with our fully stitched collection — order in seconds over WhatsApp.
            </p>
            <div style={{ display: 'flex', gap: 14 }}>
              <Link href="/shop/unstitched" className="btn btn-primary">Shop Unstitched</Link>
              <Link href="/shop/stitched" className="btn btn-outline">Shop Stitched</Link>
            </div>
          </div>
          <div style={{ aspectRatio: '4/5', background: '#fff', border: '1px solid var(--color-line)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            {showcase[0] && JSON.parse(showcase[0].images || '[]')[0] ? (
              <img src={JSON.parse(showcase[0].images)[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--color-gold)' }}>Add your product photos in Admin →</span>
            )}
          </div>
        </div>
      </section>

      {/* CATEGORY STRIP */}
      <section className="container" style={{ padding: '64px 24px 10px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <Link href="/shop/unstitched" className="card" style={{ padding: 32, display: 'block' }}>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Raw &amp; Ready</div>
            <h3 style={{ fontSize: 28, marginBottom: 6 }}>Unstitched Collection</h3>
            <p style={{ color: 'var(--color-muted)', fontSize: 14 }}>Lawn, khaddar &amp; chiffon — get it tailored your way.</p>
          </Link>
          <Link href="/shop/stitched" className="card" style={{ padding: 32, display: 'block' }}>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Wear Today</div>
            <h3 style={{ fontSize: 28, marginBottom: 6 }}>Stitched Collection</h3>
            <p style={{ color: 'var(--color-muted)', fontSize: 14 }}>Ready-to-wear pieces, true to size, finished with care.</p>
          </Link>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="container" style={{ padding: '60px 24px 90px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 28 }}>
          <h2 style={{ fontSize: 32 }}>{featured.length ? 'Featured Pieces' : 'Latest Arrivals'}</h2>
          <Link href="/shop/unstitched" style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-maroon)' }}>View All →</Link>
        </div>
        {showcase.length === 0 ? (
          <div className="card" style={{ padding: 50, textAlign: 'center', color: 'var(--color-muted)' }}>
            No products yet. Add your first product from the Admin Panel.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 22 }}>
            {showcase.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>
    </PageShell>
  );
}

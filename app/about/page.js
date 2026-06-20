import { getSettings } from '../../lib/getSettings';
import PageShell from '../../components/PageShell';

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const settings = await getSettings();
  return (
    <PageShell settings={settings}>
      <section className="container about-wrap">
        <div className="card" style={{ padding: 'clamp(28px, 5vw, 54px)' }}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>Our Story</div>
          <h1 className="page-title" style={{ marginBottom: 24 }}>About {settings.siteName}</h1>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--color-muted)', marginBottom: 18 }}>
            {settings.siteName} brings together carefully sourced unstitched fabrics and ready-to-wear stitched pieces,
            so every customer can choose the way they like to shop. Whether you want to design your own outfit from raw
            lawn or khaddar, or pick something finished and ready to wear, we curate every piece for quality and comfort.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--color-muted)', marginBottom: 18 }}>
            We keep ordering simple — browse our collection, pick your size and color, and message us directly on
            WhatsApp to confirm your order. No complicated checkout, just a real conversation with our team.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--color-muted)', marginBottom: 0 }}>
            Have a question about fabric, sizing, or delivery? Reach out anytime — we're happy to help you find the right piece.
          </p>
        </div>
      </section>
    </PageShell>
  );
}

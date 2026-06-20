import { getSettings } from '../../lib/getSettings';
import PageShell from '../../components/PageShell';

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
  const settings = await getSettings();
  const waLink = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent('Hi! I have a question about your products.')}`;

  return (
    <PageShell settings={settings}>
      <section style={{ background: '#F3E9DC', borderBottom: '1px solid var(--color-line)', padding: '54px 24px' }}>
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 8 }}>We'd Love to Hear From You</div>
          <h1 style={{ fontSize: 42 }}>Contact Us</h1>
        </div>
      </section>

      <section className="container" style={{ padding: '60px 24px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, maxWidth: 900, margin: '0 auto' }}>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="card" style={{ padding: 36, display: 'block' }}>
            <div style={{ width: 50, height: 50, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.41-1.42a9.87 9.87 0 0 0 4.63 1.18h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.02h-.01a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.06.8.82-2.99-.2-.31a8.07 8.07 0 0 1-1.25-4.3c0-4.48 3.65-8.13 8.14-8.13 2.17 0 4.21.85 5.75 2.39a8.07 8.07 0 0 1 2.38 5.75c0 4.48-3.65 8.1-8.14 8.1z"/></svg>
            </div>
            <h3 style={{ fontSize: 22, marginBottom: 8 }}>Chat on WhatsApp</h3>
            <p style={{ color: 'var(--color-muted)', fontSize: 14, marginBottom: 14 }}>Fastest way to reach us — ask about products, sizing, or place an order directly.</p>
            <span style={{ color: '#25D366', fontWeight: 700, fontSize: 14 }}>+{settings.whatsapp} →</span>
          </a>

          <a href={`mailto:${settings.email}`} className="card" style={{ padding: 36, display: 'block' }}>
            <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'var(--color-maroon)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M2 4h20v16H2V4zm2 2.5V18h16V6.5l-8 5.5-8-5.5zm.8-.5L12 9.5 19.2 6H4.8z"/></svg>
            </div>
            <h3 style={{ fontSize: 22, marginBottom: 8 }}>Email Us</h3>
            <p style={{ color: 'var(--color-muted)', fontSize: 14, marginBottom: 14 }}>For detailed queries, bulk orders, or anything that needs more than a quick chat.</p>
            <span style={{ color: 'var(--color-maroon)', fontWeight: 700, fontSize: 14 }}>{settings.email} →</span>
          </a>
        </div>

        <div style={{ maxWidth: 900, margin: '24px auto 0', textAlign: 'center', color: 'var(--color-muted)', fontSize: 14 }}>
          {settings.address}
        </div>
      </section>
    </PageShell>
  );
}

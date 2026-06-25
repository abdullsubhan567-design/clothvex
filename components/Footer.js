import Link from 'next/link';

export default function Footer({ settings }) {
  return (
    <footer style={{ background: 'var(--color-maroon-dark)', color: '#F1E4DE', marginTop: 80 }}>
      <div className="container footer-grid">
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 12 }}>
            {settings?.siteName || 'ClothVex'}
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: '#D8C2BA', maxWidth: 360, margin: 0 }}>
            {settings?.tagline || 'Unstitched Fabrics, Delivered.'}
          </p>
        </div>
        <div>
          <div style={{ fontWeight: 800, marginBottom: 14, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-gold-light)' }}>Shop</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
            <Link href="/shop/unstitched-men" style={{ color: '#D8C2BA' }}>Unstitched Men Collection</Link>
            <Link href="/shop/unstitched-women" style={{ color: '#D8C2BA' }}>UnStitched Women Collection</Link>
            <Link href="/about" style={{ color: '#D8C2BA' }}>About Us</Link>
          </div>
        </div>
        <div>
          <div style={{ fontWeight: 800, marginBottom: 14, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-gold-light)' }}>Get in Touch</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14, color: '#D8C2BA', wordBreak: 'break-word' }}>
            <a href={`https://wa.me/${settings?.whatsapp || '923133925925'}`} target="_blank" rel="noopener noreferrer">WhatsApp: +{settings?.whatsapp || '923133925925'}</a>
            <a href={`mailto:${settings?.email || 'abdulsubhan567@gmail.com'}`}>{settings?.email || 'abdulsubhan567@gmail.com'}</a>
            <Link href="/contact">Contact Page →</Link>
          </div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', padding: '16px 24px', textAlign: 'center', fontSize: 12, color: '#B89D94' }}>
        © {new Date().getFullYear()} {settings?.siteName || 'ClothVex'}. All rights reserved.
      </div>
    </footer>
  );
}

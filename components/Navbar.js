import Link from 'next/link';

export default function Navbar({ settings }) {
  return (
    <header style={{ borderBottom: '1px solid var(--color-line)', background: 'var(--color-surface)', position: 'sticky', top: 0, zIndex: 50 }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 78 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {settings?.logo ? (
            <img src={settings.logo} alt={settings.siteName} style={{ height: 42, width: 'auto' }} />
          ) : (
            <div style={{ width: 42, height: 42, background: 'var(--color-maroon)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, borderRadius: 2 }}>
              {(settings?.siteName || 'CV').slice(0,1)}
            </div>
          )}
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: 'var(--color-maroon-dark)', letterSpacing: '0.01em' }}>
            {settings?.siteName || 'ClothVex'}
          </span>
        </Link>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
          <Link href="/" style={navLink}>Home</Link>
          <Link href="/shop/unstitched" style={navLink}>Unstitched</Link>
          <Link href="/shop/stitched" style={navLink}>Stitched</Link>
          <Link href="/about" style={navLink}>About</Link>
          <Link href="/contact" className="btn btn-primary" style={{ padding: '10px 20px' }}>Contact Us</Link>
        </nav>
      </div>
    </header>
  );
}

const navLink = {
  fontSize: 14,
  fontWeight: 600,
  color: 'var(--color-ink)'
};

'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  const links = [
    { href: '/admin/dashboard', label: 'Dashboard' },
    { href: '/admin/products', label: 'Products' },
    { href: '/admin/settings', label: 'Store Settings' }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '230px 1fr', background: 'var(--color-bg)' }}>
      <aside style={{ background: 'var(--color-maroon-dark)', color: '#fff', padding: '28px 18px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, marginBottom: 36, paddingLeft: 6 }}>
          ClothVex
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
          {links.map(l => {
            const active = pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  padding: '11px 14px',
                  borderRadius: 4,
                  fontSize: 14,
                  fontWeight: 600,
                  background: active ? 'rgba(255,255,255,0.14)' : 'transparent',
                  color: active ? '#fff' : '#E2C9C0'
                }}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <Link href="/" style={{ fontSize: 13, color: '#E2C9C0', marginBottom: 14 }}>← View Live Site</Link>
        <button onClick={logout} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '9px 14px', borderRadius: 4, fontSize: 13, fontWeight: 600 }}>
          Log Out
        </button>
      </aside>
      <div style={{ padding: '36px 40px' }}>{children}</div>
    </div>
  );
}

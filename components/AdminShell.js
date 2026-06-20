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
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, paddingLeft: 6, whiteSpace: 'nowrap' }}>ClothVex</div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
          {links.map(l => {
            const active = pathname.startsWith(l.href);
            return (
              <Link key={l.href} href={l.href} style={{ padding: '11px 14px', borderRadius: 999, fontSize: 14, fontWeight: 700, background: active ? 'rgba(255,255,255,0.14)' : 'transparent', color: active ? '#fff' : '#E2C9C0' }}>
                {l.label}
              </Link>
            );
          })}
        </nav>
        <Link href="/" style={{ fontSize: 13, color: '#E2C9C0', whiteSpace: 'nowrap' }}>← View Site</Link>
        <button onClick={logout} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '9px 14px', borderRadius: 999, fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap' }}>
          Log Out
        </button>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}

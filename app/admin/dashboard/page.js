import prisma from '../../../lib/prisma';
import AdminShell from '../../../components/AdminShell';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const totalProducts = await prisma.product.count();
  const unstitched = await prisma.product.count({ where: { category: 'unstitched' } });
  const stitched = await prisma.product.count({ where: { category: 'stitched' } });
  const outOfStock = await prisma.product.count({ where: { stock: { lte: 0 } } });

  const stats = [
    { label: 'Total Products', value: totalProducts },
    { label: 'Unstitched', value: unstitched },
    { label: 'Stitched', value: stitched },
    { label: 'Out of Stock', value: outOfStock }
  ];

  return (
    <AdminShell>
      <h1 style={{ fontSize: 30, marginBottom: 6 }}>Dashboard</h1>
      <p style={{ color: 'var(--color-muted)', marginBottom: 30 }}>Welcome back. Here's a quick look at your store.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, marginBottom: 36 }}>
        {stats.map(s => (
          <div key={s.label} className="card" style={{ padding: 22 }}>
            <div style={{ fontSize: 13, color: 'var(--color-muted)', fontWeight: 600, marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--color-maroon)' }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 14 }}>
        <Link href="/admin/products/new" className="btn btn-primary">+ Add New Product</Link>
        <Link href="/admin/settings" className="btn btn-outline">Change Logo / Store Info</Link>
      </div>
    </AdminShell>
  );
}

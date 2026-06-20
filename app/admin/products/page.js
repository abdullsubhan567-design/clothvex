import prisma from '../../../lib/prisma';
import AdminShell from '../../../components/AdminShell';
import Link from 'next/link';
import ProductRowActions from '../../../components/ProductRowActions';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <AdminShell>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 26 }}>
        <h1 style={{ fontSize: 30 }}>Products</h1>
        <Link href="/admin/products/new" className="btn btn-primary">+ Add Product</Link>
      </div>

      <div className="card" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#F3E9DC', textAlign: 'left' }}>
              <th style={th}>Image</th>
              <th style={th}>Name</th>
              <th style={th}>Category</th>
              <th style={th}>Price</th>
              <th style={th}>Stock</th>
              <th style={th}>Featured</th>
              <th style={th}></th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr><td colSpan={7} style={{ padding: 30, textAlign: 'center', color: 'var(--color-muted)' }}>No products yet.</td></tr>
            )}
            {products.map(p => {
              const images = JSON.parse(p.images || '[]');
              return (
                <tr key={p.id} style={{ borderTop: '1px solid var(--color-line)' }}>
                  <td style={td}>
                    <div style={{ width: 44, height: 56, background: '#F1E9DD', overflow: 'hidden' }}>
                      {images[0] && <img src={images[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                    </div>
                  </td>
                  <td style={td}>{p.name}</td>
                  <td style={{ ...td, textTransform: 'capitalize' }}>{p.category}</td>
                  <td style={td}>Rs. {p.price.toLocaleString()}</td>
                  <td style={td}>
                    <span style={{ color: p.stock <= 0 ? '#b53939' : '#2f8a4d', fontWeight: 700 }}>{p.stock}</span>
                  </td>
                  <td style={td}>{p.featured ? '★' : '—'}</td>
                  <td style={td}><ProductRowActions id={p.id} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}

const th = { padding: '12px 16px', fontSize: 12, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--color-muted)', fontWeight: 700 };
const td = { padding: '12px 16px', verticalAlign: 'middle' };

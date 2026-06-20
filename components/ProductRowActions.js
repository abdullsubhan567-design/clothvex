'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProductRowActions({ id }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm('Delete this product? This cannot be undone.')) return;
    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
    if (res.ok) {
      router.refresh();
    } else {
      alert('Failed to delete product.');
    }
  }

  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <Link href={`/admin/products/${id}/edit`} style={{ color: 'var(--color-maroon)', fontWeight: 700, fontSize: 13 }}>Edit</Link>
      <button onClick={handleDelete} style={{ background: 'none', border: 'none', color: '#b53939', fontWeight: 700, fontSize: 13, padding: 0 }}>Delete</button>
    </div>
  );
}

'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function ProductForm({ initial, productId }) {
  const router = useRouter();
  const [name, setName] = useState(initial?.name || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [category, setCategory] = useState(initial?.category || 'unstitched');
  const [price, setPrice] = useState(initial?.price ?? '');
  const [oldPrice, setOldPrice] = useState(initial?.oldPrice ?? '');
  const [sizes, setSizes] = useState(initial?.sizes || '');
  const [colors, setColors] = useState(initial?.colors || '');
  const [stock, setStock] = useState(initial?.stock ?? 0);
  const [featured, setFeatured] = useState(initial?.featured || false);
  const [images, setImages] = useState(initial?.images ? JSON.parse(initial.images) : []);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleImageUpload(e) {
    const files = Array.from(e.target.files || []);
    const newOnes = await Promise.all(files.map(fileToBase64));
    setImages(prev => [...prev, ...newOnes]);
    e.target.value = '';
  }

  function removeImage(idx) {
    setImages(prev => prev.filter((_, i) => i !== idx));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!name || !price) {
      setError('Name and price are required.');
      return;
    }
    setSaving(true);
    const payload = { name, description, category, price, oldPrice: oldPrice || null, sizes, colors, stock, featured, images };

    const url = productId ? `/api/products/${productId}` : '/api/products';
    const method = productId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    setSaving(false);
    if (res.ok) {
      router.push('/admin/products');
      router.refresh();
    } else {
      setError('Failed to save product. Please try again.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card form-card">
      {error && <div style={{ color: '#b53939', marginBottom: 16, fontSize: 14 }}>{error}</div>}

      <div style={{ marginBottom: 18 }}>
        <label>Product Name *</label>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Lawn 3-Piece Unstitched Suit" required />
      </div>

      <div style={{ marginBottom: 18 }}>
        <label>Description</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} placeholder="Fabric details, fit, care instructions..." />
      </div>

      <div className="form-grid-2">
        <div>
          <label>Category *</label>
          <select value={category} onChange={e => setCategory(e.target.value)}>
            <option value="unstitched">Unstitched</option>
            <option value="stitched">Stitched</option>
          </select>
        </div>
        <div>
          <label>Stock Quantity</label>
          <input type="number" min="0" value={stock} onChange={e => setStock(e.target.value)} />
        </div>
      </div>

      <div className="form-grid-2">
        <div>
          <label>Price (Rs.) *</label>
          <input type="number" min="0" value={price} onChange={e => setPrice(e.target.value)} required />
        </div>
        <div>
          <label>Old / Strike-through Price (optional)</label>
          <input type="number" min="0" value={oldPrice} onChange={e => setOldPrice(e.target.value)} placeholder="Leave blank if no discount" />
        </div>
      </div>

      <div className="form-grid-2">
        <div>
          <label>Sizes (comma separated)</label>
          <input value={sizes} onChange={e => setSizes(e.target.value)} placeholder="S, M, L, XL" />
        </div>
        <div>
          <label>Colors (comma separated)</label>
          <input value={colors} onChange={e => setColors(e.target.value)} placeholder="Red, Blue, Black" />
        </div>
      </div>

      <div style={{ marginBottom: 22 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" style={{ width: 'auto' }} checked={featured} onChange={e => setFeatured(e.target.checked)} />
          Show in "Featured" section on homepage
        </label>
      </div>

      <div style={{ marginBottom: 26 }}>
        <label>Product Images</label>
        <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
        {images.length > 0 && (
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 14 }}>
            {images.map((img, i) => (
              <div key={i} style={{ position: 'relative', width: 80, height: 100 }}>
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', border: '1px solid var(--color-line)' }} />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  style={{ position: 'absolute', top: -8, right: -8, width: 22, height: 22, borderRadius: '50%', background: '#b53939', color: '#fff', border: 'none', fontSize: 13, lineHeight: '22px' }}
                >×</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="form-actions">
        <button className="btn btn-primary" type="submit" disabled={saving}>
          {saving ? 'Saving…' : productId ? 'Update Product' : 'Add Product'}
        </button>
        <button type="button" className="btn btn-outline" onClick={() => router.push('/admin/products')}>Cancel</button>
      </div>
    </form>
  );
}

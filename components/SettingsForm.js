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

export default function SettingsForm({ initial }) {
  const router = useRouter();
  const [siteName, setSiteName] = useState(initial.siteName || '');
  const [tagline, setTagline] = useState(initial.tagline || '');
  const [logo, setLogo] = useState(initial.logo || '');
  const [whatsapp, setWhatsapp] = useState(initial.whatsapp || '');
  const [email, setEmail] = useState(initial.email || '');
  const [address, setAddress] = useState(initial.address || '');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleLogoUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const b64 = await fileToBase64(file);
    setLogo(b64);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ siteName, tagline, logo, whatsapp, email, address })
    });
    setSaving(false);
    if (res.ok) {
      setSuccess(true);
      router.refresh();
    } else {
      alert('Failed to save settings.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card" style={{ padding: 32, maxWidth: 600 }}>
      {success && <div style={{ background: '#E5F6EB', color: '#2f8a4d', padding: '10px 14px', fontSize: 13, marginBottom: 18, fontWeight: 600 }}>Settings saved successfully.</div>}

      <div style={{ marginBottom: 22 }}>
        <label>Store Logo</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 64, height: 64, border: '1px solid var(--color-line)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', overflow: 'hidden' }}>
            {logo ? <img src={logo} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : <span style={{ fontSize: 11, color: 'var(--color-muted)' }}>No Logo</span>}
          </div>
          <input type="file" accept="image/*" onChange={handleLogoUpload} style={{ width: 'auto' }} />
        </div>
      </div>

      <div style={{ marginBottom: 18 }}>
        <label>Store Name</label>
        <input value={siteName} onChange={e => setSiteName(e.target.value)} />
      </div>

      <div style={{ marginBottom: 18 }}>
        <label>Tagline</label>
        <input value={tagline} onChange={e => setTagline(e.target.value)} />
      </div>

      <div style={{ marginBottom: 18 }}>
        <label>WhatsApp Number (with country code, no + or spaces)</label>
        <input value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="923133925925" />
      </div>

      <div style={{ marginBottom: 18 }}>
        <label>Contact Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </div>

      <div style={{ marginBottom: 24 }}>
        <label>Address</label>
        <input value={address} onChange={e => setAddress(e.target.value)} />
      </div>

      <button className="btn btn-primary" type="submit" disabled={saving}>
        {saving ? 'Saving…' : 'Save Settings'}
      </button>
    </form>
  );
}

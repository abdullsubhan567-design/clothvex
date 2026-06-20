import { getSettings } from '../../../lib/getSettings';
import AdminShell from '../../../components/AdminShell';
import SettingsForm from '../../../components/SettingsForm';

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <AdminShell>
      <h1 style={{ fontSize: 30, marginBottom: 6 }}>Store Settings</h1>
      <p style={{ color: 'var(--color-muted)', marginBottom: 26 }}>Update your logo, store name and contact details shown across the website.</p>
      <SettingsForm initial={settings} />
    </AdminShell>
  );
}

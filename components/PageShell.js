import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppFloat from './WhatsAppFloat';

export default function PageShell({ settings, children }) {
  return (
    <>
      <Navbar settings={settings} />
      <main>{children}</main>
      <Footer settings={settings} />
      <WhatsAppFloat phone={settings?.whatsapp || '923133925925'} />
    </>
  );
}

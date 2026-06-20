import './globals.css';

export const metadata = {
  title: 'ClothVex | Unstitched & Stitched Fabrics',
  description: 'Shop premium unstitched and stitched clothing at ClothVex. Order directly via WhatsApp.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

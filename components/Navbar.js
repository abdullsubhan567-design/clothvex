'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar({ settings }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="container navbar">
        <div className="nav-top-row">
          <Link href="/" className="brand" onClick={closeMenu}>
            {settings?.logo ? (
              <img className="brand-img" src={settings.logo} alt={settings.siteName} />
            ) : (
              <div className="brand-logo">{(settings?.siteName || 'CV').slice(0, 1)}</div>
            )}
            <span className="brand-name">{settings?.siteName || 'ClothVex'}</span>
          </Link>

          <button
            type="button"
            className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="main-menu"
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <nav
          id="main-menu"
          className={`nav-links ${menuOpen ? 'is-open' : ''}`}
          aria-label="Main navigation"
        >
          <Link href="/" className="nav-link" onClick={closeMenu}>Home</Link>
          <Link href="/shop/unstitched-men" className="nav-link" onClick={closeMenu}>Unstitched for men</Link>
          <Link href="/shop/unstitched-women" className="nav-link" onClick={closeMenu}>Unstitched for women</Link>
          <Link href="/about" className="nav-link" onClick={closeMenu}>About</Link>
          <Link href="/contact" className="btn btn-primary nav-contact" onClick={closeMenu}>Contact Us</Link>
        </nav>
      </div>
    </header>
  );
}

import React, { useState, useEffect } from 'react';
import BrandLogo from '../common/BrandLogo';
import LanguageSelector from '../common/LanguageSelector';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, ArrowRight, UserCircle2 } from 'lucide-react';

export default function Navbar() {
  const { openSignIn, openSignUp, currentUser } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 900,
        backgroundColor: isScrolled ? 'rgba(250, 247, 242, 0.94)' : 'var(--bg-page)',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
        transition: 'all 0.25s ease',
        padding: '0.85rem 0'
      }}
    >
      <div className="container flex-between" style={{ padding: '0 1.5rem' }}>
        {/* Brand Logo */}
        <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <BrandLogo size="default" />
        </div>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '2rem'
          }}
          className="desktop-nav"
        >
          <a href="#about" style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
            Platform
          </a>
          <a href="#roles" style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
            For Students
          </a>
          <a href="#roles" style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
            For Teachers
          </a>
          <a href="#roles" style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
            For Parents
          </a>
          <a href="#ai-tutor" style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--maroon-primary)' }}>
            AI Tutor ✨
          </a>
        </nav>

        {/* Action Controls & Authentication CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {/* Multilingual Selector */}
          <LanguageSelector variant="small" />

          {currentUser ? (
            <button
              onClick={() => {}}
              className="btn btn-primary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <UserCircle2 size={16} />
              <span>Go to {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)} Portal</span>
            </button>
          ) : (
            <>
              {/* Prominent SIGN IN Button above the fold */}
              <button
                id="header-sign-in-btn"
                onClick={openSignIn}
                className="btn btn-secondary btn-sm"
                style={{
                  color: 'var(--maroon-primary)',
                  borderColor: 'var(--maroon-primary)',
                  fontWeight: 700
                }}
              >
                Sign In
              </button>

              {/* Get Started Button */}
              <button
                id="header-get-started-btn"
                onClick={() => openSignUp()}
                className="btn btn-primary btn-sm"
                style={{
                  display: 'none',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
                className="desktop-cta-btn btn btn-primary btn-sm"
              >
                <span>Get Started</span>
                <ArrowRight size={14} />
              </button>
            </>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-toggle-btn"
            style={{
              padding: '0.4rem',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)'
            }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border-medium)',
            padding: '1.25rem 1.5rem',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <a
              href="#about"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ fontWeight: 600, color: 'var(--text-primary)' }}
            >
              Platform Overview
            </a>
            <a
              href="#roles"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ fontWeight: 600, color: 'var(--text-primary)' }}
            >
              Role Solutions (Student, Teacher, Parent)
            </a>
            <a
              href="#ai-tutor"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ fontWeight: 600, color: 'var(--maroon-primary)' }}
            >
              AI Tutor Companion ✨
            </a>
            <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)' }} />
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openSignIn();
                }}
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openSignUp();
                }}
                className="btn btn-primary"
                style={{ flex: 1 }}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 868px) {
          .desktop-nav {
            display: flex !important;
          }
          .desktop-cta-btn {
            display: inline-flex !important;
          }
          .mobile-toggle-btn {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}

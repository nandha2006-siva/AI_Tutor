import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

export default function LanguageSelector({ variant = 'default' }) {
  const { currentLanguage, setCurrentLanguage } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedLang = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isSmall = variant === 'small';

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: isSmall ? '0.35rem 0.65rem' : '0.5rem 0.85rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-medium)',
          backgroundColor: 'var(--bg-surface)',
          color: 'var(--text-primary)',
          fontSize: isSmall ? '0.82rem' : '0.88rem',
          fontWeight: 600,
          transition: 'all var(--transition-fast)'
        }}
        aria-label="Select Language"
      >
        <Globe size={isSmall ? 14 : 16} style={{ color: 'var(--maroon-primary)' }} />
        <span>{selectedLang.native}</span>
        <ChevronDown size={14} style={{ color: 'var(--text-muted)', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            right: 0,
            width: '180px',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            padding: '0.35rem',
            zIndex: 100,
            animation: 'fadeIn 0.15s ease-out'
          }}
        >
          <div style={{ padding: '0.4rem 0.6rem', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Choose Language
          </div>
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = lang.code === currentLanguage;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  setCurrentLanguage(lang.code);
                  setIsOpen(false);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.45rem 0.6rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: isSelected ? 'var(--maroon-50)' : 'transparent',
                  color: isSelected ? 'var(--maroon-primary)' : 'var(--text-primary)',
                  fontSize: '0.85rem',
                  fontWeight: isSelected ? 700 : 500,
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>{lang.native}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({lang.name})</span>
                </div>
                {isSelected && <Check size={14} style={{ color: 'var(--maroon-primary)' }} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

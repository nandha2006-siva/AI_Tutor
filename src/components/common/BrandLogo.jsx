import React from 'react';

export default function BrandLogo({ size = 'default', light = false }) {
  const isLarge = size === 'large';
  const isSmall = size === 'small';

  const iconDim = isLarge ? 42 : isSmall ? 28 : 34;

  return (
    <div 
      style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: isSmall ? '0.5rem' : '0.75rem',
        cursor: 'pointer',
        userSelect: 'none'
      }}
    >
      <div
        style={{
          width: `${iconDim}px`,
          height: `${iconDim}px`,
          borderRadius: isSmall ? '8px' : '10px',
          background: 'linear-gradient(135deg, #6B1728 0%, #821D32 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(107, 23, 40, 0.22)',
          flexShrink: 0
        }}
      >
        <svg 
          width={iconDim * 0.62} 
          height={iconDim * 0.62} 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Compass / Hex Prism Academic Crest */}
          <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" stroke="#FAF7F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 6L17 12L12 18L7 12L12 6Z" fill="#D97706" fillOpacity="0.85"/>
          <circle cx="12" cy="12" r="2" fill="#FFFFFF"/>
        </svg>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span 
            style={{ 
              fontFamily: 'var(--font-heading)',
              fontWeight: 800, 
              fontSize: isLarge ? '1.75rem' : isSmall ? '1.15rem' : '1.35rem', 
              letterSpacing: '0.04em',
              color: light ? '#FFFFFF' : 'var(--maroon-primary)'
            }}
          >
            NEXORA
          </span>
          <span 
            style={{ 
              fontSize: isLarge ? '0.75rem' : '0.65rem', 
              fontWeight: 700, 
              background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
              color: '#FFFFFF',
              padding: '0.15rem 0.45rem',
              borderRadius: '4px',
              letterSpacing: '0.08em'
            }}
          >
            AI
          </span>
        </div>
        <span 
          style={{ 
            fontSize: isLarge ? '0.75rem' : '0.65rem', 
            fontWeight: 500, 
            letterSpacing: '0.05em',
            color: light ? 'rgba(255,255,255,0.75)' : 'var(--text-muted)',
            marginTop: '2px'
          }}
        >
          ACADEMIC INTELLIGENCE
        </span>
      </div>
    </div>
  );
}

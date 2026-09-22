import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SLIDESHOW_ITEMS } from '../../data/mockData';

export default function Slideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDESHOW_ITEMS.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + SLIDESHOW_ITEMS.length) % SLIDESHOW_ITEMS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SLIDESHOW_ITEMS.length);
  };

  const currentSlide = SLIDESHOW_ITEMS[currentIndex];

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '580px',
        margin: '0 auto',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-lg)',
        border: '3px solid #FFFFFF',
        backgroundColor: 'var(--bg-subtle)'
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Educational Highlights Slideshow"
    >
      {/* Aspect Ratio Container for 16:9 Image */}
      <div style={{ position: 'relative', width: '100%', paddingTop: '62%', overflow: 'hidden' }}>
        {SLIDESHOW_ITEMS.map((item, idx) => (
          <div
            key={item.id}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: idx === currentIndex ? 1 : 0,
              transform: idx === currentIndex ? 'scale(1)' : 'scale(1.04)',
              transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
              pointerEvents: idx === currentIndex ? 'auto' : 'none'
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            {/* Subtle Gradient Overlay for Text Readability */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(30, 34, 43, 0.05) 40%, rgba(20, 10, 15, 0.78) 100%)'
              }}
            />
          </div>
        ))}

        {/* Floating Top Badge */}
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            zIndex: 10
          }}
        >
          <span
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.94)',
              backdropFilter: 'blur(6px)',
              color: 'var(--maroon-primary)',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase'
            }}
          >
            {currentSlide.tag}
          </span>
        </div>

        {/* Prev / Next Controls */}
        <button
          onClick={handlePrev}
          style={{
            position: 'absolute',
            top: '50%',
            left: '0.75rem',
            transform: 'translateY(-50%)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            color: 'var(--maroon-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            zIndex: 10,
            transition: 'all 0.2s'
          }}
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={handleNext}
          style={{
            position: 'absolute',
            top: '50%',
            right: '0.75rem',
            transform: 'translateY(-50%)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            color: 'var(--maroon-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            zIndex: 10,
            transition: 'all 0.2s'
          }}
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>

        {/* Bottom Caption Overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: '1rem',
            left: '1rem',
            right: '1rem',
            zIndex: 10,
            color: '#FFFFFF'
          }}
        >
          <h4
            style={{
              color: '#FFFFFF',
              fontSize: '1.15rem',
              fontWeight: 700,
              marginBottom: '0.2rem',
              textShadow: '0 1px 4px rgba(0,0,0,0.4)'
            }}
          >
            {currentSlide.title}
          </h4>
          <p
            style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '0.85rem',
              lineHeight: 1.4,
              textShadow: '0 1px 3px rgba(0,0,0,0.4)',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {currentSlide.subtitle}
          </p>
        </div>
      </div>

      {/* Bottom Progress Indicator Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.75rem 1.25rem',
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid var(--border-subtle)'
        }}
      >
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {SLIDESHOW_ITEMS.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setCurrentIndex(dotIdx)}
              style={{
                height: '7px',
                width: dotIdx === currentIndex ? '24px' : '7px',
                borderRadius: '4px',
                backgroundColor: dotIdx === currentIndex ? 'var(--maroon-primary)' : 'var(--border-medium)',
                transition: 'all 0.3s ease',
                border: 'none',
                padding: 0
              }}
              aria-label={`Go to slide ${dotIdx + 1}`}
            />
          ))}
        </div>
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
          {currentIndex + 1} / {SLIDESHOW_ITEMS.length}
        </span>
      </div>
    </div>
  );
}

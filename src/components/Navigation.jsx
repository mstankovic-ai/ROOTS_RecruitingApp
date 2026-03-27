import { memo, useState, useEffect, useCallback, useRef } from 'react';
import { SECTIONS } from '../data/sections';
import { theme } from '../theme';

/**
 * Sticky sidebar navigation showing section progress.
 * Highlights the currently visible section via IntersectionObserver.
 */
const Navigation = memo(({ sectionNumbers, isZweit, currentState }) => {
  const [activeId, setActiveId] = useState(null);
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 },
    );

    SECTIONS.forEach((sec) => {
      const el = document.getElementById(`section-${sec.id}`);
      if (el) observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [isZweit]);

  const scrollTo = useCallback((sectionId) => {
    const el = document.getElementById(`section-${sectionId}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  /** Count rated vs total evaluations for a section */
  const getProgress = (section) => {
    if (!section.questions) return null;
    let total = 0;
    let rated = 0;
    for (const q of section.questions) {
      if (!q.evaluations) continue;
      for (let i = 0; i < q.evaluations.length; i++) {
        total += 1;
        if ((currentState.ratings[q.id] || {})[i] != null) rated += 1;
      }
    }
    return total > 0 ? { rated, total } : null;
  };

  return (
    <nav
      style={{
        position: 'fixed',
        left: 0,
        top: 80,
        width: 200,
        maxHeight: 'calc(100vh - 100px)',
        overflowY: 'auto',
        padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
        fontSize: theme.font.sm,
        zIndex: 10,
      }}
      className="no-print"
      aria-label="Sektions-Navigation"
    >
      {SECTIONS.map((section, idx) => {
        const nums = sectionNumbers[idx];
        if (!nums.visible) return null;

        const label = section.sub || section.main;
        if (!label) return null;

        const number = nums.subNumber || (nums.mainNumber ? `${nums.mainNumber}.` : '');
        const isActive = activeId === `section-${section.id}`;
        const progress = getProgress(section);

        return (
          <div
            key={section.id}
            onClick={() => scrollTo(section.id)}
            style={{
              padding: '4px 8px',
              marginBottom: 2,
              borderRadius: theme.radius.sm,
              cursor: 'pointer',
              background: isActive ? theme.colors.info.bg : 'transparent',
              borderLeft: isActive ? `3px solid ${theme.colors.accent.indigo}` : '3px solid transparent',
              color: isActive ? theme.colors.accent.indigoDark : theme.colors.text.muted,
              fontWeight: isActive ? 600 : 400,
              transition: 'all 150ms',
              lineHeight: 1.4,
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && scrollTo(section.id)}
          >
            <div style={{ fontSize: theme.font.xs }}>
              {number} {label}
            </div>
            {section.time && (
              <div style={{ fontSize: 9, color: theme.colors.text.muted, opacity: 0.7 }}>
                {section.time}
                {progress && ` · ${progress.rated}/${progress.total}`}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
});

Navigation.displayName = 'Navigation';
export default Navigation;

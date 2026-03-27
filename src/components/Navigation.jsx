import { memo, useState, useEffect, useCallback, useRef } from 'react';
import { SECTIONS } from '../data/sections';
import { theme } from '../theme';

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
      { rootMargin: '-100px 0px -60% 0px', threshold: 0.1 },
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
        top: 108,
        width: 220,
        maxHeight: 'calc(100vh - 120px)',
        overflowY: 'auto',
        padding: `${theme.spacing.md}px ${theme.spacing.md}px ${theme.spacing.md}px ${theme.spacing.lg}px`,
        fontSize: theme.font.sm,
        zIndex: 10,
      }}
      className="no-print"
      aria-label="Sektions-Navigation"
    >
      <div
        style={{
          fontSize: theme.font.xs,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: theme.colors.text.muted,
          marginBottom: theme.spacing.md,
          paddingLeft: theme.spacing.sm,
        }}
      >
        Sektionen
      </div>

      {SECTIONS.map((section, idx) => {
        const nums = sectionNumbers[idx];
        if (!nums.visible) return null;

        const label = section.sub || section.main;
        if (!label) return null;

        const number = nums.subNumber || (nums.mainNumber ? `${nums.mainNumber}.` : '');
        const isActive = activeId === `section-${section.id}`;
        const progress = getProgress(section);
        const isComplete = progress && progress.rated === progress.total && progress.total > 0;

        return (
          <div
            key={section.id}
            onClick={() => scrollTo(section.id)}
            style={{
              padding: '8px 12px',
              marginBottom: 2,
              borderRadius: theme.radius.sm,
              cursor: 'pointer',
              background: isActive ? theme.colors.accent.indigoLight : 'transparent',
              borderLeft: isActive
                ? `3px solid ${theme.colors.accent.indigo}`
                : '3px solid transparent',
              color: isActive ? theme.colors.accent.indigoDark : theme.colors.text.secondary,
              fontWeight: isActive ? 600 : 400,
              transition: `all ${theme.transition.fast}`,
              lineHeight: 1.4,
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && scrollTo(section.id)}
          >
            <div
              style={{
                fontSize: theme.font.sm,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span style={{ opacity: 0.5, fontWeight: 500, minWidth: 24 }}>{number}</span>
              <span style={{ flex: 1 }}>{label}</span>
            </div>
            {(section.time || progress) && (
              <div
                style={{
                  fontSize: theme.font.xs,
                  color: theme.colors.text.muted,
                  marginTop: 2,
                  paddingLeft: 30,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                {section.time && <span>{section.time}</span>}
                {progress && (
                  <span
                    style={{
                      color: isComplete ? theme.colors.success.badge : theme.colors.text.muted,
                      fontWeight: isComplete ? 600 : 400,
                    }}
                  >
                    {progress.rated}/{progress.total}
                  </span>
                )}
                {/* Mini progress bar */}
                {progress && (
                  <div
                    style={{
                      flex: 1,
                      height: 3,
                      background: theme.colors.border.default,
                      borderRadius: 2,
                      overflow: 'hidden',
                      maxWidth: 40,
                    }}
                  >
                    <div
                      style={{
                        width: `${(progress.rated / progress.total) * 100}%`,
                        height: '100%',
                        background: isComplete
                          ? theme.colors.success.badge
                          : theme.colors.accent.indigo,
                        borderRadius: 2,
                        transition: `width ${theme.transition.slow}`,
                      }}
                    />
                  </div>
                )}
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

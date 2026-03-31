import { memo, useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { SECTIONS } from '../data/sections';
import { theme } from '../theme';

const Navigation = memo(({ sectionNumbers, isZweit, currentState }) => {
  const [activeId, setActiveId] = useState(null);
  const [manualExpanded, setManualExpanded] = useState(null);
  const observerRef = useRef(null);

  // Group sections into chapters (main sections with their sub-sections)
  const chapters = useMemo(() => {
    const result = [];
    let current = null;
    SECTIONS.forEach((section, idx) => {
      const nums = sectionNumbers[idx];
      if (!nums.visible) return;
      if (section.main) {
        current = { main: section, mainIdx: idx, mainNumber: nums.mainNumber, subs: [] };
        result.push(current);
        // If the main section itself has questions or a type, include it as navigable
        if (!section.sub) {
          current.mainSection = { section, idx, nums };
        }
      }
      if (section.sub && current) {
        current.subs.push({ section, idx, nums });
      }
    });
    return result;
  }, [sectionNumbers]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => { for (const e of entries) { if (e.isIntersecting) setActiveId(e.target.id); } },
      { rootMargin: '-100px 0px -60% 0px', threshold: 0.1 },
    );
    SECTIONS.forEach((s) => { const el = document.getElementById(`section-${s.id}`); if (el) observerRef.current.observe(el); });
    return () => observerRef.current?.disconnect();
  }, [isZweit]);

  // Derive expanded chapter from active section (auto-expand)
  const autoExpandedChapter = useMemo(() => {
    if (!activeId) return null;
    const sectionId = activeId.replace('section-', '');
    for (const chapter of chapters) {
      if (chapter.main.id === sectionId || chapter.subs.some(s => s.section.id === sectionId)) {
        return chapter.main.id;
      }
    }
    return null;
  }, [activeId, chapters]);

  const expandedChapter = manualExpanded ?? autoExpandedChapter;

  // Reset manual override when active section changes chapter
  const prevAutoRef = useRef(autoExpandedChapter);
  if (prevAutoRef.current !== autoExpandedChapter) {
    prevAutoRef.current = autoExpandedChapter;
    if (manualExpanded !== null) setManualExpanded(null);
  }

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(`section-${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const getProgress = (sec) => {
    if (!sec.questions) return null;
    let total = 0, rated = 0;
    for (const q of sec.questions) {
      if (!q.evaluations) continue;
      for (let i = 0; i < q.evaluations.length; i++) { total++; if ((currentState.ratings[q.id] || {})[i] != null) rated++; }
    }
    return total > 0 ? { rated, total } : null;
  };

  // Aggregate progress across all sections in a chapter
  const getChapterProgress = (chapter) => {
    let total = 0, rated = 0;
    const sections = [chapter.main, ...chapter.subs.map(s => s.section)];
    for (const sec of sections) {
      const p = getProgress(sec);
      if (p) { total += p.total; rated += p.rated; }
    }
    return total > 0 ? { rated, total } : null;
  };

  return (
    <nav
      style={{
        position: 'fixed', left: 0, top: 114, width: 230,
        maxHeight: 'calc(100vh - 130px)', overflowY: 'auto',
        padding: `${theme.spacing.lg}px ${theme.spacing.md}px ${theme.spacing.lg}px ${theme.spacing.lg}px`,
        zIndex: 10,
      }}
      className="no-print"
      aria-label="Sektions-Navigation"
    >
      <div style={{ fontSize: theme.font.xs, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: theme.colors.text.muted, marginBottom: theme.spacing.md, paddingLeft: 10 }}>
        Kapitel
      </div>

      {chapters.map((chapter) => {
        const isExpanded = expandedChapter === chapter.main.id;
        const isChapterActive = activeId === `section-${chapter.main.id}` || chapter.subs.some(s => activeId === `section-${s.section.id}`);
        const chapterProgress = getChapterProgress(chapter);
        const isComplete = chapterProgress && chapterProgress.rated === chapterProgress.total && chapterProgress.total > 0;
        const hasSubs = chapter.subs.length > 0;

        return (
          <div key={chapter.main.id} style={{ marginBottom: 2 }}>
            {/* Chapter header */}
            <div
              onClick={() => {
                setManualExpanded(isExpanded ? null : chapter.main.id);
                scrollTo(chapter.main.id);
              }}
              style={{
                padding: '9px 12px',
                borderRadius: theme.radius.sm,
                cursor: 'pointer',
                background: isChapterActive ? theme.colors.accent.indigoLight : 'transparent',
                borderLeft: isChapterActive ? `2px solid ${theme.colors.accent.indigo}` : '2px solid transparent',
                color: isChapterActive ? theme.colors.accent.indigoMid : theme.colors.text.secondary,
                fontWeight: 600,
                transition: `all ${theme.transition.fast}`,
                lineHeight: 1.4,
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && scrollTo(chapter.main.id)}
            >
              <div style={{ fontSize: theme.font.sm, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ opacity: 0.4, fontWeight: 500, minWidth: 26, fontFamily: theme.fontMono, fontSize: theme.font.xs }}>
                  {chapter.mainNumber}.
                </span>
                <span style={{ flex: 1 }}>{chapter.main.main}</span>
                {hasSubs && (
                  <span style={{ fontSize: 9, opacity: 0.4, transition: `transform ${theme.transition.fast}`, transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)', display: 'inline-block' }}>
                    &#9654;
                  </span>
                )}
                {isComplete && (
                  <span style={{ color: theme.colors.success.badge, fontSize: theme.font.xs }}>&#10003;</span>
                )}
              </div>
              {chapterProgress && (
                <div style={{ fontSize: theme.font.xs, color: theme.colors.text.muted, marginTop: 3, paddingLeft: 32, display: 'flex', alignItems: 'center', gap: 6 }}>
                  {chapter.main.time && !hasSubs && <span style={{ opacity: 0.6 }}>{chapter.main.time}</span>}
                  <span style={{ color: isComplete ? theme.colors.success.badge : theme.colors.text.muted, fontWeight: isComplete ? 600 : 400, fontFamily: theme.fontMono }}>
                    {chapterProgress.rated}/{chapterProgress.total}
                  </span>
                  <div style={{ flex: 1, height: 2, background: 'rgba(255,255,255,0.06)', borderRadius: 1, overflow: 'hidden', maxWidth: 36 }}>
                    <div style={{ width: `${(chapterProgress.rated / chapterProgress.total) * 100}%`, height: '100%', background: isComplete ? theme.colors.success.badge : theme.colors.accent.indigo, borderRadius: 1, transition: `width ${theme.transition.slow}`, boxShadow: isComplete ? `0 0 6px ${theme.colors.success.badge}40` : `0 0 6px ${theme.colors.accent.indigoGlow}` }} />
                  </div>
                </div>
              )}
            </div>

            {/* Sub-sections (only visible when expanded) */}
            {isExpanded && hasSubs && (
              <div style={{ overflow: 'hidden', transition: `all ${theme.transition.normal}` }}>
                {chapter.subs.map(({ section, nums }) => {
                  const isSubActive = activeId === `section-${section.id}`;
                  const progress = getProgress(section);
                  const subComplete = progress && progress.rated === progress.total && progress.total > 0;

                  return (
                    <div
                      key={section.id}
                      onClick={() => scrollTo(section.id)}
                      style={{
                        padding: '7px 12px 7px 40px',
                        marginBottom: 1,
                        borderRadius: theme.radius.sm,
                        cursor: 'pointer',
                        background: isSubActive ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
                        color: isSubActive ? theme.colors.accent.indigoMid : theme.colors.text.muted,
                        fontWeight: isSubActive ? 500 : 400,
                        transition: `all ${theme.transition.fast}`,
                        lineHeight: 1.4,
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && scrollTo(section.id)}
                    >
                      <div style={{ fontSize: theme.font.xs, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ opacity: 0.4, fontFamily: theme.fontMono, minWidth: 30 }}>{nums.subNumber}</span>
                        <span style={{ flex: 1 }}>{section.sub}</span>
                        {subComplete && <span style={{ color: theme.colors.success.badge, fontSize: 10 }}>&#10003;</span>}
                      </div>
                      {section.time && (
                        <div style={{ fontSize: theme.font.xs, color: theme.colors.text.muted, marginTop: 2, paddingLeft: 36, opacity: 0.6 }}>
                          {section.time}
                        </div>
                      )}
                    </div>
                  );
                })}
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

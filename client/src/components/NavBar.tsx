export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{
      background: 'rgba(248, 246, 243, 0.8)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-light)',
    }}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm"
            style={{
              background: 'var(--accent-gradient)',
              transition: 'transform 0.4s var(--ease-out-expo)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
          <span
            className="text-lg font-bold tracking-tight"
            style={{
              fontFamily: "var(--font-space-grotesk, 'Space Grotesk'), sans-serif",
              color: 'var(--text-primary)',
            }}
          >
            VideoRAG
          </span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {['Dashboard', 'Compare', 'Analytics'].map((item, i) => (
            <button
              key={item}
              className="relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300"
              style={{
                color: i === 1 ? 'var(--accent)' : 'var(--text-secondary)',
                background: i === 1 ? 'var(--accent-soft)' : 'transparent',
                fontFamily: "var(--font-dm-sans, 'DM Sans'), sans-serif",
              }}
              onMouseEnter={(e) => {
                if (i !== 1) {
                  e.currentTarget.style.background = 'var(--bg-warm)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (i !== 1) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }
              }}
            >
              {item}
            </button>
          ))}
        </div>

        {/* CTA */}
        <button
          className="btn-primary px-5 py-2.5 text-sm flex items-center gap-2"
          style={{ fontSize: '0.85rem' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          New Analysis
        </button>
      </div>
    </nav>
  );
}

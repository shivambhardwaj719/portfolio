const fs = require('fs');

// 1. Update page.tsx
let pageFile = 'src/app/page.tsx';
let pageContent = fs.readFileSync(pageFile, 'utf8');

// Replace inline styles for ul in project-desc
pageContent = pageContent.replace(/<ul style={{ paddingLeft: '1\.2rem', display: 'flex', flexDirection: 'column', gap: '0\.5rem' }}>/g, '<ul className="feature-list">');

// Replace standard ul in timeline-content
pageContent = pageContent.replace(/<div className="timeline-content">([\s\S]*?)<ul>/g, '<div className="timeline-content">$1<ul className="feature-list">');

fs.writeFileSync(pageFile, pageContent);

// 2. Update globals.css
let cssFile = 'src/app/globals.css';
let cssContent = fs.readFileSync(cssFile, 'utf8');

const cssToAdd = `
/* Feature Lists */
.feature-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
}

.feature-list li {
    position: relative;
    padding-left: 1.5rem;
    color: var(--text-muted);
    font-size: 0.95rem;
    line-height: 1.6;
    transition: color 0.3s ease;
}

.feature-list li:hover {
    color: var(--text-primary);
}

.feature-list li::before {
    content: '▹';
    position: absolute;
    left: 0;
    top: 2px;
    color: var(--accent-primary);
    font-size: 1.2rem;
    line-height: 1;
    transition: transform 0.3s ease;
}

.feature-list li:hover::before {
    transform: translateX(3px);
}

.timeline-content .feature-list li {
    font-size: 1.05rem;
    padding-left: 1.8rem;
    margin-bottom: 0.3rem;
}

.timeline-content .feature-list li::before {
    content: '→';
    font-family: var(--font-code);
    font-size: 1.1rem;
    color: var(--accent-secondary);
    top: 4px;
}

.timeline-title {
    font-family: var(--font-heading);
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 1rem;
}

.timeline-title a:hover {
    text-shadow: 0 0 10px var(--accent-glow);
}
`;

if (!cssContent.includes('.feature-list {')) {
    cssContent += '\n' + cssToAdd;
    fs.writeFileSync(cssFile, cssContent);
}

console.log('UI improvements applied.');

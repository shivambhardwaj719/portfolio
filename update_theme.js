const fs = require('fs');
const file = 'src/app/globals.css';
let css = fs.readFileSync(file, 'utf8');

// Replace hex colors
css = css.replace(/#10B981/ig, 'var(--accent-primary)');
css = css.replace(/#3B82F6/ig, 'var(--accent-secondary)');
css = css.replace(/#050505/ig, 'var(--bg)');
css = css.replace(/#0a0a0e/ig, 'var(--surface)');

// Replace RGB values
css = css.replace(/16,\s*185,\s*129/g, '168, 85, 247');
css = css.replace(/59,\s*130,\s*246/g, '6, 182, 212');

// Update CSS Variables explicitly
css = css.replace(
  /:root\s*\{[\s\S]*?\}/,
  `:root {
    --bg: #050508;
    --surface: #0a0a10;
    --card: #12121a;
    --accent-primary: #a855f7;
    --accent-secondary: #06b6d4;
    --accent-glow: rgba(168, 85, 247, 0.25);
    --text-primary: #f8fafc;
    --text-muted: #94a3b8;
    --border: rgba(255, 255, 255, 0.08);
}`
);

// Add --font-heading to h1, h2, h3, nav-brand
css = css.replace(/h1, .h1-style \{/, 'h1, h2, h3, .h1-style { font-family: var(--font-heading); }\n\nh1, .h1-style {');
css = css.replace(/\.nav-brand \{([\s\S]*?)\}/, (match, p1) => {
  return `.nav-brand {${p1.replace(/var\(--font-code\)/, 'var(--font-heading)')}}`;
});

// Update hover on buttons for the new colors
css = css.replace(/#0d9668/g, '#9333ea');
css = css.replace(/#13d492/g, '#c084fc');

fs.writeFileSync(file, css);
console.log('Theme updated!');

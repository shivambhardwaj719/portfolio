const fs = require('fs');

// 1. Update page.tsx
let pageFile = 'src/app/page.tsx';
let pageContent = fs.readFileSync(pageFile, 'utf8');
pageContent = pageContent.replace(/src="images\/profile\.png"/g, 'src="images/profile_nobg.png"');
fs.writeFileSync(pageFile, pageContent);

// 2. Update globals.css to remove the tilting animation
let cssFile = 'src/app/globals.css';
let cssContent = fs.readFileSync(cssFile, 'utf8');

const staticStyles = `.hero-right {
  position:relative; width:400px; height:500px; flex-shrink:0;
  opacity:0; animation: fadeUp 0.8s 0.7s forwards;
}
.hero-img-frame {
  width:100%; height:100%; overflow:visible;
  position:relative; border:none; background:transparent;
}
.hero-img-frame::before {
  display: none;
}
.hero-img {
  width:100%; height:100%; object-fit:contain; object-position:bottom;
  filter: drop-shadow(0 20px 30px rgba(168, 85, 247, 0.4)) drop-shadow(0 0 10px rgba(6, 182, 212, 0.3));
  transform: scale(1.05);
}
.hero-img:hover {
  filter: drop-shadow(0 25px 35px rgba(168, 85, 247, 0.6)) drop-shadow(0 0 20px rgba(6, 182, 212, 0.5));
}`;

// Replace the previous 3D hover styles
cssContent = cssContent.replace(/\.hero-right\s*{[\s\S]*?\.hero-img:hover\s*{[^}]*}/, staticStyles);
fs.writeFileSync(cssFile, cssContent);

console.log("Fixed profile image to no bg and static");

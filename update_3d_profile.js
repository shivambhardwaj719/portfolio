const fs = require('fs');

let cssFile = 'src/app/globals.css';
let cssContent = fs.readFileSync(cssFile, 'utf8');

// Replace hero image styles
const newStyles = `.hero-right {
  position:relative; width:400px; height:500px; flex-shrink:0;
  opacity:0; animation: fadeUp 0.8s 0.7s forwards;
  perspective: 1000px;
}
.hero-img-frame {
  width:100%; height:100%; overflow:visible;
  position:relative; border:none; background:transparent;
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.hero-img-frame::before {
  display: none;
}
.hero-img-frame:hover {
  transform: rotateY(-15deg) rotateX(10deg);
}
.hero-img {
  width:100%; height:100%; object-fit:contain; object-position:bottom;
  filter: drop-shadow(0 20px 30px rgba(168, 85, 247, 0.4)) drop-shadow(0 0 10px rgba(6, 182, 212, 0.3));
  transition: filter 0.5s, transform 0.5s;
  transform: translateZ(50px) scale(1.05);
}
.hero-img:hover {
  filter: drop-shadow(0 30px 40px rgba(168, 85, 247, 0.6)) drop-shadow(0 0 20px rgba(6, 182, 212, 0.5));
  transform: translateZ(80px) scale(1.1);
}`;

// Use regex to replace the old styles from .hero-right to .hero-img:hover
cssContent = cssContent.replace(/\.hero-right\s*{[\s\S]*?\.hero-img:hover\s*{[^}]*}/, newStyles);

fs.writeFileSync(cssFile, cssContent);
console.log("CSS updated for 3D image.");

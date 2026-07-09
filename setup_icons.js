const fs = require('fs');
const https = require('https');
const path = require('path');

const iconsDir = path.join(__dirname, 'public', 'icons');
if (!fs.existsSync(iconsDir)){
    fs.mkdirSync(iconsDir, { recursive: true });
}

const techStack = [
  { name: 'Python', slug: 'python', color: '3776AB', group: 1 },
  { name: 'JavaScript', slug: 'javascript', color: 'F7DF1E', group: 1 },
  { name: 'Java', slug: 'openjdk', color: 'ED8B00', group: 1 },
  { name: 'C', slug: 'c', color: 'A8B9CC', group: 1 },
  { name: 'Dart', slug: 'dart', color: '0175C2', group: 1 },
  { name: 'Django', slug: 'django', color: '092E20', group: 1 },
  { name: 'FastAPI', slug: 'fastapi', color: '009688', group: 1 },
  { name: 'Node.js', slug: 'nodedotjs', color: '339933', group: 1 },
  { name: 'Next.js', slug: 'nextdotjs', color: 'ffffff', group: 1 },
  { name: 'React', slug: 'react', color: '61DAFB', group: 1 },
  
  { name: 'OpenAI', slug: 'openai', color: 'ffffff', group: 2 },
  { name: 'Anthropic', slug: 'anthropic', color: 'D97757', group: 2 },
  { name: 'LangChain', slug: 'langchain', color: 'ffffff', group: 2 },
  { name: 'JWT', slug: 'jsonwebtokens', color: '000000', group: 2 },
  { name: 'Redux', slug: 'redux', color: '764ABC', group: 2 },
  { name: 'React Hook Form', slug: 'reacthookform', color: 'EC5990', group: 2 },
  { name: 'Zod', slug: 'zod', color: '3E67B1', group: 2 },
  { name: 'Framer', slug: 'framer', color: '0055FF', group: 2 },
  
  { name: 'PostgreSQL', slug: 'postgresql', color: '4169E1', group: 3 },
  { name: 'MySQL', slug: 'mysql', color: '4479A1', group: 3 },
  { name: 'MongoDB', slug: 'mongodb', color: '47A248', group: 3 },
  { name: 'Redis', slug: 'redis', color: 'DC382D', group: 3 },
  { name: 'AWS', slug: 'amazonaws', color: 'FF9900', group: 3 },
  { name: 'Docker', slug: 'docker', color: '2496ED', group: 3 },
  { name: 'Nginx', slug: 'nginx', color: '009639', group: 3 },
  { name: 'Linux', slug: 'linux', color: 'FCC624', group: 3 },
  
  { name: 'Celery', slug: 'celery', color: '37814A', group: 4 },
  { name: 'Socket.io', slug: 'socketdotio', color: 'ffffff', group: 4 },
  { name: 'Firebase', slug: 'firebase', color: 'FFCA28', group: 4 },
  { name: 'WebRTC', slug: 'webrtc', color: '333333', group: 4 },
  { name: 'Git', slug: 'git', color: 'F05032', group: 4 },
  { name: 'GitHub', slug: 'github', color: 'ffffff', group: 4 },
  { name: 'Postman', slug: 'postman', color: 'FF6C37', group: 4 },
  { name: 'Swagger', slug: 'swagger', color: '85EA2D', group: 4 },
  { name: 'VS Code', slug: 'visualstudiocode', color: '007ACC', group: 4 }
];

const downloadIcon = (item) => {
  return new Promise((resolve) => {
    const filePath = path.join(iconsDir, `${item.slug}.svg`);
    // Fallback if network fails, we'll write a generic text SVG
    const fallbackSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><text x="12" y="16" font-size="14" font-weight="bold" text-anchor="middle" fill="#${item.color}">${item.name[0]}</text></svg>`;
    
    https.get(`https://cdn.simpleicons.org/${item.slug}/${item.color}`, (res) => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(filePath);
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve(true); });
      } else {
        fs.writeFileSync(filePath, fallbackSvg);
        resolve(false);
      }
    }).on('error', () => {
      fs.writeFileSync(filePath, fallbackSvg);
      resolve(false);
    });
  });
};

async function run() {
  for (const item of techStack) {
    await downloadIcon(item);
  }
  
  // Now modify page.tsx
  let pageFile = 'src/app/page.tsx';
  let pageContent = fs.readFileSync(pageFile, 'utf8');
  
  // generate HTML for tracks
  let tracksHtml = '';
  for(let g = 1; g <= 4; g++) {
    const groupItems = techStack.filter(t => t.group === g);
    // double them to ensure seamless marquee loop
    const displayItems = [...groupItems, ...groupItems, ...groupItems];
    const reverseClass = (g % 2 === 0) ? ' reverse-track' : '';
    const speed = 25 + (g * 5); // varies speed slightly
    
    let trackHtml = `
            <div className="marquee-container" style={{ padding: '1rem 0' }}>
              <div className={\`marquee-content bubble-track\${reverseClass}\`} style={{ animationDuration: '${speed}s' }}>
                <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
`;
    displayItems.forEach((item, index) => {
       const delay = (Math.random() * 2).toFixed(2);
       const yOffset = Math.floor(Math.random() * 20) - 10;
       trackHtml += `
                  <div className="skill-bubble" title="${item.name}" style={{ animationDelay: '${delay}s', transform: 'translateY(${yOffset}px)' }}>
                    <img src="/icons/${item.slug}.svg" alt="${item.name}" style={{ width: '45px', height: '45px', objectFit: 'contain' }} />
                  </div>`;
    });
    
    trackHtml += `
                </div>
              </div>
            </div>`;
    tracksHtml += trackHtml;
  }
  
  const newSkills = `
          <div className="skills-wrapper reveal delay-1">
${tracksHtml}
`;

  const skillsRegex = /<div className="skills-wrapper reveal delay-1">[\s\S]*?<\/section>/;
  pageContent = pageContent.replace(skillsRegex, newSkills + '          </div>\n        </section>');
  fs.writeFileSync(pageFile, pageContent);
  console.log('Icons created and page updated.');
}

run();

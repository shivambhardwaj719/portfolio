const fs = require('fs');

let pageFile = 'src/app/page.tsx';
let pageContent = fs.readFileSync(pageFile, 'utf8');

// Replace the skills wrapper content
const newSkills = `
            <div className="marquee-container" style={{ padding: '2rem 0' }}>
              <div className="marquee-content bubble-track">
                {[...Array(2)].map((_, i) => (
                  <div key={\`backend-\${i}\`} style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    
                    <div className="skill-bubble" title="Python" style={{ animationDelay: '0.1s' }}>
                      <svg viewBox="0 0 24 24" fill="var(--accent-primary)"><path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23v-2.1l.04-1.08.11-.92.18-.75.24-.59.28-.46.31-.34.32-.24.32-.16.31-.1.29-.05.26-.02h3.37v-2.6l.04-.66.12-.59.19-.53.25-.47.3-.42.33-.37.36-.31.38-.26.41-.2.43-.15.45-.1.46-.06.46-.03zM12 2.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-2.25 21.32l-.9-.2-.73-.26-.59-.3-.45-.32-.34-.34-.25-.34-.16-.33-.1-.3-.04-.26-.02-.2.01-.13V15.5l.05-.63.13-.55.21-.46.26-.38.3-.31.33-.25.35-.19.35-.14.33-.1.3-.07.26-.04.21-.02h5.61l.69-.05.59-.14.5-.22.41-.27.33-.32.27-.35.2-.36.15-.37.1-.35.07-.32.04-.27.02-.21v-3.06h3.17l.21.03.28.07.32.12.35.18.36.26.36.36.35.46.32.59.28.73.21.88.14 1.05.05 1.23v2.1l-.04 1.08-.11.92-.18.75-.24.59-.28.46-.31.34-.32.24-.32.16-.31.1-.29.05-.26.02h-3.37v2.6l-.04.66-.12.59-.19.53-.25.47-.3.42-.33.37-.36.31-.38.26-.41.2-.43.15-.45.1-.46.06-.46.03zM12 18.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"/></svg>
                    </div>

                    <div className="skill-bubble" title="Django" style={{ animationDelay: '0.4s', transform: 'translateY(15px)' }}>
                      <svg viewBox="0 0 24 24" fill="var(--accent-secondary)"><path d="M11 2v20c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V2c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2zm10 0v14c0 1.1-.9 2-2 2h-4c-1.1 0-2-.9-2-2V2c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2z"/></svg>
                    </div>

                    <div className="skill-bubble" title="Node.js" style={{ animationDelay: '0.2s', transform: 'translateY(-10px)' }}>
                      <svg viewBox="0 0 24 24" fill="#68A063"><path d="M11.8 2c-1.3 0-2.6.4-3.7 1L3 6c-1.6.9-2.5 2.6-2.5 4.5v6C.5 18.4 1.4 20 3 21l5.2 3c1.2.7 2.5 1 3.8 1s2.6-.3 3.8-1l5.2-3c1.6-.9 2.5-2.6 2.5-4.5v-6c0-1.9-.9-3.6-2.5-4.5L15.6 3c-1.1-.6-2.4-1-3.8-1zm0 18c-.8 0-1.5-.2-2.1-.6l-4.5-2.6c-1-.6-1.6-1.7-1.6-2.8v-5.2c0-1.1.6-2.2 1.6-2.8l4.5-2.6c1.3-.8 2.9-.8 4.2 0l4.5 2.6c1 .6 1.6 1.7 1.6 2.8v5.2c0 1.1-.6 2.2-1.6 2.8l-4.5 2.6c-.6.4-1.3.6-2.1.6z"/></svg>
                    </div>

                    <div className="skill-bubble" title="React / Next.js" style={{ animationDelay: '0.5s', transform: 'translateY(5px)' }}>
                      <svg viewBox="0 0 24 24" fill="#61DAFB"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    </div>

                    <div className="skill-bubble" title="PostgreSQL" style={{ animationDelay: '0.3s', transform: 'translateY(-15px)' }}>
                      <svg viewBox="0 0 24 24" fill="#336791"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 9h-2V7h-2v5H6v2h2v5h2v-5h2v-2z"/></svg>
                    </div>

                    <div className="skill-bubble" title="AWS" style={{ animationDelay: '0.6s', transform: 'translateY(10px)' }}>
                      <svg viewBox="0 0 24 24" fill="#FF9900"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9h2v9h-2z"/></svg>
                    </div>

                    <div className="skill-bubble" title="Docker" style={{ animationDelay: '0.2s', transform: 'translateY(-5px)' }}>
                      <svg viewBox="0 0 24 24" fill="#2496ED"><path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z"/></svg>
                    </div>
                    
                    <div className="skill-bubble" title="Redis" style={{ animationDelay: '0.5s', transform: 'translateY(12px)' }}>
                      <svg viewBox="0 0 24 24" fill="#DC382D"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-4H9v4H7V8h2v4h2V8h2v8z"/></svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>`;

// Replace everything between <div className="skills-wrapper reveal delay-1"> and </section>
const skillsRegex = /<div className="skills-wrapper reveal delay-1">[\s\S]*?<\/section>/;
pageContent = pageContent.replace(skillsRegex, '<div className="skills-wrapper reveal delay-1">' + newSkills + '\n          </div>\n        </section>');
fs.writeFileSync(pageFile, pageContent);

// Update globals.css with new bubble styles
let cssFile = 'src/app/globals.css';
let cssContent = fs.readFileSync(cssFile, 'utf8');

const bubbleCSS = `
/* Floating Skill Bubbles */
.bubble-track {
    animation-duration: 25s !important;
}

.skill-bubble {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background: radial-gradient(130% 130% at 20% 20%, rgba(255,255,255,0.1), rgba(255,255,255,0.01));
    border: 1px solid rgba(255, 255, 255, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 
        0 15px 35px rgba(0,0,0,0.5), 
        inset 0 0 20px rgba(255,255,255,0.05),
        inset 0 2px 5px rgba(255,255,255,0.2);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    animation: floatBubble 4s ease-in-out infinite alternate;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    cursor: pointer;
}

.skill-bubble::before {
    content: '';
    position: absolute;
    top: 5%;
    left: 15%;
    width: 30%;
    height: 30%;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,255,255,0.8), transparent 60%);
    filter: blur(3px);
    opacity: 0.3;
}

.skill-bubble svg {
    width: 45px;
    height: 45px;
    filter: drop-shadow(0 5px 10px rgba(0,0,0,0.3));
    transition: transform 0.4s ease;
}

.skill-bubble:hover {
    transform: translateY(-10px) scale(1.1) !important;
    border-color: var(--accent-primary);
    box-shadow: 
        0 20px 40px rgba(0,0,0,0.6), 
        0 0 25px var(--accent-glow),
        inset 0 0 20px rgba(255,255,255,0.1);
    z-index: 10;
}

.skill-bubble:hover svg {
    transform: scale(1.15);
}

@keyframes floatBubble {
    0% { transform: translateY(0); }
    100% { transform: translateY(-15px); }
}
`;

if (!cssContent.includes('.skill-bubble {')) {
    cssContent += '\n' + bubbleCSS;
    fs.writeFileSync(cssFile, cssContent);
}

console.log('Bubbles created');

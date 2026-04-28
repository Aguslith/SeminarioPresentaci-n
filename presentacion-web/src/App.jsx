import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './index.css';

// Animation variants for the whole slide container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.25,
      delayChildren: 0.1
    }
  },
  exit: { opacity: 0, x: -50, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } }
};

// Animation variants for individual items moving from middle to right
const itemVariants = {
  hidden: { opacity: 0, x: -40, scale: 0.95 },
  visible: { 
    opacity: 1, 
    x: 0, 
    scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } // Smooth premium easing
  }
};

const slideVariants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? '50vw' : '-50vw',
      opacity: 0,
      scale: 0.95
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, type: "spring", bounce: 0.15, damping: 20 }
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? '50vw' : '-50vw',
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
    };
  }
};

const slidesData = [
  {
    id: 0,
    title: "",
    subtitle: "",
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: '100%', justifyContent: 'center' }}>
        <h2 style={{ fontSize: '4.5rem', fontWeight: 800, marginBottom: '2rem', background: 'linear-gradient(to right, #8B7355, #D4A373)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.2 }}>
          Presentamos...
        </h2>
        <h3 style={{ fontSize: '2rem', color: '#5A5650', marginBottom: '2rem', fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>Seminario de Actualización Web</h3>
        
        <div className="carousel-container">
          <div className="carousel-track">
            {/* Original Items */}
            <div className="carousel-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" className="carousel-icon" alt="HTML5"/> HTML5</div>
            <div className="carousel-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" className="carousel-icon" alt="CSS3"/> CSS3</div>
            <div className="carousel-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" className="carousel-icon" alt="JS"/> JavaScript</div>
            <div className="carousel-item"><img src="/logos/reactjs_logo_icon_170805.png" className="carousel-icon" alt="React"/> React</div>
            <div className="carousel-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" className="carousel-icon" alt="Vite"/> Vite</div>
            <div className="carousel-item"><img src="/logos/nodejs_logo_icon_168945.png" className="carousel-icon" alt="Node.js"/> Node.js</div>
            <div className="carousel-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg" className="carousel-icon" alt="NPM"/> NPM</div>
            <div className="carousel-item"><img src="/logos/1922aa91b23fc00bedfa4f485ea193f9.webp" className="carousel-icon" alt="HTMX"/> HTMX</div>
            {/* Duplicated Items for seamless loop */}
            <div className="carousel-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" className="carousel-icon" alt="HTML5"/> HTML5</div>
            <div className="carousel-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" className="carousel-icon" alt="CSS3"/> CSS3</div>
            <div className="carousel-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" className="carousel-icon" alt="JS"/> JavaScript</div>
            <div className="carousel-item"><img src="/logos/reactjs_logo_icon_170805.png" className="carousel-icon" alt="React"/> React</div>
            <div className="carousel-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" className="carousel-icon" alt="Vite"/> Vite</div>
            <div className="carousel-item"><img src="/logos/nodejs_logo_icon_168945.png" className="carousel-icon" alt="Node.js"/> Node.js</div>
            <div className="carousel-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg" className="carousel-icon" alt="NPM"/> NPM</div>
            <div className="carousel-item"><img src="/logos/1922aa91b23fc00bedfa4f485ea193f9.webp" className="carousel-icon" alt="HTMX"/> HTMX</div>
          </div>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '2rem', fontSize: '1.2rem', color: '#5A5650', fontFamily: 'Inter, sans-serif' }}>
          <strong>Integrantes:</strong> Herrera Agustin, Simon Carrizo, Lautaro Ocampo, Gabriel Romero
        </div>
      </div>
    )
  },
  {
    id: 1,
    title: "HTML + CSS + JS",
    subtitle: "La base de la web",
    title: "HTML + CSS + JS",
    subtitle: "La base de la web",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    content: (
      <div className="grid-content">
        <motion.div variants={itemVariants} className="info-card">
          <h3><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" alt="HTML5" style={{ width: 28, height: 28 }} /> HTML</h3>
          <p>Estructura la página web con elementos básicos.</p>
          <div className="code-block">
{`<h1>Hola</h1>
<button onclick="saludar()">Click</button>`}
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className="info-card">
          <h3><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" alt="CSS3" style={{ width: 28, height: 28 }} /> CSS</h3>
          <p>Le da diseño, color y estilos visuales.</p>
        </motion.div>
        <motion.div variants={itemVariants} className="info-card">
          <h3><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" alt="JavaScript" style={{ width: 28, height: 28 }} /> JS</h3>
          <p>Agrega interacción y lógica dinámica.</p>
          <div className="code-block">
{`function saludar() {
  alert("Hola mundo");
}`}
          </div>
        </motion.div>
      </div>
    )
  },
  {
    id: 2,
    title: "React (Frontend)",
    logo: "/logos/reactjs_logo_icon_170805.png",
    content: (
      <div className="grid-content" style={{ display: 'block' }}>
        <motion.div variants={itemVariants} className="info-card" style={{ marginBottom: '2rem' }}>
          <p>👉 Sirve para crear interfaces modernas</p>
          <ul style={{ paddingLeft: '2rem', marginTop: '1rem', listStyle: 'none' }}>
            <li style={{ marginBottom: '0.5rem' }}>⚛️ Usa componentes reutilizables</li>
            <li>🚀 Hace la web dinámica y rápida</li>
          </ul>
        </motion.div>
        <motion.div variants={itemVariants} className="info-card">
          <h3>Ejemplo de Componente:</h3>
          <div className="code-block">
{`function App() {
  return <h1>Hola desde React</h1>;
}`}
          </div>
        </motion.div>
      </div>
    )
  },
  {
    id: 3,
    title: "Vite",
    subtitle: "Herramienta de desarrollo moderna",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
    content: (
      <div className="grid-content" style={{ display: 'block' }}>
         <motion.div variants={itemVariants} className="info-card" style={{ marginBottom: '2rem' }}>
          <p>👉 Sirve para:</p>
          <ul style={{ paddingLeft: '2rem', marginTop: '1rem', listStyle: 'none' }}>
            <li style={{ marginBottom: '0.5rem' }}>⚡ Crear el proyecto al instante</li>
            <li style={{ marginBottom: '0.5rem' }}>🏃‍♂️ Ejecutarlo rapidísimo</li>
            <li>👀 Ver cambios en vivo (HMR)</li>
          </ul>
        </motion.div>
        <motion.div variants={itemVariants} className="info-card">
          <h3>Ejemplo de creación:</h3>
          <div className="code-block">
{`npm create vite@latest`}
          </div>
        </motion.div>
      </div>
    )
  },
  {
    id: 4,
    title: "NPM",
    subtitle: "Node Package Manager",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg",
    content: (
      <div className="grid-content" style={{ display: 'block' }}>
        <motion.div variants={itemVariants} className="info-card" style={{ marginBottom: '2rem' }}>
          <p>👉 Sirve para instalar dependencias y librerías de terceros (como React, Framer Motion, etc).</p>
        </motion.div>
        <motion.div variants={itemVariants} className="info-card">
          <h3>Ejemplo de instalación:</h3>
          <div className="code-block">
{`npm install react`}
          </div>
        </motion.div>
      </div>
    )
  },
  {
    id: 5,
    title: "Node.js (Backend)",
    logo: "/logos/nodejs_logo_icon_168945.png",
    content: (
      <div className="grid-content" style={{ display: 'block' }}>
         <motion.div variants={itemVariants} className="info-card" style={{ marginBottom: '2rem' }}>
          <p>👉 Sirve para:</p>
          <ul style={{ paddingLeft: '2rem', marginTop: '1rem', listStyle: 'none' }}>
            <li style={{ marginBottom: '0.5rem' }}>🗄️ Manejar datos en el servidor</li>
            <li style={{ marginBottom: '0.5rem' }}>🔐 Procesar autenticación (login)</li>
            <li>🔗 Conectar con la base de datos</li>
          </ul>
        </motion.div>
        <motion.div variants={itemVariants} className="info-card">
          <h3>Ejemplo de servidor:</h3>
          <div className="code-block">
{`const http = require("http");

http.createServer((req, res) => {
  res.end("Hola desde servidor");
}).listen(3000);`}
          </div>
        </motion.div>
      </div>
    )
  },
  {
    id: 6,
    title: "HTMX",
    subtitle: "Modern HTML",
    logo: "/logos/1922aa91b23fc00bedfa4f485ea193f9.webp",
    content: (
      <div className="grid-content" style={{ display: 'block' }}>
        <motion.div variants={itemVariants} className="info-card" style={{ marginBottom: '2rem' }}>
          <p>👉 Sirve para darle poder interactivo a HTML sin escribir JavaScript complejo.</p>
          <ul style={{ paddingLeft: '2rem', marginTop: '1rem', listStyle: 'none' }}>
            <li style={{ marginBottom: '0.5rem' }}>🌐 Peticiones AJAX directo desde HTML</li>
            <li>🚀 Reduce la complejidad del Frontend</li>
          </ul>
        </motion.div>
        <motion.div variants={itemVariants} className="info-card">
          <h3>Ejemplo de HTMX:</h3>
          <div className="code-block">
{`<button hx-post="/clicked" hx-swap="outerHTML">
  Click Me
</button>`}
          </div>
        </motion.div>
      </div>
    )
  },
  {
    id: 7,
    title: "Ecosistema Tecnológico",
    subtitle: "Infraestructura y herramientas clave",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
    content: (
      <div className="grid-content" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
        <motion.div variants={itemVariants} className="info-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <img src="/logos/Docker_Logo.png" alt="Docker" style={{ height: '60px', marginBottom: '1rem' }} />
          <h3>Docker</h3>
          <p style={{ fontSize: '1.1rem' }}>Contenedores y despliegue rápido.</p>
        </motion.div>
        <motion.div variants={itemVariants} className="info-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <img src="/logos/New_Firebase_logo.svg.png" alt="Firebase" style={{ height: '60px', marginBottom: '1rem' }} />
          <h3>Firebase</h3>
          <p style={{ fontSize: '1.1rem' }}>Base de datos y servicios Backend-as-a-Service.</p>
        </motion.div>
        <motion.div variants={itemVariants} className="info-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <img src="/logos/N8n-logo-new.svg.png" alt="N8n" style={{ height: '60px', marginBottom: '1rem' }} />
          <h3>N8n</h3>
          <p style={{ fontSize: '1.1rem' }}>Automatización de flujos de trabajo e integraciones.</p>
        </motion.div>
        <motion.div variants={itemVariants} className="info-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <img src="/logos/Rocky_Linux_wordmark.svg.png" alt="Rocky Linux" style={{ height: '40px', marginBottom: '1rem' }} />
          <h3>Rocky Linux</h3>
          <p style={{ fontSize: '1.1rem' }}>Sistema operativo robusto para servidores.</p>
        </motion.div>
      </div>
    )
  },
  {
    id: 8,
    title: "Flujo Completo",
    subtitle: "Cómo se conecta todo",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/chrome/chrome-original.svg",
    content: (
      <div className="grid-content" style={{ gridTemplateColumns: '1fr' }}>
        <motion.div variants={itemVariants} className="info-card">
          <h3>🔗 Flujo Real:</h3>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem', listStyle: 'none' }}>
            <motion.li variants={itemVariants} style={{ background: 'rgba(212,163,115,0.15)', padding: '1rem', borderRadius: '8px' }}>1️⃣ Usuario entra a la web</motion.li>
            <motion.li variants={itemVariants} style={{ background: 'rgba(212,163,115,0.15)', padding: '1rem', borderRadius: '8px' }}>2️⃣ <b>React</b> muestra la interfaz</motion.li>
            <motion.li variants={itemVariants} style={{ background: 'rgba(212,163,115,0.15)', padding: '1rem', borderRadius: '8px' }}>3️⃣ Usuario hace click en un botón</motion.li>
            <motion.li variants={itemVariants} style={{ background: 'rgba(212,163,115,0.15)', padding: '1rem', borderRadius: '8px' }}>4️⃣ <b>React / JS</b> envía datos a <b>Node.js</b></motion.li>
            <motion.li variants={itemVariants} style={{ background: 'rgba(212,163,115,0.15)', padding: '1rem', borderRadius: '8px' }}>5️⃣ <b>Node.js</b> procesa y responde</motion.li>
            <motion.li variants={itemVariants} style={{ background: 'rgba(212,163,115,0.15)', padding: '1rem', borderRadius: '8px' }}>6️⃣ <b>React</b> actualiza la pantalla al instante</motion.li>
          </ul>
        </motion.div>
      </div>
    )
  }
];

export default function App() {
  const [[page, direction], setPage] = useState([0, 0]);

  const slideIndex = Math.max(0, Math.min(page, slidesData.length - 1));
  const currentSlide = slidesData[slideIndex];

  const paginate = (newDirection) => {
    const newPage = page + newDirection;
    if (newPage >= 0 && newPage < slidesData.length) {
      setPage([newPage, newDirection]);
    }
  };

  return (
    <div className="presentation-container">
      {/* Background Blobs */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      <div className="slide-container">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="slide"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="slide-content-wrapper"
            >
              <div className="slide-header">
                {currentSlide.logo ? (
                  <motion.img 
                    variants={itemVariants}
                    src={currentSlide.logo} 
                    alt="Logo" 
                    className="logo-image" 
                  />
                ) : (
                  <motion.div variants={itemVariants}>
                    {currentSlide.icon}
                  </motion.div>
                )}
                <div>
                  <motion.h2 variants={itemVariants} className="slide-title">
                    {currentSlide.title}
                  </motion.h2>
                  {currentSlide.subtitle && (
                    <motion.p variants={itemVariants} className="slide-content">
                      {currentSlide.subtitle}
                    </motion.p>
                  )}
                </div>
              </div>
              
              <div className="slide-content">
                {currentSlide.content}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="controls">
        <button 
          className="btn" 
          onClick={() => paginate(-1)} 
          disabled={page === 0}
        >
          <ChevronLeft /> Anterior
        </button>
        <button 
          className="btn" 
          onClick={() => paginate(1)} 
          disabled={page === slidesData.length - 1}
        >
          Siguiente <ChevronRight />
        </button>
      </div>

      <div className="progress-bar-container">
        <div 
          className="progress-bar" 
          style={{ width: `${((page + 1) / slidesData.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}

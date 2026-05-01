import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Atom, Rocket, Zap, Eye, Database, Lock, Link, Globe, Sparkles, CheckCircle2, Activity, Server, Monitor, HardDrive, Mail, Shield, Share2, Brain, Code, FileText, Layout } from 'lucide-react';
import './index.css';

const CodeTooltip = ({ children, tooltipText }) => {
  return (
    <span className="code-tooltip-container">
      <span className="code-tooltip-trigger">{children}</span>
      <span className="code-tooltip-popup">{tooltipText}</span>
    </span>
  );
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.25, delayChildren: 0.1 }
  },
  exit: { opacity: 0, x: -50, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } }
};

const itemVariants = {
  hidden: { opacity: 0, x: -40, scale: 0.95 },
  visible: { 
    opacity: 1, 
    x: 0, 
    scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '50vw' : '-50vw',
    opacity: 0,
    scale: 0.95
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, type: "spring", bounce: 0.15, damping: 20 }
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? '50vw' : '-50vw',
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  })
};

const N8nNode = ({ icon: Icon, title, description, color, x, y, delay }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, x: x - 50, y }}
      animate={{ opacity: 1, scale: 1, x, y }}
      transition={{ delay, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'absolute',
        cursor: 'pointer',
        zIndex: isHovered ? 10 : 1
      }}
    >
      <div className="n8n-node-main" style={{ 
        background: 'white', 
        padding: '0.8rem', 
        borderRadius: '12px', 
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        border: `2px solid ${color}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '50px',
        height: '50px'
      }}>
        <Icon size={24} color={color} />
      </div>
      <div style={{ 
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90px',
        textAlign: 'center', 
        marginTop: '0.4rem', 
        fontWeight: 700, 
        fontSize: '0.65rem', 
        color: '#444',
        lineHeight: 1.1
      }}>{title}</div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, rotateX: -90 }}
            animate={{ opacity: 1, y: -100, rotateX: 0 }}
            exit={{ opacity: 0, y: 10, rotateX: -90 }}
            transition={{ type: 'spring', damping: 15 }}
            style={{
              position: 'absolute',
              bottom: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'white',
              padding: '1rem',
              borderRadius: '12px',
              width: '200px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              border: `1px solid ${color}`,
              pointerEvents: 'none',
              transformOrigin: 'bottom center'
            }}
          >
            <h5 style={{ margin: 0, color: color, fontSize: '1rem', marginBottom: '0.5rem' }}>{title}</h5>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#666', lineHeight: 1.4 }}>{description}</p>
            <div style={{ 
              position: 'absolute', 
              top: '100%', 
              left: '50%', 
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderTop: `10px solid white`
            }} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const N8nWorkflow = () => {
  return (
    <div className="n8n-workflow-canvas responsive-diagram" style={{ 
      width: '100%', 
      height: '380px', 
      background: 'rgba(255,255,255,0.8)', 
      borderRadius: '20px', 
      position: 'relative',
      overflow: 'hidden',
      border: '1px dashed #ff6d5a',
      padding: '0',
      transformOrigin: 'top left'
    }}>
      <svg style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }}>
        <motion.path
          d="M 50 160 L 850 160 M 320 160 L 320 260 M 320 260 L 270 310 M 320 260 L 370 310"
          fill="none"
          stroke="#ff6d5a"
          strokeWidth="2"
          strokeDasharray="8,4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </svg>
      
      <N8nNode 
        x={30} y={135} 
        icon={Zap} 
        title="Webhook Trigger" 
        description="Punto de inicio: Recibe la petición con los datos del usuario."
        color="#ff6d5a"
        delay={0.1}
      />

      <N8nNode 
        x={120} y={135} 
        icon={Activity} 
        title="Calculate Nutrition" 
        description="Lógica JS: Calcula el requerimiento calórico y macros."
        color="#4a90e2"
        delay={0.2}
      />

      <N8nNode 
        x={220} y={135} 
        icon={Shield} 
        title="Filter Allergies" 
        description="Filtro: Elimina alimentos no permitidos según perfil."
        color="#f39c12"
        delay={0.3}
      />

      <N8nNode 
        x={320} y={135} 
        icon={Sparkles} 
        title="Generate Meal Plan" 
        description="Nodo Agente: Orquesta la creación del plan semanal."
        color="#9b59b6"
        delay={0.4}
      />

      {/* AI Sub-nodes */}
      <N8nNode 
        x={250} y={285} 
        icon={Brain} 
        title="OpenAI Model" 
        description="IA: Procesa el prompt y crea recetas creativas."
        color="#10a37f"
        delay={0.5}
      />
      <N8nNode 
        x={390} y={285} 
        icon={Database} 
        title="Output Parser" 
        description="Estructurador: Convierte respuesta en JSON."
        color="#2ecc71"
        delay={0.6}
      />

      <N8nNode 
        x={450} y={135} 
        icon={Code} 
        title="JS Post-Process" 
        description="Formateo: Limpia y prepara los datos finales."
        color="#f1c40f"
        delay={0.7}
      />

      <N8nNode 
        x={550} y={135} 
        icon={Layout} 
        title="HTML Report" 
        description="Diseño: Genera la plantilla visual con estilos CSS."
        color="#e67e22"
        delay={0.8}
      />

      <N8nNode 
        x={650} y={135} 
        icon={FileText} 
        title="HTML to PDF" 
        description="Conversión: Transforma el reporte en un PDF."
        color="#e74c3c"
        delay={0.9}
      />

      <N8nNode 
        x={750} y={135} 
        icon={Mail} 
        title="Send Email" 
        description="Entrega: Envía el PDF adjunto al correo."
        color="#d44638"
        delay={1.0}
      />

      <N8nNode 
        x={850} y={135} 
        icon={CheckCircle2} 
        title="Respond" 
        description="Cierre: Envía confirmación al frontend."
        color="#27ae60"
        delay={1.1}
      />

      <div style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize: '0.7rem', color: '#ff6d5a', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
        Workflow n8n: Automatización IA
      </div>
    </div>
  );
};

const ServerArchitecture = () => {
  const [step, setStep] = useState(0);
  const flowSteps = [
    { id: 1, label: "Usuario accede al Frontend", from: { x: 50, y: 350 }, to: { x: 220, y: 150 } },
    { id: 2, label: "Frontend envía POST al Backend", from: { x: 300, y: 150 }, to: { x: 300, y: 250 } },
    { id: 3, label: "Backend guarda en Firebase", from: { x: 380, y: 250 }, to: { x: 600, y: 150 } },
    { id: 4, label: "Backend dispara Webhook a n8n", from: { x: 380, y: 250 }, to: { x: 600, y: 350 } },
    { id: 5, label: "n8n envía PDF/Email al Usuario", from: { x: 680, y: 350 }, to: { x: 50, y: 350 } }
  ];

  const simulateFlow = () => {
    let current = 1;
    const interval = setInterval(() => {
      setStep(current);
      if (current === flowSteps.length) {
        clearInterval(interval);
        setTimeout(() => setStep(0), 2000);
      }
      current++;
    }, 1500);
  };

  return (
    <div className="architecture-canvas responsive-diagram" style={{ 
      width: '100%', 
      height: '380px', 
      background: '#f8f9fa', 
      borderRadius: '24px', 
      position: 'relative',
      overflow: 'hidden',
      border: '2px solid #10b981',
      padding: '1rem',
      transformOrigin: 'top left'
    }}>
      {/* Infrastructure Layers */}
      <div className="layer vm-layer" style={{ position: 'absolute', top: '10%', left: '15%', width: '40%', height: '80%', border: '2px dashed #10b981', borderRadius: '20px', padding: '1rem', background: 'rgba(16, 185, 129, 0.05)' }}>
        <div style={{ position: 'absolute', top: '-12px', left: '20px', background: 'white', padding: '0 10px', color: '#10b981', fontWeight: 800, fontSize: '0.8rem' }}>MÁQUINA VIRTUAL (ROCKY LINUX)</div>
        
        <div className="layer docker-layer" style={{ width: '100%', height: '100%', border: '2px solid #2496ed', borderRadius: '15px', padding: '1rem', position: 'relative', background: 'rgba(36, 150, 237, 0.05)' }}>
          <div style={{ position: 'absolute', top: '-12px', left: '20px', background: 'white', padding: '0 10px', color: '#2496ed', fontWeight: 800, fontSize: '0.8rem' }}>DOCKER NETWORK</div>
          
          {/* Containers */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', height: '100%', justifyContent: 'center' }}>
            <motion.div animate={{ scale: step === 1 || step === 2 ? 1.05 : 1 }} className="container-box" style={{ background: 'white', border: '2px solid #2496ed', borderRadius: '10px', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
              <div style={{ background: '#2496ed', padding: '8px', borderRadius: '8px' }}><Monitor size={20} color="white" /></div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>Frontend</div>
                <div style={{ fontSize: '0.7rem', color: '#666' }}>React Container</div>
              </div>
            </motion.div>

            <motion.div animate={{ scale: step === 2 || step === 3 || step === 4 ? 1.05 : 1 }} className="container-box" style={{ background: 'white', border: '2px solid #2496ed', borderRadius: '10px', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
              <div style={{ background: '#2496ed', padding: '8px', borderRadius: '8px' }}><Server size={20} color="white" /></div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>Backend</div>
                <div style={{ fontSize: '0.7rem', color: '#666' }}>Node.js Container</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* External Services */}
      <motion.div animate={{ scale: step === 3 ? 1.1 : 1 }} style={{ position: 'absolute', top: '5%', right: '10%', width: '160px', background: 'white', border: '2px solid #ffca28', borderRadius: '15px', padding: '0.8rem', textAlign: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
        <Database size={24} color="#ffca28" style={{ marginBottom: '0.3rem' }} />
        <div style={{ fontWeight: 800, fontSize: '0.8rem' }}>Firebase</div>
        <div style={{ fontSize: '0.65rem', color: '#666' }}>Cloud Firestore</div>
      </motion.div>

      <motion.div animate={{ scale: step === 4 || step === 5 ? 1.1 : 1 }} style={{ position: 'absolute', bottom: '5%', right: '10%', width: '160px', background: 'white', border: '2px solid #ff6d5a', borderRadius: '15px', padding: '0.8rem', textAlign: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
        <Zap size={24} color="#ff6d5a" style={{ marginBottom: '0.3rem' }} />
        <div style={{ fontWeight: 800, fontSize: '0.8rem' }}>n8n</div>
        <div style={{ fontSize: '0.65rem', color: '#666' }}>Automations & PDF</div>
      </motion.div>

      {/* User */}
      <div style={{ position: 'absolute', bottom: '20%', left: '2%', textAlign: 'center' }}>
        <div style={{ background: '#5A5650', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyCenter: 'center', marginBottom: '0.5rem', margin: '0 auto' }}>
          <Monitor size={30} color="white" style={{ margin: 'auto' }} />
        </div>
        <div style={{ fontWeight: 800, fontSize: '0.8rem' }}>USUARIO</div>
        <div style={{ fontSize: '0.6rem', color: '#888' }}>Navegador Web</div>
      </div>

      {/* Flow Animation */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#8B7355" />
          </marker>
        </defs>
        {/* Connection Lines */}
        <line x1="250" y1="180" x2="250" y2="230" stroke="#8B7355" strokeWidth="2" strokeDasharray="4" />
        <path d="M 380 280 Q 500 280 580 180" fill="none" stroke="#8B7355" strokeWidth="2" strokeDasharray="4" />
        <path d="M 380 320 Q 500 320 580 380" fill="none" stroke="#8B7355" strokeWidth="2" strokeDasharray="4" />
        
        {/* Animated Dot */}
        {step > 0 && (
          <motion.circle
            key={step}
            cx={flowSteps[step-1].from.x}
            cy={flowSteps[step-1].from.y}
            r="6"
            fill="#10b981"
            initial={{ cx: flowSteps[step-1].from.x, cy: flowSteps[step-1].from.y, opacity: 0 }}
            animate={{ cx: flowSteps[step-1].to.x, cy: flowSteps[step-1].to.y, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        )}
      </svg>

      {/* Status Overlay */}
      <AnimatePresence>
        {step > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', background: 'white', padding: '0.8rem 2rem', borderRadius: '50px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', border: '1px solid #10b981', zIndex: 100 }}
          >
            <span style={{ fontWeight: 800, color: '#10b981', marginRight: '10px' }}>PASO {step}:</span>
            <span style={{ color: '#5A5650' }}>{flowSteps[step-1].label}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <button onClick={simulateFlow} className="back-btn" style={{ position: 'absolute', bottom: '1rem', right: '1rem', background: '#10b981', color: 'white', border: 'none', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)' }}>
        <Rocket size={16} /> Simular Flujo
      </button>
    </div>
  );
};

const ECOSYSTEM_DATA = {  nodejs: {
    title: "Node.js",
    category: "⚛️ Frameworks y Entorno de Ejecución",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    color: "#339933",
    details: [
      { 
        title: "¿Qué es Node.js?", 
        text: "Es un entorno de ejecución de JavaScript orientado a eventos, construido con el motor V8 de Chrome. Permite ejecutar JavaScript fuera del navegador, específicamente en el servidor." 
      },
      { 
        title: "¿Para qué sirve?", 
        text: "Se utiliza para construir aplicaciones de red rápidas y escalables. Es ideal para aplicaciones en tiempo real como chats, servidores de API, herramientas de streaming y microservicios." 
      },
      { 
        title: "¿De qué sirve?", 
        text: "Permite usar un único lenguaje (JavaScript) tanto en el cliente como en el servidor. Su modelo de E/S no bloqueante lo hace extremadamente eficiente para manejar múltiples conexiones simultáneas con poco consumo de recursos." 
      },
      { 
        title: "Ejemplos de código:", 
        text: "Aquí tienes un ejemplo básico de cómo crear un servidor web con Express:",
        code: "const express = require('express');\nconst app = express();\n\napp.get('/', (req, res) => {\n  res.send('Servidor activo');\n});\n\napp.listen(3000, () => {\n  console.log('Puerto 3000');\n});"
      }
    ]
  },
  react: {
    title: "React",
    category: "⚛️ Frameworks y Entorno de Ejecución",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    color: "#61dafb",
    details: [
      { 
        title: "¿Qué es React?", 
        text: "Es una biblioteca de JavaScript creada por Meta para construir interfaces de usuario (UI). Se basa en componentes, lo que permite crear piezas de interfaz reutilizables e independientes que manejan su propio estado." 
      },
      { 
        title: "¿Para qué sirve?", 
        text: "Sirve para crear aplicaciones web dinámicas y de alto rendimiento (SPAs). Su principal función es actualizar de forma eficiente solo las partes de la página que cambian, gracias a su sistema de Virtual DOM." 
      },
      { 
        title: "¿De qué sirve?", 
        text: "Ofrece un desarrollo más rápido, mantenible y escalable. Facilita la creación de aplicaciones complejas al dividir la interfaz en pequeñas partes lógicas, mejorando enormemente la experiencia tanto del desarrollador como del usuario final." 
      },
      { 
        title: "Ejemplos de código:", 
        text: "Aquí puedes ver cómo se define un componente simple con estado en React:",
        code: "function Contador() {\n  const [clicks, setClicks] = useState(0);\n\n  return (\n    <button onClick={() => setClicks(clicks + 1)}>\n      Has hecho {clicks} clicks\n    </button>\n  );\n}"
      }
    ]
  },
  firebase: {
    title: "Firebase",
    category: "🔥 Backend y Despliegue",
    logo: "/logos/New_Firebase_logo.svg.png",
    color: "#ffca28",
    details: [
      { 
        title: "Backend as a Service", 
        text: "Es una plataforma de desarrollo de Google (BaaS). Provee herramientas integradas como bases de datos en tiempo real, autenticación, hosting y análisis.",
        image: "/images/Captura1firebase.png"
      },
      { 
        title: "Estructura de Documentos", 
        text: "Detalle de los campos de datos (string, number, boolean). Permite una estructura flexible que evoluciona con el desarrollo de la aplicación.",
        image: "/images/Captura2Firebase.png"
      },
      { 
        title: "Consola de Gestión", 
        text: "Interfaz administrativa para monitorear el estado de la base de datos y realizar cambios manuales de forma segura en tiempo real.",
        image: "/images/Captura3Firebase.png"
      }
    ]
  },
  docker: {
    title: "Docker",
    category: "🐳 Infraestructura y Conectividad",
    logo: "/logos/Docker_Logo.png",
    color: "#2496ed",
    details: [{ title: "Contenerización", text: "Es una plataforma de contenerización que empaqueta aplicaciones y sus dependencias en 'contenedores' aislados. Esto garantiza que el software se ejecute de manera idéntica en cualquier entorno, eliminando el clásico problema de 'en mi máquina sí funciona'." }]
  },
  rocky: {
    title: "Rocky Linux",
    category: "🔥 Backend y Despliegue",
    logo: "/logos/Rocky_Linux_wordmark.svg.png",
    color: "#10b981",
    details: [{ title: "Sistema Operativo", text: "Es una distribución de Linux empresarial, de código abierto y gratuita, diseñada para ser 100% compatible con Red Hat Enterprise Linux (RHEL). Es el sucesor espiritual de CentOS, ideal para servidores que requieren máxima estabilidad y seguridad." }]
  },
  n8n: {
    title: "n8n",
    category: "🐳 Infraestructura y Conectividad",
    logo: "/logos/N8n-logo-new.svg.png",
    color: "#ff6d5a",
    isWorkflow: true,
    details: [{ 
      title: "Automatización de Dieta con IA", 
      text: "Este flujo avanzado conecta el frontend con OpenAI. Procesa los requerimientos nutricionales calculados, genera un plan de comidas personalizado mediante IA, lo convierte en un reporte HTML/PDF profesional y lo entrega automáticamente por email." 
    }]
  }
};

function EcosystemGrid({ onSelect, onBack }) {
  const [selected, setSelected] = useState(null);
  const [currentSubSlide, setCurrentSubSlide] = useState(0);

  const handleSelect = (key) => {
    setSelected(key);
    onSelect(ECOSYSTEM_DATA[key]);
  };

  const handleBack = () => {
    setSelected(null);
    setCurrentSubSlide(0);
    onBack();
  };

  if (selected) {
    const item = ECOSYSTEM_DATA[selected];
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="expanded-ecosystem"
      >
        <div className="expanded-header" style={{ justifyContent: 'flex-end', border: 'none' }}>
          <button className="back-btn" onClick={handleBack}>
             <ChevronLeft size={18} /> Volver a cuadros
          </button>
        </div>

        <div className="sub-slides-container">
          <AnimatePresence mode="wait">
            {item.isWorkflow ? (
              <motion.div
                key="workflow"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                style={{ width: '100%', maxWidth: '900px' }}
              >
                <N8nWorkflow />
              </motion.div>
            ) : item.isArchitecture ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                <motion.div
                  key="arch"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ width: '100%' }}
                >
                  <ServerArchitecture />
                </motion.div>
                <div className="sub-controls" style={{ marginTop: '0.5rem' }}>
                  <button 
                    className="sub-btn" 
                    onClick={() => setCurrentSubSlide(prev => Math.max(0, prev - 1))}
                    disabled={currentSubSlide === 0}
                  >
                    <ChevronLeft />
                  </button>
                  <div className="sub-dots">
                    {item.details.map((_, i) => (
                      <div key={i} className={`dot ${i === currentSubSlide ? 'active' : ''}`} style={{ backgroundColor: i === currentSubSlide ? item.color : '#ccc' }} />
                    ))}
                  </div>
                  <button 
                    className="sub-btn" 
                    onClick={() => setCurrentSubSlide(prev => Math.min(item.details.length - 1, prev + 1))}
                    disabled={currentSubSlide === item.details.length - 1}
                  >
                    <ChevronRight />
                  </button>
                </div>
                <div className="sub-slide-card" style={{ borderLeft: `6px solid ${item.color}`, minHeight: 'auto', padding: '1.5rem', marginTop: '0.5rem' }}>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{item.details[currentSubSlide].title}</h4>
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.5 }}>{item.details[currentSubSlide].text}</p>
                </div>
              </div>
            ) : (
              <motion.div
                key={currentSubSlide}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                className="sub-slide-card"
                style={{ borderLeft: `6px solid ${item.color}` }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                  {item.details[currentSubSlide].image && (
                    <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(139, 115, 85, 0.1)', background: '#fff' }}>
                      <img src={item.details[currentSubSlide].image} style={{ width: '100%', maxHeight: '400px', objectFit: 'contain', display: 'block' }} alt="Detail"/>
                    </div>
                  )}
                  <h4>{item.details[currentSubSlide].title}</h4>
                  <p>{item.details[currentSubSlide].text}</p>
                  {item.details[currentSubSlide].code && (
                    <div className="code-block" style={{ marginTop: '1rem', fontSize: '0.85rem', background: '#2C2A29', color: '#61dafb', border: '1px solid #61dafb' }}>
                      <pre style={{ margin: 0 }}>{item.details[currentSubSlide].code}</pre>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        {/* Navigation Controls: Side arrows for Desktop, Bottom controls for Mobile */}
        {!item.isWorkflow && !item.isArchitecture && item.details.length > 1 && (
          <>
            {/* Desktop Side Arrows */}
            <button 
              className="sub-btn side-nav-btn left" 
              onClick={() => setCurrentSubSlide(prev => Math.max(0, prev - 1))}
              disabled={currentSubSlide === 0}
              style={{ position: 'absolute', left: '-60px', top: '50%', transform: 'translateY(-50%)' }}
            >
              <ChevronLeft />
            </button>
            <button 
              className="sub-btn side-nav-btn right" 
              onClick={() => setCurrentSubSlide(prev => Math.min(item.details.length - 1, prev + 1))}
              disabled={currentSubSlide === item.details.length - 1}
              style={{ position: 'absolute', right: '-60px', top: '50%', transform: 'translateY(-50%)' }}
            >
              <ChevronRight />
            </button>

            {/* Mobile/Small Screen Controls */}
            <div className="mobile-sub-controls" style={{ display: 'none', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
              <button 
                className="sub-btn" 
                onClick={() => setCurrentSubSlide(prev => Math.max(0, prev - 1))}
                disabled={currentSubSlide === 0}
              >
                <ChevronLeft />
              </button>
              <div className="sub-dots" style={{ margin: 0 }}>
                {item.details.map((_, i) => (
                  <div key={i} className={`dot ${i === currentSubSlide ? 'active' : ''}`} style={{ backgroundColor: i === currentSubSlide ? item.color : '#ccc' }} />
                ))}
              </div>
              <button 
                className="sub-btn" 
                onClick={() => setCurrentSubSlide(prev => Math.min(item.details.length - 1, prev + 1))}
                disabled={currentSubSlide === item.details.length - 1}
              >
                <ChevronRight />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Desktop Dots at the bottom */}
      {!item.isWorkflow && !item.isArchitecture && item.details.length > 1 && (
        <div className="sub-dots desktop-dots" style={{ justifyContent: 'center', marginTop: '2rem' }}>
          {item.details.map((_, i) => (
            <div key={i} className={`dot ${i === currentSubSlide ? 'active' : ''}`} style={{ backgroundColor: i === currentSubSlide ? item.color : '#ccc' }} />
          ))}
        </div>
      )}
      </motion.div>
    );
  }

  return (
    <div className="grid-content" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
      {Object.entries(ECOSYSTEM_DATA).map(([key, item]) => (
        <motion.div 
          key={key}
          variants={itemVariants}
          className="info-card interactive-card"
          onClick={() => handleSelect(key)}
          whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
          whileTap={{ scale: 0.98 }}
          style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '1.5rem' }}
        >
          <div style={{ fontSize: '0.7rem', color: item.color, fontWeight: 800, marginBottom: '0.5rem', opacity: 0.8 }}>{item.category.toUpperCase()}</div>
          <img src={item.logo} alt={item.title} style={{ height: '45px', marginBottom: '0.8rem', objectFit: 'contain' }} />
          <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{item.title}</h3>
          <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.4rem' }}>Click para definición</p>
        </motion.div>
      ))}
    </div>
  );
}

const slidesData = [
  {
    id: 0,
    title: "",
    subtitle: "",
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: '100%', justifyContent: 'center' }}>
        <h2 style={{ fontSize: '4.5rem', fontWeight: 800, marginBottom: '2rem', background: 'linear-gradient(to right, #8B7355, #D4A373)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.2 }}>
          Presentamos:
        </h2>
        <div className="carousel-container">
          <div className="carousel-track">
            {[
              { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
              { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
              { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg" },
              { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
              { name: "Rocky Linux", icon: "/logos/Rocky_Linux_wordmark.svg" },
              { name: "n8n", icon: "/logos/N8n-logo-new.svg.png" }
            ].concat([
              { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
              { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
              { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg" },
              { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
              { name: "Rocky Linux", icon: "/logos/Rocky_Linux_wordmark.svg" },
              { name: "n8n", icon: "/logos/N8n-logo-new.svg.png" }
            ]).map((tech, index) => (
              <div key={index} className="carousel-item">
                <img src={tech.icon} className="carousel-icon" alt={tech.name}/> {tech.name}
              </div>
            ))}
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
    title: "Fundamentos Web",
    subtitle: "Lenguajes Esenciales",
    content: (
      <div className="grid-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          <motion.div variants={itemVariants} className="info-card" style={{ padding: '1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" style={{ height: '40px', marginBottom: '1rem' }} alt="HTML5"/>
            <h4 style={{ color: '#e34f26', fontSize: '1.2rem', marginBottom: '0.5rem' }}>HTML</h4>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.5, color: '#666' }}>Estructura y significado del contenido mediante etiquetas.</p>
          </motion.div>
          <motion.div variants={itemVariants} className="info-card" style={{ padding: '1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" style={{ height: '40px', marginBottom: '1rem' }} alt="CSS3"/>
            <h4 style={{ color: '#1572b6', fontSize: '1.2rem', marginBottom: '0.5rem' }}>CSS</h4>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.5, color: '#666' }}>Diseño, colores y animaciones para la capa visual.</p>
          </motion.div>
          <motion.div variants={itemVariants} className="info-card" style={{ padding: '1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" style={{ height: '40px', marginBottom: '1rem' }} alt="JS"/>
            <h4 style={{ color: '#f7df1e', fontSize: '1.2rem', marginBottom: '0.5rem' }}>JavaScript</h4>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.5, color: '#666' }}>Interactividad y lógica dinámica en el cliente.</p>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="info-card" style={{ marginTop: '0.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Código Interactivo (pasa el cursor):</h3>
          <div className="code-block" style={{ fontSize: '1rem', lineHeight: 1.6 }}>
            {/* HTML Part */}
            <div style={{ color: '#888', fontStyle: 'italic', marginBottom: '4px' }}>// index.html</div>
            <div style={{ paddingLeft: '1rem' }}>
              {'<'}
              <CodeTooltip tooltipText="Etiqueta de apertura">div</CodeTooltip> 
              {' '}
              <CodeTooltip tooltipText="Atributo de clase">class</CodeTooltip>="container"{'>'}
            </div>
            <div style={{ paddingLeft: '2rem' }}>
              {'<'}
              <CodeTooltip tooltipText="Etiqueta de encabezado">h1</CodeTooltip>
              {'>'}Hola Mundo{'</'}
              <CodeTooltip tooltipText="Etiqueta de cierre">h1</CodeTooltip>
              {'>'}
            </div>
            <div style={{ paddingLeft: '1rem', marginBottom: '1rem' }}>{'</div>'}</div>

            {/* CSS Part */}
            <div style={{ color: '#888', fontStyle: 'italic', marginBottom: '4px' }}>// styles.css</div>
            <div style={{ paddingLeft: '1rem' }}>
              <CodeTooltip tooltipText="Selector de clase">.container</CodeTooltip> {' { '}
            </div>
            <div style={{ paddingLeft: '2rem' }}>
              <CodeTooltip tooltipText="Propiedad CSS">background</CodeTooltip>: #fff;
            </div>
            <div style={{ paddingLeft: '1rem', marginBottom: '1rem' }}>{'}'}</div>

            {/* TS Part */}
            <div style={{ color: '#888', fontStyle: 'italic', marginBottom: '4px' }}>// script.js</div>
            <div style={{ paddingLeft: '1rem' }}>
              const <CodeTooltip tooltipText="Nombre de variable">user</CodeTooltip> = "Agustin";
            </div>
          </div>
        </motion.div>
      </div>
    )
  },
  {
    id: 2,
    title: "Tecnologías de Soporte",
    subtitle: "Herramientas de Desarrollo",
    content: (
      <div className="grid-content" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', width: '100%', maxWidth: '900px', margin: '0 auto' }}>
        <motion.div variants={itemVariants} className="info-card" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ flex: 1 }}>
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" style={{ height: '50px', marginBottom: '1rem' }} alt="Vite"/>
            <h4 style={{ fontSize: '1.4rem' }}>Vite</h4>
            <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1rem' }}>
              <strong>Propósito:</strong> Acelerar el desarrollo eliminando tiempos de espera en compilación.
            </p>
          </div>
          <div className="code-block" style={{ fontSize: '0.75rem', padding: '0.8rem', textAlign: 'left', background: '#2c2a29', color: '#fff' }}>
            <span style={{ color: '#888' }}># Crear proyecto</span>
            <br />npm create vite@latest
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="info-card" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ flex: 1 }}>
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg" style={{ height: '50px', marginBottom: '1rem' }} alt="npm"/>
            <h4 style={{ fontSize: '1.4rem' }}>npm</h4>
            <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1rem' }}>
              <strong>Propósito:</strong> Instalar y gestionar todas las librerías necesarias para que la app funcione.
            </p>
          </div>
          <div className="code-block" style={{ fontSize: '0.75rem', padding: '0.8rem', textAlign: 'left', background: '#2c2a29', color: '#fff' }}>
            <span style={{ color: '#888' }}># Instalar dependencia</span>
            <br />npm install {"<nombre>"}
          </div>
        </motion.div>
      </div>
    )
  },
  {
    id: 3,
    title: "Ecosistema Tecnológico",
    subtitle: "Click en un cuadro para profundizar",
    content: (props) => <EcosystemGrid {...props} />
  }
];

export default function App() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [selectedEcoItem, setSelectedEcoItem] = useState(null);
  
  const slideIndex = Math.max(0, Math.min(page, slidesData.length - 1));
  const currentSlide = slidesData[slideIndex];

  // Reset selected eco item when changing slides
  const paginate = (newDirection) => {
    const newPage = page + newDirection;
    if (newPage >= 0 && newPage < slidesData.length) {
      setPage([newPage, newDirection]);
      setSelectedEcoItem(null);
    }
  };

  const displayTitle = selectedEcoItem ? selectedEcoItem.title : currentSlide.title;
  const displayLogo = selectedEcoItem ? selectedEcoItem.logo : currentSlide.logo;
  const displaySubtitle = selectedEcoItem ? "" : currentSlide.subtitle;

  return (
    <div className="presentation-container">
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
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="slide-content-wrapper">
              <div className="slide-header">
                {displayLogo ? (
                  <motion.img key={displayLogo} variants={itemVariants} src={displayLogo} alt="Logo" className="logo-image" />
                ) : (
                  currentSlide.icon && <motion.div variants={itemVariants}>{currentSlide.icon}</motion.div>
                )}
                <div>
                  <motion.h2 key={displayTitle} variants={itemVariants} className="slide-title">{displayTitle}</motion.h2>
                  {displaySubtitle && <motion.p variants={itemVariants} className="slide-content">{displaySubtitle}</motion.p>}
                </div>
              </div>
              <div className="slide-content">
                {typeof currentSlide.content === 'function' 
                  ? currentSlide.content({ onSelect: setSelectedEcoItem, onBack: () => setSelectedEcoItem(null) }) 
                  : currentSlide.content}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="nav-controls">
        <div 
          className={`nav-zone nav-left ${page === 0 ? 'disabled' : ''}`} 
          onClick={() => paginate(-1)}
        >
          <div className="nav-hint">
            <ChevronLeft size={48} />
          </div>
        </div>
        <div 
          className={`nav-zone nav-right ${page === slidesData.length - 1 ? 'disabled' : ''}`} 
          onClick={() => paginate(1)}
        >
          <div className="nav-hint">
            <ChevronRight size={48} />
          </div>
        </div>
      </div>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${((page + 1) / slidesData.length) * 100}%` }}></div>
      </div>
    </div>
  );
}

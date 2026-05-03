import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Atom, Rocket, Zap, Eye, Database, Lock, Link, Globe, Sparkles, CheckCircle2, Activity, Server, Monitor, HardDrive, Mail, Shield, Share2, Brain, Code, FileText, Layout, RefreshCcw, Search, ZoomIn, MousePointer2, PenTool, Eraser, Wand2, Trash2, Cpu, Box, Layers } from 'lucide-react';
import './index.css';

const PresentationTools = ({ isVisible }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTool, setActiveTool] = useState(null); // 'laser', 'brush'
  const [zoomLevel, setZoomLevel] = useState(1);
  const [laserPos, setLaserPos] = useState({ x: 0, y: 0 });
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);

  // Reset tools when visibility changes
  useEffect(() => {
    if (!isVisible) {
      setActiveTool(null);
      setZoomLevel(1);
      clearCanvas();
      setIsExpanded(false);
    }
  }, [isVisible, setActiveTool, setZoomLevel]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleWheel = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
        setZoomLevel(prev => {
          const newZoom = Math.min(Math.max(1, prev + (e.deltaY < 0 ? 0.1 : -0.1)), 3);
          return parseFloat(newZoom.toFixed(1));
        });
      }
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  useEffect(() => {
    if (activeTool !== 'laser') return;
    const handleMouseMove = (e) => setLaserPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [activeTool]);

  const startDrawing = (e) => {
    if (activeTool !== 'brush') return;
    setIsDrawing(true);
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
  };

  const draw = (e) => {
    if (!isDrawing || activeTool !== 'brush') return;
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(e.clientX, e.clientY);
    ctx.strokeStyle = '#ff6d5a';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  };

  if (!isVisible) return null;

  return (
    <>
      <motion.div 
        className="presentation-toolbar" 
        animate={{ width: isExpanded ? 'auto' : '160px' }}
        style={{
          position: 'fixed',
          bottom: '2.5rem',
          left: '2.5rem',
          zIndex: 5000,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: 'rgba(15, 15, 15, 0.95)',
          backdropFilter: 'blur(20px)',
          padding: '10px 18px',
          borderRadius: '100px',
          border: '1px solid rgba(255,255,255,0.15)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
          color: 'white',
          cursor: 'pointer',
          overflow: 'hidden',
          whiteSpace: 'nowrap'
        }}
        onClick={() => !isExpanded && setIsExpanded(true)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={(e) => { if(isExpanded) { e.stopPropagation(); setIsExpanded(false); } }}>
          <Wand2 size={16} color="#ff6d5a" />
          <span style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8 }}>
            {isExpanded ? 'Cerrar' : 'Herramientas'}
          </span>
        </div>
        
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)' }} />

            <button 
              onClick={(e) => { e.stopPropagation(); setActiveTool(activeTool === 'laser' ? null : 'laser'); }}
              style={{ 
                background: activeTool === 'laser' ? '#ff6d5a' : 'rgba(255,255,255,0.05)', 
                border: 'none', color: 'white', padding: '10px', borderRadius: '50%', cursor: 'pointer', transition: 'all 0.3s' 
              }}
              title="Puntero Láser"
            >
              <MousePointer2 size={18} />
            </button>

            <button 
              onClick={(e) => { e.stopPropagation(); setActiveTool(activeTool === 'brush' ? null : 'brush'); }}
              style={{ 
                background: activeTool === 'brush' ? '#ff6d5a' : 'rgba(255,255,255,0.05)', 
                border: 'none', color: 'white', padding: '10px', borderRadius: '50%', cursor: 'pointer', transition: 'all 0.3s' 
              }}
              title="Pincel para dibujar"
            >
              <PenTool size={18} />
            </button>

            {activeTool === 'brush' && (
              <button 
                onClick={(e) => { e.stopPropagation(); clearCanvas(); }}
                style={{ background: 'rgba(255,109,90,0.1)', border: 'none', color: '#ff6d5a', padding: '10px', borderRadius: '50%', cursor: 'pointer' }}
                title="Borrar anotaciones"
              >
                <Eraser size={18} />
              </button>
            )}

            <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.75rem', fontWeight: 600 }}>
              <ZoomIn size={16} />
              <span>{Math.round(zoomLevel * 100)}%</span>
            </div>

            {zoomLevel > 1 && (
              <button onClick={(e) => { e.stopPropagation(); setZoomLevel(1); }} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '5px 12px', borderRadius: '50px', fontSize: '0.65rem', cursor: 'pointer' }}>
                Reset
              </button>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Global Zoom Effect */}
      <style>{`
        .slide-container { 
          transform: scale(${zoomLevel}); 
          transform-origin: center center;
          transition: transform 0.1s ease-out; 
        }
        body { overflow: hidden; cursor: ${activeTool === 'laser' ? 'none' : 'auto'}; }
      `}</style>

      {/* Laser Pointer */}
      <AnimatePresence>
        {activeTool === 'laser' && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, x: laserPos.x - 10, y: laserPos.y - 10 }}
            exit={{ opacity: 0, scale: 0 }}
            style={{
              position: 'fixed',
              width: '24px',
              height: '24px',
              background: 'radial-gradient(circle, rgba(255,109,90,1) 0%, rgba(255,109,90,0.4) 50%, rgba(255,109,90,0) 80%)',
              borderRadius: '50%',
              boxShadow: '0 0 20px #ff6d5a, 0 0 40px #ff6d5a',
              pointerEvents: 'none',
              zIndex: 6000
            }}
          >
             <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1 }}
              style={{ width: '100%', height: '100%', borderRadius: '50%', border: '2px solid #ff6d5a' }}
             />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Canvas Overlay */}
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={() => setIsDrawing(false)}
        onMouseOut={() => setIsDrawing(false)}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: activeTool === 'brush' ? 4000 : -1,
          pointerEvents: activeTool === 'brush' ? 'all' : 'none',
          cursor: activeTool === 'brush' ? 'crosshair' : 'default'
        }}
      />
    </>
  );
};

const ZoomableImage = ({ src, alt }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div 
      className="zoom-container"
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        width: '100%',
        height: '350px',
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'zoom-in',
        backgroundColor: '#fff',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        border: '1px solid rgba(0,0,0,0.05)'
      }}
    >
      <motion.img
        src={src}
        alt={alt}
        animate={{ 
          scale: isZoomed ? 2 : 1,
          transformOrigin: `${mousePos.x}% ${mousePos.y}%`
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain'
        }}
      />
      {!isZoomed && (
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: 'rgba(255,255,255,0.8)',
          padding: '8px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          pointerEvents: 'none'
        }}>
          <Search size={20} color="#8B7355" />
        </div>
      )}
    </div>
  );
};

const CodeTooltip = ({ children, tooltipText }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <span 
      className="code-tooltip-container"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
      }}
    >
      <span className="code-tooltip-trigger">{children}</span>
      <AnimatePresence>
        {isOpen && (
          <motion.span 
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="code-tooltip-popup"
          >
            {tooltipText}
          </motion.span>
        )}
      </AnimatePresence>
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




const N8nNode = ({ icon: Icon, title, description, color, x, y, delay, characteristics = [] }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        zIndex: isHovered ? 100 : 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '60px'
      }}
    >
      <motion.div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.1, y: -2 }}
        style={{ 
          background: '#1a1a1a', 
          padding: '10px', 
          borderRadius: '12px', 
          border: `2px solid ${isHovered ? color : '#333'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '48px',
          height: '48px',
          boxShadow: isHovered ? `0 0 20px ${color}44` : '0 4px 10px rgba(0,0,0,0.3)',
          transition: 'border-color 0.2s ease',
          cursor: 'pointer',
          position: 'relative'
        }}
      >
        <motion.div
          animate={{ 
            y: [0, -4, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay * 0.5
          }}
        >
          <Icon size={24} color={color} />
        </motion.div>
        
        {/* Connection points */}
        <div style={{ position: 'absolute', left: '-4px', top: '50%', transform: 'translateY(-50%)', width: '6px', height: '6px', borderRadius: '50%', background: '#444', border: '1px solid #666' }} />
        <div style={{ position: 'absolute', right: '-4px', top: '50%', transform: 'translateY(-50%)', width: '6px', height: '6px', borderRadius: '50%', background: '#444', border: '1px solid #666' }} />
      </motion.div>
      
      <div style={{ 
        textAlign: 'center', 
        marginTop: '6px', 
        fontWeight: 700, 
        fontSize: '0.6rem', 
        color: isHovered ? color : '#bbb',
        width: '80px',
        lineHeight: 1.1,
        transition: 'color 0.2s ease',
        pointerEvents: 'none'
      }}>{title}</div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            style={{
              position: 'absolute',
              bottom: '65px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(25, 25, 25, 0.98)',
              backdropFilter: 'blur(10px)',
              padding: '12px',
              borderRadius: '14px',
              width: '200px',
              boxShadow: '0 15px 40px rgba(0,0,0,0.6)',
              border: `1px solid ${color}`,
              pointerEvents: 'none',
              zIndex: 300,
              textAlign: 'left'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div style={{ background: `${color}22`, padding: '4px', borderRadius: '6px' }}>
                <Icon size={14} color={color} />
              </div>
              <h5 style={{ margin: 0, color: color, fontSize: '0.85rem', fontWeight: 800 }}>{title}</h5>
            </div>
            <p style={{ margin: '0 0 10px 0', fontSize: '0.75rem', color: '#eee', fontWeight: 500, lineHeight: 1.4 }}>{description}</p>
            
            {characteristics.length > 0 && (
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '8px' }}>
                <div style={{ fontSize: '0.55rem', color: '#777', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px', fontWeight: 800 }}>CARACTERÍSTICAS</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  {characteristics.map((c, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.65rem', color: '#ccc' }}>
                      <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: color }} />
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            )}
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
      minWidth: '1200px',
      height: '420px', 
      background: '#0a0a0a', 
      borderRadius: '24px', 
      position: 'relative',
      border: '1px solid #1a1a1a',
      margin: '0 auto',
      boxShadow: '0 20px 50px rgba(0,0,0,0.4), inset 0 0 60px rgba(255,109,90,0.05)'
    }}>
      {/* Grid Pattern Background */}
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)', 
        backgroundSize: '24px 24px',
      }} />

      <svg style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }}>
        {/* Main horizontal flow line */}
        <motion.path
          d="M 50 120 L 1150 120"
          fill="none"
          stroke="#2a2a2a"
          strokeWidth="2"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        
        {/* Labels on lines */}
        <text x="90" y="110" fill="#666" fontSize="8" fontFamily="Inter" fontWeight="800">POST</text>
        <text x="800" y="165" fill="#666" fontSize="8" textAnchor="middle" fontFamily="Inter" fontWeight="800">HTML to PDF</text>
        <text x="940" y="165" fill="#666" fontSize="8" textAnchor="middle" fontFamily="Inter" fontWeight="800">send: message</text>

        {/* AI Agent Sub-branches */}
        {/* Model Connection (Left Pin) */}
        <motion.path
          d="M 450 145 L 450 190 Q 450 210 380 210 L 380 240"
          fill="none"
          stroke="#444"
          strokeWidth="1.5"
          strokeDasharray="4 2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 1 }}
        />
        {/* Parser Connection (Right Pin) */}
        <motion.path
          d="M 480 145 L 480 190 Q 480 210 580 210 L 580 240"
          fill="none"
          stroke="#444"
          strokeWidth="1.5"
          strokeDasharray="4 2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        />

        {/* Labels for sub-lines */}
        <text x="415" y="225" fill="#666" fontSize="9" textAnchor="middle" fontFamily="Inter" fontWeight="600">Model</text>
        <text x="545" y="225" fill="#666" fontSize="9" textAnchor="middle" fontFamily="Inter" fontWeight="600">Output Parser</text>
      </svg>

      {/* Main Row Nodes (y=100 approx) */}
      <N8nNode x={20} y={95} icon={Zap} title="Webhook Trigger" description="Inicio del flujo" color="#ff6d5a" delay={0.1} />
      
      <N8nNode x={140} y={95} icon={Code} title="Calculate Nutrition" description="Lógica matemática" color="#4a90e2" delay={0.2} />
      
      <N8nNode x={270} y={95} icon={Code} title="Filter Foods by Allergies" description="Exclusión personalizada" color="#f39c12" delay={0.3} />
      
      {/* Generate Meal Plan (AI Node) */}
      <N8nNode x={435} y={95} icon={Sparkles} title="Generate Meal Plan" description="Orquestación IA" color="#9b59b6" delay={0.4} />
      
      {/* Pins labels below AI Agent */}
      <div style={{ position: 'absolute', top: '160px', left: '435px', transform: 'translateX(-50%)', display: 'flex', gap: '20px', color: '#444', fontSize: '8px', fontWeight: 700, pointerEvents: 'none' }}>
        <span>Chat ModeMemory</span>
        <span>TooOutput Parser</span>
      </div>

      {/* Sub-nodes */}
      <N8nNode x={345} y={240} icon={Brain} title="OpenAI Model" description="GPT-4o Engine" color="#10a37f" delay={1} />
      <N8nNode x={545} y={240} icon={Code} title="Structured Output Parser" description="Validador JSON" color="#2ecc71" delay={1.2} />

      <N8nNode x={650} y={95} icon={Code} title="Code in JavaScript" description="Normalización" color="#f1c40f" delay={0.5} />
      
      <N8nNode x={770} y={95} icon={Code} title="Generate HTML Report" description="Diseño visual" color="#e67e22" delay={0.6} />
      
      <N8nNode x={890} y={95} icon={FileText} title="Convert HTML to PDF1" description="Exportación PDF" color="#e74c3c" delay={0.7} />
      
      <N8nNode x={1010} y={95} icon={Mail} title="Send Email" description="Entrega Gmail" color="#d44638" delay={0.8} />
      
      <N8nNode x={1130} y={95} icon={Zap} title="Respond to Webhook" description="Éxito final" color="#27ae60" delay={0.9} />

      <div style={{ 
        position: 'absolute', 
        top: '1.2rem', 
        left: '1.2rem', 
        fontSize: '0.65rem', 
        color: '#ff6d5a', 
        fontWeight: 800, 
        textTransform: 'uppercase', 
        letterSpacing: '1.5px',
        opacity: 0.8
      }}>
        n8n Workflow: IA Engine
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
    category: "🟢 Frameworks y Entorno",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    color: "#68a063",
    details: [
      { 
        title: "¿Qué es Node.js?", 
        text: "Es un entorno de ejecución de JavaScript orientado a eventos, construido con el motor V8 de Chrome. Rompe la barrera que limitaba a JavaScript al navegador, permitiendo ejecutarlo en el servidor." 
      },
      { 
        title: "¿Cómo lo descargo?", 
        image: "/images/nodeinstalacion/paginaoriginal.png",
        component: (
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <p style={{ color: '#666', marginBottom: '1rem' }}>Puedes descargar la versión LTS (estable) desde el sitio oficial:</p>
            <a 
              href="https://nodejs.org/es" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                background: '#68a063', 
                color: 'white', 
                padding: '10px 20px', 
                borderRadius: '50px', 
                textDecoration: 'none', 
                fontWeight: 800,
                fontSize: '0.9rem',
                boxShadow: '0 4px 12px rgba(104, 160, 99, 0.3)'
              }}
            >
              <Globe size={18} /> Ir a nodejs.org/es
            </a>
          </div>
        )
      },
      { 
        title: "Proceso de Instalación", 
        text: "Una vez descargado, sigue los pasos del asistente de instalación. Es un proceso sencillo de 'Siguiente' asegurándote de incluir npm (Node Package Manager).",
        image: "/images/nodeinstalacion/instalacionnode.png"
      },
      { 
        title: "¿Para qué sirve?", 
        text: "Se utiliza para construir aplicaciones de red rápidas y escalables. Es la base que sostiene nuestro backend, permitiendo manejar múltiples conexiones simultáneas y procesar datos antes de enviarlos a la base de datos o a n8n." 
      },
      { 
        title: "Servidor y API (server.js)", 
        text: "El backend utiliza Express para gestionar las rutas y vincularse con n8n de forma segura.",
        code: (
          <div style={{ fontFamily: 'monospace', lineHeight: 1.5, fontSize: '0.75rem' }}>
            <div><span style={{ color: '#569cd6' }}>import</span> express <span style={{ color: '#569cd6' }}>from</span> <span style={{ color: '#ce9178' }}>'express'</span>;</div>
            <div><span style={{ color: '#569cd6' }}>const</span> app = <span style={{ color: '#dcdcaa' }}>express</span>();</div>
            <br />
            <div>
              <span style={{ color: '#9cdcfe' }}>app</span>.<span style={{ color: '#dcdcaa' }}>use</span>(express.<span style={{ color: '#dcdcaa' }}>json</span>());
              <CodeTooltip tooltipText="Permite al servidor procesar datos enviados en formato JSON"> [JSON Middleware]</CodeTooltip>
            </div>
            <br />
            <div><span style={{ color: '#6a9955' }}>// Endpoint vinculado con n8n</span></div>
            <div>
              <span style={{ color: '#9cdcfe' }}>app</span>.<span style={{ color: '#dcdcaa' }}>post</span>(<span style={{ color: '#ce9178' }}>{"'/generate-meal-plan'"}</span>, <span style={{ color: '#569cd6' }}>async</span> (req, res) {"=>"} {"{"}
              <CodeTooltip tooltipText="Ruta que recibe los datos. 'post' envía información, 'async' permite esperar procesos largos."> [Endpoint POST]</CodeTooltip>
            </div>
            <div style={{ paddingLeft: '1rem' }}>
              <span style={{ color: '#569cd6' }}>const</span> N8N_WEBHOOK_URL = <span style={{ color: '#ce9178' }}>'...'</span>;
              <CodeTooltip tooltipText="'const' define una variable constante que no cambia su valor."> [Variable]</CodeTooltip>
            </div>
            <div style={{ paddingLeft: '1rem' }}>
              <span style={{ color: '#569cd6' }}>try</span> {"{"}
              <CodeTooltip tooltipText="'try' inicia un bloque de código que puede fallar, para luego capturar el error."> [Manejo Errores]</CodeTooltip>
            </div>
            <div style={{ paddingLeft: '2rem' }}>
              <span style={{ color: '#569cd6' }}>const</span> response = <span style={{ color: '#569cd6' }}>await</span> <span style={{ color: '#dcdcaa' }}>fetch</span>(N8N_WEBHOOK_URL, {'{'}
              <CodeTooltip tooltipText="'await fetch' hace una petición a otra web y espera la respuesta sin bloquear todo."> [Trigger n8n]</CodeTooltip>
            </div>
            <div style={{ paddingLeft: '3rem' }}>method: <span style={{ color: '#ce9178' }}>'POST'</span>,</div>
            <div style={{ paddingLeft: '3rem' }}>body: <span style={{ color: '#9cdcfe' }}>JSON</span>.<span style={{ color: '#dcdcaa' }}>stringify</span>(req.body),</div>
            <div style={{ paddingLeft: '2rem' }}>{"}"});</div>
            <div style={{ paddingLeft: '1rem' }}>{"}"} <span style={{ color: '#569cd6' }}>catch</span> (error) {"{"} ... {"}"}</div>
            <div>{"}"});</div>
          </div>
        )
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
        text: "Es una biblioteca de JavaScript creada por Meta para construir interfaces de usuario (UI). Se basa en componentes reutilizables que manejan su propio estado y se actualizan de forma eficiente sin recargar la página." 
      },
      { 
        title: "¿Cómo lo instalo?", 
        text: "Actualmente se recomienda usar herramientas rápidas como Vite. El comando para inicializar un proyecto moderno de React es:",
        code: `npm create vite@latest my-app -- --template react`
      },
      { 
        title: "¿Para qué sirve?", 
        text: "Sirve para crear aplicaciones web dinámicas y altamente interactivas (Single Page Applications). En este proyecto, se encarga de mostrar los formularios de nutrición, las gráficas y las transiciones fluidas de la app." 
      },
      { 
        title: "Lógica de Interfaz (App.jsx)", 
        text: "Fragmento del componente principal que gestiona el estado de la vista actual y las transiciones animadas.",
        code: (
          <div style={{ fontFamily: 'monospace', lineHeight: 1.5, fontSize: '0.75rem' }}>
            <div><span style={{ color: '#569cd6' }}>import</span> {"{ useState }"} <span style={{ color: '#569cd6' }}>from</span> <span style={{ color: '#ce9178' }}>'react'</span>;</div>
            <br />
            <div><span style={{ color: '#569cd6' }}>export default function</span> <span style={{ color: '#dcdcaa' }}>App</span>() {"{"}</div>
            <CodeTooltip tooltipText="'function' define un bloque de código reusable. 'export default' permite usarlo en otros archivos."> [Componente Principal]</CodeTooltip>
            <div style={{ paddingLeft: '1rem' }}>
              <span style={{ color: '#569cd6' }}>const</span> [view, setView] = <span style={{ color: '#dcdcaa' }}>useState</span>(<span style={{ color: '#ce9178' }}>'onboarding'</span>);
              <CodeTooltip tooltipText="Hook para guardar info que cambia (estado). 'view' es el valor, 'setView' la función para cambiarlo."> [Estado React]</CodeTooltip>
            </div>
            <br />
            <div style={{ paddingLeft: '1rem' }}>
              <span style={{ color: '#c586c0' }}>return</span> (
            </div>
            <div style={{ paddingLeft: '2rem' }}>
              <span style={{ color: '#808080' }}>{'<'}</span><span style={{ color: '#569cd6' }}>AnimatePresence</span><span style={{ color: '#808080' }}>{'>'}</span>
              <CodeTooltip tooltipText="Permite animar la salida de componentes cuando se desmontan"> [Animaciones]</CodeTooltip>
            </div>
            <div style={{ paddingLeft: '3rem' }}>
              <span style={{ color: '#808080' }}>{'<'}</span><span style={{ color: '#569cd6' }}>motion.div</span>
              <span style={{ color: '#9cdcfe' }}> key</span>={'{view}'}
              <span style={{ color: '#9cdcfe' }}> initial</span>={'{{ opacity: 0 }}'}
            </div>
            <div style={{ paddingLeft: '3rem' }}>
              <span style={{ color: '#808080' }}>{'  />'}</span>
            </div>
            <div style={{ paddingLeft: '2rem' }}>
              <span style={{ color: '#808080' }}>{'</'}</span><span style={{ color: '#569cd6' }}>AnimatePresence</span><span style={{ color: '#808080' }}>{'>'}</span>
            </div>
            <div style={{ paddingLeft: '1rem' }}>);</div>
            <div>{'}'}</div>
          </div>
        )
      },
      { 
        title: "¿Cómo se obtiene?", 
        image: "/images/reactinstalacion/paginareact.png",
        component: (
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <p style={{ color: '#666', marginBottom: '1rem' }}>Puedes consultar la documentación oficial y tutoriales en español en:</p>
            <a 
              href="https://es.react.dev/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                background: '#61dafb', 
                color: '#20232a', 
                padding: '10px 20px', 
                borderRadius: '50px', 
                textDecoration: 'none', 
                fontWeight: 800,
                fontSize: '0.9rem',
                boxShadow: '0 4px 12px rgba(97, 218, 251, 0.3)'
              }}
            >
              <Globe size={18} /> Ir a es.react.dev
            </a>
          </div>
        )
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
        title: "Firestore", 
        text: "Es la base de datos NoSQL en la nube de Firebase. Almacena datos en documentos y colecciones, permitiendo consultas potentes y sincronización en tiempo real entre todos los clientes conectados.",
        image: "/images/Captura2Firebase.png"
      },
      { 
        title: "Authentication", 
        text: "Provee un sistema de autenticación seguro y fácil de implementar. Soporta el acceso mediante correo/contraseña, proveedores sociales como Google o Facebook, y se integra perfectamente con otros servicios de Firebase.",
        icon: <Lock size={80} color="#ffca28" />
      }


    ]
  },
  docker: {
    title: "Docker",
    category: "🐳 Infraestructura y Conectividad",
    logo: "/logos/Docker_Logo.png",
    color: "#2496ed",
    details: [
      { 
        title: "¿Cuál es su rol central?", 
        text: "Es la herramienta que nos permite empaquetar y ejecutar toda la aplicación de forma consistente dentro de Rocky Linux. Garantiza que el sistema se ejecute siempre igual, sin importar el entorno.",
        icon: <Box size={80} color="#2496ed" />
      },
      { 
        title: "¿Cómo funciona mediante contenedores?", 
        text: "Funciona mediante entornos aislados donde cada servicio corre con todo lo que necesita (librerías, dependencias y configuración), asegurando una portabilidad total.",
        icon: <Layers size={80} color="#2496ed" />
      },
      { 
        title: "¿Cómo lo usamos en este proyecto?", 
        text: "Levantamos dos servicios principales: un contenedor para el Frontend en React (puerto 3000) y un contenedor para el Backend en Node.js con Express (puerto 3001).",
        icon: <Monitor size={80} color="#2496ed" />
      },
      { 
        title: "¿Cómo gestionamos ambos servicios?", 
        text: "Usamos Docker Compose para definir toda la arquitectura en un solo archivo, especificando la construcción, puertos y la comunicación entre contenedores.",
        code: `# Docker Compose: Arquitectura del Proyecto\nservices:\n  frontend:\n    build: ./frontend\n    ports: ["3000:3000"]\n  backend:\n    build: ./backend\n    ports: ["3001:3001"]`,
        icon: <Share2 size={80} color="#2496ed" />
      },
      { 
        title: "¿Qué comandos utilizamos para el despliegue?", 
        text: "Comandos clave: 'build' para las imágenes, 'up' para levantar la arquitectura y 'down' para detenerla. También realizamos rebuilds para aplicar modificaciones rápidas.",
        icon: <RefreshCcw size={80} color="#2496ed" />
      }
    ]
  },
  rocky: {
    title: "Rocky Linux",
    category: "🔥 Backend y Despliegue",
    logo: "/logos/Rocky_Linux_wordmark.svg.png",
    color: "#10b981",
    details: [
      { 
        title: "Máquina Virtual y Rocky Linux", 
        text: "Una Máquina Virtual es un software que simula una computadora dentro de otra física, permitiendo trabajar en entornos aislados. Dentro de nuestra MV instalamos Rocky Linux, un sistema operativo orientado a servidores, elegido por su estabilidad, seguridad y rendimiento.",
        icon: (
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <Server size={80} color="#10b981" />
            <Monitor size={80} color="#10b981" />
          </div>
        )
      },
      { 
        title: "Administración y Orquestación", 
        text: "Dentro del servidor, Rocky Linux administra los recursos del sistema y ejecuta Docker, donde se levantan contenedores separados para el frontend en React y el backend en Node.js. Docker crea una red interna que permite la comunicación entre ambos servicios. A su vez, el backend se conecta con Firebase para almacenar información y con n8n mediante webhooks para automatizar procesos.",
        icon: <Cpu size={80} color="#10b981" />
      },
      { 
        title: "Flujo de Interacción del Usuario", 
        text: "Ciclo de vida de una petición desde el navegador hasta la respuesta final:",
        code: `• Usuario ingresa al frontend desde el navegador\n• Completa el formulario de datos\n• Frontend envía datos al backend\n• Backend valida y procesa datos\n• Guarda información en Firebase\n• Envía datos a n8n\n• n8n genera automatizaciones (PDF / Email)\n• Usuario recibe respuesta final`,
        icon: <Activity size={80} color="#10b981" />
      }
    ]
  },
  n8n: {
    title: "n8n",
    category: "🐳 Infraestructura y Conectividad",
    logo: "/logos/N8n-logo-new.svg.png",
    color: "#ff6d5a",
    details: [
      { 
        title: "Arquitectura del Flujo", 
        image: "/images/n8n/nodos-a-representar.jpeg" 
      },
      { image: "/images/n8n/imagenn8n1.jpeg", title: "1" },
      { image: "/images/n8n/imagenn8n2.jpeg", title: "2" },
      { image: "/images/n8n/imagenn8n3.jpeg", title: "3" },
      { image: "/images/n8n/imagenn8n4.jpeg", title: "4" },
      { image: "/images/n8n/imagenn8n5.jpeg", title: "5" },
      { image: "/images/n8n/imagenn8n6.jpeg", title: "6" },
      { image: "/images/n8n/imagenn8n7.jpeg", title: "7" },
      { image: "/images/n8n/imagenn8n8.jpeg", title: "8" },
      { image: "/images/n8n/imagenn8n9.jpeg", title: "9" }
    ]
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
        <div className="expanded-header" style={{ 
          justifyContent: 'space-between', 
          border: 'none', 
          padding: '2.5rem 1.5rem 1rem 1.5rem', // Increased top and side padding
          position: 'relative',
          zIndex: 1000,
          width: '100%'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src={item.logo} alt="" style={{ height: '30px' }} />
            <h3 style={{ margin: 0, fontSize: '1.2rem', color: item.color }}>{item.title}</h3>
          </div>
          <button className="back-btn" onClick={handleBack} style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
             <ChevronLeft size={18} /> Volver a cuadros
          </button>
        </div>

        <div className="sub-slides-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSubSlide}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              {item.details[currentSubSlide].component ? (
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                   {item.details[currentSubSlide].title && <h4 style={{ color: item.color, fontSize: '1.2rem', marginBottom: '0.5rem', textAlign: 'center' }}>{item.details[currentSubSlide].title}</h4>}
                   {item.details[currentSubSlide].component}
                   {item.details[currentSubSlide].text && <p style={{ color: '#666', fontSize: '0.9rem', textAlign: 'center' }}>{item.details[currentSubSlide].text}</p>}
                </div>
              ) : (
                <div className="sub-slide-card" style={{ borderLeft: `6px solid ${item.color}`, width: '100%' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                    {item.details[currentSubSlide].image ? (
                      <div style={{ width: '100%', marginBottom: '1rem' }}>
                        <ZoomableImage 
                          src={item.details[currentSubSlide].image} 
                          alt={item.details[currentSubSlide].title} 
                        />
                      </div>
                    ) : item.details[currentSubSlide].icon ? (
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', background: 'rgba(139, 115, 85, 0.05)', borderRadius: '12px' }}>
                        {item.details[currentSubSlide].icon}
                      </div>
                    ) : null}

                    <h4 style={{ textAlign: item.details[currentSubSlide].image ? 'center' : 'left' }}>{item.details[currentSubSlide].title}</h4>
                    <p style={{ textAlign: item.details[currentSubSlide].image ? 'center' : 'left' }}>{item.details[currentSubSlide].text}</p>
                    
                    {item.details[currentSubSlide].code && (
                      <div className="code-block">
                        {typeof item.details[currentSubSlide].code === 'string' ? (
                          <pre style={{ margin: 0 }}>{item.details[currentSubSlide].code}</pre>
                        ) : (
                          item.details[currentSubSlide].code
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

        {/* Navigation Controls */}
        {item.details.length > 1 && (
          <div className="sub-navigation-controls">
            <button 
              className="sub-btn side-nav-btn" 
              onClick={() => setCurrentSubSlide(prev => Math.max(0, prev - 1))}
              disabled={currentSubSlide === 0}
            >
              <ChevronLeft size={24} />
              <span className="mobile-label">Anterior</span>
            </button>
            
            <div className="sub-dots">
              {item.details.map((_, i) => (
                <div 
                  key={i} 
                  className={`dot ${i === currentSubSlide ? 'active' : ''}`} 
                  style={{ backgroundColor: i === currentSubSlide ? item.color : '#ccc' }} 
                  onClick={() => setCurrentSubSlide(i)}
                />
              ))}
            </div>

            <button 
              className="sub-btn side-nav-btn" 
              onClick={() => setCurrentSubSlide(prev => Math.min(item.details.length - 1, prev + 1))}
              disabled={currentSubSlide === item.details.length - 1}
            >
              <span className="mobile-label">Siguiente</span>
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>

      {/* User requested to remove desktop dots */}
      {/* {!item.isWorkflow && !item.isArchitecture && item.details.length > 1 && (
        <div className="sub-dots desktop-dots" style={{ justifyContent: 'center', marginTop: '2rem' }}>
          {item.details.map((_, i) => (
            <div key={i} className={`dot ${i === currentSubSlide ? 'active' : ''}`} style={{ backgroundColor: i === currentSubSlide ? item.color : '#ccc' }} />
          ))}
        </div>
      )} */}
      </motion.div>
    );
  }

  return (
    <div className="grid-content">
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
          <motion.img 
            src={item.logo} 
            alt={item.title} 
            style={{ height: '45px', marginBottom: '0.8rem', objectFit: 'contain' }} 
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
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
        <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', background: 'linear-gradient(to right, #8B7355, #D4A373)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.2 }}>
          Presentamos:
        </h2>

        <div className="carousel-container">
          <div className="carousel-track">
            {[
              { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
              { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
              { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg" },
              { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
              { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" },
              { name: "Rocky Linux", icon: "/logos/Rocky_Linux_wordmark.svg" },
              { name: "n8n", icon: "/logos/N8n-logo-new.svg.png" }
            ].concat([
              { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
              { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
              { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg" },
              { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
              { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" },
              { name: "Rocky Linux", icon: "/logos/Rocky_Linux_wordmark.svg" },
              { name: "n8n", icon: "/logos/N8n-logo-new.svg.png" }
            ]).map((tech, index) => (
              <div key={index} className="carousel-item">
                <motion.img 
                  src={tech.icon} 
                  className="carousel-icon" 
                  alt={tech.name}
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: index * 0.2
                  }}
                /> 
                {tech.name}
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
      <div className="grid-content" style={{ width: '100%' }}>
          <motion.div variants={itemVariants} className="info-card" style={{ padding: '1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <motion.img 
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" 
              style={{ height: '40px', marginBottom: '1rem' }} 
              alt="HTML5"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <h4 style={{ color: '#e34f26', fontSize: '1.2rem', marginBottom: '0.5rem' }}>HTML</h4>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.5, color: '#666' }}>Estructura y significado del contenido mediante etiquetas.</p>
          </motion.div>
          <motion.div variants={itemVariants} className="info-card" style={{ padding: '1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <motion.img 
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" 
              style={{ height: '40px', marginBottom: '1rem' }} 
              alt="CSS3"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <h4 style={{ color: '#1572b6', fontSize: '1.2rem', marginBottom: '0.5rem' }}>CSS</h4>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.5, color: '#666' }}>Diseño, colores y animaciones para la capa visual.</p>
          </motion.div>
          <motion.div variants={itemVariants} className="info-card" style={{ padding: '1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <motion.img 
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" 
              style={{ height: '40px', marginBottom: '1rem' }} 
              alt="JS"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <h4 style={{ color: '#f7df1e', fontSize: '1.2rem', marginBottom: '0.5rem' }}>JavaScript</h4>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.5, color: '#666' }}>Interactividad y lógica dinámica en el cliente.</p>
          </motion.div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', width: '100%', marginTop: '1rem' }}>
          {/* HTML Block */}
          <motion.div variants={itemVariants} className="code-block" style={{ fontSize: '0.65rem', padding: '1rem', minHeight: '180px' }}>
            <div style={{ color: '#6a9955', fontStyle: 'italic', marginBottom: '8px' }}>// HTML5 (Estructura)</div>
            <div>
              <span style={{ color: '#808080' }}>{"<"}</span><span style={{ color: '#569cd6' }}>head</span><span style={{ color: '#808080' }}>{">"}</span>...<span style={{ color: '#808080' }}>{"</"}</span><span style={{ color: '#569cd6' }}>head</span><span style={{ color: '#808080' }}>{">"}</span>
              <CodeTooltip tooltipText="Metadatos técnicos."> [Head]</CodeTooltip>
            </div>
            <div>
              <span style={{ color: '#808080' }}>{"<"}</span><span style={{ color: '#569cd6' }}>h1</span><span style={{ color: '#808080' }}>{">"}</span>Título<span style={{ color: '#808080' }}>{"</"}</span><span style={{ color: '#569cd6' }}>h1</span><span style={{ color: '#808080' }}>{">"}</span>
              <CodeTooltip tooltipText="Título principal."> [H1]</CodeTooltip>
            </div>
            <div>
              <span style={{ color: '#808080' }}>{"<"}</span><span style={{ color: '#569cd6' }}>div</span><span style={{ color: '#9cdcfe' }}> id</span>=<span style={{ color: '#ce9178' }}>"root"</span><span style={{ color: '#808080' }}>{">"}{"</"}</span><span style={{ color: '#569cd6' }}>div</span><span style={{ color: '#808080' }}>{">"}</span>
              <CodeTooltip tooltipText="Contenedor React."> [Root]</CodeTooltip>
            </div>
          </motion.div>

          {/* CSS Block */}
          <motion.div variants={itemVariants} className="code-block" style={{ fontSize: '0.65rem', padding: '1rem', minHeight: '180px' }}>
            <div style={{ color: '#6a9955', fontStyle: 'italic', marginBottom: '8px' }}>// CSS3 (Estilos)</div>
            <div>
              <span style={{ color: '#dcdcaa' }}>.card</span> {" {"}
              <CodeTooltip tooltipText="Selector de clase."> [Class]</CodeTooltip>
            </div>
            <div style={{ paddingLeft: '1rem' }}>
              <span style={{ color: '#9cdcfe' }}>color</span>: <span style={{ color: '#ce9178' }}>blue</span>;
            </div>
            <div style={{ paddingLeft: '1rem' }}>
              <span style={{ color: '#9cdcfe' }}>display</span>: <span style={{ color: '#ce9178' }}>flex</span>;
              <CodeTooltip tooltipText="Diseño flexible."> [Flex]</CodeTooltip>
            </div>
            <div>{"}"}</div>
          </motion.div>

          {/* JS Block */}
          <motion.div variants={itemVariants} className="code-block" style={{ fontSize: '0.65rem', padding: '1rem', minHeight: '180px' }}>
            <div style={{ color: '#6a9955', fontStyle: 'italic', marginBottom: '8px' }}>// JS (Lógica)</div>
            <div>
              <span style={{ color: '#569cd6' }}>function</span> <span style={{ color: '#dcdcaa' }}>init</span>() {"{"}
              <CodeTooltip tooltipText="Agrupa lógica."> [Fn]</CodeTooltip>
            </div>
            <div style={{ paddingLeft: '1rem' }}>
              <span style={{ color: '#9cdcfe' }}>console</span>.<span style={{ color: '#dcdcaa' }}>log</span>(<span style={{ color: '#ce9178' }}>"Ok"</span>);
              <CodeTooltip tooltipText="Mensaje consola."> [Log]</CodeTooltip>
            </div>
            <div>{"}"}</div>
          </motion.div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "Tecnologías de Soporte",
    subtitle: "Herramientas de Desarrollo",
    content: (
      <div className="grid-content" style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', gridTemplateColumns: 'repeat(2, 1fr)' }}>
        <motion.div variants={itemVariants} className="info-card" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ flex: 1 }}>
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" style={{ height: '50px', marginBottom: '1rem' }} alt="Vite"/>
            <h4 style={{ fontSize: '1.4rem' }}>Vite</h4>
            <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1rem' }}>
              <strong>Propósito:</strong> Acelerar el desarrollo eliminando tiempos de espera en compilación.
            </p>
          </div>
          <div className="code-block">
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
          <div className="code-block">
            <span style={{ color: '#888' }}># Instalar dependencia</span>
            <br />npm install {"<nombre>"}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="info-card" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ flex: 1 }}>
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" style={{ height: '50px', marginBottom: '1rem' }} alt="Vercel"/>
            <h4 style={{ fontSize: '1.4rem' }}>Vercel</h4>
            <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1rem' }}>
              <strong>Propósito:</strong> Despliegue continuo y hosting optimizado para aplicaciones frontend.
            </p>
          </div>
          <div className="code-block">
            <span style={{ color: '#888' }}># Desplegar app</span>
            <br />vercel deploy
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="info-card" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ flex: 1 }}>
            <div style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg, #000, #333)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: 'white', fontWeight: 800 }}>AG</div>
            <h4 style={{ fontSize: '1.4rem' }}>Antigravity</h4>
            <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1rem' }}>
              <strong>Propósito:</strong> Asistente de IA para el desarrollo y optimización de código en tiempo real.
            </p>
          </div>
          <div className="code-block">
            <span style={{ color: '#888' }}># Modo de trabajo</span>
            <br />Pair Programming con IA
          </div>
        </motion.div>
      </div>
    )
  },
  {
    id: 3,
    title: "Herramientas de uso",
    subtitle: "Click en un cuadro para profundizar",
    content: (props) => <EcosystemGrid {...props} />
  },
  {
    id: 4,
    title: "n8n - Detalle del Flujo (1/9)",
    subtitle: "Configuración inicial y Webhook",
    content: (
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ZoomableImage src="/images/n8n/imagenn8n1.jpeg" alt="n8n step 1" />
      </div>
    )
  },
  {
    id: 5,
    title: "n8n - Detalle del Flujo (2/9)",
    subtitle: "Extracción de datos del usuario",
    content: (
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ZoomableImage src="/images/n8n/imagenn8n2.jpeg" alt="n8n step 2" />
      </div>
    )
  },
  {
    id: 6,
    title: "n8n - Detalle del Flujo (3/9)",
    subtitle: "Procesamiento de IA - Análisis nutricional",
    content: (
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ZoomableImage src="/images/n8n/imagenn8n3.jpeg" alt="n8n step 3" />
      </div>
    )
  },
  {
    id: 7,
    title: "n8n - Detalle del Flujo (4/9)",
    subtitle: "Generación del plan de comidas",
    content: (
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ZoomableImage src="/images/n8n/imagenn8n4.jpeg" alt="n8n step 4" />
      </div>
    )
  },
  {
    id: 8,
    title: "n8n - Detalle del Flujo (5/9)",
    subtitle: "Validación de macronutrientes",
    content: (
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ZoomableImage src="/images/n8n/imagenn8n5.jpeg" alt="n8n step 5" />
      </div>
    )
  },
  {
    id: 9,
    title: "n8n - Detalle del Flujo (6/9)",
    subtitle: "Formateo del documento PDF",
    content: (
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ZoomableImage src="/images/n8n/imagenn8n6.jpeg" alt="n8n step 6" />
      </div>
    )
  },
  {
    id: 10,
    title: "n8n - Detalle del Flujo (7/9)",
    subtitle: "Integración con servicios de Email",
    content: (
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ZoomableImage src="/images/n8n/imagenn8n7.jpeg" alt="n8n step 7" />
      </div>
    )
  },
  {
    id: 11,
    title: "n8n - Detalle del Flujo (8/9)",
    subtitle: "Almacenamiento de logs y reportes",
    content: (
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ZoomableImage src="/images/n8n/imagenn8n8.jpeg" alt="n8n step 8" />
      </div>
    )
  },
  {
    id: 12,
    title: "n8n - Detalle del Flujo (9/9)",
    subtitle: "Finalización del proceso",
    content: (
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ZoomableImage src="/images/n8n/imagenn8n9.jpeg" alt="n8n step 9" />
      </div>
    )
  },
  {
    id: 13,
    title: "¡Muchas Gracias!",
    subtitle: "Preguntas y dudas",
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center' }}>
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }} 
          transition={{ duration: 4, repeat: Infinity }}
          style={{ fontSize: '4rem', fontWeight: 800, background: 'linear-gradient(to right, #8B7355, #D4A373)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          ¿Consultas?
        </motion.div>
        <p style={{ marginTop: '2rem', fontSize: '1.2rem', color: '#666' }}>Fin de la presentación</p>
      </div>
    )
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

  // Wheel navigation with cooldown
  const lastScrollTime = useRef(0);
  useEffect(() => {
    const handleWheel = (e) => {
      // Don't navigate if Ctrl is pressed (reserved for zoom) or if an ecosystem item is expanded
      if (e.ctrlKey || selectedEcoItem) return;

      const now = Date.now();
      if (now - lastScrollTime.current < 1000) return; // 1 second cooldown

      if (Math.abs(e.deltaY) > 50) { // Threshold for intentional scroll
        if (e.deltaY > 0) {
          paginate(1);
        } else {
          paginate(-1);
        }
        lastScrollTime.current = now;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [page, selectedEcoItem]);

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
          className={`nav-zone nav-left ${page === 0 || selectedEcoItem ? 'disabled' : ''}`} 
          onClick={() => paginate(-1)}
          style={{ zIndex: selectedEcoItem ? -1 : 200 }}
        >
          <div className="nav-hint">
            <ChevronLeft size={32} />
          </div>
        </div>
        <div 
          className={`nav-zone nav-right ${page === slidesData.length - 1 || selectedEcoItem ? 'disabled' : ''}`} 
          onClick={() => paginate(1)}
          style={{ zIndex: selectedEcoItem ? -1 : 200 }}
        >
          <div className="nav-hint">
            <ChevronRight size={32} />
          </div>
        </div>
      </div>

      <PresentationTools isVisible={!!selectedEcoItem} />
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${((page + 1) / slidesData.length) * 100}%` }}></div>
      </div>
    </div>
  );
}

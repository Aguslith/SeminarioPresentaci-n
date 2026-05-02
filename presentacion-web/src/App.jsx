import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Atom, Rocket, Zap, Eye, Database, Lock, Link, Globe, Sparkles, CheckCircle2, Activity, Server, Monitor, HardDrive, Mail, Shield, Share2, Brain, Code, FileText, Layout, RefreshCcw, Search, ZoomIn, MousePointer2, PenTool, Eraser, Wand2, Trash2 } from 'lucide-react';
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
        <Icon size={24} color={color} />
        
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
        title: "Ejemplos de código (Express + n8n):", 
        text: "Aquí tienes el código real del backend que conecta nuestra app con el flujo de n8n:",
        code: "// Importamos Express para el servidor\nimport express from 'express';\nconst app = express();\nconst PORT = 5000;\n\n// Middleware para procesar JSON del cliente\napp.use(express.json());\n\n// Endpoint que dispara la automatización en n8n\napp.post('/generate-meal-plan', async (req, res) => {\n  const N8N_URL = 'http://localhost:5678/webhook/nutrition-plan';\n  \n  try {\n    // Enviamos los datos del usuario (macros, alergias) a n8n\n    const response = await fetch(N8N_URL, {\n      method: 'POST',\n      headers: { 'Content-Type': 'application/json' },\n      body: JSON.stringify(req.body),\n    });\n\n    const data = await response.json();\n    res.json({ success: true, details: data }); // Éxito: Plan generado\n  } catch (error) {\n    res.status(500).json({ success: false, error: 'Error en servidor' });\n  }\n});"
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
        title: "Lógica de Interfaz (App.jsx):", 
        text: "Fragmento del componente principal que gestiona el estado de la vista actual y las transiciones:",
        code: "// Hook de estado para controlar la vista actual de la app\nconst [currentView, setCurrentView] = useState('onboarding');\n\nreturn (\n  <div className=\"flex min-h-screen bg-surface\">\n    {/* AnimatePresence gestiona animaciones al desmontar componentes */}\n    <AnimatePresence mode=\"wait\">\n      <motion.div\n        key={currentView} // Cambiar la key dispara la transición\n        initial={{ opacity: 0, y: 20 }}\n        animate={{ opacity: 1, y: 0 }}\n        exit={{ opacity: 0, y: -20 }}\n      >\n        {/* Renderizado condicional basado en el estado */}\n        {currentView === 'dashboard' && <Dashboard />}\n        {currentView === 'log' && <FoodLog />}\n      </motion.div>\n    </AnimatePresence>\n  </div>\n);"
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
    isArchitecture: true,
    details: [
      { title: "Sistema Operativo", text: "Es una distribución de Linux empresarial, de código abierto y gratuita, diseñada para ser 100% compatible con Red Hat Enterprise Linux (RHEL). Es el sucesor espiritual de CentOS, ideal para servidores que requieren máxima estabilidad y seguridad." },
      { title: "Arquitectura de Despliegue", text: "Visualización del flujo de datos y contenedores sobre el servidor Rocky Linux." }
    ]
  },
  n8n: {
    title: "n8n",
    category: "🐳 Infraestructura y Conectividad",
    logo: "/logos/N8n-logo-new.svg.png",
    color: "#ff6d5a",
    isWorkflow: true,
    details: [
      { 
        title: "Arquitectura del Flujo", 
        text: "Diagrama interactivo de la automatización completa en n8n." 
      },
      { image: "/images/n8n/imagenn8n1.jpeg", title: "Paso 1: Webhook de Entrada" },
      { image: "/images/n8n/imagenn8n2.jpeg", title: "Paso 2: Procesamiento de Datos" },
      { image: "/images/n8n/imagenn8n3.jpeg", title: "Paso 3: Lógica Nutricional" },
      { image: "/images/n8n/imagenn8n4.jpeg", title: "Paso 4: Orquestación IA" },
      { image: "/images/n8n/imagenn8n5.jpeg", title: "Paso 5: Agente OpenAI" },
      { image: "/images/n8n/imagenn8n6.jpeg", title: "Paso 6: Parser de Resultados" },
      { image: "/images/n8n/imagenn8n7.jpeg", title: "Paso 7: Generador de Reporte" },
      { image: "/images/n8n/imagenn8n8.jpeg", title: "Paso 8: Conversión a PDF" },
      { image: "/images/n8n/imagenn8n9.jpeg", title: "Paso 9: Notificación Email" }
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
          padding: '0 1rem 1rem 1rem',
          position: 'relative',
          zIndex: 1000
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
            {item.isWorkflow ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', width: '100%' }}>
                <AnimatePresence mode="wait">
                  {currentSubSlide === 0 ? (
                    <motion.div
                      key="workflow-diagram"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      style={{ width: '100%', margin: '0.5rem 0' }}
                    >
                      <N8nWorkflow />
                    </motion.div>
                  ) : (
                     <motion.div
                      key={currentSubSlide}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -50, opacity: 0 }}
                      style={{ width: '100%', maxWidth: '900px' }}
                    >
                      <ZoomableImage 
                        src={item.details[currentSubSlide].image} 
                        alt={item.details[currentSubSlide].title} 
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div className="sub-controls" style={{ marginTop: '0.2rem' }}>
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

                {item.details[currentSubSlide].image && (
                   <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ 
                      textAlign: 'center', 
                      marginTop: '0.5rem', 
                      color: '#888', 
                      fontSize: '0.9rem', 
                      fontWeight: 600,
                      padding: '0 1rem'
                    }}
                   >
                     {item.details[currentSubSlide].title}
                   </motion.div>
                )}
              </div>
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
                  {item.details[currentSubSlide].image ? (
                    <div style={{ width: '100%', marginBottom: '1rem' }}>
                      <ZoomableImage 
                        src={item.details[currentSubSlide].image} 
                        alt={item.details[currentSubSlide].title} 
                      />
                    </div>
                  ) : item.details[currentSubSlide].icon ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', background: 'rgba(139, 115, 85, 0.05)', borderRadius: '12px' }}>
                      {(() => {
                        const Icon = item.details[currentSubSlide].icon;
                        return <Icon size={80} color={item.color} />;
                      })()}
                    </div>
                  ) : null}

                  <h4>{item.details[currentSubSlide].title}</h4>
                  <p>{item.details[currentSubSlide].text}</p>
                  {item.details[currentSubSlide].code && (
                    <div className="code-block" style={{ marginTop: '0.5rem', fontSize: '0.75rem', background: '#2C2A29', color: '#61dafb', border: '1px solid #61dafb' }}>
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
              style={{ position: 'absolute', left: '-50px', top: '50%', transform: 'translateY(-50%)' }}
            >
              <ChevronLeft />
            </button>
            <button 
              className="sub-btn side-nav-btn right" 
              onClick={() => setCurrentSubSlide(prev => Math.min(item.details.length - 1, prev + 1))}
              disabled={currentSubSlide === item.details.length - 1}
              style={{ position: 'absolute', right: '-50px', top: '50%', transform: 'translateY(-50%)' }}
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
    <div className="grid-content" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
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
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Arquitectura de Código:</h3>
          <div className="code-block" style={{ fontSize: '0.85rem', lineHeight: 1.4, background: '#1e1e1e', color: '#d4d4d4' }}>
            {/* HTML Part */}
            <div style={{ color: '#6a9955', fontStyle: 'italic', marginBottom: '4px' }}>// Estructura (HTML5)</div>
            <div style={{ paddingLeft: '1rem' }}>
              <span style={{ color: '#808080' }}>{'<'}</span>
              <span style={{ color: '#569cd6' }}>div</span> 
              <span style={{ color: '#9cdcfe' }}> id</span>=<span style={{ color: '#ce9178' }}>"root"</span>
              <span style={{ color: '#808080' }}>{'>'}{'</'}</span>
              <span style={{ color: '#569cd6' }}>div</span>
              <span style={{ color: '#808080' }}>{'>'}</span>
              <CodeTooltip tooltipText="Punto de montaje de React"> [React Entry]</CodeTooltip>
            </div>
            <div style={{ paddingLeft: '1rem', marginBottom: '1rem' }}>
              <span style={{ color: '#808080' }}>{'<'}</span>
              <span style={{ color: '#569cd6' }}>script</span> 
              <span style={{ color: '#9cdcfe' }}> src</span>=<span style={{ color: '#ce9178' }}>"/main.tsx"</span>
              <span style={{ color: '#808080' }}>{'>'}{'</'}</span>
              <span style={{ color: '#569cd6' }}>script</span>
              <span style={{ color: '#808080' }}>{'>'}</span>
            </div>

            {/* CSS Part */}
            <div style={{ color: '#6a9955', fontStyle: 'italic', marginBottom: '4px' }}>// Estilos y Variables (CSS3)</div>
            <div style={{ paddingLeft: '1rem' }}>
              <span style={{ color: '#d16969' }}>@theme</span> {' {'}
            </div>
            <div style={{ paddingLeft: '2rem' }}>
              <span style={{ color: '#9cdcfe' }}>--color-primary</span>: <span style={{ color: '#ce9178' }}>#0f5238</span>;
              <CodeTooltip tooltipText="Variable global de color"> [Primary]</CodeTooltip>
            </div>
            <div style={{ paddingLeft: '1rem', marginBottom: '1rem' }}>{'}'}</div>

            {/* JS Part */}
            <div style={{ color: '#6a9955', fontStyle: 'italic', marginBottom: '4px' }}>// Lógica de Estado (ES6+)</div>
            <div style={{ paddingLeft: '1rem' }}>
              <span style={{ color: '#569cd6' }}>const</span> [user, setUser] = <span style={{ color: '#dcdcaa' }}>useState</span>(<span style={{ color: '#569cd6' }}>null</span>);
            </div>
            <div style={{ paddingLeft: '1rem' }}>
              <span style={{ color: '#569cd6' }}>const</span> <span style={{ color: '#dcdcaa' }}>login</span> = (d) ={'>'} <span style={{ color: '#dcdcaa' }}>setUser</span>(d);
              <CodeTooltip tooltipText="Función de flecha moderna"> [Arrow Fn]</CodeTooltip>
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
  },
  {
    id: 4,
    title: "Automatización con n8n",
    subtitle: "Flujo de Trabajo Inteligente",
    logo: "/logos/N8n-logo-new.svg.png",
    content: (
      <div style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
        <N8nWorkflow />
      </div>

    )
  },
  {
    id: 5,
    title: "Arquitectura de Servidores",
    subtitle: "Infraestructura y Despliegue",
    logo: "/logos/Rocky_Linux_wordmark.svg",
    content: (
      <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
        <ServerArchitecture />
      </div>
    )
  },
  {
    id: 6,
    title: "¡Gracias!",
    subtitle: "Seminario de Actualización 2026",
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', gap: '2rem' }}>
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          style={{ 
            background: 'rgba(212, 163, 115, 0.1)', 
            padding: '4rem', 
            borderRadius: '50%',
            border: '2px solid rgba(212, 163, 115, 0.2)',
            boxShadow: '0 20px 50px rgba(139, 115, 85, 0.1)'
          }}
        >
          <Rocket size={120} color="#D4A373" />
        </motion.div>
        <div>
          <h2 style={{ fontSize: '4rem', fontWeight: 800, color: '#8B7355', marginBottom: '0.5rem' }}>¿Preguntas?</h2>
          <p style={{ fontSize: '1.5rem', color: '#5A5650' }}>Muchas gracias por su atención</p>
        </div>
        
        <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
           <div className="carousel-item" style={{ fontSize: '1rem', padding: '0.5rem 1.5rem' }}>
             <Activity size={18} style={{ marginRight: '8px' }} /> Nutrición Consciente
           </div>
           <div className="carousel-item" style={{ fontSize: '1rem', padding: '0.5rem 1.5rem' }}>
             <Globe size={18} style={{ marginRight: '8px' }} /> Proyecto 2026
           </div>
        </div>
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

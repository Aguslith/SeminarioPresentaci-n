# Resumen de Tecnologías y Código - App de Nutrición

Este documento contiene una recopilación de los fragmentos de código más representativos utilizados en la aplicación, abarcando desde la estructura básica hasta la lógica del servidor.

## 1. HTML5 (Estructura Base)
La base de la aplicación reside en un archivo HTML minimalista que sirve como contenedor para el framework React.

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Organic Editorial | Nutrición Consciente</title>
  </head>
  <body>
    <!-- Contenedor principal donde se monta React -->
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

## 2. CSS3 (Diseño y Sistema de Temas)
Se utiliza un sistema de diseño basado en variables de CSS (Design Tokens) y Tailwind CSS para mantener una estética premium y consistente.

```css
@theme {
  --font-headline: "Manrope", ui-sans-serif, system-ui, sans-serif;
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;

  /* Paleta de Colores Nature-Inspired */
  --color-primary: #0f5238;
  --color-primary-container: #2d6a4f;
  --color-secondary: #0e6c4a;
  --color-surface: #f9f9f6;
  --color-on-surface: #1a1c1a;

  --radius-xl: 1.5rem;
}

/* Componentes de Estilo Personalizados */
@layer components {
  .signature-gradient {
    background: linear-gradient(145deg, #0f5238 0%, #2d6a4f 100%);
  }

  .editorial-shadow {
    box-shadow: 0px 12px 32px rgba(26, 28, 26, 0.04);
  }
}
```

## 3. React (Lógica de Interfaz)
Fragmento del componente principal que gestiona el estado de la vista actual y el perfil del usuario.

```javascript
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentView, setCurrentView] = useState('onboarding');
  const [userProfile, setUserProfile] = useState(null);

  const handleViewChange = (view) => {
    if (view === currentView) return;
    setCurrentView(view);
  };

  return (
    <div className="flex min-h-screen bg-surface">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {currentView === 'dashboard' && <Dashboard />}
          {currentView === 'log' && <FoodLog />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
```

## 4. Node.js (Servidor y API)
El backend utiliza Express para gestionar las rutas y vincularse con n8n.

```javascript
import express from 'express';
const app = express();
const PORT = 5000;

app.use(express.json());

// Endpoint para generar planes de comida vinculando con n8n
app.post('/generate-meal-plan', async (req, res) => {
  const N8N_WEBHOOK_URL = 'http://localhost:5678/webhook/nutrition-plan';
  
  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json({ success: true, details: data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor encendido en http://localhost:${PORT}`);
});
```

---
*Este resumen refleja la arquitectura de la aplicación, permitiendo una experiencia de usuario fluida y automatizada.*

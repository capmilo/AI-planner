# AI Planner - Planificador de Proyectos de IA

Una aplicación web moderna para planificar proyectos de IA de forma visual y colaborativa, combinando un espacio para diseñar flujos y un chat con un agente de IA integrado.

## 🚀 Características

### ✨ Funcionalidades Principales

- **Gestión de Proyectos**: Crear, editar y eliminar proyectos de IA
- **Tablero de Flujos Visual**: Diseñar flujos de trabajo con nodos conectables
- **Chat con IA Integrado**: Asistente inteligente para planificación y consultas
- **Almacenamiento Local**: Persistencia de datos en el navegador
- **Analytics Avanzados**: Métricas y insights del proyecto
- **Notificaciones**: Sistema de feedback visual para el usuario
- **Animaciones**: Transiciones suaves y efectos visuales
- **Interfaz Moderna**: Diseño limpio y responsivo con Tailwind CSS

### 🎯 Características del Tablero de Flujos

- **Nodos Personalizados**: 8 tipos diferentes de nodos (Tarea, Decisión, Entrada, Salida, Proceso, Acción, Objetivo, Inicio/Fin)
- **Diseño Visual Mejorado**: Nodos con iconos, colores y estilos únicos
- **Edición Avanzada**: Panel de edición con campos específicos por tipo de nodo
- **Duración Estimada**: Campo para estimar tiempo de tareas
- **Conexiones Inteligentes**: Múltiples puntos de conexión para decisiones
- **Mini-mapa Interactivo**: Navegación visual del flujo completo
- **Controles Avanzados**: Zoom, pan y ajuste automático de vista

### 💬 Chat con IA

- **Integración Real con OpenAI**: API GPT-3.5-turbo para respuestas inteligentes
- **Contexto del Proyecto**: El asistente conoce tu proyecto y herramientas
- **Respuestas Especializadas**: Ayuda específica para planificación de IA
- **Modo Demo**: Funciona sin API key con respuestas simuladas
- **Indicador de Estado**: Muestra si la API está conectada
- **Interfaz Moderna**: Chat con animaciones y feedback visual

## 🛠️ Tecnologías Utilizadas

- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático
- **Vite** - Bundler y servidor de desarrollo
- **React Flow** - Librería para diagramas de flujo
- **Tailwind CSS** - Framework de estilos
- **Lucide React** - Iconos modernos
- **LocalStorage** - Persistencia de datos

## 📦 Instalación

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd AI-planner
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

## 🚀 Uso

### Crear un Nuevo Proyecto

1. En la página principal, haz clic en "Crear Nuevo Proyecto"
2. Completa los campos requeridos:
   - **Nombre del Proyecto**: Identificador del proyecto
   - **Objetivo**: Descripción del objetivo principal
   - **Herramientas**: Lista de tecnologías a utilizar
3. Haz clic en "Crear Proyecto"

### Trabajar con el Tablero de Flujos

1. **Agregar Nodos**: Haz clic en "Agregar Paso" en el panel superior
2. **Mover Nodos**: Arrastra los nodos para reposicionarlos
3. **Conectar Nodos**: Arrastra desde los puntos de conexión de un nodo a otro
4. **Editar Nodos**: Haz clic en un nodo para editar su contenido
5. **Eliminar Nodos**: Selecciona un nodo y haz clic en "Eliminar"

### Usar el Chat con IA

1. Cambia a la pestaña "Chat con IA"
2. Escribe tu pregunta o consulta
3. El asistente responderá basándose en el contexto de tu proyecto
4. Puedes preguntar sobre:
   - Planificación de pasos
   - Sugerencias de herramientas
   - Resolución de problemas
   - Optimización de flujos
   - Conceptos de IA y machine learning

### Ver Analytics del Proyecto

1. Cambia a la pestaña "Analytics"
2. Revisa las métricas del proyecto:
   - Total de nodos y conexiones
   - Distribución de tipos de nodos
   - Complejidad del proyecto
   - Timeline de modificaciones
   - Recomendaciones automáticas

### Configurar el Proyecto

1. Haz clic en "Configuración" en la barra superior
2. Edita los detalles del proyecto
3. Agrega o elimina herramientas
4. Guarda los cambios

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── CreateProjectModal.tsx
│   ├── FlowBoard.tsx
│   ├── ChatPanel.tsx
│   └── ProjectSettings.tsx
├── context/            # Contexto de React
│   └── ProjectContext.tsx
├── pages/              # Páginas principales
│   ├── Home.tsx
│   └── ProjectPage.tsx
├── types/              # Definiciones de tipos TypeScript
│   └── index.ts
├── App.tsx             # Componente principal
├── main.tsx           # Punto de entrada
└── index.css          # Estilos globales
```

## 🔧 Configuración de OpenAI (Opcional)

Para integrar con la API real de OpenAI:

1. Copia el archivo `env.example` a `.env`:
   ```bash
   cp env.example .env
   ```

2. Edita el archivo `.env` y agrega tu clave de API:
   ```
   VITE_OPENAI_API_KEY=tu_clave_aqui
   ```

3. Obtén tu clave de API desde: https://platform.openai.com/api-keys

4. Reinicia el servidor de desarrollo

**Nota**: La aplicación funciona perfectamente sin API key en modo demo

## 🎨 Personalización

### Colores y Temas

Los colores se pueden personalizar editando `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Personaliza los colores primarios
      }
    }
  }
}
```

### Tipos de Nodos

Puedes agregar nuevos tipos de nodos modificando el componente `FlowBoard.tsx` y agregando los estilos correspondientes.

## 🚀 Despliegue

### Build para Producción

```bash
npm run build
# o
yarn build
```

### Desplegar en Vercel

1. Conecta tu repositorio a Vercel
2. Vercel detectará automáticamente que es un proyecto Vite
3. El despliegue se realizará automáticamente

### Desplegar en Netlify

1. Sube el código a GitHub
2. Conecta el repositorio a Netlify
3. Configura el comando de build: `npm run build`
4. Configura el directorio de publicación: `dist`

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisa la documentación
2. Busca en los issues existentes
3. Crea un nuevo issue con detalles del problema

## 🎯 Roadmap

- [ ] Integración real con OpenAI API
- [ ] Exportación de flujos a PDF/PNG
- [ ] Colaboración en tiempo real
- [ ] Plantillas de proyectos predefinidas
- [ ] Integración con GitHub/GitLab
- [ ] Notificaciones y recordatorios
- [ ] Métricas y analytics del proyecto

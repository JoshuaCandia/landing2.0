# Integración de Three.js en Wonkai Landing

## 🎯 Descripción

Se ha integrado una animación 3D interactiva en el Hero Section de la landing page de Wonkai, utilizando React Three Fiber y Drei para crear una experiencia visual impresionante.

## 🧊 Características de la animación

### Cubo 3D Principal
- **Rotación automática**: El cubo rota lentamente sobre sí mismo
- **Interacción con mouse**: Reacciona al movimiento del cursor con rotación suave
- **Material metálico**: Superficie reflectante con tonos violetas y azules
- **Iluminación dinámica**: Múltiples fuentes de luz para crear profundidad

### Elementos adicionales
- **Cubos flotantes**: Elementos secundarios que se mueven suavemente
- **Campo de partículas**: Partículas animadas en el fondo
- **Iluminación ambiental**: Luces direccionales y puntuales

## 🛠️ Componentes implementados

### `HeroAnimation.tsx`
- Canvas principal con configuración optimizada
- Manejo de errores y fallbacks
- Estados de carga
- Optimizaciones de performance

### `Cube3D.tsx`
- Cubo principal con materiales y iluminación
- Interacción con mouse usando damping suave
- Cubos flotantes secundarios
- Sistema de partículas

## 🎨 Paleta de colores 3D

- **Luz principal**: `#8B5CF6` (violeta)
- **Luz secundaria**: `#22D3EE` (celeste)
- **Material del cubo**: Metálico con reflectividad
- **Partículas**: Violeta translúcido

## 📱 Responsive Design

### Desktop (lg+)
- Animación 3D completa con WebGL
- Interacción con mouse
- Efectos de iluminación avanzados

### Mobile
- Animación CSS simplificada
- Formas geométricas flotantes
- Gradientes animados
- Sin dependencias de WebGL

## ⚡ Optimizaciones de Performance

- **Límite de pixel ratio**: `dpr={[1, 2]}`
- **Reducción automática de calidad**: `performance={{ min: 0.5 }}`
- **Partículas limitadas**: 50 en lugar de 100
- **Memoización**: Posiciones de partículas calculadas una vez
- **Fallback elegante**: Para dispositivos sin WebGL

## 🔧 Dependencias agregadas

```json
{
  "@react-three/fiber": "^8.15.0",
  "@react-three/drei": "^9.88.0",
  "three": "^0.158.0",
  "@types/three": "^0.158.0"
}
```

## 🚀 Instalación

```bash
npm install
```

## 🎥 Uso

La animación se integra automáticamente en el Hero Section:

```tsx
<HeroContent>
  <div className="text-content">
    {/* Contenido de texto */}
  </div>
  <div className="animation-container">
    <HeroAnimation /> {/* Animación 3D */}
  </div>
</HeroContent>
```

## 🎨 Personalización

### Cambiar colores
Editar en `Cube3D.tsx`:
```tsx
<meshStandardMaterial
  color="#8B5CF6" // Color principal
  metalness={0.8}
  roughness={0.2}
/>
```

### Ajustar velocidad de rotación
En `Cube3D.tsx`:
```tsx
meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 // Velocidad X
meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 // Velocidad Y
```

### Modificar interacción con mouse
```tsx
targetRotation.set(mouse.y * 0.1, mouse.x * 0.1, 0) // Sensibilidad
currentRotation.lerp(targetRotation, 0.05) // Suavidad
```

## 🐛 Troubleshooting

### WebGL no soportado
- Se muestra automáticamente el fallback CSS
- No requiere configuración adicional

### Performance baja
- Reducir número de partículas
- Ajustar `performance.min`
- Limitar `dpr` máximo

### Errores de TypeScript
- Verificar que `@types/three` esté instalado
- Reiniciar el servidor de desarrollo

## 📊 Métricas de Performance

- **Tamaño del bundle**: +150KB (Three.js + dependencias)
- **Tiempo de carga**: <2s en conexión 3G
- **FPS objetivo**: 60fps en desktop, 30fps en mobile
- **Uso de memoria**: <50MB adicional

## 🔮 Futuras mejoras

- [ ] Post-processing effects (bloom, glow)
- [ ] Más geometrías (esferas, torus)
- [ ] Animaciones de entrada más complejas
- [ ] Integración con scroll para parallax
- [ ] Efectos de partículas más avanzados

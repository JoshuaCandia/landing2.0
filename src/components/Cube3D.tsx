import { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { MeshStandardMaterial, TextureLoader, RepeatWrapping, CanvasTexture } from 'three'
import { RoundedBox } from '@react-three/drei'
import type { Group } from 'three'

interface CubeletProps {
  position: [number, number, number]
  x: number
  y: number
  z: number
  materialFaces: {
    right: boolean
    left: boolean
    top: boolean
    bottom: boolean
    front: boolean
    back: boolean
  }
}

interface LayerRotation {
  axis: 'x' | 'y' | 'z'
  layer: number
  progress: number
  isAnimating: boolean
}

// Función de easing para suavizar las rotaciones (ease in-out)
function easeInOutCubic(t: number): number {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2
}

const FACE_MATERIALS = {
  right: { 
    color: '#aaaaaa', 
    metalness: 1.0, 
    roughness: 0.05,
    pattern: 'mirror' // Espejo blanco brillante
  },
  left: { 
    color: '#aaaaaa', 
    metalness: 0.6, 
    roughness: 0.5,
    pattern: 'brushed' // Líneas horizontales
  },
  top: { 
    color: '#aaaaaa', 
    metalness: 0.4, 
    roughness: 0.7,
    pattern: 'dots' // Puntos grandes
  },
  bottom: { 
    color: '#aaaaaa', 
    metalness: 0.5, 
    roughness: 0.6,
    pattern: 'carbon' // Diamantes
  },
  front: { 
    color: '#aaaaaa', 
    metalness: 0.3, 
    roughness: 0.8,
    pattern: 'diagonal' // Líneas diagonales
  },
  back: { 
    color: '#aaaaaa', 
    metalness: 0.5, 
    roughness: 0.6,
    pattern: 'grid' // Rejilla gruesa
  }
}

// Función para crear texturas procedurales
function createProceduralTexture(pattern: string): CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')!
  
  ctx.fillStyle = '#aaaaaa'
  ctx.fillRect(0, 0, 512, 512)
  
  switch (pattern) {
    case 'dots':
      // Patrón de puntos más visible
      ctx.fillStyle = '#aaaaaa'
      for (let i = 0; i < 512; i += 40) {
        for (let j = 0; j < 512; j += 40) {
          ctx.beginPath()
          ctx.arc(i + 20, j + 20, 8, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      break
      
    case 'grid':
      // Rejilla más marcada
      ctx.strokeStyle = '#aaaaaa'
      ctx.lineWidth = 3
      for (let i = 0; i < 512; i += 64) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, 512)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(512, i)
        ctx.stroke()
      }
      break
      
    case 'carbon':
      // Fibra de carbono más visible
      ctx.fillStyle = '#aaaaaa'
      for (let i = 0; i < 512; i += 16) {
        for (let j = 0; j < 512; j += 16) {
          if ((i + j) % 32 === 0) {
            ctx.fillRect(i, j, 8, 8)
          }
        }
      }
      // Añadir líneas diagonales
      ctx.strokeStyle = '#aaaaaa'
      ctx.lineWidth = 1
      for (let i = 0; i < 512; i += 32) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i + 32, 32)
        ctx.stroke()
      }
      break
      
    case 'brushed':
      // Metal cepillado más contrastado
      for (let i = 0; i < 512; i++) {
        const brightness = 255 - Math.floor(Math.random() * 50) - 25
        ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`
        ctx.fillRect(0, i, 512, 1)
      }
      break
  }
  
  const texture = new CanvasTexture(canvas)
  texture.wrapS = RepeatWrapping
  texture.wrapT = RepeatWrapping
  return texture
}

export default function Cube3D() {
  const groupRef = useRef<Group>(null)
  const { gl } = useThree()
  
  const isDragging = useRef(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const rotation = useRef({ x: 0, y: 0 })
  const targetRotation = useRef({ x: 0, y: 0 })
  const autoRotation = useRef({ x: 0, y: 0, z: 0 })

  const handlePointerDown = (e: PointerEvent) => {
    isDragging.current = true
    dragStart.current = { x: e.clientX, y: e.clientY }
    
    // Capturar la posición actual del cubo (incluyendo rotación automática)
    if (groupRef.current) {
      targetRotation.current.x = groupRef.current.rotation.x
      targetRotation.current.y = groupRef.current.rotation.y
      currentRotation.current.x = groupRef.current.rotation.x
      currentRotation.current.y = groupRef.current.rotation.y
      rotation.current.x = groupRef.current.rotation.x
      rotation.current.y = groupRef.current.rotation.y
      
      // Resetear rotación automática
      autoRotation.current.x = 0
      autoRotation.current.y = 0
      autoRotation.current.z = 0
    }
    
    gl.domElement.style.cursor = 'grabbing'
  }

  const handlePointerMove = (e: PointerEvent) => {
    if (!isDragging.current) return
    
    const deltaX = e.clientX - dragStart.current.x
    const deltaY = e.clientY - dragStart.current.y
    
    targetRotation.current = {
      x: rotation.current.x + deltaY * 0.005,
      y: rotation.current.y + deltaX * 0.005
    }
  }

  const handlePointerUp = () => {
    isDragging.current = false
    gl.domElement.style.cursor = 'grab'
  }

  // Configurar event listeners
  useMemo(() => {
    const canvas = gl.domElement
    canvas.style.cursor = 'grab'
    
    const down = (e: PointerEvent) => handlePointerDown(e)
    const move = (e: PointerEvent) => handlePointerMove(e)
    const up = () => handlePointerUp()
    
    canvas.addEventListener('pointerdown', down)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    
    return () => {
      canvas.removeEventListener('pointerdown', down)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
  }, [gl.domElement])

  const currentRotation = useRef({ x: 0, y: 0 })

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime
      
      // Rotación automática continua cuando no se está arrastrando
      if (!isDragging.current) {
        autoRotation.current.x += 0.003
        autoRotation.current.y += 0.005
        autoRotation.current.z += 0.002
        
        // Interpolación suave hacia la rotación objetivo + rotación automática
        const lerpFactor = 0.1
        currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * lerpFactor
        currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * lerpFactor
        
        groupRef.current.rotation.x = currentRotation.current.x + autoRotation.current.x
        groupRef.current.rotation.y = currentRotation.current.y + autoRotation.current.y
        groupRef.current.rotation.z = autoRotation.current.z
      } else {
        // Durante el arrastre, interpolación sin saltos
        const lerpFactor = 0.15
        currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * lerpFactor
        currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * lerpFactor
        
        groupRef.current.rotation.x = currentRotation.current.x
        groupRef.current.rotation.y = currentRotation.current.y
        groupRef.current.rotation.z = 0
      }
    }
  })

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
      <directionalLight position={[-5, -5, -3]} intensity={0.8} />
      <pointLight position={[0, 0, 8]} intensity={1.2} color="#aaaaaa" />
      <spotLight position={[5, 5, 5]} intensity={1.0} angle={0.3} penumbra={1} />
      <pointLight position={[-5, 5, 3]} intensity={0.9} color="#4da6ff" />
      <pointLight position={[3, -5, 3]} intensity={0.7} color="#ff6b6b" />

      <group ref={groupRef} scale={1}>
        <RubiksCube isDragging={isDragging.current} />
      </group>
    </>
  )
}

function RubiksCube({ isDragging }: { isDragging: boolean }) {
  const [layerRotation, setLayerRotation] = useState<LayerRotation | null>(null)
  const layerGroupRefs = useRef<{ [key: string]: Group }>({})
  
  // Mantener el estado de posiciones de cada cubelet
  const [cubeletPositions, setCubeletPositions] = useState(() => {
    const positions: { [key: string]: { x: number, y: number, z: number } } = {}
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          positions[`${x}-${y}-${z}`] = { x, y, z }
        }
      }
    }
    return positions
  })

  // Mantener el mapeo de materiales para cada cubelet
  const [cubeletMaterials, setCubeletMaterials] = useState(() => {
    const materials: { [key: string]: { right: boolean, left: boolean, top: boolean, bottom: boolean, front: boolean, back: boolean } } = {}
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          materials[`${x}-${y}-${z}`] = {
            right: x === 1,
            left: x === -1,
            top: y === 1,
            bottom: y === -1,
            front: z === 1,
            back: z === -1
          }
        }
      }
    }
    return materials
  })

  // Generar rotación aleatoria de una cara
  const generateRandomRotation = () => {
    const axes: ('x' | 'y' | 'z')[] = ['x', 'y', 'z']
    const layers = [-1, 0, 1]
    const randomAxis = axes[Math.floor(Math.random() * axes.length)]
    const randomLayer = layers[Math.floor(Math.random() * layers.length)]
    
    return {
      axis: randomAxis,
      layer: randomLayer,
      progress: 0,
      isAnimating: true
    }
  }

  // Iniciar rotaciones aleatorias
  useEffect(() => {
    if (isDragging) return // No rotar mientras se arrastra

    const startRotation = () => {
      if (!isDragging && (!layerRotation || !layerRotation.isAnimating)) {
        setLayerRotation(generateRandomRotation())
      }
    }

    const interval = setInterval(() => {
      startRotation()
    }, 800 + Math.random() * 800) // Entre 0.8-1.6 segundos - más continuo

    return () => clearInterval(interval)
  }, [isDragging, layerRotation])

  // Animar la rotación
  useFrame(() => {
    if (!layerRotation || !layerRotation.isAnimating || isDragging) {
      // Resetear todas las rotaciones cuando se arrastra
      if (isDragging) {
        Object.values(layerGroupRefs.current).forEach(group => {
          if (group) group.rotation.set(0, 0, 0)
        })
      }
      return
    }

    const speed = 0.02 // Velocidad base del progreso (0-1)
    const newProgress = Math.min(layerRotation.progress + speed, 1) // Normalizado de 0 a 1
    const targetRotation = Math.PI / 2 // 90 grados

    const key = `${layerRotation.axis}-${layerRotation.layer}`
    const group = layerGroupRefs.current[key]

    if (group) {
      if (newProgress >= 1) {
        // Completar la rotación y actualizar posiciones
        group.rotation[layerRotation.axis] = 0
        
        // Actualizar las posiciones lógicas y materiales después de la rotación
        const newPositions = { ...cubeletPositions }
        const newMaterials = { ...cubeletMaterials }
        
        Object.keys(newPositions).forEach(key => {
          const [ox, oy, oz] = key.split('-').map(Number)
          const pos = newPositions[key]
          const mat = newMaterials[key]
          
          // Solo actualizar cubelets en la capa que rotó
          let shouldUpdate = false
          if (layerRotation.axis === 'x' && pos.x === layerRotation.layer) shouldUpdate = true
          if (layerRotation.axis === 'y' && pos.y === layerRotation.layer) shouldUpdate = true
          if (layerRotation.axis === 'z' && pos.z === layerRotation.layer) shouldUpdate = true
          
          if (shouldUpdate) {
            // Rotar las coordenadas 90 grados en el eje correspondiente
            if (layerRotation.axis === 'x') {
              const newY = -pos.z
              const newZ = pos.y
              newPositions[key] = { x: pos.x, y: newY, z: newZ }
              
              // Rotar los materiales también
              const newTop = mat.front
              const newBottom = mat.back
              const newFront = mat.bottom
              const newBack = mat.top
              newMaterials[key] = {
                ...mat,
                top: newTop,
                bottom: newBottom,
                front: newFront,
                back: newBack
              }
            } else if (layerRotation.axis === 'y') {
              const newX = pos.z
              const newZ = -pos.x
              newPositions[key] = { x: newX, y: pos.y, z: newZ }
              
              // Rotar los materiales también
              const newRight = mat.front
              const newLeft = mat.back
              const newFront = mat.left
              const newBack = mat.right
              newMaterials[key] = {
                ...mat,
                right: newRight,
                left: newLeft,
                front: newFront,
                back: newBack
              }
            } else if (layerRotation.axis === 'z') {
              const newX = -pos.y
              const newY = pos.x
              newPositions[key] = { x: newX, y: newY, z: pos.z }
              
              // Rotar los materiales también
              const newRight = mat.top
              const newLeft = mat.bottom
              const newTop = mat.left
              const newBottom = mat.right
              newMaterials[key] = {
                ...mat,
                right: newRight,
                left: newLeft,
                top: newTop,
                bottom: newBottom
              }
            }
          }
        })
        
        setCubeletPositions(newPositions)
        setCubeletMaterials(newMaterials)
        setLayerRotation({ ...layerRotation, progress: 1, isAnimating: false })
      } else {
        // Continuar animando con easing
        const easedProgress = easeInOutCubic(newProgress)
        const currentRotation = easedProgress * targetRotation
        
        group.rotation[layerRotation.axis] = currentRotation
        setLayerRotation({ ...layerRotation, progress: newProgress })
      }
    }
  })

  const cubelets = []
  const size = 0.98
  const gap = 0.03
  const offset = size + gap

  // Crear estructura para agrupar cubelets por capa
  const layers: { [key: string]: JSX.Element[] } = {}
  
  // Inicializar todas las capas
  const axes: ('x' | 'y' | 'z')[] = ['x', 'y', 'z']
  const layerValues = [-1, 0, 1]
  
  axes.forEach(axis => {
    layerValues.forEach(value => {
      layers[`${axis}-${value}`] = []
    })
  })

  // Distribuir cubelets en las capas
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        const originalKey = `${x}-${y}-${z}`
        const pos = cubeletPositions[originalKey]
        
        const cubelet = (
          <Cubelet
            key={originalKey}
            position={[pos.x * offset, pos.y * offset, pos.z * offset]}
            x={pos.x}
            y={pos.y}
            z={pos.z}
            originalX={x}
            originalY={y}
            originalZ={z}
          />
        )

        // Añadir a la capa que está rotando o a la estática
        if (layerRotation && layerRotation.isAnimating) {
          if (
            (layerRotation.axis === 'x' && pos.x === layerRotation.layer) ||
            (layerRotation.axis === 'y' && pos.y === layerRotation.layer) ||
            (layerRotation.axis === 'z' && pos.z === layerRotation.layer)
          ) {
            layers[`${layerRotation.axis}-${layerRotation.layer}`].push(cubelet)
          } else {
            cubelets.push(cubelet)
          }
        } else {
          cubelets.push(cubelet)
        }
      }
    }
  }

  return (
    <>
      {/* Cubelets estáticos */}
      {cubelets}
      
      {/* Capas rotatorias */}
      {axes.map(axis =>
        layerValues.map(layer => {
          const key = `${axis}-${layer}`
          const isActive = layerRotation && 
                          layerRotation.axis === axis && 
                          layerRotation.layer === layer &&
                          layerRotation.isAnimating
          
          return (
            <group
              key={key}
              ref={(ref) => {
                if (ref) layerGroupRefs.current[key] = ref
              }}
            >
              {isActive ? layers[key] : null}
            </group>
          )
        })
      )}
    </>
  )
}

function Cubelet({ position, x, y, z, originalX, originalY, originalZ }: CubeletProps) {
  const materials = useMemo(() => {
    const createMaterial = (
      props: { color: string, metalness: number, roughness: number, pattern: string }, 
      isVisible: boolean
    ) => {
      if (!isVisible) {
        return new MeshStandardMaterial({
          color: '#aaaaaa',
          metalness: 0.9,
          roughness: 0.15
        })
      }
      
      const material = new MeshStandardMaterial({
        color: props.color,
        metalness: props.metalness,
        roughness: props.roughness,
        emissive: '#aaaaaa',
        emissiveIntensity: 0
      })
      
      // Agregar textura procedural si no es espejo
      if (props.pattern !== 'mirror') {
        const texture = createProceduralTexture(props.pattern)
        material.map = texture
        material.normalMap = texture
        material.normalScale.set(1.0, 1.0)
      }
      
      return material
    }

    // Usar las coordenadas ORIGINALES para determinar qué material aplicar
    return [
      createMaterial(FACE_MATERIALS.right, originalX === 1),
      createMaterial(FACE_MATERIALS.left, originalX === -1),
      createMaterial(FACE_MATERIALS.top, originalY === 1),
      createMaterial(FACE_MATERIALS.bottom, originalY === -1),
      createMaterial(FACE_MATERIALS.front, originalZ === 1),
      createMaterial(FACE_MATERIALS.back, originalZ === -1)
    ]
  }, [originalX, originalY, originalZ])

  return (
    <RoundedBox
      args={[0.95, 0.95, 0.95]}
      position={position}
      radius={0.08}
      smoothness={4}
      material={materials}
      castShadow
      receiveShadow
    />
  )
}


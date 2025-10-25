import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { MeshStandardMaterial } from 'three'
import { RoundedBox } from '@react-three/drei'
import type { Group } from 'three'

interface CubeletProps {
  position: [number, number, number]
  x: number
  y: number
  z: number
}

const FACE_MATERIALS = {
  right: { color: '#000000', metalness: 1.0, roughness: 0.05 }, // Espejo negro
  left: { color: '#1a1a1a', metalness: 0.9, roughness: 0.2 }, // Metal oscuro mate
  top: { color: '#000000', metalness: 0.5, roughness: 0.5 }, // Semi-mate
  bottom: { color: '#0a0a0a', metalness: 0.8, roughness: 0.1 }, // Metal pulido
  front: { color: '#000000', metalness: 1.0, roughness: 0.0 }, // Espejo perfecto
  back: { color: '#1f1f1f', metalness: 0.7, roughness: 0.3 } // Metal con textura
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
    rotation.current = { ...targetRotation.current }
    
    // Sincronizar la rotación manual con la automática al empezar a arrastrar
    if (groupRef.current) {
      autoRotation.current.x = 0
      autoRotation.current.y = 0
      autoRotation.current.z = 0
      targetRotation.current.x = groupRef.current.rotation.x
      targetRotation.current.y = groupRef.current.rotation.y
      rotation.current.x = groupRef.current.rotation.x
      rotation.current.y = groupRef.current.rotation.y
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
      
      // Interpolación suave (lerp) para movimiento fluido
      const lerpFactor = 0.1
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * lerpFactor
      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * lerpFactor
      
      // Rotación automática continua cuando no se está arrastrando
      if (!isDragging.current) {
        autoRotation.current.x += 0.003
        autoRotation.current.y += 0.005
        autoRotation.current.z += 0.002
        
        groupRef.current.rotation.x = currentRotation.current.x + autoRotation.current.x
        groupRef.current.rotation.y = currentRotation.current.y + autoRotation.current.y
        groupRef.current.rotation.z = autoRotation.current.z
      } else {
        // Durante el arrastre, usar la rotación interpolada
        groupRef.current.rotation.x = currentRotation.current.x
        groupRef.current.rotation.y = currentRotation.current.y
        groupRef.current.rotation.z = 0
      }
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-5, -5, -3]} intensity={0.6} />
      <pointLight position={[0, 0, 8]} intensity={1.0} color="#ffffff" />
      <spotLight position={[5, 5, 5]} intensity={0.8} angle={0.3} penumbra={1} />
      <pointLight position={[-5, 5, 3]} intensity={0.7} color="#4da6ff" />

      <group ref={groupRef} scale={1}>
        <RubiksCube />
      </group>
    </>
  )
}

function RubiksCube() {
  const cubelets = []
  const size = 0.98
  const gap = 0.03
  const offset = size + gap

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        cubelets.push(
          <Cubelet
            key={`${x}-${y}-${z}`}
            position={[x * offset, y * offset, z * offset]}
            x={x}
            y={y}
            z={z}
          />
        )
      }
    }
  }

  return <>{cubelets}</>
}

function Cubelet({ position, x, y, z }: CubeletProps) {
  const materials = useMemo(() => {
    const createMaterial = (props: { color: string, metalness: number, roughness: number }, isVisible: boolean) => {
      if (!isVisible) {
        return new MeshStandardMaterial({
          color: '#000000',
          metalness: 0.9,
          roughness: 0.15
        })
      }
      return new MeshStandardMaterial({
        color: props.color,
        metalness: props.metalness,
        roughness: props.roughness,
        emissive: '#000000',
        emissiveIntensity: 0
      })
    }

    return [
      createMaterial(FACE_MATERIALS.right, x === 1),
      createMaterial(FACE_MATERIALS.left, x === -1),
      createMaterial(FACE_MATERIALS.top, y === 1),
      createMaterial(FACE_MATERIALS.bottom, y === -1),
      createMaterial(FACE_MATERIALS.front, z === 1),
      createMaterial(FACE_MATERIALS.back, z === -1)
    ]
  }, [x, y, z])

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


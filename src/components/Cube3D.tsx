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

const RUBIK_COLORS = {
  right: '#FF5722',
  left: '#FF9800',
  top: '#FFFFFF',
  bottom: '#FFEB3B',
  front: '#4CAF50',
  back: '#2196F3'
}

export default function Cube3D() {
  const groupRef = useRef<Group>(null)
  const { mouse } = useThree()

  const mouseInfluence = useMemo(() => ({ x: 0, y: 0 }), [])

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime

      mouseInfluence.x += (mouse.x * 0.5 - mouseInfluence.x) * 0.03
      mouseInfluence.y += (mouse.y * 0.5 - mouseInfluence.y) * 0.03

      groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.15 + mouseInfluence.y
      groupRef.current.rotation.y = t * 0.25 + mouseInfluence.x
      groupRef.current.rotation.z = Math.cos(t * 0.12) * 0.08
    }
  })

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} castShadow />
      <directionalLight position={[-5, -5, -3]} intensity={0.3} />
      <pointLight position={[0, 0, 8]} intensity={0.6} color="#ffffff" />
      <spotLight position={[5, 5, 5]} intensity={0.4} angle={0.3} penumbra={1} />

      <group ref={groupRef} scale={1.8}>
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
    const createMaterial = (color: string, isVisible: boolean) => {
      if (!isVisible) {
        return new MeshStandardMaterial({
          color: '#1a1a1a',
          metalness: 0.1,
          roughness: 0.8
        })
      }
      return new MeshStandardMaterial({
        color,
        metalness: 0.2,
        roughness: 0.3,
        emissive: color,
        emissiveIntensity: 0.1
      })
    }

    return [
      createMaterial(RUBIK_COLORS.right, x === 1),
      createMaterial(RUBIK_COLORS.left, x === -1),
      createMaterial(RUBIK_COLORS.top, y === 1),
      createMaterial(RUBIK_COLORS.bottom, y === -1),
      createMaterial(RUBIK_COLORS.front, z === 1),
      createMaterial(RUBIK_COLORS.back, z === -1)
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


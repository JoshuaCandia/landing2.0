import { useRef, useState, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Mesh, Vector3, Group } from 'three'

export default function Cube3D() {
  const groupRef = useRef<Group>(null)
  const [hovered, setHovered] = useState(false)
  const { viewport, mouse } = useThree()

  // Smooth mouse interaction with manual damping
  const targetRotation = useMemo(() => new Vector3(), [])
  const currentRotation = useMemo(() => new Vector3(), [])

  useFrame((state) => {
    if (groupRef.current) {
      // Auto rotation - slower and more subtle like Resend
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.1
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15

      // Mouse interaction with smooth damping
      targetRotation.set(mouse.y * 0.05, mouse.x * 0.05, 0)
      currentRotation.lerp(targetRotation, 0.02)
      groupRef.current.rotation.x += currentRotation.x
      groupRef.current.rotation.y += currentRotation.y
    }
  })

  return (
    <>
      {/* Lighting setup - more subtle like Resend */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[2, 2, 5]}
        intensity={0.8}
        color="#8B5CF6"
      />
      <directionalLight
        position={[-2, -2, -5]}
        intensity={0.4}
        color="#22D3EE"
      />

      {/* Main cube group - like Resend's Rubik's cube */}
      <group
        ref={groupRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.05 : 1}
      >
        {/* Rubik's cube structure */}
        <RubiksCube />
      </group>
    </>
  )
}

function RubiksCube() {
  const cubeSize = 0.6
  const spacing = 0.02
  
  // Create 3x3x3 cube structure like Resend
  const cubes = []
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        const position = [
          x * (cubeSize + spacing),
          y * (cubeSize + spacing), 
          z * (cubeSize + spacing)
        ] as [number, number, number]
        
        cubes.push(
          <Cubelet 
            key={`${x}-${y}-${z}`}
            position={position}
            colors={getCubeletColors(x, y, z)}
          />
        )
      }
    }
  }
  
  return <>{cubes}</>
}

function Cubelet({ position, colors }: { position: [number, number, number], colors: string[] }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[0.6, 0.6, 0.6]} />
      <meshStandardMaterial
        color={colors[0]}
        metalness={0.3}
        roughness={0.4}
      />
    </mesh>
  )
}

function getCubeletColors(x: number, y: number, z: number): string[] {
  // Simplified color scheme like Resend's cube
  const colors = ['#8B5CF6', '#22D3EE', '#F59E0B', '#EF4444', '#10B981', '#6366F1']
  
  if (x === 1) return [colors[0]] // Right face - purple
  if (x === -1) return [colors[1]] // Left face - cyan  
  if (y === 1) return [colors[2]] // Top face - orange
  if (y === -1) return [colors[3]] // Bottom face - red
  if (z === 1) return [colors[4]] // Front face - green
  if (z === -1) return [colors[5]] // Back face - indigo
  
  return [colors[0]] // Default purple
}


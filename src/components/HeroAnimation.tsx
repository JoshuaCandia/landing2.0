import { Canvas } from '@react-three/fiber'
import { Suspense, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Cube3D from './Cube3D'

export default function HeroAnimation() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleCanvasCreated = useCallback(() => {
    setIsLoaded(true)
  }, [])

  const handleCanvasError = useCallback(() => {
    setHasError(true)
  }, [])

  // Fallback component for when WebGL is not supported
  if (hasError) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full h-full min-h-[400px] lg:min-h-[600px]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-primary/20 rounded-2xl border border-white/10">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-2xl animate-pulse shadow-lg shadow-primary/25"></div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full h-full min-h-[400px] lg:min-h-[600px]"
    >
      {/* Fallback gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/10 rounded-2xl" />
      
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        onCreated={handleCanvasCreated}
        onError={handleCanvasError}
        className="absolute inset-0"
        style={{ background: 'transparent' }}
        dpr={[1, 2]} // Limit pixel ratio for better performance
        performance={{ min: 0.5 }} // Reduce quality if frame rate drops
      >
        <Suspense fallback={null}>
          <Cube3D />
        </Suspense>
      </Canvas>

      {/* Loading state */}
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </motion.div>
      )}

      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
    </motion.div>
  )
}

import { motion } from 'framer-motion'
import HeroAnimation from './HeroAnimation'

export default function HeroContent() {
  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
      {/* Text Content */}
      <div className="space-y-8">
      {/* Logo/Brand */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-4">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Wonkai
          </span>
        </h1>
      </motion.div>

      {/* Main Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold leading-tight"
      >
        Construimos software que{' '}
        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          impulsa el futuro
        </span>
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-lg sm:text-xl lg:text-2xl text-text/80 max-w-4xl mx-auto leading-relaxed"
      >
        Wonkai es una software factory enfocada en crear productos digitales escalables, 
        con inteligencia y diseño.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
      >
        <motion.a
          href="#proyectos"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-primary/25 transition-all duration-300"
        >
          Ver proyectos
        </motion.a>
        
        <motion.a
          href="#contacto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary hover:text-white transition-all duration-300"
        >
          Contactanos
        </motion.a>
      </motion.div>

      {/* Tech Stack Icons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="pt-12"
      >
        <p className="text-text/60 mb-6">Tecnologías que dominamos</p>
        <div className="flex flex-wrap justify-center gap-6 text-2xl">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
            <span className="text-primary">React</span>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
            <span className="text-secondary">Node.js</span>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
            <span className="text-primary">AI/ML</span>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
            <span className="text-secondary">Mobile</span>
          </div>
        </div>
      </motion.div>
      </div>

      {/* 3D Animation - Desktop */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="hidden lg:block"
      >
        <HeroAnimation />
      </motion.div>

      {/* Mobile Animation - Simplified */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="lg:hidden mt-8"
      >
        <div className="relative w-full h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl border border-white/10 overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 animate-gradient"></div>
          
          {/* Floating geometric shapes */}
          <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-primary/40 rounded-lg rotate-45 animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-secondary/40 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-primary/60 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/4 right-1/3 w-10 h-10 bg-secondary/30 rounded-lg rotate-12 animate-float" style={{ animationDelay: '0.5s' }}></div>
          
          {/* Central focus element */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl animate-pulse shadow-lg shadow-primary/25"></div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

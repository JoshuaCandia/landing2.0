import { motion } from 'framer-motion'

export default function AboutContent() {
  return (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold">
          Sobre{' '}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            nosotros
          </span>
        </h2>
        
        <div className="space-y-4 text-lg text-text/80 leading-relaxed">
          <p>
            En Wonkai, creemos que la tecnología debe ser una herramienta que impulse 
            el crecimiento y la innovación. Nuestra filosofía se centra en crear 
            soluciones digitales que no solo cumplan con los requisitos técnicos, 
            sino que superen las expectativas de nuestros clientes.
          </p>
          
          <p>
            Combinamos años de experiencia en desarrollo de software con las últimas 
            tecnologías de inteligencia artificial para entregar productos que 
            realmente marquen la diferencia en el mercado.
          </p>
          
          <p>
            Nuestro enfoque se basa en la colaboración estrecha con nuestros clientes, 
            entendiendo sus necesidades únicas y transformando sus ideas en realidad 
            digital.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-6 pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="text-3xl font-bold text-primary">50+</div>
            <div className="text-text/60">Proyectos completados</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="text-3xl font-bold text-secondary">3+</div>
            <div className="text-text/60">Años de experiencia</div>
          </motion.div>
        </div>
      </motion.div>

      {/* Visual Element */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="relative"
      >
        {/* Circuit Board Illustration */}
        <div className="relative bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 border border-white/10">
          {/* Circuit Lines */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <svg className="w-full h-full" viewBox="0 0 400 300">
              {/* Horizontal lines */}
              <line x1="50" y1="80" x2="350" y2="80" stroke="#8B5CF6" strokeWidth="2" opacity="0.3" />
              <line x1="50" y1="150" x2="350" y2="150" stroke="#22D3EE" strokeWidth="2" opacity="0.3" />
              <line x1="50" y1="220" x2="350" y2="220" stroke="#8B5CF6" strokeWidth="2" opacity="0.3" />
              
              {/* Vertical lines */}
              <line x1="100" y1="30" x2="100" y2="270" stroke="#22D3EE" strokeWidth="2" opacity="0.3" />
              <line x1="200" y1="30" x2="200" y2="270" stroke="#8B5CF6" strokeWidth="2" opacity="0.3" />
              <line x1="300" y1="30" x2="300" y2="270" stroke="#22D3EE" strokeWidth="2" opacity="0.3" />
              
              {/* Connection points */}
              <circle cx="100" cy="80" r="4" fill="#8B5CF6" opacity="0.6" />
              <circle cx="200" cy="80" r="4" fill="#22D3EE" opacity="0.6" />
              <circle cx="300" cy="80" r="4" fill="#8B5CF6" opacity="0.6" />
              <circle cx="100" cy="150" r="4" fill="#22D3EE" opacity="0.6" />
              <circle cx="200" cy="150" r="4" fill="#8B5CF6" opacity="0.6" />
              <circle cx="300" cy="150" r="4" fill="#22D3EE" opacity="0.6" />
              <circle cx="100" cy="220" r="4" fill="#8B5CF6" opacity="0.6" />
              <circle cx="200" cy="220" r="4" fill="#22D3EE" opacity="0.6" />
              <circle cx="300" cy="220" r="4" fill="#8B5CF6" opacity="0.6" />
            </svg>
          </div>
          
          {/* Floating Elements */}
          <div className="relative z-10 space-y-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Inteligencia Artificial</span>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <span className="text-sm font-medium">Desarrollo Web</span>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <span className="text-sm font-medium">Aplicaciones Mobile</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

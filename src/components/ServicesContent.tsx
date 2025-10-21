import { motion } from 'framer-motion'

const services = [
  {
    id: 1,
    title: 'Desarrollo Web',
    description: 'Aplicaciones web modernas y escalables con las últimas tecnologías.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    features: ['React', 'Next.js', 'TypeScript', 'Responsive Design']
  },
  {
    id: 2,
    title: 'Aplicaciones Mobile',
    description: 'Apps nativas e híbridas para iOS y Android con excelente UX.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    features: ['React Native', 'Flutter', 'iOS', 'Android']
  },
  {
    id: 3,
    title: 'Integraciones con IA',
    description: 'Implementamos inteligencia artificial para automatizar procesos.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    features: ['Machine Learning', 'Chatbots', 'Automatización', 'Análisis de datos']
  },
  {
    id: 4,
    title: 'Consultoría Tecnológica',
    description: 'Asesoramiento estratégico para optimizar tu infraestructura digital.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    features: ['Arquitectura', 'DevOps', 'Seguridad', 'Optimización']
  }
]

export default function ServicesContent() {
  return (
    <div className="space-y-16">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
          Nuestros{' '}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            servicios
          </span>
        </h2>
        <p className="text-lg text-text/80 max-w-2xl mx-auto">
          Ofrecemos soluciones completas para transformar tu idea en realidad digital
        </p>
      </motion.div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="group"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 h-full hover:border-primary/50 transition-all duration-300 hover:bg-white/10">
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-text/80 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: featureIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-2"
                    >
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span className="text-sm text-text/70">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Process Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 lg:p-12 border border-white/10"
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            Nuestro proceso de trabajo
          </h3>
          <p className="text-text/80 max-w-2xl mx-auto">
            Seguimos una metodología probada para garantizar el éxito de tu proyecto
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 lg:gap-8">
          {[
            { step: '01', title: 'Análisis', description: 'Entendemos tus necesidades y objetivos' },
            { step: '02', title: 'Diseño', description: 'Creamos la arquitectura y experiencia ideal' },
            { step: '03', title: 'Desarrollo', description: 'Implementamos la solución con las mejores prácticas' },
            { step: '04', title: 'Lanzamiento', description: 'Desplegamos y optimizamos tu producto' }
          ].map((process, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto">
                {process.step}
              </div>
              <h4 className="font-semibold mb-2">{process.title}</h4>
              <p className="text-sm text-text/70">{process.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

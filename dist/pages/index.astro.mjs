/* empty css                                 */
import { c as createAstro, a as createComponent, b as addAttribute, r as renderHead, d as renderSlot, e as renderTemplate, m as maybeRenderHead, f as renderComponent } from '../chunks/astro/server_B90z6s2c.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { motion } from 'framer-motion';
import { useThree, useFrame, Canvas } from '@react-three/fiber';
import { useRef, useMemo, useState, useCallback, Suspense } from 'react';
import { MeshStandardMaterial } from 'three';
import { RoundedBox } from '@react-three/drei';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://wonkai.com");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="es" class="dark"> <head><meta charset="UTF-8"><meta name="description" content="Wonkai - Software Factory especializada en desarrollo de software personalizado con IA"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body class="bg-background text-text font-sans antialiased"> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "C:/Users/diaza/OneDrive/Escritorio/Adri/Wonkai/repositorios/landing2.0/src/layouts/Layout.astro", void 0);

const FACE_MATERIALS = {
  right: { color: "#000000", metalness: 1, roughness: 0.05 },
  // Espejo negro
  left: { color: "#1a1a1a", metalness: 0.9, roughness: 0.2 },
  // Metal oscuro mate
  top: { color: "#000000", metalness: 0.5, roughness: 0.5 },
  // Semi-mate
  bottom: { color: "#0a0a0a", metalness: 0.8, roughness: 0.1 },
  // Metal pulido
  front: { color: "#000000", metalness: 1, roughness: 0 },
  // Espejo perfecto
  back: { color: "#1f1f1f", metalness: 0.7, roughness: 0.3 }
  // Metal con textura
};
function Cube3D() {
  const groupRef = useRef(null);
  const { gl } = useThree();
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const rotation = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const autoRotation = useRef({ x: 0, y: 0, z: 0 });
  const handlePointerDown = (e) => {
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
    rotation.current = { ...targetRotation.current };
    if (groupRef.current) {
      autoRotation.current.x = 0;
      autoRotation.current.y = 0;
      autoRotation.current.z = 0;
      targetRotation.current.x = groupRef.current.rotation.x;
      targetRotation.current.y = groupRef.current.rotation.y;
      rotation.current.x = groupRef.current.rotation.x;
      rotation.current.y = groupRef.current.rotation.y;
    }
    gl.domElement.style.cursor = "grabbing";
  };
  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - dragStart.current.x;
    const deltaY = e.clientY - dragStart.current.y;
    targetRotation.current = {
      x: rotation.current.x + deltaY * 5e-3,
      y: rotation.current.y + deltaX * 5e-3
    };
  };
  const handlePointerUp = () => {
    isDragging.current = false;
    gl.domElement.style.cursor = "grab";
  };
  useMemo(() => {
    const canvas = gl.domElement;
    canvas.style.cursor = "grab";
    const down = (e) => handlePointerDown(e);
    const move = (e) => handlePointerMove(e);
    const up = () => handlePointerUp();
    canvas.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      canvas.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [gl.domElement]);
  const currentRotation = useRef({ x: 0, y: 0 });
  useFrame((state) => {
    if (groupRef.current) {
      state.clock.elapsedTime;
      const lerpFactor = 0.1;
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * lerpFactor;
      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * lerpFactor;
      if (!isDragging.current) {
        autoRotation.current.x += 3e-3;
        autoRotation.current.y += 5e-3;
        autoRotation.current.z += 2e-3;
        groupRef.current.rotation.x = currentRotation.current.x + autoRotation.current.x;
        groupRef.current.rotation.y = currentRotation.current.y + autoRotation.current.y;
        groupRef.current.rotation.z = autoRotation.current.z;
      } else {
        groupRef.current.rotation.x = currentRotation.current.x;
        groupRef.current.rotation.y = currentRotation.current.y;
        groupRef.current.rotation.z = 0;
      }
    }
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("ambientLight", { intensity: 0.5 }),
    /* @__PURE__ */ jsx("directionalLight", { position: [10, 10, 5], intensity: 1.2, castShadow: true }),
    /* @__PURE__ */ jsx("directionalLight", { position: [-5, -5, -3], intensity: 0.6 }),
    /* @__PURE__ */ jsx("pointLight", { position: [0, 0, 8], intensity: 1, color: "#ffffff" }),
    /* @__PURE__ */ jsx("spotLight", { position: [5, 5, 5], intensity: 0.8, angle: 0.3, penumbra: 1 }),
    /* @__PURE__ */ jsx("pointLight", { position: [-5, 5, 3], intensity: 0.7, color: "#4da6ff" }),
    /* @__PURE__ */ jsx("group", { ref: groupRef, scale: 1, children: /* @__PURE__ */ jsx(RubiksCube, {}) })
  ] });
}
function RubiksCube() {
  const cubelets = [];
  const size = 0.98;
  const gap = 0.03;
  const offset = size + gap;
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        cubelets.push(
          /* @__PURE__ */ jsx(
            Cubelet,
            {
              position: [x * offset, y * offset, z * offset],
              x,
              y,
              z
            },
            `${x}-${y}-${z}`
          )
        );
      }
    }
  }
  return /* @__PURE__ */ jsx(Fragment, { children: cubelets });
}
function Cubelet({ position, x, y, z }) {
  const materials = useMemo(() => {
    const createMaterial = (props, isVisible) => {
      if (!isVisible) {
        return new MeshStandardMaterial({
          color: "#000000",
          metalness: 0.9,
          roughness: 0.15
        });
      }
      return new MeshStandardMaterial({
        color: props.color,
        metalness: props.metalness,
        roughness: props.roughness,
        emissive: "#000000",
        emissiveIntensity: 0
      });
    };
    return [
      createMaterial(FACE_MATERIALS.right, x === 1),
      createMaterial(FACE_MATERIALS.left, x === -1),
      createMaterial(FACE_MATERIALS.top, y === 1),
      createMaterial(FACE_MATERIALS.bottom, y === -1),
      createMaterial(FACE_MATERIALS.front, z === 1),
      createMaterial(FACE_MATERIALS.back, z === -1)
    ];
  }, [x, y, z]);
  return /* @__PURE__ */ jsx(
    RoundedBox,
    {
      args: [0.95, 0.95, 0.95],
      position,
      radius: 0.08,
      smoothness: 4,
      material: materials,
      castShadow: true,
      receiveShadow: true
    }
  );
}

function HeroAnimation() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const handleCanvasCreated = useCallback(() => {
    setIsLoaded(true);
  }, []);
  const handleCanvasError = useCallback(() => {
    setHasError(true);
  }, []);
  if (hasError) {
    return /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 1 },
        className: "relative w-full h-full min-h-[400px] lg:min-h-[600px]",
        children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-primary/20 rounded-2xl border border-white/10", children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-2xl animate-pulse shadow-lg shadow-primary/25" }) }) })
      }
    );
  }
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 1 },
      className: "relative w-full h-[500px] lg:h-[600px]",
      children: [
        /* @__PURE__ */ jsx(
          Canvas,
          {
            camera: { position: [0, 0, 8], fov: 60 },
            onCreated: handleCanvasCreated,
            onError: handleCanvasError,
            className: "absolute inset-0",
            style: { background: "transparent" },
            dpr: [1, 2],
            performance: { min: 0.5 },
            shadows: true,
            gl: { antialias: true, alpha: true },
            children: /* @__PURE__ */ jsx(Suspense, { fallback: null, children: /* @__PURE__ */ jsx(Cube3D, {}) })
          }
        ),
        !isLoaded && /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 1 },
            animate: { opacity: 0 },
            transition: { delay: 1, duration: 0.5 },
            className: "absolute inset-0 flex items-center justify-center",
            children: /* @__PURE__ */ jsx("div", { className: "w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" })
      ]
    }
  );
}

function HeroContent() {
  return /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-8 lg:gap-16 items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8 },
          className: "mb-8",
          children: /* @__PURE__ */ jsx("h1", { className: "text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-4", children: /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent", children: "Wonkai" }) })
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.h2,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay: 0.2 },
          className: "text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold leading-tight",
          children: [
            "Construimos software que",
            " ",
            /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent", children: "impulsa el futuro" })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        motion.p,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay: 0.4 },
          className: "text-lg sm:text-xl lg:text-2xl text-text/80 max-w-4xl mx-auto leading-relaxed",
          children: "Wonkai es una software factory enfocada en crear productos digitales escalables, con inteligencia y diseño."
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay: 0.6 },
          className: "flex flex-col sm:flex-row gap-4 justify-center items-center pt-8",
          children: [
            /* @__PURE__ */ jsx(
              motion.a,
              {
                href: "#proyectos",
                whileHover: { scale: 1.05 },
                whileTap: { scale: 0.95 },
                className: "bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-primary/25 transition-all duration-300",
                children: "Ver proyectos"
              }
            ),
            /* @__PURE__ */ jsx(
              motion.a,
              {
                href: "#contacto",
                whileHover: { scale: 1.05 },
                whileTap: { scale: 0.95 },
                className: "border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary hover:text-white transition-all duration-300",
                children: "Contactanos"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay: 0.8 },
          className: "pt-12",
          children: [
            /* @__PURE__ */ jsx("p", { className: "text-text/60 mb-6", children: "Tecnologías que dominamos" }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-6 text-2xl", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10", children: /* @__PURE__ */ jsx("span", { className: "text-primary", children: "React" }) }),
              /* @__PURE__ */ jsx("div", { className: "bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10", children: /* @__PURE__ */ jsx("span", { className: "text-secondary", children: "Node.js" }) }),
              /* @__PURE__ */ jsx("div", { className: "bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10", children: /* @__PURE__ */ jsx("span", { className: "text-primary", children: "AI/ML" }) }),
              /* @__PURE__ */ jsx("div", { className: "bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10", children: /* @__PURE__ */ jsx("span", { className: "text-secondary", children: "Mobile" }) })
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.8, delay: 0.4 },
        className: "hidden lg:block",
        children: /* @__PURE__ */ jsx(HeroAnimation, {})
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, delay: 0.4 },
        className: "lg:hidden mt-8",
        children: /* @__PURE__ */ jsxs("div", { className: "relative w-full h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl border border-white/10 overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 animate-gradient" }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-1/4 left-1/4 w-8 h-8 bg-primary/40 rounded-lg rotate-45 animate-float" }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-1/3 right-1/4 w-6 h-6 bg-secondary/40 rounded-full animate-float", style: { animationDelay: "1s" } }),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-1/3 left-1/3 w-4 h-4 bg-primary/60 rounded-full animate-float", style: { animationDelay: "2s" } }),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-1/4 right-1/3 w-10 h-10 bg-secondary/30 rounded-lg rotate-12 animate-float", style: { animationDelay: "0.5s" } }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl animate-pulse shadow-lg shadow-primary/25" }) })
        ] })
      }
    )
  ] });
}

const $$Hero = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="relative min-h-screen flex items-center justify-center overflow-hidden"> <!-- Background Effects --> <div class="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10"></div> <!-- Animated Background Particles --> <div class="absolute inset-0"> <div class="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-float"></div> <div class="absolute top-1/3 right-1/3 w-1 h-1 bg-secondary/40 rounded-full animate-float" style="animation-delay: -2s;"></div> <div class="absolute bottom-1/3 left-1/3 w-3 h-3 bg-primary/20 rounded-full animate-float" style="animation-delay: -4s;"></div> <div class="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-secondary/30 rounded-full animate-float" style="animation-delay: -1s;"></div> </div> <!-- Gradient Orbs --> <div class="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div> <div class="absolute bottom-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float" style="animation-delay: -3s;"></div> <!-- Main Content --> <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"> ${renderComponent($$result, "HeroContent", HeroContent, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/diaza/OneDrive/Escritorio/Adri/Wonkai/repositorios/landing2.0/src/components/HeroContent", "client:component-export": "default" })} </div> </section>`;
}, "C:/Users/diaza/OneDrive/Escritorio/Adri/Wonkai/repositorios/landing2.0/src/components/Hero.astro", void 0);

function AboutContent() {
  return /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-12 lg:gap-16 items-center", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: -50 },
        whileInView: { opacity: 1, x: 0 },
        transition: { duration: 0.8 },
        viewport: { once: true },
        className: "space-y-6",
        children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-3xl sm:text-4xl lg:text-5xl font-display font-bold", children: [
            "Sobre",
            " ",
            /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent", children: "nosotros" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-lg text-text/80 leading-relaxed", children: [
            /* @__PURE__ */ jsx("p", { children: "En Wonkai, creemos que la tecnología debe ser una herramienta que impulse el crecimiento y la innovación. Nuestra filosofía se centra en crear soluciones digitales que no solo cumplan con los requisitos técnicos, sino que superen las expectativas de nuestros clientes." }),
            /* @__PURE__ */ jsx("p", { children: "Combinamos años de experiencia en desarrollo de software con las últimas tecnologías de inteligencia artificial para entregar productos que realmente marquen la diferencia en el mercado." }),
            /* @__PURE__ */ jsx("p", { children: "Nuestro enfoque se basa en la colaboración estrecha con nuestros clientes, entendiendo sus necesidades únicas y transformando sus ideas en realidad digital." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-6 pt-8", children: [
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.2 },
                viewport: { once: true },
                className: "text-center",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-primary", children: "50+" }),
                  /* @__PURE__ */ jsx("div", { className: "text-text/60", children: "Proyectos completados" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.4 },
                viewport: { once: true },
                className: "text-center",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-secondary", children: "3+" }),
                  /* @__PURE__ */ jsx("div", { className: "text-text/60", children: "Años de experiencia" })
                ]
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, x: 50 },
        whileInView: { opacity: 1, x: 0 },
        transition: { duration: 0.8, delay: 0.2 },
        viewport: { once: true },
        className: "relative",
        children: /* @__PURE__ */ jsxs("div", { className: "relative bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 border border-white/10", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 overflow-hidden rounded-2xl", children: /* @__PURE__ */ jsxs("svg", { className: "w-full h-full", viewBox: "0 0 400 300", children: [
            /* @__PURE__ */ jsx("line", { x1: "50", y1: "80", x2: "350", y2: "80", stroke: "#8B5CF6", strokeWidth: "2", opacity: "0.3" }),
            /* @__PURE__ */ jsx("line", { x1: "50", y1: "150", x2: "350", y2: "150", stroke: "#22D3EE", strokeWidth: "2", opacity: "0.3" }),
            /* @__PURE__ */ jsx("line", { x1: "50", y1: "220", x2: "350", y2: "220", stroke: "#8B5CF6", strokeWidth: "2", opacity: "0.3" }),
            /* @__PURE__ */ jsx("line", { x1: "100", y1: "30", x2: "100", y2: "270", stroke: "#22D3EE", strokeWidth: "2", opacity: "0.3" }),
            /* @__PURE__ */ jsx("line", { x1: "200", y1: "30", x2: "200", y2: "270", stroke: "#8B5CF6", strokeWidth: "2", opacity: "0.3" }),
            /* @__PURE__ */ jsx("line", { x1: "300", y1: "30", x2: "300", y2: "270", stroke: "#22D3EE", strokeWidth: "2", opacity: "0.3" }),
            /* @__PURE__ */ jsx("circle", { cx: "100", cy: "80", r: "4", fill: "#8B5CF6", opacity: "0.6" }),
            /* @__PURE__ */ jsx("circle", { cx: "200", cy: "80", r: "4", fill: "#22D3EE", opacity: "0.6" }),
            /* @__PURE__ */ jsx("circle", { cx: "300", cy: "80", r: "4", fill: "#8B5CF6", opacity: "0.6" }),
            /* @__PURE__ */ jsx("circle", { cx: "100", cy: "150", r: "4", fill: "#22D3EE", opacity: "0.6" }),
            /* @__PURE__ */ jsx("circle", { cx: "200", cy: "150", r: "4", fill: "#8B5CF6", opacity: "0.6" }),
            /* @__PURE__ */ jsx("circle", { cx: "300", cy: "150", r: "4", fill: "#22D3EE", opacity: "0.6" }),
            /* @__PURE__ */ jsx("circle", { cx: "100", cy: "220", r: "4", fill: "#8B5CF6", opacity: "0.6" }),
            /* @__PURE__ */ jsx("circle", { cx: "200", cy: "220", r: "4", fill: "#22D3EE", opacity: "0.6" }),
            /* @__PURE__ */ jsx("circle", { cx: "300", cy: "220", r: "4", fill: "#8B5CF6", opacity: "0.6" })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10 space-y-4", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-3 h-3 bg-primary rounded-full animate-pulse" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Inteligencia Artificial" })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-3 h-3 bg-secondary rounded-full animate-pulse", style: { animationDelay: "0.5s" } }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Desarrollo Web" })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-3 h-3 bg-primary rounded-full animate-pulse", style: { animationDelay: "1s" } }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Aplicaciones Mobile" })
            ] }) })
          ] })
        ] })
      }
    )
  ] });
}

const $$About = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="sobre-nosotros" class="py-20 lg:py-32 relative"> <!-- Background Effects --> <div class="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div> <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"> ${renderComponent($$result, "AboutContent", AboutContent, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/diaza/OneDrive/Escritorio/Adri/Wonkai/repositorios/landing2.0/src/components/AboutContent", "client:component-export": "default" })} </div> </section>`;
}, "C:/Users/diaza/OneDrive/Escritorio/Adri/Wonkai/repositorios/landing2.0/src/components/About.astro", void 0);

const projects = [
  {
    id: 1,
    name: "Enchufando",
    description: "Marketplace inteligente que conecta usuarios con proveedores eléctricos.",
    url: "https://enchufando.com",
    image: "/api/placeholder/400/300",
    technologies: ["React", "Node.js", "AI"],
    status: "live"
  },
  {
    id: 2,
    name: "Próximamente",
    description: "Nuevo proyecto revolucionario en desarrollo.",
    url: "#",
    image: "/api/placeholder/400/300",
    technologies: ["AI/ML", "Mobile", "Web"],
    status: "coming-soon"
  }
];
function ProjectsContent() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-16", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.8 },
        viewport: { once: true },
        className: "text-center",
        children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6", children: [
            "Nuestros",
            " ",
            /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent", children: "proyectos" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-text/80 max-w-2xl mx-auto", children: "Descubrí algunos de los proyectos que hemos desarrollado para nuestros clientes" })
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-8 lg:gap-12", children: projects.map((project, index) => /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 50 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.8, delay: index * 0.2 },
        viewport: { once: true },
        className: "group",
        children: /* @__PURE__ */ jsxs("div", { className: "bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-primary/50 transition-all duration-300", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden", children: [
            project.status === "live" ? /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 text-white", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z", clipRule: "evenodd" }) }) }),
              /* @__PURE__ */ jsx("p", { className: "text-white font-medium", children: "Ver Demo" })
            ] }) }) : /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-gray-600/30 to-gray-800/30 flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 text-white", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z", clipRule: "evenodd" }) }) }),
              /* @__PURE__ */ jsx("p", { className: "text-white font-medium", children: "En desarrollo" })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4", children: project.status === "live" ? /* @__PURE__ */ jsx("span", { className: "bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium border border-green-500/30", children: "Live" }) : /* @__PURE__ */ jsx("span", { className: "bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium border border-yellow-500/30", children: "Próximamente" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-3 group-hover:text-primary transition-colors", children: project.name }),
            /* @__PURE__ */ jsx("p", { className: "text-text/80 mb-4 leading-relaxed", children: project.description }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mb-6", children: project.technologies.map((tech) => /* @__PURE__ */ jsx(
              "span",
              {
                className: "bg-white/10 text-text/70 px-3 py-1 rounded-full text-sm border border-white/20",
                children: tech
              },
              tech
            )) }),
            project.status === "live" ? /* @__PURE__ */ jsxs(
              motion.a,
              {
                href: project.url,
                target: "_blank",
                rel: "noopener noreferrer",
                whileHover: { scale: 1.05 },
                whileTap: { scale: 0.95 },
                className: "inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300",
                children: [
                  /* @__PURE__ */ jsx("span", { children: "Ver proyecto" }),
                  /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" }) })
                ]
              }
            ) : /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center space-x-2 bg-white/10 text-text/60 px-6 py-3 rounded-full font-medium border border-white/20", children: [
              /* @__PURE__ */ jsx("span", { children: "Próximamente" }),
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z", clipRule: "evenodd" }) })
            ] })
          ] })
        ] })
      },
      project.id
    )) }),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.8, delay: 0.4 },
        viewport: { once: true },
        className: "text-center pt-8",
        children: [
          /* @__PURE__ */ jsx("p", { className: "text-text/80 mb-6", children: "¿Tenés un proyecto en mente? Hablemos sobre cómo podemos ayudarte." }),
          /* @__PURE__ */ jsxs(
            motion.a,
            {
              href: "#contacto",
              whileHover: { scale: 1.05 },
              whileTap: { scale: 0.95 },
              className: "inline-flex items-center space-x-2 border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold hover:bg-primary hover:text-white transition-all duration-300",
              children: [
                /* @__PURE__ */ jsx("span", { children: "Iniciar proyecto" }),
                /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 8l4 4m0 0l-4 4m4-4H3" }) })
              ]
            }
          )
        ]
      }
    )
  ] });
}

const $$Projects = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="proyectos" class="py-20 lg:py-32 relative"> <!-- Background Effects --> <div class="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent"></div> <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"> ${renderComponent($$result, "ProjectsContent", ProjectsContent, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/diaza/OneDrive/Escritorio/Adri/Wonkai/repositorios/landing2.0/src/components/ProjectsContent", "client:component-export": "default" })} </div> </section>`;
}, "C:/Users/diaza/OneDrive/Escritorio/Adri/Wonkai/repositorios/landing2.0/src/components/Projects.astro", void 0);

const services = [
  {
    id: 1,
    title: "Desarrollo Web",
    description: "Aplicaciones web modernas y escalables con las últimas tecnologías.",
    icon: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" }) }),
    features: ["React", "Next.js", "TypeScript", "Responsive Design"]
  },
  {
    id: 2,
    title: "Aplicaciones Mobile",
    description: "Apps nativas e híbridas para iOS y Android con excelente UX.",
    icon: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" }) }),
    features: ["React Native", "Flutter", "iOS", "Android"]
  },
  {
    id: 3,
    title: "Integraciones con IA",
    description: "Implementamos inteligencia artificial para automatizar procesos.",
    icon: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" }) }),
    features: ["Machine Learning", "Chatbots", "Automatización", "Análisis de datos"]
  },
  {
    id: 4,
    title: "Consultoría Tecnológica",
    description: "Asesoramiento estratégico para optimizar tu infraestructura digital.",
    icon: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
    features: ["Arquitectura", "DevOps", "Seguridad", "Optimización"]
  }
];
function ServicesContent() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-16", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.8 },
        viewport: { once: true },
        className: "text-center",
        children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6", children: [
            "Nuestros",
            " ",
            /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent", children: "servicios" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-text/80 max-w-2xl mx-auto", children: "Ofrecemos soluciones completas para transformar tu idea en realidad digital" })
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8", children: services.map((service, index) => /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 50 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.8, delay: index * 0.1 },
        viewport: { once: true },
        whileHover: { y: -5 },
        className: "group",
        children: /* @__PURE__ */ jsxs("div", { className: "bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 h-full hover:border-primary/50 transition-all duration-300 hover:bg-white/10", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300", children: service.icon }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold group-hover:text-primary transition-colors", children: service.title }),
            /* @__PURE__ */ jsx("p", { className: "text-text/80 leading-relaxed", children: service.description }),
            /* @__PURE__ */ jsx("div", { className: "space-y-2", children: service.features.map((feature, featureIndex) => /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: -10 },
                whileInView: { opacity: 1, x: 0 },
                transition: { duration: 0.4, delay: featureIndex * 0.1 },
                viewport: { once: true },
                className: "flex items-center space-x-2",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 bg-primary rounded-full" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-text/70", children: feature })
                ]
              },
              featureIndex
            )) })
          ] })
        ] })
      },
      service.id
    )) }),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.8, delay: 0.4 },
        viewport: { once: true },
        className: "bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 lg:p-12 border border-white/10",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-2xl lg:text-3xl font-bold mb-4", children: "Nuestro proceso de trabajo" }),
            /* @__PURE__ */ jsx("p", { className: "text-text/80 max-w-2xl mx-auto", children: "Seguimos una metodología probada para garantizar el éxito de tu proyecto" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-4 gap-6 lg:gap-8", children: [
            { step: "01", title: "Análisis", description: "Entendemos tus necesidades y objetivos" },
            { step: "02", title: "Diseño", description: "Creamos la arquitectura y experiencia ideal" },
            { step: "03", title: "Desarrollo", description: "Implementamos la solución con las mejores prácticas" },
            { step: "04", title: "Lanzamiento", description: "Desplegamos y optimizamos tu producto" }
          ].map((process, index) => /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: index * 0.1 },
              viewport: { once: true },
              className: "text-center",
              children: [
                /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto", children: process.step }),
                /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-2", children: process.title }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-text/70", children: process.description })
              ]
            },
            index
          )) })
        ]
      }
    )
  ] });
}

const $$Services = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="servicios" class="py-20 lg:py-32 relative"> <!-- Background Effects --> <div class="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div> <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"> ${renderComponent($$result, "ServicesContent", ServicesContent, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/diaza/OneDrive/Escritorio/Adri/Wonkai/repositorios/landing2.0/src/components/ServicesContent", "client:component-export": "default" })} </div> </section>`;
}, "C:/Users/diaza/OneDrive/Escritorio/Adri/Wonkai/repositorios/landing2.0/src/components/Services.astro", void 0);

function CTAContent() {
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 50 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.8 },
      viewport: { once: true },
      className: "text-center space-y-8",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-3xl sm:text-4xl lg:text-5xl font-display font-bold", children: [
            "¿Tenés una idea?",
            " ",
            /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent", children: "Hagámosla realidad" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg sm:text-xl text-text/80 max-w-2xl mx-auto leading-relaxed", children: "Transformamos tus ideas en soluciones digitales innovadoras. Desde el concepto hasta el lanzamiento, estamos aquí para hacerlo posible." })
        ] }),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.9 },
            whileInView: { opacity: 1, scale: 1 },
            transition: { duration: 0.6, delay: 0.2 },
            viewport: { once: true },
            children: /* @__PURE__ */ jsxs(
              motion.a,
              {
                href: "mailto:wonkai.factory@gmail.com?subject=Consulta sobre proyecto",
                whileHover: { scale: 1.05 },
                whileTap: { scale: 0.95 },
                className: "inline-flex items-center space-x-3 bg-gradient-to-r from-primary to-secondary text-white px-8 py-6 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-primary/25 transition-all duration-300",
                children: [
                  /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }) }),
                  /* @__PURE__ */ jsx("span", { children: "Agendá una reunión" })
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            transition: { duration: 0.8, delay: 0.4 },
            viewport: { once: true },
            className: "grid sm:grid-cols-2 gap-6 pt-8",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3 mb-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-primary", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }) }),
                  /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "Email" })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-text/80", children: "wonkai.factory@gmail.com" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3 mb-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-secondary", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }),
                  /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "Respuesta rápida" })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-text/80", children: "Te respondemos en menos de 24hs" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            transition: { duration: 0.8, delay: 0.6 },
            viewport: { once: true },
            className: "pt-8 border-t border-white/10",
            children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center items-center gap-8 text-text/60", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Proyectos entregados a tiempo" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-primary rounded-full" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Tecnologías modernas" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-secondary rounded-full" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Soporte continuo" })
              ] })
            ] })
          }
        )
      ]
    }
  );
}

const $$CTA = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="contacto" class="py-20 lg:py-32 relative"> <!-- Background Effects --> <div class="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/10"></div> <!-- Animated Background Elements --> <div class="absolute inset-0 overflow-hidden"> <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float"></div> <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-float" style="animation-delay: -2s;"></div> </div> <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"> ${renderComponent($$result, "CTAContent", CTAContent, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/diaza/OneDrive/Escritorio/Adri/Wonkai/repositorios/landing2.0/src/components/CTAContent", "client:component-export": "default" })} </div> </section>`;
}, "C:/Users/diaza/OneDrive/Escritorio/Adri/Wonkai/repositorios/landing2.0/src/components/CTA.astro", void 0);

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/wonkai",
    icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" }) })
  },
  {
    name: "GitHub",
    href: "https://github.com/wonkai",
    icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" }) })
  },
  {
    name: "Twitter",
    href: "https://twitter.com/wonkai",
    icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" }) })
  }
];
function FooterContent() {
  return /* @__PURE__ */ jsxs("div", { className: "py-12 lg:py-16", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-3 gap-8 lg:gap-12", children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.6 },
          viewport: { once: true },
          className: "lg:col-span-1",
          children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-display font-bold", children: /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent", children: "Wonkai" }) }),
            /* @__PURE__ */ jsx("p", { className: "text-text/80 leading-relaxed", children: "Software factory especializada en crear productos digitales escalables con inteligencia artificial y diseño moderno." }),
            /* @__PURE__ */ jsx("div", { className: "flex space-x-4", children: socialLinks.map((social) => /* @__PURE__ */ jsx(
              motion.a,
              {
                href: social.href,
                target: "_blank",
                rel: "noopener noreferrer",
                whileHover: { scale: 1.1, y: -2 },
                whileTap: { scale: 0.95 },
                className: "w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-text/60 hover:text-primary hover:bg-primary/10 transition-all duration-300",
                children: social.icon
              },
              social.name
            )) })
          ] })
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.1 },
          viewport: { once: true },
          className: "lg:col-span-1",
          children: [
            /* @__PURE__ */ jsx("h4", { className: "font-semibold text-lg mb-4", children: "Enlaces rápidos" }),
            /* @__PURE__ */ jsxs("nav", { className: "space-y-3", children: [
              /* @__PURE__ */ jsx("a", { href: "#sobre-nosotros", className: "block text-text/80 hover:text-primary transition-colors", children: "Sobre nosotros" }),
              /* @__PURE__ */ jsx("a", { href: "#proyectos", className: "block text-text/80 hover:text-primary transition-colors", children: "Proyectos" }),
              /* @__PURE__ */ jsx("a", { href: "#servicios", className: "block text-text/80 hover:text-primary transition-colors", children: "Servicios" }),
              /* @__PURE__ */ jsx("a", { href: "#contacto", className: "block text-text/80 hover:text-primary transition-colors", children: "Contacto" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.2 },
          viewport: { once: true },
          className: "lg:col-span-1",
          children: [
            /* @__PURE__ */ jsx("h4", { className: "font-semibold text-lg mb-4", children: "Contacto" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
                /* @__PURE__ */ jsx("div", { className: "w-5 h-5 text-primary", children: /* @__PURE__ */ jsx("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }) }),
                /* @__PURE__ */ jsx("a", { href: "mailto:wonkai.factory@gmail.com", className: "text-text/80 hover:text-primary transition-colors", children: "wonkai.factory@gmail.com" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
                /* @__PURE__ */ jsx("div", { className: "w-5 h-5 text-secondary", children: /* @__PURE__ */ jsx("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }),
                /* @__PURE__ */ jsx("span", { className: "text-text/80", children: "Respuesta en 24hs" })
              ] })
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        transition: { duration: 0.6, delay: 0.3 },
        viewport: { once: true },
        className: "border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0",
        children: [
          /* @__PURE__ */ jsx("p", { className: "text-text/60 text-sm", children: "© 2024 Wonkai. Todos los derechos reservados." }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-6 text-sm text-text/60", children: /* @__PURE__ */ jsx("span", { children: "Hecho con ❤️ en Argentina" }) })
        ]
      }
    )
  ] });
}

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="bg-gradient-to-t from-background to-background/50 border-t border-white/10"> <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"> ${renderComponent($$result, "FooterContent", FooterContent, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/diaza/OneDrive/Escritorio/Adri/Wonkai/repositorios/landing2.0/src/components/FooterContent", "client:component-export": "default" })} </div> </footer>`;
}, "C:/Users/diaza/OneDrive/Escritorio/Adri/Wonkai/repositorios/landing2.0/src/components/Footer.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Wonkai - Software Factory" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen bg-background text-text"> ${renderComponent($$result2, "Hero", $$Hero, {})} ${renderComponent($$result2, "About", $$About, {})} ${renderComponent($$result2, "Projects", $$Projects, {})} ${renderComponent($$result2, "Services", $$Services, {})} ${renderComponent($$result2, "CTA", $$CTA, {})} ${renderComponent($$result2, "Footer", $$Footer, {})} </main> ` })}`;
}, "C:/Users/diaza/OneDrive/Escritorio/Adri/Wonkai/repositorios/landing2.0/src/pages/index.astro", void 0);

const $$file = "C:/Users/diaza/OneDrive/Escritorio/Adri/Wonkai/repositorios/landing2.0/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

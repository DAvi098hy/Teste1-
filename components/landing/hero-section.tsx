"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const AnimatedText = ({ text, className = "", delay = 0, duration = 0.5, once = true }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay * 1000)

    return () => clearTimeout(timer)
  }, [delay])

  const words = text.split(" ")

  const itemVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      variants={{
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
          opacity: 1,
          transition: {
            staggerChildren: 0.12,
            delayChildren: i * 0.04,
          },
        }),
      }}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      {words.map((word, i) => (
        <motion.span key={i} className="inline-block mr-1" variants={itemVariants}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

export default function HeroSection() {
  const router = useRouter()
  const currentYear = new Date().getFullYear()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-12">
      <div
        className="absolute inset-0 z-0 bg-black"
        style={{ backgroundImage: "radial-gradient(circle at center, #111 0%, #000 100%)" }}
      />

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "50vh", opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#22C55E] to-transparent"
      />

      <div className="container mx-auto px-6 z-10 relative max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold tracking-tighter text-balance">
              <span className="text-white">PROTOCOLO</span> <span className="text-[#22C55E]">ALFA</span>
            </h1>
          </motion.div>

          <AnimatedText
            text="Sinta o poder de até 400% mais testosterona em apenas 21 dias. De forma 100% natural, reviva sua energia, vigor e virilidade como nunca antes."
            className="text-xl sm:text-2xl md:text-3xl text-[#F2EAD3] font-light mb-6 sm:mb-8"
            delay={0.5}
          />

          <div className="max-w-3xl mx-auto mb-6 sm:mb-8">
            <AnimatedText
              text="Mentiram para você: a testosterona baixa não é por causa da idade. Ela vem de toxinas, do estresse e de hábitos que bloqueiam sua produção natural, impedindo que seu pênis cresça e que você se sinta um homem de verdade. Mas a verdade é que seu corpo ainda pode produzir testosterona como se fosse um touro."
              className="text-base sm:text-lg md:text-xl text-white/80 mb-4 sm:mb-6"
              delay={1}
            />
            <AnimatedText
              text="O Protocolo Alfa reativa sua produção hormonal natural, aumentando energia, libido, massa muscular e confiança, fazendo com que seu pênis cresça também — sem injeções, géis ou efeitos colaterais."
              className="text-base sm:text-lg md:text-xl text-white font-medium"
              delay={1.5}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2 }}
            className="flex flex-col items-center w-full"
          >
            <Button
              size="lg"
              className="mb-3 w-full sm:w-auto bg-[#22C55E] hover:bg-[#22C55E]/90 text-white"
              onClick={() => router.push("/quiz")}
            >
              <span className="flex items-center text-white">
                AVALIAR MINHA TESTOSTERONA
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </span>
            </Button>
            <span className="text-[#AFAFAF] text-xs sm:text-sm">Teste personalizado em 2 minutos</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.5 }}
            className="mt-8 md:mt-12 grid grid-cols-3 gap-2 sm:gap-8 max-w-lg mx-auto"
          >
            <div className="text-center px-1">
              <div className="text-xl sm:text-3xl font-bold text-[#22C55E]">+400%</div>
              <div className="text-[#AFAFAF] text-[10px] sm:text-xs">Aumento de Testosterona</div>
            </div>
            <div className="text-center px-1">
              <div className="text-xl sm:text-3xl font-bold text-[#22C55E]">10 min</div>
              <div className="text-[#AFAFAF] text-[10px] sm:text-xs">Por dia</div>
            </div>
            <div className="text-center px-1">
              <div className="text-xl sm:text-3xl font-bold text-[#22C55E]">21 dias</div>
              <div className="text-[#AFAFAF] text-[10px] sm:text-xs">Resultados visíveis</div>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-[#111111] pt-8 mt-16">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#AFAFAF] text-sm text-center">
              © {currentYear} Protocolo Alfa. Todos os direitos reservados.
            </p>
            <p className="text-[#AFAFAF] text-xs mt-4 md:mt-0 max-w-md text-center md:text-right">
              Este site não é afiliado a nenhuma empresa farmacêutica ou médica. Os resultados podem variar de
              pessoa para pessoa.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

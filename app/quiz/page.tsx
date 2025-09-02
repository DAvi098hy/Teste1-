"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import QuizHeader from "@/components/quiz/quiz-header"
import QuizQuestion from "@/components/quiz/quiz-question"
import QuizLoading from "@/components/quiz/quiz-loading"
import QuizResult from "@/components/quiz/quiz-result"

export default function QuizPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const questions = [
    // Categoria 1: Massa Muscular e Níveis de Testosterona
    {
      id: "current_muscle_mass",
      question: "Como você avalia seu nível atual de massa muscular e sua capacidade de ganhá-la?",
      options: [
        { value: "very_low", label: "Muito baixa (dificuldade extrema em ganhar músculos, mesmo treinando)", percentage: 10 },
        { value: "low", label: "Baixa (ganho muscular lento, sinto que minha testosterona pode estar baixa)", percentage: 25 },
        { value: "moderate", label: "Moderada (ganho músculos com esforço, mas quero mais volume e definição)", percentage: 50 },
        { value: "high", label: "Alta (ganho músculos facilmente, mas busco otimizar minha testosterona para resultados máximos)", percentage: 80 },
      ],
      type: "single",
    },
    {
      id: "muscle_gain_goal",
      question: "Quanto de massa muscular você gostaria de ganhar em 30 dias?",
      options: [
        { value: "1kg", label: "1-2 kg (foco em definição e força)", percentage: 25 },
        { value: "3kg", label: "3-4 kg (ganho significativo de volume)", percentage: 50 },
        { value: "5kg", label: "5+ kg (transformação corporal intensa, otimizando testosterona)", percentage: 75 },
      ],
      type: "single",
    },
    {
      id: "testosterone_symptoms",
      question: "Você sente algum destes sintomas que podem indicar baixa testosterona? (Selecione todos que se aplicam)",
      options: [
        { value: "fatigue", label: "Fadiga constante e falta de energia", percentage: 10 },
        { value: "low_libido", label: "Diminuição do desejo sexual", percentage: 10 },
        { value: "mood_swings", label: "Alterações de humor, irritabilidade ou desânimo", percentage: 10 },
        { value: "erectile_dysfunction", label: "Dificuldade de ereção ou ereções menos firmes", percentage: 10 },
        { value: "hair_loss", label: "Perda de cabelo ou pelos corporais", percentage: 10 },
        { value: "none", label: "Nenhum dos anteriores", percentage: 80 },
      ],
      type: "multiple",
    },
    // Categoria 2: Desempenho Sexual e Tamanho Peniano
    {
      id: "erection_quality",
      question: "Como você avalia a qualidade das suas ereções e sua relação com a testosterona?",
      options: [
        { value: "very_poor", label: "Muito insatisfatória (dificuldade em ter ou manter ereções, sinto que minha testosterona está baixa)", percentage: 10 },
        { value: "poor", label: "Insatisfatória (ereções fracas ou inconsistentes, preciso otimizar minha testosterona)", percentage: 25 },
        { value: "fair", label: "Razoável (ereções ok, mas quero mais firmeza e duração, talvez um boost de testosterona)", percentage: 50 },
        { value: "good", label: "Excelente (ereções fortes e duradouras, mas busco maximizar meu potencial)", percentage: 80 },
      ],
      type: "single",
    },
    {
      id: "penile_size_current",
      question: "Qual o tamanho atual do seu pênis ereto (em centímetros)?",
      options: [
        { value: "below_12", label: "Menos de 12 cm", percentage: 20 },
        { value: "12_to_14", label: "Entre 12 e 14 cm", percentage: 40 },
        { value: "14_to_16", label: "Entre 14 e 16 cm", percentage: 60 },
        { value: "above_16", label: "Mais de 16 cm", percentage: 80 },
      ],
      type: "single",
    },
    {
      id: "penile_size_goal",
      question: "Quantos centímetros você gostaria de aumentar no tamanho do seu pênis?",
      options: [
        { value: "1cm", label: "1 cm", percentage: 25 },
        { value: "2cm", label: "2 cm", percentage: 50 },
        { value: "3cm", label: "3 cm", percentage: 75 },
        { value: "more_than_3cm", label: "Mais de 3 cm", percentage: 100 },
      ],
      type: "single",
    },
    // Categoria 3: Potencial de Ganho e Otimização de Testosterona
    {
      id: "testosterone_optimization_goal",
      question: "Considerando seus objetivos de massa muscular e tamanho peniano, quanto você busca otimizar seus níveis de testosterona?",
      options: [
        { value: "25_percent", label: "Otimizar em 25% (para ganhos moderados de massa e 1 cm peniano)", percentage: 25 },
        { value: "50_percent", label: "Otimizar em 50% (para ganhos significativos de massa e 2 cm peniano)", percentage: 50 },
        { value: "100_percent", label: "Otimizar em 100% ou mais (para ganhos máximos de massa e 3+ cm peniano)", percentage: 100 },
      ],
      type: "single",
    },
  ]

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      // Last question completed, show loading
      setIsLoading(true)
      // Simulate loading and calculation
      setTimeout(() => {
        setIsLoading(false)
        setShowResult(true)
      }, 10000)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleStartPlan = () => {
    router.push("/planos")
  }

  const calculateCurrentMassLevel = () => {
    const currentMuscleMassAnswer = answers.current_muscle_mass;
    const question = questions.find(q => q.id === "current_muscle_mass");
    if (question) {
      const selectedOption = question.options.find(opt => opt.value === currentMuscleMassAnswer);
      if (selectedOption && selectedOption.percentage !== undefined) {
        return selectedOption.percentage;
      }
    }
    return 50; // Valor padrão
  }

  const getDesiredIncrease = () => {
    const goalAnswer = answers.testosterone_optimization_goal;
    const question = questions.find(q => q.id === "testosterone_optimization_goal");
    if (question) {
      const selectedOption = question.options.find(opt => opt.value === goalAnswer);
      if (selectedOption && selectedOption.percentage !== undefined) {
        return selectedOption.percentage;
      }
    }
    return 50; // default fallback
  }

  if (isLoading) {
    return <QuizLoading />
  }

  if (showResult) {
    const currentLevel = calculateCurrentMassLevel()
    const desiredIncrease = getDesiredIncrease()
    return (
      <QuizResult 
        currentLevel={currentLevel} 
        desiredIncrease={desiredIncrease} 
        onContinue={handleStartPlan} 
      />
    )
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-4">
      <div className="container mx-auto px-4 max-w-3xl">
        <QuizHeader currentStep={currentStep} totalSteps={questions.length} />

        <div className="w-full">
          <QuizQuestion
            question={questions[currentStep].question}
            options={questions[currentStep].options}
            type={questions[currentStep].type}
            value={answers[questions[currentStep].id] || null}
            onChange={(answer) => handleAnswer(questions[currentStep].id, answer)}
            onNext={handleNext}
            onBack={handleBack}
            showBack={currentStep > 0}
          />
        </div>
      </div>
    </div>
  )
}


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
    {
      id: "energy",
      question: "¿Cómo describirías tu nivel de energía durante el día?",
      options: [
        { value: "very_low", label: "Muy bajo - me siento cansado constantemente", percentage: 10 },
        { value: "low", label: "Bajo - necesito cafeína para funcionar", percentage: 25 },
        { value: "moderate", label: "Moderado - tengo altibajos durante el día", percentage: 50 },
        { value: "high", label: "Alto - me siento energético la mayor parte del día", percentage: 80 },
      ],
      type: "single",
    },
    {
      id: "libido",
      question: "¿Cómo está tu libido/deseo sexual?",
      options: [
        { value: "very_low", label: "Muy bajo - casi inexistente", percentage: 10 },
        { value: "low", label: "Bajo - rara vez tengo ganas", percentage: 25 },
        { value: "moderate", label: "Moderado - a veces sí, a veces no", percentage: 50 },
        { value: "high", label: "Alto - tengo deseo sexual regular", percentage: 80 },
      ],
      type: "single",
    },
    {
      id: "muscle_mass",
      question: "¿Has notado cambios en tu masa muscular?",
      options: [
        { value: "significant_loss", label: "He perdido mucha masa muscular", percentage: 15 },
        { value: "some_loss", label: "He perdido algo de músculo", percentage: 30 },
        { value: "maintained", label: "Se mantiene igual", percentage: 55 },
        { value: "gaining", label: "Estoy ganando músculo fácilmente", percentage: 85 },
      ],
      type: "single",
    },
    {
      id: "mood",
      question: "¿Cómo describirías tu estado de ánimo general?",
      options: [
        { value: "depressed", label: "Deprimido o muy bajo", percentage: 10 },
        { value: "irritable", label: "Irritable y de mal humor frecuentemente", percentage: 25 },
        { value: "neutral", label: "Neutral, sin grandes cambios", percentage: 50 },
        { value: "positive", label: "Positivo y motivado", percentage: 80 },
      ],
      type: "single",
    },
    {
      id: "sleep_quality",
      question: "¿Cómo es la calidad de tu sueño?",
      options: [
        { value: "very_poor", label: "Muy mala - me despierto cansado", percentage: 15 },
        { value: "poor", label: "Mala - me cuesta conciliar el sueño", percentage: 30 },
        { value: "fair", label: "Regular - duermo pero no profundamente", percentage: 55 },
        { value: "good", label: "Buena - duermo profundo y descanso bien", percentage: 85 },
      ],
      type: "single",
    },
    {
      id: "body_fat",
      question: "¿Has notado cambios en tu grasa corporal?",
      options: [
        { value: "significant_gain", label: "He ganado mucha grasa, especialmente en el abdomen", percentage: 15 },
        { value: "some_gain", label: "He ganado algo de peso", percentage: 30 },
        { value: "maintained", label: "Se mantiene igual", percentage: 55 },
        { value: "losing", label: "Estoy perdiendo grasa fácilmente", percentage: 85 },
      ],
      type: "single",
    },
    {
      id: "age",
      question: "¿Qué edad tienes?",
      options: [
        { value: "18_to_25", label: "Entre 18 y 25 años", percentage: 90 },
        { value: "26_to_35", label: "Entre 26 y 35 años", percentage: 75 },
        { value: "36_to_45", label: "Entre 36 y 45 años", percentage: 60 },
        { value: "above_45", label: "Más de 45 años", percentage: 40 },
      ],
      type: "single",
    },
    {
      id: "lifestyle",
      question: "¿Cómo describirías tu estilo de vida?",
      options: [
        { value: "sedentary", label: "Sedentario - paso la mayor parte del día sentado", percentage: 20 },
        { value: "lightly_active", label: "Ligeramente activo - camino ocasionalmente", percentage: 40 },
        { value: "moderately_active", label: "Moderadamente activo - ejercicio 2-3 veces por semana", percentage: 70 },
        { value: "very_active", label: "Muy activo - ejercicio regular y vida activa", percentage: 90 },
      ],
      type: "single",
    },
    {
      id: "testosterone_goal",
      question: "¿Cuánto te gustaría aumentar tu nivel de testosterona en 30 días?",
      options: [
        { value: "400", label: "400%", percentage: 400 },
        { value: "100", label: "100%", percentage: 100 },
        { value: "50", label: "50%", percentage: 50 },
        { value: "25", label: "25%", percentage: 25 },
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

  const calculateCurrentTestosteroneLevel = () => {
    let totalPercentage = 0
    let questionCount = 0

    // Calcular o nível atual baseado nas respostas (excluindo a pergunta do objetivo)
    Object.keys(answers).forEach((questionId) => {
      if (questionId !== "testosterone_goal") {
        const question = questions.find(q => q.id === questionId)
        if (question) {
          const selectedOption = question.options.find(opt => opt.value === answers[questionId])
          if (selectedOption && selectedOption.percentage !== undefined) {
            totalPercentage += selectedOption.percentage
            questionCount++
          }
        }
      }
    })

    return questionCount > 0 ? Math.round(totalPercentage / questionCount) : 50
  }

  const getDesiredIncrease = () => {
    const goalAnswer = answers.testosterone_goal
    const question = questions.find(q => q.id === "testosterone_goal")
    if (question) {
      const selectedOption = question.options.find(opt => opt.value === goalAnswer)
      if (selectedOption && selectedOption.percentage !== undefined) {
        return selectedOption.percentage
      }
    }
    return 50 // default fallback
  }

  if (isLoading) {
    return <QuizLoading />
  }

  if (showResult) {
    const currentLevel = calculateCurrentTestosteroneLevel()
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


'use client'

import { useState, useMemo } from 'react'
import { Screen, Answers, Genre } from './types'
import { questions } from './data/questions'
import { diagnose, getDislikes } from './utils/diagnosis'
import StartScreen from './components/StartScreen'
import QuestionScreen from './components/QuestionScreen'
import ResultScreen from './components/ResultScreen'

export default function App() {
  const [screen, setScreen] = useState<Screen>('start')
  const [answers, setAnswers] = useState<Answers>({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const [result, setResult] = useState<Genre | null>(null)
  const [redirectNote, setRedirectNote] = useState<string | null>(null)
  const [dislikes, setDislikes] = useState<string[]>([])

  const activeQuestions = useMemo(
    () => questions.filter((q) => !q.condition || q.condition(answers)),
    [answers]
  )

  function handleStart() {
    setScreen('question')
  }

  function handleAnswer(questionId: string, value: string | string[]) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  function handleNext() {
    const isLast = currentIndex === activeQuestions.length - 1
    if (isLast) {
      const { genre, redirectNote: note } = diagnose(answers)
      setResult(genre)
      setRedirectNote(note)
      setDislikes(getDislikes(answers))
      setScreen('result')
    } else {
      setCurrentIndex((i) => i + 1)
    }
  }

  function handleBack() {
    if (currentIndex === 0) {
      setScreen('start')
      setAnswers({})
    } else {
      setCurrentIndex((i) => i - 1)
    }
  }

  function handleRestart() {
    setScreen('start')
    setAnswers({})
    setCurrentIndex(0)
    setResult(null)
    setRedirectNote(null)
    setDislikes([])
  }

  return (
    <div className="min-h-screen bg-ramen-cream">
      <div className="max-w-md mx-auto">
        {screen === 'start' && <StartScreen onStart={handleStart} />}

        {screen === 'question' && activeQuestions[currentIndex] && (
          <QuestionScreen
            question={activeQuestions[currentIndex]}
            questionIndex={currentIndex}
            totalQuestions={activeQuestions.length}
            answers={answers}
            onAnswer={handleAnswer}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {screen === 'result' && result && (
          <ResultScreen
            genre={result}
            dislikes={dislikes}
            redirectNote={redirectNote}
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  )
}

'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { YouthChallengeScreen } from './youth-challenge-screen'

export type GameMode = 'casual' | 'challenge' | 'educational' | 'professional' | 'simulation'

interface GameModeProps {
  currentMode: GameMode
  onModeSelect: (mode: GameMode) => void
}

const YOUTH_MODES = {
  casual: {
    title: 'Adventure Mode',
    description: 'Learn farming through fun games and activities.',
    features: ['Fun mini-games', 'Simple controls', 'Educational content', 'Safe environment']
  },
  educational: {
    title: 'Learning Mode',
    description: 'Discover farming and nature through interactive lessons.',
    features: ['Interactive tutorials', 'Basic NASA data', 'Kid-friendly explanations']
  },
  challenge: {
    title: 'Mission Mode',
    description: 'Complete exciting farming missions suitable for young players.',
    features: ['Age-appropriate challenges', 'Rewards system', 'Guided gameplay']
  }
}

const PROFESSIONAL_MODES = {
  professional: {
    title: 'Professional Mode',
    description: 'Advanced farming simulation with real-world data analysis.',
    features: ['Complex data analysis', 'Professional tools', 'Advanced NASA metrics']
  },
  simulation: {
    title: 'Simulation Mode',
    description: 'Full-scale agricultural simulation with detailed environmental factors.',
    features: ['Real-time data', 'Economic modeling', 'Advanced weather systems']
  },
  educational: {
    title: 'Research Mode',
    description: 'In-depth agricultural research and analysis tools.',
    features: ['Scientific data access', 'Research tools', 'Detailed analytics']
  }
}

interface ModeInfo {
  title: string;
  description: string;
  features: string[];
}

export function GameModeSelector({ currentMode, onModeSelect }: GameModeProps) {
  const [age, setAge] = useState<number | ''>('')
  const [isAgeVerified, setIsAgeVerified] = useState(false)
  const [showYouthChallenge, setShowYouthChallenge] = useState(false)
  const [totalPoints, setTotalPoints] = useState(0)
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null)
  const [showEntranceAnimation, setShowEntranceAnimation] = useState(false)

  useEffect(() => {
    // Trigger entrance animation after a short delay
    const timer = setTimeout(() => {
      setShowEntranceAnimation(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const handleAgeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (age !== '') {
      setIsAgeVerified(true)
      // Always show the challenge screen for better engagement
      setShowYouthChallenge(true)
    }
  }

  const handleChallengeComplete = (points: number) => {
    setTotalPoints(prev => prev + points)
    setShowYouthChallenge(false)
    // Select the appropriate youth mode based on points
    if (points > 200) {
      onModeSelect('challenge')
    } else {
      onModeSelect('casual')
    }
  }

  const activeModes = Number(age) >= 18 ? PROFESSIONAL_MODES : YOUTH_MODES

  if (!isAgeVerified) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-black/90 via-blue-900/30 to-purple-900/20 backdrop-blur-xl border border-blue-500/30 shadow-2xl shadow-blue-500/20">
          <CardHeader className="space-y-4">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Welcome to Terra Farm
              </CardTitle>
              <p className="text-blue-200/80 mt-2">
                Join an exciting farming adventure! Let's get started by verifying your age.
              </p>
            </motion.div>
          </CardHeader>
          <CardContent>
            <motion.form 
              onSubmit={handleAgeSubmit} 
              className="space-y-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="space-y-4">
                <label className="text-lg text-blue-100 block mb-2 font-medium">
                  Enter your age to begin your journey
                </label>
                <Input
                  type="number"
                  min="8"
                  max="100"
                  value={age}
                  onChange={(e) => setAge(e.target.value ? Number(e.target.value) : '')}
                  className="text-lg py-6 bg-black/50 border-2 border-blue-500/30 text-white placeholder:text-blue-200/30 focus:border-purple-500/50 transition-all"
                  placeholder="Your age"
                />
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  type="submit" 
                  className="w-full py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all duration-300 shadow-lg shadow-blue-500/25"
                  disabled={age === ''}
                >
                  Start Your Adventure
                </Button>
              </motion.div>
            </motion.form>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence>
        {showYouthChallenge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <YouthChallengeScreen
              onComplete={handleChallengeComplete}
              onClose={() => {
                setShowYouthChallenge(false)
                onModeSelect('casual')
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-black/90 via-blue-900/20 to-purple-900/20 backdrop-blur-xl border border-blue-500/30 shadow-2xl shadow-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white text-xl flex items-center gap-2">
            <span>
              {Number(age) >= 18 ? 'Professional Modes' : 'Game Modes'}
            </span>
            {totalPoints > 0 && (
              <span className="text-sm text-yellow-300">
                🏆 {totalPoints} points
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {(Object.entries(activeModes) as [GameMode, ModeInfo][]).map(([mode, info]) => (
            <div
              key={mode}
              className={`p-4 rounded-lg border transition-all cursor-pointer ${
                currentMode === mode
                  ? 'bg-blue-900/30 border-blue-500'
                  : 'bg-gray-800/30 border-gray-700 hover:border-blue-500/50'
              }`}
              onClick={() => onModeSelect(mode)}
            >
              <h3 className="text-lg font-semibold text-white mb-2">{info.title}</h3>
              <p className="text-gray-300 text-sm mb-3">{info.description}</p>
              <div className="space-y-1">
                {info.features.map((feature: string, index: number) => (
                  <div key={index} className="text-xs text-gray-400">
                    • {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
        </motion.div>
      </motion.div>
    )
}
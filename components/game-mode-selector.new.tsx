'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { YouthChallengeScreen } from './youth-challenge-screen'

export type GameMode = 'casual' | 'challenge' | 'educational' | 'professional' | 'simulation'

interface GameModeProps {
  currentMode: GameMode
  onModeSelect: (mode: GameMode) => void
}

interface ModeInfo {
  title: string
  description: string
  features: string[]
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
} as const

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
} as const

export function GameModeSelector({ currentMode, onModeSelect }: GameModeProps) {
  const [age, setAge] = useState<number | ''>('')
  const [isAgeVerified, setIsAgeVerified] = useState(false)
  const [showYouthChallenge, setShowYouthChallenge] = useState(false)
  const [totalPoints, setTotalPoints] = useState(0)

  const handleAgeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (age !== '') {
      setIsAgeVerified(true)
      if (Number(age) < 18) {
        setShowYouthChallenge(true)
      }
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

  if (!isAgeVerified) {
    return (
      <Card className="bg-black/80 backdrop-blur-xl border border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-white text-xl">Age Verification</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAgeSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-300 block mb-2">
                Please enter your age to see appropriate content
              </label>
              <Input
                type="number"
                min="8"
                max="100"
                value={age}
                onChange={(e) => setAge(e.target.value ? Number(e.target.value) : '')}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Enter your age"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={age === ''}
            >
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    )
  }

  const activeModes = Number(age) >= 18 ? PROFESSIONAL_MODES : YOUTH_MODES

  return (
    <div className="relative">
      {showYouthChallenge && (
        <YouthChallengeScreen
          onComplete={handleChallengeComplete}
          onClose={() => {
            setShowYouthChallenge(false)
            onModeSelect('casual')
          }}
        />
      )}
      
      <Card className="bg-black/80 backdrop-blur-xl border border-blue-500/30">
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
    </div>
  )
}
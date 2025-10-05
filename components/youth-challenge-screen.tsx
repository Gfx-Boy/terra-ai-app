'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Star,
  Trophy,
  Leaf,
  Cloud,
  Droplets,
  Sun,
  Timer,
  Award,
  Sprout,
  Sparkles
} from 'lucide-react'

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  timeLimit: number; // in seconds
  type: 'planting' | 'watering' | 'weather' | 'harvesting' | 'eco' | 'science';
  objectives: string[];
  funFacts: string[];
  rewards: {
    badge: string;
    bonus: number;
    unlocks: string;
  }
}

const generateChallenge = (): Challenge => {
  const challenges = [
    {
      id: 'eco-1',
      title: 'Eco Guardian',
      description: 'Start your journey as an eco-friendly farmer!',
      difficulty: 'easy',
      points: 150,
      timeLimit: 240,
      type: 'eco',
      objectives: [
        'Plant 3 sustainable crops',
        'Use natural pest control methods',
        'Create a mini compost system'
      ],
      funFacts: [
        'Did you know? One acre of corn removes about 8 tons of carbon dioxide from the air!',
        'Ladybugs are natural pest controllers - they eat harmful insects!',
        'Composting can reduce waste by 30%!'
      ],
      rewards: {
        badge: 'Earth Protector',
        bonus: 50,
        unlocks: 'Special eco-friendly seeds'
      }
    },
    {
      id: 'science-1',
      title: 'Farm Scientist',
      description: 'Learn about the science of farming!',
      difficulty: 'medium',
      points: 200,
      timeLimit: 300,
      type: 'science',
      objectives: [
        'Test soil pH levels',
        'Study plant growth patterns',
        'Monitor water quality'
      ],
      funFacts: [
        'Plants can communicate with each other through their roots!',
        'Some plants grow better when planted together - it\'s called companion planting!',
        'Earthworms are natural soil engineers!'
      ],
      rewards: {
        badge: 'Junior Scientist',
        bonus: 75,
        unlocks: 'Lab equipment for experiments'
      }
    },
    {
      id: 'plant-1',
      title: 'Master Gardener',
      description: 'Create your first thriving garden!',
      difficulty: 'easy',
      points: 100,
      timeLimit: 180,
      type: 'planting',
      objectives: [
        'Plant different types of crops',
        'Create perfect soil mixture',
        'Design an efficient garden layout'
      ],
      funFacts: [
        'Some plants grow better in the shade!',
        'Different colored vegetables have different nutrients!',
        'Some flowers help protect your vegetables!'
      ],
      rewards: {
        badge: 'Green Thumb',
        bonus: 25,
        unlocks: 'Special plant varieties'
      }
    },
    {
      id: 'water-1',
      title: 'Water Wizard',
      description: 'Master the art of smart irrigation!',
      difficulty: 'medium',
      points: 175,
      timeLimit: 240,
      type: 'watering',
      objectives: [
        'Build a rain collection system',
        'Create water-saving schedules',
        'Monitor plant hydration'
      ],
      funFacts: [
        'Plants release water into the air through transpiration!',
        'Morning is the best time to water plants!',
        'Some plants are drought-resistant!'
      ],
      rewards: {
        badge: 'Water Guardian',
        bonus: 40,
        unlocks: 'Smart irrigation tools'
      }
    }
  ] as Challenge[];

  return challenges[Math.floor(Math.random() * challenges.length)];
}

interface YouthChallengeScreenProps {
  onComplete: (points: number) => void;
  onClose: () => void;
}

export function YouthChallengeScreen({ onComplete, onClose }: YouthChallengeScreenProps) {
  const [currentChallenge, setCurrentChallenge] = useState<Challenge>(generateChallenge());
  const [timeLeft, setTimeLeft] = useState(currentChallenge.timeLimit);
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [completedObjectives, setCompletedObjectives] = useState<string[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleObjectiveComplete = (objective: string) => {
    if (!completedObjectives.includes(objective)) {
      setCompletedObjectives([...completedObjectives, objective]);
      setProgress((completedObjectives.length + 1) * (100 / currentChallenge.objectives.length));
      
      // Add some bonus points for quick completion
      const timeBonus = Math.floor((timeLeft / currentChallenge.timeLimit) * 50);
      setScore(prev => prev + timeBonus);
    }
  };

  const getIconForType = (type: Challenge['type']) => {
    switch (type) {
      case 'planting': return <Leaf className="w-6 h-6" />;
      case 'watering': return <Droplets className="w-6 h-6" />;
      case 'weather': return <Cloud className="w-6 h-6" />;
      case 'harvesting': return <Sun className="w-6 h-6" />;
      case 'eco': return <Sprout className="w-6 h-6" />;
      case 'science': return <Sparkles className="w-6 h-6" />;
    }
  };

  const [isCompleting, setIsCompleting] = useState(false);
  const [showCompletionEffects, setShowCompletionEffects] = useState(false);

  const handleCompleteChallenge = async () => {
    setIsCompleting(true);
    setShowCompletionEffects(true);

    // Celebration animation sequence
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const finalScore = score + currentChallenge.points + currentChallenge.rewards.bonus;
    onComplete(finalScore);
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="max-w-2xl w-full bg-black/80 border-blue-500/30">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl text-white flex items-center gap-3">
              {getIconForType(currentChallenge.type)}
              {currentChallenge.title}
            </CardTitle>
            <Badge 
              className={
                currentChallenge.difficulty === 'easy' ? 'bg-green-500/20 text-green-300' :
                currentChallenge.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                'bg-red-500/20 text-red-300'
              }
            >
              {currentChallenge.difficulty.toUpperCase()}
            </Badge>
          </div>
          <p className="text-gray-300">{currentChallenge.description}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Timer and Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-2 text-blue-300">
                <Timer className="w-4 h-4" />
                <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
              </div>
              <div className="flex items-center gap-2 text-yellow-300">
                <Trophy className="w-4 h-4" />
                <span>{score + currentChallenge.points} points possible</span>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Objectives */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold">Challenge Objectives:</h3>
            <div className="grid gap-2">
              {currentChallenge.objectives.map((objective, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-lg border transition-all cursor-pointer ${
                    completedObjectives.includes(objective)
                      ? 'bg-green-900/30 border-green-500 text-green-300'
                      : 'bg-gray-800/30 border-gray-700 hover:bg-gray-700/30'
                  }`}
                  onClick={() => handleObjectiveComplete(objective)}
                >
                  <div className="flex items-center gap-2">
                    {completedObjectives.includes(objective) ? (
                      <Award className="w-4 h-4 text-green-400" />
                    ) : (
                      <Star className="w-4 h-4 text-yellow-400" />
                    )}
                    <span className="text-sm">{objective}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Completion Effects */}
          {showCompletionEffects && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            >
              <div className="relative">
                {/* Celebration particles */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 bg-yellow-400 rounded-full"
                      initial={{
                        x: 0,
                        y: 0,
                        scale: 0
                      }}
                      animate={{
                        x: Math.random() * 400 - 200,
                        y: Math.random() * 400 - 200,
                        scale: Math.random() * 1.5,
                        opacity: 0
                      }}
                      transition={{
                        duration: 1,
                        delay: i * 0.05,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </div>
                
                {/* Success message */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-green-900/80 border border-green-500/50 p-8 rounded-xl shadow-xl text-center z-10"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="inline-block mb-4"
                  >
                    <Trophy className="w-16 h-16 text-yellow-400" />
                  </motion.div>
                  <h2 className="text-3xl font-bold text-green-300 mb-4">
                    Challenge Complete!
                  </h2>
                  <p className="text-green-200 mb-6">
                    Amazing work! You've mastered this challenge.
                  </p>
                  <div className="space-y-2 mb-6">
                    <p className="text-yellow-300 font-semibold">
                      +{currentChallenge.points} Challenge Points
                    </p>
                    <p className="text-blue-300 font-semibold">
                      +{currentChallenge.rewards.bonus} Bonus Points
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1 border-red-500/30 text-red-300 hover:bg-red-500/10"
              onClick={onClose}
              disabled={isCompleting}
            >
              Give Up
            </Button>
            <Button
              className={`flex-1 relative overflow-hidden ${
                isCompleting
                  ? 'bg-green-500'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
              disabled={completedObjectives.length !== currentChallenge.objectives.length || isCompleting}
              onClick={handleCompleteChallenge}
            >
              {isCompleting ? (
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5 }}
                  className="absolute inset-0 bg-green-400/30"
                />
              ) : null}
              <span className="relative z-10">
                {isCompleting ? 'Completing...' : 'Complete Challenge'}
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
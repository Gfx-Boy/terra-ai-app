"use client"

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  MessageSquare, 
  Send, 
  Mic, 
  MicOff, 
  Brain, 
  Sparkles, 
  Satellite,
  Leaf,
  Droplets,
  Thermometer,
  TrendingUp,
  AlertCircle,
  User,
  Bot,
  Star,
  ChevronDown,
  MoreHorizontal,
  RefreshCw,
  Copy,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  dataPoints?: Array<{
    label: string
    value: string | number
    trend?: 'up' | 'down' | 'stable'
    source: string
  }>
  recommendations?: Array<{
    title: string
    description: string
    priority: 'high' | 'medium' | 'low'
    confidence: number
  }>
  isStreaming?: boolean
}

interface QuickAction {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  prompt: string
  category: 'analysis' | 'recommendations' | 'data' | 'learning'
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'soil-analysis',
    label: 'Analyze Soil Conditions',
    icon: Droplets,
    prompt: 'Analyze current soil moisture levels and provide irrigation recommendations',
    category: 'analysis'
  },
  {
    id: 'crop-health',
    label: 'Check Crop Health',
    icon: Leaf,
    prompt: 'Assess vegetation health using latest MODIS satellite data',
    category: 'analysis'
  },
  {
    id: 'weather-forecast',
    label: 'Weather Insights',
    icon: Thermometer,
    prompt: 'Provide 7-day weather forecast and farming recommendations',
    category: 'data'
  },
  {
    id: 'yield-prediction',
    label: 'Predict Yield',
    icon: TrendingUp,
    prompt: 'Calculate expected yield based on current conditions and historical data',
    category: 'analysis'
  },
  {
    id: 'pest-alerts',
    label: 'Pest & Disease Alerts',
    icon: AlertCircle,
    prompt: 'Check for potential pest or disease risks in my area',
    category: 'recommendations'
  },
  {
    id: 'market-timing',
    label: 'Market Timing',
    icon: Star,
    prompt: 'Advise on optimal harvest and market timing for maximum profit',
    category: 'recommendations'
  }
]

const SAMPLE_RESPONSES: Record<string, {
  content: string
  dataPoints: Array<{
    label: string
    value: string | number
    trend?: 'up' | 'down' | 'stable'
    source: string
  }>
  recommendations: Array<{
    title: string
    description: string
    priority: 'high' | 'medium' | 'low'
    confidence: number
  }>
}> = {
  'soil-analysis': {
    content: "Based on the latest SMAP satellite data, your soil moisture levels are at 68% - within the optimal range for corn cultivation. Here's my analysis:",
    dataPoints: [
      { label: "Soil Moisture", value: "68%", trend: "stable" as const, source: "NASA SMAP" },
      { label: "Temperature", value: "24°C", trend: "up" as const, source: "AIRS" },
      { label: "Precipitation", value: "12mm", trend: "down" as const, source: "GPM IMERG" }
    ],
    recommendations: [
      { title: "Reduce Irrigation", description: "Decrease watering by 15% over next 3 days", priority: "high" as const, confidence: 94 },
      { title: "Monitor North Field", description: "Watch for signs of waterlogging in lower areas", priority: "medium" as const, confidence: 87 }
    ]
  },
  'crop-health': {
    content: "Your crops are showing excellent health! MODIS vegetation indices indicate strong chloryphyll activity across most fields:",
    dataPoints: [
      { label: "NDVI", value: "0.82", trend: "up" as const, source: "MODIS Terra" },
      { label: "EVI", value: "0.78", trend: "stable" as const, source: "MODIS Aqua" },
      { label: "LAI", value: "4.2", trend: "up" as const, source: "MODIS Combined" }
    ],
    recommendations: [
      { title: "Continue Current Care", description: "Maintain existing fertilization schedule", priority: "low" as const, confidence: 96 },
      { title: "Monitor Edge Areas", description: "Check field borders for stress indicators", priority: "medium" as const, confidence: 78 }
    ]
  }
}

export default function AIAssistant({ className }: { className?: string }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm TerraAI, your intelligent farming assistant powered by real-time NASA satellite data. I can help you analyze soil conditions, predict yields, monitor crop health, and provide personalized recommendations. What would you like to know about your farm today?",
      timestamp: new Date(Date.now() - 60000)
    }
  ])
  
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(true)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight
      }
    }
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)
    setShowQuickActions(false)

    // Simulate AI response with streaming effect
    const responseId = (Date.now() + 1).toString()
    const streamingMessage: Message = {
      id: responseId,
      type: 'assistant',
      content: '',
      timestamp: new Date(),
      isStreaming: true
    }

    setMessages(prev => [...prev, streamingMessage])

    // Simulate response based on content
    let response = SAMPLE_RESPONSES['soil-analysis']
    if (content.toLowerCase().includes('crop') || content.toLowerCase().includes('health') || content.toLowerCase().includes('vegetation')) {
      response = SAMPLE_RESPONSES['crop-health']
    }

    // Simulate streaming text
    const fullContent = response.content
    let currentContent = ''
    
    for (let i = 0; i < fullContent.length; i++) {
      currentContent += fullContent[i]
      
      setMessages(prev => prev.map(msg => 
        msg.id === responseId 
          ? { ...msg, content: currentContent }
          : msg
      ))
      
      await new Promise(resolve => setTimeout(resolve, Math.random() * 50 + 20))
    }

    // Add final data and recommendations
    setMessages(prev => prev.map(msg => 
      msg.id === responseId 
        ? { 
            ...msg, 
            content: fullContent,
            dataPoints: response.dataPoints,
            recommendations: response.recommendations,
            isStreaming: false
          }
        : msg
    ))

    setIsLoading(false)
  }

  const handleQuickAction = (action: QuickAction) => {
    handleSendMessage(action.prompt)
  }

  const handleVoiceToggle = () => {
    setIsListening(!isListening)
    // In a real implementation, this would interface with speech recognition
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(inputValue)
    }
  }

  const renderMessage = (message: Message) => {
    const isUser = message.type === 'user'
    
    return (
      <div key={message.id} className={cn(
        "flex gap-3 mb-6",
        isUser ? "justify-end" : "justify-start"
      )}>
        {!isUser && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
        )}
        
        <div className={cn(
          "max-w-[80%] space-y-2",
          isUser ? "order-first" : ""
        )}>
          <div className={cn(
            "rounded-2xl px-4 py-3 relative",
            isUser 
              ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white ml-auto" 
              : "glass-light border border-white/10"
          )}>
            <p className={cn(
              "text-sm leading-relaxed",
              isUser ? "text-white" : "glass-text-primary"
            )}>
              {message.content}
              {message.isStreaming && (
                <span className="inline-block w-2 h-4 bg-cyan-400 ml-1 animate-pulse" />
              )}
            </p>
          </div>

          {/* Data Points */}
          {message.dataPoints && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {message.dataPoints.map((point, index) => (
                <div key={index} className="glass-light p-3 rounded-xl border border-white/5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs glass-text-secondary">{point.label}</span>
                    {point.trend && (
                      <TrendingUp className={cn(
                        "w-3 h-3",
                        point.trend === 'up' ? "text-green-400" : 
                        point.trend === 'down' ? "text-red-400" : "text-yellow-400"
                      )} />
                    )}
                  </div>
                  <div className="font-semibold text-sm glass-text-primary">{point.value}</div>
                  <div className="text-xs glass-text-secondary mt-1">{point.source}</div>
                </div>
              ))}
            </div>
          )}

          {/* Recommendations */}
          {message.recommendations && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold glass-text-primary flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                AI Recommendations
              </h4>
              {message.recommendations.map((rec, index) => (
                <div key={index} className="glass-light p-3 rounded-xl border border-white/5">
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="font-medium text-sm glass-text-primary">{rec.title}</h5>
                    <Badge variant={rec.priority === 'high' ? 'destructive' : rec.priority === 'medium' ? 'secondary' : 'outline'} className="text-xs">
                      {rec.priority}
                    </Badge>
                  </div>
                  <p className="text-xs glass-text-secondary mb-2">{rec.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs glass-text-secondary">Confidence:</span>
                    <div className="flex-1 bg-white/10 rounded-full h-1.5">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                        style={{ width: `${rec.confidence}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium glass-text-primary">{rec.confidence}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Message Actions */}
          {!isUser && !message.isStreaming && (
            <div className="flex items-center gap-2 px-2">
              <Button variant="ghost" size="sm" className="h-6 text-xs glass-text-secondary hover:glass-text-primary">
                <Copy className="w-3 h-3 mr-1" />
                Copy
              </Button>
              <Button variant="ghost" size="sm" className="h-6 text-xs glass-text-secondary hover:glass-text-primary">
                <ThumbsUp className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-6 text-xs glass-text-secondary hover:glass-text-primary">
                <ThumbsDown className="w-3 h-3" />
              </Button>
            </div>
          )}

          <div className="text-xs glass-text-secondary px-2">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>

        {isUser && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Header */}
      <div className="glass-nav p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold glass-text-primary">TerraAI Assistant</h3>
              <p className="text-xs glass-text-secondary">Powered by NASA Satellite Data</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
              Online
            </Badge>
            <Button variant="ghost" size="sm" className="glass-text-secondary">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 flex flex-col min-h-0">
        <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
          {messages.map(renderMessage)}
          
          {isLoading && (
            <div className="flex items-center gap-2 glass-text-secondary text-sm">
              <RefreshCw className="w-4 h-4 animate-spin" />
              TerraAI is thinking...
            </div>
          )}
        </ScrollArea>

        {/* Quick Actions */}
        {showQuickActions && (
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium glass-text-primary">Quick Actions</h4>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowQuickActions(false)}
                className="glass-text-secondary h-6"
              >
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
              {QUICK_ACTIONS.map((action) => {
                const Icon = action.icon
                return (
                  <Button
                    key={action.id}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAction(action)}
                    className="glass-button text-xs h-auto py-2 px-3 flex flex-col items-center gap-1"
                    disabled={isLoading}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-center leading-tight">{action.label}</span>
                  </Button>
                )
              })}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-end gap-2">
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask TerraAI about your farm..."
                className="glass-input pr-12 min-h-[44px] resize-none"
                disabled={isLoading}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleVoiceToggle}
                className={cn(
                  "absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0",
                  isListening ? "text-red-500" : "glass-text-secondary"
                )}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
            </div>
            <Button
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim() || isLoading}
              className="glass-button-primary h-11 w-11 p-0"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-4 text-xs glass-text-secondary">
              <div className="flex items-center gap-1">
                <Satellite className="w-3 h-3" />
                Live NASA Data
              </div>
              <div className="flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                AI Powered
              </div>
            </div>
            {!showQuickActions && (
              <Button
                variant="ghost" 
                size="sm"
                onClick={() => setShowQuickActions(true)}
                className="glass-text-secondary text-xs h-6"
              >
                Show Quick Actions
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
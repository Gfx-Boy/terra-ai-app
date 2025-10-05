"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Droplets, Sprout, TrendingUp, AlertTriangle, Sparkles, ArrowRight, MessageSquare } from "lucide-react"
import Link from "next/link"
import FarmSidebar from '@/components/farm-sidebar'
import GlassMobileNav from '@/components/glass-mobile-nav'
import AIAssistant from '@/components/ai-assistant'

export default function AIPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="flex h-screen relative">
      {/* Desktop Glass Sidebar */}
      <div className="hidden md:block glass-sidebar">
        <FarmSidebar 
          isCollapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
      </div>

      {/* Mobile Glass Navigation */}
      <div className="md:hidden">
        <GlassMobileNav 
          isOpen={mobileNavOpen}
          onToggle={() => setMobileNavOpen(!mobileNavOpen)}
        />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col relative">
        <div className="glass-nav p-6 border-b border-white/10">
          <div className="text-center space-y-4">
            <h1 className="text-2xl md:text-4xl font-bold">
              <span className="neon-text">TerraAI</span>{" "}
              <span className="glass-text-primary">Dashboard</span>
            </h1>
            <p className="glass-text-secondary text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
              AI-powered insights from real-time NASA satellite data
            </p>
          </div>
        </div>
        
        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="assistant" className="h-full flex flex-col">
            <div className="px-6 pt-4">
              <TabsList className="glass-nav border border-white/20">
                <TabsTrigger value="assistant" className="glass-text-secondary data-[state=active]:glass-text-primary">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  AI Assistant
                </TabsTrigger>
                <TabsTrigger value="dashboard" className="glass-text-secondary data-[state=active]:glass-text-primary">
                  <Brain className="w-4 h-4 mr-2" />
                  Analytics
                </TabsTrigger>
                <TabsTrigger value="insights" className="glass-text-secondary data-[state=active]:glass-text-primary">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Insights
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="assistant" className="flex-1 p-6 m-0">
              <div className="h-full glass-container border border-white/10 rounded-xl overflow-hidden">
                <AIAssistant />
              </div>
            </TabsContent>

            <TabsContent value="dashboard" className="flex-1 p-6 m-0 overflow-auto">
              <div className="glass-container space-y-6">
      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-light border border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium glass-text-primary">Yield Prediction</CardTitle>
            <TrendingUp className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-1">+12.5%</div>
            <p className="text-xs glass-text-secondary">Above regional average</p>
          </CardContent>
        </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yield Prediction</CardTitle>
            <TrendingUp className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-1">+12.5%</div>
            <p className="text-xs text-muted-foreground">Above regional average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Soil Moisture</CardTitle>
            <Droplets className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">68%</div>
            <p className="text-xs text-muted-foreground">Optimal range (SMAP)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vegetation Health</CardTitle>
            <Sprout className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3">0.82 NDVI</div>
            <p className="text-xs text-muted-foreground">Excellent (MODIS)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Level</CardTitle>
            <AlertTriangle className="h-4 w-4 text-chart-5" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-5">Low</div>
            <p className="text-xs text-muted-foreground">No immediate threats</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle>AI Recommendations</CardTitle>
          </div>
          <CardDescription>Powered by NASA data and machine learning models</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50 border border-border">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-chart-1/20">
              <Droplets className="h-5 w-5 text-chart-1" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold">Optimize Irrigation Schedule</h4>
                <Badge variant="secondary" className="bg-chart-1/20 text-chart-1">
                  High Priority
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                SMAP data shows soil moisture at 68%. Reduce irrigation by 15% over the next 3 days to optimize water
                usage and prevent oversaturation.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-muted-foreground">Confidence: 94%</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">Potential savings: 2,400 gallons</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50 border border-border">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-chart-3/20">
              <Sprout className="h-5 w-5 text-chart-3" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold">Monitor North Field Vegetation</h4>
                <Badge variant="secondary" className="bg-chart-3/20 text-chart-3">
                  Medium Priority
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                MODIS vegetation indices show slight stress in the north field (NDVI: 0.72). Consider nutrient
                supplementation or pest inspection within 5 days.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-muted-foreground">Confidence: 87%</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">Early detection: 2 weeks advance</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50 border border-border">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-chart-2/20">
              <TrendingUp className="h-5 w-5 text-chart-2" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold">Market Timing Opportunity</h4>
                <Badge variant="secondary" className="bg-chart-2/20 text-chart-2">
                  Info
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Climate models predict reduced yields in competing regions. Consider delaying harvest by 1 week to
                capitalize on projected 8% price increase.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-muted-foreground">Confidence: 76%</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">Potential revenue: +$12,400</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* NASA Data Sources */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Active NASA Data Streams</CardTitle>
            <CardDescription>Real-time satellite data integration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-chart-1 animate-pulse" />
                <span className="text-sm font-medium">SMAP Soil Moisture</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                Live
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-chart-1 animate-pulse" />
                <span className="text-sm font-medium">MODIS Vegetation</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                Live
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-chart-1 animate-pulse" />
                <span className="text-sm font-medium">GPM Precipitation</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                Live
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-chart-1 animate-pulse" />
                <span className="text-sm font-medium">ECOSTRESS Evapotranspiration</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                Live
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your farm with AI assistance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/ai/reports">
              <Button variant="outline" className="w-full justify-between bg-transparent">
                View Detailed Analytics
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" className="w-full justify-between bg-transparent">
              Run Yield Simulation
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="w-full justify-between bg-transparent">
              Generate Field Report
              <ArrowRight className="h-4 w-4" />
            </Button>
        <Card className="glass-light border border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium glass-text-primary">Soil Moisture</CardTitle>
            <Droplets className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">68%</div>
            <p className="text-xs glass-text-secondary">Optimal range (SMAP)</p>
          </CardContent>
        </Card>

        <Card className="glass-light border border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium glass-text-primary">Vegetation Health</CardTitle>
            <Sprout className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3">0.82 NDVI</div>
            <p className="text-xs glass-text-secondary">Excellent (MODIS)</p>
          </CardContent>
        </Card>

        <Card className="glass-light border border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium glass-text-primary">Risk Level</CardTitle>
            <AlertTriangle className="h-4 w-4 text-chart-5" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-5">Low</div>
            <p className="text-xs glass-text-secondary">No immediate threats</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="glass-light border border-white/10">
          <CardHeader>
            <CardTitle className="glass-text-primary">Active NASA Data Streams</CardTitle>
            <CardDescription className="glass-text-secondary">Real-time satellite data integration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-chart-1 animate-pulse" />
                <span className="text-sm font-medium glass-text-primary">SMAP Soil Moisture</span>
              </div>
              <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-400">
                Live
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-chart-1 animate-pulse" />
                <span className="text-sm font-medium glass-text-primary">MODIS Vegetation</span>
              </div>
              <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-400">
                Live
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-chart-1 animate-pulse" />
                <span className="text-sm font-medium glass-text-primary">GPM Precipitation</span>
              </div>
              <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-400">
                Live
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-light border border-white/10">
          <CardHeader>
            <CardTitle className="glass-text-primary">Quick Actions</CardTitle>
            <CardDescription className="glass-text-secondary">Manage your farm with AI assistance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/ai/reports">
              <Button variant="outline" className="w-full justify-between glass-button">
                View Detailed Analytics
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" className="w-full justify-between glass-button">
              Run Yield Simulation
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="w-full justify-between glass-button">
              Generate Field Report
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="w-full justify-between glass-button">
              Schedule AI Consultation
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
              </div>
            </TabsContent>

            <TabsContent value="insights" className="flex-1 p-6 m-0 overflow-auto">
              <div className="glass-container space-y-6">
                {/* AI Recommendations */}
                <Card className="glass-light border border-white/10">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      <CardTitle className="glass-text-primary">AI Recommendations</CardTitle>
                    </div>
                    <CardDescription className="glass-text-secondary">Powered by NASA data and machine learning models</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-4 p-4 rounded-lg glass-light border border-white/5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-chart-1/20">
                        <Droplets className="h-5 w-5 text-chart-1" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold glass-text-primary">Optimize Irrigation Schedule</h4>
                          <Badge variant="secondary" className="bg-chart-1/20 text-chart-1">
                            High Priority
                          </Badge>
                        </div>
                        <p className="text-sm glass-text-secondary">
                          SMAP data shows soil moisture at 68%. Reduce irrigation by 15% over the next 3 days to optimize water
                          usage and prevent oversaturation.
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs glass-text-secondary">Confidence: 94%</span>
                          <span className="text-xs glass-text-secondary">•</span>
                          <span className="text-xs glass-text-secondary">Potential savings: 2,400 gallons</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-lg glass-light border border-white/5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-chart-3/20">
                        <Sprout className="h-5 w-5 text-chart-3" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold glass-text-primary">Monitor North Field Vegetation</h4>
                          <Badge variant="secondary" className="bg-chart-3/20 text-chart-3">
                            Medium Priority
                          </Badge>
                        </div>
                        <p className="text-sm glass-text-secondary">
                          MODIS vegetation indices show slight stress in the north field (NDVI: 0.72). Consider nutrient
                          supplementation or pest inspection within 5 days.
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs glass-text-secondary">Confidence: 87%</span>
                          <span className="text-xs glass-text-secondary">•</span>
                          <span className="text-xs glass-text-secondary">Early detection: 2 weeks advance</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-lg glass-light border border-white/5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-chart-2/20">
                        <TrendingUp className="h-5 w-5 text-chart-2" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold glass-text-primary">Market Timing Opportunity</h4>
                          <Badge variant="secondary" className="bg-chart-2/20 text-chart-2">
                            Info
                          </Badge>
                        </div>
                        <p className="text-sm glass-text-secondary">
                          Climate models predict reduced yields in competing regions. Consider delaying harvest by 1 week to
                          capitalize on projected 8% price increase.
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs glass-text-secondary">Confidence: 76%</span>
                          <span className="text-xs glass-text-secondary">•</span>
                          <span className="text-xs glass-text-secondary">Potential revenue: +$12,400</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

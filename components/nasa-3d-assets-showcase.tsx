/**
 * Official NASA 3D Assets Showcase
 * Displays authentic NASA spacecraft models from the official repository
 */

'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Satellite, Download, ExternalLink, Info, Loader2 } from 'lucide-react'
import { officialNASA3DLoader, useNASA3DAssets, NASA3DAsset } from '@/lib/official-nasa-3d-loader'

interface NASA3DShowcaseProps {
  onAssetSelect?: (asset: NASA3DAsset) => void
}

const NASA3DAssetsShowcase: React.FC<NASA3DShowcaseProps> = ({ onAssetSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<'satellites' | 'textures'>('satellites')
  const [selectedAssets, setSelectedAssets] = useState<string[]>([])
  
  // Load initial assets
  const earthSatellites = officialNASA3DLoader.getEarthScienceSatellites()
  const earthTextures = officialNASA3DLoader.getEarthTextures()
  
  // Load selected assets
  const { loadedAssets, loading, error } = useNASA3DAssets(selectedAssets)

  const handleAssetLoad = (assetName: string) => {
    if (!selectedAssets.includes(assetName)) {
      setSelectedAssets(prev => [...prev, assetName])
    }
  }

  const handleAssetSelect = (asset: NASA3DAsset) => {
    if (onAssetSelect) {
      onAssetSelect(asset)
    }
    handleAssetLoad(asset.name)
  }

  const getAssetStatus = (assetName: string) => {
    if (loading && selectedAssets.includes(assetName)) return 'loading'
    if (loadedAssets.has(assetName)) return 'loaded'
    if (selectedAssets.includes(assetName) && error) return 'error'
    return 'available'
  }

  const currentAssets = selectedCategory === 'satellites' ? earthSatellites : earthTextures

  return (
    <Card className="bg-black/80 backdrop-blur-xl border border-blue-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Satellite className="w-5 h-5 text-blue-400" />
          Official NASA 3D Resources
          <Badge className="bg-green-600/20 text-green-300 text-xs">
            Free & Open Source
          </Badge>
        </CardTitle>
        <p className="text-sm text-gray-400">
          Authentic NASA spacecraft models and textures from the official NASA 3D Resources repository
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Category Selector */}
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={selectedCategory === 'satellites' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('satellites')}
            className={selectedCategory === 'satellites' ? 'bg-blue-600' : 'border-blue-500/30 text-blue-300'}
          >
            Earth Science Satellites ({earthSatellites.length})
          </Button>
          <Button
            size="sm"
            variant={selectedCategory === 'textures' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('textures')}
            className={selectedCategory === 'textures' ? 'bg-blue-600' : 'border-blue-500/30 text-blue-300'}
          >
            Earth Textures ({earthTextures.length})
          </Button>
        </div>

        {/* Assets Grid */}
        <div className="grid gap-3 max-h-80 overflow-y-auto">
          {currentAssets.map((asset, index) => {
            const status = getAssetStatus(asset.name)
            
            return (
              <div
                key={index}
                className="p-3 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-blue-500/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-medium text-sm">{asset.name}</h3>
                      <Badge className={`text-xs ${
                        asset.type === 'satellite' ? 'bg-blue-600/20 text-blue-300' :
                        asset.type === 'texture' ? 'bg-green-600/20 text-green-300' :
                        'bg-purple-600/20 text-purple-300'
                      }`}>
                        {asset.type}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-400 mb-1">{asset.description}</div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>🚀 {asset.mission}</span>
                      <span>🏢 {asset.organization}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 ml-2">
                    {status === 'loading' && (
                      <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                    )}
                    {status === 'loaded' && (
                      <div className="w-2 h-2 bg-green-400 rounded-full" title="Loaded" />
                    )}
                    {status === 'error' && (
                      <div className="w-2 h-2 bg-red-400 rounded-full" title="Error" />
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleAssetSelect(asset)}
                    disabled={status === 'loading'}
                    className="bg-blue-600 hover:bg-blue-700 text-xs px-2 py-1 h-auto"
                  >
                    {status === 'loaded' ? 'Loaded' : status === 'loading' ? 'Loading...' : 'Load Asset'}
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => window.open(asset.fileUrl, '_blank')}
                    className="text-gray-400 hover:text-white text-xs px-2 py-1 h-auto"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Status Info */}
        <div className="pt-3 border-t border-gray-700">
          <div className="flex items-center justify-between text-xs">
            <div className="text-gray-400">
              {loadedAssets.size} assets loaded • {selectedAssets.length} selected
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/nasa/NASA-3D-Resources"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" />
                NASA Repository
              </a>
              <a
                href="https://nasa3d.arc.nasa.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                <Info className="w-3 h-3" />
                NASA 3D Portal
              </a>
            </div>
          </div>
          
          {error && (
            <div className="mt-2 text-xs text-red-400 bg-red-900/20 p-2 rounded">
              ⚠️ Some assets failed to load. Using fallback models.
            </div>
          )}
          
          <div className="mt-2 text-xs text-gray-500">
            Models and textures are free and without copyright • NASA/JPL-Caltech • NASA GSFC • NASA ARC
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default NASA3DAssetsShowcase
/**
 * Interactive Location Map - Allows users to select latitude and longitude
 * Features: Click to select coordinates, search locations, preset farm locations
 */

'use client'

import React, { useState, useRef, useEffect } from 'react'
import { MapPin, Search, Globe, Target, X, Check, Navigation } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface LocationMapPickerProps {
  onLocationSelect: (lat: number, lng: number, name?: string) => void
  currentLocation?: { lat: number; lng: number; name?: string }
  isOpen: boolean
  onClose: () => void
}

interface PresetLocation {
  name: string
  lat: number
  lng: number
  description: string
  type: 'farm' | 'research' | 'demo'
}

const LocationMapPicker: React.FC<LocationMapPickerProps> = ({
  onLocationSelect,
  currentLocation,
  isOpen,
  onClose
}) => {
  const [selectedCoords, setSelectedCoords] = useState(
    currentLocation || { lat: 42.0308, lng: -93.5805, name: 'Iowa Farmland' }
  )
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  // Preset agricultural locations for quick selection
  const presetLocations: PresetLocation[] = [
    {
      name: 'Iowa Corn Belt',
      lat: 42.0308,
      lng: -93.5805,
      description: 'Premium agricultural region with rich soil',
      type: 'farm'
    },
    {
      name: 'Kansas Wheat Fields',
      lat: 39.0119,
      lng: -98.4842,
      description: 'Major wheat production area',
      type: 'farm'
    },
    {
      name: 'California Central Valley',
      lat: 36.7783,
      lng: -119.4179,
      description: 'Diverse crop production valley',
      type: 'farm'
    },
    {
      name: 'Nebraska Farmland',
      lat: 41.4925,
      lng: -99.9018,
      description: 'Corn and soybean production',
      type: 'farm'
    },
    {
      name: 'NASA Goddard Maryland',
      lat: 38.9967,
      lng: -76.8480,
      description: 'NASA Earth Science research center',
      type: 'research'
    },
    {
      name: 'NASA Ames California',
      lat: 37.4039,
      lng: -122.0515,
      description: 'NASA Agricultural research facility',
      type: 'research'
    }
  ]

  // Simulated map interaction (in production, you'd use Google Maps, Mapbox, etc.)
  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    
    // Convert click position to approximate lat/lng (simplified mapping)
    // This covers major US agricultural regions
    const lat = 50 - (y * 30) // Range: 50°N to 20°N
    const lng = -130 + (x * 60) // Range: -130°W to -70°W
    
    setSelectedCoords({
      lat: parseFloat(lat.toFixed(4)),
      lng: parseFloat(lng.toFixed(4)),
      name: `Custom Location (${lat.toFixed(2)}°N, ${Math.abs(lng).toFixed(2)}°W)`
    })
  }

  // Search for locations (simplified geocoding simulation)
  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    
    setIsSearching(true)
    
    // Simulate geocoding API call
    setTimeout(() => {
      const mockResults = [
        {
          name: `${searchQuery} Farm Area`,
          lat: 40 + Math.random() * 10,
          lng: -100 - Math.random() * 20,
          description: 'Agricultural region'
        },
        {
          name: `${searchQuery} Research Station`,
          lat: 35 + Math.random() * 15,
          lng: -110 - Math.random() * 30,
          description: 'Research facility'
        }
      ]
      setSearchResults(mockResults)
      setIsSearching(false)
    }, 1000)
  }

  // Handle preset location selection
  const handlePresetSelect = (location: PresetLocation) => {
    setSelectedCoords({
      lat: location.lat,
      lng: location.lng,
      name: location.name
    })
  }

  // Confirm selection
  const handleConfirm = () => {
    onLocationSelect(selectedCoords.lat, selectedCoords.lng, selectedCoords.name)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="bg-slate-900 border-blue-500/30 max-w-4xl w-full max-h-[90vh] overflow-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-400" />
              Select Farm Location
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search for agricultural regions, cities, or coordinates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10 bg-slate-800 border-slate-600 text-white"
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={isSearching}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSearching ? 'Searching...' : 'Search'}
            </Button>
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-300">Search Results</h3>
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedCoords(result)}
                  className="p-3 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-medium">{result.name}</div>
                      <div className="text-sm text-gray-400">{result.description}</div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {result.lat.toFixed(4)}°N, {Math.abs(result.lng).toFixed(4)}°W
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-6">
            {/* Preset Locations */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Quick Select
              </h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {presetLocations.map((location, index) => (
                  <div
                    key={index}
                    onClick={() => handlePresetSelect(location)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedCoords.lat === location.lat && selectedCoords.lng === location.lng
                        ? 'bg-blue-600/20 border border-blue-500/50'
                        : 'bg-slate-800 hover:bg-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-medium text-sm">{location.name}</span>
                      <Badge className={`text-xs ${
                        location.type === 'farm' ? 'bg-green-600/20 text-green-300' :
                        location.type === 'research' ? 'bg-purple-600/20 text-purple-300' :
                        'bg-blue-600/20 text-blue-300'
                      }`}>
                        {location.type}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-400 mb-1">{location.description}</div>
                    <div className="text-xs text-gray-500">
                      {location.lat.toFixed(4)}°N, {Math.abs(location.lng).toFixed(4)}°W
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Map */}
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Interactive Map
              </h3>
              
              <div
                ref={mapContainerRef}
                onClick={handleMapClick}
                className="relative w-full h-64 bg-gradient-to-br from-green-900 via-green-700 to-blue-800 rounded-lg cursor-crosshair overflow-hidden"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 20% 30%, rgba(34, 139, 34, 0.3) 0%, transparent 50%),
                    radial-gradient(circle at 60% 70%, rgba(107, 142, 35, 0.4) 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba(46, 125, 50, 0.3) 0%, transparent 50%)
                  `
                }}
              >
                {/* Map Grid */}
                <div className="absolute inset-0 opacity-20">
                  {Array.from({ length: 10 }, (_, i) => (
                    <div key={`h-${i}`} className="absolute w-full border-t border-white/20" style={{ top: `${i * 10}%` }} />
                  ))}
                  {Array.from({ length: 10 }, (_, i) => (
                    <div key={`v-${i}`} className="absolute h-full border-l border-white/20" style={{ left: `${i * 10}%` }} />
                  ))}
                </div>

                {/* Selected Location Marker */}
                <div
                  className="absolute w-6 h-6 -ml-3 -mt-3 z-10"
                  style={{
                    left: `${((selectedCoords.lng + 130) / 60) * 100}%`,
                    top: `${((50 - selectedCoords.lat) / 30) * 100}%`
                  }}
                >
                  <div className="w-full h-full bg-red-500 rounded-full border-2 border-white animate-pulse shadow-lg" />
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {selectedCoords.lat.toFixed(4)}°N, {Math.abs(selectedCoords.lng).toFixed(4)}°W
                  </div>
                </div>

                {/* Preset Location Markers */}
                {presetLocations.map((location, index) => (
                  <div
                    key={index}
                    className="absolute w-3 h-3 -ml-1.5 -mt-1.5 bg-blue-400 rounded-full border border-white opacity-60 hover:opacity-100 cursor-pointer"
                    style={{
                      left: `${((location.lng + 130) / 60) * 100}%`,
                      top: `${((50 - location.lat) / 30) * 100}%`
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      handlePresetSelect(location)
                    }}
                    title={location.name}
                  />
                ))}

                {/* Map Labels */}
                <div className="absolute top-2 left-2 text-white text-xs bg-black/50 px-2 py-1 rounded">
                  Click anywhere to select coordinates
                </div>
                <div className="absolute bottom-2 right-2 text-white text-xs bg-black/50 px-2 py-1 rounded">
                  US Agricultural Regions
                </div>
              </div>
            </div>
          </div>

          {/* Current Selection */}
          <div className="bg-slate-800 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-300 mb-2">Selected Location</h3>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">{selectedCoords.name}</div>
                <div className="text-sm text-gray-400">
                  Latitude: {selectedCoords.lat.toFixed(6)}°N, Longitude: {Math.abs(selectedCoords.lng).toFixed(6)}°W
                </div>
              </div>
              <Button
                onClick={handleConfirm}
                className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Use This Location
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LocationMapPicker
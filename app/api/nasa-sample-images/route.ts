/**
 * NASA Sample Images API - Serves generated satellite-style imagery
 * Creates sample imagery that represents different NASA data types
 */

import { NextRequest, NextResponse } from 'next/server'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type') || 'truecolor'
  
  // Generate SVG-based imagery that looks like satellite data
  const generateSatelliteImageSVG = (dataType: string) => {
    const width = 800
    const height = 600
    
    const patterns = {
      vegetation: {
        colors: ['#8B4513', '#DAA520', '#228B22', '#32CD32'],
        title: 'NDVI Vegetation Index'
      },
      moisture: {
        colors: ['#4169E1', '#1E90FF', '#87CEEB', '#B0E0E6'],
        title: 'SMAP Soil Moisture'
      },
      temperature: {
        colors: ['#FF4500', '#FF6347', '#FFA500', '#FFD700'],
        title: 'Land Surface Temperature'
      },
      truecolor: {
        colors: ['#4A5D23', '#6B8E23', '#8FBC8F', '#90EE90'],
        title: 'True Color Composite'
      }
    }
    
    const pattern = patterns[dataType as keyof typeof patterns] || patterns.truecolor
    
    // Create a gradient pattern that simulates agricultural satellite imagery
    const gradientStops = pattern.colors.map((color, index) => 
      `<stop offset="${(index / (pattern.colors.length - 1)) * 100}%" stop-color="${color}"/>`
    ).join('')
    
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="grad1" cx="50%" cy="50%" r="80%">
            ${gradientStops}
          </radialGradient>
          <pattern id="farmPattern" patternUnits="userSpaceOnUse" width="50" height="50">
            <rect width="50" height="50" fill="url(#grad1)" opacity="0.8"/>
            <circle cx="25" cy="25" r="20" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
          </pattern>
        </defs>
        
        <!-- Base agricultural landscape -->
        <rect width="100%" height="100%" fill="url(#grad1)"/>
        
        <!-- Simulate field patterns -->
        <rect x="0" y="0" width="100%" height="100%" fill="url(#farmPattern)" opacity="0.6"/>
        
        <!-- Add some geometric field divisions like real satellite imagery -->
        <g stroke="rgba(255,255,255,0.3)" stroke-width="2" fill="none">
          <line x1="200" y1="0" x2="200" y2="${height}"/>
          <line x1="400" y1="0" x2="400" y2="${height}"/>
          <line x1="600" y1="0" x2="600" y2="${height}"/>
          <line x1="0" y1="150" x2="${width}" y2="150"/>
          <line x1="0" y1="300" x2="${width}" y2="300"/>
          <line x1="0" y1="450" x2="${width}" y2="450"/>
        </g>
        
        <!-- Data overlay text -->
        <text x="20" y="30" fill="white" font-family="monospace" font-size="14" opacity="0.8">
          🛰️ ${pattern.title}
        </text>
        <text x="20" y="50" fill="white" font-family="monospace" font-size="12" opacity="0.6">
          Iowa Farmland • 42.03°N, 93.58°W
        </text>
        <text x="20" y="${height - 20}" fill="white" font-family="monospace" font-size="10" opacity="0.6">
          NASA/GSFC • Synthetic demonstration data
        </text>
      </svg>
    `
    
    return svg
  }
  
  const svgContent = generateSatelliteImageSVG(type)
  
  return new NextResponse(svgContent, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*'
    }
  })
}
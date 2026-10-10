// src/data/photography.ts

export interface PhotoItem {
  id: string;
  title: string;
  src: string;
  alt: string;
  location?: string;
  date?: string;
  description?: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square';
  isSample?: boolean;
}

/**
 * Casual Photography Gallery Data.
 * 
 * TO ADD YOUR OWN PHOTOGRAPHS:
 * 1. Place your photo files in `public/photography/` (e.g. `public/photography/sunset-monsoon.jpg`).
 * 2. Add an entry to the `photosData` array below with the path `${import.meta.env.BASE_URL}photography/your-photo.jpg`.
 * 3. Supply optional details (title, location, date, description, alt text).
 */
export const photosData: PhotoItem[] = [
  {
    id: 'sample-photo-1',
    title: 'Monsoon Light',
    src: '',
    alt: 'Golden twilight breaking through storm clouds over quiet tree line',
    location: 'Kerala, India',
    date: 'August 2024',
    description: 'Caught between sudden downpours when the evening sky turned incandescent amber.',
    aspectRatio: 'landscape',
    isSample: true,
  },
  {
    id: 'sample-photo-2',
    title: 'Angles of Transit',
    src: '',
    alt: 'Geometric shadows casting diagonals across train platform architecture',
    location: 'Railway Station',
    date: 'November 2024',
    description: 'Harsh midday shadows cutting geometric diagonals across the platform.',
    aspectRatio: 'portrait',
    isSample: true,
  },
  {
    id: 'sample-photo-3',
    title: 'Quiet Canopy',
    src: '',
    alt: 'Lush green foliage reflected in morning dew',
    location: 'Campus Grounds',
    date: 'January 2025',
    description: 'Gentle mist and still water reflecting morning greenery.',
    aspectRatio: 'square',
    isSample: true,
  },
  {
    id: 'sample-photo-4',
    title: 'Solitary Window',
    src: '',
    alt: 'Old wooden window shutter framed by terracotta wall textures',
    location: 'Heritage Quarter',
    date: 'February 2025',
    description: 'Weathered textures and quiet architecture bathed in late afternoon sun.',
    aspectRatio: 'portrait',
    isSample: true,
  },
  {
    id: 'sample-photo-5',
    title: 'City in Motion',
    src: '',
    alt: 'Long exposure of distant headlights along an open bypass',
    location: 'Bypass Road',
    date: 'March 2025',
    description: 'Watching taillights trace lines of light into the distance.',
    aspectRatio: 'landscape',
    isSample: true,
  },
  {
    id: 'sample-photo-6',
    title: 'Stillness at Dusk',
    src: '',
    alt: 'Minimalist horizon line with silhouette of lone telephone wire and birds',
    location: 'Rooftop',
    date: 'April 2025',
    description: 'Five minutes of absolute calm as dusk settles over the neighborhood.',
    aspectRatio: 'square',
    isSample: true,
  },
];

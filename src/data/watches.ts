// src/data/watches.ts

export interface WatchItem {
  id: string;
  name: string;
  brand: string;
  modelRef?: string;
  movement?: string; // e.g. "Automatic", "Quartz", "Solar", "Manual Wind", "Digital"
  strap?: string; // e.g. "Oyster Stainless Steel", "Leather Strap", "Resin Strap"
  note?: string; // Personal note on why owned/appreciated
  images: string[];
  isSample?: boolean; // Set to true for placeholder/template cards until real photos and pieces are added
}

/**
 * Personal watch collection archive.
 * 
 * TO ADD YOUR OWN WATCHES:
 * 1. Add your watch photos to `public/watches/` (e.g. `public/watches/my-watch.jpg`).
 * 2. Add or replace items in the `watchesData` array below.
 * 3. Set `isSample: false` or omit the flag for your genuine pieces.
 */
export const watchesData: WatchItem[] = [
  {
    id: 'sample-seiko-automatic',
    name: '5 Automatic',
    brand: 'Seiko',
    modelRef: 'Ref. SNXS79',
    movement: 'Automatic (7S26)',
    strap: 'Stainless Steel Bracelet',
    note: 'An honest everyday mechanical piece appreciated for its classic proportions, reliable workhorse movement, and timeless sunburst dial.',
    images: [],
    isSample: true,
  },
  {
    id: 'sample-casio-digital',
    name: 'Classic Digital',
    brand: 'Casio',
    modelRef: 'Ref. A168W',
    movement: 'Quartz Digital',
    strap: 'Stainless Steel Fold-over Clasp',
    note: 'Utilitarian, iconic, and virtually indestructible. A nostalgic reminder that good design does not need to be complicated.',
    images: [],
    isSample: true,
  },
  {
    id: 'sample-citizen-ecodrive',
    name: 'Eco-Drive Field',
    brand: 'Citizen',
    modelRef: 'Ref. BM8180',
    movement: 'Solar Quartz (Eco-Drive)',
    strap: 'Canvas Olive Green Strap',
    note: 'Solar-powered grab-and-go simplicity with high-legibility numerals and rugged field watch aesthetics.',
    images: [],
    isSample: true,
  },
];

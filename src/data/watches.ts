// src/data/watches.ts

export interface WatchItem {
  id: string;
  name: string;
  brand: string;
  modelRef?: string;
  movement?: string;
  strap?: string;
  note?: string;
  images: string[];
  isSample?: boolean;
}

export const watchesData: WatchItem[] = [
  {
    id: 'timex-waterbury-chrono',
    name: 'The Waterbury Flyback Chronograph',
    brand: 'Timex',
    modelRef: 'Intelligent Quartz Chrono',
    movement: 'Intelligent Quartz Flyback Chronograph',
    strap: 'Textured Black Silicone Strap',
    note: 'Tactical flyback chronograph paired with everyday carry essentials: fountain pens, pocket knives, and notebooks.',
    images: ['/beyondcode/watches/thumbnail/timex.png', '/beyondcode/watches/timex.jpg'],
    isSample: false,
  },
  {
    id: 'hmt-janata-1983',
    name: 'Janata 1983 Mechanical',
    brand: 'HMT',
    modelRef: 'Caliber 0231 Para Shock 17 Jewels',
    movement: 'Mechanical Hand-Wound (Citizen 0231 licensed)',
    strap: 'Stainless Steel Linked Bracelet',
    note: 'Indian horological heritage manufactured in Bangalore in 1983. Photographed on the wrist beside white jasmine blossoms.',
    images: ['/beyondcode/watches/thumbnail/hmt.png', '/beyondcode/watches/hmt.jpg'],
    isSample: false,
  },
  {
    id: 'titan-octane-diver',
    name: 'Octane Hyperlume Diver',
    brand: 'Titan',
    modelRef: 'Ref. 90104QM01',
    movement: 'Quartz Chronograph 200M',
    strap: 'Saddle Brown Leather Strap',
    note: 'Substantial tool presence with high contrast markers and heavy rotating bezel, captured in golden hour sunlight.',
    images: ['/beyondcode/watches/thumbnail/titan.png', '/beyondcode/watches/titan.jpg'],
    isSample: false,
  },
  {
    id: 'fossil-hybrid-fb01',
    name: 'Hybrid FB-01 Diver',
    brand: 'Fossil',
    modelRef: 'Ref. FTW1198',
    movement: 'Smart Hybrid Quartz (Physical Hands + Bluetooth)',
    strap: 'Accordion Black Diver Strap',
    note: 'Physical analog hands with vivid nocturnal green luminescence and stealth vibration notifications.',
    images: ['/beyondcode/watches/thumbnail/fossil.png', '/beyondcode/watches/fossil.jpg'],
    isSample: false,
  },
  {
    id: 'g-shock-gw-b5600hr',
    name: 'GW-B5600HR Tough Solar',
    brand: 'Casio G-SHOCK',
    modelRef: 'Ref. GW-B5600HR-1DR',
    movement: 'Tough Solar Multi-Band 6 with Bluetooth Time Sync',
    strap: 'Combi Bracelet (Resin & Steel with red inner lining)',
    note: 'The indestructible benchmark. Featured in rainforest canopy water tests with moisture droplets resting on the matte resin bezel.',
    images: ['/beyondcode/watches/thumbnail/gwb5600.png', '/beyondcode/watches/gwb5600.jpg'],
    isSample: false,
  },
  {
    id: 'casio-ws-220',
    name: 'WS-220 Tough Solar',
    brand: 'Casio',
    modelRef: 'Ref. WS-220-1AV',
    movement: 'Tough Solar Quartz with Dual Digital Display',
    strap: 'Sport Resin Strap',
    note: 'The genesis runner piece resting on driftwood beside river rapids, absorbing sunlight for continuous power.',
    images: ['/beyondcode/watches/thumbnail/ws220.png', '/beyondcode/watches/ws220.jpg'],
    isSample: false,
  },
  {
    id: 'g-shock-gg1000',
    name: 'Mudmaster GG-1000',
    brand: 'Casio G-SHOCK',
    modelRef: 'Ref. GG-1000-1A',
    movement: 'Twin Sensor Quartz (Digital Compass & Thermometer)',
    strap: 'Heavy Resin Strap with Dual Buckle',
    note: 'Master of G mud-resistant tactical field piece with high-brightness Super Illuminator.',
    images: ['/beyondcode/watches/gg1000.jpg'],
    isSample: false,
  },
  {
    id: 'titan-nc1482yl05',
    name: 'NC1482YL05 Heirloom',
    brand: 'Titan',
    modelRef: 'Ref. NC1482YL05',
    movement: 'Quartz 3-Hand',
    strap: 'Leather Dress Strap',
    note: 'Cherished heirloom passed down through family elders; value measured in lineage and memory.',
    images: ['/1000284820.jpeg'],
    isSample: false,
  },
  {
    id: 'kademan-dual-display',
    name: 'Chrono Dual-Time',
    brand: 'Kademan',
    modelRef: 'Dual-Time Series',
    movement: 'Quartz Dual Movement (Analog + Multi-LCD)',
    strap: 'Gunmetal Steel Bracelet',
    note: 'Bold case architecture with dual time zones and stopwatch readout for casual rotation.',
    images: ['/beyondcode/watches/kademan.jpg'],
    isSample: false,
  },
  {
    id: 'casio-beside',
    name: 'Beside Classical Series',
    brand: 'Casio',
    modelRef: 'Beside Dress Series',
    movement: 'Japanese Quartz 3-Hand',
    strap: 'Stainless Steel Bracelet',
    note: 'Understated dress watch with guilloché dial and classic European proportions.',
    images: ['/beyondcode/watches/BESIDE.jpg'],
    isSample: false,
  },
];


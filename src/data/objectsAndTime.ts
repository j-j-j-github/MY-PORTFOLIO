export interface WatchStoryData {
  title: string;
  subtitle?: string;
  lead?: string;
  paragraphs: string[];
  closingEmphasis?: string;
  isPlaceholder?: boolean;
}

export interface ArchiveInfo {
  watchType: string;
  statusOrCondition: string;
  distinctiveFeature: string;
  classification: string;
}

export interface WatchPiece {
  id: string;
  brand: string;
  model: string;
  category: string;
  shortDescription: string;
  signatureFeatures?: string;
  isSpecialEmphasis?: boolean;
  personalNote: string;
  archiveNote?: string;
  archiveInfo?: ArchiveInfo;
  collectionStatus: 'Active Rotation' | 'Occasional Wear' | 'Heirloom & Kept' | 'Archived';
  verifiedDetails: {
    label: string;
    value: string;
  }[];
  heroImage: string; // Lifestyle wrist photograph for detail page
  thumbnailImage?: string; // Thumbnail cutout for collection cards
  galleryImages: {
    caption: string;
    image: string;
  }[];
  reviewId?: string;
  relatedStoryIds: string[];
  story?: WatchStoryData;
}

export interface WatchReview {
  id: string;
  watchId: string;
  model: string;
  excerpt: string;
  coverImage: string;
  sections: {
    whyIBoughtIt: string;
    designAndBuild: string;
    onTheWrist: string;
    livingWithIt: string;
    whatILove: string[];
    whatIDont: string[];
    wouldIBuyItAgain: string;
    verdict: string;
  };
}

export interface WatchStory {
  id: string;
  title: string;
  date?: string;
  watchId: string;
  watchName: string;
  description: string;
  fullNarrative: string;
  image: string; // Real-life photo placeholder
}

export interface EDCItem {
  id: string;
  name: string;
  category: string;
  note: string;
  image: string;
  linkedWatchId?: string;
}

export const mainWatchesData: WatchPiece[] = [
  {
    id: 'timex-waterbury-chrono',
    brand: 'Timex',
    model: 'The Waterbury Flyback Chronograph',
    category: 'Chronograph',
    isSpecialEmphasis: false,
    shortDescription:
      'A distinctive blacked out chronograph with retrograde displays, flyback functionality, and a clever second time zone feature.',
    signatureFeatures: 'Flyback · Retrograde · Dual Time',
    personalNote:
      'Engineered for measured intervals. The flyback complication allows an instant reset without stopping the chronograph. Paired on black silicone alongside fountain pens and notebooks, it is the quintessential desk and carry companion.',
    collectionStatus: 'Active Rotation',
    verifiedDetails: [
      { label: 'Reference', value: 'TW2W48000UJ (Waterbury Traditional)' },
      { label: 'Movement', value: 'Analogue quartz flyback chronograph (proprietary German engineering)' },
      { label: 'Dimensions', value: '43 mm diameter, 12 mm thickness, 22 mm lug width' },
      { label: 'Case Material', value: 'Stainless steel with matte black protective coating' },
      { label: 'Crystal', value: 'Mineral glass' },
      { label: 'Dial', value: 'Matte black tactical instrument dial with retrograde displays' },
      { label: 'Chronograph', value: 'Flyback instant reset and restart, 1/5 second resolution' },
      { label: 'Subdials', value: '10 minute lower retrograde, 4 hour upper accumulator' },
      { label: 'Second Time Zone', value: 'Upper retrograde display indicates dual time when chrono is inactive' },
      { label: 'Water Resistance', value: '100 metres / 10 bar' },
      { label: 'Illumination', value: 'Luminous hour and minute hands' },
      { label: 'Calendar', value: 'Quick date aperture near 2:30' },
      { label: 'Crown', value: 'Signed Waterbury W crown' },
      { label: 'Original MRP', value: '₹14,495' },
    ],
    heroImage: '/beyondcode/watches/timex.jpg',
    thumbnailImage: '/beyondcode/watches/thumbnail/timex.png',
    galleryImages: [
      { caption: 'Flat lay with fountain pen and Victorinox knife', image: '/beyondcode/watches/timex.jpg' },
    ],
    reviewId: 'review-timex-waterbury',
    relatedStoryIds: ['story-everyday-carry'],
    story: {
      title: 'The Final Stretch',
      subtitle: 'Timex Waterbury Fly-Back Chronograph · 2026',
      lead: "Two years of my master's degree seemed to pass almost before I realised it.",
      paragraphs: [
        "Between classes, projects, and everything else that came with pursuing my MCA, life had become considerably busier. My HMT Janata, along with the other watches I'd collected over the years, accompanied me through those days, each finding its way onto my wrist depending on the occasion.",
        "And before I knew it, I was approaching the final chapter of my student life.",
        "With my final year and a six-month internship ahead of me, I wanted another watch. Something that, years from now, I could look at and remember this particular period of my life. Just as my first Casio reminded me of school and my Titan marked the end of my bachelor's degree, I wanted something to represent the closing stretch of my master's.",
        "But by now, the way I approached buying watches had changed.",
        "I no longer wanted to buy something simply because it looked interesting or happened to be available at a good price. I had started looking at my collection as a whole, thinking about what each watch contributed and what was still missing.",
        "I also liked the idea of representing different watch brands through individual pieces that genuinely appealed to me. If I was going to add another brand to my collection, I wanted the watch I chose to give me a good reason for doing so.",
        "And there was one particular type of watch I'd wanted for quite some time.",
        "A chronograph.",
        "I'd always found chronographs fascinating. The extra hands, subdials, pushers, and the ability to measure elapsed time made them feel like little instruments rather than ordinary watches.",
        "I liked the idea of timing things just for the sake of it. Whether it was measuring how long something took or simply watching the chronograph seconds hand travel around the dial, there was something satisfying about having that functionality available on my wrist.",
        "More importantly, I didn't own one yet.",
        "My collection already had digital watches, a hybrid, a diver, and a vintage mechanical watch. A chronograph would introduce something genuinely different.",
        "So the search began.",
        "Among the brands I considered, Timex was one that had interested me for quite some time. It had a long history, a recognisable identity, and several collections that I found appealing. I'd always wanted to own a Timex, but until then, I hadn't found the particular model that felt right.",
        "One thing that had originally attracted me to the brand was Indiglo, Timex's distinctive dial illumination technology.",
        "I thought that if I were going to own a Timex, having Indiglo would make the watch feel especially representative of the brand. But as I explored the catalogue, I realised that many of the models offering it weren't necessarily the watches I wanted.",
        "The Weekender and certain Expedition models were interesting in their own right, but I was looking for something with more going on. Something that would introduce a new experience rather than simply add another conventional quartz watch to my collection.",
        "Eventually, my search narrowed towards three collections: the Q Timex, the Marlin, and the Waterbury.",
        "I'd spent plenty of time looking at photographs and reviews, but I still had no idea how some of these watches would actually feel on my wrist.",
        "Then, one day, while I was out with friends, I came across a watch shop.",
        "I decided to try a few.",
        "The Q Timex chronograph, particularly with its panda-style dial, was one I'd admired online. But the moment I put it on, something didn't quite work for me. The vintage-inspired case, bracelet, and lug design looked great in photographs, yet on my wrist they didn't feel like what I was searching for.",
        "It was a reminder that liking a watch online and enjoying it on your wrist can be two completely different things.",
        "The Marlin, on the other hand, was a different experience.",
        "I liked its design, it sat nicely on my wrist, and even my friends thought it looked good. For a while, I was fairly convinced that a Marlin chronograph would be my next watch.",
        "But I kept looking.",
        "I wasn't entirely sure what was missing. I just had that feeling that somewhere in the catalogue, there might be something that suited me even better.",
        "And eventually, I found it.",
        "The Timex Waterbury Fly-Back Chronograph.",
        "The first thing that caught my attention was its appearance.",
        "It was almost entirely blacked out, with a bold case and a busy, instrument-like dial. It had a rugged, almost tactical character that reminded me of military and aviation watches. Having always enjoyed military films and that particular style of equipment, I immediately found it appealing.",
        "It looked unlike anything else in my collection.",
        "But the design was only the beginning.",
        "I've always liked watches with complicated dials. The more there is to explore, the more curious I become about how everything works. And this Waterbury had one of the most unusual chronograph layouts I'd come across.",
        "Instead of the familiar circular subdials found on most chronographs, it had two fan-shaped displays positioned near ten and four o'clock.",
        "At first glance, they almost looked misplaced.",
        "The arrangement was unconventional, perhaps even strange to someone expecting a traditional chronograph layout. But that was exactly what I liked about it.",
        "The sweeping central chronograph hand, the retrograde indicators, the multiple scales, and the overall arrangement made the dial feel like a miniature instrument panel.",
        "It was busy, complicated, and wonderfully different.",
        "And then I discovered what it could actually do.",
        "This wasn't just a regular chronograph. It was a flyback.",
        "With a conventional chronograph, starting a fresh measurement generally means stopping the timer, resetting it, and starting again. A flyback allows a running measurement to be reset and restarted through a much quicker operation.",
        "Did I have some important practical need for that capability?",
        "Probably not.",
        "But I absolutely loved the fact that it could do it.",
        "A flyback chronograph wasn't something I expected to find so accessibly, especially within the budget I had set for myself. Seeing Timex offer this function made the watch considerably more interesting.",
        "And just when I thought I'd discovered everything, there was another surprise.",
        "The upper chronograph indicator could also display a second time zone when the chronograph wasn't being used.",
        "That meant the watch offered another useful function without adding a separate conventional GMT hand or making the dial any more crowded than it already was.",
        "I found that brilliant.",
        "It reminded me, in a way, of my Fossil Hybrid. The two watches were entirely different, but both appealed to the same part of my curiosity. Their movements could make hands do more than simply indicate the passing hours and minutes.",
        "There was something satisfying about understanding how all those functions worked together.",
        "It was a watch that rewarded curiosity.",
        "The more I learned about it, the more certain I became.",
        "The Marlin had looked wonderful on my wrist. The Q chronograph had an unmistakable vintage charm. And an Indiglo-equipped Timex would have been an interesting addition in its own way.",
        "But the Waterbury was the one that felt like it had been made for my particular interests.",
        "It offered a new complication, a distinctive design, a second time zone, and an approach to displaying information that I hadn't experienced before. It was also my opportunity to finally bring Timex into the collection through a model I genuinely admired.",
        "So I chose the Waterbury Fly-Back Chronograph.",
        "As I entered the final stretch of my master's, it felt appropriate to have a watch that was about more than simply telling the time.",
        "Throughout my years as a student, watches had become little reminders of different periods in my life. Some were gifts for myself, some fulfilled childhood wishes, and others represented discoveries I'd made along the way.",
        "This one would remind me of my final year, the work I'd put into getting here, and the transition from student life towards whatever came next.",
        "And perhaps that's why a chronograph felt like such a fitting choice.",
        "After spending years learning to appreciate different ways of keeping time, I'd finally chosen a watch that let me measure it too.",
      ],
      closingEmphasis: 'A watch to measure the little moments, and to remember one of the biggest chapters of my life.',
      isPlaceholder: false,
    },
  },
  {
    id: 'hmt-janata-1983',
    brand: 'HMT',
    model: 'Janata 1983',
    category: 'Vintage Mechanical',
    isSpecialEmphasis: true,
    shortDescription:
      'A classic hand wound Indian timepiece, featuring a timeless silver dial, Hindi lettering, and decades of watchmaking heritage.',
    signatureFeatures: 'Hand Wound · 17 Jewels · Indian Heritage',
    personalNote:
      'There is something deeply poetic about winding a watch by hand every single morning. Produced in 1983, its ticking is audible in a quiet room, carrying forty years of history on a clean, minimal cream dial.',
    collectionStatus: 'Heirloom & Kept',
    verifiedDetails: [
      { label: 'Model', value: 'HMT Janata' },
      { label: 'Calibre', value: 'HMT 0231 (historical Citizen 0201 ancestry)' },
      { label: 'Movement Type', value: 'Mechanical, manual hand winding (no battery or rotor)' },
      { label: 'Jewels', value: '17 Jewels' },
      { label: 'Frequency', value: '18,000 vibrations/hour (2.5 Hz, 5 ticks per second)' },
      { label: 'Power Reserve', value: 'Approximately 38 hours' },
      { label: 'Escapement', value: 'Swiss lever escapement with Citizen Parashock protection' },
      { label: 'Dimensions', value: '~26 mm movement diameter, ~4.55 mm movement thickness' },
      { label: 'Dial', value: 'Silver white with applied baton indices' },
      { label: 'Model Lettering', value: 'Hindi Devanagari script (जनता)' },
      { label: 'Hands', value: 'Hour, minute, and distinct silver centre seconds' },
      { label: 'Crystal', value: 'Domed acrylic' },
      { label: 'Case & Caseback', value: 'Vintage metal case with stainless steel marked caseback' },
      { label: 'Origin & Era', value: 'HMT Bangalore, India (reported 1983)' },
      { label: 'Winding', value: 'Crown operated manual hand winding' },
      { label: 'Original MRP', value: '₹4000' },
    ],
    heroImage: '/beyondcode/watches/hmt.jpg',
    thumbnailImage: '/beyondcode/watches/thumbnail/hmt.png',
    galleryImages: [
      { caption: 'Silver white dial under studio spotlight', image: '/beyondcode/watches/hmt.jpg' },
    ],
    reviewId: 'review-hmt-janata',
    relatedStoryIds: ['story-graduation-day'],
    story: {
      title: 'A Different Kind of Time',
      subtitle: "HMT Janata · 2025 · The Beginning of My Master's",
      lead: "After graduating with my bachelor's degree in Computer Applications, I was preparing for another chapter of my education: my master's.",
      paragraphs: [
        'And naturally, I wanted a watch to mark the occasion.',
        'By this point, my collection had grown to include digital watches, a G-Shock, a hybrid smartwatch, and a diver. Each had introduced me to something different, but they all had one thing in common. They were powered by quartz movements.',
        "There was still an entire side of watchmaking I hadn't experienced.",
        'Mechanical watches had always fascinated me. The idea that a watch could run entirely through a system of springs, gears, and carefully arranged components, without needing a battery, was something I found remarkable. Even more fascinating was the thought that, with proper care and maintenance, such a watch could continue working for decades and potentially be passed down through generations.',
        'I wanted to experience that for myself.',
        "But there was a problem. I was still a student, and my budget was limited. By then, I'd also reached a point where I didn't particularly want to keep asking my parents to buy me watches. What had started as an innocent childhood interest had gradually become a collection, and I wanted to be more responsible about how I added to it.",
        'So I began searching for an affordable mechanical watch.',
        "Most of the options within my budget were inexpensive Chinese-made watches that didn't particularly interest me. I wanted something with a little more character, something I could genuinely appreciate beyond simply having a mechanical movement inside.",
        'And somewhere along that search, I stumbled into the world of vintage watches.',
        "At first, I didn't understand the appeal.",
        "Why would someone deliberately buy an old watch that had already spent decades on another person's wrist? Why choose something used, possibly scratched, and technologically outdated when you could buy something new, polished, and more accurate?",
        'It was a genuine question I had.',
        "Until then, I'd always been drawn towards newer technology. Solar power, Bluetooth connectivity, advanced functions, improved materials. In my mind, progress usually meant getting something better than what came before.",
        'But the more I learned about vintage watches, the more that perspective began to change.',
        "I started appreciating things that couldn't necessarily be measured through specifications. The history behind a particular model, the years it had survived, the way its design reflected another era, and the possibility that something made decades before I was born could still be ticking today.",
        "For the first time, I found myself wanting a watch not because it was newer or more advanced, but precisely because it wasn't.",
        'That curiosity eventually led me to HMT.',
        'As an Indian watch enthusiast, discovering the history of Hindustan Machine Tools was fascinating. Here was a company that had once been an important part of watchmaking in India, producing mechanical watches that became familiar to generations of people across the country.',
        'I began looking into models such as the Kohinoor and Janata, learning about their movements, designs, and the various dial configurations produced over the years.',
        'I also became particularly interested in watches featuring Devanagari lettering. I wanted my first vintage watch to have something that visibly connected it to India, rather than simply being another dress watch with a familiar brand name.',
        'But finding the right HMT turned out to be much harder than I expected.',
        'As I explored the vintage market, I discovered another side of collecting: redials, replacement cases, aftermarket components, and the so-called Franken-watches assembled from parts of different watches.',
        'A watch could look beautiful in photographs and still be very different from what it originally was.',
        "I didn't want to rush into buying something just to say I owned an HMT. I wanted a convincing original example, one I could appreciate without constantly questioning what had been changed.",
        'And so the search continued.',
        'For months, I went back and forth between models, looking through listings, learning from other collectors, and trying to find something that suited both my taste and my budget.',
        "The funny thing is, the Janata wasn't even one of my favourites initially.",
        "Most of the examples I'd seen had a red seconds hand. It was a small detail, but one that never quite appealed to me. I wanted something understated and elegant, and that little touch of red made the watch feel sportier than I wanted.",
        'Then, through a friend in the watch community who was selling some of his vintage HMTs, I came across a Janata that looked different.',
        'It had a silver seconds hand.',
        "Such a small change, yet it completely transformed how I saw the watch. Without the contrasting red, the dial felt cleaner, calmer, and much closer to the classic dress watch I'd been imagining.",
        'And there was another detail I loved.',
        'Beneath the HMT logo, the model name was written in Hindi: जनता.',
        "I hadn't found the exact Devanagari-dial configuration I'd originally set out to buy, but this little detail gave the watch the Indian identity I'd been searching for. It was subtle, yet unmistakably connected to the country and the history behind the brand.",
        'The watch was presented as a 1983 example, already more than four decades old, and it had survived remarkably well.',
        "After months of searching, I finally felt I'd found the one.",
        "So I bought it to mark the beginning of my master's degree.",
        "My first mechanical watch wasn't an automatic with an exhibition caseback or an expensive modern movement. It was a modest, hand-wound HMT Janata, a watch that asks me to turn its crown and give it the energy it needs to keep running.",
        "And I think that's part of why I appreciate it.",
        "Coming from a collection built around quartz accuracy, solar power, and connected technology, there is something refreshing about owning a watch that requires a little more involvement. It doesn't offer the most features or the greatest precision. Instead, it gives me a different experience of wearing and appreciating a watch.",
        'It also changed something about how I collect.',
        'I no longer see an old watch as merely an outdated version of a new one. I see it as something that has survived its own time and found a place in mine.',
        'What began as a search for an affordable mechanical watch became an introduction to vintage collecting, Indian watchmaking, and an entirely different way of appreciating timepieces.',
      ],
      closingEmphasis: 'I went looking for my first mechanical watch. Somewhere along the way, I learned that not everything worth owning has to be new.',
      isPlaceholder: false,
    },
  },
  {
    id: 'titan-octane-diver',
    brand: 'Titan',
    model: 'Octane Hyperlume Diver',
    category: 'Diver',
    shortDescription:
      'A bold blue dial diver with a substantial stainless steel case, rotating bezel, and impressive luminous detailing.',
    signatureFeatures: '200M WR · Rotating Bezel · Hyperlume',
    personalNote:
      'The watch that brings physical presence and weight. The heavy rotating bezel and luminous indices make it feel purposeful on rainy commutes or journeys away from the desk.',
    collectionStatus: 'Active Rotation',
    verifiedDetails: [
      { label: 'Reference', value: 'NP90113KP02 (Titan Octane Hyper Lume)' },
      { label: 'Movement', value: 'Battery powered analogue quartz' },
      { label: 'Dimensions', value: '44 mm diameter, 48 mm length, 14.1 mm thickness' },
      { label: 'Case Material', value: 'Solid stainless steel' },
      { label: 'Bezel', value: 'Unidirectional rotating dive timing bezel' },
      { label: 'Dial', value: 'High contrast sunray blue' },
      { label: 'Crystal', value: 'Mineral glass' },
      { label: 'Luminescence', value: 'Titan Hyperlume coated hands and dial indices' },
      { label: 'Water Resistance', value: '200 metres / 20 bar' },
      { label: 'Lug Width', value: '24 mm' },
      { label: 'Origin', value: 'India (Titan Company)' },
      { label: 'Original MRP', value: '₹10,995' },
    ],
    heroImage: '/beyondcode/watches/titan.jpg',
    thumbnailImage: '/beyondcode/watches/thumbnail/titan.png',
    galleryImages: [
      { caption: 'Golden hour wrist shot on rich saddle brown leather', image: '/beyondcode/watches/titan.jpg' },
      { caption: 'Luminescence glow in the dark lineup', image: '/beyondcode/watches.jpg' },
    ],
    reviewId: 'review-titan-octane',
    relatedStoryIds: ['story-monsoon-drive'],
    story: {
      title: 'Built for More',
      subtitle: 'Titan Octane Hyperlume · 2023–2024',
      lead: "As I approached the final semester of my bachelor's degree, I knew I wanted a watch to remember my graduation by.",
      paragraphs: [
        "By then, my interest in watches had grown well beyond simply finding something nice to wear. I'd spent time learning about different movements, designs, complications, and the many categories of watches that existed. I was beginning to understand that watches weren't just different in appearance. They were built for different purposes, environments, and ways of life.",
        "And somewhere along that journey, I discovered dive watches.",
        "The idea immediately appealed to me.",
        "I'd always been fascinated by tough watches. Even as a child, I was the one burying my Casio in sand and putting it through ridiculous tests because I wanted to know how much it could survive. That fascination had eventually led me to my G-Shock, but dive watches offered something different.",
        "There was something amusing about the idea of wearing a watch designed to withstand the pressures of the ocean while sitting in a classroom taking notes. I wasn't planning to explore the depths of the sea. I just liked knowing that the watch on my wrist was built with far more capability than I'd probably ever need.",
        "And, of course, there was the rotating bezel.",
        "I'd always wanted to experience that satisfying series of clicks for myself. It was such a simple mechanical feature, yet it added another dimension to what a watch could do. That curiosity alone was enough to make me want to own a diver someday.",
        "Still, when I started looking for my graduation watch, I hadn't settled on any particular model. In fact, I was initially leaning towards something dressier, something that would feel appropriate for the occasion.",
        "Then I came across the Titan Octane Hyperlume.",
        "It wasn't exactly what I'd been searching for, but it caught my attention almost immediately.",
        "A substantial stainless steel case, a rotating bezel, strong luminous detailing, and a striking blue dial. It had the kind of bold, purposeful design I'd come to appreciate in tool watches, and its specifications made it especially interesting for the price.",
        "The blue dial was another reason I liked it so much. Until then, much of my collection had consisted of darker watches, particularly black digital and analogue designs. The Titan brought something completely different to the table. It had colour, presence, and a personality of its own.",
        "Admittedly, its size gave me second thoughts.",
        "It was a big watch, noticeably bulkier than the pieces I was accustomed to wearing. Even then, I knew that its dimensions wouldn't make it the easiest watch to wear with everything.",
        "But everything else about it was difficult to ignore.",
        "And then there was the price.",
        "I happened to find it at a discount of nearly sixty percent, which made an already interesting watch feel like an extraordinary opportunity. For what it offered, I couldn't help feeling that I had stumbled across something special.",
        "There was also something satisfying about choosing a Titan. As an Indian watch enthusiast, I wanted the collection to include a watch from a brand that had played such a familiar role in watch ownership across the country.",
        "So I bought it.",
        "What began as a search for a graduation dress watch ended with a large, blue, dive-inspired Titan instead. It wasn't the most conventional choice for the occasion, but perhaps that's what made it feel more like mine.",
        "Looking back, I'm especially glad I discovered it when I did.",
        "The Hyperlume has since become a model I rarely come across for sale, and seeing other enthusiasts appreciate its design and value makes me even happier to have found one. What initially caught my attention as a heavily discounted watch turned into one of the more distinctive pieces in my collection.",
        "It's still a big watch, and I won't pretend its size has become any less noticeable. But that has always been part of its character. It's bold, unapologetic, and different from nearly everything else I own.",
        "More importantly, it reminds me of a time when I was finishing one chapter of my education, learning more about the world of watches, and looking forward to whatever came next.",
      ],
      closingEmphasis: 'I went looking for a watch to mark the end of college. I found one that reminded me there was still so much left to explore.',
      isPlaceholder: false,
    },
  },
  {
    id: 'fossil-hybrid-fb01',
    brand: 'Fossil',
    model: 'Hybrid FB-01',
    category: 'Hybrid',
    shortDescription:
      'Traditional analogue styling conceals Bluetooth connectivity, activity tracking, smart notifications, and a surprisingly versatile set of functions.',
    signatureFeatures: 'Bluetooth · Smart Features · Analogue',
    personalNote:
      'I wanted analog hands that feel alive without surrendering subtle, vibration only connectivity. It bridges traditional styling with modern utility without glowing or demanding constant attention.',
    collectionStatus: 'Active Rotation',
    verifiedDetails: [
      { label: 'Collection', value: 'Fossil FB-01 Hybrid' },
      { label: 'Movement Type', value: 'Purpose built connected hybrid quartz system' },
      { label: 'Hand Mechanism', value: 'Electronically controlled analogue hands' },
      { label: 'Display', value: 'Physical analogue dial' },
      { label: 'Connectivity', value: 'Bluetooth Low Energy' },
      { label: 'Controls', value: 'Three customizable physical pushers' },
      { label: 'Sensors', value: 'Accelerometer and motion detection' },
      { label: 'Notifications', value: 'Haptic vibration alerts with programmable hand positions' },
      { label: 'Battery', value: 'Replaceable coin cell (up to 6 months life)' },
      { label: 'Case & Bezel', value: 'Stainless steel with diver inspired timing bezel' },
      { label: 'Crystal', value: 'Mineral glass' },
      { label: 'Water Resistance', value: '50 metres / 5 ATM' },
      { label: 'Smart Features', value: 'Second time zone on demand, music and camera control, activity and sleep tracking, phone finder' },
      { label: 'Original MRP', value: '₹11,995' },
    ],
    heroImage: '/beyondcode/watches/fossil.jpg',
    thumbnailImage: '/beyondcode/watches/thumbnail/fossil.png',
    galleryImages: [
      { caption: 'Nocturnal luminescent glow in low light', image: '/beyondcode/watches/fossil.jpg' },
    ],
    reviewId: 'review-hybrid-fb01',
    relatedStoryIds: [],
    story: {
      title: 'More Than Meets the Eye',
      subtitle: 'Fossil FB-01 Hybrid · 2022',
      lead: "By the time I was pursuing my bachelor's degree in Computer Applications, technology had become a significant part of my everyday life. I was spending more time exploring software, computers, hardware, and the many things technology could make possible.",
      paragraphs: [
        'Naturally, that curiosity eventually found its way onto my wrist.',
        'Having already owned a digital Casio and a technologically advanced G-Shock, I began wondering what else a watch could do. I wanted something that went beyond telling the time, setting alarms, or running a stopwatch. Something that could interact with the technology I used every day.',
        'I wanted a smartwatch.',
        "But there was a small problem. By then, I had also started learning more about watches and the culture surrounding them. I was well aware that smartwatches weren't particularly celebrated among traditional watch enthusiasts. And while I understood some of the reasons, I couldn't ignore my own fascination with what a connected watch could offer.",
        "Then, while researching different options, I discovered something I hadn't seriously considered before: hybrid smartwatches.",
        'The idea immediately caught my attention.',
        'Here was a watch that looked almost entirely traditional, with an analogue dial and physical hands, yet concealed an impressive amount of technology beneath its familiar appearance. It was exactly the kind of combination I found fascinating. Something ordinary at first glance, but remarkably clever once you understood what it could do.',
        "That's how I came across the Fossil FB-01 Hybrid.",
        "It could connect to my phone through Bluetooth, notify me of incoming messages with a vibration, track my steps and sleep, control music playback, operate my phone's camera shutter, display another time zone, and even help me find my phone when I'd misplaced it.",
        "What impressed me most wasn't necessarily the number of features. It was how they were implemented.",
        "Unlike a conventional smartwatch, there wasn't a large touchscreen announcing everything it could do. Instead, its physical hands could move into different positions to communicate information, while its buttons controlled functions that nobody would ordinarily expect from a traditional-looking watch.",
        "I still remember showing those features to people during my second year of college. Someone would see what appeared to be an ordinary analogue watch, and then I'd press a button and watch the hands move into position to perform an entirely different function.",
        'The surprise on their faces was part of the fun.',
        "Of course, I also knew Fossil wasn't exactly a favourite among watch enthusiasts. The brand was often associated with fashion watches, where design and branding could matter more than what was happening inside.",
        "That was something I'd considered before buying it.",
        "But the FB-01 didn't interest me simply because it looked good or carried a familiar name. It interested me because of the thought behind its hybrid functionality. This wasn't just another analogue watch with a basic quartz movement. Its connected features, sensors, and electronically controlled hands offered an experience that was genuinely different from anything else I owned.",
        "It wasn't perfect. Its activity tracking couldn't necessarily compete with a dedicated smartwatch, and it didn't offer every feature of one either. But that was never really the point.",
        'For me, the appeal was in how much it managed to do while still feeling like a traditional watch.',
        'And perhaps more importantly, it changed the way I thought about choosing watches.',
        'Heritage matters. So do reputation, design, and the history behind a brand. But none of those things should prevent me from appreciating a watch for what it actually offers.',
        'I bought the Fossil because I found its technology fascinating, because it brought together two of my interests, and because it offered something genuinely new to my collection.',
        'Years later, I still appreciate it for exactly those reasons.',
      ],
      closingEmphasis: 'It taught me that a watch deserves to be judged not just by the name on its dial, but by what it brings to the wrist.',
      isPlaceholder: false,
    },
  },
  {
    id: 'g-shock-gw-b5600hr',
    brand: 'Casio G-SHOCK',
    model: 'GW-B5600HR',
    category: 'Digital Tool Watch',
    isSpecialEmphasis: true,
    shortDescription:
      'The iconic G Shock square, combining legendary toughness with Tough Solar, Multi Band 6, Bluetooth, and a distinctive composite bracelet.',
    signatureFeatures: 'Tough Solar · Multi Band 6 · Bluetooth',
    personalNote:
      'The watch that takes whatever the day throws at it without hesitation. The red accented composite resin bracelet makes it wear featherweight compared to traditional steel, yet it retains the indestructible square DNA.',
    collectionStatus: 'Active Rotation',
    verifiedDetails: [
      { label: 'Reference', value: 'GW-B5600HR-1' },
      { label: 'Module', value: 'Casio 3461' },
      { label: 'Movement', value: 'Solar powered digital quartz' },
      { label: 'Time Sync', value: 'Multi Band 6 atomic radio + Bluetooth phone connectivity' },
      { label: 'Dimensions & Weight', value: '48.9 × 42.8 × 13.4 mm, 85 g' },
      { label: 'Case & Bezel', value: 'Resin with classic square architecture' },
      { label: 'Shock Structure', value: 'Hollow core G Shock shock resistant construction' },
      { label: 'Crystal', value: 'Mineral glass' },
      { label: 'Band', value: 'Stainless steel and resin composite Combi bracelet with red accents' },
      { label: 'Clasp', value: 'One touch three fold clasp' },
      { label: 'Water Resistance', value: '200 metres / 20 bar' },
      { label: 'Light', value: 'Full auto white LED Super Illuminator with afterglow' },
      { label: 'Accuracy', value: '±15 seconds/month (without synchronisation)' },
      { label: 'Power Reserve', value: 'Approx. 10 months normal, 22 months in power saving mode' },
      { label: 'Functions', value: 'World time (39 zones, 300 cities via app), 5 alarms, 24 hr stopwatch (1/100s), countdown timer, phone finder' },
      { label: 'Original MRP', value: '₹21,120 (Imported)' },
    ],
    heroImage: '/beyondcode/watches/gwb5600.jpg',
    thumbnailImage: '/beyondcode/watches/thumbnail/gwb5600.png',
    galleryImages: [
      { caption: 'Water droplets on rainforest moss branch', image: '/beyondcode/watches/gwb5600.jpg' },
      { caption: 'In studio lineup with luminous indices', image: '/beyondcode/watches.jpg' },
    ],
    reviewId: 'review-gw-b5600hr',
    relatedStoryIds: ['story-internship-sprints'],
    story: {
      title: 'The Watch I Always Wanted',
      subtitle: 'Casio G-Shock GW-B5600HR · 2021',
      lead: 'Long before I owned a G-Shock, I wanted one.',
      paragraphs: [
        'Even when I was twelve, choosing my very first proper watch, it was the G-Shock that had caught my attention. There was something fascinating about a watch built to withstand almost anything. The idea that something so small could survive impacts, water, dirt, and all the things an ordinary watch might not was enough to capture my imagination.',
        "But G-Shocks were expensive, especially for a twelve-year-old. And understandably, my parents weren't particularly convinced that a child needed a watch built for such extremes. So instead, I got my first Casio Tough Solar WS-220.",
        "That didn't stop me from wanting a G-Shock.",
        "Some of my friends had them, and I remember being fascinated by just how tough those watches were supposed to be. Since I didn't have one myself, I did the next best thing. I pretended my little Casio was one.",
        "I'd bury it in sand, dip it in water, throw it around, and put it through all sorts of ridiculous tests that probably made perfect sense to a twelve-year-old. I wanted to see just how much it could take. Looking back, it's funny how a watch that wasn't even a G-Shock ended up living much of its early life being treated like one.",
        'And somehow, it survived my experiments.',
        'Years later, when it was finally time for another watch, I knew exactly what I wanted. This time, it had to be a G-Shock.',
        'After exploring different models, I kept coming back to the square. It was the design that represented G-Shock to me more than anything else. Simple, recognisable, and unmistakably connected to the original. But I also wanted something that brought that familiar design into the modern world.',
        "That's what led me to the GW-B5600HR.",
        'Behind its classic square appearance was everything I wanted: Tough Solar, Multi-Band 6, Bluetooth connectivity, and the rugged construction that had fascinated me since childhood. It looked like a watch from another era, yet had some remarkably advanced technology inside it.',
        'It arrived at another important moment in my life: the beginning of college in 2021.',
        "My first Casio had accompanied me through school. This G-Shock would become the watch I wore as I stepped into college, beginning an entirely different chapter. And even today, it's still the watch I instinctively reach for when I want something casual, reliable, and ready for whatever the day brings.",
        "What makes it special isn't simply that it's tough, solar-powered, or technologically advanced. It's that I spent years wanting one, imagining what owning one would feel like, and eventually got to experience it for myself.",
      ],
      closingEmphasis: "My first Casio taught me to love wearing watches. This G-Shock was the one I'd been dreaming of wearing all along.",
      isPlaceholder: false,
    },
  },
  {
    id: 'casio-ws-220',
    brand: 'Casio',
    model: 'Tough Solar WS-220',
    category: 'First Watch',
    shortDescription:
      'A dependable solar powered digital Casio, packed with practical functions and still holding its place as the watch that started it all.',
    signatureFeatures: 'Tough Solar · 120 Lap Memory · 100M WR',
    personalNote:
      'Where it all started. Before collecting became deliberate, this watch was just life on a wrist through school classrooms, rain, track runs, and the quiet satisfaction of knowing solar light kept it beating continuously.',
    collectionStatus: 'Heirloom & Kept',
    verifiedDetails: [
      { label: 'Model', value: 'Casio W-S220' },
      { label: 'Module', value: 'Casio 3271 digital quartz' },
      { label: 'Display', value: 'Dual digital LCD' },
      { label: 'Power System', value: 'Tough Solar photovoltaic charging' },
      { label: 'Battery', value: 'Internal rechargeable secondary cell (solar powered)' },
      { label: 'Case & Bezel', value: 'Resin' },
      { label: 'Crystal', value: 'Resin glass / acrylic' },
      { label: 'Water Resistance', value: '100 metres / 10 bar' },
      { label: 'Illumination', value: 'LED backlight with selectable duration and afterglow' },
      { label: 'Lap Memory', value: '120 record lap and split memory with best lap display' },
      { label: 'World Time', value: '31 time zones, 48 cities plus UTC with DST' },
      { label: 'Timing Functions', value: '1/100 second stopwatch, elapsed and split timing, dual countdown timers' },
      { label: 'Alarms & Chime', value: 'Five daily alarms, hourly time signal' },
      { label: 'Strap', value: 'Resin strap (replaced after school years wear)' },
      { label: 'Original MRP', value: '₹4832' },
    ],
    heroImage: '/beyondcode/watches/ws220.jpg',
    thumbnailImage: '/beyondcode/watches/thumbnail/ws220.png',
    galleryImages: [
      { caption: 'River rapids splash & direct solar charging', image: '/beyondcode/watches/ws220.jpg' },
    ],
    reviewId: 'review-ws-220',
    relatedStoryIds: ['story-college-mornings'],
    story: {
      title: 'Before the Collection',
      subtitle: 'Casio Tough Solar WS-220 · 2014',
      lead: 'I was twelve when my father bought me this Casio.',
      paragraphs: [
        "Before that, watches were mostly little things I'd wear as a kid. Cheap digital watches with colourful LED lights, the kind that were more about having something fun on your wrist than actually keeping track of time. But as I grew older, I wanted something different. Something that felt like a proper watch.",
        "That's when this Casio came into my life.",
        "Back then, I didn't know much about watches. I wasn't interested in movements, brands, or collecting. I just knew that I finally had a watch I could take seriously, one that I could wear to school and make part of my everyday life.",
        "Over the years, my interests grew. I discovered mechanical watches, chronographs, different designs, and the stories behind them. New watches gradually found their way into my collection, each for a different reason.",
        "But this one remained.",
        "Its original strap eventually wore out and had to be replaced. It isn't as new as it once was, and it doesn't need to be. Those years are part of what makes it mine.",
        "Looking at it now, I see more than an old digital Casio. I see a twelve-year-old who just wanted his first proper watch, a father who bought it for him, and the beginning of an interest neither of us could have predicted.",
      ],
      closingEmphasis: 'Long before I became interested in collecting watches, this was the one that made me want to wear them.',
      isPlaceholder: false,
    },
  },
];

export const secondaryWatchesData: WatchPiece[] = [
  {
    id: 'g-shock-gg1000',
    brand: 'Casio G-Shock',
    model: 'Mudmaster GG-1000-1A',
    category: 'Tool Watch',
    shortDescription:
      'A rugged Master of G combining mud-resistant construction, Twin Sensor technology, and a commanding analogue-digital design.',
    personalNote: '',
    archiveNote:
      'The GG-1000 Mudmaster represents one of G-Shock’s most purpose-driven approaches to watch design. Developed as part of the Master of G family, it was engineered for environments where dust, mud, impacts, and demanding conditions are everyday concerns. Its substantial resin and stainless-steel construction, protected cylindrical buttons, and large analogue hands give it the appearance and functionality of a specialised outdoor instrument. Beneath that rugged exterior sits Casio’s Twin Sensor system, combining a digital compass and thermometer with the familiar versatility of a multifunction G-Shock. World time, a stopwatch, countdown timer, alarms, and automatic calendar functions make it considerably more capable than a conventional analogue watch. Particularly interesting is its mud-resistant button construction, which uses protective guards and gaskets to help prevent dirt from interfering with operation. Although this watch was eventually sold, it remains documented in the archive as an example of G-Shock’s uncompromising tool-watch philosophy and its emphasis on practical durability.',
    archiveInfo: {
      watchType: 'Analogue-Digital Tool Watch',
      statusOrCondition: 'Sold',
      distinctiveFeature: 'Mud Resistance & Twin Sensor',
      classification: 'Archived',
    },
    collectionStatus: 'Archived',
    verifiedDetails: [
      { label: 'Manufacturer', value: 'Casio' },
      { label: 'Collection', value: 'G-Shock Master of G' },
      { label: 'Series', value: 'Mudmaster' },
      { label: 'Model', value: 'GG-1000-1A' },
      { label: 'Movement', value: 'Battery-powered quartz' },
      { label: 'Module', value: 'Casio 5476' },
      { label: 'Display', value: 'Analogue-digital' },
      { label: 'Case Dimensions', value: '56.2 × 55.3 × 17.3 mm' },
      { label: 'Weight', value: '94 g' },
      { label: 'Case & Bezel', value: 'Resin and stainless steel' },
      { label: 'Crystal', value: 'Mineral glass' },
      { label: 'Strap', value: 'Resin' },
      { label: 'Construction', value: 'Shock-resistant and mud-resistant' },
      { label: 'Water Resistance', value: '200 metres / 20 bar' },
      { label: 'Sensor System', value: 'Twin Sensor' },
      { label: 'Digital Compass', value: '16-point direction indication, 0–359°' },
      { label: 'Compass Features', value: 'Bearing memory, calibration and magnetic declination correction' },
      { label: 'Thermometer', value: '-10°C to 60°C, 0.1°C resolution' },
      { label: 'World Time', value: '31 time zones, 48 cities + UTC' },
      { label: 'Stopwatch', value: '1/100-second, up to 24 hours' },
      { label: 'Countdown Timer', value: 'Up to 60 minutes' },
      { label: 'Alarms', value: '5 daily alarms, including snooze' },
      { label: 'Hourly Signal', value: 'Yes' },
      { label: 'Calendar', value: 'Full automatic calendar to 2099' },
      { label: 'Time Format', value: '12/24-hour' },
      { label: 'Illumination', value: 'White LED Super Illuminator, auto light and Neobrite' },
      { label: 'Button Tone', value: 'Mute function' },
      { label: 'Low Battery Alert', value: 'Yes' },
      { label: 'Battery', value: '2 × SR927W' },
      { label: 'Battery Life', value: 'Approximately 2 years' },
      { label: 'Accuracy', value: '±15 seconds/month' },
      { label: 'Current Status', value: 'Sold' },
    ],
    heroImage: '/beyondcode/watches/gg1000.jpg',
    galleryImages: [
      { caption: 'Casio G Shock Mudmaster GG-1000 Twin Sensor structure', image: '/beyondcode/watches/gg1000.jpg' },
    ],
    relatedStoryIds: [],
  },
  {
    id: 'titan-nc1482yl05',
    brand: 'Titan',
    model: 'NC1482YL05',
    category: 'Dress Watch',
    shortDescription:
      'A slim gold-tone dress watch with a silver dial, classic analogue styling, and an understated design suited to formal occasions.',
    personalNote: '',
    archiveNote:
      'The Titan NC1482YL05 reflects a more traditional approach to watch design, favouring simplicity, balanced proportions, and understated elegance over complicated functions. Its round gold-tone case frames a clean silver dial, creating a familiar dress-watch aesthetic that pairs naturally with formal and everyday clothing. At just 7.82 mm thick, the relatively slim case offers a very different wearing experience from the larger sports and tool watches elsewhere in the collection. The battery-powered quartz movement provides straightforward timekeeping, complemented by a practical date display. Rather than relying on unusual complications or advanced materials, the appeal of this watch lies in its restrained appearance and versatility. It remains in the archive as a representation of Titan’s accessible, traditional dress-watch designs.',
    archiveInfo: {
      watchType: 'Analogue Dress Watch',
      statusOrCondition: 'Working',
      distinctiveFeature: 'Slim Gold-Tone Case',
      classification: 'Archived',
    },
    collectionStatus: 'Archived',
    verifiedDetails: [
      { label: 'Manufacturer', value: 'Titan' },
      { label: 'Model', value: 'NC1482YL05' },
      { label: 'Watch Type', value: 'Dress Watch' },
      { label: 'Movement', value: 'Battery-powered analogue quartz' },
      { label: 'Display', value: 'Analogue with date' },
      { label: 'Timekeeping', value: 'Hours, minutes and seconds' },
      { label: 'Additional Function', value: 'Date display' },
      { label: 'Case Shape', value: 'Round' },
      { label: 'Case Material', value: 'Metal; exact alloy unspecified' },
      { label: 'Case Finish', value: 'Gold-tone' },
      { label: 'Case Length', value: '41.60 mm' },
      { label: 'Case Width', value: '36.80 mm' },
      { label: 'Case Thickness', value: '7.82 mm' },
      { label: 'Dial Colour', value: 'Silver' },
      { label: 'Power Source', value: 'Replaceable watch battery' },
      { label: 'Crystal', value: 'Not confirmed for this reference' },
      { label: 'Water Resistance', value: 'Not confirmed for this reference' },
      { label: 'Movement Calibre', value: 'Not publicly specified' },
      { label: 'Country of Origin', value: 'India' },
      { label: 'Condition', value: 'Working' },
    ],
    heroImage: '/1000284820.jpeg',
    galleryImages: [
      { caption: 'The Titan NC1482YL05 dress wristwatch', image: '/1000284820.jpeg' },
    ],
    relatedStoryIds: [],
  },
  {
    id: 'samsung-galaxy-watch4',
    brand: 'Samsung',
    model: 'Galaxy Watch 4',
    category: 'Smartwatch',
    shortDescription:
      'A full-featured Wear OS smartwatch combining an AMOLED display, advanced health tracking, and extensive smartphone connectivity.',
    signatureFeatures: 'Wear OS · Super AMOLED · Health Tracking',
    personalNote: '',
    archiveNote:
      "After experiencing the unusual combination of traditional watch design and connected technology through my Fossil Hybrid, I became curious about what a full smartwatch could offer. The hybrid had introduced me to notifications, activity tracking, and smartphone controls, but I wanted to experience something that went further. A proper smartwatch with a touchscreen, downloadable applications, comprehensive health tracking, and considerably more functionality.\n\nThat curiosity led me to the Samsung Galaxy Watch4.\n\nFrom a technological perspective, it was impressive. Its bright AMOLED display, Wear OS platform, fitness sensors, and extensive connectivity made it feel more like a miniature smartphone than a conventional wristwatch. It could track workouts, monitor sleep, display notifications, run applications, and perform numerous tasks that none of my other watches could.\n\nHowever, using it regularly revealed something I hadn't fully considered before buying it.\n\nUnlike my traditional watches, the Galaxy Watch4 demanded frequent charging. Having to charge it almost every night became increasingly inconvenient, especially after years of wearing quartz and solar-powered watches that required very little attention. What was supposed to make everyday life more convenient gradually introduced another device I had to remember to charge.\n\nThere was also the issue of wrist time.\n\nAs my collection continued to grow, I found myself wanting to wear my other watches more often. Wearing the Galaxy Watch4 meant leaving one of those watches behind, and the smartwatch's additional functions weren't always compelling enough to justify that trade-off.\n\nEventually, after approximately two years of use, its display stopped functioning, leaving the watch unusable.\n\nDespite these frustrations, the Galaxy Watch4 was an interesting experiment. It helped me understand what modern smartwatches are capable of, but also clarified what I personally value in a wristwatch. For all its technology, I found myself appreciating the simplicity, longevity, and independence of my conventional watches.\n\nIt remains in the archive as a record of my experience with a full smartwatch and a reminder that having more features doesn't necessarily make a watch more enjoyable to own.",
    archiveInfo: {
      watchType: 'Full Smartwatch',
      statusOrCondition: 'Non-Functional — Display Failure',
      distinctiveFeature: 'Wear OS & Advanced Health Tracking',
      classification: 'Archived',
    },
    collectionStatus: 'Archived',
    verifiedDetails: [
      { label: 'Manufacturer', value: 'Samsung Electronics' },
      { label: 'Collection', value: 'Galaxy Watch' },
      { label: 'Model', value: 'Galaxy Watch4' },
      { label: 'Model Number', value: 'SM-R870' },
      { label: 'Variant', value: '44 mm Bluetooth / Wi-Fi' },
      { label: 'Cellular Connectivity', value: 'None — Non-LTE' },
      { label: 'Release Date', value: 'August 2021' },
      { label: 'Operating System at Launch', value: 'Wear OS Powered by Samsung' },
      { label: 'Original User Interface', value: 'One UI Watch 3' },
      { label: 'Processor', value: 'Samsung Exynos W920' },
      { label: 'CPU', value: 'Dual-core, 1.18 GHz' },
      { label: 'Chip Manufacturing Process', value: '5 nm' },
      { label: 'RAM', value: '1.5 GB' },
      { label: 'Internal Storage', value: '16 GB' },
      { label: 'Display Technology', value: 'Super AMOLED' },
      { label: 'Display Size', value: '1.4 inches / 34.6 mm' },
      { label: 'Display Resolution', value: '450 × 450 pixels' },
      { label: 'Pixel Density', value: 'Approximately 330 PPI' },
      { label: 'Display Colours', value: '16 million' },
      { label: 'Always-On Display', value: 'Supported' },
      { label: 'Display Protection', value: 'Corning Gorilla Glass DX+' },
      { label: 'Case Material', value: 'Samsung Armour Aluminium' },
      { label: 'Case Dimensions', value: '44.4 × 43.3 × 9.8 mm' },
      { label: 'Case Weight', value: '30.3 g without strap' },
      { label: 'Strap Width', value: '20 mm' },
      { label: 'Original Strap', value: 'Fluoroelastomer (FKM) sport band' },
      { label: 'Battery Type', value: 'Internal rechargeable lithium-ion' },
      { label: 'Battery Capacity', value: '361 mAh' },
      { label: 'Battery Replacement', value: 'Non-user-removable' },
      { label: 'Manufacturer-Rated Battery Life', value: 'Up to 40 hours with Always-On Display disabled' },
      { label: 'Charging', value: 'WPC-based wireless charging' },
      { label: 'Bluetooth', value: 'Bluetooth 5.0' },
      { label: 'Wi-Fi', value: '802.11 a/b/g/n, 2.4 GHz and 5 GHz' },
      { label: 'NFC', value: 'Supported' },
      { label: 'GPS', value: 'Integrated' },
      { label: 'Satellite Navigation', value: 'GPS, GLONASS, Galileo, BeiDou' },
      { label: 'Microphone', value: 'Integrated' },
      { label: 'Speaker', value: 'Integrated' },
      { label: 'Physical Controls', value: 'Two side buttons' },
      { label: 'Bezel Navigation', value: 'Touch-sensitive digital bezel' },
      { label: 'Touchscreen', value: 'Capacitive' },
      { label: 'Heart Rate Sensor', value: 'Optical PPG' },
      { label: 'ECG Sensor', value: 'Electrical heart sensor' },
      { label: 'Body Composition Sensor', value: 'Bioelectrical Impedance Analysis (BIA)' },
      { label: 'Accelerometer', value: 'Supported' },
      { label: 'Gyroscope', value: 'Supported' },
      { label: 'Barometer', value: 'Supported' },
      { label: 'Geomagnetic Sensor', value: 'Supported' },
      { label: 'Ambient Light Sensor', value: 'Supported' },
      { label: 'Heart Rate Monitoring', value: 'Supported' },
      { label: 'ECG Measurement', value: 'Available in supported regions and with compatible phones' },
      { label: 'Blood Pressure Monitoring', value: 'Available with calibration and supported devices/regions' },
      { label: 'Body Composition Analysis', value: 'Body fat and related estimates' },
      { label: 'Blood Oxygen Tracking', value: 'Supported, including during sleep' },
      { label: 'Sleep Tracking', value: 'Sleep duration and stages' },
      { label: 'Exercise Tracking', value: 'Multiple workout modes with automatic activity detection' },
      { label: 'Step Counting', value: 'Supported' },
      { label: 'Stress Monitoring', value: 'Supported' },
      { label: 'Fall Detection', value: 'Supported' },
      { label: 'Smartphone Notifications', value: 'Calls, messages and supported applications' },
      { label: 'Calling', value: 'Bluetooth calling through a compatible paired smartphone' },
      { label: 'Music Playback', value: 'Supported' },
      { label: 'Music Controls', value: 'Supported' },
      { label: 'Navigation Applications', value: 'Google Maps and compatible Wear OS applications' },
      { label: 'Contactless Payments', value: 'NFC payments where supported' },
      { label: 'App Installation', value: 'Google Play Store for Wear OS' },
      { label: 'Watch Faces', value: 'Customisable digital watch faces' },
      { label: 'Stopwatch', value: 'Supported' },
      { label: 'Countdown Timer', value: 'Supported' },
      { label: 'Alarms', value: 'Supported' },
      { label: 'Calendar', value: 'Supported' },
      { label: 'Weather', value: 'Supported' },
      { label: 'Water Resistance', value: '5 ATM' },
      { label: 'Ingress Protection', value: 'IP68' },
      { label: 'Durability Testing', value: 'MIL-STD-810G' },
      { label: 'Country of Origin', value: 'Vietnam, documented Indian-market variant' },
      { label: 'Current Condition', value: 'Display failure' },
      { label: 'Current Functionality', value: 'Non-functional' },
    ],
    heroImage: '/beyondcode/watches/watch4.jpg',
    galleryImages: [
      { caption: 'Samsung Galaxy Watch4 44mm Bluetooth', image: '/beyondcode/watches/watch4.jpg' },
    ],
    relatedStoryIds: [],
  },
  {
    id: 'kademan-dual-display',
    brand: 'Kademan',
    model: 'Hour Disc Watch',
    category: 'Disc Display',
    shortDescription:
      'An unusual timepiece featuring a rotating hour disc display and a bold, instrument inspired appearance.',
    personalNote: '',
    archiveNote:
      'The Kademan Hour Disc watch represents an intriguing departure from traditional watch hands, using numbered rotating discs that glide past static indicator lines to reveal the passage of time. Drawing inspiration from industrial pressure gauges and aircraft flight instruments, its substantial black casing and mineral crystal created a uniquely bold wrist presence. Although its quartz circuit has ceased operating making it non functional today, it remains preserved in the archive as an experimental study in creative time display and graphic dial architecture.',
    archiveInfo: {
      watchType: 'Hour Disc Watch',
      statusOrCondition: 'Non Functional',
      distinctiveFeature: 'Rotating Hour Display',
      classification: 'Archived',
    },
    collectionStatus: 'Archived',
    verifiedDetails: [
      { label: 'Manufacturer', value: 'Kademan' },
      { label: 'Model', value: 'Hour Disc Watch' },
      { label: 'Display Type', value: 'Rotating hour and minute disc arrangement' },
      { label: 'Movement', value: 'Quartz' },
      { label: 'Power Source', value: 'Battery' },
      { label: 'Crystal', value: 'Mineral' },
      { label: 'Water Resistance', value: '30 metres' },
      { label: 'Current Functionality', value: 'Non functional' },
    ],
    heroImage: '/beyondcode/watches/kademan.jpg',
    galleryImages: [
      { caption: 'Kademan Hour Disc Watch case and dial detail', image: '/beyondcode/watches/kademan.jpg' },
    ],
    relatedStoryIds: [],
  },
  {
    id: 'casio-beside',
    brand: 'Casio',
    model: 'Beside BEM-500',
    category: 'Chronograph',
    shortDescription:
      'An elegant analogue chronograph from Casio’s Beside collection, combining a dark multi-register dial with a refined stainless-steel design.',
    personalNote: '',
    archiveNote:
      'The Casio Beside BEM-500 belongs to a side of Casio’s watchmaking that is often overshadowed by its digital watches and G-Shock models. Rather than focusing on extreme durability or electronic multifunction displays, the Beside collection explored a more traditional analogue aesthetic, combining restrained styling with practical everyday complications. Introduced in the late 2000s, the BEM-500D series featured a stainless-steel case, conventional hands, a date window, and a chronograph operated through dedicated pushers. Its smaller case proportions and relatively slim construction gave it a dressier presence than many modern sports chronographs, while its additional registers provided a subtle mechanical-instrument character to the dial. Inside, Casio’s battery-powered quartz module controlled both regular timekeeping and stopwatch operation, offering the familiar accuracy and convenience associated with the brand. The design is particularly interesting for its balance between formal simplicity and functional detail. This example is no longer functioning, although the underlying cause has not been established. It remains in the archive as a representation of Casio’s traditional analogue chronographs and the design variety found beyond its better-known digital collections.',
    archiveInfo: {
      watchType: 'Analogue Chronograph',
      statusOrCondition: 'Non-Functional',
      distinctiveFeature: 'Multi-Register Chronograph',
      classification: 'Archived',
    },
    collectionStatus: 'Archived',
    verifiedDetails: [
      { label: 'Manufacturer', value: 'Casio' },
      { label: 'Collection', value: 'Beside' },
      { label: 'Model Family', value: 'BEM-500' },
      { label: 'Reference Variant', value: 'Full suffix not confirmed' },
      { label: 'Series Introduction', value: '2009, BEM-500D family' },
      { label: 'Movement', value: 'Battery-powered analogue quartz' },
      { label: 'Module', value: 'Casio 4333, documented BEM-500D family' },
      { label: 'Display', value: 'Analogue' },
      { label: 'Chronograph', value: '1-second stopwatch' },
      { label: 'Stopwatch Capacity', value: '59 minutes, 59 seconds' },
      { label: 'Stopwatch Mode', value: 'Elapsed time measurement' },
      { label: 'Dial Functions', value: 'Timekeeping, chronograph registers and date' },
      { label: 'Date Display', value: 'Yes' },
      { label: 'Case', value: 'Stainless steel, documented BEM-500D family' },
      { label: 'Case Dimensions', value: '44.8 × 39.0 × 9.1 mm, BEM-500D' },
      { label: 'Weight', value: 'Approximately 118.8 g, BEM-500D' },
      { label: 'Dial Colour', value: 'Dark finish on this example' },
      { label: 'Crystal', value: 'Exact type not confirmed' },
      { label: 'Water Resistance', value: '50 metres, documented BEM-500D variants' },
      { label: 'Accuracy', value: '±20 seconds/month, factory specification' },
      { label: 'Battery', value: 'SR927W, documented BEM-500D family' },
      { label: 'Battery Life', value: 'Approximately 2 years' },
      { label: 'Current Functionality', value: 'Non-functional; cause undiagnosed' },
    ],
    heroImage: '/beyondcode/watches/BESIDE.jpg',
    galleryImages: [
      { caption: 'Casio Beside BEM-500 multi register dial and polished case', image: '/beyondcode/watches/BESIDE.jpg' },
    ],
    relatedStoryIds: [],
  },
];

export const watchesData: WatchPiece[] = [
  ...mainWatchesData,
  ...secondaryWatchesData,
];

export const reviewsData: WatchReview[] = [
  {
    id: 'review-timex-waterbury',
    watchId: 'timex-waterbury-chrono',
    model: 'Timex Waterbury Flyback Chronograph',
    excerpt:
      'An unconventional chronograph with clever functions, a bold design, and one surprisingly disappointing detail.',
    coverImage: '/beyondcode/watches/timex.jpg',
    sections: {
      whyIBoughtIt:
        "As I approached the final year of my master's degree, I wanted a watch that would mark the closing chapter of my student life. A chronograph had been missing from my collection, and I wanted something different from the usual designs.\n\nAfter considering the Q Timex and Marlin collections, I discovered the Waterbury Flyback. Its blacked-out appearance, unusual retrograde displays, flyback functionality, and second-time-zone feature immediately caught my attention. It offered exactly the kind of unusual complication and busy dial that I've always enjoyed.",
      designAndBuild:
        "The black case and instrument-inspired dial give this watch a distinctive personality. The fan-shaped retrograde displays at approximately 4 and 10 o'clock are particularly interesting because they break away from conventional chronograph layouts.\n\nThe overall finishing and visual design are appealing, while the mineral crystal and stainless-steel construction are reasonable for its category. I currently wear it with a black silicone strap, which complements its appearance.",
      onTheWrist:
        'At 43 mm, the watch has a noticeable presence without feeling quite as bulky as my Titan diver. The black finish gives it a distinctive character, and the dial always offers something interesting to look at.',
      livingWithIt:
        "The flyback feature is easily the most entertaining part of the watch. Being able to reset and begin another timing interval without the usual stop-reset-start sequence makes the chronograph genuinely enjoyable to operate.\n\nThe additional second-time-zone function is another welcome feature. I particularly appreciate that Timex managed to incorporate these functions into a movement that remains relatively accessible.\n\nHowever, there's one aspect of the experience that doesn't live up to my expectations: the pushers.",
      whatILove: [
        'Unusual retrograde chronograph layout.',
        'Flyback functionality rarely encountered in this price range.',
        'Convenient second-time-zone display.',
        'Distinctive blacked-out design.',
        'A busy dial with plenty of character.',
        "A fitting watch to commemorate my final year of master's.",
      ],
      whatIDont: [
        '**Poor pusher feedback:** The chronograph pushers lack the satisfying tactile response I expected. Pressing them feels rather vague, making the start, stop, and reset operations less enjoyable than they should be.',
      ],
      wouldIBuyItAgain:
        'Yes. The design and complications are distinctive enough that I still appreciate the watch despite the disappointing pusher feel.',
      verdict:
        'A genuinely interesting quartz chronograph that offers more functionality than its unconventional appearance initially suggests. The flyback system and unusual dial make it special, although better tactile feedback from the pushers would have made the experience considerably more satisfying.',
    },
  },
  {
    id: 'review-hmt-janata',
    watchId: 'hmt-janata-1983',
    model: 'HMT Janata — Reported 1983',
    excerpt:
      'My first mechanical watch, bringing Indian watchmaking history and a completely different experience to the collection.',
    coverImage: '/beyondcode/watches/hmt.jpg',
    sections: {
      whyIBoughtIt:
        "When I began my master's degree, I wanted to experience mechanical watchmaking for the first time.\n\nAfter exploring affordable mechanical watches, I became interested in vintage HMTs. I wanted a model that represented Indian watchmaking history while also offering a classic, understated design.\n\nFinding a convincing original example took months. Eventually, I came across this Janata with a silver seconds hand and Hindi model lettering. Those small details made it stand out from the other examples I'd considered.",
      designAndBuild:
        "The Janata is remarkably simple. Its silver-white dial, applied indices, slender hands, and Hindi lettering give it a restrained appearance.\n\nInside is the HMT 0231 hand-wound mechanical movement, a 17-jewel calibre with historical connections to Citizen movement designs.\n\nI especially appreciate that the watch doesn't try to look larger or more complicated than it is. The compact case makes it noticeably different from most of my modern watches.",
      onTheWrist:
        "This is one of the most comfortable and understated watches in my collection. Its smaller proportions make it easy to wear with formal clothing, and the classic design doesn't draw unnecessary attention.",
      livingWithIt:
        "Coming from quartz, solar, and connected watches, manually winding the Janata is an entirely different experience.\n\nThe movement requires more involvement from its owner, and that is part of what makes it interesting. There's something satisfying about knowing that the watch operates through mechanical components rather than a battery or electronic circuit.\n\nHowever, its age also means I need to be more careful about how and where I wear it.",
      whatILove: [
        'Traditional hand-wound mechanical movement.',
        'Historical connection to Indian watchmaking.',
        'Hindi lettering and understated dial design.',
        'Compact, comfortable proportions.',
        'Distinctive silver seconds hand.',
        'The experience of owning and operating a vintage mechanical watch.',
      ],
      whatIDont: [
        "**Water resistance:** This is my primary concern. Given the watch's age and unknown sealing condition, I cannot confidently expose it to rain or water.",
        '**Greater care required:** Compared with my modern watches, I have to be more mindful of moisture, impacts, and its servicing condition.',
      ],
      wouldIBuyItAgain:
        'Absolutely. The Janata introduced an entirely different side of watchmaking to my collection, and I appreciate it for that.',
      verdict:
        'A modest mechanical watch whose appeal lies in its simplicity, history, and traditional construction. It may not offer the convenience or durability of my modern watches, but it delivers an ownership experience they cannot replicate.',
    },
  },
  {
    id: 'review-hybrid-fb01',
    watchId: 'fossil-hybrid-fb01',
    model: 'Fossil Hybrid FB-01',
    excerpt:
      'A traditional-looking watch hiding an impressive collection of connected features, with battery maintenance as its biggest compromise.',
    coverImage: '/beyondcode/watches/fossil.jpg',
    sections: {
      whyIBoughtIt:
        "While studying computer applications, I became increasingly interested in the idea of owning a smartwatch. At the same time, I still wanted something that looked and felt like a traditional analogue watch.\n\nDiscovering hybrid smartwatches was the perfect middle ground.\n\nThe Fossil FB-01 appealed to me because it looked like an ordinary watch while offering Bluetooth connectivity, activity tracking, notifications, music controls, and several other useful functions.\n\nI was also curious about how its physical hands could move to indicate different information. That combination of analogue design and electronic functionality was something I hadn't experienced before.",
      designAndBuild:
        'The FB-01 has a substantial, sporty analogue design that doesn\'t immediately reveal its connected capabilities.\n\nIts physical hands are an important part of its appeal. Rather than relying entirely on an electronic screen, the watch uses traditional-looking components to communicate information and interact with its connected functions.\n\nThat clever approach to design remains one of my favourite aspects of the watch.',
      onTheWrist:
        'It wears more like a traditional sports watch than a modern smartwatch. This is precisely what I wanted: something that could complement regular clothing without looking like a miniature phone strapped to my wrist.',
      livingWithIt:
        "I still enjoy how unexpectedly capable the Fossil is.\n\nIt can notify me through vibrations, interact with my phone, control music, track activity, and perform functions that aren't obvious from its appearance.\n\nBack in college, I particularly enjoyed demonstrating these features to friends who assumed it was simply another analogue watch.\n\nHowever, living with it also introduced a compromise I hadn't fully appreciated.\n\nAlthough its battery arrangement avoids daily charging, I find myself replacing the battery roughly every month. Compared with an ordinary quartz watch, that's a significant maintenance inconvenience.\n\nI consequently prefer keeping spare batteries available.",
      whatILove: [
        'Traditional styling combined with smart functionality.',
        'Bluetooth connectivity and vibration notifications.',
        'Music and camera controls.',
        'Activity and sleep tracking.',
        'Physical hands that communicate information through movement.',
        "Its ability to surprise people with functions they wouldn't expect.",
        'A distinctive example of technology integrated into a conventional watch design.',
      ],
      whatIDont: [
        '**Frequent battery replacement:** My experience of replacing the battery roughly every month is easily the biggest drawback. It makes ownership less convenient than a conventional quartz watch.',
      ],
      wouldIBuyItAgain:
        'Yes. Even with the battery inconvenience, I still find the concept and functionality unusually interesting.',
      verdict:
        "A clever hybrid that successfully combines the appearance of an analogue watch with practical connected features. Its technology is what makes it special, but the relatively frequent battery changes I've experienced are a genuine compromise.",
    },
  },
  {
    id: 'review-titan-octane',
    watchId: 'titan-octane-diver',
    model: 'Titan Octane Hyperlume Diver',
    excerpt:
      "A striking blue diver with excellent visual presence, but dimensions that don't always suit my wrist.",
    coverImage: '/beyondcode/watches/titan.jpg',
    sections: {
      whyIBoughtIt:
        "As I approached the end of my bachelor's degree, I wanted a watch to commemorate my graduation.\n\nBy then, I'd developed a growing interest in dive watches. Their rugged construction, rotating bezels, water resistance, and distinctive design appealed to the same fascination with toughness that originally drew me towards G-Shock.\n\nI hadn't initially planned to buy this particular Titan, but its bold blue dial, impressive specifications, and substantial discount caught my attention.\n\nIt also introduced a new colour and style to my collection.",
      designAndBuild:
        "The Hyperlume has a striking blue dial, substantial stainless-steel case, rotating timing bezel, and prominent luminous detailing.\n\nThe dial and luminous elements are particularly attractive, while the solid construction gives it the appearance of a capable tool watch.\n\nI also appreciate the rotating bezel, a feature I'd wanted to experience since discovering dive watches.\n\nHowever, its dimensions are impossible to ignore.",
      onTheWrist:
        "At 44 mm wide and 14.1 mm thick, this is a large watch.\n\nAlthough I appreciate its appearance, the case can feel oversized on my wrist, particularly when compared with my more compact watches.\n\nI've experimented with different straps, including blue elastic NATO and black silicone, to improve the overall wearing experience. These have helped with comfort and styling, but they cannot completely change how large the case feels.",
      livingWithIt:
        "The Titan remains an interesting watch because of its design, blue dial, bezel, and luminous detailing.\n\nHowever, I don't reach for it as frequently as some of my other watches.\n\nThis isn't because I dislike the watch itself. It's largely a matter of proportions. A watch can look excellent in photographs or on a table while still feeling less natural once it's on your wrist.\n\nThe 24 mm strap requirement introduces another limitation because most replacement straps in that width aren't readily interchangeable with my other watches.",
      whatILove: [
        'Striking blue dial and distinctive appearance.',
        'Strong luminous detailing.',
        'Satisfying rotating bezel.',
        'Substantial stainless-steel construction.',
        'A different colour and category within my collection.',
        'Good specifications relative to what I paid.',
      ],
      whatIDont: [
        '**Oversized case:** The 44 mm diameter and substantial thickness make it feel large on my wrist. This is my biggest criticism.',
        '**Uncommon 24 mm strap width:** Finding straps that suit both the watch and my preferences is more difficult. The straps also offer limited compatibility with the rest of my collection.',
      ],
      wouldIBuyItAgain:
        "I still appreciate the watch and the value it offered, but I'd be more cautious about its dimensions if I were making the decision again.",
      verdict:
        'An impressive, characterful blue diver whose design and features are difficult to fault for the price. Unfortunately, its substantial proportions limit how often I choose to wear it. A good watch, but not necessarily the most comfortable fit for me.',
    },
  },
  {
    id: 'review-gw-b5600hr',
    watchId: 'g-shock-gw-b5600hr',
    model: 'Casio G-Shock GW-B5600HR',
    excerpt:
      "The square G-Shock I'd always wanted, combining exceptional practicality with a few familiar digital-watch compromises.",
    coverImage: '/beyondcode/watches/gwb5600.jpg',
    sections: {
      whyIBoughtIt:
        "I'd wanted a G-Shock since childhood.\n\nAfter years of admiring their reputation for durability, I finally chose one when I entered college.\n\nThe GW-B5600HR appealed to me because it retained the iconic square G-Shock design while offering Tough Solar, Multi-Band 6, Bluetooth connectivity, and a distinctive composite bracelet.\n\nIt combined the classic appearance I admired with the modern functions I wanted.",
      designAndBuild:
        'The square case is compact, functional, and unmistakably G-Shock.\n\nThe composite bracelet is one of my favourite parts of the watch. It offers a different wearing experience from a conventional resin strap while maintaining the rugged character of the design.\n\nThe red detailing adds just enough visual interest without making the watch unnecessarily flashy.',
      onTheWrist:
        'This is one of my easiest watches to wear.\n\nIt works well with casual clothing, feels reassuringly durable, and doesn\'t require much thought before putting it on.\n\nCompared with some of my larger analogue watches, its relatively compact case makes it particularly convenient for everyday use.',
      livingWithIt:
        "The combination of solar charging, Bluetooth synchronisation, and Multi-Band 6 makes this a remarkably convenient watch.\n\nI rarely need to think about setting the time, and its rugged construction gives me confidence wearing it in situations where I'd be more cautious with another watch.\n\nBut two aspects are less impressive.\n\nThe negative digital display can be difficult to read under certain lighting conditions, especially at less favourable viewing angles.\n\nAnd while the small, recessed pushers help preserve the compact square design, they aren't always convenient to operate.",
      whatILove: [
        'Iconic square G-Shock design.',
        'Excellent shock resistance and durability.',
        'Tough Solar charging.',
        'Multi-Band 6 and Bluetooth time synchronisation.',
        'Comfortable and distinctive composite bracelet.',
        'Low-maintenance everyday practicality.',
        'A childhood wish finally fulfilled.',
      ],
      whatIDont: [
        '**Display legibility:** The negative LCD can be difficult to read in dim lighting or at certain angles.',
        '**Small recessed buttons:** The pushers are relatively difficult to press comfortably, and I often find myself using my fingernail to operate them.',
      ],
      wouldIBuyItAgain:
        "Without hesitation.\n\nThe display and buttons aren't perfect, but the overall experience still makes it one of my favourite watches.",
      verdict:
        'A remarkably capable everyday watch that combines the traditional square G-Shock design with modern convenience. The negative display and recessed buttons are genuine compromises, but neither significantly reduces my appreciation for the watch.',
    },
  },
  {
    id: 'review-ws-220',
    watchId: 'casio-ws-220',
    model: 'Casio Tough Solar W-S220',
    excerpt:
      'My first proper watch, still appreciated for its reliability despite a dim display and ageing case details.',
    coverImage: '/beyondcode/watches/ws220.jpg',
    sections: {
      whyIBoughtIt:
        "I was twelve when my father bought me this Casio.\n\nBefore that, I'd mostly worn inexpensive children's watches with colourful LED lights. I wanted something that felt like a proper watch, and the W-S220 became my first serious timepiece.\n\nI was already fascinated by G-Shocks, but this solar-powered Casio offered a more accessible way to experience a capable digital sports watch.",
      designAndBuild:
        "The W-S220 has the functional resin construction typical of Casio's digital sports watches.\n\nIts solar charging system, stopwatch, lap memory, alarms, and other features make it more capable than its relatively simple appearance suggests.\n\nThe lightweight construction is practical and comfortable, but some of its external finishing hasn't aged particularly well.\n\nThe decorative lettering on the front of the case, including the Tough Solar and kilometre-related markings, has gradually worn away over the years.\n\nUnlike more permanent moulded or engraved details, this printing hasn't survived long-term use.",
      onTheWrist:
        "The watch is lightweight and easy to wear. Its relatively simple construction makes it suitable for everyday use without feeling intrusive.\n\nHowever, the display is one of its biggest weaknesses.\n\nDespite the watch's generous digital face, I find the LCD comparatively dim and difficult to read in certain lighting conditions. The contrast isn't as strong as I'd like, which affects how quickly I can check the time.",
      livingWithIt:
        "This Casio has been part of my life since school.\n\nOver the years, it has experienced regular wear, its original strap has needed replacement, and the exterior has visibly aged.\n\nYet it remains a functional and meaningful part of my collection.\n\nThe solar-powered movement is particularly convenient, while the stopwatch and lap memory demonstrate how much functionality Casio managed to include in a relatively affordable sports watch.\n\nIt's also the watch that introduced me to the enjoyment of owning and regularly wearing a proper timepiece.",
      whatILove: [
        'Its significance as my first proper watch.',
        'Tough Solar charging and low-maintenance operation.',
        'Lightweight resin construction.',
        'Extensive digital functions.',
        'Stopwatch and 120-lap memory.',
        'Years of use and personal significance.',
        'Its role in starting my interest in collecting watches.',
      ],
      whatIDont: [
        "**Dim display:** The LCD lacks the contrast I'd prefer, making it relatively difficult to read in certain conditions.",
        '**Fading case lettering:** The printed markings on the front of the watch have worn away over time, leaving parts of the bezel almost completely blank.',
      ],
      wouldIBuyItAgain:
        'Absolutely.\n\nEven knowing its limitations, it remains one of the most meaningful watches I own.',
      verdict:
        'A capable and reliable solar-powered Casio whose biggest weaknesses are its display contrast and the durability of its printed case details. It may no longer look exactly as it did when I first received it, but it remains the watch that started everything.',
    },
  },
];

export const storiesData: WatchStory[] = [
  {
    id: 'story-college-mornings',
    title: 'The 8 AM Lecture & The Steady Tick',
    date: 'College Years',
    watchId: 'casio-ws-220',
    watchName: 'Casio Tough Solar WS-220',
    description: 'Rushing across rain slicked campus pathways with textbooks underarm and five minutes on the display.',
    fullNarrative:
      'College mornings were always measured in narrow margins. Running up the three flights of stairs to beat the professor to the door, checking the wrist while balancing notebooks and an umbrella. The Casio WS-220 was never intentionally framed in those photographs. It was simply on the wrist, blurred as hands gestured during group project debates or rested on wooden library desks during study hours.',
    image: '/beyondcode/watches/ws220.jpg',
  },
  {
    id: 'story-everyday-carry',
    title: 'The Analog Desk & The Flyback',
    date: 'Workstation Still Life',
    watchId: 'timex-waterbury-chrono',
    watchName: 'Timex The Waterbury Flyback',
    description: 'Deep work sessions, black ink on parchment, and a tactile chronograph timing the flow of thought.',
    fullNarrative:
      'Before a line of code is committed or an idea is structured, thoughts find clarity in analog notes. Beside a vintage fountain pen and compact blade, the Waterbury rests flat against the leather desk pad. Its second hand tracks focused intervals without digital interruption, an anchor to physical craftsmanship amidst modern software.',
    image: '/beyondcode/watches/timex.jpg',
  },
  {
    id: 'story-graduation-day',
    title: 'The Convocation Robe',
    date: 'Graduation',
    watchId: 'hmt-janata-1983',
    watchName: 'HMT Janata 1983',
    description: 'Black robe, folded degree scroll, and a hand wound watch that had seen decades before this one.',
    fullNarrative:
      'On graduation day, everyone had their smart screens flashing with family calls. I chose to wind the 1983 Janata that morning before putting on the convocation robe. In the photographs holding the degree certificate, you catch a glimpse of the domed acrylic crystal and the dark leather strap beneath the cuff. A watch from 1983 keeping time for a graduate stepping into a new era.',
    image: '/beyondcode/watches/hmt.jpg',
  },
  {
    id: 'story-internship-sprints',
    title: 'Terminal Windows & Midnight Coffee',
    date: 'Tech Internship',
    watchId: 'g-shock-gw-b5600hr',
    watchName: 'G-SHOCK GW-B5600HR',
    description: 'Lines of code building across monitors, mechanical keyboard clatter, and red composite links resting against the desk.',
    fullNarrative:
      'During intense sprint weeks at the internship, days blurred into nights. When you spend ten hours typing, heavy metal bracelets dig painfully into your wrists, but the G-Shock square’s composite band rested flat and unnoticed against the desk mat. In team candid photos around the whiteboard, the matte black square is right there on the wrist, steady and unfazed.',
    image: '/beyondcode/watches/gwb5600.jpg',
  },
  {
    id: 'story-family-evening',
    title: 'The Wedding Hall Courtyard',
    date: 'Family Gathering',
    watchId: 'titan-nc1482yl05',
    watchName: 'Titan NC1482YL05',
    description: 'Traditional attire, jasmine flowers in the air, and an heirloom piece that carries shared bloodlines.',
    fullNarrative:
      'Family gatherings are the only place where the Titan NC1482YL05 belongs. It was worn by family elders on similar evenings decades prior. Looking down at the gold-accented bezel while standing in the courtyard catching up with cousins, you feel the continuity of time. The watch wasn’t posed; it was just living its rightful purpose on family hands.',
    image: '/1000284820.jpeg',
  },
  {
    id: 'story-monsoon-drive',
    title: 'The Misty Western Ghats',
    date: 'Monsoon Journey',
    watchId: 'titan-octane-diver',
    watchName: 'Titan Octane Hyperlume Diver',
    description: 'Rain drumming against the windshield, cold fog on mountain bends, and luminous hands cutting through the gloom.',
    fullNarrative:
      'Driving up the winding mountain roads through heavy monsoon downpours. Steering wheel in hand, condensation on the windows, and the Titan Octane diver catching the ambient grey light of the hills. When stepping out into the drizzle to look over the tea valleys, you never worry about water or weather. It is built for days when nature takes over.',
    image: '/beyondcode/watches/titan.jpg',
  },
];

export interface WatchMomentPolaroid {
  id: string;
  title: string;
  eraOrDate: string;
  image: string;
  caption: string;
  fullNarrative: string;
}

export interface WatchMomentsGroup {
  watchId: string;
  watchName: string;
  brand: string;
  watchThumb: string;
  role: string;
  intro: string;
  photos: string[];
  polaroids: WatchMomentPolaroid[];
}

export const watchMomentsData: WatchMomentsGroup[] = [
  {
    watchId: 'timex-waterbury-chrono',
    watchName: 'The Waterbury Flyback Chrono',
    brand: 'Timex',
    watchThumb: '/beyondcode/watches/thumbnail/timex.png',
    role: 'The Workstation Companion',
    intro: 'A tactile anchor for deep work focus. Click the flyback pusher to reset intervals instantly without interruption.',
    photos: [
      '/beyondcode/watches/timex.jpg',
      '/beyondcode/IMG_20260620_101612.jpeg',
    ],
    polaroids: [
      {
        id: 'timex-polaroid-1',
        title: 'The Analog Desk & Ink Notes',
        eraOrDate: 'Design Studio',
        image: '/beyondcode/watches/timex.jpg',
        caption: 'Beside a fountain pen and pocket knife, the Waterbury sits flat against the leather desk pad, timing intervals without screen glare.',
        fullNarrative:
          'Before a single line of software is committed, clarity is born on paper. Beside a vintage fountain pen and pocket blade, the Waterbury rests flat against the desk mat. Its sweeping subdial tracks focused intervals without digital notifications, serving as an anchor to tactile craftsmanship.',
      },
      {
        id: 'timex-polaroid-2',
        title: 'Physical Carry Array',
        eraOrDate: 'Workstation Still Life',
        image: '/beyondcode/IMG_20260620_101612.jpeg',
        caption: 'Arranged flat on solid oak alongside everyday essentials before beginning architecture diagrams.',
        fullNarrative:
          'The morning desk ritual: emptying pockets onto oak wood. The chronograph pairs with a minimal leather cardholder, Swiss slipjoint blade, and fine writing instruments, creating a quiet workspace primed for engineering.',
      },
    ],
  },
  {
    watchId: 'hmt-janata-1983',
    watchName: 'HMT Janata 1983 Mechanical',
    brand: 'HMT',
    watchThumb: '/beyondcode/watches/thumbnail/hmt.png',
    role: 'Mechanical Heritage',
    intro: 'Manufactured in Bangalore in 1983. 17 jewels ticking with a quiet mechanical rhythm that has endured forty years.',
    photos: [
      '/beyondcode/watches/moments/janata/SaveClip.App_640975303_18572647459021036_7606464426314013513_n.jpg',
      '/beyondcode/watches/moments/janata/SaveClip.App_655871569_18111457651741086_1285052432376763581_n.jpg',
    ],
    polaroids: [
      {
        id: 'hmt-polaroid-1',
        title: 'The Convocation Robe',
        eraOrDate: 'Graduation Ceremony',
        image: '/beyondcode/watches/moments/janata/SaveClip.App_640975303_18572647459021036_7606464426314013513_n.jpg',
        caption: 'Forty years of Bangalore mechanical ticking beneath the graduation gown, keeping time for a graduate stepping into a new era.',
        fullNarrative:
          'On graduation day, everyone had smart screens flashing with calls. I chose to wind the 1983 Janata that morning before putting on the convocation robe. In the photographs holding the degree scroll, you catch a glimpse of the domed acrylic crystal and ticking soul from 1983.',
      },
      {
        id: 'hmt-polaroid-2',
        title: 'Morning Manual Winding',
        eraOrDate: 'Bangalore Caliber 0231',
        image: '/beyondcode/watches/moments/janata/SaveClip.App_655871569_18111457651741086_1285052432376763581_n.jpg',
        caption: 'Twenty deliberate turns of the crown every morning, a conscious breath of analog connection with Indian horology.',
        fullNarrative:
          'There is something deeply poetic about winding a watch by hand every morning. Produced in Bangalore in 1983, its ticking is audible in a quiet room, carrying decades of memory on a minimal cream dial.',
      },
    ],
  },
  {
    watchId: 'titan-octane-diver',
    watchName: 'Titan Octane Hyperlume Diver',
    brand: 'Titan',
    watchThumb: '/beyondcode/watches/thumbnail/titan.png',
    role: 'Highland Weather Tool',
    intro: 'Substantial 200M water resistance, rotating notched bezel, and saddle leather strap built for expeditions.',
    photos: [
      '/beyondcode/watches/moments/hyperlume/SaveClip.App_619486236_17916046053256023_9148721538976283381_n.jpg',
      '/beyondcode/watches/moments/hyperlume/SaveClip.App_622399647_18067306205553283_3226597230406132596_n.jpg',
      '/beyondcode/watches/moments/hyperlume/SaveClip.App_624661134_18030696422783741_8830968603247834586_n.jpg',
      '/beyondcode/watches/moments/hyperlume/SaveClip.App_845012842_18081917702687496_1342417314687015452_n.jpg',
    ],
    polaroids: [
      {
        id: 'titan-polaroid-1',
        title: 'Misty Western Ghats',
        eraOrDate: 'Monsoon Mountain Drive',
        image: '/beyondcode/watches/moments/hyperlume/SaveClip.App_619486236_17916046053256023_9148721538976283381_n.jpg',
        caption: 'Condensation on windshields, mountain bends, and high contrast lume cutting through the highland gloom.',
        fullNarrative:
          'Driving through thick mountain fog on winding hairpins. Rain drumming on the roof, steering wheel in hand, and the heavy Titan Octane diver catching ambient highland light. Built for days when nature takes over.',
      },
      {
        id: 'titan-polaroid-2',
        title: 'Golden Hour Tool Presence',
        eraOrDate: 'Coastal Sunset',
        image: '/beyondcode/watches/moments/hyperlume/SaveClip.App_622399647_18067306205553283_3226597230406132596_n.jpg',
        caption: 'Rich saddle brown leather and notched steel bezel catching late afternoon sunlight.',
        fullNarrative:
          'Resting on the open window frame during a late afternoon coastal road trip. The heavy steel case and aged leather strap carry the dust and warmth of miles traveled.',
      },
    ],
  },
  {
    watchId: 'fossil-hybrid-fb01',
    watchName: 'Fossil Hybrid FB-01',
    brand: 'Fossil',
    watchThumb: '/beyondcode/watches/thumbnail/fossil.png',
    role: 'Analog Smart Diver',
    intro: 'Classic diver exterior concealing smart haptic Bluetooth connected modules.',
    photos: [
      '/beyondcode/watches/moments/fossil/SaveClip.App_624372681_18122731849499267_7234478521972180542_n.jpg',
      '/beyondcode/watches/moments/fossil/SaveClip.App_625764561_18344789014236797_5825612980888122625_n.jpg',
      '/beyondcode/watches/moments/fossil/SaveClip.App_655266247_18028463375799097_4589717025310954489_n.jpg',
      '/beyondcode/watches/moments/fossil/SaveClip.App_862427234_18083994956687496_7808573217524302177_n.jpg',
    ],
    polaroids: [
      {
        id: 'fossil-polaroid-1',
        title: 'Analog Display & Subtle Sync',
        eraOrDate: 'Daily Rotation',
        image: '/beyondcode/watches/moments/fossil/SaveClip.App_624372681_18122731849499267_7234478521972180542_n.jpg',
        caption: 'Classic diver presence paired with subtle vibration notifications and physical ticking hands.',
        fullNarrative: 'A balance between traditional watchmaking aesthetics and discreet modern connectivity.',
      },
    ],
  },
  {
    watchId: 'g-shock-gw-b5600hr',
    watchName: 'G-SHOCK GW-B5600HR',
    brand: 'Casio G-SHOCK',
    watchThumb: '/beyondcode/watches/thumbnail/gwb5600.png',
    role: 'The Everyday Benchmark',
    intro: 'Red composite combi bracelet, Bluetooth time sync, and square resin case built for rainforest canopies and sprint weeks.',
    photos: [
      '/beyondcode/watches/moments/gwb5600/SaveClip.App_619330608_18065694047630176_2905316162702793005_n.jpg',
      '/beyondcode/watches/moments/gwb5600/SaveClip.App_620964068_18055305893400989_2580289493651599791_n.jpg',
      '/beyondcode/watches/moments/gwb5600/SaveClip.App_627661279_18329750731168986_6417933862030410399_n.jpg',
      '/beyondcode/watches/moments/gwb5600/SaveClip.App_662566873_18109186849879223_2398607241118576797_n.jpg',
    ],
    polaroids: [
      {
        id: 'gwb5600-polaroid-1',
        title: 'Rainforest Canopy Droplets',
        eraOrDate: 'Monsoon Canopy',
        image: '/beyondcode/watches/moments/gwb5600/SaveClip.App_619330608_18065694047630176_2905316162702793005_n.jpg',
        caption: 'Water droplets resting on the matte square resin bezel in dense canopy mist, completely impervious to impact and weather.',
        fullNarrative:
          'Deep inside the Western Ghats rainforest canopy, moisture condenses on everything within minutes. The matte resin square rests against moss-covered branches, beads of rain clinging to its crystal. Indestructible, solar-powered, and forever accurate.',
      },
      {
        id: 'gwb5600-polaroid-2',
        title: 'Midnight Code & Terminal Windows',
        eraOrDate: 'Tech Sprint Weeks',
        image: '/beyondcode/watches/moments/gwb5600/SaveClip.App_620964068_18055305893400989_2580289493651599791_n.jpg',
        caption: 'Lightweight red composite links resting flat against the desk mat during marathon engineering sprints.',
        fullNarrative:
          'During intense sprint weeks, days blurred into nights. When you spend ten hours typing, heavy metal bracelets dig painfully into wrists, but the G-Shock square’s composite band rested smooth and unnoticed against the desk mat.',
      },
    ],
  },
  {
    watchId: 'casio-ws-220',
    watchName: 'Casio Tough Solar WS-220',
    brand: 'Casio',
    watchThumb: '/beyondcode/watches/thumbnail/ws220.png',
    role: 'The Genesis Runner',
    intro: 'Worn through early university years, running between lecture halls in heavy Kerala monsoon rains, never missing a second.',
    photos: [
      '/beyondcode/watches/moments/ws220/SaveClip.App_621582023_18102582811865239_8844217091451431196_n.jpg',
      '/beyondcode/watches/moments/ws220/SaveClip.App_622979591_18088614845022866_6364087260393871943_n.jpg',
      '/beyondcode/watches/moments/ws220/SaveClip.App_623413226_18153548086428208_8024143757969259100_n.jpg',
      '/beyondcode/watches/moments/ws220/SaveClip.App_627463926_18306993664259343_5897080721003237156_n.jpg',
    ],
    polaroids: [
      {
        id: 'ws220-polaroid-1',
        title: 'The 8 AM Lecture & Campus Rain',
        eraOrDate: 'College Years',
        image: '/beyondcode/watches/moments/ws220/SaveClip.App_621582023_18102582811865239_8844217091451431196_n.jpg',
        caption: 'Rushing across rain slicked campus pathways with textbooks underarm and five minutes on the dual digital display.',
        fullNarrative:
          'College mornings were always measured in narrow margins. Running up three flights of stairs to beat the professor to the lecture hall door, checking the wrist while balancing notebooks and an umbrella. The Casio WS-220 was never posed in photographs; it was just living on the wrist through humidity and sudden cloudbursts.',
      },
      {
        id: 'ws220-polaroid-2',
        title: 'Driftwood & River Rapids',
        eraOrDate: 'Western Ghats Trails',
        image: '/beyondcode/watches/moments/ws220/SaveClip.App_622979591_18088614845022866_6364087260393871943_n.jpg',
        caption: 'Resting on river driftwood beside cold freshwater rapids, soaking in morning sunlight to charge its solar cell.',
        fullNarrative:
          'On weekend treks through highland streams, you never have to think about taking it off. Resting against sun-warmed river stones after a swim, its Tough Solar dial quietly replenishes power. A decade of uninterrupted timekeeping started here.',
      },
    ],
  },
  {
    watchId: 'titan-nc1482yl05',
    watchName: 'Titan NC1482YL05 Heirloom',
    brand: 'Titan',
    watchThumb: '/1000284820.jpeg',
    role: 'Family Lineage & Memory',
    intro: 'Passed down through family elders. A timepiece whose worth is defined purely by shared memories and lineage.',
    photos: ['/1000284820.jpeg'],
    polaroids: [
      {
        id: 'heirloom-polaroid-1',
        title: 'The Wedding Hall Courtyard',
        eraOrDate: 'Family Evening',
        image: '/beyondcode/watches.jpg',
        caption: 'Traditional attire, courtyard conversations, and a gold accented champagne dial living its rightful purpose across generations.',
        fullNarrative:
          'Family gatherings are where this watch truly belongs. Worn by elders on similar celebrations decades prior. Looking down at the gold accented dial, you feel the unbroken continuity of family memory.',
      },
    ],
  },
  {
    watchId: 'g-shock-gg1000',
    watchName: 'Mudmaster GG-1000',
    brand: 'Casio G-SHOCK',
    watchThumb: '/beyondcode/watches/gg1000.jpg',
    role: 'Tactical Field Endurance',
    intro: 'Twin sensor compass and ambient thermometer in a cylindrical mud resistant casing.',
    photos: ['/beyondcode/watches/gg1000.jpg'],
    polaroids: [
      {
        id: 'gg1000-polaroid-1',
        title: 'Rough Terrain Heading',
        eraOrDate: 'Field Expedition',
        image: '/beyondcode/watches/gg1000.jpg',
        caption: 'Instant digital compass heading and thermal readings tested in gritty field environments.',
        fullNarrative:
          'Built for places where mud and grit would grind ordinary buttons to a halt. The twin sensor compass gives instant direction at the push of the large textured 3 o’clock button.',
      },
    ],
  },
  {
    watchId: 'kademan-dual-display',
    watchName: 'Kademan Chrono Dual-Time',
    brand: 'Kademan',
    watchThumb: '/beyondcode/watches/kademan.jpg',
    role: 'Casual Everyday Rotation',
    intro: 'Bold gunmetal case architecture combining 3-hand analog layout with multifunctional digital LCD readout.',
    photos: ['/beyondcode/watches/kademan.jpg'],
    polaroids: [
      {
        id: 'kademan-polaroid-1',
        title: 'Dual Timezone Everyday',
        eraOrDate: 'Casual Rotation',
        image: '/beyondcode/watches/kademan.jpg',
        caption: 'Substantial gunmetal case with dual displays for effortless stopwatch timing and timezone tracking.',
        fullNarrative:
          'Rugged and substantial for everyday casual adventures. The dual analog-digital layout offers instant timing without fuss.',
      },
    ],
  },
  {
    watchId: 'casio-beside',
    watchName: 'Casio Beside Classical Series',
    brand: 'Casio',
    watchThumb: '/beyondcode/watches/BESIDE.jpg',
    role: 'Understated Dress Simplicity',
    intro: 'Refined dress watch featuring textured guilloché dial detailing and balanced European proportions.',
    photos: ['/beyondcode/watches/BESIDE.jpg'],
    polaroids: [
      {
        id: 'beside-polaroid-1',
        title: 'Textured Guilloché Dial',
        eraOrDate: 'Evening Elegance',
        image: '/beyondcode/watches/BESIDE.jpg',
        caption: 'European proportions, polished indices, and guilloché dial textures for understated formal occasions.',
        fullNarrative:
          'Casio’s underrated dress sub-brand. Departing from sports roots to offer classic proportions, polished stainless steel, and refined guilloché dial work.',
      },
    ],
  },
];

export const edcData: EDCItem[] = [
  {
    id: 'edc-desk-flatlay',
    name: 'The Oak Desk Flat Lay',
    category: 'Still Life & Field Gear',
    note: 'The complete physical carry array arranged on solid oak: minimal card wallet, Swiss slipjoint blade, inspection torch, and fountain pen.',
    image: '/beyondcode/IMG_20260620_101612.jpeg',
  },
  {
    id: 'edc-card-wallet',
    name: 'Leather Theatre Cardholder',
    category: 'Pocket Carry',
    note: 'Minimalist full-grain vegetable-tanned leather card sleeve. Compact, front-pocket friendly, and gaining rich patina with every journey.',
    image: '/beyondcode/IMG_20260620_101612.jpeg',
  },
  {
    id: 'edc-swiss-blade',
    name: 'Victorinox Swiss Army Knife',
    category: 'Pocket Tool & Blade',
    note: 'Classic stainless steel slipjoint pocket tool with spear blade, can opener, wire stripper, and screwdrivers for everyday problem-solving.',
    image: '/beyondcode/IMG_20260620_101612.jpeg',
  },
  {
    id: 'edc-fountain-pen',
    name: 'Precision Matte Fountain Pen',
    category: 'Writing Instrument',
    note: 'Black anodized fountain pen with fine stainless steel nib. Fed with waterproof black ink for system design diagrams and handwritten logs.',
    image: '/beyondcode/IMG_20260620_101612.jpeg',
  },
  {
    id: 'edc-torch',
    name: 'Ledlenser Compact Inspection Torch',
    category: 'Illumination',
    note: 'Anodized aircraft aluminum body with high-CRI clean beam. Indispensable for looking under hardware racks and dark nighttime paths.',
    image: '/beyondcode/IMG_20260620_101612.jpeg',
  },
  {
    id: 'edc-memo-book',
    name: 'Grid Field Pocket Journal',
    category: 'Analog Paper',
    note: 'Heavy-duty 48-page grid pocket notebook. The offline buffer where software architectures and thoughts are captured before the computer.',
    image: '/beyondcode/IMG_20260620_101612.jpeg',
  },
];

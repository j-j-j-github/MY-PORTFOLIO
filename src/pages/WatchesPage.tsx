import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  XCircle,
  Instagram,
  Maximize2,
  ChevronDown,
  Menu,
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import {
  mainWatchesData,
  secondaryWatchesData,
  watchesData,
  reviewsData,
  watchMomentsData,
  type WatchPiece,
  type WatchReview,
  type WatchStory,
  type WatchStoryData,
} from '../data/objectsAndTime';

const HERO_TITLE_SIZE = 'text-4xl sm:text-5xl md:text-6xl lg:text-[66px]';

const resolveImg = (src: string) => {
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  const clean = src.startsWith('/') ? src.slice(1) : src;
  return `${import.meta.env.BASE_URL}${clean}`;
};

// =========================================================================
// REUSABLE WATCH STORY SECTION ("The Story")
// =========================================================================
interface WatchStorySectionProps {
  story?: WatchStoryData;
  watchModel: string;
}

const WatchStorySection: React.FC<WatchStorySectionProps> = ({ story, watchModel }) => {
  const effectiveStory = story || {
    title: `The Story of ${watchModel}`,
    paragraphs: [],
    isPlaceholder: true,
  };

  const isPlaceholder =
    effectiveStory.isPlaceholder ||
    (!effectiveStory.lead && (!effectiveStory.paragraphs || effectiveStory.paragraphs.length === 0));

  return (
    <div className="pt-2">
      {/* Prominent Section Heading */}
      <div className="mb-6">
        <h2 className="font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','Inter',sans-serif] text-2xl sm:text-3xl font-extrabold tracking-tight text-blue-600">
          The Story:
        </h2>
        <div className="w-12 h-0.5 bg-blue-600 mt-2 mb-4" />

        {/* Distinctive Story Heading */}
        <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 mb-1 leading-tight">
          {effectiveStory.title}
        </h3>

        {effectiveStory.subtitle && (
          <p className="font-serif italic text-sm sm:text-base text-neutral-500 font-normal">
            {effectiveStory.subtitle}
          </p>
        )}
      </div>

      {isPlaceholder ? (
        <div className="p-6 sm:p-7 rounded-2xl bg-neutral-100/70 border border-dashed border-neutral-300">
          <p className="font-serif italic text-base text-neutral-700 leading-relaxed mb-1.5">
            The personal story for this piece is currently being written.
          </p>
          <p className="text-xs sm:text-[13px] font-mono text-neutral-500 uppercase tracking-wider">
            Archive Entry &bull; In Progress
          </p>
        </div>
      ) : (
        <div className="space-y-6 text-neutral-800 text-base sm:text-lg leading-[1.85] font-[-apple-system,BlinkMacSystemFont,'Inter',sans-serif]">
          {/* Story Opening */}
          {effectiveStory.lead && (
            <p className="font-normal text-neutral-800">
              {effectiveStory.lead}
            </p>
          )}

          {/* Well-spaced paragraphs */}
          {effectiveStory.paragraphs.map((paragraph, idx) => (
            <p key={idx} className="font-normal text-neutral-800">
              {paragraph}
            </p>
          ))}

          {/* Closing emphasis line room to stand out */}
          {effectiveStory.closingEmphasis && (
            <div className="pt-6 mt-6 border-t border-neutral-200/90">
              <p className="text-lg sm:text-xl font-serif font-bold text-neutral-950 leading-relaxed italic">
                {effectiveStory.closingEmphasis}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// =========================================================================
// DEDICATED FULL-PAGE VIEW: WATCH SPECIFICATIONS & ARCHIVE
// =========================================================================
const getConditionColor = (status?: string) => {
  if (!status) return 'text-neutral-900';
  const lower = status.toLowerCase();
  if (
    lower.includes('working') ||
    lower.includes('aged finish') ||
    (lower.includes('functional') &&
      !lower.includes('non functional') &&
      !lower.includes('non-functional'))
  ) {
    return 'text-emerald-600 font-bold';
  }
  if (
    lower.includes('sold') ||
    lower.includes('non functional') ||
    lower.includes('non-functional')
  ) {
    return 'text-red-600 font-bold';
  }
  return 'text-neutral-900';
};

// =========================================================================
// REUSABLE SCROLLABLE SPECIFICATIONS LIST WITH GLASSMORPHIC FLOATING ARROW
// =========================================================================
interface ScrollableSpecsListProps {
  id?: string;
  details: { label: string; value: string }[];
  maxHeight?: number | string;
  className?: string;
}

const ScrollableSpecsList: React.FC<ScrollableSpecsListProps> = ({
  id,
  details,
  maxHeight,
  className = '',
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);
  const [scrollState, setScrollState] = useState<'top' | 'middle' | 'bottom'>('top');

  const checkScroll = () => {
    const el = listRef.current;
    if (!el) return;
    const hasOverflow = el.scrollHeight > el.clientHeight + 4;
    setCanScroll(hasOverflow);

    if (!hasOverflow) {
      setScrollState('top');
      return;
    }

    const isTop = el.scrollTop <= 8;
    const isBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 8;

    if (isTop) {
      setScrollState('top');
    } else if (isBottom) {
      setScrollState('bottom');
    } else {
      setScrollState('middle');
    }
  };

  useEffect(() => {
    checkScroll();
    const el = listRef.current;
    if (!el) return;

    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(() => checkScroll());
      observer.observe(el);
    }

    const timer1 = setTimeout(checkScroll, 80);
    const timer2 = setTimeout(checkScroll, 300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
      if (observer) observer.disconnect();
    };
  }, [details, maxHeight]);

  const handleArrowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const el = listRef.current;
    if (!el) return;

    if (scrollState === 'bottom') {
      el.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      el.scrollBy({ top: 180, behavior: 'smooth' });
    }
  };

  const isVisible = canScroll && (scrollState === 'top' || scrollState === 'bottom');
  const isUpward = scrollState === 'bottom';

  return (
    <div className="relative flex-1 min-h-0 flex flex-col">
      <div
        ref={listRef}
        id={id}
        className={`flex-1 min-h-0 space-y-3 overflow-y-auto pr-2.5 [scrollbar-color:#2563eb_#e2e8f0] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-neutral-100 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-blue-600 [&::-webkit-scrollbar-thumb]:rounded-full ${className}`}
        style={{
          maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
        }}
      >
        {details.map((detail, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-0.5 pb-2.5 border-b border-neutral-100 last:border-0 last:pb-0"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-neutral-500 font-bold shrink-0">
              {detail.label}
            </span>
            <span
              className={`text-xs sm:text-[13px] font-semibold leading-snug ${getConditionColor(
                detail.value
              )}`}
            >
              {detail.value}
            </span>
          </div>
        ))}
      </div>

      {/* Subtle bottom fade gradient when scrollable and not at bottom */}
      {canScroll && scrollState !== 'bottom' && (
        <div className="pointer-events-none absolute bottom-0 left-0 right-2.5 h-10 bg-gradient-to-t from-white via-white/80 to-transparent z-10 transition-opacity duration-300" />
      )}

      {/* Floating Glassmorphic Round Arrow Button at Bottom Center */}
      {canScroll && (
        <div className="pointer-events-none absolute bottom-2 left-0 right-0 z-20 flex justify-center">
          <button
            type="button"
            onClick={handleArrowClick}
            aria-label={isUpward ? 'Scroll to top of specifications' : 'Scroll down specifications'}
            title={isUpward ? 'Back to top' : 'Scroll for more specifications'}
            className={`pointer-events-auto w-8 h-8 rounded-full bg-white/95 backdrop-blur-md border border-neutral-300/90 shadow-[0_4px_14px_rgba(0,0,0,0.14)] flex items-center justify-center text-blue-600 hover:text-blue-700 hover:bg-white hover:shadow-lg transition-all duration-300 cursor-pointer ${
              isVisible ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-90 pointer-events-none'
            }`}
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${
                isUpward ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </button>
        </div>
      )}
    </div>
  );
};

interface WatchDetailPageProps {
  watch: WatchPiece;
  onBack: () => void;
  onOpenReview: (reviewId: string) => void;
}

const WatchDetailPage: React.FC<WatchDetailPageProps> = ({ watch, onBack, onOpenReview }) => {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const [rightTranslateY, setRightTranslateY] = useState(0);
  const [stickyHeight, setStickyHeight] = useState<number | undefined>(undefined);
  const [archiveSpecsCardHeight, setArchiveSpecsCardHeight] = useState<number | undefined>(undefined);
  const [archiveSpecsListHeight, setArchiveSpecsListHeight] = useState<number | undefined>(undefined);

  const isArchiveWatch =
    watch.collectionStatus === 'Archived' || secondaryWatchesData.some((w) => w.id === watch.id);

  useEffect(() => {
    document.title = `${watch.brand} ${watch.model} | JJJ Watches`;
    window.scrollTo(0, 0);
  }, [watch]);

  // Dynamic height calculation for Archive watch specifications so container ends match exactly
  useEffect(() => {
    if (!isArchiveWatch) return;

    const updateArchiveLayout = () => {
      if (window.innerWidth < 1024) {
        setArchiveSpecsCardHeight(undefined);
        setArchiveSpecsListHeight(undefined);
        return;
      }
      const leftEl = leftColRef.current;
      const heroEl = document.getElementById('archive-hero-photo');
      const specsHeaderEl = document.getElementById('archive-specs-header');
      if (!leftEl || !heroEl) return;

      const leftH = leftEl.getBoundingClientRect().height;
      const heroH = heroEl.getBoundingClientRect().height;
      const gap = 28; // space-y-7 between hero and specs card

      // Total target height for the specs card so right column bottom exactly matches left column bottom
      const targetCardH = Math.max(340, leftH - heroH - gap);
      setArchiveSpecsCardHeight(targetCardH);

      // Card padding: p-5 sm:p-6 (48px) + borders (2px)
      const paddingAndBorders = 52;
      const headerH = specsHeaderEl ? specsHeaderEl.getBoundingClientRect().height : 58;

      const availableListH = targetCardH - paddingAndBorders - headerH;
      setArchiveSpecsListHeight(Math.max(160, availableListH));
    };

    const timer1 = setTimeout(updateArchiveLayout, 50);
    const timer2 = setTimeout(updateArchiveLayout, 180);
    const timer3 = setTimeout(updateArchiveLayout, 400);
    window.addEventListener('resize', updateArchiveLayout);

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && leftColRef.current) {
      observer = new ResizeObserver(() => updateArchiveLayout());
      observer.observe(leftColRef.current);
      const heroEl = document.getElementById('archive-hero-photo');
      if (heroEl) observer.observe(heroEl);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener('resize', updateArchiveLayout);
      if (observer) observer.disconnect();
    };
  }, [watch, isArchiveWatch]);

  // Synchronized slow scroll for the right column so both sides finish at the exact same time (collection watches)
  useEffect(() => {
    if (isArchiveWatch) {
      setRightTranslateY(0);
      setStickyHeight(undefined);
      return;
    }

    const calculateScroll = () => {
      if (window.innerWidth < 1024) {
        setRightTranslateY(0);
        setStickyHeight(undefined);
        return;
      }
      if (!leftColRef.current || !rightColRef.current) return;

      const leftRect = leftColRef.current.getBoundingClientRect();
      const leftHeight = leftColRef.current.offsetHeight;
      const rightHeight = rightColRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const topOffset = 96; // sticky top (top-24)
      const bottomOffset = 40; // breathing room above bottom navigation

      const visibleHeight = Math.min(rightHeight, Math.max(300, windowHeight - topOffset - bottomOffset));
      setStickyHeight(visibleHeight);

      const totalScrollDistance = leftHeight - visibleHeight;

      if (totalScrollDistance <= 0) {
        setRightTranslateY(0);
        return;
      }

      // Distance left column has scrolled past topOffset
      const scrolled = topOffset - leftRect.top;
      const progress = Math.min(Math.max(scrolled / totalScrollDistance, 0), 1);

      // Total travel distance required for the right column so its bottom ends at visibleHeight
      const maxRightTravel = Math.max(0, rightHeight - visibleHeight);
      const targetY = -(progress * maxRightTravel);

      setRightTranslateY(targetY);
    };

    window.addEventListener('scroll', calculateScroll, { passive: true });
    window.addEventListener('resize', calculateScroll);

    // Observe size changes of both columns (images loading, dynamic content resizing)
    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(() => {
        calculateScroll();
      });
      if (leftColRef.current) observer.observe(leftColRef.current);
      if (rightColRef.current) observer.observe(rightColRef.current);
    }

    const timer1 = setTimeout(calculateScroll, 50);
    const timer2 = setTimeout(calculateScroll, 200);
    const timer3 = setTimeout(calculateScroll, 500);

    calculateScroll();

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener('scroll', calculateScroll);
      window.removeEventListener('resize', calculateScroll);
      if (observer) observer.disconnect();
    };
  }, [watch, isArchiveWatch]);

  // Aggregate every photo of this particular watch model (from moments + gallery)
  const momentGroup = watchMomentsData.find((g) => g.watchId === watch.id);
  const allVisualImages: { image: string; caption?: string }[] = [];
  const addedImages = new Set<string>();

  if (momentGroup && momentGroup.photos) {
    momentGroup.photos.forEach((photoUrl, idx) => {
      if (!addedImages.has(photoUrl)) {
        addedImages.add(photoUrl);
        const matchingPolaroid = momentGroup.polaroids?.find((p) => p.image === photoUrl);
        allVisualImages.push({
          image: photoUrl,
          caption: matchingPolaroid?.caption || `${watch.brand} ${watch.model} Moment 0${idx + 1}`,
        });
      }
    });
  }

  if (watch.galleryImages) {
    watch.galleryImages.forEach((gal) => {
      if (!addedImages.has(gal.image)) {
        addedImages.add(gal.image);
        allVisualImages.push(gal);
      }
    });
  }

  return (
    <div className="min-h-screen bg-[#fafafa] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] text-neutral-900 flex flex-col justify-between selection:bg-neutral-900 selection:text-white">
      {/* Sticky Solid Black Topbar Matching Homescreen Size */}
      <header className="sticky top-0 z-40 h-14 sm:h-[60px] bg-[#0c0c0e] text-white border-b border-white/[0.08] px-3.5 sm:px-8 lg:px-12 flex items-center justify-between transition-all">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-[11px] sm:text-[13px] font-semibold text-white transition-all duration-200 cursor-pointer shrink-0 hover:-translate-x-0.5"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-blue-400" />
          <span className="hidden sm:inline">{isArchiveWatch ? 'Back to Archive' : 'Back to Collection'}</span>
          <span className="sm:hidden">Back</span>
        </button>

        <div className="flex items-center gap-2 font-mono text-[13px] sm:text-[15px] md:text-base font-bold tracking-widest uppercase text-white px-2 whitespace-nowrap shrink-0">
          <span>JJJ WATCHES</span>
        </div>

        <a
          href="https://www.instagram.com/jjj_watches/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-neutral-400 hover:text-white transition-colors shrink-0"
        >
          <Instagram className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">@jjj_watches</span>
        </a>
      </header>

      {/* Main Page Container: Proper 2-Column Article Layout with items-start */}
      <main className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-10 sm:py-16 w-full flex-1">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 ${isArchiveWatch ? 'items-start' : 'items-stretch'}`}>
          {/* LEFT COLUMN: THE ARTICLE (Story & Editorial Narrative) */}
          <div ref={leftColRef} className="lg:col-span-7 space-y-8">
            {/* Header: Brand & Category */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 font-semibold mb-2">
                <span>{watch.brand}</span>
                <span className="text-neutral-300">&bull;</span>
                <span>{watch.category}</span>
              </div>

              <h1 className="font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','Inter',sans-serif] text-3xl sm:text-5xl lg:text-5xl font-black tracking-[-0.035em] text-neutral-950 leading-[1.08] mb-4">
                {watch.model}
              </h1>

              <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed">
                {watch.shortDescription}
              </p>

              <div className="w-16 h-px bg-neutral-300 mt-6" />
            </div>

            {/* The Story Section (Collection) OR Archive Notes (Archive) */}
            {isArchiveWatch ? (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-blue-600 font-semibold block mb-2">
                    Archive Documentation
                  </span>
                  <h2 className="font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','Inter',sans-serif] text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 mb-3 pb-3 border-b border-neutral-200/80">
                    Archive Notes
                  </h2>
                  <div className="space-y-4 text-base sm:text-lg text-neutral-700 leading-relaxed font-normal">
                    {watch.archiveNote?.split('\n\n').map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>

                {watch.archiveInfo && (
                  <div className="rounded-2xl bg-white border border-neutral-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.04)] p-5 sm:p-6">
                    <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500 font-bold block mb-4 pb-2 border-b border-neutral-100">
                      Archive Information
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/70">
                        <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-neutral-500 font-semibold block mb-1">
                          Watch Type
                        </span>
                        <span className="text-xs sm:text-[13px] font-bold text-neutral-900 block">
                          {watch.archiveInfo.watchType}
                        </span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/70">
                        <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-neutral-500 font-semibold block mb-1">
                          Current Status / Condition
                        </span>
                        <span
                          className={`text-xs sm:text-[13px] block ${getConditionColor(
                            watch.archiveInfo.statusOrCondition
                          )}`}
                        >
                          {watch.archiveInfo.statusOrCondition}
                        </span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/70">
                        <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-neutral-500 font-semibold block mb-1">
                          Distinctive Feature
                        </span>
                        <span className="text-xs sm:text-[13px] font-bold text-neutral-900 block">
                          {watch.archiveInfo.distinctiveFeature}
                        </span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/70">
                        <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-neutral-500 font-semibold block mb-1">
                          Classification
                        </span>
                        <span className="text-xs sm:text-[13px] font-bold text-neutral-900 block">
                          {watch.archiveInfo.classification}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <WatchStorySection story={watch.story} watchModel={`${watch.brand} ${watch.model}`} />
            )}

            {/* Ownership Review Callout (if available) */}
            {watch.reviewId && (
              <div className="p-6 sm:p-7 rounded-2xl bg-blue-600 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-xl shadow-blue-600/20">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-blue-100 block mb-1 font-bold">
                    Field Notes Available
                  </span>
                  <h3 className="font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','Inter',sans-serif] text-lg sm:text-xl font-bold tracking-tight text-white mb-0.5">
                    Full Ownership Review
                  </h3>
                  <p className="text-xs text-blue-100 max-w-sm">
                    Read deep dive impressions after hundreds of days of daily wrist wear.
                  </p>
                </div>
                <button
                  onClick={() => onOpenReview(watch.reviewId!)}
                  className="px-5 py-2.5 rounded-full bg-white hover:bg-neutral-100 text-blue-700 text-xs font-semibold tracking-tight transition-all duration-200 hover:-translate-y-0.5 cursor-pointer whitespace-nowrap inline-flex items-center gap-1.5 self-start sm:self-auto shadow-sm"
                >
                  <span>Read Review</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: IMAGES & VERIFIED SPECS */}
          <div className={`lg:col-span-5 relative ${isArchiveWatch ? '' : 'h-full min-h-full'}`}>
            {isArchiveWatch ? (
              <div className="space-y-7">
                {/* Primary Hero Photograph */}
                <div
                  id="archive-hero-photo"
                  className="relative aspect-[16/10] sm:aspect-[4/3] max-h-[300px] rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-300 shadow-[0_12px_32px_rgba(0,0,0,0.08)] shrink-0"
                >
                  <img
                    src={resolveImg(watch.heroImage)}
                    alt={`${watch.brand} ${watch.model}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Verified Specifications */}
                <div
                  id="archive-specs-card"
                  className="rounded-2xl bg-white border border-neutral-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.04)] p-5 sm:p-6 flex flex-col min-h-0"
                  style={{
                    height: archiveSpecsCardHeight ? `${archiveSpecsCardHeight}px` : undefined,
                  }}
                >
                  <div id="archive-specs-header" className="shrink-0 mb-3 pb-3 border-b border-neutral-200/80">
                    <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500 font-bold block mb-1">
                      Technical Documentation
                    </span>
                    <h3 className="font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','Inter',sans-serif] text-lg sm:text-xl font-extrabold tracking-tight text-blue-600">
                      Specifications
                    </h3>
                  </div>

                  <ScrollableSpecsList
                    id="archive-specs-list"
                    details={watch.verifiedDetails.filter((d) => d.label !== 'Role in Collection')}
                    maxHeight={archiveSpecsListHeight}
                  />
                </div>
              </div>
            ) : (
              <div
                className="lg:sticky lg:top-24 overflow-hidden"
                style={{
                  height: stickyHeight ? `${stickyHeight}px` : undefined,
                }}
              >
                <div
                  ref={rightColRef}
                  style={{
                    transform: `translate3d(0, ${rightTranslateY}px, 0)`,
                    willChange: 'transform',
                  }}
                  className="space-y-7"
                >
                  {/* Primary Hero Photograph */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-300 shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
                    <img
                      src={resolveImg(watch.heroImage)}
                      alt={`${watch.brand} ${watch.model}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Verified Specifications */}
                  <div className="rounded-2xl bg-white border border-neutral-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.04)] p-5 sm:p-6 flex flex-col min-h-0">
                    <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500 font-bold block mb-1">
                      Technical Documentation
                    </span>
                    <h3 className="font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','Inter',sans-serif] text-lg sm:text-xl font-extrabold tracking-tight text-blue-600 mb-3 pb-3 border-b border-neutral-200/80 shrink-0">
                      Specifications
                    </h3>

                    <ScrollableSpecsList
                      details={watch.verifiedDetails.filter((d) => d.label !== 'Role in Collection')}
                      maxHeight={340}
                    />
                  </div>

                  {/* Visual Archive: Gallery & Details */}
                  {allVisualImages.length > 0 && (
                    <div className="rounded-2xl bg-white border border-neutral-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.04)] p-5 sm:p-6">
                      <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500 font-bold block mb-1">
                        Visual Archive
                      </span>
                      <h3 className="font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','Inter',sans-serif] text-lg sm:text-xl font-extrabold tracking-tight text-blue-600 mb-3 pb-3 border-b border-neutral-200/80">
                        Gallery &amp; Details
                      </h3>

                      <div className="grid grid-cols-2 gap-3">
                        {allVisualImages.map((gal, idx) => (
                          <div
                            key={idx}
                            onClick={() => setLightboxImg(resolveImg(gal.image))}
                            className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200/90 shadow-sm cursor-pointer hover:shadow-md transition-all duration-300"
                          >
                            <img
                              src={resolveImg(gal.image)}
                              alt={`${watch.model} photograph ${idx + 1}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <span className="flex items-center gap-1.5 text-white text-[11px] font-medium">
                                <Maximize2 className="w-3 h-3" />
                                <span>Enlarge</span>
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation: Placed directly below the 2-column grid with clean, uniform margin */}
        <div className="mt-8 pt-6 border-t border-neutral-200/80 flex items-center justify-between w-full">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isArchiveWatch ? 'Return to Archive' : 'Return to Collection'}</span>
          </button>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xs font-semibold text-neutral-600 hover:text-blue-600 transition-colors cursor-pointer"
          >
            Back to top &uarr;
          </button>
        </div>
      </main>

      {/* Solid Black Footer */}
      <footer className="w-full bg-[#0c0c0e] text-white border-t border-white/[0.08] py-12 px-6 sm:px-10 lg:px-14">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs sm:text-sm font-medium text-neutral-400">
          <div className="flex items-center gap-3">
            <span className="font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','Inter',sans-serif] font-bold tracking-tight uppercase text-white text-base">
              JJJ WATCHES
            </span>
            <span className="text-neutral-600">&bull;</span>
            <span>&copy; {new Date().getFullYear()} Jeeval Jolly Jacob</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/jjj_watches/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white flex items-center gap-2 transition-colors group"
            >
              <Instagram className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
              <span>@jjj_watches</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Lightbox for gallery images */}
      <AnimatePresence>
        {lightboxImg && (
          <div
            onClick={() => setLightboxImg(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-pointer"
          >
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={lightboxImg}
              alt="Enlarged view"
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl"
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// =========================================================================
// DEDICATED FULL-PAGE VIEW: IN-DEPTH OWNERSHIP REVIEW
// =========================================================================
interface ReviewDetailPageProps {
  review: WatchReview;
  onBack: () => void;
  onOpenWatch: (watchId: string) => void;
}

const ReviewDetailPage: React.FC<ReviewDetailPageProps> = ({ review, onBack, onOpenWatch }) => {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const [stickyTop, setStickyTop] = useState<number>(88);
  const matchingWatch = mainWatchesData.find((w) => w.id === review.watchId);
  const momentGroup = watchMomentsData.find((g) => g.watchId === review.watchId);

  useEffect(() => {
    document.title = `Review: ${review.model} | JJJ Watches`;
    window.scrollTo(0, 0);
  }, [review]);

  // Smooth native CSS sticky layout for Review page:
  // Dynamically determines whether the right column fits on screen or needs to stick
  // at the bottom so its content is fully seen and both sides end at the exact same level.
  // 100% hardware-accelerated by the browser's compositor thread with zero scroll jank.
  useEffect(() => {
    const updateSticky = () => {
      if (window.innerWidth < 1024) return;
      if (!rightColRef.current) return;
      const rightH = rightColRef.current.offsetHeight;
      const windowH = window.innerHeight;
      const topOffset = 88; // below sticky topbar
      const bottomOffset = 32; // breathing space above bottom nav

      if (windowH - topOffset >= rightH) {
        setStickyTop(topOffset);
      } else {
        setStickyTop(windowH - rightH - bottomOffset);
      }
    };

    updateSticky();
    window.addEventListener('resize', updateSticky);

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && rightColRef.current) {
      observer = new ResizeObserver(() => updateSticky());
      observer.observe(rightColRef.current);
    }

    const t1 = setTimeout(updateSticky, 100);
    const t2 = setTimeout(updateSticky, 400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', updateSticky);
      if (observer) observer.disconnect();
    };
  }, [review, matchingWatch]);

  // Aggregate editorial photos for the right column
  const editorialPhotos: { image: string; caption?: string; tag?: string }[] = [];
  const addedSet = new Set<string>();

  if (review.coverImage) {
    editorialPhotos.push({
      image: review.coverImage,
      caption: `Field Review Specimen · ${review.model}`,
      tag: 'Cover Specimen',
    });
    addedSet.add(review.coverImage);
  }

  if (momentGroup && momentGroup.photos) {
    momentGroup.photos.forEach((photoUrl, idx) => {
      if (!addedSet.has(photoUrl)) {
        addedSet.add(photoUrl);
        const polaroid = momentGroup.polaroids?.find((p) => p.image === photoUrl);
        editorialPhotos.push({
          image: photoUrl,
          caption: polaroid?.title || polaroid?.caption || `Wrist Moment 0${idx + 1}`,
          tag: polaroid?.eraOrDate || 'Field Test',
        });
      }
    });
  }

  if (matchingWatch && matchingWatch.galleryImages) {
    matchingWatch.galleryImages.forEach((gal, idx) => {
      if (!addedSet.has(gal.image)) {
        addedSet.add(gal.image);
        editorialPhotos.push({
          image: gal.image,
          caption: gal.caption || `Detail View 0${idx + 1}`,
          tag: 'Studio Capture',
        });
      }
    });
  }

  const renderFormattedReviewText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-bold text-neutral-950">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  const renderBulletItem = (text: string) => {
    // When a bullet item has bold text prefix, split into bold title and next-line description
    const match = text.match(/^\*\*(.*?)\*\*:?\s*([\s\S]*)$/);
    if (match) {
      const title = match[1].trim();
      const desc = match[2].trim();
      return (
        <div className="flex-1 min-w-0">
          <strong className="font-bold text-neutral-950 block text-xs sm:text-[13px] mb-1 leading-snug">
            {title}
          </strong>
          {desc && (
            <span className="text-neutral-600 leading-relaxed block text-xs sm:text-[13px]">
              {desc}
            </span>
          )}
        </div>
      );
    }
    return <span className="leading-snug flex-1">{renderFormattedReviewText(text)}</span>;
  };

  const renderNarrativeText = (content: string) => {
    return (
      <div className="space-y-3.5 text-neutral-700 leading-relaxed text-sm sm:text-base">
        {content.split('\n\n').map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#fafafa] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] text-neutral-900 flex flex-col justify-between selection:bg-neutral-900 selection:text-white">
      {/* Sticky Solid Black Topbar Matching Homescreen Size */}
      <header className="sticky top-0 z-40 h-14 sm:h-[60px] bg-[#0c0c0e] text-white border-b border-white/[0.08] px-3.5 sm:px-8 lg:px-12 flex items-center justify-between transition-all">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-[11px] sm:text-[13px] font-semibold text-white transition-all duration-200 cursor-pointer shrink-0 hover:-translate-x-0.5"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-blue-400" />
          <span className="hidden sm:inline">Back to Reviews</span>
          <span className="sm:hidden">Back</span>
        </button>

        <div className="flex items-center gap-2 font-mono text-[13px] sm:text-[15px] md:text-base font-bold tracking-widest uppercase text-white px-2 whitespace-nowrap shrink-0">
          <span>JJJ WATCHES</span>
        </div>

        <a
          href="https://www.instagram.com/jjj_watches/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-neutral-400 hover:text-white transition-colors shrink-0"
        >
          <Instagram className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">@jjj_watches</span>
        </a>
      </header>

      {/* Main Review Article: Proper 2-Column Layout Using Collection Subpage Spacing */}
      <main className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-10 sm:py-16 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* LEFT COLUMN: EDITORIAL REVIEW NARRATIVE */}
          <div ref={leftColRef} className="lg:col-span-7 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-blue-600 font-semibold mb-2">
                <span>Field Dispatch</span>
                <span className="text-neutral-300">&bull;</span>
                <span>Ownership Review</span>
              </div>

              <h1 className="font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','Inter',sans-serif] text-3xl sm:text-5xl lg:text-5xl font-black tracking-[-0.035em] text-neutral-950 leading-[1.08] mb-4">
                {review.model}
              </h1>

              <p className="font-serif italic text-base sm:text-xl leading-relaxed text-neutral-800 mb-6 border-l-2 border-blue-600 pl-4 py-1.5 bg-white/70 rounded-r-xl border border-neutral-200/60">
                &ldquo;{review.excerpt}&rdquo;
              </p>

              <div className="w-16 h-px bg-neutral-300 mt-6" />
            </div>

            {/* Narrative Sections */}
            <div className="space-y-6 text-neutral-800 leading-relaxed text-base font-normal">
              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-neutral-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
                <h2 className="font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','Inter',sans-serif] text-xl sm:text-2xl font-extrabold tracking-tight text-blue-600 pb-2.5 mb-4 border-b border-neutral-200/90">
                  Why I Bought It
                </h2>
                {renderNarrativeText(review.sections.whyIBoughtIt)}
              </div>

              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-neutral-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
                <h2 className="font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','Inter',sans-serif] text-xl sm:text-2xl font-extrabold tracking-tight text-blue-600 pb-2.5 mb-4 border-b border-neutral-200/90">
                  Design &amp; Build
                </h2>
                {renderNarrativeText(review.sections.designAndBuild)}
              </div>

              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-neutral-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
                <h2 className="font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','Inter',sans-serif] text-xl sm:text-2xl font-extrabold tracking-tight text-blue-600 pb-2.5 mb-4 border-b border-neutral-200/90">
                  On The Wrist
                </h2>
                {renderNarrativeText(review.sections.onTheWrist)}
              </div>

              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-neutral-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
                <h2 className="font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','Inter',sans-serif] text-xl sm:text-2xl font-extrabold tracking-tight text-blue-600 pb-2.5 mb-4 border-b border-neutral-200/90">
                  Living With It
                </h2>
                {renderNarrativeText(review.sections.livingWithIt)}
              </div>
            </div>

            {/* What I Love / What Could Be Better Grid: White Cards with Green/Red Headings & Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-neutral-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-3.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>What I Love</span>
                </h3>
                <ul className="space-y-3.5 text-xs sm:text-sm text-neutral-700">
                  {review.sections.whatILove.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-emerald-600 font-bold shrink-0 mt-0.5 text-base">&bull;</span>
                      {renderBulletItem(item)}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-neutral-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-600 mb-3.5 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>What Could Be Better</span>
                </h3>
                <ul className="space-y-3.5 text-xs sm:text-sm text-neutral-700">
                  {review.sections.whatIDont.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-rose-600 font-bold shrink-0 mt-0.5 text-base">&bull;</span>
                      {renderBulletItem(item)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Would I Buy It Again */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-neutral-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
              <h2 className="font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','Inter',sans-serif] text-xl sm:text-2xl font-extrabold tracking-tight text-blue-600 pb-2.5 mb-4 border-b border-neutral-200/90">
                Would I Buy It Again?
              </h2>
              {renderNarrativeText(review.sections.wouldIBuyItAgain)}
            </div>

            {/* The Verdict Box in Blue */}
            <div className="p-6 sm:p-8 rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-600/20">
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-blue-100 block mb-2 font-bold">
                The Final Verdict
              </span>
              <p className="font-serif italic text-base sm:text-lg text-white leading-relaxed">
                &ldquo;{review.sections.verdict}&rdquo;
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: CURATED EDITORIAL PHOTOGRAPHY & QUICK PROFILE */}
          <div className="lg:col-span-5 relative" style={{ minHeight: '100%' }}>
            <div
              ref={rightColRef}
              style={{
                top: `${stickyTop}px`,
              }}
              className="lg:sticky space-y-7"
            >
              {/* 1. Primary Photo Card */}
              <div id="review-photo-card" className="rounded-2xl bg-white border border-neutral-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.04)] p-4 sm:p-5">
                <div
                  onClick={() => setLightboxImg(resolveImg(review.coverImage))}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 border border-neutral-300 shadow-md cursor-pointer"
                >
                  <img
                    src={resolveImg(review.coverImage)}
                    alt={review.model}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-medium">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Enlarge Photo</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. Watch Profile & Technical Specifications (Placed Before Gallery) */}
              {matchingWatch && (
                <div
                  id="review-specs-card"
                  className="rounded-2xl bg-white border border-neutral-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.04)] p-5 sm:p-6 flex flex-col min-h-0"
                >
                  {/* Header: shrink-0 */}
                  <div id="review-specs-header" className="mb-3.5 pb-2.5 border-b border-neutral-100 flex items-center justify-between shrink-0">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500 font-bold block mb-0.5">
                        Collection Reference
                      </span>
                      <h3 className="font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','Inter',sans-serif] text-base sm:text-lg font-extrabold tracking-tight text-blue-600">
                        Quick Specifications
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono text-neutral-400 font-medium shrink-0">
                      {matchingWatch.verifiedDetails.length} details
                    </span>
                  </div>

                  {/* Scrollable Specifications List: flex-1 min-h-0 */}
                  <ScrollableSpecsList
                    id="review-specs-list"
                    details={matchingWatch.verifiedDetails.filter((d) => d.label !== 'Role in Collection')}
                    maxHeight={340}
                  />

                  {/* Footer: shrink-0 */}
                  <div id="review-specs-footer" className="mt-3.5 pt-3.5 border-t border-neutral-100 shrink-0">
                    <button
                      onClick={() => onOpenWatch(matchingWatch.id)}
                      className="w-full inline-flex items-center justify-between text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors py-1 group/btn cursor-pointer"
                    >
                      <span className="leading-normal">View Full Story &amp; All Specs in Collection</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1 shrink-0 ml-2" />
                    </button>
                  </div>
                </div>
              )}

              {/* 3. Wrist Moments & Context Mosaic (Photo Gallery after Specs) */}
              {editorialPhotos.length > 1 && (
                <div id="review-mosaic-card" className="rounded-2xl bg-white border border-neutral-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.04)] p-4 sm:p-5">
                  <div className="mb-3.5 px-1 pb-2 border-b border-neutral-100 flex items-center justify-between">
                    <h3 className="font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','Inter',sans-serif] text-base font-extrabold tracking-tight text-neutral-900">
                      Photographs
                    </h3>
                    <span className="text-[11px] font-mono text-neutral-500">
                      {editorialPhotos.slice(1).length} captures
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {editorialPhotos.slice(1, 5).map((photo, idx) => (
                      <div
                        key={idx}
                        onClick={() => setLightboxImg(resolveImg(photo.image))}
                        className="group relative aspect-square rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-sm cursor-pointer hover:shadow-md transition-all duration-300"
                      >
                        <img
                          src={resolveImg(photo.image)}
                          alt={`Photo ${idx + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Maximize2 className="w-4 h-4 text-white drop-shadow" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Actions: Placed directly below the 2-column grid with clean, uniform margin */}
        <div className="mt-8 pt-6 border-t border-neutral-200/80 flex flex-wrap items-center justify-between gap-4 w-full">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Reviews</span>
          </button>

          <button
            onClick={() => onOpenWatch(review.watchId)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
          >
            <span>View Watch in Collection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      {/* Full-Screen Zoom Lightbox Modal */}
      <AnimatePresence>
        {lightboxImg && (
          <div
            onClick={() => setLightboxImg(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={lightboxImg}
              alt="Enlarged view"
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl"
            />
          </div>
        )}
      </AnimatePresence>

      {/* Solid Black Footer */}
      <footer className="w-full bg-[#0c0c0e] text-white border-t border-white/[0.08] py-12 px-6 sm:px-10 lg:px-14">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs sm:text-sm font-medium text-neutral-400">
          <div className="flex items-center gap-3">
            <span className="font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','Inter',sans-serif] font-bold tracking-tight uppercase text-white text-base">
              JJJ WATCHES
            </span>
            <span className="text-neutral-600">&bull;</span>
            <span>&copy; {new Date().getFullYear()} Jeeval Jolly Jacob</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/jjj_watches/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white flex items-center gap-2 transition-colors group"
            >
              <Instagram className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
              <span>@jjj_watches</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

// =========================================================================
// MODERN HOROLOGICAL DIAL RULER SEPARATOR (MS & SEC SPLIT CHRONO TRACK)
// =========================================================================
const DialRulerSeparator: React.FC<{ label: string; index: string; id: string }> = ({ label, index, id }) => (
  <div className="w-full relative py-2 sm:py-2.5 bg-[#fafafc] border-y border-neutral-300/80 overflow-hidden select-none">
    {/* Calibration readout */}
    <div className="w-full flex items-center justify-between px-6 sm:px-12 lg:px-16 text-[9px] sm:text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-500 mb-1">
      <span className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 inline-block animate-pulse" />
        <span className="font-semibold text-neutral-800">{index}</span>
      </span>
      <span className="font-bold text-neutral-900 tracking-[0.25em]">{label}</span>
      <span className="hidden sm:inline-block font-mono text-neutral-500">1/1000s SCALE • TACHYMETER</span>
    </div>

    {/* Edge-to-edge Horological Ruler with Major / Minor / Millisecond subdivisions */}
    <div className="w-full h-4 sm:h-5 relative overflow-hidden flex items-end">
      <svg className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <pattern id={`dial-ruler-${id}`} width="100" height="20" patternUnits="userSpaceOnUse">
            {/* Solid continuous axis baseline */}
            <line x1="0" y1="20" x2="100" y2="20" stroke="#0a0a0a" strokeWidth="2" />
            {/* Major 1s second graduation tick */}
            <line x1="0" y1="3" x2="0" y2="20" stroke="#0a0a0a" strokeWidth="2" />
            {/* 100ms millisecond subdivisions */}
            <line x1="10" y1="13" x2="10" y2="20" stroke="#737373" strokeWidth="1" />
            <line x1="20" y1="13" x2="20" y2="20" stroke="#737373" strokeWidth="1" />
            <line x1="30" y1="13" x2="30" y2="20" stroke="#737373" strokeWidth="1" />
            <line x1="40" y1="13" x2="40" y2="20" stroke="#737373" strokeWidth="1" />
            {/* Half-second 500ms graduation tick */}
            <line x1="50" y1="8" x2="50" y2="20" stroke="#171717" strokeWidth="1.5" />
            {/* 100ms millisecond subdivisions */}
            <line x1="60" y1="13" x2="60" y2="20" stroke="#737373" strokeWidth="1" />
            <line x1="70" y1="13" x2="70" y2="20" stroke="#737373" strokeWidth="1" />
            <line x1="80" y1="13" x2="80" y2="20" stroke="#737373" strokeWidth="1" />
            <line x1="90" y1="13" x2="90" y2="20" stroke="#737373" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="20" fill={`url(#dial-ruler-${id})`} />
      </svg>
    </div>
  </div>
);

export const WatchesPage: React.FC = () => {
  const { navigate } = useRouter();
  console.log(import.meta.env.BASE_URL);        
  // Selected watch for the compact Moments gallery (oldest to newest purchase)
  const [activeMomentWatchId, setActiveMomentWatchId] = useState<string>('casio-ws-220');

  // Active full-page views
  const [activeWatch, setActiveWatch] = useState<WatchPiece | null>(null);
  const [activeReview, setActiveReview] = useState<WatchReview | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isArchiveExpanded, setIsArchiveExpanded] = useState(false);
  const [isReviewsExpanded, setIsReviewsExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Active section for topbar tracking (null when on hero cover)
  const [activeSection, setActiveSection] = useState<'journey' | 'main' | 'extended' | 'reviews' | 'stories' | null>(null);
  const lastSectionRef = useRef<'journey' | 'main' | 'extended' | 'reviews' | 'stories'>('main');
  const lastScrollYRef = useRef<number>(0);
  const wasInSubpageRef = useRef<boolean>(false);

  const restorePreviousPosition = () => {
    const targetSection = lastSectionRef.current;
    const scrollY = lastScrollYRef.current;

    const doScroll = () => {
      if (targetSection) {
        const el = document.getElementById(targetSection);
        if (el) {
          const yOffset = -60;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: Math.max(0, y), behavior: 'instant' });
          return;
        }
      }
      if (scrollY > 50) {
        window.scrollTo({ top: scrollY, behavior: 'instant' });
      }
    };

    doScroll();
    setTimeout(doScroll, 40);
    setTimeout(doScroll, 120);
    setTimeout(doScroll, 290);
    setTimeout(doScroll, 380);
    setTimeout(doScroll, 550);
  };

  useEffect(() => {
    if (!activeWatch && !activeReview && wasInSubpageRef.current) {
      wasInSubpageRef.current = false;
      restorePreviousPosition();
    }
  }, [activeWatch, activeReview]);

  // Synchronize URL hash with dedicated full-page watch and review views
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#watch-')) {
        const id = hash.replace('#watch-', '');
        const found = watchesData.find((w) => w.id === id);
        if (found) {
          wasInSubpageRef.current = true;
          setActiveReview(null);
          setActiveWatch(found);
          window.scrollTo({ top: 0, behavior: 'instant' });
          return;
        }
      } else if (hash.startsWith('#review-')) {
        const id = hash.replace('#review-', '');
        const found = reviewsData.find((r) => r.id === id);
        if (found) {
          wasInSubpageRef.current = true;
          setActiveWatch(null);
          setActiveReview(found);
          window.scrollTo({ top: 0, behavior: 'instant' });
          return;
        }
      }

      const shouldRestore = wasInSubpageRef.current;
      wasInSubpageRef.current = false;
      setActiveWatch(null);
      setActiveReview(null);

      if (shouldRestore) {
        restorePreviousPosition();
      }
    };

    window.addEventListener('popstate', handlePopState);
    handlePopState();
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (!activeWatch && !activeReview) {
      document.title = 'JJJ Watches: Different watches, different moments. One collection.';
    }

    const sectionIds: Array<'journey' | 'main' | 'extended' | 'reviews' | 'stories'> = [
      'journey',
      'main',
      'extended',
      'reviews',
      'stories',
    ];

    const handleScroll = () => {
      const journeyEl = document.getElementById('journey');
      const scrollPosition = window.scrollY + 200;

      // Don't highlight any section when user is on the opening hero screen
      if (journeyEl && scrollPosition < journeyEl.offsetTop) {
        setActiveSection(null);
        return;
      }

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            lastSectionRef.current = id;
            return;
          }
        }
      }
      setActiveSection(null);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeWatch, activeReview]);

  // Handle ESC key to return to collection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxIndex !== null) {
          setLightboxIndex(null);
        } else if (activeWatch || activeReview) {
          handleBackToMain();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeWatch, activeReview, lightboxIndex]);

  const scrollToSection = (id: 'journey' | 'main' | 'extended' | 'reviews' | 'stories') => {
    setActiveSection(id);
    lastSectionRef.current = id;
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -60;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const openWatchPage = (watch: WatchPiece) => {
    lastScrollYRef.current = window.pageYOffset;
    const isArchived =
      watch.collectionStatus === 'Archived' || secondaryWatchesData.some((w) => w.id === watch.id);
    lastSectionRef.current = isArchived ? 'extended' : 'main';
    wasInSubpageRef.current = true;
    window.history.pushState({ type: 'watch', id: watch.id }, '', `#watch-${watch.id}`);
    setActiveReview(null);
    setActiveWatch(watch);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const openReviewPage = (review: WatchReview) => {
    lastScrollYRef.current = window.pageYOffset;
    lastSectionRef.current = 'reviews';
    wasInSubpageRef.current = true;
    window.history.pushState({ type: 'review', id: review.id }, '', `#review-${review.id}`);
    setActiveWatch(null);
    setActiveReview(review);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackToMain = () => {
    wasInSubpageRef.current = true;
    setActiveWatch(null);
    setActiveReview(null);
    if (window.location.hash.startsWith('#watch-') || window.location.hash.startsWith('#review-')) {
      window.history.back();
    }
    restorePreviousPosition();
  };

  const openWatchById = (watchId: string) => {
    const found = watchesData.find((w) => w.id === watchId);
    if (found) {
      openWatchPage(found);
    }
  };

  const openReviewById = (reviewId: string) => {
    const found = reviewsData.find((r) => r.id === reviewId);
    if (found) {
      openReviewPage(found);
    }
  };

  // Filter and order Moments strictly to the 6 Main Collection watches from oldest to newest purchase
  const mainCollectionWatchIds = [
    'casio-ws-220',           // June 2014 (Genesis first watch)
    'g-shock-gw-b5600hr',     // 2021
    'fossil-hybrid-fb01',     // 2022
    'titan-octane-diver',     // 2023–2024
    'hmt-janata-1983',        // 2025
    'timex-waterbury-chrono', // 2026
  ];

  const shortModelNames: Record<string, string> = {
    'casio-ws-220': 'WS-220',
    'g-shock-gw-b5600hr': 'GW-B5600',
    'fossil-hybrid-fb01': 'FB-01 Hybrid',
    'titan-octane-diver': 'Octane Hyperlume',
    'hmt-janata-1983': 'Janata',
    'timex-waterbury-chrono': 'Waterbury Flyback',
    'timex-waterbury-flyback': 'Waterbury Flyback',
  };

  const mainMomentsGroups = mainCollectionWatchIds
    .map((id) => watchMomentsData.find((g) => g.watchId === id))
    .filter((g): g is (typeof watchMomentsData)[number] => Boolean(g));

  const selectedMomentGroup =
    mainMomentsGroups.find((g) => g.watchId === activeMomentWatchId) || mainMomentsGroups[0];

  // Lightbox keyboard navigation (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (lightboxIndex === null || !selectedMomentGroup) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev - 1 + selectedMomentGroup.photos.length) % selectedMomentGroup.photos.length
        );
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % selectedMomentGroup.photos.length
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, selectedMomentGroup]);

  return (
    <AnimatePresence mode="wait">
      {activeWatch ? (
        <motion.div
          key={`watch-${activeWatch.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: 'easeInOut' }}
        >
          <WatchDetailPage
            watch={activeWatch}
            onBack={handleBackToMain}
            onOpenReview={(reviewId) => openReviewById(reviewId)}
          />
        </motion.div>
      ) : activeReview ? (
        <motion.div
          key={`review-${activeReview.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: 'easeInOut' }}
        >
          <ReviewDetailPage
            review={activeReview}
            onBack={handleBackToMain}
            onOpenWatch={(watchId) => openWatchById(watchId)}
          />
        </motion.div>
      ) : (
        <motion.div
          key="main-watches-page"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: 'easeInOut' }}
          className="min-h-screen w-full bg-white text-[#111111] font-[-apple-system,BlinkMacSystemFont,'Inter',sans-serif] selection:bg-[#111111] selection:text-white"
        >
      {/* ========================================================================= */}
      {/* 1. TOPBAR: COMPACT SOLID BLACK HEADER */}
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* 1. TOPBAR: COMPACT SOLID BLACK HEADER WITH CENTERED LOGO ON MOBILE & SANDWICH ICON */}
      {/* ========================================================================= */}
      <header className="fixed top-0 left-0 right-0 z-50 h-14 sm:h-[60px] bg-[#0c0c0e] px-4 sm:px-8 lg:px-12 flex items-center justify-between border-b border-white/[0.08] shadow-sm">
        {/* Left balance spacer on mobile & tablet */}
        <div className="w-9 lg:hidden" />

        {/* Brand: Centered on mobile & tablet (< lg), Left on desktop */}
        <div className="flex-1 lg:flex-initial flex justify-center lg:justify-start">
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 text-left cursor-pointer group"
          >
            <span className="font-mono text-[13px] sm:text-[15px] md:text-base font-bold tracking-widest uppercase text-white group-hover:text-neutral-300 transition-colors whitespace-nowrap">
              JJJ WATCHES
            </span>
          </button>
        </div>

        {/* Desktop Nav Links (Visible only on wide screens lg:) */}
        <nav className="hidden lg:flex items-center gap-1.5 sm:gap-3 py-0.5">
          {[
            { id: 'journey', label: 'Journey' },
            { id: 'main', label: 'Collection' },
            { id: 'extended', label: 'Archive' },
            { id: 'reviews', label: 'Reviews' },
            { id: 'stories', label: 'Moments' },
          ].map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id as any)}
                className={`px-2 sm:px-3 py-1 font-mono text-xs sm:text-sm font-bold tracking-widest uppercase transition-colors duration-700 ease-in-out cursor-pointer ${
                  isActive
                    ? 'text-blue-500'
                    : 'text-neutral-400 hover:text-blue-400'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Sandwich Icon Button (Visible on all screens below lg) */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="p-1.5 text-white hover:text-neutral-300 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-neutral-200" />
            ) : (
              <Menu className="w-5 h-5 text-neutral-200" />
            )}
          </button>
        </div>
      </header>

      {/* Sandwich Menu Dropdown with clean white background, black text, and text-only blue active highlight */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="fixed top-14 sm:top-[60px] left-0 right-0 bg-white/98 backdrop-blur-2xl border-b border-neutral-200/90 z-40 pt-5 pb-6 px-5 flex flex-col gap-2.5 shadow-[0_20px_40px_rgba(0,0,0,0.15)] lg:hidden"
          >
            {[
              { id: 'journey', label: 'Journey' },
              { id: 'main', label: 'Collection' },
              { id: 'extended', label: 'Archive' },
              { id: 'reviews', label: 'Reviews' },
              { id: 'stories', label: 'Moments' },
            ].map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id as any);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full py-2 px-2 text-left font-mono text-xs sm:text-sm tracking-widest uppercase transition-colors cursor-pointer bg-transparent ${
                    isActive
                      ? 'text-blue-600 font-black'
                      : 'text-neutral-950 font-bold hover:text-blue-600'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <a
              href="https://www.instagram.com/jjj_watches/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-2.5 px-2 text-xs font-mono font-bold tracking-widest uppercase text-neutral-950 hover:text-blue-600 border-t border-neutral-200/90 mt-2"
            >
              <span>@jjj_watches</span>
              <Instagram className="w-4 h-4 text-neutral-950" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 2. HERO: FULL-VIEWPORT COVER PHOTO WITH FADED LIGHT OPACITY ON MOBILE */}
      {/* ========================================================================= */}
      <section
        id="hero-section"
        className="relative w-full min-h-screen bg-white text-[#111111] overflow-hidden flex flex-col justify-between pt-14 sm:pt-[60px]"
      >
        {/* Background Image: Faded in opacity on mobile and tablet so it shows light whenever topbar is in sandwich mode */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <img
            src={`${import.meta.env.BASE_URL}cover.jpeg`}
            alt="JJJ Watches Collection"
            className="w-full h-full object-cover object-center lg:object-[74%_center] xl:object-[78%_center] opacity-35 lg:opacity-100 transition-opacity duration-500 pointer-events-none select-none"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = `${import.meta.env.BASE_URL}beyondcode/watches/cover.jpeg`;
            }}
          />
          {/* Subtle light gradient on mobile and tablet for crisp readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-white lg:from-transparent lg:via-transparent lg:to-transparent pointer-events-none" />
        </div>

        {/* Clean Banner Text: Centered on mobile & tablet, Left-Shifted on desktop (lg:) */}
        <div className="relative z-10 w-full px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 my-auto py-10">
          <div className="max-w-md sm:max-w-xl lg:max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className={`font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','Inter',sans-serif] ${HERO_TITLE_SIZE} font-black tracking-[-0.04em] text-neutral-950 leading-[1.04]`}
            >
              <span className="block text-neutral-950">Different watches.</span>
              <span className="block text-neutral-950">Different moments.</span>
              <span className="block text-blue-600 font-extrabold tracking-[-0.035em] mt-1 sm:mt-1.5">
                One collection.
              </span>
            </motion.h1>

            {/* Quote block */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="mt-6 max-w-lg mx-auto lg:mx-0"
            >
              <p className="text-base sm:text-lg md:text-xl font-normal text-neutral-700 leading-relaxed font-[-apple-system,BlinkMacSystemFont,'Inter',sans-serif] italic">
                A growing watch collection curated by Jeeval Jolly Jacob.<br />
                A student's exploration of time and design.<br />
                Every watch, a story. Every story, timeless.
              </p>
            </motion.div>

            {/* 3 Buttons: Stacked on mobile, wrapped row on tablet & desktop */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5 max-w-xs sm:max-w-none mx-auto lg:mx-0"
            >
              <button
                onClick={() => scrollToSection('journey')}
                className="w-full sm:w-auto justify-center px-6 py-3.5 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold tracking-tight shadow-md hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-2 group"
              >
                <span>The Journey</span>
                <span className="group-hover:translate-y-0.5 transition-transform duration-300 ease-out">&darr;</span>
              </button>
              <button
                onClick={() => scrollToSection('main')}
                className="w-full sm:w-auto text-center px-5 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold tracking-tight shadow-md hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                Browse Collection
              </button>

              <a
                href="https://www.instagram.com/jjj_watches/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto justify-center group flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-white hover:bg-neutral-50 border border-neutral-300/80 text-neutral-950 text-xs sm:text-sm font-semibold tracking-tight shadow-sm hover:shadow-md transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                title="@jjj_watches on Instagram"
              >
                <span className="flex items-center justify-center w-4 h-4 p-0.5 transition-transform duration-300 group-hover:scale-110">
                  <svg
                    className="w-4 h-4 text-neutral-900"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </span>
                <span className="bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] bg-clip-text text-transparent font-bold">
                  Find on Instagram
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900 transition-colors duration-300" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Scroll Prompt */}
        <div
          onClick={() => scrollToSection('journey')}
          className="relative z-10 w-full pb-6 flex flex-col items-center justify-center cursor-pointer select-none text-neutral-400 hover:text-blue-600 transition-colors"
        >
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase">Scroll</span>
          <span className="text-xs mt-0.5">&darr;</span>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. MAIN GALLERY CONTAINER (DOTTED BACKGROUND MATCHING SUBPAGE) */}
      {/* ========================================================================= */}
      <div
        className="w-full bg-[#fafafa] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] border-t border-neutral-200/80 overflow-x-clip"
      >
        <main className="w-full">

          {/* ========================================================================= */}
          {/* SECTION 1: THE JOURNEY & WHY I COLLECT */}
          {/* ========================================================================= */}
          <section
            id="journey"
            className="w-full py-8 sm:py-10 scroll-mt-14 sm:scroll-mt-16"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:pl-32 lg:pr-14">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                {/* Left: Journey Narrative & Why I Do It */}
                <div className="lg:col-span-7">
                  <div className="relative mb-6 flex items-start justify-between lg:block">
                    <div className="flex-1 pr-3 lg:pr-0">
                      <h2 className="font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','Inter',sans-serif] text-3xl sm:text-4xl md:text-5xl font-black tracking-[-0.03em] text-neutral-950 mb-2 leading-tight">
                        Why I Collect
                      </h2>
                      <p className="text-lg sm:text-xl text-blue-600 font-handwriting tracking-wide font-semibold mt-1">
                        The curiosity, design, and personal stories behind a growing watch collection.
                      </p>
                    </div>
                    <span
                      aria-hidden="true"
                      className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-black text-neutral-400/35 select-none leading-none pointer-events-none whitespace-nowrap shrink-0 lg:absolute lg:right-full lg:top-0 lg:mr-5 lg:-translate-y-2"
                    >
                      I
                    </span>
                  </div>

                  <div className="space-y-4 text-neutral-700 font-[-apple-system,BlinkMacSystemFont,'Inter',sans-serif] text-base sm:text-lg leading-relaxed">
  <p>
    I've always found watches fascinating. Not necessarily because of their
    price or the name on the dial, but because of how much variety exists
    in something designed to do one simple thing: tell the time.
  </p>

  <p>
    Some watches interest me because of their engineering. Others because
    of their design, history, or the technology they manage to fit onto a
    wrist. And sometimes, a watch matters simply because of when it came
    into my life.
  </p>

  <p>
    As someone who spends much of his time working with software and
    technology, I find it interesting how watchmaking brings together
    so many different approaches to solving the same problem. From
    traditional mechanical movements to solar-powered digitals and
    connected hybrids, there's always something new to appreciate.
  </p>

  <p>
  I don't collect with a particular number or an end goal in mind.
  I prefer each watch to bring something different to the collection,
  whether that's a new experience, a useful function, an interesting
  design, a personal memory, or simply a piece that complements my
  style and the outfits I wear.
</p>

  <p>
    This collection has grown alongside me, from my school days through
    college and beyond. Some pieces mark important chapters, while
    others simply reflect what caught my interest along the way.
  </p>

  <p>
    And it's still growing. Not because there's a space that needs
    filling, but because there's always something left to discover.
  </p>
</div>
</div>

                {/* Right: Two 16:9 Uncropped Horizontal Photos */}
                <div className="lg:col-span-5 flex flex-col gap-6 justify-center">
                  {/* Photo 1: casiows220.jpg */}
                  <div className="flex flex-col">
                    <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.12)] hover:shadow-[0_24px_48px_rgba(0,0,0,0.22)] hover:-translate-y-1.5 transition-all duration-300 border border-neutral-300 group bg-neutral-100">
                      <img
                        src={`${import.meta.env.BASE_URL}beyondcode/watches/casiows220.jpg`}
                        alt="First watch - Casio WS-220, June 2014"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = `${import.meta.env.BASE_URL}casiows220.jpg`;
                        }}
                      />
                    </div>
                    <p className="mt-2 text-xs sm:text-[13px] text-neutral-900 font-mono tracking-tight text-center font-medium">
                      First watch - Casio WS-220, June 2014
                    </p>
                  </div>

                  {/* Photo 2: sotc.jpeg */}
                  <div className="flex flex-col">
                    <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.12)] hover:shadow-[0_24px_48px_rgba(0,0,0,0.22)] hover:-translate-y-1.5 transition-all duration-300 border border-neutral-300 group bg-neutral-100">
                      <img
                        src={`${import.meta.env.BASE_URL}beyondcode/watches/sotc.jpeg`}
                        alt="State of the Collection, October 2026"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = `${import.meta.env.BASE_URL}sotc.jpeg`;
                        }}
                      />
                    </div>
                    <p className="mt-2 text-xs sm:text-[13px] text-neutral-900 font-mono tracking-tight text-center font-medium">
                      State of the Collection, October 2026
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* HOROLOGICAL DIAL RULER SEPARATOR */}
          <DialRulerSeparator id="sep-1-2" label="CHRONO TRACK • 1/1000 SEC" index="CALIBRATION 01 / 02" />

          {/* ========================================================================= */}
          {/* SECTION 2: THE MAIN COLLECTION */}
          {/* ========================================================================= */}
          <section
            id="main"
            className="w-full py-8 sm:py-10 scroll-mt-14 sm:scroll-mt-16"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:pl-32 lg:pr-14">
              {/* Section Header */}
              <div className="relative max-w-2xl mb-8 sm:mb-10 flex items-start justify-between lg:block">
                <div className="flex-1 pr-3 lg:pr-0">
                  <h2 className="font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','Inter',sans-serif] text-3xl sm:text-4xl md:text-5xl font-black tracking-[-0.03em] text-neutral-950">
                    The Collection
                  </h2>
                  <p className="text-lg sm:text-xl text-blue-600 font-handwriting tracking-wide font-semibold mt-1">
                    Watches in regular rotation, each chosen for its character, purpose, or story.
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-black text-neutral-400/35 select-none leading-none pointer-events-none whitespace-nowrap shrink-0 lg:absolute lg:right-full lg:top-0 lg:mr-5 lg:-translate-y-2"
                >
                  II
                </span>
              </div>

              {/* Responsive Watch Grid: 2 Cards per Row on Mobile, 3 on Desktop */}
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
                {mainWatchesData.map((watch) => {
                  const movement =
                    watch.verifiedDetails.find((d) => d.label === 'Movement')?.value.split('(')[0] || 'Precision';

                  return (
                    <article
                      key={watch.id}
                      onClick={() => openWatchPage(watch)}
                      className="group rounded-2xl overflow-hidden bg-gradient-to-br from-white/90 via-neutral-100/80 to-neutral-200/60 backdrop-blur-xl border border-white/90 hover:border-white shadow-[0_14px_35px_rgba(0,0,0,0.12)] hover:shadow-[0_24px_48px_rgba(0,0,0,0.18)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        {/* Natural Aspect Photo Frame with frosted border */}
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-white/80 backdrop-blur-md border-b border-neutral-200/80 flex items-center justify-center p-2 sm:p-3">
                          <img
                            src={resolveImg(watch.thumbnailImage || watch.heroImage)}
                            alt={`${watch.brand} ${watch.model}`}
                            className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                              watch.thumbnailImage || watch.heroImage.includes('thumbnail') || watch.heroImage.endsWith('.png') || watch.heroImage.endsWith('.webp')
                                ? 'object-contain'
                                : 'object-cover'
                            }`}
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src = resolveImg(watch.heroImage);
                            }}
                          />
                        </div>

                        {/* Content */}
                        <div className="p-3 sm:p-6">
                          <div className="flex items-center justify-between mb-1 sm:mb-1.5">
                            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.16em] text-neutral-600 font-semibold truncate">
                              {watch.brand}
                            </span>
                            <span className="hidden sm:inline text-[11px] text-neutral-600 font-medium">
                              {watch.category}
                            </span>
                          </div>

                          <h3 className="font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','Inter',sans-serif] text-sm sm:text-2xl font-bold tracking-tight text-neutral-950 mb-1.5 sm:mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1 sm:line-clamp-none">
                            {watch.model === 'The Waterbury Flyback Chronograph' ? 'Waterbury Flyback' : watch.model}
                          </h3>

                          <p className="hidden sm:block text-xs sm:text-[13px] text-neutral-700 leading-relaxed line-clamp-3 mb-4">
                            {watch.shortDescription}
                          </p>

                          {/* Signature Features - Hidden on mobile for clean 2-card row */}
                          <div className="hidden sm:block text-[11px] font-mono text-neutral-800 py-2 px-3 rounded-lg bg-white/80 backdrop-blur-md border border-neutral-200/80">
                            <span className="text-neutral-900 font-semibold">
                              {watch.signatureFeatures || movement.trim()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Clean Footer Link */}
                      <div className="px-3 sm:px-6 pb-3 sm:pb-5 pt-0 flex items-center justify-between text-[11px] sm:text-xs font-medium">
                        <span className="flex items-center gap-1 sm:gap-1.5 text-blue-600 font-semibold group-hover:underline underline-offset-4">
                          <span>View details</span>
                          <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:translate-x-0.5 text-blue-600" />
                        </span>

                        {watch.reviewId && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openReviewById(watch.reviewId!);
                            }}
                            className="hidden sm:inline text-blue-600 hover:text-blue-700 text-[11px] font-medium transition-colors cursor-pointer"
                          >
                            Read review &rarr;
                          </button>
                        )}
                      </div>
                    </article>
                  );
            })}
          </div>
        </div>
      </section>

      {/* HOROLOGICAL DIAL RULER SEPARATOR */}
      <DialRulerSeparator id="sep-2-3" label="TACHYMETER SCALE • INTERVALS" index="CALIBRATION 02 / 03" />

      {/* ========================================================================= */}
      {/* SECTION 3: THE ARCHIVE (SECONDARY PIECES) */}
      {/* ========================================================================= */}
      <section
        id="extended"
        className="w-full py-8 sm:py-10 scroll-mt-14 sm:scroll-mt-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:pl-32 lg:pr-14">
          <div className="relative max-w-2xl mb-8 sm:mb-10 flex items-start justify-between lg:block">
            <div className="flex-1 pr-3 lg:pr-0">
              <h2 className="font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','Inter',sans-serif] text-3xl sm:text-4xl md:text-5xl font-black tracking-[-0.03em] text-neutral-950">
                The Archive
              </h2>
              <p className="text-lg sm:text-xl text-blue-600 font-handwriting tracking-wide font-semibold mt-1">
                Watches I've owned or worn over the years, beyond my main collection.
              </p>
            </div>
            <span
              aria-hidden="true"
              className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-black text-neutral-400/35 select-none leading-none pointer-events-none whitespace-nowrap shrink-0 lg:absolute lg:right-full lg:top-0 lg:mr-5 lg:-translate-y-2"
            >
              III
            </span>
          </div>

          {/* Initial 3 Archive Watches: 2 Cards per Row on Mobile */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
            {secondaryWatchesData.slice(0, 3).map((watch) => (
              <article
                key={watch.id}
                onClick={() => openWatchPage(watch)}
                className="group rounded-2xl overflow-hidden bg-gradient-to-br from-white/90 via-neutral-100/80 to-neutral-200/60 backdrop-blur-xl border border-white/90 hover:border-white shadow-[0_14px_35px_rgba(0,0,0,0.12)] hover:shadow-[0_24px_48px_rgba(0,0,0,0.18)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Natural Aspect Photo Frame with frosted border */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-white/80 backdrop-blur-md border-b border-neutral-200/80 flex items-center justify-center p-2 sm:p-3">
                    <img
                      src={resolveImg(watch.heroImage)}
                      alt={watch.model}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        if (watch.heroImage.includes('1000284820')) {
                          target.src = `${import.meta.env.BASE_URL}beyondcode/watches/1000284820.jpeg`;
                        }
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-3 sm:p-6">
                    <div className="flex items-center justify-between mb-1 sm:mb-1.5">
                      <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.16em] text-neutral-600 font-semibold truncate">
                        {watch.brand}
                      </span>
                      <span className="hidden sm:inline text-[11px] text-neutral-600 font-medium">
                        {watch.category}
                      </span>
                    </div>

                    <h3 className="font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','Inter',sans-serif] text-sm sm:text-2xl font-bold tracking-tight text-neutral-950 mb-1.5 sm:mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1 sm:line-clamp-none">
                      {watch.model}
                    </h3>

                    <p className="hidden sm:block text-xs sm:text-[13px] text-neutral-700 leading-relaxed line-clamp-3 mb-4">
                      {watch.shortDescription}
                    </p>

                    {/* Distinctive Feature pill - Hidden on mobile */}
                    {watch.archiveInfo?.distinctiveFeature && (
                      <div className="hidden sm:block text-[11px] font-mono text-neutral-800 py-2 px-3 rounded-lg bg-white/80 backdrop-blur-md border border-neutral-200/80">
                        <span className="text-neutral-900 font-semibold">
                          {watch.archiveInfo.distinctiveFeature}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Clean Footer Link */}
                <div className="px-3 sm:px-6 pb-3 sm:pb-5 pt-0 flex items-center justify-between text-[11px] sm:text-xs font-medium">
                  <span className="flex items-center gap-1 sm:gap-1.5 text-blue-600 font-semibold group-hover:underline underline-offset-4">
                    <span>View piece</span>
                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:translate-x-0.5 text-blue-600" />
                  </span>
                  <span className="hidden sm:inline text-[11px] font-mono text-neutral-500 group-hover:text-blue-600 transition-colors">
                    <span>Archive Specs &rarr;</span>
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Additional Archive Watches with Smooth Expand/Collapse Animation */}
          <AnimatePresence initial={false}>
            {isArchiveExpanded && secondaryWatchesData.length > 3 && (
              <motion.div
                key="archive-expanded-container"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8 pt-6 sm:pt-8">
                  {secondaryWatchesData.slice(3).map((watch, index) => (
                    <motion.div
                      key={watch.id}
                      initial={{ opacity: 0, y: 24, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 16, scale: 0.98 }}
                      transition={{ duration: 0.38, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full flex flex-col"
                    >
                      <article
                        onClick={() => openWatchPage(watch)}
                        className="group rounded-2xl overflow-hidden bg-gradient-to-br from-white/90 via-neutral-100/80 to-neutral-200/60 backdrop-blur-xl border border-white/90 hover:border-white shadow-[0_14px_35px_rgba(0,0,0,0.12)] hover:shadow-[0_24px_48px_rgba(0,0,0,0.18)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between h-full"
                      >
                        <div>
                          {/* Natural Aspect Photo Frame with frosted border */}
                          <div className="relative aspect-[4/3] w-full overflow-hidden bg-white/80 backdrop-blur-md border-b border-neutral-200/80 flex items-center justify-center p-2 sm:p-3">
                            <img
                              src={resolveImg(watch.heroImage)}
                              alt={watch.model}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                if (watch.heroImage.includes('1000284820')) {
                                  target.src = `${import.meta.env.BASE_URL}beyondcode/watches/1000284820.jpeg`;
                                }
                              }}
                            />
                          </div>

                          {/* Content */}
                          <div className="p-3 sm:p-6">
                            <div className="flex items-center justify-between mb-1 sm:mb-1.5">
                              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.16em] text-neutral-600 font-semibold truncate">
                                {watch.brand}
                              </span>
                              <span className="hidden sm:inline text-[11px] text-neutral-600 font-medium">
                                {watch.category}
                              </span>
                            </div>

                            <h3 className="font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','Inter',sans-serif] text-sm sm:text-2xl font-bold tracking-tight text-neutral-950 mb-1.5 sm:mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1 sm:line-clamp-none">
                              {watch.model}
                            </h3>

                            <p className="hidden sm:block text-xs sm:text-[13px] text-neutral-700 leading-relaxed line-clamp-3 mb-4">
                              {watch.shortDescription}
                            </p>

                            {/* Distinctive Feature pill - Hidden on mobile */}
                            {watch.archiveInfo?.distinctiveFeature && (
                              <div className="hidden sm:block text-[11px] font-mono text-neutral-800 py-2 px-3 rounded-lg bg-white/80 backdrop-blur-md border border-neutral-200/80">
                                <span className="text-neutral-900 font-semibold">
                                  {watch.archiveInfo.distinctiveFeature}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Clean Footer Link */}
                        <div className="px-3 sm:px-6 pb-3 sm:pb-5 pt-0 flex items-center justify-between text-[11px] sm:text-xs font-medium">
                          <span className="flex items-center gap-1 sm:gap-1.5 text-blue-600 font-semibold group-hover:underline underline-offset-4">
                            <span>View piece</span>
                            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:translate-x-0.5 text-blue-600" />
                          </span>
                          <span className="hidden sm:inline text-[11px] font-mono text-neutral-500 group-hover:text-blue-600 transition-colors">
                            <span>Archive Specs &rarr;</span>
                          </span>
                        </div>
                      </article>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expand / Collapse Button for The Archive with Smooth Text & Chevron Animations */}
          {secondaryWatchesData.length > 3 && (
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => {
                  if (isArchiveExpanded) {
                    const el = document.getElementById('extended');
                    if (el) {
                      const rect = el.getBoundingClientRect();
                      if (rect.top < -80) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }
                  }
                  setIsArchiveExpanded(!isArchiveExpanded);
                }}
                className="group inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 rounded-full bg-white hover:bg-neutral-50 border border-neutral-200/90 shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.12)] text-xs sm:text-sm font-semibold text-neutral-800 transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
              >
                <div className="relative overflow-hidden flex items-center justify-center min-w-[130px]">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={isArchiveExpanded ? 'less' : 'more'}
                      initial={{ opacity: 0, y: isArchiveExpanded ? -8 : 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: isArchiveExpanded ? 8 : -8 }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                      className="whitespace-nowrap"
                    >
                      {isArchiveExpanded ? 'Show Less' : 'View Entire Archive'}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <motion.div
                  animate={{ rotate: isArchiveExpanded ? 180 : 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="text-neutral-400 group-hover:text-blue-600 transition-colors duration-200 flex items-center justify-center shrink-0"
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* HOROLOGICAL DIAL RULER SEPARATOR */}
      <DialRulerSeparator id="sep-3-4" label="CALIBRE INDEX • 60 SEC DURATION" index="CALIBRATION 03 / 04" />

      {/* ========================================================================= */}
      {/* SECTION 4: REVIEWS */}
      {/* ========================================================================= */}
      <section
        id="reviews"
        className="w-full py-8 sm:py-10 scroll-mt-14 sm:scroll-mt-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:pl-32 lg:pr-14">
          <div className="relative max-w-2xl mb-8 sm:mb-10 flex items-start justify-between lg:block">
            <div className="flex-1 pr-3 lg:pr-0">
              <h2 className="font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','Inter',sans-serif] text-3xl sm:text-4xl md:text-5xl font-black tracking-[-0.03em] text-neutral-950">
                Reviews
              </h2>
              <p className="text-lg sm:text-xl text-blue-600 font-handwriting tracking-wide font-semibold mt-1">
                Detailed ownership impressions after long term daily wrist wear.
              </p>
            </div>
            <span
              aria-hidden="true"
              className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-black text-neutral-400/35 select-none leading-none pointer-events-none whitespace-nowrap shrink-0 lg:absolute lg:right-full lg:top-0 lg:mr-5 lg:-translate-y-2"
            >
              IV
            </span>
          </div>

          {/* Initial 4 Broadsheet Watch Review Cards: 2 Cards per Row on Mobile */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-6">
            {reviewsData.slice(0, 4).map((review) => (
              <article
                key={review.id}
                onClick={() => openReviewPage(review)}
                className="group rounded-none bg-white border border-neutral-300 hover:border-black shadow-[0_12px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_22px_45px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col sm:flex-row items-stretch sm:h-[260px] border-t-2 border-t-black"
              >
                {/* Photo container taking prominent card space */}
                <div className="relative w-full sm:w-7/12 aspect-[4/3] sm:aspect-auto sm:h-full shrink-0 overflow-hidden bg-neutral-100 border-b sm:border-b-0 sm:border-r border-neutral-300 rounded-none">
                  <img
                    src={resolveImg(review.coverImage)}
                    alt={review.model}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      if (review.coverImage.startsWith('/beyondcode/watches/')) {
                        target.src = `${import.meta.env.BASE_URL}${review.coverImage.replace('/beyondcode/watches/', '')}`;
                      }
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-3 sm:p-5 flex flex-col justify-between flex-1 min-w-0 bg-white">
                  <div>
                    <h3 className="font-serif text-xs sm:text-xl font-bold tracking-tight text-neutral-950 mb-1 sm:mb-2.5 leading-tight sm:leading-snug group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                      {review.id === 'review-hybrid-fb01' || review.watchId === 'fossil-hybrid-fb01' ? (
                        <span className="block">
                          <span className="block">Fossil Hybrid</span>
                          <span className="block">FB-01</span>
                        </span>
                      ) : review.id === 'review-timex-waterbury' ? (
                        'Timex Waterbury Flyback'
                      ) : (
                        review.model
                      )}
                    </h3>

                    <p className="hidden sm:block text-xs sm:text-[13px] font-serif italic text-neutral-800 leading-relaxed border-l-2 border-black pl-2.5 py-1 line-clamp-4 bg-neutral-50/70">
                      &ldquo;{review.excerpt}&rdquo;
                    </p>
                  </div>

                  <div className="pt-2 border-t border-neutral-200 flex items-center justify-end text-[11px] sm:text-xs font-semibold text-neutral-950 mt-1">
                    <span className="group-hover:underline underline-offset-4 flex items-center gap-1 sm:gap-1.5 font-bold text-blue-600">
                      <span>Read review</span>
                      <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:translate-x-1 text-blue-600" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Additional Reviews with Smooth Expand/Collapse Animation */}
          <AnimatePresence initial={false}>
            {isReviewsExpanded && reviewsData.length > 4 && (
              <motion.div
                key="reviews-expanded-container"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-6 pt-4 sm:pt-6">
                  {reviewsData.slice(4).map((review, index) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 24, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 16, scale: 0.98 }}
                      transition={{ duration: 0.38, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full flex flex-col"
                    >
                      <article
                        onClick={() => openReviewPage(review)}
                        className="group rounded-none bg-white border border-neutral-300 hover:border-black shadow-[0_12px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_22px_45px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col sm:flex-row items-stretch sm:h-[260px] border-t-2 border-t-black h-full"
                      >
                        {/* Photo container taking prominent card space */}
                        <div className="relative w-full sm:w-7/12 aspect-[4/3] sm:aspect-auto sm:h-full shrink-0 overflow-hidden bg-neutral-100 border-b sm:border-b-0 sm:border-r border-neutral-300 rounded-none">
                          <img
                            src={resolveImg(review.coverImage)}
                            alt={review.model}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              if (review.coverImage.startsWith('/beyondcode/watches/')) {
                                target.src = `${import.meta.env.BASE_URL}${review.coverImage.replace('/beyondcode/watches/', '')}`;
                              }
                            }}
                          />
                        </div>

                        {/* Content */}
                        <div className="p-3 sm:p-5 flex flex-col justify-between flex-1 min-w-0 bg-white">
                          <div>
                            <h3 className="font-serif text-xs sm:text-xl font-bold tracking-tight text-neutral-950 mb-1 sm:mb-2.5 leading-tight sm:leading-snug group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                              {review.id === 'review-hybrid-fb01' || review.watchId === 'fossil-hybrid-fb01' ? (
                                <span className="block">
                                  <span className="block">Fossil Hybrid</span>
                                  <span className="block">FB-01</span>
                                </span>
                              ) : review.id === 'review-timex-waterbury' ? (
                                'Timex Waterbury Flyback'
                              ) : (
                                review.model
                              )}
                            </h3>

                            <p className="hidden sm:block text-xs sm:text-[13px] font-serif italic text-neutral-800 leading-relaxed border-l-2 border-black pl-2.5 py-1 line-clamp-4 bg-neutral-50/70">
                              &ldquo;{review.excerpt}&rdquo;
                            </p>
                          </div>

                          <div className="pt-2 border-t border-neutral-200 flex items-center justify-end text-[11px] sm:text-xs font-semibold text-neutral-950 mt-1">
                            <span className="group-hover:underline underline-offset-4 flex items-center gap-1 sm:gap-1.5 font-bold text-blue-600">
                              <span>Read review</span>
                              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:translate-x-1 text-blue-600" />
                            </span>
                          </div>
                        </div>
                      </article>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expand / Collapse Button for Reviews */}
          {reviewsData.length > 4 && (
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => {
                  if (isReviewsExpanded) {
                    const el = document.getElementById('reviews');
                    if (el) {
                      const rect = el.getBoundingClientRect();
                      if (rect.top < -80) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }
                  }
                  setIsReviewsExpanded(!isReviewsExpanded);
                }}
                className="group inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 rounded-full bg-white hover:bg-neutral-50 border border-neutral-200/90 shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.12)] text-xs sm:text-sm font-semibold text-neutral-800 transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
              >
                <div className="relative overflow-hidden flex items-center justify-center min-w-[130px]">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={isReviewsExpanded ? 'less' : 'more'}
                      initial={{ opacity: 0, y: isReviewsExpanded ? -8 : 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: isReviewsExpanded ? 8 : -8 }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                      className="whitespace-nowrap"
                    >
                      {isReviewsExpanded ? 'Show Less' : 'View All Reviews'}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <motion.div
                  animate={{ rotate: isReviewsExpanded ? 180 : 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="text-neutral-400 group-hover:text-blue-600 transition-colors duration-200 flex items-center justify-center shrink-0"
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* HOROLOGICAL DIAL RULER SEPARATOR */}
      <DialRulerSeparator id="sep-4-5" label="TELEMETRE TRACK • SPLIT SECOND" index="CALIBRATION 04 / 05" />

      {/* ========================================================================= */}
      {/* SECTION 5: MOMENTS (COMPACT & EXCLUSIVELY THE 6 MAIN WATCHES) */}
      {/* ========================================================================= */}
      <section
        id="stories"
        className="w-full py-8 sm:py-10 scroll-mt-14 sm:scroll-mt-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:pl-32 lg:pr-14">
          <div className="relative max-w-2xl mb-8 flex items-start justify-between lg:block">
            <div className="flex-1 pr-3 lg:pr-0">
              <h2 className="font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','Inter',sans-serif] text-3xl sm:text-4xl md:text-5xl font-black tracking-[-0.03em] text-neutral-950">
                Moments
              </h2>
              <p className="text-lg sm:text-xl text-blue-600 font-handwriting tracking-wide font-semibold mt-1">
                Everyday wrist shots and visual memories captured with each core watch in the collection.
              </p>
            </div>
            <span
              aria-hidden="true"
              className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-black text-neutral-400/35 select-none leading-none pointer-events-none whitespace-nowrap shrink-0 lg:absolute lg:right-full lg:top-0 lg:mr-5 lg:-translate-y-2"
            >
              V
            </span>
          </div>

          {/* Watch Selector Buttons (Thumbnails on Top, Name Underneath) */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 sm:gap-3.5 mb-8">
            {mainMomentsGroups.map((group) => {
              const isSelected = group.watchId === activeMomentWatchId;
              const modelName = shortModelNames[group.watchId] || group.watchName;
              return (
                <button
                  key={group.watchId}
                  onClick={() => {
                    setActiveMomentWatchId(group.watchId);
                    setLightboxIndex(null);
                  }}
                  className={`group/btn flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl text-center transition-all duration-200 cursor-pointer border ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-[0_8px_20px_rgba(37,99,235,0.25)]'
                      : 'bg-white/95 hover:bg-white text-neutral-800 hover:text-neutral-950 border-neutral-200/90 hover:border-neutral-300 shadow-[0_4px_14px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)]'
                  }`}
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden mb-2 flex items-center justify-center p-1">
                    <img
                      src={resolveImg(group.watchThumb)}
                      alt={modelName}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        if (group.watchThumb.startsWith('/beyondcode/watches/')) {
                          target.src = `${import.meta.env.BASE_URL}${group.watchThumb.replace('/beyondcode/watches/', '')}`;
                        }
                      }}
                    />
                  </div>
                  <span
                    className={`text-xs sm:text-[13px] font-bold tracking-tight line-clamp-1 leading-tight ${
                      isSelected ? 'text-white' : 'text-neutral-900'
                    }`}
                  >
                    {modelName}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Clean Photo Gallery (Glassmorphic Light Grey Container) */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white/90 via-neutral-100/80 to-neutral-200/60 backdrop-blur-xl border border-white/90 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedMomentGroup.watchId}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-200/80">
                  <div>
                    <h3 className="font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','Inter',sans-serif] text-base sm:text-lg font-bold text-neutral-950">
                      {shortModelNames[selectedMomentGroup.watchId] || selectedMomentGroup.watchName}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => openWatchById(selectedMomentGroup.watchId)}
                      className="text-xs font-semibold text-neutral-900 hover:text-black transition-colors cursor-pointer"
                    >
                      View watch details &rarr;
                    </button>
                  </div>
                </div>

                {/* Gallery Grid (Centered when less than 4 images) with Animated Hover Shadows */}
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6 w-full">
                  {selectedMomentGroup.photos.map((photoUrl, idx) => (
                    <div
                      key={`${selectedMomentGroup.watchId}-photo-${idx}`}
                      onClick={() => setLightboxIndex(idx)}
                      className="group relative w-[calc(50%-0.5rem)] md:w-[calc(25%-1.125rem)] aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-200 border border-neutral-300/80 hover:border-neutral-900/60 shadow-[0_12px_32px_rgba(0,0,0,0.12)] hover:shadow-[0_24px_48px_rgba(0,0,0,0.22)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
                    >
                      <img
                        src={`${import.meta.env.BASE_URL}${photoUrl.startsWith('/') ? photoUrl.slice(1) : photoUrl}`}
                        alt={`${selectedMomentGroup.watchName} photograph ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          if (photoUrl.includes('/beyondcode/watches/moments/')) {
                            target.src = `${import.meta.env.BASE_URL}moments/${photoUrl.split('/moments/')[1]}`;
                          }
                        }}
                      />

                      {/* Subtle Hover Action Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="flex items-center gap-1.5 text-white text-xs font-medium tracking-wide">
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>View full size</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  </div>

  {/* ========================================================================= */}
  {/* 4. SOLID BLACK FOOTER */}
  {/* ========================================================================= */}
      <footer className="w-full bg-[#0c0c0e] text-white border-t border-white/[0.08] py-12 px-6 sm:px-10 lg:px-14">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs sm:text-sm font-medium text-neutral-400">
          <div className="flex items-center gap-3">
            <span className="font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','Inter',sans-serif] font-bold tracking-tight uppercase text-white text-base">
              JJJ WATCHES
            </span>
            <span className="text-neutral-600">&bull;</span>
            <span>&copy; {new Date().getFullYear()} Jeeval Jolly Jacob</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/jjj_watches/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white flex items-center gap-2 transition-colors group"
            >
              <Instagram className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
              <span>@jjj_watches</span>
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-blue-500 hover:text-blue-400 font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Back to Top</span>
              <span>&uarr;</span>
            </button>
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* MOMENTS PHOTO LIGHTBOX MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {lightboxIndex !== null && selectedMomentGroup && selectedMomentGroup.photos[lightboxIndex] && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxIndex(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative z-10 w-full max-w-4xl max-h-[94vh] flex flex-col items-center select-none"
            >
              {/* Header Bar */}
              <div className="w-full flex items-center justify-between pb-3 text-white">
                <div className="flex items-center gap-3">
                  <span className="text-sm sm:text-base font-bold tracking-tight">
                    {selectedMomentGroup.watchName}
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    {lightboxIndex + 1} of {selectedMomentGroup.photos.length}
                  </span>
                </div>

                <button
                  onClick={() => setLightboxIndex(null)}
                  aria-label="Close photo"
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Image View */}
              <div className="relative max-h-[82vh] flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl bg-black/60 border border-white/10">
                <img
                  src={`${import.meta.env.BASE_URL}${selectedMomentGroup.photos[lightboxIndex].startsWith('/') ? selectedMomentGroup.photos[lightboxIndex].slice(1) : selectedMomentGroup.photos[lightboxIndex]}`}
                  alt={`${selectedMomentGroup.watchName} full photograph`}
                  className="max-h-[82vh] w-auto max-w-[90vw] object-contain rounded-2xl"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    const photoUrl = selectedMomentGroup.photos[lightboxIndex];
                    if (photoUrl && photoUrl.includes('/beyondcode/watches/moments/')) {
                      target.src = `${import.meta.env.BASE_URL}moments/${photoUrl.split('/moments/')[1]}`;
                    }
                  }}
                />

                {/* Left / Right Nav Buttons */}
                {selectedMomentGroup.photos.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxIndex((prev) =>
                          prev === null ? 0 : (prev - 1 + selectedMomentGroup.photos.length) % selectedMomentGroup.photos.length
                        );
                      }}
                      aria-label="Previous photo"
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-sm transition-all cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxIndex((prev) =>
                          prev === null ? 0 : (prev + 1) % selectedMomentGroup.photos.length
                        );
                      }}
                      aria-label="Next photo"
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-sm transition-all cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

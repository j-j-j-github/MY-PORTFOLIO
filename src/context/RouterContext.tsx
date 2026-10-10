import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type RoutePath = '/' | '/watches' | '/photography' | '/writingsofj' | '/poetry';

interface RouterContextType {
  currentPath: RoutePath | string;
  targetSectionId: string | null;
  clearTargetSection: () => void;
  navigate: (path: string, options?: { sectionId?: string }) => void;
  goBack: () => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

const formatCleanPath = (input: string): string => {
  if (!input) return '/';
  let clean = decodeURIComponent(input).trim();
  clean = clean.split(/[?#]/)[0];
  clean = clean.replace(/^\/+/, '').replace(/\/+$/, '');
  if (!clean) return '/';
  return '/' + clean;
};

const normalizePath = (rawPath: string): RoutePath | string => {
  let path = formatCleanPath(rawPath);
  
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectParam = urlParams.get('p') || urlParams.get('path');
    if (redirectParam) {
      path = formatCleanPath(redirectParam);
      window.history.replaceState(null, '', path + window.location.hash);
    } else if (window.location.search.startsWith('?/')) {
      const param = window.location.search.slice(2).split('&')[0];
      path = formatCleanPath(param);
      window.history.replaceState(null, '', path + window.location.hash);
    }
  }

  // Redirect /poetry to /writingsofj
  if (path === '/poetry') {
    path = '/writingsofj';
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', '/writingsofj' + window.location.hash);
    }
  }

  if (path === '/' && typeof window !== 'undefined' && window.location.hash) {
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (hash === 'watches' || hash === 'photography' || hash === 'writingsofj' || hash === 'poetry') {
      path = formatCleanPath(hash);
      if (path === '/poetry') path = '/writingsofj';
    }
  }

  return path;
};

export const RouterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return normalizePath(window.location.pathname);
    }
    return '/';
  });

  const [targetSectionId, setTargetSectionId] = useState<string | null>(null);

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      const newPath = normalizePath(window.location.pathname);
      setCurrentPath(newPath);
      if (newPath === '/') {
        if ('scrollRestoration' in window.history) {
          window.history.scrollRestoration = 'manual';
        }
        const saved = e.state?.sectionId || sessionStorage.getItem('returnSection') || (window.location.hash ? window.location.hash.replace('#', '') : null);
        if (saved) {
          setTargetSectionId(saved);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string, options?: { sectionId?: string }) => {
    const targetPath = normalizePath(path);
    const sectionId = options?.sectionId || (path.includes('#') ? path.split('#')[1] : undefined);

    if (sectionId) {
      sessionStorage.setItem('returnSection', sectionId);
      setTargetSectionId(sectionId);
    }

    if (targetPath !== currentPath) {
      if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.history.pushState({ sectionId }, '', path);
      setCurrentPath(targetPath);
      if (!sectionId) {
        window.scrollTo(0, 0);
      }
    } else if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) {
        const yOffset = -70;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goBack = () => {
    navigate('/#beyondcode', { sectionId: 'beyondcode' });
  };

  const clearTargetSection = () => {
    setTargetSectionId(null);
  };

  return (
    <RouterContext.Provider value={{ currentPath, targetSectionId, clearTargetSection, navigate, goBack }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = (): RouterContextType => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};

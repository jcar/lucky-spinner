import { useEffect } from 'react';
import { useLocation } from 'wouter';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export function GoogleAnalytics() {
  const trackingId = import.meta.env.VITE_GA_TRACKING_ID;
  
  useEffect(() => {
    if (!trackingId) return;

    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(script);

    // Initialize Google Analytics
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', trackingId, {
      page_title: document.title,
      page_location: window.location.href,
    });

    return () => {
      // Cleanup
      document.head.removeChild(script);
    };
  }, [trackingId]);

  return null;
}

export function usePageTracking() {
  const [location] = useLocation();
  const trackingId = import.meta.env.VITE_GA_TRACKING_ID;

  useEffect(() => {
    if (!trackingId || !window.gtag) return;

    // Track page views
    window.gtag('config', trackingId, {
      page_path: location,
      page_title: document.title,
      page_location: window.location.href,
    });
  }, [location, trackingId]);
}

export function trackEvent(eventName: string, eventParameters?: any) {
  if (window.gtag) {
    window.gtag('event', eventName, eventParameters);
  }
}

// Custom event tracking functions for the app
export const analytics = {
  trackSpinWheel: (participantCount: number, hasWeights: boolean) => {
    trackEvent('spin_wheel', {
      participant_count: participantCount,
      has_weights: hasWeights,
      event_category: 'engagement',
    });
  },

  trackFileUpload: (participantCount: number) => {
    trackEvent('file_upload', {
      participant_count: participantCount,
      event_category: 'data_input',
    });
  },

  trackManualEntry: (participantCount: number) => {
    trackEvent('manual_entry', {
      participant_count: participantCount,
      event_category: 'data_input',
    });
  },

  trackExportResults: (winnerCount: number) => {
    trackEvent('export_results', {
      winner_count: winnerCount,
      event_category: 'data_export',
    });
  },

  trackReset: () => {
    trackEvent('reset_wheel', {
      event_category: 'interaction',
    });
  },

  trackPageView: (pageName: string) => {
    trackEvent('page_view', {
      page_name: pageName,
      event_category: 'navigation',
    });
  },
};
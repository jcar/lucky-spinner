import { useEffect } from 'react';

interface AdSenseProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdSense({ 
  adSlot, 
  adFormat = 'auto', 
  fullWidthResponsive = true,
  style = { display: 'block' },
  className = ''
}: AdSenseProps) {
  useEffect(() => {
    try {
      // Push the ad to AdSense queue
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  // Only render if we're in production or have a valid publisher ID
  const publisherId = import.meta.env.VITE_ADSENSE_PUBLISHER_ID || 'ca-pub-5260245166624874';
  
  if (publisherId === 'ca-pub-5260245166624874' && import.meta.env.DEV) {
    // Show placeholder in development
    return (
      <div className={`bg-muted border border-dashed border-border rounded-lg p-4 text-center text-sm text-muted-foreground ${className}`}>
        <i className="fas fa-ad mr-2" />
        AdSense Placeholder ({adFormat})
        <div className="text-xs mt-1">Ad will appear here in production</div>
      </div>
    );
  }

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={publisherId}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  );
}
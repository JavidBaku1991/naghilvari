declare module 'react-lazy-load-image-component' {
  import * as React from 'react';

  export interface LazyLoadImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    effect?: 'blur' | 'opacity' | string;
    visibleByDefault?: boolean;
    wrapperClassName?: string;
    wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
    afterLoad?: () => void;
    beforeLoad?: () => void;
    delayTime?: number;
    threshold?: number;
  }

  export const LazyLoadImage: React.FC<LazyLoadImageProps>;
}
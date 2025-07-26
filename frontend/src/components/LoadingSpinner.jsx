import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ size = 40, className = "" }) => {
  return (
    <div className={`loading-spinner ${className}`}>
      <Loader2 size={size} className="animate-spin" />
    </div>
  );
};

export const SectionLoader = ({ message = "Loading..." }) => {
  return (
    <div className="section-loader">
      <LoadingSpinner size={48} />
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
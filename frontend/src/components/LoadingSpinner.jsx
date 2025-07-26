import React from 'react';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';

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

export const ErrorMessage = ({ error, onRetry }) => {
  return (
    <div className="error-message">
      <AlertCircle size={24} className="error-icon" />
      <div className="error-content">
        <p className="error-text">{error || 'Something went wrong'}</p>
        {onRetry && (
          <button onClick={onRetry} className="retry-button">
            <RefreshCw size={16} />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;
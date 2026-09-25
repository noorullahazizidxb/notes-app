import React from 'react';
import { ProgressProvider } from '@bprogress/react';

// Lightweight adapter to provide BProgress context to the app.
export const ProgressProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProgressProvider height="3px" color="#06b6d4" options={{ showSpinner: false }}>
      {children}
    </ProgressProvider>
  );
};

export default ProgressProviders;

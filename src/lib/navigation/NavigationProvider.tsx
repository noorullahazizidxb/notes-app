import { createContext, useContext, ReactNode, useMemo } from 'react';
import { useNavigate, useLocation, NavigateFunction, Location } from 'react-router-dom';

type NavOptions = { replace?: boolean; state?: any } | undefined;

type NavigationContextValue = {
  navigate: (to: string, opts?: NavOptions) => void;
  location: Location;
  goBack: () => void;
  goForward: () => void;
};

const NavigationContext = createContext<NavigationContextValue | null>(null);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const navigateFn: NavigateFunction = useNavigate();
  const location = useLocation();

  const value = useMemo<NavigationContextValue>(() => {
    return {
      navigate: (to: string, opts?: NavOptions) => navigateFn(to, { replace: !!opts?.replace, state: opts?.state }),
      location,
      goBack: () => window.history.back(),
      goForward: () => window.history.forward(),
    };
  }, [navigateFn, location]);

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
};

export const useNavigation = (): NavigationContextValue => {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error('useNavigation must be used within a NavigationProvider');
  return ctx;
};

export default NavigationProvider;

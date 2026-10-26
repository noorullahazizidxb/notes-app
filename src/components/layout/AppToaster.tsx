import { Toaster } from 'react-hot-toast';

/** Single themed toaster shared by all layouts. */
const AppToaster = () => (
  <Toaster
    position="bottom-right"
    toastOptions={{
      duration: 2800,
      style: {
        border: '1px solid var(--color-border)',
        background: 'var(--color-card-bg)',
        color: 'var(--color-text)',
      },
    }}
    containerStyle={{ zIndex: 9999 }}
  />
);

export default AppToaster;

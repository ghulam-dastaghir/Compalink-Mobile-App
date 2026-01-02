import { useCallback } from 'react';
import Toast from 'react-native-toast-message';

type ToastType = 'success' | 'error' | 'info';

interface ShowToastOptions {
  type?: ToastType;
  text1: string;
  text2?: string;
  position?: 'top' | 'bottom';
  visibilityTime?: number;
}

export const useToast = () => {
  const showToast = useCallback(
    ({ type = 'success', text1, text2, position = 'top', visibilityTime = 3000 }: ShowToastOptions) => {
      Toast.show({
        type,
        text1,
        text2,
        position,
        visibilityTime,
      });
    },
    []
  );

  const showSuccess = useCallback(
    (message: string, description?: string) => {
      showToast({ type: 'success', text1: message, text2: description });
    },
    [showToast]
  );

  const showError = useCallback(
    (message: string, description?: string) => {
      showToast({ type: 'error', text1: message, text2: description });
    },
    [showToast]
  );

  const showInfo = useCallback(
    (message: string, description?: string) => {
      showToast({ type: 'info', text1: message, text2: description });
    },
    [showToast]
  );

  return {
    showToast,
    showSuccess,
    showError,
    showInfo,
  };
};


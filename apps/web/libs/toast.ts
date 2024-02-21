'use client';
import { toast, ToastOptions } from 'react-toastify';

const defaultOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const showToast = (
  message: string,
  type: 'info' | 'success' | 'warning' | 'error' | 'default' = 'default',
  options?: ToastOptions,
) => {
  const toastOptions = { ...defaultOptions, ...options };

  switch (type) {
    case 'info':
      toast.info(message, toastOptions);
      break;
    case 'success':
      toast.success(message, toastOptions);
      break;
    case 'warning':
      toast.warn(message, toastOptions);
      break;
    case 'error':
      toast.error(message, toastOptions);
      break;
    default:
      toast(message, toastOptions);
      break;
  }
};

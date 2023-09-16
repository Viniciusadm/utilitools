import './bootstrap';

declare global {
    interface Window {
      minMax: (value: number, min: number, max: number) => number;
    }
  }
  
  window.minMax = (value: number, min: number, max: number) => {
      if (!value) return value;
      return Math.min(Math.max(value, min), max);
  }
  

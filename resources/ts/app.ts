import './bootstrap';
import { select } from "./helpers";

declare global {
    interface Window {
        minMax: (value: number, min: number, max: number) => number;
    }
}

window.minMax = (value: number, min: number, max: number) => {
    if (!value) return value;
    return Math.min(Math.max(value, min), max);
}

(select('#sidebar-toggle') as HTMLButtonElement).addEventListener('click', () => {
    const sidebar = select('#sidebar') as HTMLElement;
    if (sidebar.classList.contains('hidden')) {
        sidebar.classList.remove('hidden');
    } else {
        sidebar.classList.add('hidden');
    }
});


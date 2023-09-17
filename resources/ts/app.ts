import './bootstrap';
import { select } from "./helpers";

(select('#sidebar-toggle') as HTMLButtonElement).addEventListener('click', () => {
    const sidebar = select('#sidebar') as HTMLElement;
    if (sidebar.classList.contains('hidden')) {
        sidebar.classList.remove('hidden');
    } else {
        sidebar.classList.add('hidden');
    }
});


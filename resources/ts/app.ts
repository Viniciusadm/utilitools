import './bootstrap';
import { event, select } from "./helpers";

event('#sidebar-toggle', 'click', () => {
    const sidebar = select('#sidebar');
    if (sidebar.classList.contains('hidden')) {
        sidebar.classList.remove('hidden');
    } else {
        sidebar.classList.add('hidden');
    }
});

export const SIDEBAR_CONTENT_ID = "app-sidebar-content";

const SIDEBAR_SCROLL_KEY = "sidebar-scroll";

type RestoreOptions = { id: string; storageKey: string };

function restoreSidebarScroll({ id, storageKey }: RestoreOptions) {
  const content = document.getElementById(id);
  if (!content) return;
  try {
    const saved = sessionStorage.getItem(storageKey);
    if (saved !== null) content.scrollTop = Number(saved);
  } catch {
    content.scrollTop = 0;
  }
  const active = content.querySelector<HTMLElement>('[aria-current="page"]');
  if (!active) return;
  const contentBox = content.getBoundingClientRect();
  const activeBox = active.getBoundingClientRect();
  if (activeBox.top >= contentBox.top && activeBox.bottom <= contentBox.bottom) return;
  content.scrollTop += activeBox.top - contentBox.top - (contentBox.height - activeBox.height) / 2;
}

export function sidebarScrollScript() {
  const options: RestoreOptions = { id: SIDEBAR_CONTENT_ID, storageKey: SIDEBAR_SCROLL_KEY };
  return `(${restoreSidebarScroll.toString()})(${JSON.stringify(options)});`;
}

export function saveSidebarScroll() {
  const content = document.getElementById(SIDEBAR_CONTENT_ID);
  if (!content || content.offsetParent === null) return;
  try {
    sessionStorage.setItem(SIDEBAR_SCROLL_KEY, String(content.scrollTop));
  } catch {
    return;
  }
}

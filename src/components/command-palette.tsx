import * as Dialog from "@radix-ui/react-dialog";
import { CornerDownLeft, Search } from "lucide-react";
import { Fragment, useEffect, useId, useMemo, useRef, useState, useSyncExternalStore, type KeyboardEvent, type ReactNode } from "react";

import { useUiCopy } from "@/i18n/ui";
import { useLocale } from "@/lib/i18n";
import { CATEGORY_LABELS, groupToolsByCategory, normalizeSearch, searchTools, toolPath, type NavTool } from "@/lib/nav-tools";
import { cn } from "@/lib/utils";

type Section = { key: string; label: string; tools: NavTool[]; offset: number };

const noopSubscribe = () => () => {};
const isMac = () => /mac|iphone|ipad/i.test(navigator.platform);

const kbdClassName =
  "inline-flex h-5 min-w-5 items-center justify-center rounded border border-border bg-muted px-1 font-sans text-[11px] font-medium text-muted-foreground";

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
}

/** Destaca o trecho buscado no título, ignorando acentos e maiúsculas. */
function highlight(text: string, query: string): ReactNode {
  const term = normalizeSearch(query);
  if (!term) return text;
  // stripDiacritics preserva o tamanho dos caracteres latinos, então os índices batem com o texto original.
  const index = normalizeSearch(text).indexOf(term);
  if (index < 0 || normalizeSearch(text).length !== text.length) return text;
  return (
    <>
      {text.slice(0, index)}
      <mark className="rounded-sm bg-primary/15 text-primary">{text.slice(index, index + term.length)}</mark>
      {text.slice(index + term.length)}
    </>
  );
}

export function CommandPalette() {
  const locale = useLocale();
  const copy = useUiCopy();
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const shortcut = useSyncExternalStore(noopSubscribe, () => (isMac() ? "⌘K" : "Ctrl K"), () => "Ctrl K");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      } else if (event.key === "/" && !event.ctrlKey && !event.metaKey && !event.altKey && !isEditableTarget(event.target)) {
        event.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const sections = useMemo<Section[]>(() => {
    if (normalizeSearch(query)) {
      const tools = searchTools(query, locale);
      return tools.length ? [{ key: "results", label: copy.palette.results, tools, offset: 0 }] : [];
    }
    let offset = 0;
    return groupToolsByCategory().map(({ category, tools }) => {
      const section = { key: category, label: CATEGORY_LABELS[category][locale], tools: [...tools], offset };
      offset += tools.length;
      return section;
    });
  }, [query, locale, copy]);

  const items = useMemo(() => sections.flatMap((section) => section.tools), [sections]);
  const hasQuery = Boolean(normalizeSearch(query));

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onOpenChange = (value: boolean) => {
    setOpen(value);
    if (!value) {
      setQuery("");
      setActive(0);
    }
  };

  const go = (tool: NavTool, newTab = false) => {
    const href = toolPath(tool.id, locale);
    if (newTab) {
      window.open(href, "_blank", "noopener");
    } else {
      window.location.assign(href);
    }
  };

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (items.length === 0) return;
    const moves: Record<string, number> = {
      ArrowDown: (active + 1) % items.length,
      ArrowUp: (active - 1 + items.length) % items.length,
      PageDown: Math.min(active + 5, items.length - 1),
      PageUp: Math.max(active - 5, 0),
    };
    if (event.key in moves) {
      event.preventDefault();
      setActive(moves[event.key]);
    } else if (event.key === "Enter") {
      event.preventDefault();
      go(items[active], event.ctrlKey || event.metaKey);
    }
  };

  const optionId = (index: number) => `${listId}-option-${index}`;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label={copy.palette.label}
          className="group flex h-9 items-center gap-2 rounded-lg border border-input bg-card px-2.5 text-sm text-muted-foreground shadow-xs transition-colors hover:border-primary/40 hover:text-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15 sm:w-64 sm:px-3"
        >
          <Search className="h-4 w-4 shrink-0" aria-hidden />
          <span className="hidden flex-1 text-left sm:inline">{copy.palette.trigger}</span>
          <kbd className={cn(kbdClassName, "hidden sm:inline-flex")}>
            {shortcut}
          </kbd>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-[12vh] z-50 flex max-h-[76vh] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 flex-col overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-top-2 duration-150"
        >
          <Dialog.Title className="sr-only">{copy.palette.label}</Dialog.Title>

          <div className="flex items-center gap-3 border-b border-border px-4">
            <Search className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
            <input
              autoFocus
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={onInputKeyDown}
              placeholder={copy.palette.placeholder}
              role="combobox"
              aria-expanded
              aria-controls={listId}
              aria-activedescendant={items.length ? optionId(active) : undefined}
              aria-autocomplete="list"
              autoComplete="off"
              spellCheck={false}
              className="h-14 flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <Dialog.Close className={cn(kbdClassName, "cursor-pointer hover:text-foreground")}>Esc</Dialog.Close>
          </div>

          <div ref={listRef} id={listId} role="listbox" aria-label={copy.palette.label} className="flex-1 overflow-y-auto overscroll-contain p-2">
            {items.length === 0 ? (
              <p className="px-3 py-10 text-center text-sm text-muted-foreground">{copy.directory.empty}</p>
            ) : (
              sections.map((section) => (
                <Fragment key={section.key}>
                  <div role="presentation" className="px-3 pb-1.5 pt-3 text-xs font-semibold text-muted-foreground first:pt-1.5">
                    {section.label}
                  </div>
                  {section.tools.map((tool, i) => {
                    const current = section.offset + i;
                    const selected = current === active;
                    return (
                      <a
                        key={tool.id}
                        id={optionId(current)}
                        data-index={current}
                        role="option"
                        aria-selected={selected}
                        href={toolPath(tool.id, locale)}
                        tabIndex={-1}
                        onMouseMove={() => !selected && setActive(current)}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors",
                          selected ? "bg-primary/10" : "hover:bg-accent",
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition-colors",
                            selected ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary",
                          )}
                        >
                          <tool.icon className="h-4 w-4" aria-hidden />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className={cn("block truncate text-sm font-medium", selected ? "text-primary" : "text-foreground")}>
                            {highlight(tool.title[locale], query)}
                          </span>
                          <span className="block truncate text-xs text-muted-foreground">{tool.desc[locale]}</span>
                        </span>
                        {hasQuery && !selected && (
                          <span className="hidden shrink-0 text-xs text-muted-foreground sm:inline">
                            {CATEGORY_LABELS[tool.category][locale]}
                          </span>
                        )}
                        {selected && <CornerDownLeft className="h-4 w-4 shrink-0 text-primary" aria-hidden />}
                      </a>
                    );
                  })}
                </Fragment>
              ))
            )}
          </div>

          <div className="hidden items-center gap-4 border-t border-border bg-muted/40 px-4 py-2.5 text-xs text-muted-foreground sm:flex">
            <span className="flex items-center gap-1.5">
              <kbd className={kbdClassName}>↑</kbd>
              <kbd className={kbdClassName}>↓</kbd>
              {copy.palette.navigate}
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className={kbdClassName}>↵</kbd>
              {copy.palette.open}
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className={kbdClassName}>Esc</kbd>
              {copy.palette.close}
            </span>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

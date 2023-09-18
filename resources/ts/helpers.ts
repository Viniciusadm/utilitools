export const select = (selector: string): Element | null  => {
    return document.querySelector(selector);
};

export const input = (selector: string): HTMLInputElement => {
    return document.querySelector(selector) as HTMLInputElement;
}

export const button = (selector: string): HTMLButtonElement => {
    return document.querySelector(selector) as HTMLButtonElement;
}

export const change = (selector: string, value: string = ''): void => {
    (select(selector) as HTMLInputElement).value = value;
}

export const minMax = (value: number, min: number, max: number) => {
    if (!value) return value;
    return Math.min(Math.max(value, min), max);
}

export const select = (selector: string): Element | null  => {
    return document.querySelector(selector);
};

export const change = (selector: string, value: string = ''): void => {
    (select(selector) as HTMLInputElement).value = value;
}

export const minMax = (value: number, min: number, max: number) => {
    if (!value) return value;
    return Math.min(Math.max(value, min), max);
}

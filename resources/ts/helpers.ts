export const select = (selector: string): Element | null  => {
    return document.querySelector(selector);
};

export const change = (selector: string, value: string = ''): void => {
    (select(selector) as HTMLInputElement).value = value;
}

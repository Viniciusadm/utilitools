import { button, input, select } from "../helpers";

const split = (text: string, separator: string): string => {
    const parts = text.split(separator);
    const cleanParts = parts.map(part => part.trim());
    return cleanParts.join(' ');
};

button('#split').addEventListener('click', () => {
    const text = input('#text').value;
    const separator = input('#separator').value;
    select('#result').innerHTML = split(text, separator);
});

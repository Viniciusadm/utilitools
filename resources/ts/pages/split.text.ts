import { event, input, select } from "../helpers";

const split = (text: string, separator: string): string => {
    return text.replaceAll(separator, '').replaceAll('  ', ' ');
};

event('#split', 'click', () => {
    const text = input('#text').value;
    const separator = input('#separator').value;
    select('#result').innerHTML = split(text, separator);
});

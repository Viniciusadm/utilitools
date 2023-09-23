import { event, input, select } from "../helpers";
import { copy } from "../functions";

const cut = (text: string, quantity: number = 20, ellipsis: boolean = true): string => {
    if (text.length <= quantity) {
        return text;
    }

    const cutText = text.substring(0, quantity);

    if (ellipsis) {
        return `${cutText}...`;
    }

    return cutText;
};

event('#cut', 'click', () => {
    const text = input('#text').value;
    const quantity = Number(input('#quantity').value);
    const ellipsis = input('#ellipsis').checked;
    select('#result').innerHTML = cut(text, quantity, ellipsis);
});

copy('#result');

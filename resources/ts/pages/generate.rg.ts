import { change, event, input, minMax, select } from "../helpers";
import { calculateCNPJDigit, copy } from "../functions";

const generate = (punctuation: boolean = true) => {
    const n1 = Math.floor((Math.random() * 4) + 1);
    const n2 = Math.round(Math.random() * 9);
    const n3 = Math.round(Math.random() * 9);
    const n4 = Math.round(Math.random() * 9);
    const n5 = Math.round(Math.random() * 9);
    const n6 = Math.round(Math.random() * 9);
    const n7 = Math.round(Math.random() * 9);
    const n8 = Math.round(Math.random() * 9);

    const sum = n1 * 2 + n2 * 3 + n3 * 4 + n4 * 5 + n5 * 6 + n6 * 7 + n7 * 8 + n8 * 9;
    let digit = String(11 - (sum % 11));
    if (digit === '11')
        digit = '0';
    if (digit === '10')
        digit = "X";

    const rg = String(n1) + String(n2) + String(n3) + String(n4) + String(n5) + String(n6) + String(n7) + String(n8) + digit;
    return punctuation ? punctuateRG(rg) : rg;
}

const punctuateRG = (rg: string): string => {
    return rg.substring(0, 2) + '.' + rg.substring(2, 5) + '.' + rg.substring(5, 8) + '-' + rg.substring(8);
}

event('#generate', 'click', () => {
    const quantity = input('#quantity').value;

    if (quantity === '') return;

    const punctuation = input('input[name="punctuation"]:checked').value === '1';
    const separator = input('input[name="separator"]:checked').value === 'word-break' ? '<br>' : ', ';
    let html = '';

    for (let i = 1; i <= Number(quantity); i++) {
        if (i === 1) html += `${generate(punctuation)}`;
        else html += `${separator} ${generate(punctuation)}`;
    }

    select('#rg').innerHTML = html;
});

copy('#rg');

event('#quantity', 'input', (element) => {
    change('#quantity', minMax(Number(element.value), 1, 100).toString());
});

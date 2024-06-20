import { change, event, input, minMax, select } from "../helpers";
import { copy } from "../functions";

const generate = (punctuation: boolean = true) => {
    const arr = [];
    arr.push(Math.floor((Math.random() * 4) + 1));
    for (var i = 1; i < 8; i++) {
        arr.push(Math.round(Math.random() * 9))
    }

    let sum = 0;
    let aux = false;
    let ninesOut = 0;
    arr.forEach((value) => {
        ninesOut = value * (aux ? 2 : 1);
        ninesOut = ninesOut > 9 ? ninesOut - 9 : ninesOut;
        sum = sum + ninesOut;
        aux = !aux;
        ninesOut = 0;
    });

    let digit = 10 - (sum % 10);
    if (digit === 10) {
        digit = 0;
    }

    const rg = `${arr.join("")}${digit}`;
    return punctuation ? punctuateRG(rg) : rg;
}

const punctuateRG = (rg: string): string => {
    return rg.substring(0, 2) + '.' + rg.substring(2, 5) + '.' + rg.substring(5, 8) + '-' + rg.substring(8);
}

const load = () => {
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
}

event('#generate', 'click', () => {
    load();
});

copy('#rg', 'div');

event('#quantity', 'input', (element) => {
    change('#quantity', minMax(Number(element.value), 1, 100).toString());
});

window.addEventListener('load', () => {
    load();
});
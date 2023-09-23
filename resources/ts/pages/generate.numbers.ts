import { button, change, input, select, minMax, event } from "../helpers";
import { copy } from "../functions";

const operations: Record<'sum' | 'sub' | 'mul' | 'div', (a: number, b: number) => number> = {
    sum: (a, b) => a + b,
    sub: (a, b) => a - b,
    mul: (a, b) => a * b,
    div: (a, b) => a / b
}

const random = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

event('#max', 'input', (element) => {
    button('#generate').disabled = element.value < input('#min').value;
});

event('#min', 'input', (element) => {
    button('#generate').disabled = element.value > input('#max').value;
});

event('#generate', 'click', () => {
    const min = parseInt((input('#min')).value, 10);
    const max = parseInt((input('#max')).value, 10);
    const quantity = parseInt((input('#quantity')).value, 10);

    let html = '';

    for (let i = 1; i <= Number(quantity); i++) {
        if (i === 1) html += `${random(min, max)}`;
        else html += `, ${random(min, max)}`;
    }

    select('#result').innerHTML = html;
});

copy('#result');

event('#quantity', 'input', (element) => {
    change('#quantity', minMax(Number(element.value), 1, 100).toString());
});

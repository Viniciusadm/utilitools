import { change, event, input, minMax, select } from "../helpers";
import { copy } from "../functions";

const generate = (): string => {
    const randomNumber = () => {
        return Math.round(Math.random() * 9);
    }

    const n1 = randomNumber();
    const n2 = randomNumber();
    const n3 = randomNumber();
    const n4 = randomNumber();
    const n5 = randomNumber();
    const n6 = randomNumber();
    const n7 = randomNumber();
    const n8 = randomNumber();
    const n9 = randomNumber();

    let aux = 0;

    const sumDv1 = n1 * 9 + n2 * 8 + n3 * 7 + n4 * 6 + n5 * 5 + n6 * 4 + n7 * 3 + n8 * 2 + n9;
    let dv1 = sumDv1 % 11;
    if (dv1 >= 10) {
        dv1 = 0;
        aux = 2;
    }

    const sumDv2 = n1 + n2 * 2 + n3 * 3 + n4 * 4 + n5 * 5 + n6 * 6 + n7 * 7 + n8 * 8 + n9 * 9;
    let dv2 = sumDv2 % 11;
    dv2 = dv2 >= 10
        ? 0
        : dv2 - aux;

    if (dv2 < 0) {
        return generate();
    }

    return `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${dv1}${dv2}`;
}

event('#generate', 'click', () => {
    const quantity = input('#quantity').value;

    if (quantity === '') return;

    const separator = input('input[name="separator"]:checked').value === 'word-break' ? '<br>' : ', ';
    let html = '';

    for (let i = 1; i <= Number(quantity); i++) {
        if (i === 1) html += `${generate()}`;
        else html += `${separator} ${generate()}`;
    }

    select('#cnh').innerHTML = html;
});

copy('#cnh', 'div');

event('#quantity', 'input', (element) => {
    change('#quantity', minMax(Number(element.value), 1, 100).toString());
});

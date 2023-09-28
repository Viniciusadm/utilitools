import { event, input, minMax, select } from '../helpers';
import IMask from 'imask';
import { copy } from "../functions";

const punctuateCPF = (cpf: string): string => {
    return cpf.substring(0, 3) + '.' + cpf.substring(3, 6) + '.' + cpf.substring(6, 9) + '-' + cpf.substring(9);
}

const generate = (punctuation: boolean = true, uf: string | null = null) => {
    let cpf = '';
    for (let i = 0; i < 8; i++) {
        cpf += Math.floor(Math.random() * 9);
    }

    if (uf) {
        cpf += uf;
    } else {
        cpf += Math.floor(Math.random() * 9);
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf[i]) * (10 - i);
    }
    let rest = sum % 11;
    let digit1 = (rest < 2) ? 0 : (11 - rest);

    cpf += digit1;

    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf[i]) * (11 - i);
    }

    rest = sum % 11;
    let digit2 = (rest < 2) ? 0 : (11 - rest);

    cpf += digit2;

    return punctuation ? punctuateCPF(cpf) : cpf;
}

event('#generate', 'click', () => {
    const quantity = input('#quantity').value;

    if (quantity === '') return;

    const punctuation = input('input[name="punctuation"]:checked').value === '1';
    const uf = input('#uf').value;
    const separator = input('input[name="separator"]:checked').value === 'word-break' ? '<br>' : ', ';
    let html = '';

    for (let i = 1; i <= Number(quantity); i++) {
        if (i === 1) html += `${generate(punctuation, uf)}`;
        else html += `${separator} ${generate(punctuation, uf)}`;
    }

    select('#cpf').innerHTML = html;
});

copy('#cpf', 'div');

event('#quantity', 'input', (element, event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        element.value = minMax(Number(element.value), 1, 100).toString();
    }
});

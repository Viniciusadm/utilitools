import { event, input, select } from "../helpers";
import IMask from "imask";

const validate = (rg: string) => {
    const original = rg;
    rg = rg.replace(/\D/g, '');

    if (original[original.length - 1] === 'X' || original[original.length - 1] === 'x') {
        rg = rg + 'X';
    }

    const n1 = parseInt(rg[0]);
    const n2 = parseInt(rg[1]);
    const n3 = parseInt(rg[2]);
    const n4 = parseInt(rg[3]);
    const n5 = parseInt(rg[4]);
    const n6 = parseInt(rg[5]);
    const n7 = parseInt(rg[6]);
    const n8 = parseInt(rg[7]);
    const digit = rg[8].toUpperCase();

    const sum = n1 * 2 + n2 * 3 + n3 * 4 + n4 * 5 + n5 * 6 + n6 * 7 + n7 * 8 + n8 * 9;
    let expectedDigit = String(11 - (sum % 11));
    if (expectedDigit === '11') {
        expectedDigit = '0';
    } else if (expectedDigit === '10') {
        expectedDigit = 'X';
    }

    return digit === expectedDigit;
};


const validateRG = () => {
    const responseElement = select('#response');

    const rg = input('#rg').value;
    const response = validate(rg);

    responseElement.classList.remove('text-success', 'text-danger');

    if (response) {
        responseElement.innerHTML = 'RG válido';
        responseElement.classList.add('text-success');
    } else {
        responseElement.innerHTML = 'RG inválido';
        responseElement.classList.add('text-danger');
    }
}

event('#validate', 'click', () => {
    validateRG();
});

event('#rg', 'keyup', (element, event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        validateRG();
    }
});

window.addEventListener('load', () => {
    IMask(select('#rg'), {
        mask: '00.000.000-?',
        definitions: {
            '0': /[0-9]/,
            '?': /[0-9Xx]/,
        }
    });
});

import { event, input, select } from "../helpers";

const validate = (number: string): boolean => {
    if (!/^\d{11}$/.test(number)) {
        return false;
    }

    const digits = number.split('').map(Number);

    const dv1Calc = (
        digits[0] * 9 +
        digits[1] * 8 +
        digits[2] * 7 +
        digits[3] * 6 +
        digits[4] * 5 +
        digits[5] * 4 +
        digits[6] * 3 +
        digits[7] * 2 +
        digits[8]
    ) % 11;

    let aux = 0;

    let dv1 = dv1Calc >= 10 ? 0 : dv1Calc;

    if (dv1Calc >= 10) {
        aux = 2;
    }

    const dv2Calc =
        (digits[0] +
            digits[1] * 2 +
            digits[2] * 3 +
            digits[3] * 4 +
            digits[4] * 5 +
            digits[5] * 6 +
            digits[6] * 7 +
            digits[7] * 8 +
            digits[8] * 9) %
        11;

    let dv2 = dv2Calc >= 10 ? 0 : dv2Calc - aux;

    if (dv2 < 0) {
        dv2 += 11;
    }

    return dv1 === digits[9] && dv2 === digits[10];
}

const validateCNH = () => {
    const responseElement = select('#response');

    const cnh = input('#cnh').value;
    const response = validate(cnh);

    responseElement.classList.remove('text-success', 'text-danger');

    if (response) {
        responseElement.innerHTML = 'CNH válido';
        responseElement.classList.add('text-success');
    } else {
        responseElement.innerHTML = 'CNH inválido';
        responseElement.classList.add('text-danger');
    }
}

event('#validate', 'click', () => {
    validateCNH();
});

event('#cnh', 'keyup', (element, event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        validateCNH();
    }
});

import IMask from "imask";
import { event, input, select } from "../../helpers";

const states = [
    ['RS'],
    ['DF', 'GO', 'MT', 'MS', 'TO'],
    ['AC', 'AM', 'AP', 'PA', 'RO', 'RR'],
    ['CE', 'MA', 'PI'],
    ['PB', 'PE', 'AL', 'RN'],
    ['BA', 'SE'],
    ['MG'],
    ['RJ', 'ES'],
    ['SP'],
    ['PR', 'SC'],
];

const validate = (cpf: string): { valid: boolean, states?: string[] } => {
    cpf = cpf.replace(/\D/g, '');

    if (!/^(\d{11}|\d{3}\.\d{3}\.\d{3}-\d{2})$/.test(cpf) || /^(0{11}|1{11}|2{11}|3{11}|4{11}|5{11}|6{11}|7{11}|8{11}|9{11})$/.test(cpf)) {
        return {
            valid: false
        };
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf[i]) * (10 - i);
    }

    let rest = sum % 11;
    let digit1 = (rest < 2) ? 0 : (11 - rest);

    if (digit1 !== parseInt(cpf[9])) {
        return {
            valid: false
        };
    }

    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf[i]) * (11 - i);
    }

    rest = sum % 11;
    let digit2 = (rest < 2) ? 0 : (11 - rest);

    return {
        valid: (digit2 === parseInt(cpf[10])),
        states: states[digit1]
    };
}

const validateCPF = () => {
    const responseElement = select('#response') as Element;

    const response = validate(input('#cpf').value);

    responseElement.classList.remove('text-success', 'text-danger');

    if (response.valid) {
        responseElement.innerHTML = 'CPF válido';
        responseElement.classList.add('text-success');
    } else {
        responseElement.innerHTML = 'CPF inválido';
        responseElement.classList.add('text-danger');
    }
}
event('#validate', 'click', () => {
    validateCPF();
});

event('#cpf', 'keyup', (element, event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        validateCPF();
    }
});

window.addEventListener('load', () => {
    IMask(select('#cpf'), {
        mask: '000.000.000-00'
    });
});

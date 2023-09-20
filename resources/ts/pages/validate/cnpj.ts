import { event, input, select } from "../../helpers";
import IMask from "imask";
import { calculateCNPJDigit } from "../../functions";

const validate = (cnpj): boolean => {
    cnpj = cnpj.replace(/\D/g, '');

    if (!/^\d{14}$/.test(cnpj) || /^(0{14}|1{14}|2{14}|3{14}|4{14}|5{14}|6{14}|7{14}|8{14}|9{14})$/.test(cnpj)) {
        return false;
    }

    const firstDigit = calculateCNPJDigit(cnpj.slice(0, 12));
    const secondDigit = calculateCNPJDigit(cnpj.slice(0, 13));

    return (parseInt(cnpj[12]) === firstDigit && parseInt(cnpj[13]) === secondDigit);
};

const validateCNPJ = () => {
    const responseElement = select('#response');

    const cnpj = input('#cnpj').value;
    const response = validate(cnpj);

    responseElement.classList.remove('text-success', 'text-danger');

    if (response) {
        responseElement.innerHTML = 'CNPJ válido';
        responseElement.classList.add('text-success');
    } else {
        responseElement.innerHTML = 'CNPJ inválido';
        responseElement.classList.add('text-danger');
    }
}

event('#validate', 'click', () => {
    validateCNPJ();
});

event('#cnpj', 'keyup', (element, event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        validateCNPJ();
    }
});

window.addEventListener('load', () => {
    IMask(select('#cnpj'), {
        mask: '00.000.000/0000-00'
    });
});

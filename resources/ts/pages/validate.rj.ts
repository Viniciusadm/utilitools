import { event, input, select } from "../helpers";
import IMask from "imask";

const validate = (rg: string): boolean => {
    rg = rg.replace(/\D/g, '');

    const digitInformed = rg.substring(8, 9);
    const arrNumbers = rg.split("").splice(0, 8);
  
    let sum = 0;
    let aux = false;
    let ninesOut = 0;
    arrNumbers.forEach((value) => {
      ninesOut = parseInt(value) * (aux ? 2 : 1);
      ninesOut = ninesOut > 9 ? ninesOut - 9 : ninesOut;
      sum = sum + ninesOut;
      aux = !aux;
      ninesOut = 0;
    });
  
    let digitValid = 10 - (sum % 10);
    if (digitValid == 10) {
        digitValid = 0;
    }
  
    if (digitInformed !== String(digitValid)) {
      return false;
    }

    return true;
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

import { change, minMax, select } from '../helpers';
import IMask from 'imask';

// Funções para gerar CPFs válidos
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

const generateElement = select('#generate');
if (generateElement) {
    generateElement.addEventListener('click', () => {
        const quantity = (select('#quantity') as HTMLInputElement).value;

        if (quantity === '') return;

        const punctuation = (select('input[name="punctuation"]:checked') as HTMLInputElement).value === '1';
        const uf = (select('#uf') as HTMLInputElement).value;
        const separator = (select('input[name="separator"]:checked') as HTMLInputElement).value === 'word-break' ? '<br>' : ', ';
        let html = '';

        for (let i = 1; i <= Number(quantity); i++) {
            if (i === 1) html += `${generate(punctuation, uf)}`;
            else html += `${separator} ${generate(punctuation, uf)}`;
        }

        (select('#cpf') as Element).innerHTML = html;

        (select('#buttons') as Element).scrollIntoView({ behavior: 'smooth' });
    });

    const copy = select('#copy') as HTMLButtonElement;
    copy.addEventListener('click', () => {
        copy.disabled = true;
        const cpf = (select('#cpf') as HTMLInputElement).innerText;
        navigator.clipboard.writeText(cpf).then(() => {
            copy.innerHTML = '<span class="mr-1">Copiado</span><i class="bi-clipboard-check"></i>';
            setTimeout(() => {
                copy.innerHTML = '<span class="mr-1">Copiar</span><i class="bi-clipboard"></i>';
                copy.disabled = false;
            }, 1000);
        });
    });
}

const quantity = select('#quantity') as HTMLInputElement;
if (quantity) {
    quantity.addEventListener('input', () => {
        change('#quantity', minMax(Number(quantity.value), 1, 100).toString());
    });
}

// Funções para validar CPFs
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

const punctuateCPF = (cpf: string): string => {
    return cpf.substring(0, 3) + '.' + cpf.substring(3, 6) + '.' + cpf.substring(6, 9) + '-' + cpf.substring(9);
}

const cpfElement = select('#cpf') as HTMLInputElement;

const validateCPF = () => {
    const responseElement = select('#response') as Element;

    const cpf = cpfElement.value;
    const response = validate(cpf);

    responseElement.classList.remove('text-success', 'text-danger');

    if (response.valid) {
        responseElement.innerHTML = 'CPF válido';
        responseElement.classList.add('text-success');
    } else {
        responseElement.innerHTML = 'CPF inválido';
        responseElement.classList.add('text-danger');
    }
}

if (select('#validate')) {
    (select('#validate') as Element).addEventListener('click', () => {
        validateCPF();
    });

    cpfElement.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            validateCPF();
        }
    });

    window.addEventListener('load', () => {
        if (cpfElement.value) {
            validateCPF();
        }

        IMask(cpfElement, {
            mask: '000.000.000-00'
        });
    });
}

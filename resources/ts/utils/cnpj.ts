import { select } from "../helpers";

const generate = (punctuation = true) => {
    let cnpj = '';
    for (let i = 0; i < 12; i++) {
        cnpj += Math.floor(Math.random() * 10);
    }

    const firstDigit = calculateCNPJDigit(cnpj);
    cnpj += firstDigit;

    const secondDigit = calculateCNPJDigit(cnpj);
    cnpj += secondDigit;

    return punctuation ? punctuateCNPJ(cnpj) : cnpj;
};

const calculateCNPJDigit = (cnpj) => {
    let multiplier = 2;
    let sum = 0;
    for (let i = cnpj.length - 1; i >= 0; i--) {
        sum += parseInt(cnpj[i]) * multiplier;
        multiplier = (multiplier === 9) ? 2 : (multiplier + 1);
    }

    const remainder = sum % 11;
    return (remainder < 2) ? 0 : (11 - remainder);
};

const punctuateCNPJ = (cnpj: string) => {
    return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8, 12)}-${cnpj.slice(12)}`;
}

const generateElement = select('#generate');
if (generateElement) {
    generateElement.addEventListener('click', () => {
        const quantity = (select('#quantity') as HTMLInputElement).value;

        if (quantity === '') return;

        const punctuation = (select('input[name="punctuation"]:checked') as HTMLInputElement).value === '1';
        const separator = (select('input[name="separator"]:checked') as HTMLInputElement).value === 'word-break' ? '<br>' : ', ';
        let html = '';

        for (let i = 1; i <= Number(quantity); i++) {
            if (i === 1) html += `${generate(punctuation)}`;
            else html += `${separator} ${generate(punctuation)}`;
        }

        (select('#cnpj') as Element).innerHTML = html;

        (select('#buttons') as Element).scrollIntoView({ behavior: 'smooth' });
    });

    const copy = select('#copy') as HTMLButtonElement;
    copy.addEventListener('click', () => {
        copy.disabled = true;
        const cnpj = (select('#cnpj') as HTMLInputElement).innerText;
        navigator.clipboard.writeText(cnpj).then(() => {
            copy.innerHTML = '<span class="mr-1">Copiado</span><i class="bi-clipboard-check"></i>';
            setTimeout(() => {
                copy.innerHTML = '<span class="mr-1">Copiar</span><i class="bi-clipboard"></i>';
                copy.disabled = false;
            }, 1000);
        });
    });
}

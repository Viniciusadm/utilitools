import { change, event, input, minMax, select } from "../../helpers";
import { calculateCNPJDigit } from "../../functions";

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

const punctuateCNPJ = (cnpj: string) => {
    return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8, 12)}-${cnpj.slice(12)}`;
}

event('#generate', 'click', (element) => {
    const quantity = input('#quantity').value;

    if (quantity === '') return;

    const punctuation = input('input[name="punctuation"]:checked').value === '1';
    const separator = input('input[name="separator"]:checked').value === 'word-break' ? '<br>' : ', ';
    let html = '';

    for (let i = 1; i <= Number(quantity); i++) {
        if (i === 1) html += `${generate(punctuation)}`;
        else html += `${separator} ${generate(punctuation)}`;
    }

    select('#cnpj').innerHTML = html;
});

event('#copy', 'click', (element) => {
    element.addEventListener('click', () => {
        element.disabled = true;
        const cnpj = input('#cnpj').innerText;
        navigator.clipboard.writeText(cnpj).then(() => {
            element.innerHTML = '<span class="mr-1">Copiado</span><i class="bi-clipboard-check"></i>';
            setTimeout(() => {
                element.innerHTML = '<span class="mr-1">Copiar</span><i class="bi-clipboard"></i>';
                element.disabled = false;
            }, 1000);
        });
    });
});

event('#quantity', 'input', (element) => {
    change('#quantity', minMax(Number(element.value), 1, 100).toString());
});

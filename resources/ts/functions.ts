import { event, input } from "./helpers";

export const calculateCNPJDigit = (cnpj) => {
    let multiplier = 2;
    let sum = 0;
    for (let i = cnpj.length - 1; i >= 0; i--) {
        sum += parseInt(cnpj[i]) * multiplier;
        multiplier = (multiplier === 9) ? 2 : (multiplier + 1);
    }

    const remainder = sum % 11;
    return (remainder < 2) ? 0 : (11 - remainder);
};

export const copy = (target: string, type: 'input' | 'div' = 'input') => {
    event('#copy', 'click', (element) => {
        element.disabled = true;
        const result = type === 'input' ? input(target).value : input(target).innerText;
        navigator.clipboard.writeText(result).then(() => {
            element.innerHTML = '<span class="mr-1">Copiado</span><img src="/images/icons/clipboard-check.svg" alt="">';
            setTimeout(() => {
                element.innerHTML = '<span class="mr-1">Copiar</span><img src="/images/icons/clipboard.svg" alt="">';
                element.disabled = false;
            }, 1000);
        });
    });
}

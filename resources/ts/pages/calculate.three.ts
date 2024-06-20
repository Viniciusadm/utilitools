import { event, input } from "../helpers";
import { copy } from "../functions";

const calculate = (a: number, b: number, c: number): number => {
    const value = (b * c) / a;

    if (value % 1 !== 0) {
        return Number(value.toFixed(2));
    }

    return value;
}


document.querySelectorAll('.number').forEach((element: HTMLInputElement) => {
    element.addEventListener('input', () => {
        const a = input('#number_a').value as number;
        const b = input('#number_b').value as number;
        const c = input('#number_c').value as number;

        if (a && b && c) {
            const result = calculate(a, b, c);
            input('#number_x').value = result.toString();
        } else {
            input('#number_x').value = 'X';
        }
    });
});

event('#copy', 'click', (element) => {
    element.disabled = true;
    const result = input('#number_x').value;
    navigator.clipboard.writeText(result).then(() => {
        element.innerHTML = '<img src="/images/icons/clipboard-check.svg" alt="">';
        setTimeout(() => {
            element.innerHTML = '<img src="/images/icons/clipboard.svg" alt="">';
            element.disabled = false;
        }, 1000);
    });
});

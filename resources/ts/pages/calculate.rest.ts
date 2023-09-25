import { button, event, input, select } from "../helpers";

const calculate = (divident: number, divisor: number): Record<string, number> => {
    if (divisor === 0) return { quociente: 0, rest: 0, percentage: 0 };

    const quociente = Math.floor(divident / divisor);
    const rest = divident % divisor;
    const percentage = Math.round((rest / divisor) * 100);

    return {
        quociente,
        rest,
        percentage,
    }
}

event('#divident', 'input', (element) => {
    button('#calculate').disabled = element.value < input('#divisor').value;
});

event('#divisor', 'input', (element) => {
    button('#calculate').disabled = element.value > input('#divident').value;
});

event('#divident', 'keypress', (element, event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        input('#divisor').focus();
    }
});

event('#calculate', 'click', () => {
    const divident = input('#divident').value as number;
    const divisor = input('#divisor').value as number;

    const { quociente, rest, percentage } = calculate(divident, divisor);

    select('#result-quociente').innerHTML = quociente.toString();
    select('#result-rest').innerHTML = rest.toString();
    select('#result-percentage').innerHTML = `${percentage}%`;
});

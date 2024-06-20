import { change, input } from "../helpers";

type Units = "Kelvin" | "Fahrenheit" | "Celsius";

const convert = (temperature: number, from: Units, to: Units): number => {
    if (from === to) {
        return temperature;
    }

    let result: number;

    switch (from) {
        case "Kelvin":
            if (to === "Celsius") {
                result = temperature - 273.15;
            } else if (to === "Fahrenheit") {
                result = (temperature - 273.15) * 9 / 5 + 32;
            }
            break;
        case "Celsius":
            if (to === "Kelvin") {
                result = temperature + 273.15;
            } else if (to === "Fahrenheit") {
                result = temperature * 9 / 5 + 32;
            }
            break;
        case "Fahrenheit":
            if (to === "Kelvin") {
                result = (temperature - 32) * 5 / 9 + 273.15;
            } else if (to === "Celsius") {
                result = (temperature - 32) * 5 / 9;
            }
            break;
    }

    return Math.round(result * 100) / 100;
};

document.querySelectorAll('.base-input').forEach((input: HTMLInputElement) => {
    input.addEventListener('keyup', () => {
        const base = input.getAttribute('data-base') as Units;
        const value = input.value;

        if (value === '') {
            change('#kelvin');
            change('#fahrenheit');
            change('#celsius');
            return;
        }

        if (isNaN(parseFloat(value))) {
            return;
        }

        change('#kelvin', convert(parseFloat(value), base, 'Kelvin') as string);
        change('#fahrenheit', convert(parseFloat(value), base, 'Fahrenheit') as string);
        change('#celsius', convert(parseFloat(value), base, 'Celsius') as string);
    });
});

document.querySelectorAll('.copy-button').forEach((button: HTMLButtonElement) => {
    button.addEventListener('click', () => {
        const copy = input(button.getAttribute('data-clipboard-target'));
        navigator.clipboard.writeText(copy.value).then(() => {
            button.innerHTML = '<img src="/images/icons/clipboard-check.svg" alt="">';
            setTimeout(() => {
                button.innerHTML = '<img src="/images/icons/clipboard.svg" alt="">';
            }, 2000);
        });
    });
});

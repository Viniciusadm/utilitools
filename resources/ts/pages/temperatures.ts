import { change } from "../helpers";

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
        const input = document.querySelector(button.getAttribute('data-clipboard-target') as string) as HTMLInputElement;
        navigator.clipboard.writeText(input.value).then(() => {
            button.innerHTML = '<i class="bi-clipboard-check"></i>';
            setTimeout(() => {
                button.innerHTML = '<i class="bi-clipboard"></i>';
            }, 2000);
        });
    });
});

import { button, change, input, select, minMax } from "../helpers";

type Bases = 2 | 8 | 10 | 16;

function filterBase(value: string, base: Bases): string {
    const validCharacters: Record<Bases, string> = {
        2: '01',
        8: '01234567',
        10: '0123456789',
        16: '0123456789abcdef'
    };

    const validChars = validCharacters[base];
    return [...value.toLowerCase()]
        .filter(char => validChars.includes(char))
        .join('');
}

const convert = (number: number | string, from: Bases, to: Bases): string => {
    if (from === 10) {
        return parseInt(number as string, 10).toString(to);
    } else {
        const decimalNumber = parseInt(number as string, from);
        return decimalNumber.toString(to);
    }
}

document.querySelectorAll('.base-input').forEach((input: HTMLInputElement) => {
    input.addEventListener('input', () => {
        input.value = filterBase(input.value, parseInt(input.getAttribute('data-base') as string, 10) as Bases);
    });

    input.addEventListener('keyup', () => {
        const base = parseInt(input.getAttribute('data-base') as string, 10) as Bases;
        const value = input.value;

        if (value === '') {
            change('#decimal');
            change('#binary');
            change('#octal');
            change('#hexadecimal');
            return;
        }

        change('#decimal', convert(value, base, 10));
        change('#binary', convert(value, base, 2));
        change('#octal', convert(value, base, 8));
        change('#hexadecimal', convert(value, base, 16));
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

const operations: Record<'sum' | 'sub' | 'mul' | 'div', (a: number, b: number) => number> = {
    sum: (a, b) => a + b,
    sub: (a, b) => a - b,
    mul: (a, b) => a * b,
    div: (a, b) => a / b
}

const random = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generate = (button('#generate'));
if (generate) {
    const max = input('#max');
    const min = input('#min');

    max.addEventListener('input', () => {
        button('#generate').disabled = max.value < min.value;
    });

    min.addEventListener('input', () => {
        button('#generate').disabled = min.value > max.value;
    });

    generate.addEventListener('click', () => {
        const min = parseInt((input('#min')).value, 10);
        const max = parseInt((input('#max')).value, 10);
        const quantity = parseInt((input('#quantity')).value, 10);

        let html = '';

        for (let i = 1; i <= Number(quantity); i++) {
            if (i === 1) html += `${random(min, max)}`;
            else html += `, ${random(min, max)}`;
        }

        (select('#result') as Element).innerHTML = html;

        const copy = button('#copy');
        copy.addEventListener('click', () => {
            copy.disabled = true;
            const cpf = (input('#result')).innerText;
            navigator.clipboard.writeText(cpf).then(() => {
                copy.innerHTML = '<span class="mr-1">Copiado</span><i class="bi-clipboard-check"></i>';
                setTimeout(() => {
                    copy.innerHTML = '<span class="mr-1">Copiar</span><i class="bi-clipboard"></i>';
                    copy.disabled = false;
                }, 1000);
            });
        });
    });
}

const quantity = input('#quantity');
if (quantity) {
    quantity.addEventListener('input', () => {
        change('#quantity', minMax(Number(quantity.value), 1, 100).toString());
    });
}

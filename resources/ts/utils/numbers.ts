import { change, select } from "../helpers";

type Bases = 2 | 8 | 10 | 16;

function filter(value: string, base: Bases): string {
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
        input.value = filter(input.value, parseInt(input.getAttribute('data-base') as string, 10) as Bases);
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

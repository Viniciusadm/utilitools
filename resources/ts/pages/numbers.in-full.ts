import { button, change, event, input, minMax, select } from "../helpers";
import { copy } from "../functions";

function numberToWords(number) {
    const units = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
    const specials = ['', 'onze', 'doze', 'treze', 'catorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
    const tens = ['', 'dez', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
    const hundreds = ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'];

    if (number < 1 || number > 99999999999999) {
        return 'Número fora do intervalo suportado';
    }

    return convertGroup(number).trim();

    function convertGroup(group) {
        const trillion = Math.floor(group / 1000000000000);
        const remainderTrillion = group % 1000000000000;

        const billion = Math.floor(remainderTrillion / 1000000000);
        const remainderBillion = remainderTrillion % 1000000000;

        const million = Math.floor(remainderBillion / 1000000);
        const remainderMillion = remainderBillion % 1000000;

        const thousand = Math.floor(remainderMillion / 1000);
        const remainderThousand = remainderMillion % 1000;

        let words = '';

        if (trillion > 0) {
            words += convertHundred(trillion) + (trillion === 1 ? ' trilhão ' : ' trilhões ');
        }

        if (billion > 0) {
            words += convertHundred(billion) + (billion === 1 ? ' bilhão ' : ' bilhões ');
        }

        if (million > 0) {
            words += convertHundred(million) + (million === 1 ? ' milhão ' : ' milhões ');
        }

        if (thousand > 0) {
            words += convertHundred(thousand) + (thousand === 1 ? ' mil ' : ' mil ');
        }

        if (remainderThousand > 0) {
            words += convertHundred(remainderThousand);
        }

        return words;
    }

    function convertHundred(hundred) {
        const hundredWords = hundreds[Math.floor(hundred / 100)];
        const remainderHundred = hundred % 100;

        let words = '';

        if (hundredWords) {
            words += hundredWords;
        }

        if (remainderHundred > 0) {
            if (hundredWords) {
                words += ' e ';
            }

            words += convertTen(remainderHundred);
        }

        return words;
    }

    function convertTen(ten) {
        if (ten < 10) {
            return units[ten];
        } else if (ten < 20) {
            return specials[ten - 11];
        } else {
            const tenWords = tens[Math.floor(ten / 10)];
            const unit = ten % 10;
            let words = tenWords;

            if (unit > 0) {
                words += ' e ' + units[unit];
            }

            return words;
        }
    }
}


event('#in-full', 'click', () => {
    const number = input('#number').value;
    select('#result').innerHTML = numberToWords(number);
});

event('#number', 'input', (element) => {
    change('#number', minMax(Number(element.value), 1, 99999999999999).toString());
});

event('#number', 'keydown', (element, event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        button('#in-full').click();
    }
});

copy('#result');

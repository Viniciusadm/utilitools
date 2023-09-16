import { select } from '../helpers';

const MAX_MEMORY_LENGTH = 10;
const memory: string[] = [];

const text = select('#text') as HTMLInputElement;
const statusCharacters = select('#status-characters') as Element;
const statusWords = select('#status-words') as Element;
const statusLines = select('#status-lines') as Element;

const updateStatus = () => {
    statusCharacters.textContent = String(text.value.length);
    statusWords.textContent = String(text.value.split(' ').filter(word => word !== '').length);
    statusLines.textContent = String(text.value.split('\n').filter(line => line !== '').length);
};

const addActionListener = (button: Element, callback: (text: string) => string) => {
    button.addEventListener('click', () => {
        const originalText = text.value;
        const modifiedText = callback(originalText);

        if (originalText !== modifiedText) {
            memory.push(originalText);
            if (memory.length > MAX_MEMORY_LENGTH) {
                memory.shift();
            }
            text.value = modifiedText;
            updateStatus();
        }
    });
};

text.addEventListener('input', updateStatus);

addActionListener(select('#action-reverse') as Element, text => text.split('').reverse().join(''));

addActionListener(select('#action-uppercase') as Element, text => text.toUpperCase());

addActionListener(select('#action-lowercase') as Element, text => text.toLowerCase());

addActionListener(select('#action-capitalize') as Element, text => text.toLowerCase().replace(/(?:^|\s)\S/g, match => match.toUpperCase()));

addActionListener(select('#action-alternate') as Element, text => {
    const upper = text[0] === text[0].toUpperCase();
    return text.split('').map((char, index) => (index % 2 ? (upper ? char.toUpperCase() : char.toLowerCase()) : (upper ? char.toLowerCase() : char.toUpperCase()))).join('');
});

addActionListener(select('#action-shuffle') as Element, text => text.split('').sort(() => Math.random() - 0.5).join(''));

addActionListener(select('#action-unique') as Element, text => [...new Set(text.split(' '))].join(' '));

(select('#action-undo') as Element).addEventListener('click', () => {
    if (memory.length > 0) {
        text.value = memory.pop() as string;
        updateStatus();
    }
});

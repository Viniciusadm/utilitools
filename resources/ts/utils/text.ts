import { select } from '../helpers';

const MAX_MEMORY_LENGTH = 10;
const memory = [];

const text = select('#text');
const statusCharacters = select('#status-characters');
const statusWords = select('#status-words');
const statusLines = select('#status-lines');

const updateStatus = () => {
    statusCharacters.textContent = text.value.length;
    statusWords.textContent = text.value.split(' ').filter(word => word !== '').length;
    statusLines.textContent = text.value.split('\n').filter(line => line !== '').length;
};

const addActionListener = (button, callback) => {
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

addActionListener(select('#action-reverse'), text => text.split('').reverse().join(''));

addActionListener(select('#action-uppercase'), text => text.toUpperCase());

addActionListener(select('#action-lowercase'), text => text.toLowerCase());

addActionListener(select('#action-capitalize'), text => text.toLowerCase().replace(/(?:^|\s)\S/g, match => match.toUpperCase()));

addActionListener(select('#action-alternate'), text => {
    const upper = text[0] === text[0].toUpperCase();
    return text.split('').map((char, index) => (index % 2 ? (upper ? char.toUpperCase() : char.toLowerCase()) : (upper ? char.toLowerCase() : char.toUpperCase()))).join('');
});

addActionListener(select('#action-shuffle'), text => text.split('').sort(() => Math.random() - 0.5).join(''));

addActionListener(select('#action-unique'), text => [...new Set(text.split(' '))].join(' '));

select('#action-undo').addEventListener('click', () => {
    if (memory.length > 0) {
        text.value = memory.pop();
        updateStatus();
    }
});

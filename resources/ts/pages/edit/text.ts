import { event, input, select } from '../../helpers';

const MAX_MEMORY_LENGTH = 10;
const memory: string[] = [];

const text = input('#text');

const updateStatus = () => {
    select('#status-characters').textContent = String(text.value.length);
    select('#status-words').textContent = String(text.value.split(' ').filter(word => word !== '').length);
    select('#status-lines').textContent = String(text.value.split('\n').filter(line => line !== '').length);
};

const addActionListener = (button: string, callback: (text: string) => string) => {
    event(button, 'click', () => {
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

addActionListener('#action-reverse', text => text.split('').reverse().join(''));

addActionListener('#action-uppercase', text => text.toUpperCase());

addActionListener('#action-lowercase', text => text.toLowerCase());

addActionListener('#action-capitalize', text => text.toLowerCase().replace(/(?:^|\s)\S/g, match => match.toUpperCase()));

addActionListener('#action-alternate', text => {
    const upper = text[0] === text[0].toUpperCase();
    return text.split('').map((char, index) => (index % 2 ? (upper ? char.toUpperCase() : char.toLowerCase()) : (upper ? char.toLowerCase() : char.toUpperCase()))).join('');
});

addActionListener('#action-shuffle', text => text.split('').sort(() => Math.random() - 0.5).join(''));

addActionListener('#action-unique', text => [...new Set(text.split(' '))].join(' '));

event('#action-undo', 'click', () => {
    if (memory.length > 0) {
        text.value = memory.pop() as string;
        updateStatus();
    }
});

event('#text', 'input', updateStatus);

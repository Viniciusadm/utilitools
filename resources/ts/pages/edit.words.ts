import { event, input, select } from '../helpers';

const MAX_MEMORY_LENGTH = 10;
const memory: string[] = [];

const SEPARATORES = {
    'word-break': '\n',
    'comma': ',',
    'space': ' ',
    'semicolon': ';',
}

const text = input('#text');

const updateStatus = () => {
    const separator =  input('input[name="separator"]:checked').value;
    select('#status-words').textContent = String(text.value.split(SEPARATORES[separator]).filter(word => word !== '').length);
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

addActionListener('#action-reverse', text => {
    const separator =  input('input[name="separator"]:checked').value;
    return text.split(SEPARATORES[separator]).reverse().join(SEPARATORES[separator]);
});

addActionListener('#action-shuffle', text => {
    const separator =  input('input[name="separator"]:checked').value;
    return text.split(SEPARATORES[separator]).sort(() => Math.random() - 0.5).join(SEPARATORES[separator]);
});

addActionListener('#action-unique', text => {
    const separator =  input('input[name="separator"]:checked').value;
    return text.split(SEPARATORES[separator]).filter((value, index, self) => self.indexOf(value) === index).join(SEPARATORES[separator]);
});

addActionListener('#action-sort', text => {
    const separator = input('input[name="separator"]:checked').value;
    return text.split(SEPARATORES[separator]).sort((a, b) => a.localeCompare(b, [], { sensitivity: 'accent' })).join(SEPARATORES[separator]);
});

event('#action-undo', 'click', () => {
    if (memory.length > 0) {
        text.value = memory.pop() as string;
        updateStatus();
    }
});

event('#text', 'input', updateStatus);

const text = document.querySelector('#text');

const statusLength = document.querySelector('#status-characters');
const statusWords = document.querySelector('#status-words');
const statusLines = document.querySelector('#status-lines');

text.addEventListener('input', () => {
    statusLength.textContent = text.value.length;
    statusWords.textContent = text.value.split(' ').length;
    statusLines.textContent = text.value.split('\n').length;
});

document.querySelector('#action-reverse').addEventListener('click', () => {
    if (!text.value) return;
    text.value = text.value.split('').reverse().join('');
});

document.querySelector('#action-uppercase').addEventListener('click', () => {
    if (!text.value) return;
    text.value = text.value.toUpperCase();
});

document.querySelector('#action-lowercase').addEventListener('click', () => {
    if (!text.value) return;
    text.value = text.value.toLowerCase();
});

document.querySelector('#action-capitalize').addEventListener('click', () => {
    if (!text.value) return;
    text.value = text.value.toLowerCase().replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
});

document.querySelector('#action-alternate').addEventListener('click', () => {
    if (!text.value) return;
    const upper = text.value[0] === text.value[0].toUpperCase();

    text.value = text.value.split('').map((value, index) => {
        return (index % 2) ? upper ? value.toUpperCase() : value.toLowerCase() : upper ? value.toLowerCase() : value.toUpperCase();
    }).join('');
});

document.querySelector('#action-shuffle').addEventListener('click', () => {
    if (!text.value) return;
    text.value = text.value.split('').sort(() => Math.random() - 0.5).join('');
});

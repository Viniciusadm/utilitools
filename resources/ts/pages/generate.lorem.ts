import { change, event, input, select } from "../helpers";
import { copy } from "../functions";

const words = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed",
    "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua",
    "Ut", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris",
    "nisi", "ut", "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "dolor",
    "in", "reprehenderit", "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat",
    "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt",
    "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"
];

const result = input('#result');

const updateStatus = () => {
    const lines = String(result.value.split('\n').filter(line => line !== '').length);
    const characters = String(result.value.length);
    const words = String(result.value.split(' ').filter(word => word !== '').length);

    select('#status-characters').textContent = characters;
    select('#status-words').textContent = String(Number(words) + Number(lines) - 1);
    select('#status-lines').textContent = lines;
};

const generateParagraphBytes = (minLength = 20, maxLength = 50, maxBytes: number | null = null) => {
    const numWords = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    const paragraph = [];
    let end = false;
    let next = false;
    let numBytes = 0;

    for (let i = 0; i < numWords; i++) {
        let index: number;

        if (maxBytes < 14) {
            const shuffled = words.sort(() => Math.random() - 0.5);
            index = shuffled.findIndex(word => word.length > 2 && word.length < maxBytes - 1);
        } else {
            index = Math.floor(Math.random() * words.length);
        }

        end = Math.floor(Math.random() * 10) === 0;
        let word: string;

        if (i === 0 || next) {
            if (index === -1) {
                break;
            }
            word = words[index].charAt(0).toUpperCase() + words[index].slice(1) + (end ? "." : "");
        } else {
            word = words[index] + (end ? "." : "");
        }

        numBytes += word.length + 1;
        if (maxBytes && numBytes > maxBytes) {
            if (maxBytes > 3) {
                numBytes -= word.length + 1;
                break;
            } else {
                const shuffled = words.sort(() => Math.random() - 0.5);
                const result = shuffled.find(wordi => wordi.length > 2 && wordi.length < maxBytes - 1);
                if (!result) {
                    break;
                } else {
                    word = result;
                }
                numBytes += word.length + 1;
            }
        }

        paragraph.push(word);

        next = end;
        end = false;
    }

    if (!next) {
        paragraph[paragraph.length - 1] += ".";
    }

    return paragraph.length > 0 ? paragraph.join(" ") : "";
}

const generateParagraph = (minLength = 20, maxLength = 50) => {
    const numWords = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    const paragraph = [];
    let end = false;
    let next = false;

    for (let i = 0; i < numWords; i++) {
        const index = Math.floor(Math.random() * words.length);

        end = Math.floor(Math.random() * 10) === 0;
        let word: string;

        if (i === 0 || next) {
            word = words[index].charAt(0).toUpperCase() + words[index].slice(1) + (end ? "." : "");
        } else {
            word = words[index] + (end ? "." : "");
        }

        paragraph.push(word);

        next = end;
        end = false;
    }

    if (!next) {
        paragraph[paragraph.length - 1] += ".";
    }

    return paragraph.length > 0 ? paragraph.join(" ") : "";
}

const generateText = (numParagraphs: number = 5, maxWords: number | null = null) => {
    const text = [];
    let numWords = 0;

    for (let i = 0; i < numParagraphs; i++) {
        if (maxWords && maxWords - numWords < 50) {
            const generated = generateParagraph(maxWords - numWords, maxWords - numWords);
            text.push(generated);
            numWords += generated.split(" ").length;
            break;
        } else {
            const generated = generateParagraph();
            text.push(generated);
            numWords += generated.split(" ").length;
        }
    }

    return text.join("\n\n");
}
const generateTextBytes = (numParagraphs: number = 5, maxbytes: number | null = null) => {
    const text = [];
    let numBytes = 0;
    let remaining = maxbytes;

    for (let i = 0; i < numParagraphs; i++) {
        const generated = generateParagraphBytes(20, 50, remaining);

        if (generated) {
            text.push(generated);
            numBytes += generated.length;
            remaining = maxbytes - numBytes;
        }

        if (remaining <= 0) {
            break;
        }
    }

    return text.join("\n\n");
}

event("#generate", "click", () => {
    let paragraphs: number;
    let maxWords: number | null;
    let maxBytes: number | null;

    const quantity = input('#quantity').value;
    const type = input('input[name="type"]:checked').value;

    if (type === "paragraphs") {
        paragraphs = Number(quantity);

        change("#result", generateText(paragraphs));
        updateStatus();

        return;
    }

    if (type === "words") {
        paragraphs = Math.ceil(Number(quantity) / 20);
        maxWords = Number(quantity);
        change("#result", generateText(paragraphs, maxWords));
        updateStatus();
        return;
    }

    if (type === "bytes") {
        paragraphs = Math.ceil(Number(quantity) / 50);
        maxBytes = Number(quantity);
        change("#result", generateTextBytes(paragraphs, maxBytes));
        updateStatus();
        return;
    }
});

copy("#result");

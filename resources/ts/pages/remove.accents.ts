import { event, input, select } from "../helpers";
import { copy } from "../functions";

const remove = (text: string): string => {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

event('#remove', 'click', () => {
    select('#result').innerHTML = remove(input('#text').value);
});

copy('#result');

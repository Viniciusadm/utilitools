import { button, event, input, select } from "../helpers";
import dayjs from "dayjs";

const calculate = (initial: Date, final: Date): number => {
    return dayjs(final).diff(dayjs(initial), 'day');
}

event('#initial', 'input', (element) => {
    button('#calculate').disabled = dayjs(element.value).isAfter(dayjs(input('#final').value));
});

event('#final', 'input', (element) => {
    button('#calculate').disabled = dayjs(element.value).isBefore(dayjs(input('#initial').value));
});

event('#calculate', 'click', () => {
    const initial = input('#initial').value as Date;
    const final = input('#final').value as Date;

    select('#result-days').innerHTML = calculate(initial, final).toString() + ' dias';
});

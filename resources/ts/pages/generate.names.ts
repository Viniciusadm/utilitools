import { event, input, select } from "../helpers";
import axios from "axios";
import { copy } from "../functions";

const generate = async (genre: 'male' | 'female' = 'male'): Promise<string> => {
    return await axios.get('/api/generate/name/', {
        params: {
            genre: genre
        }
    }).then((response) => {
        return response.data.body;
    });
};

event('#generate', 'click', (element) => {
    const genre = input('input[name="genre"]:checked').value as 'male' | 'female';
    element.disabled = true;

    generate(genre).then((response) => {
        select('#name-text').innerHTML = response;
        setTimeout(() => {
            element.disabled = false;
        }, 1000);
    });
});

copy('#name-text', 'div');

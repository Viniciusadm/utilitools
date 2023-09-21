import { event, input, select } from "../helpers";
import axios from "axios";

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

event('#copy', 'click', (element) => {
    element.disabled = true;
    const name = select('#name-text').innerHTML;
    navigator.clipboard.writeText(name).then(() => {
        element.innerHTML = '<span class="mr-1">Copiado</span><i class="bi-clipboard-check"></i>';
        setTimeout(() => {
            element.innerHTML = '<span class="mr-1">Copiar</span><i class="bi-clipboard"></i>';
            element.disabled = false;
        }, 1000);
    });
});

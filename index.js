import { normalizar } from "./normalizacion.js";

// PARTE A
normalizar()
    .then(characters => {
        console.log(characters[0]);
        console.log(characters[characters.length - 1]);
        console.log(characters.length)

        // PARTE B
        // ...
    })
    .catch(error => {
        console.error(`Error al obtener datos normalizados: ${error}`);
    });
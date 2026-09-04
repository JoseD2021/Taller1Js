import { consultas } from "./consultas.js";
import { benchmarkConsultarPaginas } from "./estrategias.js";
import { normalizar } from "./normalizacion.js";

// PARTE A
normalizar()
    .then(characters => {
        console.log(characters[0]);
        console.log(characters[characters.length - 1]);
        console.log(characters.length)

        // PARTE B
        consultas(characters);

        // PARTE C
        benchmarkConsultarPaginas()
            .catch(e => {
                console.error(`Error al ejecutar benchmark de estrategias: ${e}`);
            });
    })
    .catch(error => {
        console.error(`Error al obtener datos normalizados: ${error}`);
    });
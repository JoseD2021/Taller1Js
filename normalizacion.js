
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function normalizar() {
    let mainUrl = "https://rickandmortyapi.com/api/character/";
    try {
        const response = await fetch(mainUrl);
        let   data     = await response.json();
        const pages    = data.info.pages; // Obtenemos la cantidad de paginas

        let urls = [];
        for (let i=1; i<pages+1; i++) {
            urls.push(`${mainUrl}?page=${i}`);
        }

        console.log(`[+] Main Url: ${mainUrl}`);
        console.log("[+] Parseando de 5 en 5 para evitar rate limiting");
        console.log("[+] Empezando parsing...")
        let responses = [];
        for (let i=0; i<urls.length; i+=5) {
            let tempResponses = await Promise.all(urls.slice(i, i+5).map(url => fetch(url).then(r => r.json()))); // Array con 5 respuestas, volvemos a json enseguida
            responses.push(...tempResponses); // Los 3 puntos desempaqueta el array y queda aplanado
            console.log(`[i] Parseado: ${i+5}/${urls.length}`)
            await sleep(1000);
        }
        
        let characters = [];
        // Responses son las paginas (42), results es el array de objetos por pagina
        for (let r of responses) {
            for (let objData of r.results) {
                const character = {
                    id                : objData.id,
                    nombre            : objData.name,
                    estado            : objData.status,
                    especie           : objData.species,
                    tipo              : objData.type,
                    genero            : objData.gender,
                    origen            : objData.origin?.name,
                    ubicacionActual   : objData.location?.name,
                    cantidadEpisodios : objData.episode.length,
                    imagen            : objData.image
                }
                characters.push(character);
            }
        }
        console.log(characters);
    } catch (error) {
        console.error(`Fetch fallo: ${error}`);
    }
}

normalizar();

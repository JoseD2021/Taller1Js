async function findAllCharacters() {
    let response = [];
    try {
        let res = await fetch(`https://rickandmortyapi.com/api/character`);
        let allChars = await res.json();

        let { pages } = allChars.info;

        response = response.concat(allChars.results);

        for (let i = 2; i <= pages; i++) {
            // console.log("Obteniendo información de la página " + i);

            let pageRes = await fetch(`https://rickandmortyapi.com/api/character?page=${i}`);

            if (pageRes.status !== 200) {
                console.error("No se pudo obtener la información de la página " + i);
                console.error("Status: " + pageRes.status);
                console.error(pageRes.statusText);
                continue;
            }

            let pageData = await pageRes.json();

            response = response.concat(pageData.results);
        }
    } catch (e) {
        console.error("No se pudo obtener la información de los personajes", e);
    }

    return response;
}

function findAlive(allChars = []) {
    let alive = allChars.filter(x => x.status.toUpperCase() == "ALIVE");

    return alive;
}


function moreThan20(allChars = []) {
    return allChars.filter(x => x.episode.length >= 20);
}

function alienFemale(allChars = []) {
    return allChars.find(x => x.species.toUpperCase() == "ALIEN" && x.gender.toUpperCase() == "FEMALE");
}

function someType(allChars = []) {
    return allChars.some(x => x.type && x.type.length > 0);
}

function hasImageAndEpisode(allChars = []) {
    return allChars.every(x => x.image && x.image.length > 0 && x.episode.length > 0);
}

function groupCharacters(allChars = []) {
    let reduced = allChars.reduce((acc, actual) => {
        acc[actual.species] = acc[actual.species] || { cantidad: 0, totalEpisodios: 0, promedioEpisodios: 0, vivos: 0 };

        let accActual = acc[actual.species];

        accActual.cantidad += 1;
        accActual.totalEpisodios += actual.episode.length;
        accActual.promedioEpisodios = accActual.totalEpisodios / accActual.cantidad;
        accActual.vivos += actual.status.toUpperCase() == "ALIVE" ? 1 : 0;

        return acc;
    }, {});

    // eliminar totalEpisodios de cada especie
    for (let especie in reduced) {
        delete reduced[especie].totalEpisodios;
    }

    return reduced;
}

function groupByEpisodes(allChars = []) {
    return allChars.reduce((acc, actual) => {
        let episodes = actual.episode.length;

        if (episodes >= 1 && episodes <= 5) {
            acc["1-5"] += 1;
        } else if (episodes >= 6 && episodes <= 15) {
            acc["6-15"] += 1;
        } else if (episodes >= 16 && episodes <= 30) {
            acc["16-30"] += 1;
        } else if (episodes > 30) {
            acc["30+"] += 1;
        }

        return acc;
    }, { "1-5": 0, "6-15": 0, "16-30": 0, "30+": 0 })
}

let allChars = findAllCharacters()
    .then(allChars => {
        console.log("------------------------------------------------")
        console.log("Se encontraron " + allChars.length + " personajes en total");
        let alive = findAlive(allChars);
        let moreThan20Episodes = moreThan20(allChars);
        let alienFemaleChar = alienFemale(allChars);
        let someTypeChar = someType(allChars);
        let hasImageAndEpisodeChar = hasImageAndEpisode(allChars);
        let groupedCharacters = groupCharacters(allChars);
        let groupedByEpisodes = groupByEpisodes(allChars);

        console.log("------------------------------------------------")
        console.log(`PERSONAJES VIVOS (${alive.length})`)
        console.log(alive)

        console.log("------------------------------------------------")
        console.log(`PERSONAJES QUE APARECEN EN 20 O MÁS EPISODIOS (${moreThan20Episodes.length})`)
        console.log(moreThan20Episodes)

        console.log("------------------------------------------------")
        console.log("PRIMER PERSONAJE ALIEN Y FEMALE:")
        console.log(alienFemaleChar)

        console.log("------------------------------------------------")
        console.log("Existe al menos un personaje cuyo campo type tenga información?:")
        console.log(someTypeChar)

        console.log("------------------------------------------------")
        console.log("Todos los personajes tienen imagen y aparecen en algun episodio?:")
        console.log(hasImageAndEpisodeChar)

        console.log("------------------------------------------------")
        console.log("AGRUPACIÓN DE PERSONAJES POR ESPECIE:")
        console.log(groupedCharacters)

        console.log("------------------------------------------------")
        console.log("AGRUPACIÓN DE PERSONAJES POR CANTIDAD DE EPISODIOS:")
        console.log(groupedByEpisodes)
    })
    .catch(e => console.error("No se pudo obtener la información de los personajes", e));

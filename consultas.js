async function findAllCharacters() {
    try {
        let res = await fetch(`https://rickandmortyapi.com/api/character`);
        let allChars = await res.json();

        let { pages } = allChars.info;

        let response = allChars.results;

        for (let i = 2; i <= pages; i++) {
            console.log("Obteniendo información de la página " + i);
            fetch(`https://rickandmortyapi.com/api/character?page=${i}`)
                .then(res => res.json())
                .then(res => response.concat(res.results))
                .catch(e => console.error("No se pudo obtener la información de la página " + i, e));
        }

        return response;
    } catch (e) {
        console.error("No se pudo obtener la información de los personajes", e);

        return [];
    }

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

let allChars = findAllCharacters()
    .then(allChars => {
        console.log("Se encontraron " + allChars.length + " personajes en total");
        let alive = findAlive(allChars);
        let moreThan20Episodes = moreThan20(allChars);
        let alienFemaleChar = alienFemale(allChars);
        let someTypeChar = someType(allChars);
        let hasImageAndEpisodeChar = hasImageAndEpisode(allChars);

        console.log("TODOS LOS PERSONAJES VIVOS:")
        console.log(alive)

        console.log("------------------------------------------------")
        console.log("TODOS LOS PERSONAJES QUE APARECEN EN 20 O MÁS EPISODIOS:")
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
    })
    .catch(e => console.error("No se pudo obtener la información de los personajes", e));

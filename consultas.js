async function findAllCharacters() {
    let res = await fetch(`https://rickandmortyapi.com/api/character`);
    let allChars = await res.json();

    let { pages } = allChars.info;

    let response = allChars.results;

    for (let i = 2; i <= pages; i++) {
        fetch(`https://rickandmortyapi.com/api/character?page=${i}`)
            .then(res => res.json())
            .then(res => response.concat(res.results))
            .catch(e => console.error(e))
    }

    return response;
}

async function findAlive() {
    let allChars = await findAllCharacters();
    let alive = allChars.filter(x => x.status.toUpperCase() == "ALIVE");

    return alive;
}

async function moreThan20() {
    let allChars = await findAllCharacters();

    return allChars.filter(x => x.episode.length >= 20);
}

async function alienFemale() {
    let allChars = await findAllCharacters();

    return allChars.find(x => x.species.toUpperCase() == "ALIEN" && x.gender.toUpperCase() == "FEMALE");
}

async function someType() {
    let allChars = await findAllCharacters();

    return allChars.some(x => x.type && x.type.length > 0);
}

async function hasImageAndEpisode() {
    let allChars = await findAllCharacters();

    return allChars.every(x => x.image && x.image.length > 0 && x.episode.length > 0);
}

async function groupCharacters() {
    let allChars = await findAllCharacters();

    return allChars.reduce((acc, actual) => {
        return acc;
    }, {})
}

findAlive().then(r => {
    console.log("TODOS LOS PERSONAJES VIVOS:")
    console.log(r)
});

moreThan20().then(r => {
    console.log("TODOS LOS PERSONAJES QUE APARECEN EN 20 O MÁS EPISODIOS:")
    console.log(r)
});

alienFemale().then(r => {
    console.log("PRIMER PERSONAJE ALIEN Y FEMALE:")
    console.log(r)
});

someType().then(r => {
    console.log("Existe al menos un personaje cuyo campo type tenga información?:")
    console.log(r)
});

hasImageAndEpisode().then(r => {
    console.log("Todos los personajes tienen imagen y aparecen en algun episodio?:")
    console.log(r)
});



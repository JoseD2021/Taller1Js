// fetch("https://rickandmortyapi.com/api/character?page=43")

async function consultarPaginasE1() {
    let paginas = [];
    for (let i = 1; i < 43; i++){
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${i}`);
        // .then(response => response.json())
        // .then(data => console.log(data));
        try {
            const data = await response.json();
            paginas.push(data);
        } catch (error) {
            console.log("Error");
            console.log(response);
        }
        
    }
    return paginas;
}

console.log(await consultarPaginasE1());

/* { // ejemplo de pagina
  info: {
    count: 826,
    pages: 42,
    next: 'https://rickandmortyapi.com/api/character?page=2',
    prev: null
  },
  results: [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: [Object],
      location: [Object],
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      episode: [Array],
      url: 'https://rickandmortyapi.com/api/character/1',
      created: '2017-11-04T18:48:46.250Z'
    },
    { */
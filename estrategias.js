const mainUrl = "https://rickandmortyapi.com/api/character";

async function totalPaginas() {
  const response = await fetch(mainUrl);
  const data = await response.json();
  return data.info.pages;
}

async function consultarPaginasE1(tPaginas) {
  let paginas = [];
  for (let i = 1; i <= tPaginas; i++) {
    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${i}`);
    try {
      const data = await response.json();
      paginas.push(data);
    } catch (error) {
      console.log("Error " + response.status);
    }
  }
  return paginas;
}

totalPaginas()
  .then(total => consultarPaginasE1(total))
  .then(pag => console.log(pag));

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
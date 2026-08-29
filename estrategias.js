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

async function consultarPaginasE2(tPaginas) {
  // creacion de urls 
  const promesas = Array(tPaginas).fill(mainUrl).map((url, i) => fetch(`${url}?page=${i+1}`));
  let respuestas;
  // consulta de paginas
  try {
    respuestas = await Promise.all(promesas);
  } catch (error) {
    console.error("No se completo la consulta de las paginas");
    return
  }
  // datos a json
  const datos = await Promise.all(
    respuestas.map(async r => {try {return await r.json()} catch {return }}) // evitar que un error de una respuesta (error 429) rompa todo el json
  );
  return datos;
}

await totalPaginas()
  .then(total => consultarPaginasE1(total))
  .then(pag => console.log(pag));

totalPaginas()
  .then(total => consultarPaginasE2(total))
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
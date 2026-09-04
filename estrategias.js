const mainUrl = "https://rickandmortyapi.com/api/character";

import {sleep} from "./normalizacion.js";

async function totalPaginas() {
  const response = await fetch(mainUrl);
  const data = await response.json();
  return data.info.pages;
}

async function consultarPaginasE1(tPaginas) {
  let paginas = [];
  //for (let i = 1; i <= tPaginas; i++) {
  let i = 0;
  while (i <= tPaginas){
    const response = await fetch(`${mainUrl}?page=${i}`);
    try {
      const data = await response.json();
      paginas.push(data);
      i++;
      await sleep(300);
      //console.log("added "+i)
    } catch (error) {
      console.log("Error " + response.status + "\nReintentando en 9seg");
      await sleep(9000);
    }
  }
  return paginas;
}

async function consultarPaginasE2(tPaginas) {
  // creacion de urls 
  const urls = Array(tPaginas).fill(mainUrl).map((url, i) => `${url}?page=${i+1}`);
  let i = 0;
  let paginas = [];
  const paso = 5;
  for (let i = 0; i < urls.length; i+= 5){
    const promesas = urls.slice(i,i+5).map((url) => fetch(url));
    let respuestas;
    try {
      respuestas = await Promise.all(promesas);
    } catch (error) {
      console.error("No se completo la consulta de las paginas");
      return;
    }
    const datos = await Promise.all(
      respuestas.map(async r =>{ 
        if (r.status == 200) // evitar que un error de una respuesta (error 429) rompa todo el json
          return await r.json();
        else
          return;
        }
      )
    );
    paginas.push(...datos);
    await sleep(1600); // reducir frecuencia para evitar limite de consultas
  }
  return paginas;
}

// implementaciones para comparar si no existe un limite de consultas

async function consultarPaginasE1Unrestricted(tPaginas) {
  let paginas = [];
  for (let i = 1; i <= tPaginas; i++) {
    const response = await fetch(`${mainUrl}?page=${i}`);
    try {
      const data = await response.json();
      paginas.push(data);
    } catch (error) {
      //console.log("Error " + response.status);
    }
  }
  return paginas;
}

async function consultarPaginasE2Unrestricted(tPaginas) {
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
    respuestas.map(async r => {
      if (r.status == 200) // evitar que un error de una respuesta (error 429) rompa todo el json
        return await r.json();
      else
        return;
    }) 
  );
  return datos;
}

export const benchmarkConsultarPaginas = async () => {
  const totalPag = await totalPaginas();

  console.log("\nConsulta usando estrategia 1")
  console.time("estrategia1");
  await consultarPaginasE1(totalPag)
    // .then(pag => console.log(pag))
    .then(pag => console.log("Consulta usando estrategia 1 terminada"));
  console.timeEnd("estrategia1");

  await sleep(1700);

  console.log("\nConsulta usando estrategia 2")
  console.time("estrategia2");
  await consultarPaginasE2(totalPag)
    // .then(pag => console.log(pag))
    .then(pag => console.log("Consulta usando estrategia 2 terminada"));
  console.timeEnd("estrategia2");

  await sleep(1700);

  console.log("\nConsulta usando estrategia 1 sin limite")
  console.time("estrategia1Unrestricted");
  await consultarPaginasE1Unrestricted(totalPag)
    // .then(pag => console.log(pag))
    .then(pag => console.log("Consulta usando estrategia 1 sin limite terminada"));
  console.timeEnd("estrategia1Unrestricted");

  await sleep(1700);

  console.log("\nConsulta usando estrategia 2 sin limite")
  console.time("estrategia2Unrestricted");
  await consultarPaginasE2Unrestricted(totalPag)
    // .then(pag => console.log(pag))
    .then(pag => console.log("Consulta usando estrategia 2 sin limite terminada"));
  console.timeEnd("estrategia2Unrestricted");/**/

}

// benchmarkConsultarPaginas();
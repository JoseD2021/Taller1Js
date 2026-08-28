
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function normalizar() {
    let main_url = "https://rickandmortyapi.com/api/character/";
    try {
        const response = await fetch(main_url);
        if (!response.ok) {
            console.error(`[-] Request a ${main_url} fallo`);
        }
        let data = await response.json();
        const pages = data.info.pages; // Obtenemos la cantidad de paginas

        let urls = [];
        for (let i=1; i<pages+1; i++) {
            urls.push(`${main_url}?page=${i}`);
        }
        
        urls = urls.slice(0,15); // Cortar temporalmente para optimizar pruebas
        console.log(`[+] Main Url: ${main_url}`);
        console.log("[+] Parseando de 5 en 5 para evitar rate limiting");
        console.log("[+] Empezando parsing...")
        let responses = [];
        for (let i=0; i<urls.length; i+=5) {
            let tempResponses = await Promise.all(urls.slice(i, i+5).map(url => fetch(url).then(r => r.json()))); // Array con 5 respuestas, volvemos a json enseguida
            responses.push(...tempResponses); // Los 3 puntos desempaqueta el array y queda aplanado
            console.log(`[i] Parseado: ${i+5}/${urls.length}`)
            await sleep(500);
        }

        console.log(responses[0].results[0].name); // Rick Sanchez

    } catch (error) {
        console.error(`Fetch fallo: ${error}`);
    }
}

normalizar();

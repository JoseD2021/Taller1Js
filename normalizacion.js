
async function normalizar() {
    let main_url = "https://rickandmortyapi.com/api/character/";
    try {
        const response = await fetch(main_url);
        if (!response.ok) {
            console.error(`[-] Request a ${main_url} fallo`);
        }
        let data = await response.json();
        const pages = data.info.pages; // Obtenemos la cantidad de paginas

        const urls = [];
        for (let i=1; i<pages+1; i++) {
            urls.push(`${main_url}?page=${i}`);
        }

        const promesas = urls.map(url => fetch(url));
        const responses = await Promise.all(promesas);

        data = await Promise.all(
            responses.map(r => r.json())
        );
        
        console.log(data);

    } catch (error) {
        console.error(`Fetch fallo: ${error}`);
    }
}

normalizar();
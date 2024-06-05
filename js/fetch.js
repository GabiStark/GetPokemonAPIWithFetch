window.addEventListener("load", async () =>{

    let caja = document.getElementById("entrada");
    let boton = document.getElementById("boton");
    let resultado = document.querySelector(".resultado");

    console.log(caja.value);

    boton.addEventListener("click", async () => {

        let pokemon = await obtenerPokemon(caja.value);

        resultado.innerHTML = imprimirPokemon(pokemon);

    })

})

async function obtenerPokemon(nombre){

    let auxiliar=null;
    await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)

    .then(respuesta => respuesta.json())
    .then(datos => {
        auxiliar=datos;
    })
    .catch(exception => {
        console.log(exception);
    })
    return auxiliar;
}


function imprimirPokemon(pokemon){

    console.log(`imprimir pokemon ${pokemon.name}`)
    let aux = "<div class='pokemon'>"
    let numeroTipos=Object.values(pokemon.types);

    console.log(numeroTipos);

    aux += `<img src="${pokemon.sprites.front_default}">`
    aux += `<p>Nombre: ${pokemon.name}</p>`
    if (numeroTipos.length>1){
        aux += `<p>Tipos: </p>`
        for (let index = 0; index < numeroTipos.length; index++) {
            let impresion = pokemon.types[index].type.name;
            aux += `<p>${impresion}</p>`
        }
    } else {
        aux += `<p>Tipo: ${pokemon.types[0].type.name}</p>`
    }
    aux += "</div>";
    return aux;
}
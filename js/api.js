const url = "https://rickandmortyapi.com/api/character";

let sectionCharacters = document.querySelector('#characters');

function pedirDatos(pNumPag) {
    const descargarPersonajes = new Promise((resolve, reject) => {
        let peticion = new XMLHttpRequest();

        let urlFinal = url + "?page=" + pNumPag;

        peticion.open('GET', urlFinal, true);
        peticion.send();
        peticion.addEventListener('load', (event) => {
            if (event.target.status === 200) {
                let datos = JSON.parse(event.target.responseText);
                //console.log(datos);
                resolve(datos)
            } else {
                reject('No hemos podido conectar con el servidor');
            }
        })
    })
    return descargarPersonajes;
}


function pintarPersonajes(pListPersonajes) {
    sectionCharacters.innerHTML = "";
    pListPersonajes.forEach(character => {

        sectionCharacters.innerHTML += `<article>
        <div>
            <img src="${character.image}">
        </div>
        <h3>${character.name}</h3>
    </article>`

    });
}


let botones = document.getElementsByTagName('button');
let paginaActual = 0;

for (let boton of botones) {
    boton.addEventListener('click', cargarPagina);
}

function cargarPagina(event) {
    if (event.target.innerText === 'Next' && paginaActual < 34) {
        paginaActual++;
    } else if (event.target.innerText === 'Prev' && paginaActual > 1) {
        paginaActual--;
    } else if (paginaActual === 1) {
        paginaActual = 1;
    } else if (paginaActual === 34) {
        paginaActual = 34;
    }
    pedirDatos(paginaActual)
        .then(datos => pintarPersonajes(datos.results))
        .catch(error => console.log(error))
}

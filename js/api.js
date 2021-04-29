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


//let seccionPersonajes = document.getElementById('characters');

function pintarPersonajes(pListPersonajes) {
    sectionCharacters.innerHTML = ""; //esto es para vaciar la seccion y que no se acumulen las 20 fotos.
    pListPersonajes.forEach(character => {

        sectionCharacters.innerHTML += `<article>
        <div>
            <img src="${character.image}">
        </div>
        <h3>${character.name}</h3>
    </article>`

        /* let article = document.createElement('article');
        let div = document.createElement('div');
        let h3 = document.createElement('h3');

        let contentH3 = document.createTextNode(personaje.name);
        let contentdiv = document.createTextNode(`<img src="${personaje.image}"`);

        div.appendChild(contentdiv);
        h3.appendChild(contentH3);

        article.appendChild(div);
        article.appendChild(h3);
        seccionPersonajes.appendChild(article); */
    });
}


//botones de next y prev llamaran a una funcion que suba o baje una pagina el numPag es una variable global.


//botones[0].disabled = true;
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


    //botones[0].disabled = (paginaActual !== 1) ? false : true;
    //botones[1].disabled = (paginaActual !== 34) ? false : true;
    //console.log(paginaActual);
    pedirDatos(paginaActual)
        .then(datos => pintarPersonajes(datos.results))
        .catch(error => console.log(error))
}
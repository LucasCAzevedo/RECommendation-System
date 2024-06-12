var listaGosto = [];
var listaNaoGosto = [];
var listaGosto = JSON.parse(localStorage.getItem('listaGosto')) || [];
var listaNaoGosto = JSON.parse(localStorage.getItem('listaNaoGosto')) || [];

function gosto(element) {
    var valor = element.getAttribute("value");
    
    if (listaNaoGosto.indexOf(valor) !== -1) {
        listaNaoGosto.splice(listaNaoGosto.indexOf(valor), 1);
    }

    if (listaGosto.indexOf(valor) === -1) {
        listaGosto.push(valor);
        console.log("Gêneros de filmes que gosto:", listaGosto);
        localStorage.setItem('listaGosto', JSON.stringify(listaGosto));
        localStorage.setItem('listaNaoGosto', JSON.stringify(listaNaoGosto));
    } else {
        console.log("O gênero já existe na lista de gosto.");
    }
}

function naoGosto(element) {
    var valor = element.getAttribute("value");
    if (listaGosto.indexOf(valor) !== -1) {
        listaGosto.splice(listaGosto.indexOf(valor), 1);
    }

    if (listaNaoGosto.indexOf(valor) === -1) {
        listaNaoGosto.push(valor);
        console.log("Gêneros de filmes que não gosto:", listaNaoGosto);

        localStorage.setItem('listaNaoGosto', JSON.stringify(listaNaoGosto));
        localStorage.setItem('listaGosto', JSON.stringify(listaGosto));

    } else {
        console.log("O gênero já existe na lista de não gosto.");
    }
}

document.addEventListener('DOMContentLoaded', function () {
    function mostrarListas() {
        var listaGostoP = document.createElement('p');
        var listaNaoGostoP = document.createElement('p');

        listaGostoP.textContent = "Gosto: " + listaGosto.join(', ');

        listaNaoGostoP.textContent = "Não Gosto: " + listaNaoGosto.join(', ');

        var listasExibicao = document.getElementById('listasExibicao');
        listasExibicao.innerHTML = '';

        listasExibicao.appendChild(listaGostoP);
        listasExibicao.appendChild(listaNaoGostoP);
    }
    var mostrarListasButton = document.getElementById('mostrarListasButton');
    mostrarListasButton.addEventListener('click', mostrarListas);
});


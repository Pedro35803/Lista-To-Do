import listaTarefas from './script.js';

export default function pesquisar() {
    let texto = document.querySelector("#input_search").value;
    let listaFiltrada = listaTarefas.filter((element) => filterFunction(texto, element));
    retirarElementos(listaTarefas);
    adicionarElementos(listaFiltrada);
}

function filterFunction(value, element) {
    let elementText = element.childNodes[1].value;
    elementText = elementText.toLowerCase();
    if (elementText.indexOf(value.toLowerCase()) != -1) {
        return true;
    }
    return false;
}

function retirarElementos(lista) {
    for (let cont = 0; cont < lista.length; cont++) {
        let element = document.querySelector("#" + lista[cont].id);
        element.classList.add("is-hidden");
    }
}

function adicionarElementos(lista) {
    for (let cont = 0; cont < lista.length; cont++) {
        let element = document.querySelector("#" + lista[cont].id);
        element.classList.remove("is-hidden");
    }
}
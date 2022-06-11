import { inputTextElement } from './script.js'

let listaTarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

export default function pesquisar() {
    let texto = document.querySelector("#entrada-pesquisa").value;
    let listaFiltrada = listaTarefas.filter((elementId) => filterFunction(texto, elementId));
    retirarElementos(listaTarefas);
    adicionarElementos(listaFiltrada);
}

function filterFunction(value, elementID) {
    let elementText = inputTextElement(elementID).value;
    elementText = elementText.toLowerCase();
    if (elementText.indexOf(value.toLowerCase()) != -1) {
        return true;
    }
}

function retirarElementos(lista) {
    for (let cont = 0; cont < lista.length; cont++) {
        let element = document.querySelector("#" + listaTarefas[cont]);
        element.classList.add("ocultarElemento");
    }
}

function adicionarElementos(lista) {
    for (let cont = 0; cont < lista.length; cont++) {
        let element = document.querySelector("#" + lista[cont]);
        element.classList.remove("ocultarElemento");
    }
}
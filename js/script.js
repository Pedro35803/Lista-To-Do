import pesquisar from './search.js';

let listaTarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
let contadorID = 0;

const todasTarefasNaPagina = document.querySelectorAll(".tarefas-texto");

todasTarefasNaPagina.forEach(tarefa => tarefa.addEventListener('blur', (tarefa) => {
    console.log(tarefa);
    atualizarStorage;
}));

document.querySelector("#botao-pesquisa").addEventListener("click", () => pesquisar())
document.querySelector("#entrada-pesquisa").addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        pesquisar();
    }
});

document.querySelector("#adicionar_tarefa").addEventListener('click', () => {    
    contadorID += 1;
    adicionarTarefaNaPagina();
});

document.querySelector("#container-principal-tarefas").addEventListener("click", (event) => {
    const elementoEvento = event.path[0];
    const elementoPai = event.path[1];

    if (elementoEvento.classList.contains("excluir")) {
        excluirTarefa(elementoPai);
    } else if (elementoEvento.classList.contains("editar")) {
        editandoTexto(elementoPai);
    } else if (elementoEvento.classList.contains("tarefas-checkout")) {
        if (elementoEvento.checked) {
            mudarStatusDaTarefa(elementoPai);
            moverContainer(elementoPai, "#container-tarefas-feitas");
        } else {
            mudarStatusDaTarefa(elementoPai);
            moverContainer(elementoPai, "#container-tarefas");
        }
    }
});

function atualizarStorage() {
    localStorage.tarefas = JSON.stringify(listaTarefas);
}

function mudarStatusDaTarefa(containerPai) {
    let text = inputTextElement(containerPai.id);
    text.classList.toggle("text-tarefa-concluida");
}

function moverContainer(container, sectionEntrar) {
    let novaSection = document.querySelector(sectionEntrar);
    container.remove();
    novaSection.appendChild(container);
}

function editandoTexto(containerPai) {
    let text = inputTextElement(containerPai.id);
    text.focus();
}

function excluirTarefa(elementoRemover) {
    elementoRemover.remove();
    listaTarefas.splice(elementoRemover.id, 1);
    atualizarStorage();
}

export function inputTextElement(elementId) {
    let classPathText = "#" + elementId + " .tarefas-texto";
    let elementText = document.querySelector(classPathText);
    return elementText;
}

function adicionarTarefaNaPagina() {
    let main = document.querySelector("#container-tarefas");
    let section = document.createElement("section");
    let checkbox = document.createElement("input");
    let text = document.createElement("input");
    let edit = document.createElement("img");
    let delet = document.createElement("img");
    
    section.id = "tarefa_" + contadorID;

    checkbox.type = "checkbox";
    text.type = "text";

    text.placeholder = "Digite aqui ";

    edit.src = "./img/edit.svg";
    delet.src = "./img/trash.svg";

    edit.alt = "Editar";
    delet.alt = "Excluir";

    section.classList.add("tarefas");
    checkbox.classList.add("tarefas-checkout");
    text.classList.add("tarefas-texto");
    edit.classList.add("tarefas-img", "editar");
    delet.classList.add("tarefas-img", "excluir");
    
    section.appendChild(checkbox);
    section.appendChild(text);
    section.appendChild(edit);
    section.appendChild(delet);
    main.appendChild(section);

    text.focus();
}
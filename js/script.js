import pesquisar from './search.js';

let listaTarefas = [];
let contadorID = listaTarefas.length;

const inputSearch = document.querySelector("#input_search");

// Evento de pesquisa

document.querySelector("#button_search").addEventListener("click", () => pesquisar())

inputSearch.addEventListener("keyup", (event) => {
    const evSpercial = ["Enter", "Backspace"];
    if (evSpercial.indexOf(event.key) != -1 || event.key.length == 1) {
        pesquisar();
    }
});

// Evento de clique no botão que adiciona tarefas

document.querySelector("#adicionar_tarefa").addEventListener('click', () => {    
    contadorID += 1;
    adicionarTarefaNaPagina();
});

// Evento de clique dentro do container-tasks

document.querySelector("#container-main-tarefas").addEventListener("click", (event) => {
    const elementoEvento = event.path[0];
    const elementoPai = event.path[1];

    if (elementoEvento.classList.contains("excluir")) {
        excluirTarefa(elementoPai);
    } else if (elementoEvento.classList.contains("editar")) {
        editandoTexto(elementoPai);
    } else if (elementoEvento.classList.contains("tarefas-checkout")) {
        if (elementoEvento.checked) {
            mudarStatusDaTarefa(elementoPai);
            moverContainer(elementoPai, "#tasks_done");
        } else {
            mudarStatusDaTarefa(elementoPai);
            moverContainer(elementoPai, "#tasks");
        }
    }
});

// Operações que acontecem o container tasks

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

// Excluir a tarefa da lista

function excluirTarefa(elementoRemover) {
    elementoRemover.remove();
    listaTarefas.splice(elementoRemover.id, 1);
}

// Elemento de texto

function inputTextElement(elementId) {
    let classPathText = "#" + elementId + " .tarefas-texto";
    let elementText = document.querySelector(classPathText);
    return elementText;
}

// Criar elemento na pagina

function adicionarTarefaNaPagina() {
    let main = document.querySelector("#tasks");
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
    listaTarefas.push(section);
}

export default listaTarefas; 
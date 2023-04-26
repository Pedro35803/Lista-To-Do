import pesquisar from './search.js';

let listTask = [];

const inputSearch = document.querySelector("#input_search");

// Evento de pesquisa

document.querySelector("#button_search").addEventListener("click", pesquisar)

inputSearch.addEventListener("keyup", (event) => {
    const evSpercial = ["Enter", "Backspace"];

    const keyInEvSpercial = evSpercial.indexOf(event.key) != -1;
    const keyIsCharacterUseful = event.key.length == 1;

    if (keyInEvSpercial || keyIsCharacterUseful) 
        pesquisar();
});

const buttonAddTask = document.querySelector("#adicionar_tarefa");
buttonAddTask.addEventListener('click', addTaskInPage);

// Funções que acontecem ao fazer alguma operação no container task

function changeStatus(task) {
    let text = inputTextElement(task.id);
    text.classList.toggle("text-tarefa-concluida");
}

function toMoveContainer(task, idSection) {
    let newSection = document.querySelector(idSection);
    task.remove();
    newSection.appendChild(task);
}

function handleCheckbox(checkbox, section) {
    if (checkbox.checked) {
        changeStatus(section);
        toMoveContainer(section, "#tasks_done");
    } else {
        changeStatus(section);
        toMoveContainer(section, "#tasks");
    }
}

function editText(textTask) {
    textTask.disabled = false;
    textTask.focus();
}

function deletTask(task) {
    task.remove();
    listTask.splice(task.id, 1);
}

// Elemento de texto

function inputTextElement(elementId) {
    let classPathText = "#" + elementId + " .tarefas-texto";
    let elementText = document.querySelector(classPathText);
    return elementText;
}

// Criar elemento na pagina

function addTaskInPage() {
    let main = document.querySelector("#tasks");
    let section = document.createElement("section");
    let checkbox = document.createElement("input");
    let text = document.createElement("input");
    let edit = document.createElement("img");
    let delet = document.createElement("img");
    
    const newId = listTask.length + 1;
    section.id = "tarefa_" + newId;

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

    checkbox.addEventListener("click", () => handleCheckbox(checkbox, section));
    delet.addEventListener("click", () => deletTask(section));
    text.addEventListener("blur", () => text.disabled = true);
    edit.addEventListener("click", () => editText(text));
    
    section.appendChild(checkbox);
    section.appendChild(text);
    section.appendChild(edit);
    section.appendChild(delet);
    main.appendChild(section);

    text.focus();
    listTask.push(section);
}

export default listTask; 
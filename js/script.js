let contadorID = 0;

document.querySelector("#adicionar_tarefa").addEventListener('click', () => {    
    contadorID += 1;

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

    edit.src = "../img/editar.svg";
    delet.src = "../img/lixeira.svg";

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
});

document.querySelector("#container-tarefas").addEventListener("click", (event) => {
    let elementoEvento = event.path[0];
    let elementoPai = event.path[1];

    if (elementoEvento.classList.contains("excluir")) {
        elementoPai.style.display = "none";
    } else if (elementoEvento.classList.contains("editar")) {
        console.log("editando...");
    } else if (elementoEvento.classList.contains("tarefas-checkout")) {
        if (elementoEvento.checked) {
            tarefaConcluida(elementoPai);
        } else {
            retirarDasTarefaConcluida(elementoPai);
        }
    }
})

function tarefaConcluida(container) {
    let classText = "#" + container.id + " .tarefas-texto";
    let text = document.querySelector(classText);
    text.classList.add("text-tarefa-concluida");
}

function retirarDasTarefaConcluida(container) {
    let classText = "#" + container.id + " .tarefas-texto";
    let text = document.querySelector(classText);
    text.classList.remove("text-tarefa-concluida");
}
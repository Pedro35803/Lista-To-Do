let listaTarefas = ["tarefa_0"];
let contadorID = 0;

document.querySelector("#botao-pesquisa").addEventListener("click", () => pesquisar())
document.querySelector("#entrada-pesquisa").addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        pesquisar();
    }
})

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

    edit.src = "./img/editar.svg";
    delet.src = "./img/lixeira.svg";

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

    listaTarefas.push(section.id);
});

document.querySelector("#container-principal-tarefas").addEventListener("click", (event) => {
    let elementoEvento = event.path[0];
    let elementoPai = event.path[1];

    if (elementoEvento.classList.contains("excluir")) {
        excluirTarefa(elementoPai);
    } else if (elementoEvento.classList.contains("editar")) {
        editandoTexto(elementoPai);
    } else if (elementoEvento.classList.contains("tarefas-checkout")) {
        if (elementoEvento.checked) {
            mudarStatusDaTarefa(elementoPai);
            moverContainer(elementoPai, "#container-tarefas", "#container-tarefas-feitas");
        } else {
            mudarStatusDaTarefa(elementoPai);
            moverContainer(elementoPai, "#container-tarefas-feitas", "#container-tarefas");
        }
    }
});

function mudarStatusDaTarefa(containerPai) {
    let text = inputTextElement(containerPai.id);
    text.classList.toggle("text-tarefa-concluida");
}

function moverContainer(container, sectionSair, sectionEntrar) {
    let velhaSection = document.querySelector(sectionSair);
    let novaSection = document.querySelector(sectionEntrar);
    velhaSection.removeChild(container);
    novaSection.appendChild(container);
}

function editandoTexto(containerPai) {
    let text = inputTextElement(containerPai.id);
    text.focus();
}

function excluirTarefa(containerPai) {
    containerPai.style.display = "none";
    listaTarefas.splice(containerPai.id, 1);
}

function inputTextElement(elementId) {
    let classPathText = "#" + elementId + " .tarefas-texto";
    let elementText = document.querySelector(classPathText);
    return elementText;
}

function pesquisar() {
    let texto = document.querySelector("#entrada-pesquisa").value;
    let listaFiltrada = listaTarefas.filter((elementId) => filterFunction(texto, elementId));
    retirarElementos();
    adicionarElementos(listaFiltrada);
}

function filterFunction(value, elementID) {
    let elementText = inputTextElement(elementID).value;
    if (elementText.indexOf(value) != -1) {
        return true;
    }
}

function retirarElementos() {
    for (let cont = 0; cont < listaTarefas.length; cont++) {
        let element = document.querySelector("#" + listaTarefas[cont]);
        element.style.display = 'none';
    }
}

function adicionarElementos(lista) {
    for (let cont = 0; cont < listaTarefas.length; cont++) {
        let element = document.querySelector("#" + lista[cont]);
        element.style.display = 'flex';
    }
}
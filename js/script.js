document.querySelector("#adicionar_tarefa").addEventListener('click', () => {
    let main = document.querySelector("#container-tarefas");
    let section = document.createElement("section");
    let checkbox = document.createElement("input");
    let text = document.createElement("input");
    let edit = document.createElement("img");
    let delet = document.createElement("img");
    
    section.classList.add("tarefas");
    checkbox.classList.add("tarefas-checkout");
    text.classList.add("tarefas-texto");
    edit.classList.add("tarefas-img");
    delet.classList.add("tarefas-img");

    checkbox.type = "checkbox"
    text.type = "text"

    text.placeholder = "Digite aqui "

    edit.src = "../img/editar.svg"
    delet.src = "../img/lixeira.svg"

    section.appendChild(checkbox);
    section.appendChild(text);
    section.appendChild(edit);
    section .appendChild(delet);
    main.appendChild(section);
})
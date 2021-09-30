document.addEventListener("DOMContentLoaded", function () {
    const boxElements = document.getElementsByClassName("box");
    for (let element of boxElements) {
        element.addEventListener("drop", onDrop, false);
        element.addEventListener("dragover", allowDrop, false);
    }
});

function addCard(phase = 'start') {
    const startBoxElement = document.getElementsByClassName("start");
    const nameElement = document.getElementsByClassName("name");
    const descriptionElement = document.getElementsByClassName("description");
    startBoxElement[0].appendChild(getNewCardNode(nameElement[0].value, descriptionElement[0].value));
}

function getNewCardNode(title, description) {
    const cardNode = document.createElement("div");
    cardNode.classList.add("card");
    cardNode.id = generateId() + "card";
    cardNode.draggable = true;
    cardNode.addEventListener("dragstart", onDragStart);
    const nameNode = document.createElement("h2");
    nameNode.innerText = title;
    const descriptionNode = document.createElement("p");
    descriptionNode.innerText = description;
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    cardNode.appendChild(nameNode);
    cardNode.appendChild(descriptionNode);
    cardNode.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", deleteNode);
    return cardNode;
}

function deleteNode(event) {
    event.target.parentElement.remove();
}

function onDragStart(event) {
    event.dataTransfer.setData("card", event.target.id);
}

function onDrop(event) {
    event.preventDefault();
    const id = event.dataTransfer.getData("card");
    event.currentTarget.appendChild(document.getElementById(id));
}

function allowDrop(event) {
    event.preventDefault();
}

let i = 0;
function generateId() {
    return ++i;
}

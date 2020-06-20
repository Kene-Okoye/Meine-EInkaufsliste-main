// <--- MAIN HTML SELECTORS --->
const trashDiv = document.querySelector(".trash");
const createNewListButton = document.querySelector(".create-list-button");
const newListTeaser = document.querySelector(".create-new-list-teaser");

// <--- CREATE A NEW LIST --->
// 1.) Create global array & variable to store list data.
const rootNode = document.body
const myLists = [];
const deletedStuff = {
    deletedLists: [],
    deletedItems: []
}

// 2.) Add event listner for showing Trash (deleted stuff).
trashDiv.addEventListener("click", showT => {
    deletedStuff.deletedLists.forEach(e => {
        console.log(e.deletedLists);                // ****** SOLVE THIS ISSUE, HOW? ****** //
        showTrash(e);
    });
});


function showTrash(goneList) {
    clearMainBody();
    //console.log(deletedStuff);
    const trashListDiv = document.createElement("div");
    const trashList = goneList.deletedLists;
    //console.log(goneList.deletedLists);
    trashListDiv.innerText = trashList;
    rootNode.appendChild(trashListDiv);
}

// 3.) Add event listner for creating new list.
createNewListButton.addEventListener("click", createNewList);

// 4.) Functions to create new list.
function createNewList() {
    clearMainBody();
    showCreateNewList();
}

function clearMainBody() {
    removeAllChildren(rootNode);
}

function removeAllChildren(node) {
    while (node.lastChild) {
        node.removeChild(node.lastChild);
    }
}

function listObject(objectParameter) {
    return {
        name: objectParameter,
        items: []
    };
}

function showCreateNewList() {
    const newListContainer = document.createElement("div");
    newListContainer.classList.add("new-list-container");
    const listInfoMessage = document.createElement("p");
    listInfoMessage.classList.add("list-info-message");
    listInfoMessage.innerText = "Enter list name";

    const newListInput = document.createElement("input");
    newListInput.classList.add("new-list-input");

    const listBackButton = document.createElement("button");
    listBackButton.classList.add("list-back-button");
    listBackButton.innerText = "Back";
    listBackButton.addEventListener("click", (back) => {
        goBacktoMain();
    });

    const newListButton = document.createElement("button");
    newListButton.classList.add("new-list-button");
    newListButton.innerText = "Create list";
    newListButton.addEventListener("click", (displayList) => {
        if (newListInput.value !== "") {
            const singleList = listObject(newListInput.value);
            myLists.push(singleList);
            window.alert(`${newListInput.value} has been created.`);
            rootNode.removeChild(newListContainer);
            reAttachMainBody()
        }
        else {
            window.alert("Please insert an input.");
        }
    });

    newListContainer.appendChild(listInfoMessage);
    newListContainer.appendChild(newListInput);
    newListContainer.appendChild(listBackButton);
    newListContainer.appendChild(newListButton);
    rootNode.appendChild(newListContainer);
}

function showListOverview(overview) {
    const listContainerDiv = document.createElement("div");
    listContainerDiv.classList.add("list-container-div");
    listContainerDiv.addEventListener("click", listDivHeader => {
        addItemInterface(overview);
    });

    const newListName = document.createElement("h1");
    newListName.classList.add("new-list-name");
    newListName.innerText = overview.name;

    const deleteListButton = document.createElement("button");
    deleteListButton.innerText = "Delete";
    deleteListButton.addEventListener("click", deleteList => {
        deletedStuff.deletedLists.push(overview.name);
        const index = myLists.indexOf(overview);
        myLists.splice(index, 1);
        //findElement(myLists, overview);
        //console.log(myLists);
        //console.log(overview);
        rootNode.removeChild(listContainerDiv);
        rootNode.removeChild(deleteListButton);
    });

    listContainerDiv.appendChild(newListName);
    rootNode.appendChild(listContainerDiv);
    rootNode.appendChild(deleteListButton);
}

function reAttachMainBody() {
    myLists.forEach(listName => {
        showListOverview(listName);
    });
    rootNode.appendChild(trashDiv);
    rootNode.appendChild(newListTeaser);
    rootNode.appendChild(createNewListButton);
}

function goBacktoMain() {
    clearMainBody();
    reAttachMainBody();
}

// <--- ADD ITEMS TO LIST --->
// 1.) Create the Add item interface function 
function addItemInterface(interface) {
    clearMainBody();

    const listHeader = document.createElement("h1");
    listHeader.innerText = interface.name;

    const itemContainerDiv = document.createElement("div");

    const itemBackButton = document.createElement("button");
    itemBackButton.innerText = "Back";
    itemBackButton.addEventListener("click", (goBack) => {
        goBacktoMain();
    });

    const addItemInput = document.createElement("input");
    addItemInput.classList.add("add-item-input");

    const addItemButton = document.createElement("button");
    addItemButton.innerText = "Add item";
    addItemButton.addEventListener("click", item => {
        if (addItemInput.value != "") {
            interface.items.push(addItemInput.value);
            createItem(addItemInput);
        }
        else {
            window.alert("Please add an item.");
        }
    });

    rootNode.appendChild(listHeader);
    rootNode.appendChild(itemBackButton);
    itemContainerDiv.appendChild(addItemInput);
    itemContainerDiv.appendChild(addItemButton);
    rootNode.appendChild(itemContainerDiv);

    interface.items.forEach(reShowItem => { //// -----> SOLVE ISSUE, HOW? <-------
        //console.log(reShowItem);
        //addItemInterface(reShowItem);
    });
}

// 2.) Add functions for creating or adding items.
function createItem(newItem) {

    const shopItemContainer = document.createElement("div");
    shopItemContainer.classList.add("shop-item-container");

    const shopItemDiv = document.createElement("div");
    shopItemDiv.classList.add("shop-item-div");

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item-div");

    const itemCheckBox = document.createElement("input");
    itemCheckBox.setAttribute("type", "checkbox");

    const checkboxLabel = document.createElement("label");
    checkboxLabel.innerText = newItem.value; // ====== Probable Line to look at to figure out issue =====

    const deleteItemButton = document.createElement("button");
    deleteItemButton.innerText = "Delete Item";
    deleteItemButton.addEventListener("click", deleteItem => {
        deletedStuff.deletedItems.push(checkboxLabel.innerText);
        const indexI = myLists.indexOf(newItem);
        // myLists.newItem.splice(index, 1);
        shopItemDiv.removeChild(itemDiv);  //       ------> SOLVE THIS ISSUE, HOW? <------
        // NOTE: This button is also meant to receive an Array.push method & ****shift()****
        // to push/ remove all deleted items into/from a deleted lists and items overview above
    });
    itemDiv.appendChild(itemCheckBox);
    itemDiv.appendChild(checkboxLabel);
    itemDiv.appendChild(deleteItemButton);
    shopItemDiv.appendChild(itemDiv);
    shopItemContainer.appendChild(shopItemDiv);
    rootNode.appendChild(shopItemContainer);

    newItem.value = "";
}
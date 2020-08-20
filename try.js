// <--- MAIN HTML SELECTORS --->
const listNav = document.querySelector(".list-nav");
const trashNav = document.querySelector(".trash-nav");
const feedbackNav = document.querySelector(".feedback-nav");
const helpNav = document.querySelector(".help-nav");
const settingsNav = document.querySelector(".settings-nav");

const createNewListButton = document.querySelector(".create-list-button");
const newListTeaser = document.querySelector(".create-new-list-teaser");
const wrapperDiv = document.querySelector(".wrapper");
const mainDiv = document.querySelector(".main-div");

// ADDING CURRENT DATE TO APP --->
var dateString = new Date();
dateString = new Date(dateString).toUTCString();
dateString = dateString.split(' ').slice(0, 4).join(' ');
const dateDisplay = document.querySelector(".main-nav-date");
dateDisplay.innerHTML = dateString

// <--- EVENT LISTENER FOR NAV --->
listNav.addEventListener("click", listNavShow => {
    clearMainDiv();
    reAttachMainBody()
});

feedbackNav.addEventListener("click", blankMessage);
helpNav.addEventListener("click", blankMessage);
settingsNav.addEventListener("click", blankMessage);

function blankMessage() {
    clearMainDiv();
    const blankMsgDiv = document.createElement("div");
    blankMsgDiv.classList.add("blank-msg-div");
    const blankMsgImg = document.createElement("div");
    blankMsgImg.classList.add("blank-msg-img");
    const blankMsg = document.createElement("p")
    blankMsg.classList.add("blank-msg");
    blankMsg.innerHTML = "OOPS," + "<br />" + "... nothing to see here.";

    blankMsgDiv.appendChild(blankMsgImg);
    blankMsgDiv.appendChild(blankMsg);
    mainDiv.appendChild(blankMsgDiv);
}

// <--- EVENT LISTENER FOR REDISPLAYING LISTS ---> 
document.addEventListener('DOMContentLoaded', reAttachMainBody);

// <--- SETUP DATA STORAGE AREA --->
// 1.) Create global array & variables to store list data.
const rootNode = document.body

// 2.) Implement condition to save myLists to Local Storage ('listInLocal')
let listIntoLocal;
if (localStorage.getItem("listIntoLocal")) {
    listIntoLocal = JSON.parse(localStorage.getItem("listIntoLocal"));
}
else {
    listIntoLocal = [];
}
localStorage.setItem("listIntoLocal", JSON.stringify(listIntoLocal));
const listFromLocal = JSON.parse(localStorage.getItem('listIntoLocal'))

// 3.) Implement condition to push deleted Lists to Local Storage ('deletedStuff')
let deletedStuff;
if (localStorage.getItem("deletedStuff")) {
    deletedStuff = JSON.parse(localStorage.getItem("deletedStuff"));
}
else {
    deletedStuff = [];
}
localStorage.setItem("deletedStuff", JSON.stringify(deletedStuff));
const trash = JSON.parse(localStorage.getItem('deletedStuff'))

// <--- CREATE A NEW LIST --->
// 1.) Add event listner for creating new list.
createNewListButton.addEventListener("click", createNewList);

// 2.) Implement functions to create new list.
function createNewList() {
    clearMainDiv();
    createNewListInterface();
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

function createNewListInterface() {
    const newListContainerDiv = document.createElement("div");
    newListContainerDiv.classList.add("new-list-container-div");
    const newListContainer = document.createElement("div");
    newListContainer.classList.add("new-list-container");
    const listNameBack = document.createElement("div");
    listNameBack.classList.add("list-name-back");
    const listInfoMessage = document.createElement("p");
    listInfoMessage.classList.add("list-info-message");
    listInfoMessage.innerText = "Enter list name";

    const listInputCreate = document.createElement("div");
    listInputCreate.classList.add("list-input-create");
    const newListInput = document.createElement("input");
    newListInput.classList.add("new-list-input");

    const listBackButton = document.createElement("button");
    listBackButton.classList.add("list-back-button");
    listBackButton.innerHTML = '<i class="fas fa-arrow-circle-left"></i>';
    listBackButton.addEventListener("click", (back) => {
        clearMainDiv();
        reAttachMainBody();
    });

    const newListButton = document.createElement("button");
    newListButton.classList.add("new-list-button");
    newListButton.innerText = "Create list";
    newListButton.addEventListener("click", (displayList) => {
        if (newListInput.value !== "") {
            const singleList = listObject(newListInput.value);
            listFromLocal.push(singleList);
            localStorage.setItem("listIntoLocal", JSON.stringify(listFromLocal));
            window.alert(`${newListInput.value} has been created.`);
            clearMainDiv();
            reAttachMainBody();
        }
        else {
            window.alert("Please insert an input.");
        }
    });

    listNameBack.appendChild(listInfoMessage);
    listNameBack.appendChild(listBackButton);
    newListContainer.appendChild(listNameBack);
    listInputCreate.appendChild(newListInput);
    listInputCreate.appendChild(newListButton);
    newListContainer.appendChild(listInputCreate);
    newListContainerDiv.appendChild(newListContainer);
    mainDiv.appendChild(newListContainerDiv);
}

function showListOverview(overview) {
    const listContainerDiv = document.createElement("div");
    listContainerDiv.classList.add("list-container-div");

    const newListNameDiv = document.createElement("div");
    newListNameDiv.classList.add("new-list-name-div");

    const newListName = document.createElement("h2");
    newListName.classList.add("new-list-name");
    newListName.innerText = overview.name;
    newListName.addEventListener("click", listDivHeader => {
        addItemInterface(overview);
    });

    const deleteListButton = document.createElement("button");
    deleteListButton.classList.add("delete-list-button");
    deleteListButton.innerHTML = '<i class="fas fa-trash-alt"></i>';

    deleteListButton.addEventListener("click", deleteList => {
        trash.push(overview);
        localStorage.setItem("deletedStuff", JSON.stringify(trash));
        const ListIndex = listFromLocal.indexOf(overview);
        listFromLocal.splice(ListIndex, 1);
        localStorage.setItem("listIntoLocal", JSON.stringify(listFromLocal));
        mainDiv.removeChild(listContainerDiv);
        newListNameDiv.removeChild(deleteListButton);
    });

    newListNameDiv.appendChild(newListName);
    newListNameDiv.appendChild(deleteListButton);
    listContainerDiv.appendChild(newListNameDiv);
    mainDiv.appendChild(listContainerDiv);
}

function reAttachMainBody() {
    mainDiv.appendChild(newListTeaser);
    mainDiv.appendChild(createNewListButton);
    listFromLocal.forEach(listName => {
        showListOverview(listName);
    });
}

function goBacktoMain() {
    clearMainBody();
    reAttachMainBody();
}

// <--- ADD ITEMS TO LIST --->
// 1.) Create the Add item interface function 
function addItemInterface(interface) {
    clearMainDiv();

    const listHeader = document.createElement("h1");
    listHeader.classList.add("list-header")
    listHeader.innerText = interface.name;

    const itemContainerDiv = document.createElement("div");
    itemContainerDiv.classList.add("item-container-div")

    const inputDiv = document.createElement("div");
    inputDiv.classList.add("input-div");

    const addItemInput = document.createElement("input");
    addItemInput.classList.add("add-item-input");
    addItemInput.placeholder = "Add item";

    const addItemButton = document.createElement("button");
    addItemButton.classList.add("add-item-button");
    addItemButton.innerHTML = '<i class="fas fa-plus-circle"></i>';
    addItemButton.addEventListener("click", item => {
        if (addItemInput.value != "") {
            interface.items.push(addItemInput.value);
            localStorage.setItem("listIntoLocal", JSON.stringify(listFromLocal));
            createItem(addItemInput.value);
            addItemInput.value = "";
        }
        else {
            window.alert("Please add an item.");
        }
    });

    inputDiv.appendChild(addItemInput);
    inputDiv.appendChild(addItemButton);
    itemContainerDiv.appendChild(inputDiv);
    mainDiv.appendChild(itemContainerDiv);
    mainDiv.appendChild(listHeader);

    // 2.) Add function for creating or adding items.
    function createItem(newItem) {

        const shopItemContainer = document.createElement("div");
        shopItemContainer.classList.add("shop-item-container");

        const shopItemDiv = document.createElement("div");
        shopItemDiv.classList.add("shop-item-div");

        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item-div");

        const itemCheckBox = document.createElement("input");
        itemCheckBox.setAttribute("type", "checkbox");
        itemCheckBox.classList.add("item-check-box");
        itemCheckBox.addEventListener("click", lineCheck => {
            if (checkboxLabel.style.textDecoration === "line-through") {
                checkboxLabel.style.textDecoration = "none";
            } else {
                checkboxLabel.style.textDecoration = "line-through";
            }
        });

        const addInputValue = document.querySelector(".add-item-input");
        const checkboxLabel = document.createElement("label");
        checkboxLabel.classList.add("checkbox-label");
        checkboxLabel.innerText = newItem;

        const deleteItemButton = document.createElement("button");
        deleteItemButton.classList.add("delete-item-button");
        deleteItemButton.innerHTML = '<i class="fas fa-trash-alt"></i>'
        deleteItemButton.addEventListener("click", deleteItem => {
            const ItemIndex = itemDiv.children[1].innerText;
            interface.items.splice(interface.items.indexOf(ItemIndex), 1);
            localStorage.setItem("listIntoLocal", JSON.stringify(listFromLocal));
            mainDiv.removeChild(shopItemContainer);
        });
        itemDiv.appendChild(itemCheckBox);
        itemDiv.appendChild(checkboxLabel);
        itemDiv.appendChild(deleteItemButton);
        shopItemDiv.appendChild(itemDiv);
        shopItemContainer.appendChild(shopItemDiv);
        mainDiv.appendChild(shopItemContainer);
    }

    // 3. Maintain redisplay of each item even after going back to main page
    interface.items.forEach(reShowItem => {
        createItem(reShowItem);
    });
}

// <--- DELETE A CREATED LIST --->
// 1.) Add event listner for showing Trash (deleted stuff).
// Function to remove all children in main Div
function clearMainDiv(mainDivChildren) {
    while (mainDiv.lastChild) {
        mainDiv.removeChild(mainDiv.lastChild);
    }
}
trashNav.addEventListener("click", showTrash => {
    clearMainDiv();
    trash.forEach(trashToList => {
        trashDisplay(trashToList);
    });
});

// 2.) Implement function to restore or totally delete a list from the trash.
function trashDisplay(goneList) {
    const trashContainerDiv = document.createElement("div");
    trashContainerDiv.classList.add("trash-container-div");
    const trashListDiv = document.createElement("div");
    trashListDiv.classList.add("trash-list-div");

    const trashListName = document.createElement("h2");
    trashListName.classList.add("trash-list-name");
    trashListName.innerText = goneList.name;
    const restoreListButton = document.createElement("button");
    restoreListButton.classList.add("restore-list-button");
    restoreListButton.innerHTML = '<i class="fas fa-trash-restore-alt"></i>';
    restoreListButton.addEventListener("click", trashAgain => {
        listFromLocal.push(goneList);
        localStorage.setItem("listIntoLocal", JSON.stringify(listFromLocal));
        const deletedListIndex = trash.indexOf(goneList);
        trash.splice(deletedListIndex, 1);
        localStorage.setItem("deletedStuff", JSON.stringify(trash));
        trashContainerDiv.removeChild(trashListDiv);
    })
    const removeFromTrashButton = document.createElement("button");
    removeFromTrashButton.classList.add("remove-from-trash-button");
    removeFromTrashButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    removeFromTrashButton.addEventListener("click", listRemove => {
        const trashIndex = trash.indexOf(goneList);
        trash.splice(trashIndex, 1);
        localStorage.setItem("deletedStuff", JSON.stringify(trash));
        trashListDiv.removeChild(restoreListButton);
        trashListDiv.removeChild(removeFromTrashButton);
        trashContainerDiv.removeChild(trashListDiv);
    });

    trashListDiv.appendChild(trashListName);
    trashListDiv.appendChild(restoreListButton);
    trashListDiv.appendChild(removeFromTrashButton);
    trashContainerDiv.appendChild(trashListDiv);
    mainDiv.appendChild(trashContainerDiv);
}

// Add a condition to check & display a message depending on 
//if any list has been created
/*function tryMainDiv() {
    if (document
        .querySelector(".main-div")
        .querySelectorAll(".list-container-div").length > 0) {
        const createNewListIcon = document.createElement("button")
        createNewListIcon.classList.add("create-new-list-icon");
        createNewListIcon.innerHTML = '<i class="fas fa-plus-circle"></i>';
        createNewListIcon.addEventListener("click", createNewList);
        mainDiv.appendChild(createNewListIcon);
    }
    else {
        const newListTeaser = document.createElement("p");
        newListTeaser.classList.add("create-new-list-teaser");
        newListTeaser.innerHTML = "Create your new list" + "<br />" + "and let's get shopping.";
        const createNewListButton = document.createElement("button");
        createNewListButton.innerText = "CREATE NEW LIST";
        mainDiv.appendChild(newListTeaser);
        mainDiv.appendChild(createNewListButton);
        createNewListButton.addEventListener("click", createNewList);
    }
}*/




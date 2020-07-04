// <--- MAIN HTML SELECTORS --->
const trashDiv = document.querySelector(".trash");
const createNewListButton = document.querySelector(".create-list-button");
const newListTeaser = document.querySelector(".create-new-list-teaser");


// <--- SETUP DATA STORAGE AREA --->
// 1.) Create global array & variables to store list data.
const rootNode = document.body
let myLists = [];
const deletedStuff = [];

// 2.) Implement condition to save myLists to Local Storage
let listIntoLocal;
if (localStorage.getItem("listIntoLocal")) {
    listIntoLocal = JSON.parse(localStorage.getItem("listIntoLocal"));
}
else {
    listIntoLocal = [];
}

localStorage.setItem("listIntoLocal", JSON.stringify(myLists));
const listFromLocal = JSON.parse(localStorage.getItem('listIntoLocal'))

// <--- CREATE A NEW LIST --->
// 1.) Add event listner for creating new list.
createNewListButton.addEventListener("click", createNewList);

// 2.) Implement functions to create new list.
function createNewList() {
    clearMainBody();
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
            localStorage.setItem("listIntoLocal", JSON.stringify(myLists));
            window.alert(`${newListInput.value} has been created.`);
            rootNode.removeChild(newListContainer);
            console.log(listFromLocal)
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
        deletedStuff.push(overview);
        const ListIndex = listFromLocal.indexOf(overview); // myList replaced
        listFromLocal.splice(ListIndex, 1);                      // myList replaced
        rootNode.removeChild(listContainerDiv);
        rootNode.removeChild(deleteListButton);
    });

    listContainerDiv.appendChild(newListName);
    rootNode.appendChild(listContainerDiv);
    rootNode.appendChild(deleteListButton);
}

function reAttachMainBody() {
    listFromLocal.forEach(listName => {
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
            createItem(addItemInput.value);
            addItemInput.value = "";
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

        const addInputValue = document.querySelector(".add-item-input");
        const checkboxLabel = document.createElement("label");
        checkboxLabel.innerText = newItem;

        const deleteItemButton = document.createElement("button");
        deleteItemButton.innerText = "Delete Item";
        deleteItemButton.addEventListener("click", deleteItem => {

            const ItemIndex = itemDiv.children[1].innerText;
            interface.items.splice(interface.items.indexOf(ItemIndex), 1);
            shopItemDiv.removeChild(itemDiv);
        });
        itemDiv.appendChild(itemCheckBox);
        itemDiv.appendChild(checkboxLabel);
        itemDiv.appendChild(deleteItemButton);
        shopItemDiv.appendChild(itemDiv);
        shopItemContainer.appendChild(shopItemDiv);
        rootNode.appendChild(shopItemContainer);
    }

    // 3. Maintain redisplay of each item even after going back to main page
    interface.items.forEach(reShowItem => {
        createItem(reShowItem);
    });
}

// <--- DELETE A CREATED LIST --->
// 1.) Add event listner for showing Trash (deleted stuff).
trashDiv.addEventListener("click", showTrash => {
    clearMainBody();
    const trashBackButton = document.createElement("button");
    trashBackButton.innerText = "Back";
    trashBackButton.addEventListener("click", (back) => {
        goBacktoMain();
    });
    deletedStuff.forEach(trash => {
        trashDisplay(trash);
    });
    rootNode.appendChild(trashBackButton);
});

// 2.) Implement function to delete a list.
function trashDisplay(goneList) {
    const trashListDiv = document.createElement("div");
    trashListDiv.innerText = goneList.name;
    const restoreListButton = document.createElement("button");
    restoreListButton.innerText = "Restore list"
    restoreListButton.addEventListener("click", trashAgain => {
        myLists.push(goneList);
        const deletedListIndex = deletedStuff.indexOf(goneList);
        deletedStuff.splice(deletedListIndex, 1);
        rootNode.removeChild(trashListDiv);
        rootNode.removeChild(restoreListButton);
    })
    rootNode.appendChild(restoreListButton);
    rootNode.appendChild(trashListDiv);
}

// 4. Create a function to save my Lists to Local Storage
/*function SaveToLocalStorage(lists) {
    if (localStorage.getItem("myLocalLists" === null)) {
        myLists = [];
    }
    else {
        myLists = JSON.parse(localStorage.getItem("myLists"));
    }
    myLists.push(lists);
    localStorage.setItem("myLocalLists", JSON.stringify(myLists));
}*/

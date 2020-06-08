// <--- MAIN HTML SELECTORS --->
const createNewListButton = document.querySelector(".create-list-button");
const newListTeaser = document.querySelector(".create-new-list-teaser");

// <--- CREATE A NEW LIST --->
// 1.) Create global array & variable to store list data.
const myLists = [];
let allList;

// 2.) Add event listner for creating new list.
createNewListButton.addEventListener("click", createNewList);

// 3.) FUnctions to create new list.
function createNewList() {
    hidecreateNewList();
    showCreateNewList();
}

function hidecreateNewList() {
    document.body.removeChild(newListTeaser);
    document.body.removeChild(createNewListButton);
    document.querySelectorAll('.list-div-container').forEach(e => {
        e.remove();
    });
}

function showCreateNewList() {
    const newListContainer = document.createElement("div");
    newListContainer.classList.add("new-list-container");
    const listInfoMessage = document.createElement("p");
    listInfoMessage.classList.add("list-info-message");
    listInfoMessage.innerText = "Enter list name";

    const newListInput = document.createElement("input");
    newListInput.classList.add("new-list-input");

    const newListButton = document.createElement("button");
    newListButton.classList.add("new-list-button");
    newListButton.innerText = "Create list";
    newListButton.addEventListener("click", (displayList) => {
        const singleList = {
            name: newListInput.value,
            items: []
        };
        if (newListInput.value !== "") {
            myLists.push(singleList);
            allList = singleList;
            console.log(allList.name);
            const listContainerDiv = document.createElement("div");
            listContainerDiv.classList.add("list-div-container");
            const newListName = document.createElement("h1");
            newListName.classList.add("new-list-name");
            newListName.innerText = allList.name;
            listContainerDiv.appendChild(newListName);
            document.body.appendChild(listContainerDiv);
            document.body.removeChild(newListContainer);
            document.body.appendChild(newListTeaser);
            document.body.appendChild(createNewListButton);
            //newListName.contentEditable = true;
            window.alert(`${newListInput.value} has been created.`);
        }
        else {
            window.alert("Please insert an input.");
        }
    });
    newListContainer.appendChild(listInfoMessage);
    newListContainer.appendChild(newListInput);
    newListContainer.appendChild(newListButton);
    document.body.appendChild(newListContainer);
}

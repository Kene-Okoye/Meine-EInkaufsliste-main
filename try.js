// <--- SELECTORS --->
const createNewListButton = document.querySelector(".create-list-button");
const newListTeaser = document.querySelector(".create-new-list-teaser");
const myLists = [];
createNewListButton.addEventListener("click", createNewList);
function createNewList() {
    document.body.removeChild(createNewListButton);
    document.body.removeChild(newListTeaser);
    const newListContainer = document.createElement("div");
    const listInfoMessage = document.createElement("p");
    listInfoMessage.innerText = "Enter list name";
    const newListInput = document.createElement("input");
    const newListButton = document.createElement("button");
    newListButton.innerText = "Create list";
    newListContainer.appendChild(listInfoMessage);
    newListContainer.appendChild(newListInput);
    newListContainer.appendChild(newListButton);
    document.body.appendChild(newListContainer);
    newListButton.addEventListener("click", (displayList) => {
        const singleList = {
            name: newListInput.value,
            items: []
        };
        if (newListInput.value !== "") {
            myLists.push(singleList);
            //console.log(myLists);
            const listContainerDiv = document.createElement("div");
            const newListName = document.createElement("h1");
            newListName.innerText = singleList.name;
            listContainerDiv.appendChild(newListName);
            document.body.appendChild(listContainerDiv);
            document.body.removeChild(newListContainer);
            document.body.appendChild(newListTeaser);
            document.body.appendChild(createNewListButton);
            newListName.contentEditable = true;
            window.alert(`${newListInput.value} has been created.`);
        }
        else {
            window.alert("Please insert an input.");
        }
    });
}
/* const docContainer = document.querySelector(".DOC-container");


// <--- GLOBAL VARIABLES --->


// <--- GLOBAL FUNCTIONS CALLS --->
createNewList();

// < --- GLOBAL FUNCTION DEFINITIONS --->
function createNewList() {
    // 1.) Create elements needed for NEW LIST
    const newListInput = document.createElement("input");
    const newListButton = document.createElement("button");
    newListButton.innerText = "Create list";
    // 2.) Attach them to the DOC-container
    docContainer.appendChild(newListInput);
    docContainer.appendChild(newListButton);

    // 3.) Display list NAME on DOC-container on click
    // Add an event lister
    newListButton.addEventListener("click", (displayList) => {
        // 2b.) Ensure a user inserts an input before creating the NEW LIST then
        // remove all other elements and show only NEW LIST attached
        // to LIST-DIV-CONTAINER
        if (newListInput.value !== "") {
            docContainer.removeChild(newListInput);
            docContainer.removeChild(newListButton);
            window.alert(`${newListInput.value} has been created.`);
            createNewList();
        }
        else {
            window.alert("Please insert an input.");
        }
        // 2a.) Display the created NEW LIST
        const listContainerDiv = document.createElement("div");
        const newList = document.createElement("div");
        newList.innerText = newListInput.value;
        listContainerDiv.appendChild(newList);
        docContainer.appendChild(listContainerDiv);

        // 3.) Edit list after its created by clicking on LIST name
        // Add an event lister
        newList.addEventListener("click", (editList) => {
            newList.contentEditable = true;
        });
    });
} */
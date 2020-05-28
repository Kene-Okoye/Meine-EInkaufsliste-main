// <--- SELECTORS --->
const DocContainer = document.querySelector(".DOC-container");

// <--- GLOBAL EVENT LISTENERS --->


// <--- GLOBAL FUNCTIONS CALLS --->
createNewList();

// <--- GLOBAL VARIABLES --->

// < --- GLOBAL FUNCTION DEFINITIONS --->
function createNewList() {
    // 1.) Create elements needed for NEW LIST
    const NewListInput = document.createElement("input");
    NewListInput.classList.add("new-list-input");
    const NewListButton = document.createElement("button");
    NewListButton.classList.add("new-list-button");
    NewListButton.innerText = "Create list";

    // 2.) Attach them to the DOC-container
    DocContainer.appendChild(NewListInput);
    DocContainer.appendChild(NewListButton);
    // 3.) Display list NAME on DOC-container on click
    // Add an event lister
    NewListButton.addEventListener("click", displayList);
    function displayList() {
        // 3a.) Display the created NEW LIST
        const listContainerDiv = document.createElement("div");
        listContainerDiv.classList.add("list-container-div");
        const NewList = document.createElement("div");
        NewList.classList.add("new-list");
        NewList.innerText = NewListInput.value;
        listContainerDiv.appendChild(NewList);
        DocContainer.appendChild(listContainerDiv);
        // 3b.) Remove all other elements and show only NEW LIST attached to LIST-DIV-CONTAINER
        DocContainer.removeChild(NewListInput);
        DocContainer.removeChild(NewListButton);
        // 4.) Edit list after its created by clicking on LIST name
        // Add an event lister
        NewList.addEventListener("click", editList);
        function editList() {
            this.contentEditable = true;
        }
    }
    createListItems();
}

function createListItems() {
    // Create all elements for ITEMS slection
    const inputArea = document.createElement("div");
    inputArea.classList.add("input-area");
    const listInput = document.createElement("input");
    listInput.classList.add("list-input");
    const inputButton = document.createElement("button");
    inputButton.classList.add("input-button");
    inputButton.innerText = "Add item"
    const shoplistDiv = document.createElement("div");
    shoplistDiv.classList.add("shoplist-div");
    const shoplistContainer = document.createElement("div");
    shoplistContainer.classList.add("shoplist-div");

    // Join all / Attach all children to parents accordingly
    inputArea.appendChild(listInput);
    inputArea.appendChild(inputButton);
    DocContainer.appendChild(inputArea);
    DocContainer.appendChild(shoplistContainer);
    DocContainer.appendChild(shoplistDiv);

    // add an event listener
    inputButton.addEventListener("click", listElements);
    // function for creating list items
    function listElements() {

        // 1.) Create the DIV elements for the list
        const listDiv = document.createElement("div");
        listDiv.classList.add("list-div");

        // 2.) Create the CHECKBOX input elements
        const checkboxInput = document.createElement("input");
        checkboxInput.classList.add("checkbox-input");
        checkboxInput.setAttribute("type", "checkbox");
        //checkboxInput.setAttribute("id", "checkbox-id");

        // 3.) Create the LABEL for the input Elements
        const checkboxLabel = document.createElement("label");
        checkboxLabel.classList.add("checkbox-label");
        //checkboxLabel.setAttribute("for", "checkbox-id");
        checkboxLabel.innerText = listInput.value;

        // 4.) Create the DELETE-INPUT 
        const deleteInput = document.createElement("button");
        deleteInput.classList.add("delete-input");
        deleteInput.innerHTML = "delete" //'<i class="fas fa-trash-alt"></i>';

        // 5.) Attach all children to parents accordingly
        listDiv.appendChild(checkboxInput);
        listDiv.appendChild(checkboxLabel);
        listDiv.appendChild(deleteInput);
        shoplistDiv.appendChild(listDiv);


        // 6.) Delete the listInput
        listInput.value = "";

        deleteInput.addEventListener("click", artikelLoeschen);
        function artikelLoeschen() {
            shoplistDiv.removeChild(listDiv);
        }
    }

}




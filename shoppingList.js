// <--- SELECTORS --->
const listInput = document.querySelector(".list-input");
const inputButton = document.querySelector(".input-button");
const shoplistDiv = document.querySelector(".shoplist-div");

// <--- EVENT LISTENERS --->
inputButton.addEventListener("click", listElements);


// <--- FUNCTIONS --->
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
    deleteInput.innerHTML = '<i class="fas fa-trash-alt"></i>';

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

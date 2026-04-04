const allTrees = document.getElementById("allTrees");
const treeForm = document.getElementById("treeForm");


document.getElementById("treeForm").addEventListener("submit", function(event){
    event.preventDefault();
    createNewTree();

})
function openNewTreeForm() {
    treeForm.style.display = "block";
}

function abortNewTree() {
    treeForm.style.display = "none";
}

function createNewTree(){
    const treeName = document.getElementById("treeName").value;
    if (treeName == null){
        return;
    }

    // sends the request to server and applies the addHTMLelemnt function to save it in frontend
    sendTreeToServer(treeName);

}

function addHTMLElement(name, id){
    const tree = document.createElement("div");
    tree.classList.add("tree");
    tree.dataset.treeId = id;

    tree.innerHTML = `<li> <button onclick="getTree(this)">${name}</button></li>`; // funktion die alle daten holt aus der database

    allTrees.querySelector("ul").appendChild(tree);
    treeForm.style.display = "none";
    document.getElementById("treeName").value = "";

    cardContainer.innerHTML = "";



}

function sendTreeToServer(treeName){

    const Tree = {
        name : treeName
    };

    // sende die Informationen zum Server
    fetch("/editorNewTree", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(Tree)
    })
        .then(response => response.text())
        .then(data => {

            treeId = parseInt(data);
            setCurrentTreeID(treeId);
            addHTMLElement(treeName, treeId);
            const button = document.querySelector(`.tree[data-tree-id="${treeId}"] button`);
            highlightTree(button);

        })
        .catch(err => console.error(err));
}



function innitTrees(trees){
    trees.forEach(
        tree => {
            addHTMLElement(tree.name, tree.id);
        }
    )
}

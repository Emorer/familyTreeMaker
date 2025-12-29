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
    // check for name if already exist
    // add to database / create new table
    //
    addHTMLElement(treeName);

}

function addHTMLElement(name){
    const tree = document.createElement("div");
    tree.classList.add("tree");
    tree.innerHTML = `<li> <button onclick="getTree()">${name}</button></li>`; // funktion die alle daten holt aus der database

    allTrees.querySelector("ul").appendChild(tree);
    treeForm.style.display = "none";
    document.getElementById("treeName").value = "";

}
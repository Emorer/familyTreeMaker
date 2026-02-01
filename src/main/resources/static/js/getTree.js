// diese file holt alle von einer bestimmten tabelle (datenbank) alle karten und platziert sie an den Positionen

// noch welche id gerade benutzt wird
function getTree(button){
    // check if already loaded
    const treeId =  button.closest(".tree").dataset.treeId;
    console.log(treeId + "die treeid")

    if (treeId === currentTreeID){// check if tree is already loaded
        return
    }
    else{
        setCurrentTreeID(treeId)
    }

    document.getElementById("cardContainer").innerHTML = "";



    const treeData= {
        id : treeId
    };
    fetch("/editorTree", {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body:JSON.stringify(treeData)
        })
        .then(response => response.json())
        .then(tree => {
            console.log("Antwort: ", tree);
            tree.forEach(person => {
                insertPerson(person);
            });

        })

        .catch(err => console.error(err));

}

function insertPerson(person){
    let id = person.id;
    let name = person.name;
    let surname = person.surname;
    let age = person.age;
    let birth = person.birth;
    let place = person.placeOfBirth;
    let posX = person.posX;
    let posY = person.posY;



    // create the element
    const card = document.createElement("div"); // erstelle eine div
    card.classList.add("card") // mit der Klasse card
    card.id = id;


    // set the info
    card.innerHTML = `
            <div class="label">Name</div><div class="colon">:</div><div class="value">${name}</div>
            <div class="label">Surname</div><div class="colon">:</div><div class="value">${surname}</div>
            <div class="label">Age</div><div class="colon">:</div><div class="value">${age}</div>
            <div class="label">Birthyear</div><div class="colon">:</div><div class="value">${birth}</div>
            <div class="label">Place of Birth</div><div class="colon">:</div><div class="value">${place}</div>
            `;

    // set the position
    card.style.top = posY + "px";
    card.style.left = posX + "px";
    //füge das Element (also die Karte) dem CardContainer zu
    document.getElementById("cardContainer").appendChild(card);
    makeDraggable(card);
}
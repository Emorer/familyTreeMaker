document.getElementById("editForm").addEventListener("submit", function (event){
    event.preventDefault();
    editCard();
})




function connectToSpouse(){
    const tempLine = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    tempLine.setAttribute("stroke", "black");
    tempLine.setAttribute("fill", "none");
    cardContainer.querySelector("svg").appendChild(tempLine);

    document.addEventListener("pointermove", startLineSpouse);
    document.addEventListener("pointerdown", spouseSelected);

    const point = getCardCenter(selectedCard);

    function startLineSpouse(e){
        const secondPoint = getScreenCoordFromWorld(e);
        tempLine.setAttribute("points", `${point.x},${point.y} ${secondPoint.x},${secondPoint.y}`);
    }

    function spouseSelected(e){
        tempLine.remove(); // temporäre Linie immer entfernen
        const targetCard = checkIfSpouseWithin(e);
        // todo check if already connected
        if (targetCard) {
            if (!isSpouse( selectedCard, targetCard)){
                spouseconnection = new SpouseConnection(selectedCard, targetCard);
                Spouses.push(spouseconnection); // fertige Verbindung erstellen
                saveConnections(spouseconnection)
            }

        }

        document.removeEventListener("pointermove", startLineSpouse);
        document.removeEventListener("pointerdown", spouseSelected);
        selectedCard = null;
    }
}

function checkIfSpouseWithin(e){
    const element = document.elementFromPoint(e.clientX, e.clientY);
    console.log(element);
    const card = element.closest(".card");

    if (!card) return null;
    if (card === selectedCard) return null;

    return card;
}
// takes the spouseConn as input
function connectToChild(spouseConn){
    const tempLine = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    tempLine.setAttribute("stroke", "black");
    tempLine.setAttribute("fill", "none");
    cardContainer.querySelector("svg").appendChild(tempLine);

    document.addEventListener("pointermove", startChildConnection);
    document.addEventListener("pointerdown", childSelected);

    function startChildConnection(e){
        const secondPoint = getScreenCoordFromWorld(e);
        tempLine.setAttribute("points", `${spouseConn.circleX},${spouseConn.circleY} ${secondPoint.x},${secondPoint.y}`);
    }

    function childSelected(e){
        tempLine.remove();
        const targetCard = checkIfSpouseWithin(e); //
        if (targetCard) {
            if(!isChild(targetCard, spouseConn)){
                parentChildConn = new ParentToChildConn(spouseConn, targetCard);
                Children.push(parentChildConn);
                saveChildConnection(parentChildConn);
            }
        }
        document.removeEventListener("pointermove", startChildConnection);
        document.removeEventListener("pointerdown", childSelected);
        selectedCard = null;
    }
}
function connectToParent(){
    isConnecting = true;
    const tempLine = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    tempLine.setAttribute("stroke", "black");
    tempLine.setAttribute("fill", "none");
    cardContainer.querySelector("svg").appendChild(tempLine);

    document.addEventListener("pointermove", startLineParent);
    document.addEventListener("pointerdown", parentSelected);

    const point = getCardCenter(selectedCard);

    function startLineParent(e){
        const secondPoint = getScreenCoordFromWorld(e);
        tempLine.setAttribute("points", `${point.x},${point.y} ${secondPoint.x},${secondPoint.y}`);
    }
    function parentSelected(e){
        tempLine.remove();
        const circle = checkIfWithinSpouseCircle(e);
        thisSpouseConn = circle._instance;
        if(circle){
            if(!isChild(selectedCard, thisSpouseConn)){
                parentChildConn = new ParentToChildConn(thisSpouseConn, selectedCard);
                Children.push(parentChildConn);
                saveChildConnection(parentChildConn);
            }
        }
        document.removeEventListener("pointermove", startLineParent);
        document.removeEventListener("pointerdown", parentSelected);
        selectedCard = null;
        isConnecting = false;

    }
}

function checkIfWithinSpouseCircle(e){
    const element = document.elementFromPoint(e.clientX, e.clientY);
    const circle = element.closest(".connection-circle");

    if (!circle) return null;

    return circle;

}

function openEditForm(){
    document.getElementById("editForm").style.display = "block";

    const values = selectedCard.querySelectorAll(".value");

    const person = {
        name: values[0].textContent,
        surname: values[1].textContent,
        age: values[2].textContent,
        birthyear: values[3].textContent,
        place: values[4].textContent
    };
    const form = document.querySelector(".editFormContainer");

    for (let key in person) {
        if (form.elements[key]) {
            form.elements[key].value = person[key];
        }
    }


}
function editCard(){

    // get the new data and send to server
    const form = document.querySelector(".editFormContainer");


    const person = {
        id: parseInt(selectedCard.id),
        name: form.elements["name"].value,
        surname: form.elements["surname"].value,
        age: form.elements["age"].value,
        birth: form.elements["birthyear"].value,
        placeOfBirth: form.elements["place"].value

    };
    fetch("/editCard", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(person)
    })
        .then(response => response.text())
        .then(data => console.log("Antwort: ", data))
        .catch(err => console.error(err));

    // then change the info on frontend //get the card
    const keys = ["name", "surname", "age", "birth", "placeOfBirth"];

    const values = selectedCard.querySelectorAll(".value");

    keys.forEach((key, index) => {
        values[index].textContent = person[key];
    });

    selectedCard = null;

    document.getElementById("editForm").style.display = "none";
}


function abortEditPerson(){
    document.getElementById("editForm").style.display = "none";
}


function deleteCard() {
    if (selectedCard) {
        let flag = removeConnections(selectedCard);
        selectedCard.remove();

        const data = {
            id: parseInt(selectedCard.id),
            isChildConn: flag,
            treeId: currentTreeID
        };
        fetch("/deleteCard", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.text())
            .then(data => console.log("Antwort: ", data))
            .catch(err => console.error(err));


       selectedCard = null;
   }


}

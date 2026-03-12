
// wird aufgerufen wenn man eine Neune person erstellt und dann die Form submited
document.getElementById("constructForm").addEventListener("submit", function(event){
    event.preventDefault();
    constructPerson();

})

// send a message to editorRoute in java class, then handle response from server
function constructPerson() {
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const age = document.getElementById("age").value;
    const birthyear = document.getElementById("birthyear").value;
    const place = document.getElementById("place").value;
    let cardId;

    const person = {
        treeId: currentTreeID,
        name: name,
        surname: surname,
        age: age,
        birth: birthyear,
        placeOfBirth: place,
        posX : 0,
        posY : 0
    };

    // sende die Informationen zum Server
    fetch("/editor", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(person)
    })
        .then(response => response.text())
        .then(data => {
            cardId = parseInt(data);
            console.log("Antwort: ", data);
            //erstelle die Karte
            const card = document.createElement("div"); // erstelle eine div
            card.classList.add("card") // mit der Klasse card
            card.id = cardId;


            card.innerHTML = `
            <div class="label">Name</div><div class="colon">:</div><div class="value">${name}</div>
            <div class="label">Surname</div><div class="colon">:</div><div class="value">${surname}</div>
            <div class="label">Age</div><div class="colon">:</div><div class="value">${age}</div>
            <div class="label">Birthyear</div><div class="colon">:</div><div class="value">${birthyear}</div>
            <div class="label">Place of Birth</div><div class="colon">:</div><div class="value">${place}</div>
            `;

            //füge das Element (also die Karte) dem CardContainer zu
            document.getElementById("cardContainer").appendChild(card);
            makeDraggable(card);


            // close form and clear Inputs
            document.getElementById("constructForm").style.display = "none";
            document.getElementById("name").value = '';
            document.getElementById('surname').value = '';
            document.getElementById("age").value = '';
            document.getElementById("birthyear").value = '';
            document.getElementById("place").value = '';

        })
        .catch(err => console.error(err));



}


function openNewPersonForm() {
    document.getElementById("constructForm").style.display = "block";
}

function abortNewPerson() {
    document.getElementById("constructForm").style.display = "none";
}

function setCurrentTreeID(id){
    currentTreeID = id;
}
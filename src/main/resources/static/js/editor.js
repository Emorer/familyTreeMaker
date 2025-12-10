const root = document.documentElement;


// zooming
const content = document.querySelector(".container div.content");
let zoom = 100;
const zoomString = getComputedStyle(root).getPropertyValue("--zoom"); // current zoom
content.addEventListener("wheel", (event) =>{
    event.preventDefault();
        if (event.deltaY < 0) {
        zoom += 1;    //zoom in
    } else {
        zoom -= 1; // zoom out
    }

    zoom = Math.max(60 ,Math.min(zoom, 300));
    zooming(zoom);
});


function zooming(newZoom){
    root.style.setProperty("--zoom", newZoom + "%");

}

//karte bewegen
//wenn die maus über einer card klasse gedrückt wird führe
function makeDraggable(element) {
    let offsetX = 0;
    let offsetY = 0;



    element.addEventListener("pointerdown", startDrag);

    function startDrag(e) {
        e.preventDefault();

        offsetX = e.clientX - element.offsetLeft;
        offsetY = e.clientY - element.offsetTop;

        document.addEventListener("pointermove", drag);
        document.addEventListener("pointerup", stopDrag);
    }

    function drag(e) {
        element.style.left = (e.clientX - offsetX) + "px";
        element.style.top = (e.clientY - offsetY) + "px";
    }

    function stopDrag() {
        document.removeEventListener("pointermove", drag);
        document.removeEventListener("pointerup", stopDrag);
    }
}

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

    const person = {
        name: name,
        surname: surname,
        age: age,
        birth: birthyear,
        placeOfBirth: place
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
        .then(data => console.log("Antwort: ", data))
        .catch(err => console.error(err));

    //erstelle die Karte
    const card = document.createElement("div"); // erstelle eine div
    card.classList.add("card") // mit der Klasse card

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
}

function openNewPersonForm() {
    document.getElementById("constructForm").style.display = "block";
}

function abortNewPerson() {
    document.getElementById("constructForm").style.display = "none";
}
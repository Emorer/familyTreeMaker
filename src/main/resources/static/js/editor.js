const root = document.documentElement;
const GRID_SIZE = 25;
let panX = 0;
let panY = 0;
let zoom = 100;
let cardContainer = document.getElementById("cardContainer");
let isCardMoving = false;
let coordHeight = 1000; // y koordinaten
let coordWidth = 1600;  // x koordinaten


// zooming
cardContainer.addEventListener("wheel", zoomingStart)

function zoomingStart(e){
    e.preventDefault();
    if (e.deltaY < 0) {
        zoom += 1;    //zoom in
    } else {
        zoom -= 1; // zoom out
    }

    zoom = Math.max(10 ,Math.min(zoom, 400));
    zooming(zoom);
    function zooming(newZoom){
        root.style.setProperty("--zoom", newZoom + "%");

    }
}

function getScale() {
    return zoom / 100;
}


//////////////////////////////////////////////////
////// Card Bewegung /////////////////////////////
/////////////////////////////////////////////////


//karte bewegen
//wenn die maus über einer card klasse gedrückt wird führe
function makeDraggable(element) {
    let offsetX = 0;
    let offsetY = 0;


    element.addEventListener("pointerdown", startDrag);

    function startDrag(e) {
        e.preventDefault();
        isCardMoving = true;
        const scale = getScale();

        offsetX = (e.clientX / scale) - element.offsetLeft;
        offsetY = (e.clientY / scale) - element.offsetTop;

        document.addEventListener("pointermove", drag);
        document.addEventListener("pointerup", stopDrag);
    }

    function drag(e) {
        const scale = getScale();

        let x = (e.clientX / scale) - offsetX;
        let y = (e.clientY / scale) - offsetY;
        x = Math.round(x / GRID_SIZE) * GRID_SIZE;
        y = Math.round(y / GRID_SIZE) * GRID_SIZE;
        console.log("test ets x koord ")

        checkGridBoundaries(x, y)


        console.log(x);

        element.style.left = x + "px";
        element.style.top = y + "px";
    }

    function stopDrag() {
        document.removeEventListener("pointermove", drag);
        document.removeEventListener("pointerup", stopDrag);
        isCardMoving = false;
    }
}

function checkGridBoundaries(x, y){
    if (x > coordWidth){
        coordWidth += 1600;
        root.style.setProperty("--coordWidth", coordWidth + "px");

    }
    if (y > coordHeight){
        coordHeight += 1000;
        root.style.setProperty("--coordHeight", coordHeight + "px");
    }
}


/////////////////////////////////////////////////////
///// Panning the Grid system ///////////////////////
/////////////////////////////////////////////////////
cardContainer.addEventListener("contextmenu", e => e.preventDefault());
cardContainer.addEventListener("pointerdown", StartPanning);

function StartPanning(event){
    event.preventDefault();
    if (event.button !== 2){
        return
    }
    if(isCardMoving){
        return;
    }

    let x = event.clientX;
    let y = event.clientY;
    document.addEventListener("pointermove", panning)
    document.addEventListener("pointerup", stopPanning, { once: true })

    function panning(event){

        panX += event.clientX - x;
        panY  += event.clientY - y;

        x = event.clientX;
        y = event.clientY;

        root.style.setProperty("--XChange", panX + "px");
        root.style.setProperty("--YChange", panY + "px");


    }
    function stopPanning(){
        document.removeEventListener("pointermove", panning)
        document.removeEventListener("pointerup", stopPanning)

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
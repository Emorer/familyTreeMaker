
//////////////////////////////////////////////////
////// Card Optionen /////////////////////////////
/////////////////////////////////////////////////

function cardOptions(e){
    e.preventDefault();

    selectedCard = e.currentTarget;
    console.log("test opt")
    cardOption.style.display = "block"
    cardOption.style.top = e.clientY + "px";
    cardOption.style.left = e.clientX + "px";
    // open options for the card like add spouse, child, parent
}
//////////////////////////////////////////////////
////// Card Bewegung /////////////////////////////
/////////////////////////////////////////////////


//karte bewegen
//wenn die maus über einer card klasse gedrückt wird führe
function makeDraggable(element) {
    let offsetX = 0;
    let offsetY = 0;


    //cardContainer.addEventListener("contextmenu", e => e.preventDefault());
    element.addEventListener("contextmenu", cardOptions);
    element.addEventListener("pointerdown", startDrag);


    function startDrag(e) {
        e.preventDefault();
        if (e.button !== 0){
            return
        }
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
        // set the new position in the class
        sendPosToServer(element);
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

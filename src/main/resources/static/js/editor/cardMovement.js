
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
    let dragStartX;
    let dragStartY;


    //cardContainer.addEventListener("contextmenu", e => e.preventDefault());
    element.addEventListener("contextmenu", cardOptions);
    element.addEventListener("pointerdown", startDrag);


    function startDrag(e) {
        e.preventDefault();

        if (e.button !== 0){
            return
        }
        isCardMoving = true;

        if (selectedCards.length === 0){
            selectedCards = [element];
            element.style.border = "1px solid #fb4955";

        }

        const scale = getScale();

        selectedCards.forEach(card => {
            card.dataset.startX = parseFloat(card.style.left);
            card.dataset.startY = parseFloat(card.style.top);
        });

        // Startposition des Hauptelements einmalig speichern
        dragStartX = parseFloat(element.style.left);
        dragStartY = parseFloat(element.style.top);

        offsetX = (e.clientX / scale) - dragStartX;
        offsetY = (e.clientY / scale) - dragStartY;

        document.addEventListener("pointermove", drag);
        document.addEventListener("pointerup", stopDrag);
    }

    function drag(e) {
        const scale = getScale();
        selectedCards.forEach(card => {
            updateConnections(card);
        });

        let x = (e.clientX / scale) - offsetX;
        let y = (e.clientY / scale) - offsetY;
        x = Math.round(x / GRID_SIZE) * GRID_SIZE;
        y = Math.round(y / GRID_SIZE) * GRID_SIZE;



        selectedCards.forEach(card => {
            let baseX = parseFloat(card.dataset.startX);
            let baseY = parseFloat(card.dataset.startY);

            // Delta relativ zur gespeicherten Startposition berechnen
            let newX = baseX + (x - dragStartX);
            let newY = baseY + (y - dragStartY);

            checkGridBoundaries(newX, newY);

            card.style.left = newX + "px";
            card.style.top = newY + "px";
        });
    }

    function stopDrag() {
        document.removeEventListener("pointermove", drag);
        document.removeEventListener("pointerup", stopDrag);
        cardContainer.removeEventListener("pointerdown", unSelectAllCards);
        selectedCards.forEach(card =>{
            card.style.border = "1px solid #C8DFB8";
            card.style.borderLeft = "3px solid #2D6A1F";
            sendPosToServer(card)
        })
        // set the new position in the class
        selectedCards = [];
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

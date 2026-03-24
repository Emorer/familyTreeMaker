cardContainer.addEventListener("pointerdown", startMultiselect)
const multibox = document.getElementById("multiBox");

function startMultiselect(event){
    if (event.button !== 0){
        return
    }
    if (event.target.closest(".card")) {
        return;
    }
    let scale = getScale();


    console.log("current mouse X-position normal : " + event.clientX)

    const rect = cardContainer.parentElement.getBoundingClientRect();
    console.log("PanX: " + panX)
    // koordinaten in screen umrechnen
    let startX = (event.clientX - rect.left - panX) / scale;
    let startY = (event.clientY - rect.top -  panY) / scale;
    console.log("current mouse X-positionwith scale: " + startX)

    let currentX;
    let currentY;
    document.addEventListener("pointermove",startMultiBoxDrag);
    document.addEventListener("pointerup", stopMouseDrag);
    function startMultiBoxDrag(e){

        currentX = (e.clientX - rect.left - panX) / scale;
        currentY = (e.clientY - rect.top - panY) / scale;

        let width = Math.abs(currentX - startX);
        let height = Math.abs(currentY - startY);

        // zurückberechnen in die world koordinaten zum zeichen
        multibox.style.left = (Math.min(startX, currentX) * scale) + panX  + "px";
        multibox.style.top = (Math.min(startY, currentY) * scale) + panY + "px";
        multibox.style.width = width * scale + "px";
        multibox.style.height = height * scale  + "px";
        multibox.style.display = "block";
    }

    function stopMouseDrag(){
        document.removeEventListener("pointermove", startMultiBoxDrag);
        document.removeEventListener("pointerup", stopMouseDrag);

        let allCards = getAllCards();

        checkIfCardCollidesWithSelectBox(allCards, startX,currentX, startY, currentY)

        multibox.style.width =   "0px";
        multibox.style.height = "0px";
        multibox.style.display = "none";


    }
    //root.style.setProperty("----multiboxWidth", 100 + "px");
    //root.style.setProperty("----multiboxHeight",100 + "px");



}

function getAllCards(){
    return cardContainer.querySelectorAll(".card");
}

// takes the cards as input then the start and current coordinates of the selectBox
function checkIfCardCollidesWithSelectBox(allCards, startX, currentX, startY, currentY){

    let selectLeft = Math.min(startX, currentX);
    let selectRight = Math.max(startX, currentX);
    let selectTop = Math.min(startY, currentY);
    let selectBottom = Math.max(startY, currentY);

    //console.log("start X: " + startX + " start Y: " + startY );
    //console.log("current X " + currentX + " current Y " + currentY)
    allCards.forEach(card => {

        let cardLeft = parseFloat(card.style.left);
        let cardTop = parseFloat(card.style.top);

        let cardRight = cardLeft + 187.5;
        let cardBottom = cardTop + 87.5;

        if (
            cardRight > selectLeft &&
            cardLeft < selectRight &&
            cardBottom > selectTop &&
            cardTop < selectBottom
        ) {
            card.style.border = "3px solid red"; //
            selectedCards.push(card);
        }

    });

}

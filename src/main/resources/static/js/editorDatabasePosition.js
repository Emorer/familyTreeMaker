function sendPosToServer(card){
    const cardPosition= getPositionRelativeToParent(card);
    let posX = cardPosition.left;
    let posY = cardPosition.top;
    let id = card.getAttribute("id");
    const zoom = getScale();
    posX = Math.round(posX/ zoom);
    posY = Math.round(posY/ zoom);
    console.log(posX);
    console.log(posY);
    const data = {
        id: parseInt(id),
        x: posX,
        y: posY };
    fetch("/editorPos", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.text())
        .then(data => console.log("Antwort: ", data))
        .catch(err => console.error(err));

}

function getPositionRelativeToParent(element) {
    const parent = element.parentElement;
    const parentRect = parent.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    return {
        top: elementRect.top - parentRect.top,
        left: elementRect.left - parentRect.left,
        bottom: elementRect.bottom - parentRect.top,
        right: elementRect.right - parentRect.left
    };
}
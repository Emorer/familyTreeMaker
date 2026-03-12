

function addSpouse(){

}

function addParent(){


}

function connectToSpouse(){



}
function connectToParent(){

}

function deleteCard() {
    if (selectedCard) {
        selectedCard.remove();

        const data = {
            id: parseInt(selectedCard.id),
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
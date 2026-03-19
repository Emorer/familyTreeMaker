document.getElementById("editForm").addEventListener("submit", function (event){
    event.preventDefault();
    editCard();
})
function addSpouse(){

}

function connectToSpouse(){



}
function connectToParent(){

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
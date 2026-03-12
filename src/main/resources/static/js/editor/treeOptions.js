// this function first deletes a Tree if one is selected
function deleteTree(){
    if (currentTreeID != null){
        const treeElement = allTrees.querySelector(`[data-tree-id="${currentTreeID}"]`);

        const button = treeElement.querySelector("button");
        const name = button.textContent;

        Swal.fire({
            title: "Are you sure you want to delete Tree " + "'" + name + "'",
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: 'No',
            customClass: {
                actions: 'my-actions',
                confirmButton: 'order-2',
                denyButton: 'order-3',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const data = {
                    id: currentTreeID
                }
                fetch("/deleteTree", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)})
                    .then(response => response.text())
                    .then(data => console.log("Antwort: ", data))
                    .catch(err => console.error(err));
                document.getElementById("cardContainer").innerHTML = "";
                treeElement.remove();
            } else if (result.isDenied) {
                return;
            }
        })


    }
    else{
        Swal.fire({
            title: "No Tree Selected",
            icon: "question"
        });

    }

}
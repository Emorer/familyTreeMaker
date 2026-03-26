
function getConnections(){
    const treeData= {
        treeId : currentTreeID
    };
    fetch("/getConnections", {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body:JSON.stringify(treeData)
    })
        .then(response => response.json())
        .then(connections => {
            insertConnections(connections)

        })

        .catch(err => console.error(err));

}



function insertConnections(connections){
    connections.forEach(conn =>{
        let id1= document.getElementById(conn.firstSpouse);
        let id2 = document.getElementById(conn.secondSpouse);
        spouseConn = new SpouseConnection(id1, id2)
        Spouses.push(spouseConn);
        conn.children.forEach(child => {
            childElement = document.getElementById(child);
            Children.push(new ParentToChildConn(spouseConn, childElement));
        })



    })
    drawConnections();

}

// remove the connections of a card on the canvas
function removeConnections(card){
    let flag = false;
    Children.forEach(parentChildconn =>{
        // check if the card has a spousel connections and delete it and all children
        if (parentChildconn.spouseConnId.toId === card.id || parentChildconn.spouseConnId.fromId === card.id){
            parentChildconn.spouseConnId.remove();
            parentChildconn.remove();
        }
        //check if only a child of a card and then delete only that
        if(parentChildconn.childId === card.id){
            parentChildconn.remove();
            flag = true;

        }
    });
    return flag;
}
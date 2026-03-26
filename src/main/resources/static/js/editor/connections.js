
class SpouseConnection {
    circleX = 0;
    circleY = 0;
    midY = 0;
    constructor(card1, card2) {
        this.fromId = card1.id;
        this.toId = card2.id;


        // erstelle die polyline
        this.line = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
        this.line.setAttribute("stroke", "black");
        this.line.setAttribute("fill", "none");
        this.line.setAttribute("stroke-width", "2"); // breitere Klickfläche
        this.line.style.cursor = "pointer";
        this.line.addEventListener("contextmenu", (e) => {
            e.preventDefault(); // verhindert das Browser-Kontextmenü
            this.delete();
        });

        // erstelle die
        this.circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        this.circle.setAttribute("r", 5);
        this.circle.setAttribute("fill", "black");
        this.circle.setAttribute("pointer-events", "all");
        this.circle.style.cursor = "grabbing";

        this.circle.addEventListener("click", () => this.onClick());

        const svg = cardContainer.querySelector("svg");
        svg.appendChild(this.line);
        svg.appendChild(this.circle);

        this.update();
    }

    update() {
        const card1 = document.getElementById(this.fromId);
        const card2 = document.getElementById(this.toId);
        if (!card1 || !card2) return; //

        const p1 = getCardCenter(card1);
        const p2 = getCardCenter(card2);


        this.line.setAttribute("points", `${p1.x},${p1.y} ${p2.x},${p2.y}`);
        this.circle.setAttribute("cx", (p1.x + p2.x) / 2);
        this.circle.setAttribute("cy", (p1.y + p2.y) / 2);
        this.circleX = (p1.x + p2.x) / 2;
        this.circleY = (p1.y + p2.y) / 2;

        this.midY = this.circleY + 100; // 100px unter dem Circle

        // check
        Children.forEach(child => {
            if (child.spouseConnId === this) child.update();
        });

}
    remove() {
        this.line.remove();
        this.circle.remove();
    }

    onClick() {
        connectToChild(this);
        //console.log("connection clicked:", this.fromId, this.toId);
    }
    delete(){
        Children = Children.filter(child => {
            if (child.spouseConnId === this) {
                child.remove();
                deleteChildConnFromServer(child);
                return false;
            }
            return true;
        });

        this.remove();
        Spouses = Spouses.filter(conn => conn !== this);
        deleteSpouseConnFromServer(this);
    }
}



/////////////////////////////////////// @Class
class ParentToChildConn {
    constructor(spouseConn, childCard) {
        this.spouseConnId = spouseConn; // Referenz zur SpouseConnection
        this.childId = childCard.id;

        this.line = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
        this.line.setAttribute("stroke", "black");
        this.line.setAttribute("fill", "none");
        this.line.setAttribute("pointer-events", "all");
        this.line.setAttribute("stroke-width", "2");
        this.line.style.cursor = "pointer";
        this.line.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            this.delete();
        });

        const svg = cardContainer.querySelector("svg");
        svg.appendChild(this.line);

        this.update();
    }

    update() {
        const childCard = document.getElementById(this.childId);
        if (!childCard) return;

        const childCenter = getCardCenter(childCard);

        const startX = this.spouseConnId.circleX;
        const startY = this.spouseConnId.circleY;
        //const midY = (startY + childCenter.y) / 2;
        const midY = this.spouseConnId.midY;

        // Rechteckige Linie: runter, dann rüber, dann runter
        this.line.setAttribute("points",
            `${startX},${startY} ${startX},${midY} ${childCenter.x},${midY} ${childCenter.x},${childCenter.y}`
        );
    }

    remove() {
        this.line.remove();
    }
    delete(){
        this.remove();
        Children = Children.filter(conn => conn !== this);
        deleteChildConnFromServer(this);
    }
}
function startSVG(){
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    cardContainer.appendChild(svg)


}


function updateConnections(movedCard) {
    Spouses.forEach(conn => {
        if (conn.fromId === movedCard.id || conn.toId === movedCard.id) {
            conn.update();
            Children.forEach(child => {
                if (child.spouseConnId === conn) child.update();
            });
        }
    });
    Children.forEach(child => {
        if (child.childId === movedCard.id) child.update();
    });
}

// draw everthing new todo add the chid connections
function drawConnections() {
    Spouses.forEach(conn => conn.update());
    Children.forEach(conn => conn.update());
}



function getCardCenter(card){
    return {
        x: parseFloat(card.style.left) + 200 / 2, // die maße sind unterschiedlich auf dem canvas im vergleich zu den in css
        y: parseFloat(card.style.top) + 100 / 2
    };
}

function getScreenCoordFromWorld(e){
    let scale = getScale();
    const rect = cardContainer.parentElement.getBoundingClientRect();

    return {x : (e.clientX - rect.left - panX) / scale,
            y : (e.clientY - rect.top - panY) / scale};
}


// saves all connections by sending them to the server
function saveConnections(SpouseConnection){
    console.log("cuurent tree id " + currentTreeID);
    const Data = {
        treeId: currentTreeID,
        fromId : SpouseConnection.fromId,
        toId : SpouseConnection.toId

    };

    // sende die Informationen zum Server
    fetch("/addSpouseConn", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(Data)
    })
        .then(response => response.text())

        .catch(err => console.error(err));


}

function saveChildConnection(parentChildConn){
    const Data = {
        treeId: currentTreeID, // obsolete
        fromId : parentChildConn.spouseConnId.fromId,
        toId : parentChildConn.spouseConnId.toId,
        childId: parentChildConn.childId
    };

    // sende die Informationen zum Server
    fetch("/addChildConn", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(Data)
    })
        .then(response => response.text())

        .catch(err => console.error(err));
}

function isSpouse(card1, card2){
    return Spouses.some(conn =>
        (conn.fromId === card1.id && conn.toId === card2.id) ||
        (conn.fromId === card2.id && conn.toId === card1.id)
    );
}

function isChild(card, spouseConn){
    return Children.some(conn =>
        conn.childId === card.id && conn.spouseConnId === spouseConn
    );
}



function deleteSpouseConnFromServer(conn) {
    fetch("/deleteSpouseConn", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            fromId: conn.fromId,
            toId: conn.toId,
            treeId: currentTreeID })
    });
}

function deleteChildConnFromServer(child) {
    fetch("/deleteChildConn", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            childId: child.childId,
            treeId: currentTreeID })
    });
}
// midY manuell verschiebbar machen
/*moveMidY(delta) {
    this.midY += delta;
    Children.forEach(child => {
        if (child.spouseConnId === this) child.update();
    });
}

 */
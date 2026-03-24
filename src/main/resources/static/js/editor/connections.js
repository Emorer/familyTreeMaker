
class SpouseConnection {
    circleX = 0;
    circleY = 0;
    constructor(card1, card2) {
        this.fromId = card1.id;
        this.toId = card2.id;


        // erstelle die polyline
        this.line = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
        this.line.setAttribute("stroke", "black");
        this.line.setAttribute("fill", "none");

        // erstelle die
        this.circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        this.circle.setAttribute("r", 4);
        this.circle.setAttribute("fill", "black");
        this.circle.setAttribute("pointer-events", "all");
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
    }

    remove() {
        this.line.remove();
        this.circle.remove();
    }

    onClick() {
        connectToChild(this);
        //console.log("connection clicked:", this.fromId, this.toId);
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
        const midY = (startY + childCenter.y) / 2;

        // Rechteckige Linie: runter, dann rüber, dann runter
        this.line.setAttribute("points",
            `${startX},${startY} ${startX},${midY} ${childCenter.x},${midY} ${childCenter.x},${childCenter.y}`
        );
    }

    remove() {
        this.line.remove();
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
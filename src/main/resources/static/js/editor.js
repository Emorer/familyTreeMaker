
const root = document.documentElement;

// draw the Koordinatensystem
var CanvasCoord = document.getElementById("CanvasCoord");
var width = CanvasCoord.clientWidth;
var height = CanvasCoord.clientHeight;
var CoordDensity = 25;

var ctx = CanvasCoord.getContext("2d");
// do the vertical lines
for(let i = CoordDensity; i < width; i += CoordDensity) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, height);
}

// do the horizontal lines
for(let i = CoordDensity; i < height; i += CoordDensity){
    ctx.moveTo(0, i);
    ctx.lineTo(width, i);
}

ctx.stroke();
///////////////////////////////////////////////////////////////////
// zooming
const content = document.querySelector(".container div.content");
let zoom = 100;
const zoomString = getComputedStyle(root).getPropertyValue("--zoom"); // current zoom
content.addEventListener("wheel", (event) =>{
    event.preventDefault();
        if (event.deltaY < 0) {
        zoom += 1;    //zoom in
    } else {
        zoom -= 1; // zoom out
    }

    zoom = Math.max(50 ,Math.min(zoom, 300));
    zooming(zoom);
});



function zooming(newZoom){
    root.style.setProperty("--zoom", newZoom + "%");

}
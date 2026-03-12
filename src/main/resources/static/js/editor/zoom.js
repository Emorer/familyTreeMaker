
cardContainer.addEventListener("wheel", zoomingStart)
function zoomingStart(e){
    e.preventDefault();
    if (e.deltaY < 0) {
        zoom += 1;    //zoom in
    } else {
        zoom -= 1; // zoom out
    }

    zoom = Math.max(10 ,Math.min(zoom, 400));
    zooming(zoom);
    function zooming(newZoom){
        root.style.setProperty("--zoom", newZoom + "%");

    }
}

function getScale() {
    return zoom / 100;
}


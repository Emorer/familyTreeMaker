
/////////////////////////////////////////////////////
///// Panning the Grid system ///////////////////////
/////////////////////////////////////////////////////


cardContainer.addEventListener("contextmenu", e => e.preventDefault());
cardContainer.addEventListener("pointerdown", StartPanning);
function StartPanning(event){
    event.preventDefault();
    if (event.button !== 2){
        return
    }
    if(isCardMoving){
        return;
    }

    let x = event.clientX;
    let y = event.clientY;
    document.addEventListener("pointermove", panning)
    document.addEventListener("pointerup", stopPanning, { once: true })

    function panning(event){

        panX += event.clientX - x;
        panY  += event.clientY - y;

        x = event.clientX;
        y = event.clientY;

        root.style.setProperty("--XChange", panX + "px");
        root.style.setProperty("--YChange", panY + "px");


    }
    function stopPanning(){
        document.removeEventListener("pointermove", panning)
        document.removeEventListener("pointerup", stopPanning)

    }
}


let zoom = 1;
let posX = 0;
let posY = 0;
let isPanning = false;
let startX, startY;

const env = document.querySelector('.environment');
const wrapper = document.querySelector('.environment-wrapper');

env.addEventListener('wheel', (event) => {
    event.preventDefault();

    if (event.deltaY < 0) {
        zoom += 0.1;    //zoom in
    } else {
        zoom -= 0.1; // zoom out
    }

    zoom = Math.max(0.5 ,Math.min(zoom, 3));

    env.style.transform = `scale(${zoom})`;
});





wrapper.addEventListener('mousedown', (e) => {
    isPanning = true;
    startX = e.clientX - posX;
    startY = e.clientY - posY;
});

wrapper.addEventListener('mousemove', (e) => {
    if (!isPanning) return;
    posX = e.clientX - startX;
    posY = e.clientY - startY;
    updateTransform();
});

wrapper.addEventListener('mouseup', () => {
    isPanning = false;
});

wrapper.addEventListener('mouseleave', () => {
    isPanning = false;
});


function updateTransform() {
    env.style.transform = `translate(${posX}px, ${posY}px) scale(${zoom})`;
}
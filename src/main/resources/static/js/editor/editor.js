

const root = document.documentElement;
let currentTreeID = null; // holds the value of the current tree where we edit i.e integer
let selectedCard = null;

const GRID_SIZE = 25;
let panX = 0;
let panY = 0;
let zoom = 100;
let cardContainer = document.getElementById("cardContainer");
let cardOption = document.getElementById("cardOption");
let isCardMoving = false;
let coordHeight = 1000; // y koordinaten
let coordWidth = 1600;  // x koordinaten


// mach die card optionen aus also
document.addEventListener("click", () => {
    cardOption.style.display = "none";
});




console.log("js is starting");

let currentTurn = 'X';

function drawX(image) {
    console.log("Drawing X");
    image.src = "image/cross.svg";
    image.style.display = 'block'; // Show image when set
}

function drawO(image) {
    console.log("Drawing O");
    image.src = "image/zero.svg";
    image.style.display = 'block'; // Show image when set
}

function handleClick(event) {
    const cell = event.currentTarget;
    const image = cell.querySelector('.check img');
    console.log("Cell clicked", cell);
    if (!image.src.includes("cross.svg") && !image.src.includes("zero.svg")) { // Only change if the cell is empty
        if (currentTurn === 'X') {
            drawX(image);
            currentTurn = 'O';
        } else {
            drawO(image);
            currentTurn = 'X';
        }
    } else {
        console.log("Cell already has an image or no image element found");
    }
}

function main() {
    const check = document.querySelectorAll('.check');
    check.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });
}

document.addEventListener('DOMContentLoaded', main);

console.log("JS is working");

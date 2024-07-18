console.log("js is starting");

let currentTurn = 'X';
let board = Array(3).fill().map(() => Array(3).fill(null)); // 3x3 board initialized to null

function drawX(image) {
    return new Promise((resolve) => {
        console.log("Drawing X");
        image.src = "image/cross.svg";
        image.style.display = 'block'; // Show image when set
        image.onload = () => resolve(); // Resolve the promise when the image is loaded
    });
}

function drawO(image) {
    return new Promise((resolve) => {
        console.log("Drawing O");
        image.src = "image/zero.svg";
        image.style.display = 'block'; // Show image when set
        image.onload = () => resolve(); // Resolve the promise when the image is loaded
    });
}

async function handleClick(event) {
    const cell = event.currentTarget;
    const image = cell.querySelector('.check img');
    const row = cell.dataset.row;
    const col = cell.dataset.col;

    console.log("Cell clicked", cell);
    if (!image.src.includes("cross.svg") && !image.src.includes("zero.svg")) { // Only change if the cell is empty
        if (currentTurn === 'X') {
            await drawX(image);
            board[row][col] = 'X';
            if (checkWinner('X')) {
                alert('X wins!');
                resetGame();
                return;
            }
            if(allFilled()){
                alert('It is a Draw!');
                resetGame();
                return;
            }
            currentTurn = 'O';
        } else {
            await drawO(image);
            board[row][col] = 'O';
            if (checkWinner('O')) {
                alert('O wins!');
                resetGame();
                return;
            }
            if(allFilled()){
                alert('It is a Draw!');
                resetGame();
                return;
            }
            currentTurn = 'X';
        }
    } else {
        console.log("Cell already has an image or no image element found");
    }
}

function checkWinner(player){
    //checking rowWise
    for (let row = 0; row < 3; row++) {
        if(board[row][0] === player && board[row][1] === player && board[row][2] === player){
            return true;
        }
    }

    //checking columnWise
    for (let col = 0; col < 3; col++) {
        if(board[0][col] === player && board[1][col] === player && board[2][col] === player){
            return true;
        }
    }

    //checking diagonally
    if(board[0][0] === player && board[1][1] === player && board[2][2] === player){
        return true;
    } 
    if(board[0][2] === player && board[1][1] === player && board[2][0] === player){
        return true;
    }
}

function resetGame() {
    board = Array(3).fill().map(() => Array(3).fill(null)); // Reset the board
    document.querySelectorAll('.check img').forEach(image => {
        image.style.display = 'none';
        image.src = ''; // Reset image source
    });
    currentTurn = 'X'; // Reset the turn
}

function allFilled(){
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if(board[row][col] === null){
                return 0;
            }
        }
    }
    return 1;
}

function main() {
    const check = document.querySelectorAll('.check');
    check.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });
}

document.addEventListener('DOMContentLoaded', main);

console.log("JS is working");

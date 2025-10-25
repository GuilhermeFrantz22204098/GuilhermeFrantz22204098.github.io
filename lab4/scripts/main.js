// Jumper
const jumperButton = document.getElementById('jumper-button');
const jumperChallenge = document.getElementById('jumper-challenge');
const jumperContainer = document.getElementById('jumper-container');
let jumperCount = 0;
const jumperTotalClicks = 5;

jumperButton.addEventListener('click', () => {
    jumperCount++;
    jumperButton.textContent = jumperCount;

    const max_x = jumperContainer.clientWidth - jumperButton.clientWidth;
    const max_y = jumperContainer.clientHeight - jumperButton.clientHeight;

    const new_x = Math.floor(Math.random() * max_x);
    const new_y = Math.floor(Math.random() * max_y);

    jumperButton.style.left = `${new_x}px`;
    jumperButton.style.top = `${new_y}px`;

    if (jumperCount >= jumperTotalClicks) {
        jumperChallenge.textContent = 'Oh man...';
        jumperButton.textContent = 'STOP';
    }
});

// Odd
const oddGrid = document.getElementById('odd-grid');
const oddChallenge = document.getElementById('odd-challenge');
const oddTotalSquares = 50;

const oddWinnerIndex = Math.floor(Math.random() * oddTotalSquares);

for (let i = 0; i < oddTotalSquares; i++) {
    const oddSquare = document.createElement('div');
    oddSquare.classList.add('odd-square');

    if (i === oddWinnerIndex) {
        oddSquare.classList.add('odd-winner');
    }

    oddSquare.addEventListener('mouseover', () => {
        if (oddSquare.classList.contains('odd-winner')) {
            oddSquare.style.backgroundColor = 'lime';
        } else {
            oddSquare.style.backgroundColor = 'red';
        }
    });

    oddSquare.addEventListener('mouseout', () => {
        oddSquare.style.backgroundColor = 'black';
    });

    oddGrid.appendChild(oddSquare);
}

// Still
const stillContainer = document.getElementById('still-container');
const stillImage = document.getElementById('still-image');
let mouseStopTimer;

stillContainer.addEventListener('mousemove', () => {
    clearTimeout(mouseStopTimer);

    stillImage.src = 'images/look.jpg';

    mouseStopTimer = setTimeout(() => {
        stillImage.src = 'images/nolook.jpg';
    }, 500);
});

// Secret
const secretFeedback = document.getElementById('secret-feedback');

function reveal() {
    secretFeedback.textContent = 'It was a double click';
}

// Workout
const workoutValue = document.getElementById('workout-value');
let workoutMovements = 0;

function countMovement(event) {
    workoutMovements++;
    workoutValue.textContent = workoutMovements;
}
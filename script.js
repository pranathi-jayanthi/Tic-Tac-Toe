const stat = [0, 0, 0, 0, 0, 0, 0, 0, 0];
const dabbas = document.querySelectorAll(".box");
let currentPlayer = "O";

const winningCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8], // Horizontal
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8], // Vertical
	[0, 4, 8],
	[2, 4, 6], // Diagonal
];

dabbas.forEach((dabba) => {
	dabba.addEventListener("click", function () {
		if (dabba.textContent === "") {
			dabba.textContent = currentPlayer;
			stat[Array.from(dabbas).indexOf(dabba)] = currentPlayer;

			if (checkWin(currentPlayer)) {
				resetGame(currentPlayer === "X" ? "YOU WIN..." : "YOU LOSE...");
				return;
			}

			if (isAllFilled()) {
				resetGame("DRAW!");
				return;
			}

			currentPlayer = currentPlayer === "X" ? "O" : "X"; 

			if (currentPlayer === "X") {
				enableUserTurn();
			} else {
				setTimeout(computerTurn, 500);
			}
		}
	});
});

function enableUserTurn() {
	dabbas.forEach((dabba) => {
		dabba.style.pointerEvents = "auto"; 
	});
}

function disableUserTurn() {
	dabbas.forEach((dabba) => {
		dabba.style.pointerEvents = "none"; 
	});
}

function computerTurn() {
	disableUserTurn(); 

	if (!isAllOnes(stat)) {
		let randomNumber = Math.floor(Math.random() * 9);

		while (stat[randomNumber] !== 0) {
			randomNumber = Math.floor(Math.random() * 9);
		}

		dabbas[randomNumber].textContent = currentPlayer;
		stat[randomNumber] = currentPlayer;

		if (checkWin(currentPlayer)) {
			resetGame(currentPlayer === "X" ? "YOU WIN..." : "YOU LOSE...");
			return;
		}

		if (isAllFilled()) {
			resetGame("DRAW!");
			return;
		}

		currentPlayer = currentPlayer === "X" ? "O" : "X"; 
		enableUserTurn(); 
	}
}

function isAllOnes(array) {
	for (let i = 0; i < array.length; i++) {
		if (array[i] !== 1) {
			return false;
		}
	}
	return true;
}

function isAllFilled() {
	return stat.every((value) => value !== 0);
}

function checkWin(player) {
	for (let combo of winningCombos) {
		if (
			stat[combo[0]] === player &&
			stat[combo[1]] === player &&
			stat[combo[2]] === player
		) {
			return true;
		}
	}
	return false;
}

function resetGame(message) {
	const msgElement = document.querySelector(".msg");

	function displayMessage(message, duration) {
		msgElement.innerHTML = message;
		setTimeout(() => {
			if (message === "NEW GAME BEGINS...") {
				location.reload();
			}
		}, duration);
	}

	const messages = [
		{ content: message, duration: 2000 },
		{ content: "1...", duration: 1000 },
		{ content: "2...", duration: 1000 },
		{ content: "3...", duration: 1000 },
		{ content: "NEW GAME BEGINS...", duration: 1000 },
	];

	let delay = 0;
	messages.forEach(({ content, duration }) => {
		setTimeout(() => displayMessage(content, duration), delay);
		delay += duration;
	});
}

setTimeout(computerTurn, 1000);
//------CONSTANTES------ //
const STATUS_DISPLAY = document.querySelector('.Estado'),
  GAME_STATE = ["", "", "", "", "", "", "", "", ""],
  WINNINGS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ],
  Ganador = () => `El jugador ${currentPlayer} ganó la partida`,
  Empate = () => `El juego quedó empatado`,
  Turno = () => `Turno de ${currentPlayer}`

//------VARIABLES------//
let gameActive = true,
  currentPlayer = "X"

//------FUNCIONES------ //

function main() {
  handleStatusDisplay(Turno())
  listeners()
}

function listeners() {
  document.querySelector('.Contenido').addEventListener('click', handleCellClick)
  document.querySelector('.Reinicio').addEventListener('click', handleRestartGame)
}

function handleStatusDisplay(message) {
  STATUS_DISPLAY.innerHTML = message
}

function handleRestartGame() {
  gameActive = true
  currentPlayer = "X"
  restartGameState()
  handleStatusDisplay(Turno())
  document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "")
}

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target
  if (clickedCell.classList.contains('cell')) {
    const clickedCellIndex = Array.from(clickedCell.parentNode.children).indexOf(clickedCell)
    if (GAME_STATE[clickedCellIndex] !== '' || !gameActive) {
      return false
    }

    handleCellPlayed(clickedCell, clickedCellIndex)
    handleResultValidation()
  }
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
  GAME_STATE[clickedCellIndex] = currentPlayer 
  clickedCell.innerHTML = currentPlayer 
}

function handleResultValidation() {
  let roundWon = false
  for (let i = 0; i < WINNINGS.length; i++) { 
    const winCondition = WINNINGS[i] 
    let position1 = GAME_STATE[winCondition[0]],
      position2 = GAME_STATE[winCondition[1]],
      position3 = GAME_STATE[winCondition[2]] 

    if (position1 === '' || position2 === '' || position3 === '') {
      continue; 
    }
    if (position1 === position2 && position2 === position3) {
      roundWon = true 
      break
    }
  }

  if (roundWon) {
    handleStatusDisplay(Ganador())
    gameActive = false
    return
  }

  let roundDraw = !GAME_STATE.includes("") 
  if (roundDraw) {
    handleStatusDisplay(Empate())
    gameActive = false
    return
  }

  handlePlayerChange()
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X"
  handleStatusDisplay(Turno())
}

function restartGameState() {
  let i = GAME_STATE.length
  while (i--) {
    GAME_STATE[i] = ''
  }
}

main()
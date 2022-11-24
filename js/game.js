'use strict'

const BOARD_SIZE = 14;
const ALIENS_ROW_LENGTH = 8
const ALIENS_ROW_COUNT = 3

const HERO = '🦸‍♀️';
const ALIEN = '👽';
const LASER = '⤊';
const FLOOR = 'FLOOR'
const SKY = 'SKY'

// Matrix of cell objects. e.g.: {type: SKY, gameObject: ALIEN}
var gBoard;
var gGame

function initGame() {
    console.log('LETS PLAY')
    gBoard = createBoard()
    restartValues()
    renderBoard(gBoard, '.board-container')
    // shoot()
}

function startGame() {
    initGame()
    document.querySelector('h4').classList.add('hide')
    gGame.isOn = true
    gAliens.interval = setInterval(moveAliens, ALIEN_SPEED)
    document.querySelector('button').innerText = 'click to reset'
}

function restartValues() {
    gGame = {
        isOn: false,
        aliensCount: 0,
        score: 0,
        isWin: false,
    }
    createHero()
    createLaser()
    clearInterval(gAliens.interval)
    clearInterval(gLaser.interval)
    createAliens(gBoard)
}

function updateScore(num) {
    gGame.score += num
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver(winOrLose) {
    gGame.isOn = false
    gGame.isWin = winOrLose || false
    var msg = gGame.isWin ? 'YOU WIN!' : 'YOU LOSE :('


    clearInterval(gAliens.interval)
    setTimeout(() => alert(`${msg}`), 20)
}

// Create and returns the board with aliens on top, ground at bottom
// use the functions: createCell, createHero, createAliens
function createBoard() {
    const size = 14
    const board = []
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = createCell()
            if (i === size - 1) board[i][j].type = FLOOR
        }
    }
    return board
}

// Render the board as a <table> to the page
function renderBoard(mat, selector) {
    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {
            const cell = mat[i][j]
            var className = `cell cell-${i}-${j}`
            const isSky = (cell.type === SKY) ? 'sky' : ''
            const isFloor = (cell.type === FLOOR) ? ' floor' : ''
            strHTML += `<td class="${className} ${isSky} ${isFloor}">`
            switch (cell.gameObject) {
                case HERO:
                    strHTML += HERO
                    break
                case ALIEN:
                    strHTML += ALIEN
                    break
            }
            strHTML += `</td >`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'
    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}
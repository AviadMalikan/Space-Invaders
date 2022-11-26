'use strict'

const BOARD_SIZE = 14;
const ALIENS_ROW_LENGTH = 8
const ALIENS_ROW_COUNT = 3

const HERO = '🦸‍♀️';
const ALIEN = '👽';
const LASER = '↑';
const SUPER_LASER = '⤊'
const FLOOR = 'FLOOR'
const SKY = 'SKY'
const CANDY = '🍬'

// Matrix of cell objects. e.g.: {type: SKY, gameObject: ALIEN}
var gBoard;
var gGame
var gCandiesInterval

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
    // setTimeout(addCandies, 3000)
    gAliens.interval = setInterval(moveAliens, ALIEN_SPEED)
    gCandiesInterval = setInterval(addCandies, 9000)
    document.querySelector('button').innerText = 'click to reset'
    document.querySelector('h2 span').innerHTML = 0
}

function restartValues() {
    gGame = {
        isOn: false,
        aliensCount: 0,
        score: 0,
        isWin: false,
        superAttack: 3,
    }
    createHero()
    createLaser()
    clearInterval(gCandiesInterval)
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

    clearInterval(gCandiesInterval)
    clearInterval(gAliens.interval)
    setTimeout(() => alert(`${msg}`), 20)
}

function addCandies() {
    // var colIdx = getRandomInt(0, gBoard[0].length)
    var cell = getEmptyFirstLineCell()
    console.log('colIdx: ', cell)
    updateCell(cell, CANDY)
    setTimeout(() => updateCell(cell, null), 5000)
}


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
            const isFloor = (cell.type === FLOOR) ? ' floor' : ''
            strHTML += `<td class="${className} ${isFloor}">`
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
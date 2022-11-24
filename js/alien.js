'use strict'


const ALIEN_SPEED = 500;
var gAliens = {
    array: [],
    counter: 0,
    interval: null,
    topRowIdx: null,
    bottomRowIdx: null,
    rightColIdx: null,
    leftColIdx: null,
    isAlienFreeze: false,
    goRight: true,
}

// The following two variables represent the part of the matrix (some rows)
// that we should shift (left, right, and bottom)
// We need to update those when:
// (1) shifting down and (2) last alien was cleared from row



function  createAliens(board) {
    // createAlien(1, 1, gBoard)
    var topRow = gAliens.topRowIdx = 0
    var bottomRow = gAliens.bottomRowIdx = 4
    var rightCol = gAliens.rightColIdx = 6
    var leftCol = gAliens.leftColIdx = 0
    for (var i = topRow; i < bottomRow; i++) {
        for (var j = leftCol; j < rightCol; j++) {
            createAlien(i, j, board)
        }
    }
}

function clearAlien(pos) {
    updateCell(pos, null)
}

function createAlien(iIdx, jIdx, board) {
    const alien = {
        pos: { i: iIdx, j: jIdx },
    }
    board[alien.pos.i][alien.pos.j].gameObject = ALIEN
    gAliens.array.push(alien)
}


function shiftBoardRight(board, fromI, toI) {
    const right = gAliens.rightColIdx
    const left = gAliens.leftColIdx
    gAliens.counter = 0
    for (var i = toI - 1; i >= fromI; i--) {
        for (var j = right - 1; j >= left; j--) {
            var cellPos = { i: i, j: j }
            var gameObj
            if (board[i][j].gameObject !== ALIEN) gameObj = null
            else {
                gameObj = ALIEN
                gAliens.counter++
            }
            // debugger
            const nextLocation = {
                i: i,
                j: j + 1,
            }
            if (board[nextLocation.i][nextLocation.j].gameObject === LASER) gameObj = ALIEN
            updateCell(nextLocation, gameObj)
            if (j === left) updateCell(cellPos, null)
        }
    }
    if (gAliens.counter === 0) gameOver(true)
    gAliens.leftColIdx++
    gAliens.rightColIdx++
    // console.log('gAliens.rightColIdx: ', gAliens.rightColIdx)
    // console.log('gAliens.leftColIdx: ', gAliens.leftColIdx)
}

function shiftBoardLeft(board, fromI, toI) {
    const right = gAliens.rightColIdx - 1
    const left = gAliens.leftColIdx
    gAliens.counter = 0

    for (var i = fromI; i <= toI + 1; i++) {
        for (var j = left; j <= right; j++) {
            var cellPos = { i: i, j: j }
            // debugger
            var gameObj = null
            if (board[i][j].gameObject === ALIEN) {
                gameObj = ALIEN
                gAliens.counter++
            }
            const nextLocation = {
                i: i,
                j: j - 1,
            }
            if (board[nextLocation.i][nextLocation.j].gameObject === LASER) gameObj = ALIEN

            updateCell(nextLocation, gameObj)
            if (j === left) updateCell(cellPos, null)
            if (j === right) updateCell(cellPos, null)
        }
    }
    if (gAliens.counter === 0) gameOver(true)
    gAliens.leftColIdx--
    gAliens.rightColIdx--

}

function shiftBoardDown(board, fromI, toI) {
    for (var i = toI; i >= fromI; i--) {
        for (var j = board[0].length - 1; j >= 0; j--) {
            var cellPos = { i: i, j: j }
            // debugger
            var gameObj = (board[i][j].gameObject !== ALIEN) ? null : ALIEN
            const nextLocation = {
                i: i + 1,
                j: j
            }
            updateCell(nextLocation, gameObj)
            if (i === fromI) updateCell(cellPos, null)
        }
    }
    if (gAliens.bottomRowIdx === gHero.pos.i) gameOver()
    gAliens.bottomRowIdx++
    gAliens.topRowIdx++
}

function moveAliens() {
    if (gAliens.isAlienFreeze) return
    // debugger
    if (gAliens.leftColIdx === 0) {
        shiftBoardDown(gBoard, gAliens.topRowIdx, gAliens.bottomRowIdx)
        gAliens.goRight = true
    }
    if (gAliens.rightColIdx === gBoard[0].length) {
        gAliens.goRight = false
        shiftBoardDown(gBoard, gAliens.topRowIdx, gAliens.bottomRowIdx)
    }
    if (gAliens.goRight) shiftBoardRight(gBoard, gAliens.topRowIdx, gAliens.bottomRowIdx)
    else shiftBoardLeft(gBoard, gAliens.topRowIdx, gAliens.bottomRowIdx)
}

function findAlienIdx(pos) {
    for (var i = 0; i < gAliens.array.length; i++) {
        if (gAliens.array[i].pos.i === pos.i && gAliens.array[i].pos.j === pos.j) {
            return i
        }
    }
    return -1
}


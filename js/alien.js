'use strict'


const ALIEN_SPEED = 500;
var gIntervalAliens;
var gAliens = []

// The following two variables represent the part of the matrix (some rows)
// that we should shift (left, right, and bottom)
// We need to update those when:
// (1) shifting down and (2) last alien was cleared from row

var gAliensTopRowIdx;
var gAliensBottomRowIdx;
var gIsAlienFreeze = true;



function createAliens(board) {
    // createAlien(1, 1, gBoard)
    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 6; j++) {
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
    gAliens.push(alien)

}

function handleAlienHit(pos) {
}

function shiftBoardRight(board, fromI, toI) {
    // console.log('MOVE!')

    // for (var i = 0; i < gAliens.length; i++) {
    //     var alien = gAliens[i]
    //     const nextLocation = {
    //         i: alien.pos.i,
    //         j: alien.pos.j + 1
    //     }
    //     updateCell(nextLocation, ALIEN)
    //     updateCell(alien.pos, null)
    //     alien.pos = nextLocation
    // }

}

function shiftBoardLeft(board, fromI, toI) { }
function shiftBoardDown(board, fromI, toI) { }



// runs the interval for moving aliens side to side and down
// it re-renders the board every time
// when the aliens are reaching the hero row - interval stops
function moveAliens() {
    for (var i = 0; i < gAliens.length; i++) {
        const alien = gAliens[i]
        // moveAlien(alien)
    }
}

// function moveAlien(alien) {
//     const moveDiff = getMoveDiff()
//     const nextLocation = {
//         i: alien.pos.i + moveDiff.i,
//         j: alien.pos.j + moveDiff.j,
//     }
//     const nextCell = gBoard[nextLocation.i][nextLocation]



//     updateCell(alien.pos, null)
//     updateCell(nextLocation, ALIEN)
//     nextCell.gameObject = ALIEN
// }



// function foundAlienIdx(pos) {
//     for (var i = 0; i < gAliens.length; i++) {
//         var alien = gAliens[i]
//         if (alien.pos.i === pos.i && alien.pos.j === pos.j) return i
//     }
//     return -1
// }

function removeAlien(pos) {
    for (var i = 0; i < gAliens.length; i++) {
        var alien = gAliens[i]
        console.log('alien: ', alien)
        if (alien.pos.i === pos.i && alien.pos.j === pos.j) {
            gAliens.splice(i, 1)
            return true
        }
    }
    return false
}

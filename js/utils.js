'use strict'

function removeAlien(pos) {
    var idx = findAlienIdx(pos)
    gAliens.array.splice(idx, 1)
}

function createCell(gameObject = null) {
    return {
        type: SKY,
        gameObject: gameObject
    }
}

function updateCell(pos, gameObject = null) {
    gBoard[pos.i][pos.j].gameObject = gameObject;
    var elCell = getElCell(pos);
    elCell.innerHTML = gameObject || '';
}

function getElCell(pos) {
    return document.querySelector(`.cell-${pos.i}-${pos.j}`)

}

function getRandomInt(min, max) { //Inclusive
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
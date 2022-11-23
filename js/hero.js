'use strict'



const LASER_SPEED = 80;
var gHero


// creates the hero and place it on board
function createHero(board) {
    gHero = {
        pos: { i: 12, j: 7 },
        isShoot: false
    };
    gBoard[gHero.pos.i][gHero.pos.j].gameObject = HERO
}


// Handle game keys
function getNextLocation(key) {
    const nextPos = {
        i: gHero.pos.i,
        j: gHero.pos.j
    }

    switch (key) {
        case 'ArrowLeft':
            nextPos.j -= 1
            // console.log('hey')
            break
        case 'ArrowRight':
            nextPos.j += 1
            // console.log('hey')
            break
    }
    return nextPos
}

// Move the hero right (1) or left (-1)
function moveHero(ev) {
    if (!gGame.isOn) return
    // console.log(' gLaser ', gLaser)

    shoot(ev.key)

    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextLocation.j >= gBoard[0].length || nextLocation.j < 0) return

    // move the hero from (board)
    updateCell(gHero.pos, null)
    updateCell(nextLocation, HERO)
    //update the hero pos - model
    gHero.pos = nextLocation

}



// TODO: if the user enter 'space' we need to function createLaser()
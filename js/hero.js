'use strict'

var gHero

function createHero(board) {
    gHero = {
        pos: { i: 12, j: 7 },
        isShoot: false,
        isSuper: false,
    };
    gBoard[gHero.pos.i][gHero.pos.j].gameObject = HERO
}


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
        case 'x':
            superMode()
    }
    return nextPos
}

// Move the hero right (1) or left (-1)
function moveHero(ev) {
    if (!gGame.isOn) return
    shoot(ev)

    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextLocation.j >= gBoard[0].length || nextLocation.j < 0) return

    updateCell(gHero.pos, null)
    updateCell(nextLocation, HERO)
    gHero.pos = nextLocation
}


function superMode() {
    if (gHero.isSuper) return
    if (gGame.superAttack === 0) return
    gHero.isSuper = true
    gLaser.speed = SUPER_LASER_SPEED
    setTimeout(() => {
        gLaser.speed = LASER_SPEED
        gHero.isSuper = false
    }, 5000)
    gGame.superAttack--
}
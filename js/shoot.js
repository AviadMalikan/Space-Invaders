'use strict'

var gLaser


function createLaser() {
    gLaser = {
        pos: { i: gHero.pos.i, j: gHero.pos.j },
        interval: '',
        shotPos: null,
        speed: 80,
    }
}

function moveLaserPos() {
    gLaser.pos = { i: gHero.pos.i, j: gHero.pos.j }
}

// Sets an interval for shutting (blinking) the laser up towards aliens
function shoot(ev) {
    if (ev !== 'ArrowUp') return
    if (gHero.isShoot) return
    gHero.isShoot = true
    moveLaserPos()
    blinkLaser(gLaser.pos)
    gLaser.interval = setInterval(() => blinkLaser(gLaser.pos), gLaser.speed)
    // console.log('gLaser.pos: ', gLaser.pos)
}


function blinkLaser(pos) {
    if (gLaser.pos.i <= 0) return clearShot(pos)
    const nextLocation = {
        i: pos.i - 1,
        j: pos.j
    }
    // console.log('nextLocation: ', nextLocation)
    if (gBoard[nextLocation.i][nextLocation.j].gameObject === ALIEN) {
        updateCell(nextLocation, null)
        clearShot(pos)
        removeAlien(nextLocation)
    } else {
        updateCell(nextLocation, LASER)
        if (pos.i !== 12) updateCell(pos, null)
    }
    gLaser.pos = nextLocation
}

function clearShot(pos) {

    clearInterval(gLaser.interval)
    console.log('pos to clear: ', pos)
    updateCell(pos, null)
    console.log('POW')
    gHero.isShoot = false
}

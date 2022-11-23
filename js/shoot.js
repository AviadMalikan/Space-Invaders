'use strict'

var gLaser


function createLaser() {
    gLaser = {
        pos: { i: gHero.pos.i, j: gHero.pos.j },
        interval: '',
        shotPos: null,
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
    gLaser.interval = setInterval(() => blinkLaser(gLaser.pos), 100)
    console.log('gLaser.pos: ', gLaser.pos)
}



function blinkLaser(pos) {
    console.log('pos: ', pos)
    if (gLaser.pos.i <= 0) {
        clearInterval(gLaser.interval)
        console.log('Fire shot')
        gHero.isShoot = false
    }

    const nextLocation = {
        i: pos.i - 1,
        j: pos.j
    }
    console.log('nextLocation: ', nextLocation)

    updateCell(nextLocation, LASER)
    if (pos.i !== 12) updateCell(pos, null)

    gLaser.pos = nextLocation
}


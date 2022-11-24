'use strict'

var gLaser


function createLaser() {
    gLaser = {
        pos: { i: gHero.pos.i, j: gHero.pos.j },
        interval: null,
        shotPos: null,
        speed: 50,
    }
    clearInterval(gLaser.interval)
}

function moveLaserPos() {
    gLaser.pos = { i: gHero.pos.i, j: gHero.pos.j }
}

function shoot(ev) {
    if (ev.key !== 'ArrowUp') return
    if (gHero.isShoot) return
    gHero.isShoot = true
    moveLaserPos()
    blinkLaser(gLaser.pos)
    gLaser.interval = setInterval(() => blinkLaser(gLaser.pos), gLaser.speed)
    // console.log('gLaser.pos: ', gLaser.pos)
}


function blinkLaser(pos) {
    if (gLaser.pos.i <= 0) {
        clearDrawShot(pos)
        return
    }

    const nextLocation = {
        i: pos.i - 1,
        j: pos.j
    }
    // console.log('nextLocation: ', nextLocation)
    if (gBoard[nextLocation.i][nextLocation.j].gameObject === ALIEN) {
        updateCell(nextLocation, null)
        clearHitShot(pos, nextLocation)
        updateScore(10)
        // console.log('gAliens.amount.length: ', gAliens.array.length)
        if (gAliens.array.length === 0) gameOver(true)
    } else {
        updateCell(nextLocation, LASER)
        if (pos.i !== 12) updateCell(pos, null)
        // }
        gLaser.pos = nextLocation
    }
}

function clearDrawShot(pos) {
    updateCell(pos, null)
    console.log('POW DRAW')
    clearInterval(gLaser.interval)
    gHero.isShoot = false
}

function clearHitShot(pos, nextPos) {
    clearInterval(gLaser.interval)
    updateCell(pos, null)
    console.log('POW HIT')
    gHero.isShoot = false
    removeAlien(nextPos)
}
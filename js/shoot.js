'use strict'

var gLaser
const LASER_SPEED = 80;
const SUPER_LASER_SPEED = 40

function createLaser() {
    gLaser = {
        pos: { i: gHero.pos.i, j: gHero.pos.j },
        interval: null,
        shotPos: null,
        speed: LASER_SPEED,
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
    const nextLocation = {
        i: pos.i - 1,
        j: pos.j
    }
    if (pos.i <= 0) {
        clearShot(pos)
        return
    }

    // debugger
    if (gBoard[nextLocation.i][nextLocation.j].gameObject === ALIEN) {
        clearHitShot(pos, nextLocation)
        updateCell(nextLocation, null)
        updateScore(10)
        // console.log('gAliens.amount.length: ', gAliens.array.length)
        if (gAliens.array.length === 0) gameOver(true)
    } else if (gBoard[nextLocation.i][nextLocation.j].gameObject === CANDY) {
        gAliens.isAlienFreeze = true
        clearShot(nextLocation)
        clearShot(pos)
        updateScore(50)
        setTimeout(() => gAliens.isAlienFreeze = false, 5000)
    } else {
        var laserSymbol = gHero.isSuper ? SUPER_LASER : LASER
        updateCell(nextLocation, laserSymbol)
        if (pos.i !== 12) updateCell(pos, null)
        // }
        gLaser.pos = nextLocation
    }
}

function clearShot(pos) {
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
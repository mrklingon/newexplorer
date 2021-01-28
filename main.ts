function doReport () {
    for (let index = 0; index <= Stars.length - 1; index++) {
        basic.showString("" + (Types[index]))
        if ("M" == Types[index]) {
            Mfound += 1
        }
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
        findCoord(Stars[index])
        led.plotBrightness(sx, sy, Magnitude[index])
        basic.pause(500)
    }
    showStars()
}
input.onButtonPressed(Button.A, function () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    basic.showString("M:")
    basic.showNumber(Mfound)
    basic.pause(100)
    showStars()
})
function buildUniverse () {
    for (let index2 = 0; index2 <= 8; index2++) {
        buildStars()
        qStars.push(Stars)
        qMag.push(Magnitude)
        qTypes.push(Types)
    }
}
input.onButtonPressed(Button.AB, function () {
    doWarp()
    Quad = randint(0, 8)
    basic.showString("Q:")
    basic.showNumber(Quad)
    basic.pause(100)
    buildStars()
    showStars()
})
input.onButtonPressed(Button.B, function () {
    doReport()
})
function getStars (num: number) {
    if (num >= 0 && num <= 8) {
        Stars = qStars[num]
        Magnitude = qMag[num]
        Types = qTypes[num]
    }
}
function buildStars () {
    Types = []
    Stars = []
    Magnitude = []
    for (let index = 0; index < randint(5, 13); index++) {
        Stars.push(randint(0, 24))
        Magnitude.push(randint(50, 242))
        Types.push(TypeList[randint(0, TypeList.length - 1)])
    }
}
function findCoord (num: number) {
    sx = Math.trunc(num / 5)
    sy = num % 5
}
function doWarp () {
    images.createBigImage(`
        . . . . . . . . . .
        # # # # . # # # # .
        . . # . . . # . . .
        . . . # # # # . . .
        . . . . . . . . . .
        `).scrollImage(1, 200)
    images.createBigImage(`
        . . . . . . . . . .
        . # . . # . . . . .
        . . . . . . . . . .
        . . . # . . . . . .
        . . . . . . . . . .
        `).scrollImage(1, 200)
}
function showStars () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    for (let index4 = 0; index4 <= Stars.length - 1; index4++) {
        findCoord(Stars[index4])
        led.plotBrightness(sx, sy, Magnitude[index4])
    }
}
let Quad = 0
let Magnitude: number[] = []
let sy = 0
let sx = 0
let Types: string[] = []
let Stars: number[] = []
let qTypes: string[][] = []
let qStars: number[][] = []
let qMag: number[][] = []
let Mfound = 0
let TypeList: string[] = []
doWarp()
TypeList = ["D", "H", "J", "K", "L", "M", "N", "R", "T", "Y"]
Mfound = 0
qMag = []
qStars = []
qTypes = []
buildUniverse()
getStars(1)
showStars()

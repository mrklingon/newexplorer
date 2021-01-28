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
input.onGesture(Gesture.LogoUp, function () {
    Delta = 5
})
input.onGesture(Gesture.TiltLeft, function () {
    Delta = -1
})
function buildUniverse () {
    for (let index2 = 0; index2 <= 25; index2++) {
        buildStars()
        qStars.push(Stars)
        qMag.push(Magnitude)
        qTypes.push(Types)
    }
}
input.onButtonPressed(Button.AB, function () {
    doWarp()
    Quad = (Quad + Delta + 25) % 25
    Delta = 0
    basic.showString("Q:")
    basic.showNumber(Quad)
    basic.pause(100)
    getStars(Quad)
    showStars()
})
input.onButtonPressed(Button.B, function () {
    doReport()
})
input.onGesture(Gesture.TiltRight, function () {
    Delta = 1
})
function getStars (num: number) {
    if (num >= 0 && num <= 8) {
        Stars = qStars[num]
        Magnitude = qMag[num]
        Types = qTypes[num]
    }
}
input.onGesture(Gesture.LogoDown, function () {
    Delta = -5
})

input.onGesture(Gesture.Shake, function () {
    Quad = randint(0,8)
})
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
let Delta = 0
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
let Quad = 0
Quad = 12
doWarp()
TypeList = ["D", "H", "J", "K", "L", "M", "N", "R", "T", "Y"]
Mfound = 0
qMag = []
qStars = []
qTypes = []
buildUniverse()
getStars(12)
showStars()

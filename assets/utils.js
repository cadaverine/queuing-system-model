export function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

export function getPoissonRandom(lambda) {
    let k = 0
    let multiplier = 1

    do {
        k++
        multiplier *= Math.random()
    } while(multiplier > Math.exp(-lambda))

    return k
}
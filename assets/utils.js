export function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

export function getPoissonRandom(lambda) {
    let k = 0
    let multiplier = Math.random()

    while (multiplier > Math.exp(-lambda)) {
        multiplier *= Math.random()
        k++
    }

    return k
}
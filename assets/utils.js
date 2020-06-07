

export function delay(ms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, ms);
    })
}

export function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}


export function getPoissonRandom(lambda) {
    let r = Math.random()
    let pr = r

    let k = 0
    for (; pr > Math.exp(-lambda); k++) {
        r = Math.random()
        pr *= r
    }

    return k
}
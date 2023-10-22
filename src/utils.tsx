export function stringToArray(entry: string): string[] {
    const output = []

    for (let i = 0; i < entry.length; i++) {
        output.push(entry.charAt(i))
    }

    return output
}

export function arrayToString(entry: string[]): string {
    let output = ''

    for (const letter of entry) {
        output = `${output}${letter}`
    }

    return output.toUpperCase()
}

export function shuffleArray(array: any[]): any[] {
    let currentIndex = array.length,  randomIndex;
    const result = [...array]

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [result[currentIndex], result[randomIndex]] = [
        result[randomIndex], result[currentIndex]];
    }

    return result
  }
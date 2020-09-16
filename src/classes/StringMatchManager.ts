class StringMatchManager {
    public get = (searchedWord: string, wordsToCompare: string[]): string[] => {
        const expresions = this.searchForWord(
            searchedWord
                .toLocaleUpperCase()
                .split(' ')
                .map((word) => RegExp(word))
        )

        const matchesOfWords = wordsToCompare.map((word) => expresions(word))
        const maxCountOfMatches: number = Math.max(...matchesOfWords)

        return wordsToCompare.filter((word, index) => matchesOfWords[index] == maxCountOfMatches)
    }

    private searchForWord = (regseExp: RegExp[]) => (wordToCompare: string): number =>
        regseExp.reduce((matches: number, regExp: RegExp) => {
            if (regExp.test(wordToCompare.toLocaleUpperCase())) return matches + 1
            return matches
        }, 0)
}

export default StringMatchManager

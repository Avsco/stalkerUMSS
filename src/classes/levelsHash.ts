export default class LevelsMap {
    private levels: Map<string, string> = new Map()

    constructor() {
        this.levels.set('A', 'Semestre 1')
        this.levels.set('B', 'Semestre 2')
        this.levels.set('C', 'Semestre 3')
        this.levels.set('D', 'Semestre 4')
        this.levels.set('E', 'Semestre 5')
        this.levels.set('F', 'Semestre 6')
        this.levels.set('G', 'Semestre 7')
        this.levels.set('H', 'Semestre 8')
        this.levels.set('I', 'Semestre 9')
        this.levels.set('J', 'Semestre 10')
    }

    get(key: string) {
        return this.levels.get(key)
    }
}

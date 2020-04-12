export default class colorManager {
    colors: string[] = ['#BFDDE7', '#E2D3A8', '#E6AC86', '#F4D1C4', '#B29299', '#d89b96', '#C4D7D1']

    addColors = (subjectMattersSize: number) => {
        for (let index = 0; index < subjectMattersSize; index++) {
            document.querySelectorAll('.color' + index).forEach(classColor => {
                const td: any = classColor.parentNode
                td.style.background = this.getColor(index)
            })
        }
    }

    getColor = (index: number): string => {
        let indexOne: number = index
        while (indexOne >= this.colors.length) {
            indexOne -= this.colors.length
        }
        return this.colors[indexOne]
    }

    removeColors = () => {
        const nodesWithStyles = document.querySelectorAll('td[style]')
        nodesWithStyles.forEach(nodeWithStyle => {
            nodeWithStyle.removeAttribute('style')
        })
    }

    watchColors = (subjectMattersSize: number) => {
        this.removeColors()
        this.addColors(subjectMattersSize)
    }
}

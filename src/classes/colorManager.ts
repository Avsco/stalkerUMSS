export default class colorManager {
    colors: string[] = ['#BFDDE7', '#d89b96', '#F4D1C4', '#E2D3A8', '#E6AC86', '#B29299', '#C4D7D1']

    getColor = (index: number): string => this.colors[index % this.colors.length]
}

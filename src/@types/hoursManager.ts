class hoursManager {
    data: string[] = ['645', '815', '945', '1115', '1245', '1415', '1545', '1715', '1845', '2015', '2145']

    dataForHTML = () => {
        let newData: string[] = []
        for (let element of this.data) {
            if (element === this.data[this.data.length - 1]) break
            newData.push(this.convert(element))
        }
        return newData
    }

    convert = (hour: string) => {
        const cut = hour.length > 3 ? 2 : 1
        return hour.slice(0, cut) + ':' + hour.slice(-2)
    }
}

export default hoursManager

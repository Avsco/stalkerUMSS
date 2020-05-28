class hoursManager {
    // data: string[] = ['645', '815', '945', '1115', '1245', '1415', '1545', '1715', '1845', '2015', '2145']

    data: string[] = [
        '645',
        '730',
        '815',
        '900',
        '945',
        '1030',
        '1115',
        '1200',
        '1245',
        '1330',
        '1415',
        '1500',
        '1545',
        '1630',
        '1715',
        '1800',
        '1845',
        '1930',
        '2015',
        '2100',
        '2145',
    ]

    getData = () => this.data.slice(0, -1)

    dataForHTML = () => {
        //del schedule2
        let newData: string[] = []
        for (let element of this.data) {
            if (element === this.data[this.data.length - 1]) break
            newData.push(this.convert(element))
        }
        return newData
    }

    convert = (hour: string) => {
        //del schedule2
        const cut = hour.length > 3 ? 2 : 1
        return hour.slice(0, cut) + ':' + hour.slice(-2)
    }

    //del schedule3
    getTimes = (start: string, end: string) => this.data.filter((hour) => start < hour && end >= hour).length
}

export default hoursManager

class HoursManager {
    private data: string[] = [
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
        '2145'
    ]

    public getData = () => this.data.slice(0, -1)

    public getValue = (index: number) => this.data[index]

    public getIndex = (value: string) => this.data.indexOf(value)

    public getLenght = () => this.data.length

    public dataForHTML = () => this.getData().map((data) => this.convert(data))

    public convert = (hour: string): string => hour.slice(0, hour.length > 3 ? 2 : 1) + ':' + hour.slice(-2)

    public IndexInRange = (start: string, end: string, indexStartSchedule: number): boolean =>
        this.getIndex(start) <= indexStartSchedule && this.getIndex(end) > indexStartSchedule

    public inRange = (start: string, end: string, startSchedule: string): boolean =>
        this.getIndex(start) <= this.getIndex(startSchedule) && this.getIndex(end) > this.getIndex(startSchedule)

    public compareHour = (indexHourSchedule: number, scheduleHour: string) => this.getValue(indexHourSchedule) == scheduleHour

    public indexOf = (hour: string) => this.data.indexOf(hour)
}

export default HoursManager

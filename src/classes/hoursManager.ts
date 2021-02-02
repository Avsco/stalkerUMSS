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

    getValue = (index: number): string => this.data[index]

    getIndex = (value: string): number => this.data.indexOf(value)

    getLenght = (): number => this.data.length

    dataForHTML = (): string[] => this.data.map((data) => this.convert(data))

    convert = (hour: string): string => hour.slice(0, hour.length > 3 ? 2 : 1) + ':' + hour.slice(-2)

    IndexInRange = (start: string, end: string, indexStartSchedule: number): boolean =>
        this.getIndex(start) <= indexStartSchedule && this.getIndex(end) > indexStartSchedule

    inRange = (start: string, end: string, startSchedule: string): boolean =>
        this.getIndex(start) <= this.getIndex(startSchedule) && this.getIndex(end) > this.getIndex(startSchedule)

    compareHour = (indexHourSchedule: number, scheduleHour: string): boolean => this.getValue(indexHourSchedule) == scheduleHour

    indexOf = (hour: string): number => this.data.indexOf(hour)
}

export default HoursManager

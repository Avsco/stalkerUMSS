export interface basicCarrer {
    name: string
    code: string
}

export interface completeCarrer {
    code: string
    subjets: subjets[]
    active: number[]
}

interface subjets {
    name: string
    groups: groups[]
}

interface groups {
    code: string
    teacher: string
}

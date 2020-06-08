export interface basicCarrer {
    name: string
    code: string
}

export interface completeCarrer {
    code: string
    subjets: subjets[]
}

interface subjets {
    name: string
    groups: groups[]
}

interface groups {
    code: string
    teacher: string
}

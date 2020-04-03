import axios from 'axios'

import { getUrl } from '@/@types/url'

export async function getCodes() {
    try {
        const { data } = await axios.get(getUrl())
        return data.map((carrer: any) => carrer.code)
    } catch (error) {
        console.error(error)
        return []
    }
}

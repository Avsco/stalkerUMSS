import axios from 'axios'

export async function getCodes() {
    try {
        const codeCarrers: string[] = []
        const { data } = await axios.get(`http://api.cappuchino.scesi.umss.edu.bo/schedule/FCyT`)
        data.forEach((carrer: any) => codeCarrers.push(carrer.code))
        return codeCarrers
    } catch (error) {
        console.log(error)
        return []
    }
}

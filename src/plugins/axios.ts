import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://api.cappuchino.scesi.umss.edu.bo/schedule/FCyT',
    headers: { 'Content-Type': 'application/json' }
})

export default instance

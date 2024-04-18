import { Lab } from "./lab";
import { initialData } from "./seed";
const key = 'lab'

export async function Save(lab: Lab) {
    const data = JSON.stringify(lab)
    localStorage.setItem(key, data)
}

export async function getAll() {
    const result = localStorage.getItem(key)
    if (result) {
        const data: Lab[] = JSON.parse(result)
        return data
    } else {
        const seed = JSON.stringify(initialData)
        localStorage.setItem(key, seed)
        return initialData
    }

}
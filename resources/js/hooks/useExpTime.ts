import { useState } from 'react'
import { getServerTime } from '../helpers'

export const useExpTime = (from: number): boolean => {
    const [isExp, setIsExp] = useState<boolean>(false)

    const calculate = async (): Promise<void> => {
        try {
            const unixTime = await getServerTime()
            if (from > 0) setIsExp(unixTime > from)

            await Promise.resolve()
            return
        } catch (err) {
            await Promise.reject(err)
        }
    }

    calculate().catch((err) => {
        console.log(err)
    })

    return isExp
}

import type React from 'react'

type returnType = (e: React.ChangeEvent<HTMLInputElement>) => void
type callbackType = (keywords: string) => void

export const useDebounce = (callback: callbackType, dur: number): returnType => {
    let timeout: string | number | NodeJS.Timeout | undefined

    const result = (e: React.ChangeEvent<HTMLInputElement>) => {
        const later = () => {
            timeout = undefined
            const value = e.target.value

            callback(value)
        }

        clearTimeout(timeout)

        timeout = setTimeout(later, dur)
    }

    return result
}

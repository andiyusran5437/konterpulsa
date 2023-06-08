import type React from 'react'
import { useCallback } from 'react'
import { toCurrency } from '../helpers'

export const usePriceTyping = (prefix?: string): ((e: React.ChangeEvent<HTMLInputElement>) => void) => {
    const handler = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = parseInt(e.target.value.replace(/\D/g, ''))
        e.target.value = toCurrency(value, prefix)
    }, [])

    return handler
}

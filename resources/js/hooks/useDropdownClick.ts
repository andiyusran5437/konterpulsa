import type React from 'react'
import { useCallback } from 'react'

export const useDropdownClick = () => {
    const handler = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        const dropdownParent = e.currentTarget.parentElement
        const isActive = (dropdownParent?.classList as DOMTokenList).contains('shown')
        if (!isActive) {
            dropdownParent?.classList.add('shown')
        } else {
            dropdownParent?.classList.remove('shown')
        }
    }, [])

    return handler
}

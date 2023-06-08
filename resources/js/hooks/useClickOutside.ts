import { useEffect } from 'react'

type overlay = React.RefObject<HTMLDivElement>
type inner = React.RefObject<HTMLDivElement>
type setState = React.Dispatch<React.SetStateAction<boolean>>

export const useClickOutside = (overlay: overlay, inner: inner, setState: setState) => {
    useEffect(() => {
        const handleClick = (e: MouseEvent): void => {
            // check for inner
            const isInner = inner.current?.contains(e.target as Node) ?? false
            if (!isInner) setState(false)
        }

        overlay.current?.addEventListener('click', handleClick)

        return () => {
            overlay.current?.removeEventListener('click', handleClick)
        }
    }, [])
}

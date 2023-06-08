import { useMatch } from 'react-router-dom'

export const useMatchRouteClass = (route: string, className?: string): string => {
    const classes = useMatch(route) != null ? className ?? 'active' : ''

    return classes
}

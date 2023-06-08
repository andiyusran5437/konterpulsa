import React, { useRef } from 'react'
import { useDebounce } from '../../../../hooks'

interface Props {
    placeholder: string
    title: string
    callback: (text: string) => void
}

export const Search = ({ placeholder, title, callback }: Props): React.ReactElement => {
    const ref = useRef<HTMLInputElement>(null)

    const handleChange = useDebounce(callback, 500)

    return (
        <div className="inline-flex items-center">
            <span className="mr-2 roboto text-gray-500 text-base">Search:</span>
            <input
                ref={ref}
                type="text"
                onChange={handleChange}
                autoComplete="off"
                id="first_name"
                className="roboto text-gray-600 text-base w-full lg:w-auto bg-gray-50 outline-none border border-gray-300 py-1.5 px-4 rounded-lg focus:ring-1 focus:border-blue-500 focus:ring-blue-500"
                placeholder={placeholder}
                title={title}
            />
        </div>
    )
}

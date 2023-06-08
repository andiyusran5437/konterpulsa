import { format } from 'libphonenumber-js'
import React, { useCallback, useRef } from 'react'
import { useDebounce } from '../../../hooks'

interface Props {
    callback: (text: string) => void
    brand: string
    setPhoneNumber: React.Dispatch<React.SetStateAction<string>>
    oncClear: () => void
}

export const SerachCredit: React.FC<Props> = ({ callback, brand, setPhoneNumber, oncClear }) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = inputRef.current
        const phoneNumber = e.target.value
        if (input != null) {
            const formattedPhoneNumber = format(phoneNumber, 'ID', 'NATIONAL')
            input.value = formattedPhoneNumber
            const rawPhoneNumber = formattedPhoneNumber.replace(/\D/g, '')
            setPhoneNumber(rawPhoneNumber)
        }
    }

    const handleTyping = useDebounce(callback, 500)

    const handleClear = useCallback(() => {
        const input = inputRef.current
        if (input != null) {
            input.value = ''
            oncClear()
        }
    }, [])

    return (
        <>
            <div className="w-full lg:w-1/2 xl:w-1/2 md:w-2/3 relative flex items-center">
                <input
                    ref={inputRef}
                    onChange={handleTyping}
                    onBlur={handleBlur}
                    className="w-full bg-slate-50 text-gray-500 border focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none px-4 py-3.5 text-base font-medium rounded-lg"
                    type="text"
                    placeholder="Enter your number"
                />
                <div className="absolute right-4 flex items-center gap-2.5">
                    <span className="text-gray-400 font-medium roboto">{brand}</span>
                    <span onClick={handleClear} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                        <svg width="11" height="11" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M13.3 0.71001C13.2075 0.617307 13.0976 0.543759 12.9766 0.493577C12.8557 0.443396 12.726 0.417566 12.595 0.417566C12.464 0.417566 12.3344 0.443396 12.2134 0.493577C12.0924 0.543759 11.9825 0.617307 11.89 0.71001L7.00001 5.59001L2.11001 0.70001C2.01743 0.607428 1.90752 0.533988 1.78655 0.483883C1.66559 0.433778 1.53594 0.40799 1.40501 0.40799C1.27408 0.40799 1.14443 0.433778 1.02347 0.483883C0.902502 0.533988 0.792592 0.607428 0.70001 0.70001C0.607428 0.792592 0.533988 0.902502 0.483883 1.02347C0.433778 1.14443 0.40799 1.27408 0.40799 1.40501C0.40799 1.53594 0.433778 1.66559 0.483883 1.78655C0.533988 1.90752 0.607428 2.01743 0.70001 2.11001L5.59001 7.00001L0.70001 11.89C0.607428 11.9826 0.533988 12.0925 0.483883 12.2135C0.433778 12.3344 0.40799 12.4641 0.40799 12.595C0.40799 12.7259 0.433778 12.8556 0.483883 12.9766C0.533988 13.0975 0.607428 13.2074 0.70001 13.3C0.792592 13.3926 0.902502 13.466 1.02347 13.5161C1.14443 13.5662 1.27408 13.592 1.40501 13.592C1.53594 13.592 1.66559 13.5662 1.78655 13.5161C1.90752 13.466 2.01743 13.3926 2.11001 13.3L7.00001 8.41001L11.89 13.3C11.9826 13.3926 12.0925 13.466 12.2135 13.5161C12.3344 13.5662 12.4641 13.592 12.595 13.592C12.7259 13.592 12.8556 13.5662 12.9766 13.5161C13.0975 13.466 13.2074 13.3926 13.3 13.3C13.3926 13.2074 13.466 13.0975 13.5161 12.9766C13.5662 12.8556 13.592 12.7259 13.592 12.595C13.592 12.4641 13.5662 12.3344 13.5161 12.2135C13.466 12.0925 13.3926 11.9826 13.3 11.89L8.41001 7.00001L13.3 2.11001C13.68 1.73001 13.68 1.09001 13.3 0.71001Z"
                                fill="currentColor"
                            />
                        </svg>
                    </span>
                </div>
            </div>
        </>
    )
}

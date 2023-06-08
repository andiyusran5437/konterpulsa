import React from 'react'

interface Props {
    title: string
    subTitle: string
    color: string
    icon: string
}

export const Featured: React.FC<Props> = ({ title, subTitle, color, icon }) => {
    return (
        <div className="featured mr-4 mb-4 flex-1 bg-white flex items-center p-4 lg:p-5">
            <div style={{ ['--icon' as string]: icon, ['--color' as string]: color }} className="icon-box mr-4"></div>
            <div className="flex flex-col whitespace-nowrap overflow-hidden">
                <span className="featured-name text-lg text-gray-500 font-medium">{title}</span>
                <span className="featured-value text-gray-500 text-xl font-semibold whitespace-nowrap text-ellipsis roboto">{subTitle}</span>
            </div>
        </div>
    )
}

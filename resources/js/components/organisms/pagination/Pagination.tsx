import React from 'react'
import ReactPaginate from 'react-paginate'
import { useSearchParams } from 'react-router-dom'

interface Props {
    pageCount: number
    onPageChangeCallback: (params: string) => void
}

export const Pagination = React.memo(({ pageCount, onPageChangeCallback }: Props) => {
    const [searchParams] = useSearchParams()
    let page = searchParams.get('page') ?? 0
    page = parseInt(page.toString())
    const initialPage = page ?? 0

    const handlePageChange = (e: { selected: number }) => {
        searchParams.set('page', e.selected.toString())
        const params = searchParams.toString()
        onPageChangeCallback(params)
    }

    return (
        <div className="py-5 flex lg:justify-end overflow-auto">
            <ReactPaginate
                onPageChange={handlePageChange}
                forcePage={initialPage}
                className="react-paginate"
                breakLabel="..."
                nextLabel="Next"
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="Prev"
                renderOnZeroPageCount={undefined}
                activeClassName="active"
            />
        </div>
    )
})

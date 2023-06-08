import React, { useCallback, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDeleteBrand } from '../../../../hooks'
import { type Brand } from '../../../../types'
import { BrandListing } from '../../molecules'
import { Confirm } from '../confirm'

interface Props {
    brands: Brand[]
    perPage: number
    setReloadCount: React.Dispatch<React.SetStateAction<number>>
}

export const BrandList: React.FC<Props> = ({ brands, perPage, setReloadCount }) => {
    const [confirm, setConfirm] = useState(false)
    const [id, setId] = useState(0)
    const onClickDelete = (id: number) => {
        setId(id)
        setConfirm(true)
    }

    const [searchParams] = useSearchParams()
    const page = parseInt(searchParams.get('page') ?? '0')
    const startIndex = page * perPage

    const deleteBrand = useDeleteBrand()
    const handleDelete = useCallback(() => {
        deleteBrand(id)
            .then(() => {
                setConfirm(false)
                setReloadCount((prev) => prev + 1)
            })
            .catch(() => null)
    }, [id])

    return (
        <>
            <table className="w-full table table-nohover">
                <thead>
                    <tr>
                        <th className="text-center px-4 border-r py-3 w-16 whitespace-nowrap">No.</th>
                        <th className="text-left px-4 border-r py-3 whitespace-nowrap">Brand ID</th>
                        <th className="text-left px-4 border-r py-3 whitespace-nowrap">Name</th>
                        <th className="text-left px-4 border-r py-3 whitespace-nowrap">Kode Unik</th>
                        <th className="text-left px-4 border-r py-3 whitespace-nowrap">Created Time</th>
                        <th className="text-left px-4 border-r py-3 whitespace-nowrap">Status</th>
                        <th className="text-center px-4 border-r py-3 whitespace-nowrap">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {brands.map((brand, i) => (
                        <BrandListing index={startIndex + (i + 1)} brand={brand} key={brand.id} onClickDelete={onClickDelete} />
                    ))}
                </tbody>
            </table>
            {confirm ? (
                <Confirm onConfirm={handleDelete} message="Are you sure want to delete" className="text-center text-gray-500 text-lg font-medium roboto" setState={setConfirm} />
            ) : null}
        </>
    )
}

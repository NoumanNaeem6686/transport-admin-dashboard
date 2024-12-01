import { getUserById } from '@/actions/user.action'
import { History } from '@/components/History'
import React from 'react'

async function page({ params, searchParams }: any) {
    const { id } = params
    const page = Number(searchParams.page) || 1;
    const limit = Number(searchParams.limit) || 10;
    const { data, error } = await getUserById(id, page, limit)
    console.log("🚀 ~ page ~ data:", data)

    return (
        <>
            <History data={data} meta={data?.meta} />
        </>

    )
}

export default page
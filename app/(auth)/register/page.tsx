import { AuthUser } from '@/actions/user.action';
import Register from '@/components/auth/register'
import MainLoader from '@/components/Loader/MainLoader';
import React from 'react'
import { redirect } from 'next/navigation';
async function page({
    searchParams,
}: {
    searchParams: { invite?: number };
}) {



    if (!searchParams.invite) {
        redirect("/login")
    }
    const { data, error } = await AuthUser(searchParams.invite)
    console.log("🚀 ~ data:", data)
    if (error) {
        redirect("/login")

    }
    return (

        <Register data={data} id={searchParams.invite} />
    )
}

export default page
import React, { useEffect, useRef, useState } from "react";
import { ActionFunction, json, useActionData, redirect, LoaderFunction, useLoaderData } from "remix";
import { Modal } from "~/components/Modal";
import { UserWithProfile } from "~/util/interfaces";
import { getUser, requireUserId } from "~/util/session.server";
import { prisma, Profile } from '~/util/db.server'
import { UserCircle } from "~/components/UserCircle";

export const loader: LoaderFunction = async ({ request, params }) => {
    const user = await getUser(request)
    const recipient = await prisma.user.findUnique({
        select: {
            id: true,
            profile: true
        },
        where: {
            id: params.id
        }
    })
    return json({ user, recipient })
}

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData();
    const userId = await requireUserId(request)

    return redirect('/home')
}

export default function AddWebhookModal() {
    const actionData = useActionData()
    const data = useLoaderData()
    const { user } = useLoaderData<{ user: UserWithProfile }>()
    const [formError, setFormError] = useState(actionData?.error || '')
    const firstLoad = useRef(true)
    const [formData, setFormData] = useState<Profile>({
        firstName: actionData?.fields?.firstName || user?.profile?.firstName,
        lastName: actionData?.fields?.lastName || user?.profile?.lastName,
        department: actionData?.fields?.dedpartment || (user?.profile?.department || 'MARKETING'),
        profilePicture: user?.profile?.profilePicture || ''
    })

    useEffect(() => {
        if (!firstLoad.current) {
            setFormError('')
        }
    }, [formData])

    useEffect(() => {
        // We don't want to reset errors on page load because we want to see them
        firstLoad.current = false
    }, [])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setFormData(form => ({ ...form, [field]: event.target.value }))
    }

    return (
        <Modal isOpen={true} className="w-2/3">
            <div className="p-3 flex">
                <div className="w-1/4 text-center flex flex-col justify-center items-center gap-y-2">
                    <UserCircle profile={data.recipient.profile} className="h-24 w-24" />
                    <p className="text-blue-300" >{data.recipient.profile.firstName} {data.recipient.profile.lastName}</p>
                    {
                        data.recipient.profile.department && (
                            <span className="px-2 py-1 bg-gray-300 rounded-xl text-blue-300 w-auto">
                                {data.recipient.profile.department[0].toUpperCase() + data.recipient.profile.department.toLowerCase().slice(1)}
                            </span>
                        )
                    }
                </div>
                <div className="bg-blue-200 flex-1">
                    <p>lsdkfj</p>
                </div>
            </div>
        </Modal>
    )
}
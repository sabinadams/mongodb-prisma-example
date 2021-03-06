import React, { useEffect, useRef, useState } from "react";
import { ActionFunction, json, useActionData, redirect, LoaderFunction, useLoaderData, MetaFunction } from "remix";

import { FormField } from "~/components/FormField";
import { Modal } from "~/components/Modal";
import { SelectBox } from "~/components/SelectBox";
import { FileUploader } from '~/components/FileUploader';

import { Department, Profile } from "~/util/db.server";
import { UserWithProfile } from "~/util/interfaces";
import { getUser, requireUserId } from "~/util/session.server";
import { validateName } from "~/util/validators.server";
import { updateUser } from "~/util/users.server";

export const meta: MetaFunction = ({ data }: { data: { user: UserWithProfile } }) => ({
    charset: "utf-8",
    title: `${data.user.profile.firstName}'s Profile Settings`,
    viewport: "width=device-width,initial-scale=1",
});

export const loader: LoaderFunction = async ({ request }) => {
    const user = await getUser(request)
    return json({ user })
}

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData();
    const userId = await requireUserId(request)

    let firstName = form.get('firstName')
    let lastName = form.get('lastName')
    let department = form.get('department')

    if (
        typeof firstName !== 'string'
        || typeof lastName !== 'string'
        || typeof department !== 'string'
    ) {
        return json({ error: `Invalid Form Data` }, { status: 400 });
    }

    const errors = {
        firstName: validateName(firstName),
        lastName: validateName(lastName),
        department: validateName(department) // same validation needed here
    }

    if (Object.values(errors).some(Boolean))
        return json({ errors, fields: { department, firstName, lastName } }, { status: 400 });

    await updateUser(userId, {
        firstName,
        lastName,
        department: department as Department
    })

    return redirect('/home')
}

export default function ProfileSettingsModal() {
    const actionData = useActionData()
    const { user } = useLoaderData<{ user: UserWithProfile }>()
    const [formError, setFormError] = useState(actionData?.error || '')
    const firstLoad = useRef(true)
    const departments = [{ name: 'HR', value: 'HR' }, { name: 'Engineering', value: 'ENGINEERING' }, { name: 'Sales', value: 'SALES' }, { name: 'Marketing', value: 'MARKETING' }]
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

    const handleFileUpload = async (file: File) => {
        let inputFormData = new FormData()
        inputFormData.append('profile-pic', file)

        const response = await fetch('/avatar', {
            method: 'POST',
            body: inputFormData
        })
        const { imageUrl } = await response.json()

        setFormData({
            ...formData,
            profilePicture: imageUrl
        })
    }

    return (
        <Modal isOpen={true} className="w-1/3">
            <div className="p-3">
                <h2 className="text-4xl font-semibold text-blue-600 text-center mb-4">Your Profile</h2>
                <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full mb-2">
                    {formError}
                </div>
                <div className="flex">
                    <div className="w-1/3">
                        <FileUploader onChange={handleFileUpload} imageUrl={formData.profilePicture || ''} />
                    </div>
                    <div className="flex-1">
                        <form method="post">
                            <FormField htmlFor="firstName" label="First Name" error={actionData?.errors?.firstName} value={formData.firstName} onChange={e => handleInputChange(e, 'firstName')} />
                            <FormField htmlFor="lastName" label="Last Name" error={actionData?.errors?.lastName} value={formData.lastName} onChange={e => handleInputChange(e, 'lastName')} />
                            <SelectBox
                                className="w-full rounded-xl px-3 py-2 text-gray-400"
                                id="department"
                                label="Department"
                                name="department"
                                options={departments}
                                value={formData.department}
                                onChange={e => handleInputChange(e, 'department')}
                            />
                            <div className="w-full text-right mt-4">
                                <button type="submit" className="rounded-xl bg-yellow-300 font-semibold text-blue-600 px-16 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
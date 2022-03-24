import React, { useState } from "react";
import { ActionFunction, json, useActionData, redirect, LoaderFunction, useLoaderData } from "remix";
import { Modal } from "~/components/Modal";
import { getUser, requireUserId } from "~/util/session.server";
import { prisma } from '~/util/db.server'
import { UserCircle } from "~/components/UserCircle";
import { SelectBox } from "~/components/SelectBox";
import { Kudo } from '~/components/Kudo'
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
    const [formData, setFormData] = useState({
        message: '',
        style: {
            backgroundColor: 'RED',
            textColor: 'WHITE',
            emoji: 'THUMBSUP'
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
        setFormData(data => ({ ...data, [field]: e.target.value }))
    }
    const handleStyleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
        setFormData(data => ({
            ...data, style: {
                ...data.style,
                [field]: e.target.value
            }
        }))
    }
    const colors = [{
        value: 'RED',
        name: 'Red'
    }, {
        value: 'BLUE',
        name: 'Blue'
    }, {
        value: 'YELLOW',
        name: 'Yellow'
    }, {
        value: 'GREEN',
        name: 'Green'
    }, {
        value: 'WHITE',
        name: 'White'
    }]

    const emojis = [{
        value: 'THUMBSUP',
        name: 'Thumbs Up'
    }, {
        value: 'PARTY',
        name: 'Party'
    }, {
        value: 'HANDSUP',
        name: 'Hands Up'
    }]
    return (
        <Modal isOpen={true} className="w-2/3 p-10">
            <form method="post">
                <div className="flex flex-col md:flex-row gap-y-2 md:gap-y-0">
                    <div className="text-center flex flex-col items-center gap-y-2 pr-8">
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
                    <div className="flex-1 flex flex-col gap-y-4">
                        <textarea
                            name="message"
                            className="w-full rounded-xl h-40 p-4"
                            value={formData.message}
                            onChange={e => handleChange(e, 'message')}
                            placeholder={`Say something nice about ${data.recipient.profile.firstName}...`}
                        />
                        <div className="flex flex-col items-center md:flex-row md:justify-start gap-x-4">
                            <SelectBox
                                options={colors}
                                name="backgroundColor"
                                value={formData.style.backgroundColor}
                                onChange={e => handleStyleChange(e, 'backgroundColor')}
                                label="Background Color"
                                containerClassName="w-36"
                                className="w-full rounded-xl px-3 py-2 text-gray-400"
                            />
                            <SelectBox
                                options={colors}
                                name="textColor"
                                value={formData.style.textColor}
                                onChange={e => handleStyleChange(e, 'textColor')}
                                label="Text Color"
                                containerClassName="w-36"
                                className="w-full rounded-xl px-3 py-2 text-gray-400"
                            />
                            <SelectBox
                                options={emojis}
                                label="Emoji"
                                name="emoji"
                                value={formData.style.emoji}
                                onChange={e => handleStyleChange(e, 'emoji')}
                                containerClassName="w-36"
                                className="w-full rounded-xl px-3 py-2 text-gray-400"
                            />
                        </div>

                    </div>
                </div>
                <br />
                <p className="text-blue-600 font-semibold mb-2">Preview</p>
                <div className="flex flex-col items-center md:flex-row gap-x-24 gap-y-2 md:gap-y-0">
                    <Kudo profile={data.user.profile} kudo={formData} />
                    <div className="flex-1" />
                    <button type="submit" className="rounded-xl bg-yellow-300 font-semibold text-blue-600 w-80 h-12 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1">
                        Send
                    </button>
                </div>
            </form>
        </Modal >
    )
}
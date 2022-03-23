import { useState } from "react";
import { ActionFunction, useNavigate, json, useActionData, redirect } from "remix";
import { FormField } from "~/components/FormField";
// import { db } from "~/utils/db.server";
// import { requireUserId } from "~/utils/session.server";
import { Modal } from "~/components/Modal";
import { SelectBox } from "~/components/SelectBox";

// export const action: ActionFunction = async ({ request }) => {
//     const form = await request.formData();
//     const userId = await requireUserId(request)
//     const name = form.get("webhookName")

//     if (typeof name !== "string" || !name.length) {
//         return json({ error: `Please input a name` }, { status: 400 });
//     }

//     try {
//         await db.webhookEndpoint.create({
//             data: { name, userId }
//         })
//     } catch (e) {
//         return json(`There was a problem creating your endpoint`, 500)
//     }

//     return redirect('/home')
// }

export default function AddWebhookModal() {
    const actionData = useActionData()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dedpartment: ''
    })
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setFormData(form => ({ ...form, [field]: event.target.value }))
    }
    return (
        <Modal isOpen={true} className="w-1/3">
            <form method="post" className="p-3">
                <h2 className="text-4xl font-semibold text-blue-600 text-center mb-8">Your Profile</h2>
                <div className="flex">
                    <div className="w-1/3">Image</div>
                    <div className="flex-1">
                        <FormField htmlFor="firstName" label="First Name" value={formData.firstName} onChange={e => handleInputChange(e, 'firstName')} />
                        <FormField htmlFor="lastName" label="Last Name" value={formData.lastName} onChange={e => handleInputChange(e, 'lastName')} />
                        <SelectBox className="w-full rounded-xl px-3 py-2 text-gray-400" id="department" label="Department" name="department">
                            <option value="MARKETING">Marketing</option>
                            <option value="SALES">Sales</option>
                            <option value="ENGINEERING">Engineering</option>
                            <option value="HR">HR</option>
                        </SelectBox>
                        <div className="w-full text-right mt-4">
                            <button type="submit" className="rounded-xl bg-yellow-300 font-semibold text-blue-600 px-16 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </Modal >
    )
}
import { ActionFunction, useNavigate, json, useActionData, redirect } from "remix";
// import { db } from "~/utils/db.server";
// import { requireUserId } from "~/utils/session.server";
import { Modal } from "~/components/Modal";

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

    return (
        <Modal isOpen={true}>
            <form method="post">
                <label className="block font-nova-flat text-gray-600 text-center" htmlFor="webhookName">Webhook Name</label>
                <input type="text" name="webhookName" placeholder="Give it a name" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                <div className="text-xs text-center mt-1 tracking-wide text-red-600 h-5 w-full">
                    {actionData?.error?.length > 1 && actionData.error}
                </div>
                <div className="flex items-baseline justify-center">
                    <button className="px-6 mr-2 cursor-pointer py-2 mt-4 text-white bg-gray-600 rounded-lg hover:bg-gray-900" onClick={(e) => { e.preventDefault(); navigate('/home') }}>
                        Cancel
                    </button>
                    <input type="submit" className="px-6 cursor-pointer py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900" value="Create" />
                </div>

                <p className="text-xs italic text-gray-400 mt-8">A secret will be automatically generated upon creation.</p>
            </form>
        </Modal >
    )
}
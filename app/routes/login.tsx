import { useEffect, useRef, useState } from 'react'
import { ActionFunction, json, LoaderFunction, redirect, useActionData } from 'remix'
import { FormField } from '~/components/FormField'
import { Layout } from '~/components/Layout'
import { createUserSession, getUser, login, register } from '~/util/session.server'
import { validateEmail, validatePassword, validateName } from '~/util/validators.server'

export const loader: LoaderFunction = async ({ request }) => {
    // If there's already a user in the session, redirect to the home page
    return await getUser(request) ? redirect('/') : null
}

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData();
    const action = form.get("action");
    const email = form.get("email");
    const password = form.get("password");
    let firstName = form.get("firstName");
    let lastName = form.get("lastName");

    // If not all data was passed, error
    if (
        typeof action !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string"
    ) {
        return json({ error: `Invalid Form Data`, form: action }, { status: 400 });
    }

    // If not all data was passed, error
    if (
        action === 'register' && (
            typeof firstName !== "string" ||
            typeof lastName !== "string"
        )
    ) {
        return json({ error: `Invalid Form Data`, form: action }, { status: 400 });
    }

    // Validate email & password
    const errors = {
        email: validateEmail(email),
        password: validatePassword(password),
        ...(action === 'register' ? {
            firstName: validateName(firstName as string || ''),
            lastName: validateName(lastName as string || ''),
        } : {})
    };

    //  If there were any errors, return them
    if (Object.values(errors).some(Boolean))
        return json({ errors, fields: { email, password, firstName, lastName }, form: action }, { status: 400 });

    switch (action) {
        case 'login': {
            const user = await login({ email, password })
            if (!user) return json({ error: `Incorrect login` }, { status: 400 })
            return createUserSession(user.id, '/');
        }
        case 'register': {
            firstName = firstName as string
            lastName = lastName as string
            return await register({ email, password, firstName, lastName })
        }
        default:
            return json({ error: `Invalid Form Data` }, { status: 400 });
    }
}
export default function Login() {
    const actionData = useActionData()
    const [errors, setErrors] = useState(actionData?.errors || {})
    const [formError, setFormError] = useState(actionData?.error || '')
    const [action, setAction] = useState(actionData?.form || 'login')
    const formRef = useRef<HTMLFormElement>(null)
    const firstLoad = useRef(true)
    const [formData, setFormData] = useState({
        email: actionData?.fields?.email || '',
        password: actionData?.fields?.password || '',
        firstName: actionData?.fields?.lastName || '',
        lastName: actionData?.fields?.firstName || '',
    })

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setFormData(form => ({ ...form, [field]: event.target.value }))
    }

    useEffect(() => {
        // Clear the form if we switch forms
        if (!firstLoad.current) {
            const newState = {
                email: '',
                password: '',
                firstName: '',
                lastName: ''
            }
            setErrors(newState)
            setFormError('')
            setFormData(newState)
        }
    }, [action])

    useEffect(() => {
        if (!firstLoad.current) {
            setFormError('')
        }
    }, [formData])

    useEffect(() => {
        // We don't want to reset errors on page load because we want to see them
        firstLoad.current = false
    }, [])

    return <Layout>
        <div className="h-full justify-center items-center flex flex-col gap-y-4">
            {/* Form Switcher Button */}
            <button
                onClick={() => setAction(action == 'login' ? 'register' : 'login')}
                className="absolute top-8 right-8 rounded-xl bg-yellow-300 font-semibold text-blue-600 px-3 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
            >{action === 'login' ? 'Sign Up' : 'Sign In'}</button>

            <h2 className="text-5xl font-extrabold text-yellow-300">Welcome to Kudos!</h2>
            <p className="font-semibold text-slate-300">{
                action === 'login' ? 'Log In To Give Some Praise!' : 'Sign Up To Get Started!'
            }</p>

            <form ref={formRef} method="POST" className="rounded-2xl bg-gray-200 p-6 w-96">
                <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">
                    {formError}
                </div>
                <input type="hidden" name="action" value={action} />
                {/* Email */}
                <FormField htmlFor="email" label='Email' error={errors?.email} onChange={e => handleInputChange(e, 'email')} value={formData.email} />
                {/* Password */}
                <FormField htmlFor="password" label='Password' type="password" error={errors?.password} onChange={e => handleInputChange(e, 'password')} value={formData.password} />

                {/* Signup Specific Fields */}
                {
                    action === 'register' && <>
                        {/* First Name */}
                        <FormField htmlFor="firstName" label='First Name' error={errors?.firstName} onChange={e => handleInputChange(e, 'firstName')} value={formData.firstName} />
                        {/* Last Name */}
                        <FormField htmlFor="lastName" label='Last Name' error={errors?.lastName} onChange={e => handleInputChange(e, 'lastName')} value={formData.lastName} />
                    </>
                }

                <div className="w-full text-center">
                    <input type="submit" className="rounded-xl mt-2 bg-yellow-300 px-3 py-2 text-blue-600 font-semibold transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1" value={
                        action === 'login' ? "Sign In" : "Sign Up"
                    } />
                </div>
            </form>
        </div>
    </Layout>
}

import { useState } from 'react'
import { Layout } from '~/components/Layout'

export default function Login() {
    const [action, setAction] = useState('login')

    return <Layout>
        <div className="h-full justify-center items-center flex flex-col gap-y-4">
            <button className="absolute top-8 right-8 rounded-xl bg-yellow-300 font-semibold text-blue-600 px-3 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1">Sign Up</button>
            <h2 className="text-5xl font-extrabold text-yellow-300">Welcome to Kudos!</h2>
            <p className="font-semibold text-slate-300">Log In To Give Some Praise!</p>

            <form className="rounded-2xl bg-gray-200 p-6 w-96">
                <label htmlFor="email" className="text-blue-600 font-semibold">Email</label>
                <input type="text" id="email" name="email" className="w-full p-2 rounded-xl my-2" />
                <label htmlFor="password" className="text-blue-600 font-semibold">Password</label>
                <input type="password" id="email" name="password" className="w-full p-2 rounded-xl my-2" />

                <div className="w-full text-center my-2">
                    <input type="submit" className="rounded-xl bg-yellow-300 px-3 py-2 text-blue-600 font-semibold transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1" value="Sign In" />
                </div>
            </form>
        </div>
    </Layout>
}

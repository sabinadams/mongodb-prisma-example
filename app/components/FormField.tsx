import { useEffect, useState } from "react"

interface FormFieldProps {
    htmlFor: string,
    label: string,
    error?: string,
    type?: string,
    value: any,
    onChange?: (...args: any) => any
}

export function FormField({
    htmlFor,
    label,
    error = "",
    type = "text",
    value,
    onChange = () => { }
}: FormFieldProps) {
    const [errorText, setErrorText] = useState(error)

    useEffect(() => {
        setErrorText(error)
    }, [error])
    return <>
        <label htmlFor={htmlFor} className="text-blue-600 font-semibold">{label}</label>
        <input onChange={e => {
            onChange(e)
            setErrorText('')
        }} type={type || "text"} id={htmlFor} name={htmlFor} className="w-full p-2 rounded-xl my-2" value={value} />
        <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">
            {errorText || ''}
        </div>
    </>
}
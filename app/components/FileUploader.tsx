import React, { useRef, useState } from "react";

export const FileUploader = ({ onChange }: { onChange: (file: File) => any }) => {
    const [preview, setPreview] = useState('')
    const [draggingOver, setDraggingOver] = useState(false)
    const dropRef = useRef(null)
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const preventDefaults = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
    }
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        preventDefaults(e)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setPreview(URL.createObjectURL(e.dataTransfer.files[0]))
            onChange(e.dataTransfer.files[0])
        }
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.files && event.currentTarget.files[0]) {
            setPreview(URL.createObjectURL(event.currentTarget.files[0]))
            onChange(event.currentTarget.files[0])
        }
    }

    return (
        <div ref={dropRef}
            className={`${draggingOver ? 'border-4 border-dashed border-yellow-300 border-rounded' : ''} rounded-full w-24 h-24 bg-gray-400 flex justify-center items-center transition duration-300 ease-in-out hover:bg-gray-500 cursor-pointer`}
            onDragEnter={() => setDraggingOver(true)}
            onDragLeave={() => setDraggingOver(false)}
            onDrag={preventDefaults}
            onDragStart={preventDefaults}
            onDragEnd={preventDefaults}
            onDragOver={preventDefaults}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
        >
            {preview && <img src={preview} className="rounded-full w-full" alt="Preview" />}
            {
                !preview &&
                <p className="font-extrabold text-4xl text-gray-200 cursor-pointer select-none pointer-events-none">+</p>
            }
            <input id="profilepic" name="profilepic" type="file" ref={fileInputRef} onChange={handleChange} className="hidden" />
        </div>
    )
}
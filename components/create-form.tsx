"use client"

import { uploadImage } from "@/lib/action"
import { useFormState } from "react-dom"
import { SubmitButton } from "./button"

const CreateForm = () => {
    const [state, formAction] = useFormState(uploadImage, null)

    return (
        <form action={formAction}>
            <div className="mb-4 pt-2">
                <input type="text" name="title" placeholder="Title..." className="py-2 px-4 w-full rounded-sm border border-gray-400" />
                <div aria-live='polite' aria-atomic='true'>
                    <p className="text-red-500 mt-2 text-sm">{state?.error?.title}</p>
                </div>
            </div>
            <div className="mb-4 pt-2">
                <input type="file" name="image" className="file:py-2 file:px-4 file:mr-4 file:border-0 
                file:rounded-sm file:bg-gray-200 file:cursor-pointer hover:file:bg-gray-300 border border-gray-400 w-full" />
                <div aria-live='polite' aria-atomic='true'>
                    <p className="text-red-500 mt-2 text-sm">{state?.error?.image}</p>
                </div>
            </div>
            <div className="mb-4 pt-4">
                <SubmitButton label="upload" />
            </div>
        </form>
    )
}

export default CreateForm
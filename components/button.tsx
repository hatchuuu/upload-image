"use client"
import { deleteImage } from "@/lib/action";
import clsx from "clsx";
import Link from "next/link";
import { useFormStatus } from "react-dom";


export const SubmitButton = ({ label }: { label: string }) => {
    const { pending } = useFormStatus();
    return (
        <button className={
            clsx("bg-blue-600 w-full py-2.5 px-6 rounded-sm border-0 hover:bg-blue-600 text-white font-bold text-center",
                {
                    "opacity-50 cursor-progress": pending
                }
            )} type="submit" disabled={pending}>
            {label === "upload" ? (
                <>{pending ? "Uploading..." : "Upload"}</>
            ) : (
                <>{pending ? "Updating..." : "Update"}</>
            )}
        </button>
    )
}

export const EditButton = ({ id }: { id: string }) => {
    return (
        <Link href={`/edit/${id}`}
            className="border-2 transition ease-in-out duration-200 border-gray-600 rounded-md py-3 font-semibold text-center text-gray-600 text-sm  w-full hover:bg-gray-200"
        >Edit</Link>
    )
}

export const DeleteButton = ({ id }: { id: string }) => {
    const deleteImageWithId = deleteImage.bind(null, id)
    return (
        <form onSubmit={deleteImageWithId}>
            <DeleteBtn />
        </form>
    )
}

const DeleteBtn = () => {
    const { pending } = useFormStatus()
    return (
        <button type="submit" disabled={pending} className={clsx("transition ease-in-out duration-200 border-2 border-gray-600 bg-gray-600 rounded-md py-3 font-semibold text-center text-white text-sm  w-full hover:bg-gray-700", {
            "opacity-50 cursor-progress": pending
        })}>
            {pending ? "Deleting..." : "Delete"}
        </button>
    )
}
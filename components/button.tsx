"use client"
import clsx from "clsx";
import { useFormStatus } from "react-dom";

export const SubmitButton = ({ label }: { label: string }) => {
    const { pending } = useFormStatus();
    return (
        <button className={
            clsx("bg-blue-700 w-full py-2.5 px-6 rounded-sm border-0 hover:bg-blue-600 text-white font-bold text-center",
                {
                    "opacity-50 cursor-progress": pending
                }
            )} type="submit" disabled={pending}>
                {label === "upload" ? (
                    <>{pending ? "Uploading..." : "Upload"}</>
                ) : (
                    <>{pending ? "Updating" : "Update"}</>
                )}
        </button>
    )
}
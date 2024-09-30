"use server"
import { z } from 'zod'
import { put } from "@vercel/blob";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma'


const uploadSchema = z.object({
    title: z.string().min(1),
    image: z
        .instanceof(File)
        .refine((file) => file.type.startsWith("image/"), { message: "Only image are allowed" })
        .refine((file) => file.size === 0 || file.size > 0, { message: " Image is required " })
        .refine((file) => file.size < 4000000, { message: "Image must less than 4mb" })
})

export const uploadImage = async (prevState: unknown, formData: FormData) => {
    const validatedFields = uploadSchema.safeParse(
        Object.fromEntries(formData.entries()) //mengubah menjadi object biasa
    )
    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors, //memunculkan error menjadi format yang mudah dibaca
        }
    }

    const { title, image } = validatedFields.data
    const { url } = await put(image.name, image, {
        access: "public",
        multipart: true,
    })

    try {
        //kirim ke prisma.table.create
        await prisma.upload.create({
            data: {
                title,
                image: url,
            }
        })
    } catch (error) {
        return { message: "Failed to upload image" }
    }
    revalidatePath("/")
    redirect("/")
}



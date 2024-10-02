"use server"
import { z } from 'zod'
import { put, del } from "@vercel/blob";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma'
import { getDeleteImage, getImageById } from '@/lib/data';

//schema dari zod
const uploadSchema = z.object({
    title: z.string().min(1),
    image: z
        .instanceof(File)
        .refine((file) => file.type.startsWith("image/"), { message: "Only image are allowed" })
        .refine((file) => file.size === 0 || file.size > 0, { message: " Image is required " })
        .refine((file) => file.size < 4000000, { message: "Image must less than 4mb" })
})
//schema dari zod
const updateSchema = z.object({
    title: z.string().min(1),
    image: z
        .instanceof(File)
        .refine((file) => file.size === 0 || file.size > 0, { message: " Image is required " })
        .refine((file) => file.size < 4000000, { message: "Image must less than 4mb" })
        .optional()
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

    //insert data image, di distracturing agar mudah diakses
    const { title, image } = validatedFields.data
    const { url } = await put(image.name, image, {
        access: "public",
        multipart: true,
    })

    try {
        //kirim ke prisma.table.create
        //langsung insert ke database
        await prisma.upload.create({
            data: {
                title,
                image: url,
            }
        })
    } catch (error) {
        return { message: `${error} Failed to upload image` }
    }
    revalidatePath("/")
    redirect("/")
}
export const updateImage = async (id: string, prevState: unknown, formData: FormData) => {
    const validatedFields = updateSchema.safeParse(
        Object.fromEntries(formData.entries()) //mengubah menjadi object biasa
    )

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors, //memunculkan error menjadi format yang mudah dibaca
        }
    }

    /*
    Jika user update data tanpa image maka langsung,
    Jika user update dengan image, maka hapus image terlebih dahulu
    Fetching data terlebih dahulu menggunakan id tadi
    */

    const data = await getImageById(id)
    if (!data) return { message: "No Data Found" }

    //insert data image, di distracturing [data baru] agar mudah diakses
    const { title, image } = validatedFields.data

    let imagePath;

    //Jika tanpa image
    if (!image || image.size <= 0) {
        //set data lama
        imagePath = data.image
    } else {
        //hapus data lama
        await del(data.image)
        //update data baru
        const { url } = await put(image.name, image, {
            access: "public",
            multipart: true,
        })
        imagePath = url
    }

    try {
        //kirim ke prisma.table.update
        await prisma.upload.update({
            data: {
                title,
                image: imagePath,
            },
            where:{
                id
            }
        })
    } catch (error) {
        return { message: `${error} Failed to update image` }
    }
    revalidatePath("/")
    redirect("/")
}


export const deleteImage = async (id: string) => {
    //Hapus data gambar dari vercel blob
    //Hapus data dari postgre
    const data = await getImageById(id)
    if (!data) return { message: "No Data Found" }

    //     //Hapus image
    await del(data.image)

    //     //Hapus row data
        await getDeleteImage(id)

    revalidatePath("/")
}


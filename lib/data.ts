import { prisma } from "@/lib/prisma"

export const getImage = async () => {
    try {
        const response = await prisma.upload.findMany({
            orderBy: { "createdAt": "desc" },
        })
        return response
    } catch (error) {
        throw new Error(`${error} Failed to fetch data`)
    }
}

export const getImageById = async (id: string) => {
    try {
        const response = await prisma.upload.findUnique({
            where: { id },
        })
        return response
    } catch (error) {
        throw new Error(`${error} Failed to fetch data`)
    }
}

export const getDeleteImage = async (id: string) => {
    try {
        await prisma.upload.delete({
            where: { id }
        })
    } catch (error) {
        return { message:`${error}Failed to delete data` }
    }
}
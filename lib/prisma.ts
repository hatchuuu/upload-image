import { PrismaClient } from '@prisma/client';

declare global {
    var prisma: PrismaClient | undefined;
    //membuat global variable prisma dengan nilai awal undefined
}
export const prisma = globalThis.prisma || new PrismaClient();
//pencegahan agar tidak men-inisialisasi prisma berkali-kali
//memastikan apakah di global ada prisma, kalo ada digunakan, kalo tidak diinisialisasi baru

if(process.env.NODE_ENV !== 'production'){
    globalThis.prisma = prisma;
}
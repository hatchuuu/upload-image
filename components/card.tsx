import Image from "next/image"
import { DeleteButton, EditButton } from "./button"
import { Upload } from "@prisma/client"

const Card = ({ data }: { data: Upload }) => {
    //Konfigurasi tanggal
    const tanggal = new Date (data.createdAt)
    const waktu = tanggal.toLocaleDateString()
    return (
        <div className="border max-w-md shadow-lg p-5 rounded-xl bg-white ">
            <div className="relative aspect-video">
                <Image
                    src={data.image}
                    alt={data.title}
                    fill priority sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="rounded-lg object-cover" />
            </div>
            <div className="p-5 flex justify-between items-center">
                <h1 className="font-bold text-lg text-gray-900">{data.title.toUpperCase()}</h1>
                <h1 className=" text-sm text-gray-900">{waktu}</h1>
            </div>
            <div className="p-3 grid grid-cols-2 gap-2">
                <EditButton id={data.id} />
                <DeleteButton id={data.id} />
            </div>
        </div>
    )
}

export default Card
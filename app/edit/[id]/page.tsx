import EditForm from "@/components/edit-form"
import { getImageById } from "@/lib/data"
import { notFound } from "next/navigation"

const EditPage = async ({params}:{params :{id:string}}) => {
 const data = await getImageById(params.id)
 if(!data) return notFound()
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <div className="bg-white rounded-sm p-8 mx-auto">
                <p className='font-bold text-2xl mb-5'>Update Image</p>
                <EditForm data={data}/>
            </div>
        </div>
  )
}

export default EditPage
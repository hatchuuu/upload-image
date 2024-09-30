import CreateForm from '@/components/create-form'
import React from 'react'

const CreatePage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <div className="bg-white rounded-sm p-8 mx-auto">
                <p className='font-bold text-2xl mb-5'>Upload Image</p>
                <CreateForm/>
            </div>
        </div>
    )
}

export default CreatePage
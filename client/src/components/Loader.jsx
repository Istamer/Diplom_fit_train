import React from 'react'

export const Loader = () => {

    return (
        <div className='fixed z-10 w-full h-screen bg-neutral-900 flex flex-col'>
            <div className="m-auto flex flex-col items-center">
                <div
                    style={{ width: `200px`, height: `200px` }}
                    className="animate-spin">
                    <div className="h-full w-full border-[10px] border-t-orange-500 border-b-orange-400 rounded-full">
                    </div>
                </div>
                <div className='my-10 text-2xl font-bold text-white'>Зачекайте</div>
            </div>
        </div>
    )
}

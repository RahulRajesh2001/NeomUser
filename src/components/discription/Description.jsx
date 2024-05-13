import React from 'react'

const Description = ({ productDetailsDescription }) => {
  return (
    <div>
      <div className='text-[15px] font-semibold ml-5 mt-5 underline'>Description</div>
      <div className='flex flex-col  h-[340px] p-5 overflow-auto'>
        {/*description*/}
        <div className='w-[50%] flex flex-col gap-3 '>
          <div className='text-[14px] text-[#5F6C72]'>
            {productDetailsDescription}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Description

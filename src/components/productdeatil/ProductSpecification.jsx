import React from 'react'

const ProductSpecification = ({productSpecification}) => {
  return (
    <div className='flex  flex-col justify-center  items-center gap-3 overflow-auto'>
         <div className='text-[15px] font-semibold mt-5 underline '>Specifications</div>
    <div className='flex h-[340px]  '>
      {/*description*/}
      <div className=''>
       {productSpecification?.map((item)=>(
        <div key={item._id} className='flex gap-4'>
        <div className='text-[14px] text-[#5F6C72]'>{item?.specName}</div>
        <div className='text-[14px] text-[#5F6C72]'>{item?.specValue}</div>
        </div>
       ))}
      </div>
    </div>
</div>
  )
}

export default ProductSpecification
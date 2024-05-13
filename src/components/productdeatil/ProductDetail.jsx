import React, { useState } from 'react'
import Description from '../discription/Description'
import Review from '../review/Review'
import ProductSpecification from './ProductSpecification'

const ProductDetail = ({productDetailsDescription,id,productSpecification}) => {
  const [selectedTab, setSelectedTab] = useState('description')
  return (
    <div className=' w-[70%] h-[400px] mt-5 border border-[#E4E7E9]'>
      {/*Head part */}
      <div className='h-[60px]  border-b border-[#E4E7E9] flex justify-center gap-5'>
        <div
          className={`h-[60px] w-[150px]  border-[#FA8232] text-[14px] font-semibold flex justify-center items-center ${
            selectedTab === 'description' && 'border-b-4'
          }`}
          onClick={() => setSelectedTab('description')}
        >
          DESCRIPTION
        </div>
        <div
          className={`h-[60px] w-[150px]  border-[#FA8232] text-[14px] font-semibold flex justify-center items-center ${
            selectedTab === 'specification' && 'border-b-4'
          }`}
          onClick={() => setSelectedTab('specification')}
        >
          SPECIFICATION
        </div>
        <div
          className={`h-[60px] w-[150px]  border-[#FA8232] text-[14px] font-semibold flex justify-center items-center ${
            selectedTab === 'review' && 'border-b-4'
          }`}
          onClick={() => setSelectedTab('review')}
        >
          REVIEW
        </div>
      </div>
      {/*bottom part */}
      {selectedTab === 'description' && (<Description productDetailsDescription={productDetailsDescription}/>)}
      {selectedTab === 'review' && (<Review id={id}/>)}
      {selectedTab === 'specification' && (<ProductSpecification productSpecification={productSpecification} />)}

    </div>
  )
}

export default ProductDetail

import React from 'react'
import { MdKeyboardArrowDown } from "react-icons/md";

const SelectButton = ({head,innerHead}) => {
  return (
    <div className='flex flex-col gap-1'>
      <div className='text-[12px] font-semibold'>{head}</div>
      <div className='flex '>
        <div className='flex  items-center gap-3 border border-[#E4E7E9] text-[11px]  p-1'>{innerHead}<MdKeyboardArrowDown />
        </div>
      </div>
    </div>
  )
}

export default SelectButton

import React, { useState } from 'react'

const CounterButton = ({ count,quantity }) => {
  const [initial, setInitial] = useState(1)
  const inCrementCount = () => {
    if (initial < count) {
      setInitial((prev) => prev + 1)
    }
  }
  const decrementCount = () => {
    if (initial > 1) {
      setInitial((prev) => prev - 1)
    }
  }

quantity(initial)
  

  return (
    <div className='flex justify-evenly items-center w-[140px] h-[40px]  border border-[#E4E7E9]'>
      <div
        className='text-[#191C1F] text-[25px] cursor-pointer mb-1'
        onClick={decrementCount}
      >
        -
      </div>
      <div className='text-[#191C1F] text-[15px]'>{initial}</div>
      <div
        className='text-[#191C1F] text-[20px] cursor-pointer  mb-1'
        onClick={inCrementCount}
      >
        +
      </div>
    </div>
  )
}

export default CounterButton

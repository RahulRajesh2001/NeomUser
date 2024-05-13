import { useState, useEffect } from 'react'
import banner4 from '../../assets/banner4.jpg'
import banner5 from '../../assets/banner5.jpg'
import { LuBox } from 'react-icons/lu'
import { CiTrophy } from 'react-icons/ci'
import { MdOutlinePayment } from 'react-icons/md'
import { FaHeadphones } from 'react-icons/fa6'

const HomeCarosel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    { src: banner5, alt: 'Slide 1' },
    { src: banner4, alt: 'Slide 2' },
    { src: banner5, alt: 'Slide 3' },
    { src: banner4, alt: 'Slide 4' },
    { src: banner5, alt: 'Slide 5' },
    { src: banner4, alt: 'Slide 6' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1)
    }, 2000)

    return () => clearInterval(interval)
  }, [currentSlide, slides.length])

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)
  }

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1)
  }
  return (
    <div className=' w-[95%] '>
      <div
        id='default-carousel'
        className='relative w-full'
        data-carousel='slide'
      >
        <div className='relative  overflow-hidden rounded-lg vvsm:h-[250px] md:h-[500px] '>
          {slides?.map((slide, index) => (
            <div
              key={index}
              className={`carousel-item ${
                currentSlide === index
                  ? 'opacity-100'
                  : 'opacity-0 absolute transition-opacity duration-1000'
              }`}
              data-carousel-item
            >
              <img
                src={slide?.src}
                className='block rounded-lg '
                alt={slide?.alt}
              />
            </div>
          ))}
        </div>

        <div className='absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse'>
          {slides.map((_, index) => (
            <button
              key={index}
              type='button'
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? 'bg-black' : 'bg-gray-300'
              }`}
              aria-label={`Slide ${index + 1}`}
              data-carousel-slide-to={index}
              onClick={() => setCurrentSlide(index)}
            ></button>
          ))}
        </div>

        <button
          type='button'
          className='absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none'
          data-carousel-prev
          onClick={prevSlide}
        >
          {/* Previous button SVG */}
          <span className='sr-only'>Previous</span>
        </button>
        <button
          type='button'
          className='absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none'
          data-carousel-next
          onClick={nextSlide}
        >
          {/* Next button SVG */}
          <span className='sr-only'>Next</span>
        </button>
      </div>

      {/*Bottom Bar*/}
      <div className='vvsm:invisible md:visible  h-[70px] mb-5 rounded-sm flex items-center justify-evenly shadow-lg'>
        {/*first box*/}
        <div className=' w-[150px] h-[50px] flex justify-center items-center gap-3'>
          <div>
            <LuBox className='text-[25px]' />
          </div>
          <div className='flex flex-col justify-center items-center'>
            <div className='text-[#191C1F] text-[12px] font-semibold'>
              FASTED DELIVERY
            </div>
            <div className='text-[#5F6C72] text-[10px]'>Delivery in 24/H</div>
          </div>
        </div>
        <div className='w-[1px] h-[30px] bg-[#E4E7E9]'></div>
        {/*second box*/}
        <div className=' w-[150px] h-[50px] flex justify-center items-center gap-3'>
          <div>
            <CiTrophy className='text-[25px]' />
          </div>
          <div className='flex flex-col justify-center items-center'>
            <div className='text-[#191C1F] text-[12px] font-semibold'>
              24 HOURS RETURN
            </div>
            <div className='text-[#5F6C72] text-[10px]'>100% money back</div>
          </div>
        </div>
        <div className='w-[1px] h-[30px] bg-[#E4E7E9]'></div>
        {/*third box*/}
        <div className=' w-[150px] h-[50px] flex justify-center items-center gap-3'>
          <div>
            <MdOutlinePayment className='text-[25px]' />
          </div>
          <div className='flex flex-col justify-center items-center'>
            <div className='text-[#191C1F] text-[12px] font-semibold'>
              SECURE PAYMENT
            </div>
            <div className='text-[#5F6C72] text-[10px]'>Your money is safe</div>
          </div>
        </div>
        <div className='w-[1px] h-[30px] bg-[#E4E7E9]'></div>
        {/*fourth box*/}
        <div className=' w-[150px] h-[50px] flex justify-center items-center gap-3'>
          <div>
            <FaHeadphones className='text-[25px]' />
          </div>
          <div className='flex flex-col justify-center items-center'>
            <div className='text-[#191C1F] text-[12px] font-semibold'>
              SUPPORT 24/7
            </div>
            <div className='text-[#5F6C72] text-[10px]'>
              Live contact/message
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeCarosel

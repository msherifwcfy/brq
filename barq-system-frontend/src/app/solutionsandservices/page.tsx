import Footer from '@/components/footer'
import Navbar from '@/components/home-page/navbar'
import SolutionCards from '@/components/solutionsandservices/SolutionCards'
import Image from 'next/image'
import React from 'react'

const Page = () => {
  return (
    <div className='bg-black relative overflow-hidden'>

      <div className='absolute  bottom-0  right-0 top-[10%] left-0 w-full  '>
        <Image src="/assets/solutionsandservices/network-bg.svg" alt="cybersecurity background" width={820} height={918} className='object-cover absolute   z-30    w-full' />
      </div>
      <div className='absolute  bottom-0  right-0 top-[32.6%] left-[-10.2%] w-full  '>
        <Image src="/assets/solutionsandservices/homepage/bg-left.svg" alt="cybersecurity background" width={514} height={514} className='object-cover absolute   z-30     w-[514px]' />
      </div>


      <div className='absolute  bottom-0  right-0 top-[70.5%] left-[77%] w-full  '>
        <Image src="/assets/solutionsandservices/homepage/bg-right.svg" alt="cybersecurity background" width={514} height={514} className='object-cover absolute   z-30     w-[514px]' />
      </div>

      {/* Network background image positioned above hero background */}
      {/* <div className='absolute  bottom-0  right-0 top-[15%] left-0 w-full z-30 '>
        <Image src="/assets/solutionsandservices/network-bg.svg" alt="cybersecurity background" width={820} height={918} className='object-cover absolute   z-30    w-full' />
      </div
{/* Hero background */}
      <div className='relative h-[1005px] '
        style={{
          backgroundImage: "url('/assets/solutionsandservices/homepage/bg.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
        }}
      >
        {/* Hero content with higher z-index */}
        <div className='relative z-40 max-w-7xl mx-auto px-[5%] xl:px-0'>
          <Navbar isHomePage={false} />
          <div className='lg:mt-[138.48px] mt-[70px]'>
            <h3 className='text-[24px] frutiger-lt-std-bold leading-[28.8px] mb-6' style={{
              background: 'linear-gradient(63deg, #60C1CA 17.55%, #25B8E4 45%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              What We Do
            </h3>
            <h1 className='lg:text-[56px] text-[42px] frutiger-lt-std-bold leading-[44px] lg:leading-[61.6px] max-w-[657px]' style={{
              background: 'linear-gradient(89deg,  #FFF 5.74%, #A8E3F4 37.73%, #12BAF6 86.76%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Services & Solutions that Transform Complexity into Clarity
            </h1>
          </div>

          <div className="flex  mt-[24px] gap-[122px]">
            <p
              className='text-[#ECEEEE] text-[18px] font-normal  leading-[27px] max-w-[707px]'>
              BARQ Systems’ intelligent solutions accelerate digital transformation and <br /> empower businesses to innovate, scale, and stay ahead in a rapidly evolving <br /> landscape
            </p>
          </div>
          <div className=' mt-[188px] '>
            <div className=' text-center flex flex-col items-center justify-center '>
              <h3 className='text-[24px] frutiger-lt-std-bold leading-[28.8px] mb-4' style={{
                background: 'linear-gradient(63deg, #60C1CA 17.55%, #25B8E4 45%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Core Solutions
              </h3>
              <h1 className='lg:text-[56px] text-[42px] text-white  lg:leading-[61.6px] leading-[44px] mb-4 font-normal '>
                Our Core Solutions & Services
              </h1>
              <p className='text-[#ECEEEE] text-[18px] font-normal  leading-[27px] max-w-[766px] text-center'>
                Empowering businesses with innovative technology solutions and managed services  <br />
                designed to enhance operations, drive growth, and secure digital transformation
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Cards */}
      <div className='bg-black '>
        <SolutionCards />
      </div>
      <Footer />


    </div >
  )
}

export default Page
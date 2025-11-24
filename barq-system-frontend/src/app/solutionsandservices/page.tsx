import Footer from '@/components/footer'
import Navbar from '@/components/home-page/navbar'
import SolutionCards from '@/components/solutionsandservices/SolutionCards'
import SolutionsHero from '@/components/solutionsandservices/SolutionsHero'
import SolutionsHeroDescription from '@/components/solutionsandservices/SolutionsHeroDescription'
import CoreSolutionsIntro from '@/components/solutionsandservices/CoreSolutionsIntro'
import Image from 'next/image'
import React from 'react'
import { getSolutionsAndServicesHero } from '@/services/solutionsandservices.service'
import { getImageUrl } from '@/lib/utils'

export const dynamic = 'force-dynamic'

const Page = async () => {
  const heroData = await getSolutionsAndServicesHero()
  return (
    <div className='bg-black relative overflow-hidden'>

      <div className='absolute  bottom-0  right-0 top-[10%] left-0 w-full  '>
        <Image src="/assets/solutionsandservices/network-bg.svg" alt="cybersecurity background" width={820} height={918} className='object-cover absolute   z-30    w-full' />
      </div>
      <div className='absolute  bottom-0  right-0 top-[32.6%] left-[-10.2%] w-full  '>
        <Image src="/assets/solutionsandservices/homepage/bg-left.svg" alt="cybersecurity background" width={514} height={514} className='object-cover absolute   z-30     w-[514px]' />
      </div>


      {/* <div className='absolute  bottom-0  right-0 top-[70.5%] left-[77%] w-full  '>
        <Image src="/assets/solutionsandservices/homepage/bg-right.svg" alt="cybersecurity background" width={514} height={514} className='object-cover absolute   z-30     w-[514px]' />
      </div> */}

      {/* Network background image positioned above hero background */}
      {/* <div className='absolute  bottom-0  right-0 top-[15%] left-0 w-full z-30 '>
        <Image src="/assets/solutionsandservices/network-bg.svg" alt="cybersecurity background" width={820} height={918} className='object-cover absolute   z-30    w-full' />
      </div
{/* Hero background */}
      <div className='relative h-[1005px] '
        style={{
          backgroundImage: `url(${getImageUrl(heroData?.data?.[0]?.media)})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
        }}
      >
        {/* Hero content with higher z-index */}
        <div className='relative z-40 max-w-7xl mx-auto px-[5%] xl:px-0'>
          <Navbar isHomePage={false} />
          <SolutionsHero heroData={heroData} />
          <SolutionsHeroDescription heroData={heroData} />
          <CoreSolutionsIntro />
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
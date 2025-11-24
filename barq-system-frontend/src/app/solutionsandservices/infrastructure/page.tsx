import Footer from '@/components/footer'
import React from 'react'
import { getItInfrastructureHero, getDataCenterSection, getMobilitySection, getSoftwareDefinedNetworkSection, getNetworkSectionInfra, getControlSection } from '@/services/infrastructure.service'
import ItInfrastructureHeroSection from '@/components/solutionsandservices/infrastructure/ItInfrastructureHeroSection'

export const dynamic = 'force-dynamic'

const page = async () => {
    const [heroData, dataCenterData, mobilityData, sdnData, networkData, controlData] = await Promise.all([
        getItInfrastructureHero(),
        getDataCenterSection(),
        getMobilitySection(),
        getSoftwareDefinedNetworkSection(),
        getNetworkSectionInfra(),
        getControlSection(),
    ])
    return (
        <div className='bg-black relative'>
            <ItInfrastructureHeroSection heroData={heroData} dataCenterData={dataCenterData} mobilityData={mobilityData} sdnData={sdnData} networkData={networkData} controlData={controlData} />
            <Footer />
        </div>
    )
}

export default page
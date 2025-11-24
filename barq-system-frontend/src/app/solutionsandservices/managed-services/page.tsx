import Footer from '@/components/footer';
import React from 'react';
import ManagedServicesPageClient from './ManagedServicesPageClient';
import { managedServicesService } from '@/services/managed-services.service';

export const dynamic = 'force-dynamic';

const ManagedServicesPage = async () => {
    const [
        heroResponse,
        serviceCardsResponse,
        socServicesResponse,
        cybersecurityServicesResponse,
        grcServicesResponse,
        additionalManagedServicesOneResponse,
        additionalManagedServicesTwoResponse,
    ] = await Promise.all([
        managedServicesService.getHeroData(),
        managedServicesService.getManagedServiceCards(),
        managedServicesService.getSocServicesDetails(),
        managedServicesService.getCybersecurityServicesDetails(),
        managedServicesService.getGrcServicesDetails(),
        managedServicesService.getAdditionalManagedServicesOne(),
        managedServicesService.getAdditionalManagedServicesTwo(),
    ]);

    const hero = heroResponse?.data?.[0] || null;
    const serviceCards = serviceCardsResponse?.data || [];
    const socServicesDetails = socServicesResponse?.data || [];
    const cybersecurityServicesDetails = cybersecurityServicesResponse?.data || [];
    const grcServicesDetails = grcServicesResponse?.data || [];
    const additionalManagedServicesOne = additionalManagedServicesOneResponse?.data || [];
    const additionalManagedServicesTwo = additionalManagedServicesTwoResponse?.data || [];

    return (
        <>
            <ManagedServicesPageClient
                heroData={hero}
                serviceCards={serviceCards}
                socServicesDetails={socServicesDetails}
                cybersecurityServicesDetails={cybersecurityServicesDetails}
                grcServicesDetails={grcServicesDetails}
                additionalManagedServicesOne={additionalManagedServicesOne}
                additionalManagedServicesTwo={additionalManagedServicesTwo}
            />
            <Footer />
        </>
    );
};

export default ManagedServicesPage;
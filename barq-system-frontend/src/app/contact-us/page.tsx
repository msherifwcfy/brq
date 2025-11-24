import Footer from '@/components/footer';
import React from 'react';
import ContactUsPageClient from './ContactUsPageClient';
import { contactUsService } from '@/services/contact-us.service';

export const dynamic = 'force-dynamic';

const ContactUsPage = async () => {
    const [heroResponse, officesResponse, requestTypesResponse, hearAboutResponse] =
        await Promise.all([
            contactUsService.getHeroData(),
            contactUsService.getOfficesData(),
            contactUsService.getRequestTypes(),
            contactUsService.getHearAboutOptions(),
        ]);

    const hero = heroResponse?.data?.[0] || null;
    const offices = officesResponse?.data?.[0] || null;
    const requestTypes = requestTypesResponse?.data || [];
    const hearAboutOptions = hearAboutResponse?.data || [];

    return (
        <>
            <ContactUsPageClient
                heroData={hero}
                officesData={offices}
                requestTypes={requestTypes}
                hearAboutOptions={hearAboutOptions}
            />
            <Footer />
        </>
    );
};

export default ContactUsPage;


import React from 'react';
import { footerService } from '@/services/footer.service';
import FooterContent from './footer-content';

const Footer = async () => {
  const { contact, locations, terms } = await footerService.getAllFooterData();

  const contactData = contact?.data?.[0];
  const locationsData = locations?.data || [];
  const termsData = terms?.data || [];
  return (
    <FooterContent
      contactData={contactData}
      locationsData={locationsData}
      termsData={termsData}
    />
  );
};

export default Footer;

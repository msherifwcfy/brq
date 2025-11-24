"use client"

import ManagedServicesHeroSection from '@/components/solutionsandservices/managed-services/ManagedServicesHeroSection';
import type {
  ManagedServiceHeroEntity,
  ManagedServiceCardsEntity,
  ManagedSocServicesDetailsEntity,
  ManagedCybersecurityServicesDetailsEntity,
  ManagedGrcServicesDetailsEntity,
  AdditionalManagedServicesOneEntity,
  AdditionalManagedServicesTwoEntity,
} from '@/sdk/types.gen';

interface ManagedServicesPageClientProps {
  heroData: ManagedServiceHeroEntity | null;
  serviceCards: ManagedServiceCardsEntity[] | null;
  socServicesDetails: ManagedSocServicesDetailsEntity[] | null;
  cybersecurityServicesDetails: ManagedCybersecurityServicesDetailsEntity[] | null;
  grcServicesDetails: ManagedGrcServicesDetailsEntity[] | null;
  additionalManagedServicesOne: AdditionalManagedServicesOneEntity[];
  additionalManagedServicesTwo: AdditionalManagedServicesTwoEntity[];
}

const ManagedServicesPageClient = ({
  heroData,
  serviceCards,
  socServicesDetails,
  cybersecurityServicesDetails,
  grcServicesDetails,
  additionalManagedServicesOne,
  additionalManagedServicesTwo,
}: ManagedServicesPageClientProps) => {
  return (
    <div className='bg-black relative'>
      <ManagedServicesHeroSection
        heroData={heroData}
        serviceCards={serviceCards}
        socServicesDetails={socServicesDetails}
        cybersecurityServicesDetails={cybersecurityServicesDetails}
        grcServicesDetails={grcServicesDetails}
        additionalManagedServicesOne={additionalManagedServicesOne}
        additionalManagedServicesTwo={additionalManagedServicesTwo}
      />
    </div>
  );
};

export default ManagedServicesPageClient;






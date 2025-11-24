import { useEffect, useState, type JSX } from "react";
import { useModal, type ModalType } from "../store/modal-store";
import { CreateRoleModal } from "@/features/roles/components/CreateRoleModal";
import { UpdateRoleModal } from "@/features/roles/components/UpdateRoleModal";
import { DeleteRoleModal } from "@/features/roles/components/DeleteRoleModal";
import { CreateEmployeeModal } from "@/features/employees/components/CreateEmployeeModal";
import { UpdateEmployeeModal } from "@/features/employees/components/UpdateEmployeeModal";
import { DeleteEmployeeModal } from "@/features/employees/components/DeleteEmployeeModal";
import { CreateWhoWeAreStatModal } from "@/features/cms/home-page/components/CreateWhoWeAreStatModal";
import { UpdateWhoWeAreStatModal } from "@/features/cms/home-page/components/UpdateWhoWeAreStatModal";
import { DeleteWhoWeAreStatModal } from "@/features/cms/home-page/components/DeleteWhoWeAreStatModal";
import { CreateAlliancesClientModal } from "@/features/alliances/clients/components/CreateAlliancesClientModal";
import { UpdateAlliancesClientModal } from "@/features/alliances/clients/components/UpdateAlliancesClientModal";
import { DeleteAlliancesClientModal } from "@/features/alliances/clients/components/DeleteAlliancesClientModal";
import { CreateAlliancesVendorModal } from "@/features/alliances/vendors/components/CreateAlliancesVendorModal";
import { UpdateAlliancesVendorModal } from "@/features/alliances/vendors/components/UpdateAlliancesVendorModal";
import { DeleteAlliancesVendorModal } from "@/features/alliances/vendors/components/DeleteAlliancesVendorModal";
import { CreateCountryModal } from "@/features/countries/components/CreateCountryModal";
import { UpdateCountryModal } from "@/features/countries/components/UpdateCountryModal";
import { DeleteCountryModal } from "@/features/countries/components/DeleteCountryModal";
import { CreateCityModal } from "@/features/cities/components/CreateCityModal";
import { UpdateCityModal } from "@/features/cities/components/UpdateCityModal";
import { DeleteCityModal } from "@/features/cities/components/DeleteCityModal";
import { CreateIndustryModal } from "@/features/industries/components/CreateIndustryModal";
import { UpdateIndustryModal } from "@/features/industries/components/UpdateIndustryModal";
import { DeleteIndustryModal } from "@/features/industries/components/DeleteIndustryModal";
import { CreateSolutionModal } from "@/features/solutions/components/CreateSolutionModal";
import { UpdateSolutionModal } from "@/features/solutions/components/UpdateSolutionModal";
import { DeleteSolutionModal } from "@/features/solutions/components/DeleteSolutionModal";
import { CreateAwardsCardsModal } from "@/features/awards/cards/components/CreateAwardsCardsModal";
import { UpdateAwardsCardsModal } from "@/features/awards/cards/components/UpdateAwardsCardsModal";
import { DeleteAwardsCardsModal } from "@/features/awards/cards/components/DeleteAwardsCardsModal";
import { CreateFooterLocationModal } from "@/features/cms/footer/components/CreateFooterLocationModal";
import { UpdateFooterLocationModal } from "@/features/cms/footer/components/UpdateFooterLocationModal";
import { DeleteFooterLocationModal } from "@/features/cms/footer/components/DeleteFooterLocationModal";
import { CreateFooterTermModal } from "@/features/cms/footer/components/CreateFooterTermModal";
import { UpdateFooterTermModal } from "@/features/cms/footer/components/UpdateFooterTermModal";
import { DeleteFooterTermModal } from "@/features/cms/footer/components/DeleteFooterTermModal";
import { CreateSustainabilityCardSocialModal } from "@/features/cms/sustainability/components/CreateSustainabilityCardSocialModal";
import { UpdateSustainabilityCardSocialModal } from "@/features/cms/sustainability/components/UpdateSustainabilityCardSocialModal";
import { DeleteSustainabilityCardSocialModal } from "@/features/cms/sustainability/components/DeleteSustainabilityCardSocialModal";
import { CreateNetworkSectionCardModal } from "@/features/cms/cybersecurity/components/CreateNetworkSectionCardModal";
import { UpdateNetworkSectionCardModal } from "@/features/cms/cybersecurity/components/UpdateNetworkSectionCardModal";
import { DeleteNetworkSectionCardModal } from "@/features/cms/cybersecurity/components/DeleteNetworkSectionCardModal";
import { DeleteDataCenterCardModal } from "@/features/cms/cybersecurity/components/DeleteDataCenterCardModal";
import { CreateOperationIntelligenceBulletModal } from "@/features/cms/cybersecurity/components/CreateOperationIntelligenceBulletModal";
import { UpdateOperationIntelligenceBulletModal } from "@/features/cms/cybersecurity/components/UpdateOperationIntelligenceBulletModal";
import { DeleteOperationIntelligenceBulletModal } from "@/features/cms/cybersecurity/components/DeleteOperationIntelligenceBulletModal";
import { CreateIdentityManagementCardModal } from "@/features/cms/cybersecurity/components/CreateIdentityManagementCardModal";
import { UpdateIdentityManagementCardModal } from "@/features/cms/cybersecurity/components/UpdateIdentityManagementCardModal";
import { DeleteIdentityManagementCardModal } from "@/features/cms/cybersecurity/components/DeleteIdentityManagementCardModal";
import { CreateApplicationDataBulletModal } from "@/features/cms/cybersecurity/components/CreateApplicationDataBulletModal";
import { UpdateApplicationDataBulletModal } from "@/features/cms/cybersecurity/components/UpdateApplicationDataBulletModal";
import { DeleteApplicationDataBulletModal } from "@/features/cms/cybersecurity/components/DeleteApplicationDataBulletModal";
import { CreateRequestTypeModal } from "@/features/request-types/components/CreateRequestTypeModal";
import { UpdateRequestTypeModal } from "@/features/request-types/components/UpdateRequestTypeModal";
import { DeleteRequestTypeModal } from "@/features/request-types/components/DeleteRequestTypeModal";
import { CreateHearAboutUsOptionModal } from "@/features/hear-about-us-options/components/CreateHearAboutUsOptionModal";
import { UpdateHearAboutUsOptionModal } from "@/features/hear-about-us-options/components/UpdateHearAboutUsOptionModal";
import { DeleteHearAboutUsOptionModal } from "@/features/hear-about-us-options/components/DeleteHearAboutUsOptionModal";
import { CreateContactUsOfficeModal } from "@/features/cms/contact-us/components/CreateContactUsOfficeModal";
import { UpdateContactUsOfficeModal } from "@/features/cms/contact-us/components/UpdateContactUsOfficeModal";
import { DeleteContactUsOfficeModal } from "@/features/cms/contact-us/components/DeleteContactUsOfficeModal";
import { CreateManagedServiceCardModal } from "@/features/cms/managed-services/components/CreateManagedServiceCardModal";
import { UpdateManagedServiceCardModal } from "@/features/cms/managed-services/components/UpdateManagedServiceCardModal";
import { DeleteManagedServiceCardModal } from "@/features/cms/managed-services/components/DeleteManagedServiceCardModal";
import { CreateAdditionalManagedServicesOneModal } from "@/features/cms/managed-services/components/CreateAdditionalManagedServicesOneModal";
import { UpdateAdditionalManagedServicesOneModal } from "@/features/cms/managed-services/components/UpdateAdditionalManagedServicesOneModal";
import { DeleteAdditionalManagedServicesOneModal } from "@/features/cms/managed-services/components/DeleteAdditionalManagedServicesOneModal";
import { CreateAdditionalManagedServicesTwoModal } from "@/features/cms/managed-services/components/CreateAdditionalManagedServicesTwoModal";
import { UpdateAdditionalManagedServicesTwoModal } from "@/features/cms/managed-services/components/UpdateAdditionalManagedServicesTwoModal";
import { DeleteAdditionalManagedServicesTwoModal } from "@/features/cms/managed-services/components/DeleteAdditionalManagedServicesTwoModal";
import { CreateHomeAwardsCardModal } from "@/features/cms/home-page/components/CreateHomeAwardsCardModal";
import { UpdateHomeAwardsCardModal } from "@/features/cms/home-page/components/UpdateHomeAwardsCardModal";
import { DeleteHomeAwardsCardModal } from "@/features/cms/home-page/components/DeleteHomeAwardsCardModal";
import { CreateCareerOpportunityModal } from "@/features/cms/careers/components/CreateCareerOpportunityModal";
import { UpdateCareerOpportunityModal } from "@/features/cms/careers/components/UpdateCareerOpportunityModal";
import { DeleteCareerOpportunityModal } from "@/features/cms/careers/components/DeleteCareerOpportunityModal";
import { CreateCareerCategoryModal } from "@/features/cms/careers/components/CreateCareerCategoryModal";
import { UpdateCareerCategoryModal } from "@/features/cms/careers/components/UpdateCareerCategoryModal";
import { DeleteCareerCategoryModal } from "@/features/cms/careers/components/DeleteCareerCategoryModal";
import { CreateCareerOpenPositionModal } from "@/features/cms/careers/components/CreateCareerOpenPositionModal";
import { UpdateCareerOpenPositionModal } from "@/features/cms/careers/components/UpdateCareerOpenPositionModal";
import { DeleteCareerOpenPositionModal } from "@/features/cms/careers/components/DeleteCareerOpenPositionModal";
import { CreateCaseStudyModal } from "@/features/case-studies/components/CreateCaseStudyModal";
import { UpdateCaseStudyModal } from "@/features/case-studies/components/UpdateCaseStudyModal";
import { DeleteCaseStudyModal } from "@/features/case-studies/components/DeleteCaseStudyModal";
import { CreateNewsroomArticleModal } from "@/features/cms/newsroom/components/CreateNewsroomArticleModal";
import { UpdateNewsroomArticleModal } from "@/features/cms/newsroom/components/UpdateNewsroomArticleModal";
import { DeleteNewsroomArticleModal } from "@/features/cms/newsroom/components/DeleteNewsroomArticleModal";
import { CreateNewsroomCategoryModal } from "@/features/cms/newsroom/components/CreateNewsroomCategoryModal";
import { UpdateNewsroomCategoryModal } from "@/features/cms/newsroom/components/UpdateNewsroomCategoryModal";
import { CreateEventsPartnerModal } from "@/features/cms/events/components/CreateEventsPartnerModal";
import { UpdateEventsPartnerModal } from "@/features/cms/events/components/UpdateEventsPartnerModal";
import { CreateEventsSpeakersModal } from "@/features/cms/events/components/CreateEventsSpeakersModal";
import { UpdateEventsSpeakersModal } from "@/features/cms/events/components/UpdateEventsSpeakersModal";
import { CreateSocServicesDetailsModal } from "@/features/cms/managed-services/components/CreateSocServicesDetailsModal";
import { UpdateSocServicesDetailsModal } from "@/features/cms/managed-services/components/UpdateSocServicesDetailsModal";
import { CreateCybersecurityServicesDetailsModal } from "@/features/cms/managed-services/components/CreateCybersecurityServicesDetailsModal";
import { UpdateCybersecurityServicesDetailsModal } from "@/features/cms/managed-services/components/UpdateCybersecurityServicesDetailsModal";
import { CreateGrcServicesDetailsModal } from "@/features/cms/managed-services/components/CreateGrcServicesDetailsModal";
import { UpdateGrcServicesDetailsModal } from "@/features/cms/managed-services/components/UpdateGrcServicesDetailsModal";
import { DeleteGrcServicesDetailsModal } from "@/features/cms/managed-services/components/DeleteGrcServicesDetailsModal";

export const ModalProvider = () => {
  const { type, data, isOpen, onClose, refetch } = useModal();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const modals: Record<ModalType, JSX.Element> = {
    submit: <div>Submit</div>,
    createRole: <CreateRoleModal />,
    updateRole: <UpdateRoleModal />,
    deleteRole: <DeleteRoleModal />,
    createEmployee: <CreateEmployeeModal />,
    updateEmployee: <UpdateEmployeeModal />,
    deleteEmployee: <DeleteEmployeeModal />,
    createWhoWeAreStat: <CreateWhoWeAreStatModal />,
    updateWhoWeAreStat: <UpdateWhoWeAreStatModal />,
    deleteWhoWeAreStat: <DeleteWhoWeAreStatModal />,
    createAlliancesClient: <CreateAlliancesClientModal />,
    updateAlliancesClient: <UpdateAlliancesClientModal />,
    deleteAlliancesClient: <DeleteAlliancesClientModal />,
    createAlliancesVendor: <CreateAlliancesVendorModal />,
    updateAlliancesVendor: <UpdateAlliancesVendorModal />,
    deleteAlliancesVendor: <DeleteAlliancesVendorModal />,
    createCountry: <CreateCountryModal />,
    updateCountry: <UpdateCountryModal />,
    deleteCountry: <DeleteCountryModal />,
    createCity: <CreateCityModal />,
    updateCity: <UpdateCityModal />,
    deleteCity: <DeleteCityModal />,
    createIndustry: <CreateIndustryModal />,
    updateIndustry: <UpdateIndustryModal />,
    deleteIndustry: <DeleteIndustryModal />,
    createSolution: <CreateSolutionModal />,
    updateSolution: <UpdateSolutionModal />,
    deleteSolution: <DeleteSolutionModal />,
    createAwardsCards: <CreateAwardsCardsModal />,
    updateAwardsCards: <UpdateAwardsCardsModal />,
    deleteAwardsCards: <DeleteAwardsCardsModal />,
    createFooterLocation: <CreateFooterLocationModal />,
    updateFooterLocation: <UpdateFooterLocationModal />,
    deleteFooterLocation: <DeleteFooterLocationModal />,
    createFooterTerm: <CreateFooterTermModal />,
    updateFooterTerm: <UpdateFooterTermModal />,
    deleteFooterTerm: <DeleteFooterTermModal />,
    createSustainabilityCardSocial: <CreateSustainabilityCardSocialModal />,
    updateSustainabilityCardSocial: <UpdateSustainabilityCardSocialModal />,
    deleteSustainabilityCardSocial: <DeleteSustainabilityCardSocialModal />,
    createNetworkSectionCard: <CreateNetworkSectionCardModal />,
    updateNetworkSectionCard: <UpdateNetworkSectionCardModal />,
    deleteNetworkSectionCard: <DeleteNetworkSectionCardModal />,
    deleteDataCenterCard: <DeleteDataCenterCardModal />,
    createOperationIntelligenceBullet: (
      <CreateOperationIntelligenceBulletModal />
    ),
    updateOperationIntelligenceBullet: (
      <UpdateOperationIntelligenceBulletModal />
    ),
    deleteOperationIntelligenceBullet: (
      <DeleteOperationIntelligenceBulletModal />
    ),
    createIdentityManagementCard: <CreateIdentityManagementCardModal />,
    updateIdentityManagementCard: <UpdateIdentityManagementCardModal />,
    deleteIdentityManagementCard: <DeleteIdentityManagementCardModal />,
    createApplicationDataBullet: <CreateApplicationDataBulletModal />,
    updateApplicationDataBullet: <UpdateApplicationDataBulletModal />,
    deleteApplicationDataBullet: <DeleteApplicationDataBulletModal />,
    createRequestType: <CreateRequestTypeModal />,
    updateRequestType: <UpdateRequestTypeModal />,
    deleteRequestType: <DeleteRequestTypeModal />,
    createHearAboutUsOption: <CreateHearAboutUsOptionModal />,
    updateHearAboutUsOption: <UpdateHearAboutUsOptionModal />,
    deleteHearAboutUsOption: <DeleteHearAboutUsOptionModal />,
    createContactUsOffice: <CreateContactUsOfficeModal />,
    updateContactUsOffice: <UpdateContactUsOfficeModal />,
    deleteContactUsOffice: <DeleteContactUsOfficeModal />,
    createManagedServiceCard: <CreateManagedServiceCardModal />,
    updateManagedServiceCard: <UpdateManagedServiceCardModal />,
    deleteManagedServiceCard: <DeleteManagedServiceCardModal />,
    createAdditionalManagedServicesOne: <CreateAdditionalManagedServicesOneModal />,
    updateAdditionalManagedServicesOne: <UpdateAdditionalManagedServicesOneModal />,
    deleteAdditionalManagedServicesOne: <DeleteAdditionalManagedServicesOneModal />,
    createAdditionalManagedServicesTwo: <CreateAdditionalManagedServicesTwoModal />,
    updateAdditionalManagedServicesTwo: <UpdateAdditionalManagedServicesTwoModal />,
    deleteAdditionalManagedServicesTwo: <DeleteAdditionalManagedServicesTwoModal />,
    createHomeAwardsCard: <CreateHomeAwardsCardModal />,
    updateHomeAwardsCard: <UpdateHomeAwardsCardModal />,
    deleteHomeAwardsCard: <DeleteHomeAwardsCardModal />,
    createCareerOpportunity: <CreateCareerOpportunityModal />,
    updateCareerOpportunity: <UpdateCareerOpportunityModal />,
    deleteCareerOpportunity: <DeleteCareerOpportunityModal />,
    createCareerCategory: <CreateCareerCategoryModal />,
    updateCareerCategory: <UpdateCareerCategoryModal />,
    deleteCareerCategory: <DeleteCareerCategoryModal />,
    createCareerOpenPosition: <CreateCareerOpenPositionModal />,
    updateCareerOpenPosition: <UpdateCareerOpenPositionModal />,
    deleteCareerOpenPosition: <DeleteCareerOpenPositionModal />,
    createCaseStudy: <CreateCaseStudyModal />,
    updateCaseStudy: <UpdateCaseStudyModal />,
    deleteCaseStudy: <DeleteCaseStudyModal />,
    createNewsroomArticle: <CreateNewsroomArticleModal />,
    updateNewsroomArticle: <UpdateNewsroomArticleModal />,
    deleteNewsroomArticle: <DeleteNewsroomArticleModal />,
    createNewsroomCategory: <CreateNewsroomCategoryModal />,
    updateNewsroomCategory: <UpdateNewsroomCategoryModal />,
    createEventsPartner: <CreateEventsPartnerModal />,
    updateEventsPartner: <UpdateEventsPartnerModal />,
    createEventsSpeakers: <CreateEventsSpeakersModal />,
    updateEventsSpeakers: <UpdateEventsSpeakersModal />,
    createSocServicesDetails: <CreateSocServicesDetailsModal />,
    updateSocServicesDetails: <UpdateSocServicesDetailsModal />,
    createCybersecurityServicesDetails: <CreateCybersecurityServicesDetailsModal />,
    updateCybersecurityServicesDetails: <UpdateCybersecurityServicesDetailsModal />,
    createGrcServicesDetails: <CreateGrcServicesDetailsModal />,
    updateGrcServicesDetails: <UpdateGrcServicesDetailsModal />,
    deleteGrcServicesDetails: <DeleteGrcServicesDetailsModal />,
  };

  return <>{type && modals[type as ModalType]}</>;
};

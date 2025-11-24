import { create } from "zustand";

export type ModalType =
  | "submit"
  | "createRole"
  | "updateRole"
  | "deleteRole"
  | "createEmployee"
  | "updateEmployee"
  | "deleteEmployee"
  | "createWhoWeAreStat"
  | "updateWhoWeAreStat"
  | "deleteWhoWeAreStat"
  | "createAlliancesClient"
  | "updateAlliancesClient"
  | "deleteAlliancesClient"
  | "createAlliancesVendor"
  | "updateAlliancesVendor"
  | "deleteAlliancesVendor"
  | "createCountry"
  | "updateCountry"
  | "deleteCountry"
  | "createCity"
  | "updateCity"
  | "deleteCity"
  | "createIndustry"
  | "updateIndustry"
  | "deleteIndustry"
  | "createSolution"
  | "updateSolution"
  | "deleteSolution"
  | "createAwardsCards"
  | "updateAwardsCards"
  | "deleteAwardsCards"
  | "createFooterLocation"
  | "updateFooterLocation"
  | "deleteFooterLocation"
  | "createFooterTerm"
  | "updateFooterTerm"
  | "deleteFooterTerm"
  | "createSustainabilityCardSocial"
  | "updateSustainabilityCardSocial"
  | "deleteSustainabilityCardSocial"
  | "createNetworkSectionCard"
  | "updateNetworkSectionCard"
  | "deleteNetworkSectionCard"
  | "deleteDataCenterCard"
  | "createOperationIntelligenceBullet"
  | "updateOperationIntelligenceBullet"
  | "deleteOperationIntelligenceBullet"
  | "createIdentityManagementCard"
  | "updateIdentityManagementCard"
  | "deleteIdentityManagementCard"
  | "createApplicationDataBullet"
  | "updateApplicationDataBullet"
  | "deleteApplicationDataBullet"
  | "createRequestType"
  | "updateRequestType"
  | "deleteRequestType"
  | "createHearAboutUsOption"
  | "updateHearAboutUsOption"
  | "deleteHearAboutUsOption"
  | "createContactUsOffice"
  | "updateContactUsOffice"
  | "deleteContactUsOffice"
  | "createManagedServiceCard"
  | "updateManagedServiceCard"
  | "deleteManagedServiceCard"
  | "createAdditionalManagedServicesOne"
  | "updateAdditionalManagedServicesOne"
  | "deleteAdditionalManagedServicesOne"
  | "createAdditionalManagedServicesTwo"
  | "updateAdditionalManagedServicesTwo"
  | "deleteAdditionalManagedServicesTwo"
  | "createHomeAwardsCard"
  | "updateHomeAwardsCard"
  | "deleteHomeAwardsCard"
  | "createCareerOpportunity"
  | "updateCareerOpportunity"
  | "deleteCareerOpportunity"
  | "createCareerCategory"
  | "updateCareerCategory"
  | "deleteCareerCategory"
  | "createCareerOpenPosition"
  | "updateCareerOpenPosition"
  | "deleteCareerOpenPosition"
  | "createCaseStudy"
  | "updateCaseStudy"
  | "deleteCaseStudy"
  | "createNewsroomArticle"
  | "updateNewsroomArticle"
  | "deleteNewsroomArticle"
  | "createNewsroomCategory"
  | "updateNewsroomCategory"
  | "createEventsPartner"
  | "updateEventsPartner"
  | "createEventsSpeakers"
  | "updateEventsSpeakers"
  | "createSocServicesDetails"
  | "updateSocServicesDetails"
  | "createCybersecurityServicesDetails"
  | "updateCybersecurityServicesDetails"
  | "createGrcServicesDetails"
  | "updateGrcServicesDetails"
  | "deleteGrcServicesDetails";

export interface ModalData {
  id?: string;
  name?: string;
  description?: string;
  image?: string;
  date?: string;
  type?: string;
  private?: number;
  role?: any;
  user?: any;
  country?: any;
  city?: any;
  requestType?: any;
  hearAboutUsOption?: any;
  card?: any;
  alliancesClient?: any;
  caseStudy?: any;
  partner?: any;
  speakers?: any;
  service?: any;
  category?: any;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData | any;
  refetch?: () => void;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: any, refetch?: () => void) => void;
  onClose: () => void;
  setData: (data?: any) => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  setData: (data?: any) => set({ data }),
  isOpen: false,
  onOpen: (type, data = {}, refetch) =>
    set({ type, isOpen: true, data, refetch }),
  onClose: () => set({ type: null, isOpen: false }),
}));

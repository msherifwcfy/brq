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
  | "deleteApplicationDataBullet";

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

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
  };

  return <>{type && modals[type as ModalType]}</>;
};

import type { RouteObject } from "react-router";
import { RBACProvider } from "@/shared/providers/RBACProvider";
import { ProtectedRoute } from "@/shared/components/rbac/ProtectedRoute";
import Login from "@/features/auth/pages/Login";
import CreatePassword from "@/features/auth/pages/CreatePassword";
import { Navigate, Outlet } from "react-router";
import RoleListPage from "@/features/roles/pages/roles-list-page";
import { ModalProvider } from "./shared/providers/ModalProviders";
import { EmployeesListPage } from "./features/employees";
import { CountryListPage } from "./features/countries";
import { CityListPage } from "./features/cities";
import { IndustryListPage } from "./features/industries";
import { SolutionListPage } from "./features/solutions";
import { RequestTypesListPage } from "./features/request-types";
import { HearAboutUsOptionsListPage } from "./features/hear-about-us-options";
import { PERMISSION_KEYS } from "./shared/config/permissions";
import { Toaster } from "@/shared/components/ui/sonner";
import HomeDashboard from "@/features/home/pages/home-dashboard";
import { languageLoader } from "./lang";
import { LanguageIndex } from "./lang-index";
import HomePage from "./features/cms/home-page/pages/home-page";
import DevTool from "./shared/components/custom/DevTool";
import { AlliancesPage } from "./features/cms/alliances";
import { SustainabilityPage } from "./features/cms/sustainability";
import { AutomationPage } from "./features/cms/automation";
import AwardsPage from "./features/cms/awards/pages/awards-page";
import { CareersPage, CybersecurityPage, FooterPage, ItInfrastructurePage, LeadershipPage, SolutionsAndServicesPage } from "./features/cms";
import AboutUsPage from "./features/cms/about-us/pages/about-us-page";
import { AcademyPage } from "./features/cms/academy";
import { ManagedServicesPage } from "./features/cms/managed-services";
import { NewsroomCMSPage, NewsroomCategoriesPage } from "./features/cms/newsroom";
import { EventsCMSPage } from "./features/cms/events";
import { CampaignsCMSPage } from "./features/cms/campaigns";
import { ResourcesCMSPage } from "./features/cms/resources";
import { CaseStudiesPage } from "./features/cms/case-studies";
import ContactUsPage from "./features/cms/contact-us/pages/contact-us-page";
export const AppRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/en" />,
  },
  {
    path: "/:lang",
    id: "lang",
    element: (
      <>
        <LanguageIndex />
        <DevTool />
      </>
    ),
    loader: languageLoader,
    children: [
      {
        path: "auth/login",
        element: <Login />,
      },
      {
        path: "auth/create-password",
        element: <CreatePassword />,
      },
      {
        path: "",
        element: (
          <RBACProvider>
            <ModalProvider />
            <Outlet />
            <Toaster position="top-center" />
          </RBACProvider>
        ),
        children: [
          {
            index: true,
            element: <HomeDashboard />,
          },
          {
            path: "dashboard/cms/home-page",
            element: <HomePage />,
          },
          {
            path: "dashboard",
            element: <HomeDashboard />,
          },
          {
            path: "dashboard/roles",
            element: (
              <ProtectedRoute permissionKey={PERMISSION_KEYS.ROLES.VIEW}>
                <RoleListPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "dashboard/employees",
            element: (
              <ProtectedRoute permissionKey={PERMISSION_KEYS.USERS.VIEW}>
                <EmployeesListPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "dashboard/cms/alliances",
            element: <AlliancesPage />,
          },
          {
            path: "dashboard/cms/awards",
            element: <AwardsPage />,
          },
          {
            path: "dashboard/cms/sustainability",
            element: <SustainabilityPage />,
          },
          {
            path: "dashboard/cms/automation",
            element: <AutomationPage />,
          },
          {
            path: "dashboard/cms/cybersecurity",
            element: <CybersecurityPage />,
          },
          {
            path: "dashboard/cms/it-infrastructure",
            element: <ItInfrastructurePage />,
          },
          {
            path: "dashboard/cms/footer",
            element: <FooterPage />,
          },
          {
            path: "dashboard/cms/about-us",
            element: <AboutUsPage />,
          },
          {
            path: "dashboard/cms/academy",
            element: <AcademyPage />,
          },
          {
            path: "dashboard/cms/managed-services",
            element: <ManagedServicesPage />,
          },
          {
            path: "dashboard/cms/careers",
            element: <CareersPage />,
          },
          {
            path: "dashboard/cms/newsroom",
            element: <NewsroomCMSPage />,
          },
          {
            path: "dashboard/cms/newsroom/categories",
            element: <NewsroomCategoriesPage />,
          },
          {
            path: "dashboard/cms/events",
            element: <EventsCMSPage />,
          },
          {
            path: "dashboard/cms/campaigns",
            element: <CampaignsCMSPage />,
          },
          {
            path: "dashboard/cms/leadership",
            element: <LeadershipPage />,
          },
          {
            path: "dashboard/cms/resources",
            element: <ResourcesCMSPage />,
          },
          {
            path: "dashboard/cms/case-studies",
            element: <CaseStudiesPage />,
          },
          {
            path: "dashboard/cms/contact-us",
            element: <ContactUsPage />,
          },
          {
            path: "dashboard/request-types",
            element: (
              <ProtectedRoute permissionKey={PERMISSION_KEYS.CONTACT_US_REQUEST_TYPES.VIEW}>
                <RequestTypesListPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "dashboard/hear-about-us-options",
            element: (
              <ProtectedRoute permissionKey={PERMISSION_KEYS.CONTACT_US_HEAR_ABOUT_OPTIONS.VIEW}>
                <HearAboutUsOptionsListPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "dashboard/countries",
            element: (
              <ProtectedRoute permissionKey={PERMISSION_KEYS.COUNTRIES.VIEW}>
                <CountryListPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "dashboard/cities",
            element: (
              <ProtectedRoute permissionKey={PERMISSION_KEYS.CITY.VIEW}>
                <CityListPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "dashboard/industries",
            element: (
              <ProtectedRoute permissionKey={PERMISSION_KEYS.INDUSTRIES.VIEW}>
                <IndustryListPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "dashboard/cms/solutions-and-services",
            element: <SolutionsAndServicesPage />,
          },
          {
            path: "dashboard/solutions",
            element: <SolutionListPage />,
          }
        ],
      },
    ],
  },
];

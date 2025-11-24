import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import ManagedServicesHeroForm from "../components/managed-services-hero-form";
import SecurityServicesSection from "../components/security-services-section";
import MoreServicesSection from "../components/more-services-section";

export default function ManagedServicesPage() {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Managed Services CMS</h1>
          <p className="text-muted-foreground">
            Manage content for the Managed Services page
          </p>
        </div>

        <Tabs defaultValue="hero" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="hero">Hero Section</TabsTrigger>
            <TabsTrigger value="security-services">Security Services</TabsTrigger>
            <TabsTrigger value="more-services">More Services</TabsTrigger>
            <TabsTrigger value="intro">Section Intro</TabsTrigger>
          </TabsList>

          <TabsContent value="hero" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
              </CardHeader>
              <CardContent>
                <ManagedServicesHeroForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security-services" className="space-y-4">
            <SecurityServicesSection />
          </TabsContent>

          <TabsContent value="more-services" className="space-y-4">
            <MoreServicesSection />
          </TabsContent>

          <TabsContent value="intro" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Section Introductions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <p>Section introductions coming soon...</p>
                  <p className="text-sm mt-2">Manage intro text for each section</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      </div>
    </DashboardLayout>
  );
}

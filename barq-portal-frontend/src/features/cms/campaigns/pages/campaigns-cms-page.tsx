import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "@/shared/components/ui/data-table";
import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import CampaignForm from "../components/CampaignForm";
import CampaignFeatureForm from "../components/CampaignFeatureForm";
import { submissionsColumns } from "../columns/submissions-columns";

export default function CampaignsCMSPage() {
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);
  const [isCreatingFeature, setIsCreatingFeature] = useState(false);

  const mockSubmissions: any[] = [];

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Campaigns CMS</h1>
          <p className="text-muted-foreground">
            Manage marketing campaigns and resource downloads
          </p>
        </div>

        <Tabs defaultValue="campaigns" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="features">Features/Bullets</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>All Campaigns</CardTitle>
                  <CardDescription>
                    Create and manage campaign pages for resource downloads
                  </CardDescription>
                </div>
                <Button onClick={() => setIsCreatingCampaign(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Campaign
                </Button>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <p>No campaigns yet. Click "Add Campaign" to create one.</p>
                  <div className="mt-4 space-y-2 text-sm">
                    <p className="font-medium">Available Campaign Types:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Campaign 1: HSE Policy - Download-based with modal form</li>
                      <li>Campaign 2: Managed Services - Inline form with features list</li>
                      <li>Campaign 3: Agentic AI - Video hero with demo request</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {isCreatingCampaign && (
              <Card>
                <CardHeader>
                  <CardTitle>Create Campaign</CardTitle>
                  <CardDescription>
                    Fill in the details for your new campaign
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CampaignForm onClose={() => setIsCreatingCampaign(false)} />
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="features" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Campaign Features</CardTitle>
                  <CardDescription>
                    Add bullet points, icons, and features for campaigns
                  </CardDescription>
                </div>
                <Button onClick={() => setIsCreatingFeature(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Feature
                </Button>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <p>Add features and bullet points to highlight campaign benefits.</p>
                  <p className="text-sm mt-2">
                    Features can include icons and are displayed in the campaign content area.
                  </p>
                </div>
              </CardContent>
            </Card>

            {isCreatingFeature && (
              <Card>
                <CardHeader>
                  <CardTitle>Add Campaign Feature</CardTitle>
                  <CardDescription>
                    Create a new feature or bullet point for a campaign
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CampaignFeatureForm onClose={() => setIsCreatingFeature(false)} />
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="submissions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Form Submissions</CardTitle>
                <CardDescription>
                  View all resource download requests from campaign forms
                </CardDescription>
              </CardHeader>
              <CardContent>
                {mockSubmissions.length > 0 ? (
                  <DataTable
                    columns={submissionsColumns}
                    data={mockSubmissions}
                  />
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <p className="text-lg font-medium mb-2">No submissions yet</p>
                    <p className="text-sm">
                      When users fill out campaign forms, their information will appear here.
                    </p>
                    <div className="mt-4 text-xs space-y-1">
                      <p>Submissions will include:</p>
                      <ul className="list-disc list-inside">
                        <li>Contact details (name, email, phone)</li>
                        <li>Organization and position</li>
                        <li>Resource requested</li>
                        <li>Submission timestamp</li>
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      </div>
    </DashboardLayout>
  );
}

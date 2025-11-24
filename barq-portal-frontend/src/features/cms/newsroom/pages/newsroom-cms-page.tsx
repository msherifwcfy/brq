import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import NewsroomArticlesSection from "../components/newsroom-articles-section";

export default function NewsroomCMSPage() {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Newsroom CMS</h1>
          <p className="text-muted-foreground">
            Manage news articles, press releases, and interviews
          </p>
        </div>

        <Tabs defaultValue="articles" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="space-y-4">
            <NewsroomArticlesSection />
          </TabsContent>

          <TabsContent value="categories" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <p>Categories are pre-configured:</p>
                  <ul className="mt-4 space-y-2">
                    <li>• News</li>
                    <li>• Press Release</li>
                    <li>• Interviews</li>
                  </ul>
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

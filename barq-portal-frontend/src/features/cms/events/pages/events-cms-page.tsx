import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";
import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import EventForm from "../components/EventForm";
import AgendaItemForm from "../components/AgendaItemForm";

export default function EventsCMSPage() {
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [isCreatingAgenda, setIsCreatingAgenda] = useState(false);
  const [isCreatingSpeaker, setIsCreatingSpeaker] = useState(false);
  const [isCreatingPartner, setIsCreatingPartner] = useState(false);

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Events CMS</h1>
          <p className="text-muted-foreground">
            Manage event details, agenda, speakers, and partners
          </p>
        </div>

        <Tabs defaultValue="events" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="events">Event Info</TabsTrigger>
            <TabsTrigger value="agenda">Agenda</TabsTrigger>
            <TabsTrigger value="speakers">Speakers</TabsTrigger>
            <TabsTrigger value="partners">Partners</TabsTrigger>
            <TabsTrigger value="registrations">Registrations</TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Events</CardTitle>
                <Button onClick={() => setIsCreatingEvent(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Event
                </Button>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  No events yet. Click "Add Event" to create one.
                </div>
              </CardContent>
            </Card>

            {isCreatingEvent && (
              <Card>
                <CardHeader>
                  <CardTitle>Create Event</CardTitle>
                </CardHeader>
                <CardContent>
                  <EventForm onClose={() => setIsCreatingEvent(false)} />
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="agenda" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Event Agenda</CardTitle>
                <Button onClick={() => setIsCreatingAgenda(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Agenda Item
                </Button>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Select an event first or add agenda items.
                </div>
              </CardContent>
            </Card>

            {isCreatingAgenda && (
              <Card>
                <CardHeader>
                  <CardTitle>Add Agenda Item</CardTitle>
                </CardHeader>
                <CardContent>
                  <AgendaItemForm onClose={() => setIsCreatingAgenda(false)} />
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="speakers" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Event Speakers</CardTitle>
                <Button onClick={() => setIsCreatingSpeaker(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Speaker
                </Button>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  No speakers yet. Click "Add Speaker" to create one.
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="partners" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Event Partners</CardTitle>
                <Button onClick={() => setIsCreatingPartner(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Partner
                </Button>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  No partners yet. Click "Add Partner" to create one.
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="registrations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Event Registrations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <p>View attendee registrations here.</p>
                  <p className="text-sm mt-2">Registration data from the event form will appear in this section.</p>
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

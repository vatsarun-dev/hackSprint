import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.22em] text-indigo-300">Settings</p>
        <h1 className="mt-3 text-3xl font-semibold">Tune your profile, account, and privacy controls</h1>
      </div>
      <Card>
        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input defaultValue="Aria Lennox" />
              <Input defaultValue="Senior Frontend Engineer" />
            </div>
          </TabsContent>
          <TabsContent value="account">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input defaultValue="aria@devconnect.io" />
              <Input defaultValue="******" type="password" />
            </div>
          </TabsContent>
          <TabsContent value="appearance">
            <p className="text-sm text-[var(--muted-foreground)]">
              Use the global theme toggle in the header to move between dark and light modes.
            </p>
          </TabsContent>
          <TabsContent value="privacy">
            <p className="text-sm text-[var(--muted-foreground)]">
              Control profile visibility, comment permissions, and who can connect with you next.
            </p>
          </TabsContent>
        </Tabs>
        <div className="mt-6">
          <Button>Save settings</Button>
        </div>
      </Card>
    </div>
  );
};

export default SettingsPage;

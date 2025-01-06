import { SideBar } from '@/components/SideBar';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/theme';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

function Settings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`flex w-screen ${theme}`}>
      <SideBar />
      <SidebarTrigger />
      <div className="p-4 w-full bg-background text-primary">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>
                Switch between light and dark themes to personalize your
                experience.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-end">
              <Button onClick={toggleTheme} className="flex items-center gap-2">
                {theme === 'light' ? (
                  <>
                    <Moon size={20} />
                    <span>Dark Mode</span>
                  </>
                ) : (
                  <>
                    <Sun size={20} />
                    <span>Light Mode</span>
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Settings;

import { NavLink, useNavigate } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from './ui/sidebar';
import {
  LayoutDashboard,
  Settings,
  ChartNoAxesCombined,
  Wallet,
  ChevronsUpDown,
  LogOut,
} from 'lucide-react';
import { Avatar } from './ui/avatar';
import { getUser, clearUser } from '@/lib/userDetails';
import { useEffect, useState } from 'react';
import { baseURL, userDetail } from '@/types';
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  DropdownMenuContent,
  DropdownMenuSeparator,
} from '@radix-ui/react-dropdown-menu';
import { postData } from '@/hooks/useAPI';
import { toast } from 'sonner';

export function SideBar() {
  const { isMobile } = useSidebar();
  const [user] = useState<userDetail>(getUser);
  const { fetchData, apiData } = postData();
  const navigate = useNavigate();

  async function handleLogout() {
    clearUser();
    await fetchData({
      url: `${baseURL}/auth/logout`,
      payload: {},
      method: 'POST',
    });
    navigate('/');
  }

  useEffect(() => {
    if (apiData) {
      toast(apiData.msg);
    }
  }, [apiData]);

  const navOptions = [
    {
      title: 'Dashboard',
      logo: LayoutDashboard,
      url: '/dashboard',
    },
    {
      title: 'Analytics',
      logo: ChartNoAxesCombined,
      url: '/analytics',
    },
    {
      title: 'Budgeting',
      logo: Wallet,
      url: '/budgeting',
    },
    {
      title: 'Setting',
      logo: Settings,
      url: '/settings',
    },
  ];

  return (
    <>
      <Sidebar collapsible="icon" className="font-mono">
        <SidebarHeader className="mb-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="font-bold text-2xl">
                <div className="aspect-square size-6 rounded-lg flex items-center justify-center bg-sidebar">
                  <img src="../icons/logo.svg" alt="Logo" className="w-6 h-6 rounded" />
                </div>
                <span>Budget Buddy</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {navOptions.map((option) => (
                <SidebarMenuItem key={option.title}>
                  <SidebarMenuButton
                    asChild
                    size={'lg'}
                    variant={'outline'}
                    className="text-lg font-semibold"
                  >
                    <NavLink to={option.url}>
                      <option.logo />
                      <span> {option.title} </span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg flex items-center justify-center border-2 border-sidebar-border">
                      {user.firstName[0]}
                      {user.lastName[0]}
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {' '}
                        {user.firstName} {user.lastName}
                      </span>
                      <span className="truncate text-xs">{user.email}</span>
                    </div>
                    <ChevronsUpDown />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg  border px-4 py-2 bg-sidebar"
                  side={isMobile ? 'top' : 'right'}
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg flex items-center justify-center border-2 border-sidebar-border">
                        {user.firstName[0]}
                        {user.lastName[0]}
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {' '}
                          {user.firstName} {user.lastName}
                        </span>
                        <span className="truncate text-xs">{user.email}</span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}

import { NavLink } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar';
import {
  LayoutDashboard,
  Settings,
  ChartNoAxesCombined,
  Wallet,
  IndianRupee,
} from 'lucide-react';
import { Avatar } from './ui/avatar';
import { getUser } from '@/lib/userDetails';
import { useState } from 'react';
import { userDetail } from '@/types';

export function SideBar() {
  
  const [user] = useState<userDetail>(getUser)
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
                <IndianRupee />
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
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg flex items-center justify-center border-2 border-sidebar-border">
                  {/* <AvatarFallback>ZS</AvatarFallback> */}
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
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}

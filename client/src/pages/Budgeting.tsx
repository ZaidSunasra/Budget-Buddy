import { SideBar } from '@/components/SideBar';
import { SidebarTrigger } from '@/components/ui/sidebar';

function Budget() {
  return (
    <div className="flex">
      <SideBar />
      <SidebarTrigger />
    </div>
  );
}

export default Budget;

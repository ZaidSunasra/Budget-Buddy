import { SideBar } from "@/components/SideBar";
import { SidebarTrigger } from "@/components/ui/sidebar";

function Settings(){
    return <div className="flex">
       <SideBar />
       <SidebarTrigger />
    </div>
}

export default Settings;
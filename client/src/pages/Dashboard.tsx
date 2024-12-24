import { ExpenseTable } from "@/components/ExpenseTable";
import { SideBar } from "@/components/SideBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Plus } from 'lucide-react';

function Dashboard() {
    return <div className="flex w-screen">
        <SideBar />
        <SidebarTrigger />
        <div className="p-4 w-full">
            <div className="flex gap-5 mb-8">
                <Input placeholder="Search expenses" className="w-4/5" type="search" />
                <Button className="w-1/5 text-secondary flex gap-5"> <Plus /> Add Transaction </Button>
            </div>
            <ExpenseTable />
        </div>
    </div>
}

export default Dashboard;
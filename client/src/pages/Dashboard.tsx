import { TransactionTable } from "@/components/TransactionTable";
import { SideBar } from "@/components/SideBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Plus } from 'lucide-react';
import { Loading } from "@/components/Loading";
import { toast } from "sonner";
import { getData } from "@/hooks/useAPI";
import { baseURL } from "@/types";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    const { apiData, isLoading, serverError, refetch} = getData({
        url: `${baseURL}/expense/get`
    });

    if (isLoading) {
        return <>
            <Loading />
        </>
    }

    if (serverError) {
        toast(serverError.msg)
    }

    return <div className="flex w-screen">
        <SideBar />
        <SidebarTrigger />
        <div className="p-4 w-full">
            <div className="flex gap-5 mb-8">
                <Input placeholder="Search expenses" className="w-4/5" type="search" />
                <Button className="w-1/5 text-secondary flex gap-5" onClick={() => navigate("/addTransaction")}> <Plus /> Add Transaction </Button>
            </div>
            <div className="max-h-[85vh] overflow-y-auto border-2">
            <TransactionTable data={apiData} onDelete={refetch}/>
            </div>
            
        </div>
    </div>
}

export default Dashboard;
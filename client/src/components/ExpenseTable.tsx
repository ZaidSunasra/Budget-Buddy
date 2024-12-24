import { baseURL } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { getData } from "@/hooks/useAPI";
import { Button } from "./ui/button";
import { Pencil,Trash2 } from 'lucide-react';
import { Loading } from "./Loading";
import { toast } from "sonner";

export function ExpenseTable() {

    const  { apiData, isLoading, serverError } = getData({
        url: `${baseURL}/expense/get`
    });
   
    if(isLoading){
        return <>
        <Loading />
        </>
    }

    if(serverError){
        toast(serverError.msg)
    }

    return <div>
        <Table className="border-2 max-h-3/4 overflow-auto">
            <TableHeader>
                <TableRow className="font-bold text-lg">
                    <TableHead>Date</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {apiData && apiData.expenses.map((expense:any) => (
                    <TableRow key={expense.id} className="font-bold text-md">
                    <TableCell>{(expense.transaction_time).slice(0,10)}</TableCell>
                    <TableCell className="max-w-64 overflow-auto">{expense.title}</TableCell>
                    <TableCell>{expense.category.charAt(0).toUpperCase()}{expense.category.slice(1)}</TableCell>
                    <TableCell>{expense.type.charAt(0).toUpperCase()}{expense.type.slice(1)}</TableCell>
                    <TableCell className={expense.type == "expense" ? "text-red-500" : "text-green-500"}>{expense.amount}</TableCell>
                    <TableCell className="flex gap-5">
                        <Button className="bg-secondary text-green-500"> <Pencil/> </Button>
                        <Button className="bg-secondary text-red-500"> <Trash2 /> </Button>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
}


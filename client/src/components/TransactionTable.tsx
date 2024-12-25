import { expenseInput } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { Pencil, Trash2 } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export function TransactionTable({ data }: { data: any }) {

    const navigate = useNavigate(); 

    return <div>
        <Table>
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
                {data && data.expenses.map((expense: expenseInput) => (
                    <TableRow key={expense.id} className="font-bold text-md">
                        <TableCell>{(expense.transaction_time).slice(0, 10)}</TableCell>
                        <TableCell className="max-w-64 overflow-auto">{expense.title.charAt(0).toUpperCase()}{expense.title.slice(1)}</TableCell>
                        <TableCell>{expense.category.charAt(0).toUpperCase()}{expense.category.slice(1)}</TableCell>
                        <TableCell>{expense.type.charAt(0).toUpperCase()}{expense.type.slice(1)}</TableCell>
                        <TableCell className={expense.type == "expense" ? "text-red-500" : "text-green-500"}>{expense.amount}</TableCell>
                        <TableCell className="flex gap-5">
                            <Button className="bg-secondary text-green-500" onClick={() => navigate(`/editTransaction/${expense.id}`)}> <Pencil /> </Button>
                            <Button className="bg-secondary text-red-500"> <Trash2 /> </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
    
}


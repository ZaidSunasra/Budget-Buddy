import { baseURL, expenseInput } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Button } from './ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from './ui/dialog';
import { postData } from '@/hooks/useAPI';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export function TransactionTable({
  data,
  onDelete,
  message,
}: {
  data: any;
  onDelete: () => void;
  message: string;
}) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { fetchData, apiData, serverError, isLoading } = postData();
  async function deleteTransaction(id: string | null) {
    if (!id) return;
    await fetchData({
      url: `${baseURL}/expense/delete/${id}`,
      payload: {},
      method: 'DELETE',
    });
  }
  useEffect(() => {
    if (apiData) {
      toast(apiData.msg);
      setIsOpen(false);
      navigate('/dashboard');
      onDelete();
    } else if (serverError) {
      toast(serverError.msg);
    }
  }, [apiData, serverError]);

  if (!data?.expenses.length) {
    return (
      <div className="font-bold text-lg text-center font-mono">{message}</div>
    );
  }

  return (
    <div className="font-mono">
      <Table className='overflow-x-auto'>
        <TableHeader>
          <TableRow className="font-bold text-lg">
            <TableHead className='min-w-28'>Date</TableHead>
            <TableHead className='min-w-56 max-w-64'>Title</TableHead>
            <TableHead className='min-w-32'>Category</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className='min-w-32'>Amount</TableHead>
            <TableHead className='min-w-28'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.expenses.map((expense: expenseInput) => (
              <TableRow key={expense.id} className="font-bold text-md">
                <TableCell >{expense.transaction_time.slice(0, 10)}</TableCell>
                <TableCell className="capitalize">
                  {expense.title}
                </TableCell>
                <TableCell className='capitalize'>
                  {expense.category}
                </TableCell>
                <TableCell className='capitalize'>
                  {expense.type}
                </TableCell>
                <TableCell
                  className={
                    expense.type == 'expense'
                      ? 'text-red-500'
                      : 'text-green-500'
                      
                  }
                >
                  {expense.amount}
                </TableCell>
                <TableCell className="flex gap-5">
                  <Button
                    className="bg-secondary text-green-500"
                    onClick={() => navigate(`/editTransaction/${expense.id}`)}
                  >
                    {' '}
                    <Pencil />{' '}
                  </Button>
                  <Button
                    className="bg-secondary text-red-500"
                    onClick={() => {
                      setIsOpen(true);
                      setSelectedId(expense.id);
                    }}
                  >
                    {' '}
                    <Trash2 />{' '}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Transaction</DialogTitle>
            <DialogDescription className="text-red-500">
              Are you sure? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button
              type="submit"
              className="px-3 flex gap-1 items-center"
              variant="destructive"
              onClick={() => deleteTransaction(selectedId)}
              disabled={isLoading}
            >
              <span> {isLoading ? 'Deleting' : 'Delete'}</span>
              <Trash2 />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { SideBar } from '@/components/SideBar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getData, postData } from '@/hooks/useAPI';
import { baseURL } from '@/types';
import {
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { AddCategory } from '@/components/AddBudgetCategory';
import { EditCategory } from '@/components/EditBudgetCategory';
import { useTheme } from '@/context/theme';

function Budget() {
  const { theme } = useTheme();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [actionType, setActionType] = useState<
    'edit' | 'delete' | 'post' | null
  >(null);
  const [data, setData] = useState<any>(null);

  const { apiData: postResponse, fetchData: postURL } = postData();
  const { apiData: editResponse, fetchData: editURL } = postData();
  const { apiData: deleteResponse, fetchData: deleteURL } = postData();
  const { apiData, refetch } = getData({
    url: `${baseURL}/budget/get`,
  });

  async function handleAddCategory(category: string, allocated_value: string) {
    await postURL({
      url: `${baseURL}/budget/add`,
      method: 'POST',
      payload: {
        category: category.toLowerCase(),
        allocated_value: allocated_value,
      },
    });
    if (postResponse) {
      toast(postResponse?.msg);
      setIsDialogOpen(false);
      setActionType(null);
      refetch();
    }
  }

  async function handleEditCategory(allocated_value: string) {
    await editURL({
      url: `${baseURL}/budget/edit/${data.id}`,
      method: 'PUT',
      payload: {
        allocated_value: allocated_value,
      },
    });
    if (editResponse) {
      toast(editResponse?.msg);
      setIsDialogOpen(false);
      setActionType(null);
      setData(null);
      refetch();
    }
  }

  async function handleDeleteCategory() {
    await deleteURL({
      url: `${baseURL}/budget/delete/${data.id}`,
      method: 'DELETE',
      payload: {},
    });
    if (deleteResponse) {
      toast(deleteResponse?.msg);
      setIsDialogOpen(false);
      setActionType(null);
      setData(null);
      refetch();
    }
  }

  return (
    <div className={`flex w-screen font-mono ${theme}`}>
      <SideBar />
      <SidebarTrigger />
      <div className="w-full p-4 bg-background text-primary">
        <div className="flex justify-end mb-8">
          <Button
            className="w-full"
            onClick={() => {
              setIsDialogOpen(true);
              setActionType('post');
            }}
          >
            <Plus />
            Add Category
          </Button>
        </div>
        <Table className="border-2">
          <TableHeader>
            <TableRow className="font-bold text-lg">
              <TableHead className="min-w-32"> Category </TableHead>
              <TableHead className="min-w-28"> Allocated Budget</TableHead>
              <TableHead className="min-w-28"> Budget Used</TableHead>
              <TableHead className="min-w-28"> Remaining </TableHead>
              <TableHead className="min-w-28"> Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apiData &&
              apiData?.response.map((data: any) => {
                const remaining =
                  parseFloat(data.allocated_value) -
                  parseFloat(data.total_expense);
                return (
                  <TableRow key={data.id} className="font-bold text-md">
                    <TableCell className="capitalize">
                      {' '}
                      {data.category}{' '}
                    </TableCell>
                    <TableCell> {data.allocated_value} </TableCell>
                    <TableCell> {data.total_expense} </TableCell>
                    <TableCell
                      className={
                        remaining >= 0
                          ? 'text-green-600 bg-green-100 '
                          : 'text-red-600 bg-red-100'
                      }
                    >
                      {remaining}{' '}
                    </TableCell>
                    <TableCell className="flex gap-5">
                      <Button
                        onClick={() => {
                          setActionType('edit');
                          setIsDialogOpen(true);
                          setData(data);
                        }}
                        className="bg-secondary text-green-500"
                      >
                        {' '}
                        <Pencil />{' '}
                      </Button>
                      <Button
                        onClick={() => {
                          setActionType('delete');
                          setIsDialogOpen(true);
                          setData(data);
                        }}
                        className="bg-secondary text-red-500"
                      >
                        {' '}
                        <Trash2 />{' '}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            {actionType == 'post' ? (
              <>
                <DialogHeader>
                  <DialogTitle> Add a New Budget Category </DialogTitle>
                  <DialogDescription>
                    Organize your spending by adding a new category. Allocate a
                    budget to track your expenses effectively.
                  </DialogDescription>
                </DialogHeader>
                <AddCategory onSubmit={handleAddCategory} />
              </>
            ) : actionType == 'edit' ? (
              <>
                <DialogHeader>
                  <DialogTitle className="capitalize">
                    Edit Budget for {data.category}
                  </DialogTitle>
                  <DialogDescription>
                    Modify the allocated amount for the selected category.
                    Update your budget to reflect new spending limits.
                  </DialogDescription>
                </DialogHeader>
                <EditCategory onSubmit={handleEditCategory} value={data} />
              </>
            ) : actionType == 'delete' ? (
              <>
                <DialogHeader>
                  <DialogTitle className="capitalize">
                    Delete Category {data.category}
                  </DialogTitle>
                  <DialogDescription>
                    Are you sure you want to permanently remove this category
                    from your budget? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                  <Button
                    type="submit"
                    className="px-3 flex gap-1 items-center"
                    variant="destructive"
                    onClick={handleDeleteCategory}
                  >
                    <span> Delete </span>
                    <Trash2 />
                  </Button>
                </DialogFooter>
              </>
            ) : (
              <></>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default Budget;

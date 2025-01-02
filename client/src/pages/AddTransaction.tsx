import { ErrorMessage } from '@/components/ErrorMessage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { baseURL, expenseInput } from '@/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import DateObject from 'react-date-object';
import { postData } from '@/hooks/useAPI';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function AddTransaction() {
  const navigate = useNavigate();
  const date = new DateObject();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<expenseInput>();
  const { fetchData, apiData, serverError } = postData();
  const onSubmit: SubmitHandler<expenseInput> = async (data) => {
    fetchData({
      url: `${baseURL}/expense/add`,
      payload: {
        title: data.title.toLowerCase(),
        type: data.type.toLowerCase(),
        category: data.category.toLowerCase(),
        amount: data.amount,
        transaction_time: date.format('YYYY/MM/DD HH:mm:ss'),
      },
      method: 'POST',
    });
  };

  useEffect(() => {
    if (apiData) {
      toast(apiData.msg);
      navigate('/dashboard');
    } else if (serverError) {
      toast(serverError.msg);
    }
  }, [apiData, serverError]);

  return (
    <div className="w-screen h-screen flex justify-center items-center font-mono">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-1/3 p-8 border-primary border rounded-2xl bg-accent shadow-2xl "
      >
        <h3 className="text-center text-2xl mb-4 font-bold">
          {' '}
          Add Transaction{' '}
        </h3>
        <div className="mb-4">
          <Label> Title</Label>
          <Input
            {...register('title', {
              maxLength: {
                value: 100,
                message: 'Title should not exceed 100 letters',
              },
              required: { value: true, message: 'Title cannot be empty' },
            })}
          />
          {errors.title && <ErrorMessage message={errors.title.message} />}
        </div>
        <div className="mb-4">
          <Label> Category </Label>
          <Input
            {...register('category', {
              maxLength: {
                value: 30,
                message: 'Category should not exceed 30 letters',
              },
              required: { value: true, message: 'Category cannot be empty' },
            })}
          />
          {errors.category && (
            <ErrorMessage message={errors.category.message} />
          )}
        </div>
        <div className="mb-4">
          <Label> Type</Label>
          <select
            className="w-full px-3 py-2 h-9"
            {...register('type', {
              required: { value: true, message: 'Category cannot be empty' },
            })}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <div className="mb-4">
          <Label> Amount </Label>
          <Input
            {...register('amount', {
              max: {
                value: 999999,
                message: 'Amount should be less than 999999',
              },
              min: {
                value: 0,
                message: 'Amount should be greater than 0',
              },
              required: { value: true, message: 'Amount cannot be empty' },
            })}
            type="number"
          />
          {errors.amount && <ErrorMessage message={errors.amount.message} />}
        </div>
        <Button className="w-full" disabled={isSubmitting}>
          Add Transaction{' '}
        </Button>
      </form>
    </div>
  );
}

export default AddTransaction;

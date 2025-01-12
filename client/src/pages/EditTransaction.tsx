import { ErrorMessage } from '@/components/ErrorMessage';
import { FormLoading } from '@/components/FormLoading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from '@/context/theme';
import { getData, postData } from '@/hooks/useAPI';
import { baseURL, expenseInput } from '@/types';
import { Label } from '@radix-ui/react-label';
import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

function EditTransaction() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const id = useParams();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<expenseInput>();

  //Fetching API data
  const {
    apiData: getApiData,
    serverError: getServerError,
    isLoading: getLoading,
  } = getData({
    url: `${baseURL}/expense/get/${id.id}`,
  });
  useEffect(() => {
    if (getApiData?.expense?.length) {
      reset({
        title: getApiData.expense[0].title,
        type: getApiData.expense[0].type,
        amount: getApiData.expense[0].amount,
        category: getApiData.expense[0].category,
      });
    }
  }, [getApiData, reset]);
  if (getServerError) {
    toast(getServerError.msg);
  }

  //Editing API data
  const {
    fetchData,
    apiData: postApiData,
    serverError: postServerError,
    isLoading: postLoading,
  } = postData();
  const onSubmit: SubmitHandler<expenseInput> = async (data) => {
    await fetchData({
      url: `${baseURL}/expense/edit/${id.id}`,
      payload: {
        title: data.title,
        type: data.type,
        amount: data.amount,
        category: data.category,
      },
      method: 'PUT',
    });
  };
  useEffect(() => {
    if (postApiData) {
      toast(postApiData.msg);
      navigate('/dashboard');
    } else if (postServerError) {
      toast(postServerError.msg);
    }
  }, [postApiData, postServerError]);

  return getLoading ? (
    <FormLoading />
  ) : (
    <div
      className={`w-screen h-screen flex flex-col justify-center items-center font-mono p-4 bg-background text-primary ${theme} `}
    >
      <div className="w-full fixed top-0 p-4">
        <Button onClick={() => navigate('/dashboard')}>
          <ArrowLeft />
          Back to Dashboard
        </Button>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full  md:w-3/5 lg:w-1/3 p-8 border-primary border rounded-2xl bg-accent shadow-2xl "
      >
        <h3 className="text-center text-2xl mb-4 font-bold">
          {' '}
          Edit Transaction{' '}
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
        <div className="mb-4 text-primary">
          <Label> Type</Label>
          <select
            className="w-full px-3 py-2 h-9 bg-background"
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
              required: { value: true, message: 'Amount cannot be empty' },
            })}
            type="number"
            min={0}
            max={999999}
          />
          {errors.amount && <ErrorMessage message={errors.amount.message} />}
        </div>
        <Button className="w-full" disabled={isSubmitting}>
          {' '}
          {postLoading ? 'Editing Transaction' : 'Edit Transaction'}{' '}
        </Button>
      </form>
    </div>
  );
}

export default EditTransaction;

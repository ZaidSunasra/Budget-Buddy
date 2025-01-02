import { addCategory } from '@/types';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { ErrorMessage } from './ErrorMessage';
import { Button } from './ui/button';

export function AddCategory({
  onSubmit,
}: {
  onSubmit: (category: string, allocated_value: string) => void;
}) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<addCategory>();

  const submitHandler: SubmitHandler<addCategory> = (data: addCategory) => {
    onSubmit(data.category, data.allocated_value);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="mb-4">
        <Label>Category</Label>
        <Input
          {...register('category', {
            required: {
              value: true,
              message: 'Category cannot be empty',
            },
          })}
        />
        {errors.category && <ErrorMessage message={errors.category.message} />}
      </div>
      <div className="mb-4">
        <Label>Allocate Value</Label>
        <Input
          {...register('allocated_value', {
            max: {
              value: 999999,
              message: 'Amount should be less than 999999',
            },
            min: {
              value: 0,
              message: 'Amount should be greater than 0',
            },
            required: {
              value: true,
              message: 'Amount cannot be empty',
            },
          })}
          type="number"
        />
        {errors.allocated_value && (
          <ErrorMessage message={errors.allocated_value.message} />
        )}
      </div>
      <Button type="submit" className="w-full mb-2" disabled={isSubmitting}>
        {' '}
        {isSubmitting ? 'Adding Category' : 'Add'}{' '}
      </Button>
    </form>
  );
}

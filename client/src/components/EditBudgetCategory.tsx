import { addCategory, editCategory } from '@/types';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { ErrorMessage } from './ErrorMessage';
import { Button } from './ui/button';
import { useEffect } from 'react';

export function EditCategory({
  onSubmit,
  value,
}: {
  onSubmit: (allocated_value: string) => void;
  value: any;
}) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<addCategory>();

  const submitHandler: SubmitHandler<editCategory> = (data: editCategory) => {
    onSubmit(data.allocated_value);
  };

  useEffect(() => {
    reset({
      allocated_value: value.allocated_value,
    });
  }, [value]);

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
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
        {isSubmitting ? 'Editing Category' : 'Edit'}{' '}
      </Button>
    </form>
  );
}

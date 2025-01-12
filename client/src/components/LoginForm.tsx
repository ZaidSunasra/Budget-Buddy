import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { postData } from '@/hooks/useAPI';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { baseURL, loginInput } from '@/types';
import { ErrorMessage } from './ErrorMessage';
import { setUser } from '@/lib/userDetails';
import { TailSpin } from 'react-loader-spinner';
import { useTheme } from '@/context/theme';

export function Login() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<loginInput>();
  const { fetchData, apiData, serverError, isLoading } = postData();
  const onSubmit: SubmitHandler<loginInput> = async (data) => {
    await fetchData({
      url: `${baseURL}/auth/signin`,
      payload: {
        email: data.email,
        password: data.password,
      },
      method: 'POST',
    });
  };

  useEffect(() => {
    if (apiData) {
      toast(apiData.msg);
      setUser(apiData.userData);
      navigate('/dashboard');
    }
    if (serverError) {
      toast(serverError.msg);
    }
  }, [apiData, serverError]);

  return (
    <div>
      <form
        className="p-8 border-primary border rounded-2xl bg-accent shadow-2xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        {isLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
            <TailSpin
              visible={true}
              height="80"
              width="80"
              ariaLabel="tail-spin-loading"
              radius="1"
              color={
                theme === 'dark'
                  ? 'hsl(212.7 26.8% 83.9%)'
                  : 'hsl(222.2 84% 4.9%)'
              }
              wrapperClass=""
              wrapperStyle={{}}
            />
          </div>
        )}
        <h3 className="text-center text-2xl mb-4 font-bold">
          Login to your account
        </h3>
        <div className="mb-4">
          <Label>Email</Label>
          <Input
            {...register('email', {
              required: { value: true, message: 'Email cannot be empty' },
            })}
            type="email"
            placeholder="m@example.com"
          />
          {errors.email && <ErrorMessage message={errors.email.message} />}
        </div>
        <div className="mb-6">
          <Label>Password</Label>
          <Input
            {...register('password', {
              required: { value: true, message: 'Password cannot be empty.' },
            })}
            type="password"
          />
          {errors.password && (
            <ErrorMessage message={errors.password.message} />
          )}
        </div>
        <Button type="submit" className="w-full mb-2" disabled={isSubmitting}>
          {' '}
          {isLoading ? 'Logging In' : 'Login'}{' '}
        </Button>
        <p className="text-center">
          Dont have an account?
          <Link to={'/signup'} className="underline">
            SignUp
          </Link>
        </p>
      </form>
    </div>
  );
}

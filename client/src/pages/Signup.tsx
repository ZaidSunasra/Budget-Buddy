import { ErrorMessage } from '@/components/ErrorMessage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { postData } from '@/hooks/useAPI';
import { baseURL, signupInput } from '@/types';
import { Label } from '@radix-ui/react-label';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { setUser } from '@/lib/userDetails';
import { useTheme } from '@/context/theme';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { TailSpin } from 'react-loader-spinner';

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const { theme } = useTheme();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<signupInput>();
  const { fetchData, apiData, serverError, isLoading } = postData();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit: SubmitHandler<signupInput> = async (data) => {
    await fetchData({
      url: `${baseURL}/auth/signup`,
      payload: {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      },
      method: 'POST',
    });
  };

  useEffect(() => {
    if (apiData) {
      toast(apiData.msg);
      setUser(apiData.userData);
      navigate('/dashboard');
    } else if (serverError) {
      toast(serverError.msg);
    }
  }, [apiData, serverError]);

  return (
    <div
      className={`font-mono w-screen h-screen flex justify-center items-center text-primary bg-background p-4 ${theme}`}
    >
      <div className="w-full fixed top-0 p-4">
        <Button onClick={() => navigate('/')} disabled={isLoading}>
          <ArrowLeft />
          Back
        </Button>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full  md:w-3/5 lg:w-1/3 p-8 border-primary border rounded-2xl bg-accent shadow-2xl"
      >
        {isLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
            <TailSpin
              visible={true}
              height="80"
              width="80"
              color={
                theme === 'dark'
                  ? 'hsl(212.7 26.8% 83.9%)'
                  : 'hsl(222.2 84% 4.9%)'
              }
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}
        <h3 className="text-center text-2xl mb-4 font-bold">Create Account</h3>
        <div className="mb-4">
          <Label> First Name</Label>
          <Input
            {...register('firstName', {
              maxLength: {
                value: 30,
                message: 'Name should not exceed 30 letters',
              },
              required: { value: true, message: 'First Name cannot be empty' },
            })}
          />
          {errors.firstName && (
            <ErrorMessage message={errors.firstName.message} />
          )}
        </div>
        <div className="mb-4">
          <Label>Last Name</Label>
          <Input
            {...register('lastName', {
              maxLength: {
                value: 30,
                message: 'Name should not exceed 30 letters',
              },
              required: { value: true, message: 'Last Name cannot be empty' },
            })}
          />
          {errors.lastName && (
            <ErrorMessage message={errors.lastName.message} />
          )}
        </div>
        <div className="mb-4">
          <Label> Email </Label>
          <Input
            {...register('email', {
              maxLength: {
                value: 30,
                message: 'Email should not exceed 30 letters',
              },
              required: { value: true, message: 'Email cannot be empty' },
            })}
            type="email"
          />
          {errors.email && <ErrorMessage message={errors.email.message} />}
        </div>
        <div className="mb-4 relative">
          <Label>Password</Label>
          <Input
            {...register('password', {
              maxLength: {
                value: 16,
                message: 'Password should not exceed 16 characters',
              },
              minLength: {
                value: 6,
                message: 'Password should not be less than 6 characters',
              },
              required: { value: true, message: 'Password cannot be empty' },
            })}
            type={showPassword ? 'text' : 'password'}
            className="w-full p-2 border rounded-md"
          />
          <span
            className="absolute top-8 right-3 flex cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </span>
          {errors.password && (
            <ErrorMessage message={errors.password.message} />
          )}
        </div>
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {' '}
          {isLoading ? 'Creating Account' : 'Sign Up'}{' '}
        </Button>
      </form>
    </div>
  );
}

export default Signup;

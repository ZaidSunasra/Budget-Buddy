import { ErrorMessage } from "@/components/ErrorMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { postData } from "@/hooks/useAPI";
import { baseURL, signupInput } from "@/types";
import { Label } from "@radix-ui/react-label";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

function Signup() {

   const navigate = useNavigate();
   const {fetchData, apiData, serverError, isLoading} = postData();
   const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm<signupInput>()
   const onSubmit: SubmitHandler<signupInput> = async (data) => {
      await fetchData({
         url: `${baseURL}/auth/signup`,
         payload: {
            email: data.email,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName
         },
         method: 'POST'
      })
   }

   useEffect(() => {
      if(apiData) {
         toast(apiData.msg);
         navigate("/")
      } else if (serverError) {
         toast(serverError.msg);
      }
   }, [apiData, serverError]);

   return <div className="font-mono w-screen h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-1/3 p-8 border-primary border rounded-2xl bg-accent shadow-2xl">
      <h3 className="text-center text-2xl mb-4 font-bold">Create Account</h3>
         <div className="mb-4">
            <Label> First Name</Label>
            <Input  {...register("firstName",
               {
                  maxLength: { value: 30, message: "Name should not exceed 30 letters" },
                  required: { value: true, message: "First Name cannot be empty" }
               }
            )} />
             {errors.firstName && <ErrorMessage message={errors.firstName.message}/>}
         </div>
         <div className="mb-4">
            <Label>Last Name</Label>
            <Input  {...register("lastName",
               {
                  maxLength: { value: 30, message: "Name should not exceed 30 letters" },
                  required: { value: true, message: "Last Name cannot be empty" }
               }
            )} />
             {errors.lastName && <ErrorMessage message={errors.lastName.message}/>}
         </div>
         <div className="mb-4">
            <Label> Email </Label>
            <Input  {...register("email",
               {
                  maxLength: { value: 30, message: "Email should not exceed 30 letters"},
                  required: { value: true, message: "Email cannot be empty"}
               }
            )} type="email"/>
             {errors.email && <ErrorMessage message={errors.email.message}/>}
         </div>
         <div className="mb-4">
            <Label>Password</Label>
            <Input {...register("password", 
               {
                  maxLength: { value: 16, message: "Password should not exceed 16 letters"},
                  minLength: { value: 6, message: "Password should not be less than 6 words"},
                  required: { value: true, message: "Password cannot be empty"}
               }
            )}  type="password"/>
             {errors.password && <ErrorMessage message={errors.password.message}/>}
         </div>
         <Button type="submit" disabled={isSubmitting} className="w-full"> { isLoading ? "Creating Account" : "Sign Up"} </Button>
      </form>
   </div>
}

export default Signup;
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { postData } from "@/hooks/useAPI";
import { toast } from "sonner";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginInput } from "@/types";

export function Login() {

    const navigate = useNavigate();
    const { handleSubmit, register } = useForm<loginInput>();
    const { fetchData, apiData, serverError, isLoading } = postData();
    const onSubmit: SubmitHandler<loginInput> = async (data) => {
        await fetchData({
            url: "http://localhost:3000/api/v1/auth/signin",
            payload: {
                email: data.email,
                password: data.password
            }
        });
    }

    useEffect (() => {
        if(apiData){
            toast(apiData.msg);
            navigate("/dashboard");
        }
        if(serverError){
            toast(serverError.msg);
        }
    }, [apiData, serverError])

    return <div>
        <form className="p-8 border-primary border rounded-2xl bg-accent shadow-2xl" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-center text-2xl mb-4">Login to your account</h3>
            <div className="mb-4" >
                <Label>Email</Label>
                <Input {...register("email")} type="email" />
            </div>
            <div className="mb-6" >
                <Label>Password</Label>
                <Input {...register("password")} type="password" />
            </div>
            <Button type="submit" className="w-full mb-2"> {isLoading ? "Logging In" : "Login"} </Button>
            <p className="text-center">Dont have an account?<Link to={"/signup"} className="underline">SignUp</Link></p>
        </form>    
    </div>

}
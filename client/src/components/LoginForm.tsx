import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { postData } from "@/hooks/useAPI";

type loginInput = {
    email: string,
    password: string
}

export function Login() {
    
    const { handleSubmit, register } = useForm<loginInput>();
    const { fetchData, apiData, serverError, isLoading } = postData();
    const onSubmit: SubmitHandler<loginInput> = (data) => {
        fetchData({
            url: "http://localhost:3000/api/v1/auth/signin",
            payload: {
                email: data.email,
                password: data.password
            }
        });
    }

    return <div>
        
        <form className="p-8 border-primary border-4 rounded-2xl bg-accent" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-center text-2xl">Login to your account</h3>
            <br />
            <Label>Email</Label>
            <Input {...register("email")} type="email" />
            <br />
            <Label>Password</Label>
            <Input {...register("password")} type="password" />
            <br />
            <Button type="submit" className="w-full mb-4"> Login </Button>
            <p className="text-center">Dont have an account?<u>SignUp</u></p>
        </form>
    </div>

}
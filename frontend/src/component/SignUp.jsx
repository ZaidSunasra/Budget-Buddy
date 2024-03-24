import { Button } from "./Button";
import { Heading } from "./Heading";
import { Input } from "./Input";
import { Warning } from "./Warning";

export function SignUp(){
    return <div className="h-screen flex justify-center items-center">
        <div className="flex flex-col p-2 bg-white rounded-md w-2/5 border-2 shadow-lg">
            <Heading heading={"Create Account"} />
            <Input label={"Firstname"} placeholder={"Enter your firstname"} />
            <Input label={"Lastname"} placeholder={"Enter your lastname"} />
            <Input label={"Email"} placeholder={"Enter your email"} />
            <Input label={"Password"} placeholder={"Enter your password"} />
            <Button text={"Sign Up"} />
            <Warning text={"Already have an account?"} linktext={"Login"} to={"/"} />
        </div>
    </div>
}
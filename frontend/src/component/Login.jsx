import { Button } from "./Button"
import { Heading } from "./Heading"
import { Input } from "./Input"
import { Warning } from "./Warning"

export function Login() {
    return <div>
        <div className="flex flex-col p-2 bg-white rounded-md w-full border-2 border-black">
            <Heading heading={"Login"} />
            <Input label={"Email"} placeholder={"Enter your email"} />
            <Input label={"Password"} placeholder={"Enter your password"} />
            <Button text={"Login"} />
            <Warning text={"Dont have an account?"} linktext={"Sign Up"} to={"/signup"} />
        </div>
    </div>
}
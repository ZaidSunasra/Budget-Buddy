import { useState } from "react"
import { Button } from "./Button"
import { Heading } from "./Heading"
import { Input } from "./Input"
import { Warning } from "./Warning"
import axios from "axios";
import { useNavigate } from "react-router-dom"

export function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="w-1/4">
        <div className="flex flex-col p-2 bg-white rounded-md w-full border-2 shadow-lg">
            <Heading heading={"Login"} />
            <Input label={"Email"} placeholder={"Enter your email"} onChange={e => {
                setEmail(e.target.value);
            }} />
            <Input label={"Password"} placeholder={"Enter your password"} onChange={e => {
                setPassword(e.target.value);
            }} />
            <Button text={"Login"} onClick={async () => {
                const response = await axios.post("http://localhost:3000/signin", {
                    email, password
                });
                if (response.data.msg == "Login successfull") {
                    localStorage.setItem("Token", response.data.token);
                    navigate("/dashboard");
                }
                else{
                    alert(response.data.msg)
                }
            }} />
            <div className="p-7">
            <Warning text={"Dont have an account?"} linktext={"Sign Up"} to={"/signup"} />
            </div>
            
        </div>
    </div>
}
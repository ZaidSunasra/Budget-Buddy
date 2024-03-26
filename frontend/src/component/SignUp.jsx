import { useState } from "react";
import { Button } from "./Button";
import { Heading } from "./Heading";
import { Input } from "./Input";
import { Warning } from "./Warning";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SignUp() {

    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();


    return <div className="h-screen flex justify-center items-center">
        <div className="flex flex-col p-2 bg-white rounded-md w-2/5 border-2 shadow-lg">
            <Heading heading={"Create Account"} />
            <Input label={"Firstname"} placeholder={"Enter your firstname"} onChange={e => {
                setfirstName(e.target.value);
            }} />
            <Input label={"Lastname"} placeholder={"Enter your lastname"} onChange={e => {
                setlastName(e.target.value);
            }} />
            <Input label={"Email"} placeholder={"Enter your email"} onChange={e => {
                setemail(e.target.value);
            }} />
            <Input label={"Password"} placeholder={"Enter your password"} onChange={e => {
                setpassword(e.target.value);
            }} />
            <Button text={"Sign Up"} onClick={async () => {
                const response = await axios.post("http://localhost:3000/signup", {
                    firstName, lastName, email, password
                });
                console.log(response);
                if (response.data.msg == "User account created") {
                    localStorage.setItem("Token", response.data.token);
                    alert(response.data.msg);
                    navigate("/");
                }
                else{
                    alert(response.data.msg)
                }
            }} />
            <Warning text={"Already have an account?"} linktext={"Login"} to={"/"} />
        </div>
    </div>
}
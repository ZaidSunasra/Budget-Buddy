import { useState } from "react";
import { Button } from "../component/Button";
import { Heading } from "../component/Heading";
import { Input } from "../component/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function AddTransaction() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [amount, setAmount] = useState(0);
    const [type, setType] = useState('expense');
    const navigate = useNavigate();

    return <div className=" h-screen flex items-center justify-center">
        <div className="flex flex-col p-2 bg-white rounded-md shadow-lg border-2 w-2/5">
            <Heading heading={"Create Transaction"} />
            <Input placeholder={"Enter title"} label={"Title"} onChange={e => {
                setTitle(e.target.value);
            }} />
            <Input placeholder={"Enter description"} label={"Description"} onChange={e => {
                setDescription(e.target.value);
            }} />
            <Input placeholder={"Enter category"} label={"Category"} onChange={e => {
                setCategory(e.target.value);
            }} />
            <div className="flex flex-col px-2 py-1">
                <div className="my-1 font-mono text-lg font-medium text-left"> Date </div>
                <input type="date" placeholder="Enter date" className="w-full px-2 py-1 border-2 rounded-md" onChange={e => {
                    setDate(e.target.value);
                }} />
            </div>
            <div className="flex flex-col px-2 py-1">
                <div className="my-1 font-mono text-lg font-medium text-left"> Amount </div>
                <input type="number" placeholder="Enter amount" className="w-full px-2 py-1 border-2 rounded-md" onChange={e => {
                    setAmount(e.target.value);
                }} />
            </div>
            <div className="flex flex-col px-2 py-1">
                <label htmlFor="transaction_type" className="my-1 font-mono text-lg font-medium text-left">Choose transaction type:</label>
                <select name="transaction_type" id="transaction_type" className="w-full px-2 py-1 border-2 rounded-md" onChange={e => {
                    setType(e.target.value);
                }}>
                    <option value="expense">expense</option>
                    <option value="income">income</option>
                </select>
            </div>
            <Button text={"Add transaction"} onClick={async () => {
                const response = await axios.post("http://localhost:3000/transaction/add", {
                    title, description, date, category, amount, type
                },
                {
                    headers: {
                        authorization: "Bearer " + localStorage.getItem("Token")
                    }
                });
                console.log(response);
                if(response.data.msg == "Transaction added successfully"){
                    alert(response.data.msg);
                    navigate("/dashboard");
                }
                else{
                    alert(response.data.msg);
                }
            }} />
        </div>
    </div>
}
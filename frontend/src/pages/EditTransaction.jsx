import { useEffect, useState } from "react";
import { Button } from "../component/Button";
import { Heading } from "../component/Heading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export function EditTransaction() {

    const id = useParams();
    const navigate = useNavigate();

    const [transaction_id, setTransaction_id] = useState("")
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [amount, setAmount] = useState();
    const [type, setType] = useState("");
    
    useEffect(() => {
        async function getTransactionDetails() {
            const response = await axios.get("http://localhost:3000/transaction/get/" + id.id, {
                headers: {
                    authorization: "Bearer " + localStorage.getItem("Token")
                }
            });
            const {title, description, category, date, amount, transaction_type, transaction_id} = response.data.transaction.rows[0];

            setTitle(title);
            setDescription(description);
            setCategory(category);
            setDate(date.slice(0, 10));
            setAmount(parseFloat(amount));
            setType(transaction_type);
            setTransaction_id(transaction_id);

        }

        getTransactionDetails();

    }, [id]);

    return <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col p-2 bg-white rounded-md shadow-lg border-2 w-full lg:w-1/2">
            <Heading heading={"Edit Transaction"} />
            <div className="flex flex-col px-2 py-1">
                <div className="my-1 font-mono text-lg font-medium text-left"> Title </div>
                <input defaultValue={title} type="text" placeholder="Enter title" className="w-full px-2 py-1 border-2 rounded-md" onChange={e => {
                    setTitle(e.target.value);
                }} />
            </div>
            <div className="flex flex-col px-2 py-1">
                <div className="my-1 font-mono text-lg font-medium text-left"> Description </div>
                <input defaultValue={description} type="text" placeholder="Enter description" className="w-full px-2 py-1 border-2 rounded-md" onChange={e => {
                    setDescription(e.target.value);
                }} />
            </div>
            <div className="flex flex-col px-2 py-1">
                <div className="my-1 font-mono text-lg font-medium text-left"> Category </div>
                <input defaultValue={category} type="text" placeholder="Enter category" className="w-full px-2 py-1 border-2 rounded-md" onChange={e => {
                    setCategory(e.target.value);
                }} />
            </div>
            <div className="flex flex-col px-2 py-1">
                <div className="my-1 font-mono text-lg font-medium text-left"> Date </div>
                <input defaultValue={date} type="date" placeholder="Enter date" className="w-full px-2 py-1 border-2 rounded-md" onChange={e => {
                    setDate(e.target.value);
                }} />
            </div>
            <div className="flex flex-col px-2 py-1">
                <div className="my-1 font-mono text-lg font-medium text-left"> Amount </div>
                <input defaultValue={amount} type="number" placeholder="Enter amount" className="w-full px-2 py-1 border-2 rounded-md" onChange={e => {
                    setAmount(e.target.value);
                }} />
            </div>
            <div className="flex flex-col px-2 py-1">
                <label htmlFor="transaction_type" className="my-1 font-mono text-lg font-medium text-left">Choose transaction type:</label>
                <select defaultValue={type} name="transaction_type" id="transaction_type" className="w-full px-2 py-1 border-2 rounded-md" onChange={e => {
                    setType(e.target.value);
                }}>
                    <option value="">--SELECT TYPE--</option>
                    <option value="expense">expense</option>
                    <option value="income">income</option>
                </select>
            </div>
            <Button text={"Edit transaction"} onClick={async () => {
                const response = await axios.patch("http://localhost:3000/transaction/edit/" + transaction_id, {
                    title, description, date, category, amount, type
                },
                    {
                        headers: {
                            authorization: "Bearer " + localStorage.getItem("Token")
                        }
                    });
                if (response.data.msg == "Transaction edited successfully") {
                    alert(response.data.msg);
                    navigate("/dashboard");
                }
                else {
                    alert(response.data.msg);
                }
            }} />
        </div>
    </div>

}
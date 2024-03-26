import { useEffect, useState } from "react";
import { Navbar } from "../component/Navbar";
import { TableCell } from "../component/TableCell";
import axios from "axios";
import { TransactionDetails } from "../component/TransactionDetails";
import { useNavigate } from "react-router-dom";

export function Dashboard() {

    const [balance, setBalance] = useState(0);
    const [transaction, setTransaction] = useState([]);
    const [name, setName] = useState("");
    const [expense, setExpense] = useState(0);
    const [income, setIncome] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        async function getAllTransactions(){
            const response = await axios.get("http://localhost:3000/transaction/get", {
                headers: {
                    authorization: "Bearer " + localStorage.getItem("Token")
                }
            });
            setTransaction(response.data.transactions.rows);
        }
        getAllTransactions();
    }, []);

    useEffect(() => {
        async function getUserDetails(){
            const response = await axios.get("http://localhost:3000/get/userDetails", {
                headers:{
                    authorization: "Bearer " + localStorage.getItem("Token") 
                }
            });
            setName(response.data.details[0].first_name);
        }
        getUserDetails();
    }, []);

    useEffect(() => {
        async function getIncomeDetails(){
            const response = await axios.get("http://localhost:3000/get/incomeDetails", {
                headers:{
                    authorization: "Bearer " + localStorage.getItem("Token") 
                }
            });
            setIncome(response.data.income);
            setExpense(response.data.expense);
            setBalance(response.data.balance);
        }
        getIncomeDetails();
    }, []);


    return <div className="box-border">
        <Navbar  name = {name} />
        <div className="flex flex-col w-full gap-5 items-center py-7 px-2 md:flex-row md:justify-evenly">
            <div className="shadow-xl flex flex-col w-full items-start border-2 rounded-md p-7 md:w-2/5">
                <h1 className="text-center font-mono font-bold text-4xl w-full mb-4"> This Month </h1>
                <h1 className="text-2xl font-mono font-bold text-blue-600 mb-2 w-full"> Balance: {balance} </h1>
                <h3 className="text-xl font-mono font-bold text-red-600 mb-2 w-full"> Expense: {expense} </h3>
                <h3 className="text-xl font-mono font-bold text-green-600 mb-2 w-full"> Income: {income} </h3>
            </div>
        </div>
        <div className="flex flex-col items-center gap-4 w-full py-7 px-2 lg:flex-row lg:justify-around ">
            <input type="text" className="w-full p-2 border-2 shadow-lg font-mono text-xl font-extrabold rounded-md border-black lg:w-3/4" placeholder="Search expense" />
            <button className="w-full flex items-center justify-center bg-yellow-300 px-6 py-2 text-xl font-mono font-extrabold rounded-md shadow-lg gap-2 lg:w-1/4" 
            onClick={ () => {
                navigate("/addTransaction");
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Add transaction
            </button>
        </div>
        <div className="w-full px-2 grid grid-cols-12">
            <TableCell key={"date"} data={"Date"} width={2} />
            <TableCell key={"title"} data={"Title"} width={3} />
            <TableCell key={"amount"} data={"Amount"} width={2} />
            <TableCell key={"category"} data={"Category"} width={2} />
            <TableCell key={"type"} data={"Type"} width={1} />
            <TableCell key={"action"} data={"Action"} width={2} />
        </div>
        
        { transaction.map(trans => <TransactionDetails data={trans} />)}
    </div>
    
}


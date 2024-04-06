import { useEffect, useState } from "react";
import { Navbar } from "../component/Navbar";
import axios from "axios";
import { TransactionDetails } from "../component/TransactionDetails";
import { useNavigate } from "react-router-dom";

export function Dashboard() {

    const [balance, setBalance] = useState(0);
    const [transaction, setTransaction] = useState([]);
    const [name, setName] = useState("");
    const [expense, setExpense] = useState(0);
    const [income, setIncome] = useState(0);
    const [filter, setFilter] = useState("");
    const [displayTransaction, setDisplayTransaction] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getSearchedTransaction() {
            const response = await axios.get("http://localhost:3000/transaction/filter?filter=" + filter, {
                headers: {
                    authorization: "Bearer " + localStorage.getItem("Token")
                }
            });
            setDisplayTransaction(response.data.filter.rows);
        }
        getSearchedTransaction();
    }, [filter]);

    useEffect(() => {
        async function getAllTransactions() {
            const response = await axios.get("http://localhost:3000/transaction/get", {
                headers: {
                    authorization: "Bearer " + localStorage.getItem("Token")
                }
            });
            setTransaction(response.data.transactions.rows);
        }
        getAllTransactions();
    }, [transaction]);

    useEffect(() => {
        async function getUserDetails() {
            const response = await axios.get("http://localhost:3000/get/userDetails", {
                headers: {
                    authorization: "Bearer " + localStorage.getItem("Token")
                }
            });
            setName(response.data.details[0].first_name);
        }
        getUserDetails();
    }, []);

    useEffect(() => {
        async function getIncomeDetails() {
            const response = await axios.get("http://localhost:3000/get/incomeDetails", {
                headers: {
                    authorization: "Bearer " + localStorage.getItem("Token")
                }
            });
            setIncome(response.data.income);
            setExpense(response.data.expense);
            setBalance(response.data.balance);
        }
        getIncomeDetails();
    }, [transaction]);


    return <div>
        <Navbar name={name} />
        <div className="flex flex-col w-full gap-5 items-center py-7 px-2 md:flex-row md:justify-evenly">
            <div className="shadow-xl flex flex-col w-full items-start border-2 rounded-md p-7 md:w-2/5">
                <h1 className="text-center font-mono font-bold text-4xl w-full mb-4"> All Time </h1>
                <h1 className="text-2xl font-mono font-bold text-blue-600 mb-2 w-full"> Balance: {balance} </h1>
                <h3 className="text-xl font-mono font-bold text-red-600 mb-2 w-full"> Expense: {expense} </h3>
                <h3 className="text-xl font-mono font-bold text-green-600 mb-2 w-full"> Income: {income} </h3>
                <button className="text-xl font-mono font-bold underline flex items-center mt-2 m-auto rounded-md p-2 hover:bg-blue-600" onClick={() => {
                    navigate("/displayGraph");
                }}>
                    Get Detailed Summary
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
        </div>
        <div className="flex flex-col items-center gap-4 w-full py-7 px-2 lg:flex-row lg:justify-around ">
            <input type="text" className="w-full p-2 border-2 shadow-lg font-mono text-xl font-extrabold rounded-md border-black lg:w-3/4" placeholder="Search expense" onChange={e => {
                setFilter(e.target.value);
            }} />
            <button className="w-full flex items-center justify-center bg-yellow-300 px-6 py-2 text-xl font-mono font-extrabold rounded-md shadow-lg gap-2 lg:w-1/4 hover:bg-yellow-600"
                onClick={() => {
                    navigate("/addTransaction");
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Add transaction
            </button>
        </div>
        <div className="overflow-x-auto">
            <div className="px-2 flex justify-center">
                <div className={`bg-blue-600 w-32 min-w-32  lg:w-1/6 p-1 font-mono text-xl font-bold text-center  border-2 border-black`}>
                    Date
                </div>
                <div className={`bg-blue-600 w-48 min-w-48 lg:w-1/4 p-1 font-mono text-xl font-bold text-center  border-2 border-black`}>
                    Title
                </div>
                <div className={`bg-blue-600 w-36 min-w-36 lg:w-1/6 p-1 font-mono text-xl font-bold text-center  border-2 border-black`}>
                    Amount
                </div>
                <div className={`bg-blue-600 w-32 min-w-32 lg:w-1/6 p-1 font-mono text-xl font-bold text-center  border-2 border-black`}>
                    Category
                </div>
                <div className={`bg-blue-600 w-28 min-w-28 lg:w-1/12 p-1 font-mono text-xl font-bold text-center  border-2 border-black`}>
                    Type
                </div>
                <div className={`bg-blue-600 w-44 min-w-44 lg:w-1/6 p-1 font-mono text-xl font-bold text-center  border-2 border-black`}>
                    Action
                </div>
                {/* <TableCell key={"date"} data={"Date"} />
                <TableCell key={"title"} data={"Title"} />
                <TableCell key={"amount"} data={"Amount"} />
                <TableCell key={"category"} data={"Category"} />
                <TableCell key={"type"} data={"Type"} />
                <TableCell key={"action"} data={"Action"} /> */}
            </div>
            {filter ? (
                displayTransaction.map(display => <TransactionDetails key={display.transaction_id} data={display} filter={setFilter} />)
            ) : (
                transaction.map(trans => <TransactionDetails key={trans.transaction_id} data={trans} filter={setFilter} />)
            )}
        </div>

    </div>

}


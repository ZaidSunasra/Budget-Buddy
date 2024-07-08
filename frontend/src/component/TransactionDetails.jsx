import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { Confirmation } from "./Confirmation";
import axios from "axios";

async () => {
    const response = axios.delete("http://localhost:3000/transaction/delete", {
        id
    },
        {
            headers: {
                authorization: "Bearer " + localStorage.getItem("Token")
            }
        });
}

export function TransactionDetails({ data, filter }) {

    const navigate = useNavigate();
    const id = data.transaction_id;

    const [isConfirmation, setIsConfirmation] = useState(false);

    if (isConfirmation) {
        return <div>
            <Confirmation message={"Are you sure you want to delete this transaction"} onCancel={() => { setIsConfirmation(false) }}
                onConfirm={async () => {
                    const response = await axios.delete("http://localhost:3000/transaction/delete?id=" + id, {
                        headers: {
                            authorization: "Bearer " + localStorage.getItem("Token")
                        }
                    });
                    setIsConfirmation(false);
                    filter("");
                }}
            />
        </div>

    }

    return <div className="px-2 flex justify-start">
        <div className="p-1 text-center cursor-pointer min-w-32 w-32 lg:w-1/6  font-mono font-bold flex justify-center items-center text-xl border-2 border-black"> {data.date.slice(0, 10)} </div>
        <div className="p-1 text-center cursor-pointer min-w-48 w-48 lg:w-1/4  font-mono font-bold flex justify-center items-center text-xl border-2 border-black"> {data.title + " \n " + data.description} </div>
        <div className="p-1 text-center cursor-pointer min-w-36 w-36 lg:w-1/6  font-mono font-bold flex justify-center items-center text-xl border-2 border-black"> {data.amount} </div>
        <div className="p-1 text-center cursor-pointer min-w-32 w-32 lg:w-1/6  font-mono font-bold flex justify-center items-center text-xl border-2 border-black"> {data.category} </div>
        <div className="p-1 text-center cursor-pointer min-w-28 w-28 lg:w-1/12 font-mono font-bold flex justify-center items-center text-xl border-2 border-black"> {data.transaction_type} </div>
        <div className="p-1 text-center cursor-pointer min-w-44 w-44 lg:w-1/6  font-mono font-bold flex justify-evenly items-center text-xl border-2 border-black py-2">
            <button className="bg-white flex justify-center items-center font-extrabold cursor-pointer p-4 rounded-md shadow-lg hover:bg-black" onClick={() => {
                navigate("/edit/" + data.transaction_id);
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
            </button>
            <button className="bg-white flex justify-center items-center font-extrabold cursor-pointer p-4 rounded-md shadow-lg hover:bg-black" onClick={() => {
                setIsConfirmation(true)
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
            </button>
        </div>
    </div>
}
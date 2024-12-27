import { useState } from "react"
import { Confirmation } from "./Confirmation";
import { useNavigate } from "react-router-dom";

export function Navbar({ name }) {

    const [isConfirmation, setIsConfirmation] = useState(false);
    const navigate = useNavigate();

    if(isConfirmation){
        return <div>
            <Confirmation message={"Logout"} onCancel={() => {setIsConfirmation(false)}} onConfirm={() => {
                localStorage.removeItem("Token");
                navigate("/");
            }} />
        </div>
    }

    return <div className="flex flex-col gap-2 w-full items-center bg-blue-600 font-mono py-2 md:flex-row md:justify-between md:px-4 ">

        <button className="flex gap-2 items-center cursor-pointer bg-white text-blue-600 rounded-md shadow-lg px-6 py-2" onClick={() => {
            setIsConfirmation(true);
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
            </svg>
            <h3 className="text-xl font-semibold"> Logout </h3>
        </button>
        <div className="font-extrabold text-4xl text-white">
            <h1> Budget Buddy </h1>
        </div>

        <div className="flex items-center gap-2">
            <div className="p-2">
                <h3 className="text-xl font-semibold text-white">Hello,{name}</h3>
            </div>
            <div className="bg-white rounded-full flex justify-center items-center text-blue-600 w-12 h-12">
                <div className="text-2xl p-2 font-bold">{name[0]}</div>
            </div>
        </div>


    </div >
}
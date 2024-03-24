import { Navbar } from "../component/Navbar";

export function Dashboard() {

    return <div className="h-screen w-screen">
        <Navbar />
        <div className="flex flex-col items-center p-7 lg:flex-row justify-evenly mb-5">
            <div className="shadow-xl flex flex-col items-start border-2 rounded-md p-7 w-2/5">
                <h1 className="text-center font-mono font-bold text-4xl w-full mb-4"> This Month </h1>
                <h1 className="text-2xl font-mono font-bold text-blue-600 mb-2 w-full"> Balance: </h1>
                <h3 className="text-xl font-mono font-bold text-red-600 mb-2 w-full"> Expense: </h3>
                <h3 className="text-xl font-mono font-bold text-green-600 mb-2 w-full"> Income: </h3>
            </div>
            <div className="shadow-xl flex flex-col items-start border-2 rounded-md p-7 w-2/5">
                <h1 className="text-center font-mono font-bold text-4xl w-full mb-4"> Expense Graph </h1>
                <h1 className="text-2xl font-mono font-bold text-blue-600 mb-2 w-full"> Balance: </h1>
                <h3 className="text-xl font-mono font-bold text-red-600 mb-2 w-full"> Expense: </h3>
                <h3 className="text-xl font-mono font-bold text-green-600 mb-2 w-full"> Income: </h3>
            </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-between w-full p-7 mb-3">
            <input type="text" className="w-4/5 p-2 border-2 shadow-lg font-mono text-xl rounded-md border-black" placeholder="Search expense" />
            <button className="bg-green-600 px-6 py-2 font-mono font-extrabold rounded-md shadow-lg flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Add transaction
            </button>
        </div>
    </div>
}
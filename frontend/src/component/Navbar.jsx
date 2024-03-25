export function Navbar() {
    return <div className="bg-blue-600 flex justify-between p-4 font-mono items-center">
        <div className="font-extrabold text-4xl text-white">
            <h1> Budget Buddy </h1>
        </div>
        <div className="flex items-center gap-2">
            <div className="bg-white rounded-full flex justify-center items-center text-blue-600 w-12 h-12">
                <div className="text-2xl p-2 font-bold">U</div>
            </div>
            <div className="p-2">
                <h3 className="text-xl font-semibold text-white">Hello, User</h3>
            </div>
            <button className="flex gap-2 items-center cursor-pointer bg-white text-blue-600 rounded-md shadow-lg px-6 py-2">
                <h3 className="text-xl font-semibold"> Logout </h3>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                </svg>
            </button>
        </div>


    </div >
}
export function Navbar() {
    return <div className="bg-blue-600 flex justify-between p-4 font-mono items-center">
        <div className="font-extrabold text-3xl text-white">
            <h1> Budget Buddy </h1>
        </div>
        <div className="flex items-center gap-2">
            <div className="bg-white rounded-full flex justify-center items-center text-blue-600 w-12 h-12">
                <div className="text-xl p-2 font-bold">U</div>
            </div>
            <div className="p-2">
                <h3 className="text-xl font-semibold text-white">Hello, User</h3>
            </div>

        </div>


    </div >
}
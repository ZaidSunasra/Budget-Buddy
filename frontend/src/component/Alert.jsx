export function Alert({ msg }){
    return <div className="bg-blue-600 p-2 font-mono text-white text-xl font-bold absolute top-3 left-1/2">
        {msg}
    </div>
}
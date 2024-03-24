export function Button({ text }) {
    return <div className="px-2">
        <button className="border-2 rounded-md my-2 w-full p-2 bg-blue-600 flex justify-center items-center text-xl font-medium font-mono">
            {text}
        </button>
    </div>
}
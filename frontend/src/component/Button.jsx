export function Button({ text, onClick }) {
    return <div className="px-2">
        <button onClick={onClick} className="border-2 rounded-md my-2 w-full p-2 bg-blue-600 flex justify-center items-center text-2xl font-extrabold font-mono">
            {text}
        </button>
    </div>
}
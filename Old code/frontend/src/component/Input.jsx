export function Input({ label, placeholder, onChange }) {
    return <div className="flex flex-col px-2 py-1">
        <div className="my-1 font-mono text-lg font-medium text-left"> {label} </div>
        <input onChange={onChange} type="text" placeholder={placeholder} className="w-full px-2 py-1 border-2 rounded-md"/>
    </div>
}
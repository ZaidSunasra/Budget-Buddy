export function Confirmation({ message, onCancel, onConfirm }) {
    return <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-8 rounded shadow-lg">
            <p className="mb-4 text-center">{message}</p>
            <div className="flex justify-center">
                <button className="mr-2 px-4 py-2 bg-gray-200 rounded" onClick={onCancel}>
                    Cancel
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={onConfirm}>
                    Confirm
                </button>
            </div>
        </div>
    </div>

}
export function TableCell({ data, width}) {

    const col = {
        1: "col-span-1",
        2: "col-span-2",
        3: "col-span-3"
    }

    return <div className={`bg-blue-600 p-4 font-mono text-xl font-bold text-center ${col[width]} border-2 border-black`}>
        {data}
    </div>
}
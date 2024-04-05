export function CategoryWise({data}){
    return <div>
        <table>
            <tr>
                <td>
                    {data.category}
                </td>
                <td>
                    {data.total_expense}
                </td>
            </tr>
        </table>
    </div>
}
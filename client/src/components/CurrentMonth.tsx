import { getData } from "@/hooks/useAPI"
import { baseURL } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

export function CurrentMonth() {

    const {apiData} = getData({
        url: `${baseURL}/analytics/currentMonth`
    });
    console.log(apiData?.response);

    const balance: number = parseFloat(apiData?.response[0].total_income) - parseFloat(apiData?.response[0].total_expense);

    return <Card className="shadow-lg rounded-lg bg-white p-4">
    <CardHeader className="border-b mb-4">
      <CardTitle className="text-xl font-semibold text-gray-800">This Month</CardTitle>
    </CardHeader>
    <CardContent className="flex justify-between items-center">
      <div className="flex flex-col">
        <span className="font-bold text-lg text-red-500">
          Expense: <span className="text-2xl">{apiData?.response[0].total_expense}</span>
        </span>
        <span className="font-bold text-lg text-green-500">
          Income: <span className="text-2xl">{apiData?.response[0].total_income}</span>
        </span>
      </div>
      <div className="flex flex-col text-right">
        <span className="font-semibold text-lg text-gray-700">Balance:</span>
        <span className={`text-2xl font-bold ${balance < 0 ? 'text-red-500' : 'text-green-500'}`}>{balance}</span>
      </div>
    </CardContent>
  </Card>
  
}
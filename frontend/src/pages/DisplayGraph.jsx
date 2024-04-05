import { useState, useEffect } from "react"
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(
    ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement
);

export function DisplayGraph() {

    const [categoryWise, setCategoryWise] = useState([]);
    const [dateWiseExpense, setDateWiseExpense] = useState([]);
    const [dateWiseIncome, setDateWiseIncome] = useState([]);
    let pieData = [],  tempBarExpense = [], barExpense = [], tempBarIncome = [], barIncome = [];
    const color = ["#faedcb", "#c9e4de", "#c6def1", "#dbcdf0", "#f2c6de", "#f7d9c4", "#ffadad", "#ffd6a5", "#fdffb6"];
    let i = 0;

    useEffect(() => {
        async function showCategoryWiseExpense() {
            const response = await axios.get("http://localhost:3000/showBy/category", {
                headers: {
                    authorization: "Bearer " + localStorage.getItem("Token")
                }
            });
            setCategoryWise(response.data.categoryWise.rows);
        }
        showCategoryWiseExpense();
    }, [])

    useEffect(() => {
        async function showDateWiseExpense() {
            const response = await axios.get("http://localhost:3000/showBy/last7Days", {
                headers: {
                    authorization: "Bearer " + localStorage.getItem("Token")
                }
            });
            setDateWiseExpense(response.data.dateWiseExpense.rows);
            setDateWiseIncome(response.data.dateWiseIncome.rows);
        }
        showDateWiseExpense();
    }, [])

    for (let i = 0; i < categoryWise.length; i++) {
        pieData.push({
            name: categoryWise[i].category,
            amount: categoryWise[i].total_expense,
        });
    }

    for (let i = 0; i < dateWiseExpense.length; i++) {
        tempBarExpense.push({
            date: dateWiseExpense[i].date.slice(0, 10),
            amount: dateWiseExpense[i].total_expense
        })
    }

    for(let i=0; i < dateWiseIncome.length; i++){
        tempBarIncome.push({
            date: dateWiseIncome[i].date.slice(0, 10),
            amount: dateWiseIncome[i].total_income
        })
    }

    

    for (let i = 6; i >= 0; i--) {
        let today = new Date();
        let yesterday = new Date(today);
        yesterday.setDate(today.getDate() - i);
        let formattedDate = yesterday.toISOString().split('T')[0];
        barExpense.push({
            date: formattedDate,
            amount: 0,
        })
        barIncome.push({
            date: formattedDate,
            amount: 0,
        })
    }

    

    for (let i = 0; i < tempBarExpense.length; i++) {
        for (let j = 0; j < barExpense.length; j++) {
            if (barExpense[j].date == tempBarExpense [i].date) {
                barExpense[j].amount = tempBarExpense [i].amount
            }
        }
    }

    for (let i = 0; i < tempBarIncome.length; i++) {
        for (let j = 0; j < barIncome.length; j++) {
            if (barIncome[j].date == tempBarIncome [i].date) {
                barIncome[j].amount = tempBarIncome [i].amount
            }
        }
    }

    console.log(tempBarIncome)
    console.log(barIncome)

    return <div>
        <div className="w-full flex justify-center py-2">
            <h1 className="font-bold font-mono text-5xl text-blue-500">Analytics</h1>
        </div>
        <div className="w-full flex justify-evenly items-center p-5">
            <div className="bg-slate-200 flex flex-col justify-center shadow-lg rounded-lg w-full md:w-1/4 p-2">
                <div>
                    <h1 className="font-bold text-3xl font-mono">Category Wise Expense</h1>
                </div>
                {pieData ?
                    (
                        <Doughnut
                            data={{
                                datasets: [{
                                    data: pieData.map(data => data.amount),
                                    backgroundColor: color,
                                }]
                            }}
                        />
                    ) : (
                        <div>
                            No Data
                        </div>
                    )
                }
                <table className="my-5">
                    <thead>
                        <tr className="border-2 border-black">
                            <th className="text-center font-bold font-mono text-xl border-2 border-black">Index</th>
                            <th className="text-center font-bold font-mono text-xl border-2 border-black">Category</th>
                            <th className="text-center font-bold font-mono text-xl border-2 border-black">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categoryWise.map(category =>
                            <tr key={category.category} className="border-2 border-black">
                                <td className="text-center font-bold font-mono text-xl border-2 border-black"> <div className="h-5 w-5 m-auto" style={{ backgroundColor: color[i++] }}></div></td>
                                <td className="text-center font-bold font-mono text-xl border-2 border-black"> {category.category} </td>
                                <td className="text-center font-bold font-mono text-xl border-2 border-black"> {category.total_expense} </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="bg-slate-200 flex flex-col justify-center items-center shadow-lg rounded-lg w-full md:w-3/5 p-2">
                <div>
                    <h1 className="font-bold text-3xl font-mono">Last 7 days</h1>
                </div>
                {barExpense ?
                    (
                        <Bar
                            data={{
                                labels: barExpense.map(data => data.date),
                                datasets: [
                                    {
                                        label: "Expense",
                                        data: barExpense.map(data => data.amount),
                                        backgroundColor: "#f2c6de"
                                    },
                                    {
                                        label: "Income",
                                        data: barIncome.map(data => data.amount),
                                        backgroundColor: "#ffadad"
                                    }
                                ]
                            }}
                        />
                    ) : (
                        <div> No data </div>
                    )
                }
            </div>
        </div>

    </div>
}
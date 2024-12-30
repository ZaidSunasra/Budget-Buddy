import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { getData } from "@/hooks/useAPI"
import { baseURL } from "@/types"

const chartConfig = {
    total_expense: {
        label: "Expense",
        color: "hsl(var(--chart-1))",
    },
    total_income: {
        label: "Income",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

export function YearlyChart() {

    const {apiData} = getData({
        url: `${baseURL}/analytics/yearly`
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Bar Chart - Multiple</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={apiData?.response}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <Bar dataKey="total_expense" fill="var(--color-total_expense)" radius={4} />
                        <Bar dataKey="total_income" fill="var(--color-total_income)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
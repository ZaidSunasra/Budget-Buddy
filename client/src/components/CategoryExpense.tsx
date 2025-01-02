import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { getData } from '@/hooks/useAPI';
import { baseURL } from '@/types';

const chartConfig = {
  total_amount: {
    label: 'Amount',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function CategoryExpense() {
  const { apiData } = getData({
    url: `${baseURL}/analytics/byCategory`,
  });

  const data = apiData?.response || [];
  const maxValue = Math.max(
    ...data.map((item: any) => parseFloat(item.total_amount)),
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Category-wise Expense Breakdown</CardTitle>
          <CardDescription>
            Visualizing expenses distributed across various categories for
            better financial insights.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[200px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={apiData?.response}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                return `${value[0].toUpperCase()}${value.slice(1)}`;
              }}
            />
            <YAxis domain={[0, Math.ceil(maxValue * 1.1)]} />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="total_amount"
                  labelFormatter={(value) => {
                    return `${value[0].toUpperCase()}${value.slice(1)}`;
                  }}
                />
              }
            />
            <Bar
              dataKey="total_amount"
              fill="var(--color-total_amount)"
              barSize={20}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

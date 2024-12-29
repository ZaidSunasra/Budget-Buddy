import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
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

  return (
    <Card className="w-1/2">
      <CardHeader>
        <CardTitle>Category-wise Expense Breakdown</CardTitle>
        <CardDescription>
          Visualizing expenses distributed across various categories for better
          financial insights.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={apiData?.response}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar
              dataKey="total_amount"
              fill="var(--color-total_amount)"
              radius={8}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

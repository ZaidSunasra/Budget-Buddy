import { getData } from '@/hooks/useAPI';
import { baseURL } from '@/types';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
  total_expenses: {
    label: 'Expense',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function MonthlyChart() {
  const { apiData, isLoading } = getData({
    url: `${baseURL}/analytics/monthly`,
  });

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Daily Expense Overview</CardTitle>
          <CardDescription>
            This chart represents the daily total expenses for the current
            month, providing a clear view of your spending patterns over time.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center font-bold font-mono">
            Fetching data
          </div>
        ) : (
          ''
        )}
        <ChartContainer
          config={chartConfig}
          className="h-[250px] w-full"
        >
          <AreaChart data={apiData?.response} accessibilityLayer>
            <defs>
              <linearGradient id="fillExpense" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-total_expenses)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-total_expenses)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="transaction_date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: '2-digit',
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  nameKey="total_expenses"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: '2-digit',
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="total_expenses"
              type="natural"
              fill="url(#fillExpense)"
              stroke="var(--color-total_expenses)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}


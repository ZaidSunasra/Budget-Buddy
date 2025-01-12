import { CategoryExpense } from '@/components/CategoryExpense';
import { CurrentMonth } from '@/components/CurrentMonth';
import { MonthlyChart } from '@/components/MonthlyExpense';
import { SideBar } from '@/components/SideBar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { YearlyChart } from '@/components/YearlyExpense';
import { useTheme } from '@/context/theme';

function Analytics() {
  const { theme } = useTheme();
  return (
    <div className={`flex w-screen font-mono ${theme}`}>
      <SideBar />
      <SidebarTrigger />
      <div className="w-full p-4 bg-background text-primary">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-6 lg:grid-rows-2 lg:gap-4">
          <div className="col-span-1 lg:col-span-2">
            <CurrentMonth />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <MonthlyChart />
          </div>
          <div className="col-span-1 lg:col-span-3">
            <YearlyChart />
          </div>
          <div className="col-span-1 lg:col-span-3">
            <CategoryExpense />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;

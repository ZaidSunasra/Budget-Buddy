import { CategoryExpense } from '@/components/CategoryExpense';
import { MonthlyChart } from '@/components/MonthlyExpenseChart';
import { SideBar } from '@/components/SideBar';
import { SidebarTrigger } from '@/components/ui/sidebar';

function Analytics() {
  return (
    <div className="flex w-screen">
      <SideBar />
      <SidebarTrigger />
      <div className="w-full p-4">
        <div className="w-full">Monthly expense balnce income aayega</div>
        <div className="w-full">
          <MonthlyChart />
          <CategoryExpense />
        </div>
      </div>
    </div>
  );
}

export default Analytics;

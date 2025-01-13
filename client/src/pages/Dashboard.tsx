import { TransactionTable } from '@/components/TransactionTable';
import { SideBar } from '@/components/SideBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Plus } from 'lucide-react';
import { Loading } from '@/components/Loading';
import { toast } from 'sonner';
import { getData } from '@/hooks/useAPI';
import { baseURL } from '@/types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useTheme } from '@/context/theme';

function Dashboard() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const { apiData, isLoading, serverError, refetch } = getData({
    url: `${baseURL}/expense/get`,
  });

  const debouncedSearchResults = useDebounce(searchValue) || null;

  if (isLoading) {
    return <Loading />;
  }

  if (serverError) {
    toast(serverError.msg);
  }

  return (
    <div className={`flex w-screen font-mono ${theme} `}>
      <SideBar />
      <SidebarTrigger />
      <div className="w-full p-4 bg-background text-primary max-w-full overflow-auto">
        <div className="flex gap-5 mb-8 flex-col-reverse lg:flex-row">
          <Input
            placeholder="Search expenses"
            className="lg:w-3/4"
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button
            className="lg:w-1/4 text-secondary flex gap-5"
            onClick={() => navigate('/addTransaction')}
          >
            <Plus /> Add Transaction
          </Button>
        </div>
        <div className="max-h-[85vh] overflow-y-auto border-2 border-gray-200 rounded-lg">
          <TransactionTable
            data={debouncedSearchResults || apiData}
            message={
              debouncedSearchResults
                ? "It seems we couldn't find anything that matches your search."
                : "Looks like you haven't added any expenses yet. Start by adding your first one!"
            }
            onDelete={refetch}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

import { useTheme } from '@/context/theme';
import { Skeleton } from './ui/skeleton';

export function Loading() {
  const { theme } = useTheme();

  return (
    <div className={`w-screen h-screen bg-background ${theme}`}>
      <div className=" flex">
        <div>
          <Skeleton className="h-screen w-64" />
        </div>
        <div className="w-full ml-7 p-4">
          <div className="flex gap-5 mb-8">
            <Skeleton className="w-4/5 h-10" />
            <Skeleton className="w-1/5 text-secondary flex gap-5 h-10" />
          </div>
          <div className="grid grid-cols-12 w-full gap-2">
            <Skeleton className="col-span-1 h-20" />
            <Skeleton className="col-span-4 h-20" />
            <Skeleton className="col-span-2 h-20" />
            <Skeleton className="col-span-1 h-20" />
            <Skeleton className="col-span-2 h-20" />
            <Skeleton className="col-span-2 h-20" />
            <Skeleton className="col-span-1 h-20" />
            <Skeleton className="col-span-4 h-20" />
            <Skeleton className="col-span-2 h-20" />
            <Skeleton className="col-span-1 h-20" />
            <Skeleton className="col-span-2 h-20" />
            <Skeleton className="col-span-2 h-20" />
            <Skeleton className="col-span-1 h-20" />
            <Skeleton className="col-span-4 h-20" />
            <Skeleton className="col-span-2 h-20" />
            <Skeleton className="col-span-1 h-20" />
            <Skeleton className="col-span-2 h-20" />
            <Skeleton className="col-span-2 h-20" />
            <Skeleton className="col-span-1 h-20" />
            <Skeleton className="col-span-4 h-20" />
            <Skeleton className="col-span-2 h-20" />
            <Skeleton className="col-span-1 h-20" />
            <Skeleton className="col-span-2 h-20" />
            <Skeleton className="col-span-2 h-20" />
            <Skeleton className="col-span-1 h-20" />
            <Skeleton className="col-span-4 h-20" />
            <Skeleton className="col-span-2 h-20" />
            <Skeleton className="col-span-1 h-20" />
            <Skeleton className="col-span-2 h-20" />
            <Skeleton className="col-span-2 h-20" />
            <Skeleton className="col-span-1 h-20" />
            <Skeleton className="col-span-4 h-20" />
            <Skeleton className="col-span-2 h-20" />
            <Skeleton className="col-span-1 h-20" />
            <Skeleton className="col-span-2 h-20" />
            <Skeleton className="col-span-2 h-20" />
            <Skeleton className="col-span-1 h-20" />
            <Skeleton className="col-span-4 h-20" />
            <Skeleton className="col-span-2 h-20" />
            <Skeleton className="col-span-1 h-20" />
            <Skeleton className="col-span-2 h-20" />
            <Skeleton className="col-span-2 h-20" />
          </div>
        </div>
      </div>
    </div>
  );
}

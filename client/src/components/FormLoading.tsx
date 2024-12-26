import { Skeleton } from "./ui/skeleton";

export function FormLoading() {
    return <div className="w-screen h-screen flex justify-center items-center">
        <div className="w-1/3 p-8 border-primary border rounded-2xl shadow-2xl ">
            <Skeleton className="mb-4 mx-auto w-3/5 h-10" />
            <div className="mb-4">
                <Skeleton className="w-1/3 h-7 mb-1" />
                <Skeleton className="w-full h-7" />
            </div>
            <div className="mb-4">
                <Skeleton className="w-1/3 h-7 mb-1" />
                <Skeleton className="w-full h-7" />
            </div>
            <div className="mb-4">
                <Skeleton className="w-1/3 h-7 mb-1" />
                <Skeleton className="w-full h-7" />
            </div>
            <div className="mb-4">
                <Skeleton className="w-1/3 h-7 mb-1" />
                <Skeleton className="w-full h-7" />
            </div>
            <div className="mb-4">
                <Skeleton className="w-full h-10 mb-1" />
            </div>
        </div>
    </div>
}
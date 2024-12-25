import { ErrorMessage } from "@/components/ErrorMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getData, postData } from "@/hooks/useAPI";
import { baseURL, expenseInput } from "@/types";
import { Label } from "@radix-ui/react-label";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";


function EditTransaction() {

    const navigate = useNavigate();
    const id = useParams();
    const { handleSubmit, register, formState: { errors, isSubmitting }, reset } = useForm<expenseInput>();

    const { apiData: getApiData, serverError: getServerError, isLoading: getLoading} = getData({
        url: `${baseURL}/expense/get/${id.id}`
    });
    const { fetchData, apiData: postApiData, serverError: postServerError, isLoading: postLoading } = postData();
  
    const onSubmit: SubmitHandler<expenseInput> = async (data) => {
        await fetchData({
            url: `${baseURL}/expense/edit/${id.id}`,
            payload: {
                title: data.title,
                type: data.type,
                amount: data.amount,
                category: data.category
            },
            method: "PUT"
        });
    };

    useEffect(() => {
        reset({
            title: getApiData?.expense[0].title || "",
            type: getApiData?.expense[0].type || "",
            amount: getApiData?.expense[0].amount || 0,
            category: getApiData?.expense[0].category || "",
        })
    }, [getApiData, reset])

    if (getServerError) {
        toast(getServerError.msg)
    }

    useEffect(() => {
        if (postApiData) {
            toast(postApiData.msg);
            navigate("/dashboard");
        } else if (postServerError) {
            toast(postServerError.msg);
        }
    }, [postApiData, postServerError])

    return <div className="w-screen h-screen flex justify-center items-center font-mono">
        <form onSubmit={handleSubmit(onSubmit)} className="w-1/3 p-8 border-primary border rounded-2xl bg-accent shadow-2xl ">
            <h3 className="text-center text-2xl mb-4 font-bold"> Edit Transaction </h3>
            <div className="mb-4">
                <Label> Title</Label>
                <Input  {...register("title",
                    {
                        maxLength: { value: 100, message: "Title should not exceed 100 letters" },
                        required: { value: true, message: "Title cannot be empty" }
                    }
                )} />
                {errors.title && <ErrorMessage message={errors.title.message} />}
            </div>
            <div className="mb-4">
                <Label> Category </Label>
                <Input  {...register("category",
                    {
                        maxLength: { value: 30, message: "Category should not exceed 30 letters" },
                        required: { value: true, message: "Category cannot be empty" }
                    }
                )} />
                {errors.category && <ErrorMessage message={errors.category.message} />}
            </div>
            <div className="mb-4">
                <Label> Type</Label>
                <select className="w-full px-3 py-2 h-9" {...register("type",
                    {
                        required: { value: true, message: "Category cannot be empty" }
                    }
                )}>
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </select>
            </div>
            <div className="mb-4">
                <Label> Amount </Label>
                <Input  {...register("amount",
                    {
                        max: { value: 999999, message: "Amount should be less than 999999" },
                        required: { value: true, message: "Amount cannot be empty" }
                    }
                )} type="number" min={0} max={999999} />
                {errors.amount && <ErrorMessage message={errors.amount.message} />}
            </div>
            <Button className="w-full" disabled={isSubmitting}> {postLoading ? "Editing Transaction" : "Edit Transaction"} </Button>
        </form>
    </div>
}

export default EditTransaction;
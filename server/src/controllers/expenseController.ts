import z from 'zod';
import { Request, Response } from 'express';
import { addExpense, deleteExpense, editExpense, getExpense, getExpenseById, searchExpense } from '../services/expenseService';

const addExpenseSchema = z.object({
    title: z.string(),
    type: z.enum(['expense', 'income']),
    transaction_time: z.coerce.date(),
    category:z.string(),
    amount: z.coerce.number()
});

export const addExpenseController = async (req: Request, res: Response): Promise<any> => {

    const { title, type, transaction_time, amount, category} = req.body;
    const id = res.locals.id;

    const zodValidation = addExpenseSchema.safeParse(req.body);

    if (!zodValidation.success) {
        return res.status(400).json({
            msg: "Incorrect data format",
            error: zodValidation.error.errors,
        })
    }

    try {
        await addExpense({ title, type, transaction_time, amount, category}, id);
        return res.status(201).json({
            msg: "Expense added successfully",
        });

    } catch (error) {
        console.log("Error in adding expense: ", error);
        return res.status(500).send({
            msg: "Internal server error",
        });
    }
}

export const getExpenseController = async (req: Request, res: Response) : Promise<any>=> {

    try {
        const response = await getExpense(res.locals.id);
        return res.status(200).json({
           expenses: response
        });

    } catch (error) {
        console.log("Error in getting expense: ", error);
        return res.status(500).send({
            msg: "Internal server error",
        });
    }
}

export const getExpenseByIdController = async (req: Request, res: Response) : Promise<any> => {

    const id = req.params.id;

    try {
        const response = await getExpenseById(id);
        return res.status(200).json({
           expense: response
        });
        
    } catch (error) {
        console.log("Error in getting expense with ID: " + id + " " + error);
        return res.status(500).send({
            msg: "Internal server error",
        }); 
    }
}

const editExpenseSchema = z.object({
    title: z.string(),
    type: z.enum(['expense', 'income']),
    amount: z.coerce.number(),
    category: z.string()
});

export const editExpenseController = async (req: Request, res: Response) : Promise<any> => {

    const {title, type, amount, category} = req.body;
    const id = req.params.id

    const zodValidation = editExpenseSchema.safeParse(req.body);

    if (!zodValidation.success) {
        return res.status(400).json({
            msg: "Incorrect data format",
            error: zodValidation.error.errors,
        })
    }

    try {
        await editExpense({ title, type, amount, category}, id);
        return res.status(201).json({
            msg: "Expense edited successfully",
        });

    } catch (error) {
        console.log("Error in editing expense: ", error);
        return res.status(500).send({
            msg: "Internal server error",
        });
    }
}

export const deleteExpenseController = async (req: Request, res: Response) : Promise<any> => {

    const id = req.params.id;

    try {
        await deleteExpense(id);
        return res.status(201).json({
            msg: "Expense deleted successfully",
        });

    } catch (error) {
        console.log("Error in deleting expense: ", error);
        return res.status(500).send({
            msg: "Internal server error",
        });
    }
}

export const searchExpenseController = async(req: Request, res: Response) : Promise<any>=> {

    const searchValue : any = req.query.value;
    const id = res.locals.id

    try {
        const response = await searchExpense(searchValue, id)
        return res.status(201).json({
            expenses: response,
        });
    } catch (error) {
        console.log("Error in deleting expense: ", error);
        return res.status(500).send({
            msg: "Internal server error",
        });
    }
}
import { db } from "../db/db"
import { addTransaction, editTransaction } from "../types/types";

export const addExpense = async ({title, type, transaction_time, amount}: addTransaction, id:number) : Promise<void> => {
    await db.query("INSERT INTO expenses(title, type, transaction_time, amount, user_id) VALUES($1,$2, $3, $4, $5)", 
        [title, type, transaction_time, amount, id]);
}

export const getExpense = async (id: string) : Promise<any> => {
    const query = await db.query("SELECT * FROM expenses WHERE user_id = $1", [id]);
    return query.rows;
}

export const getExpenseById = async (id: string) : Promise<any> => {
    const query = await db.query("SELECT * FROM expenses WHERE transaction_id = $1", [id]);
    return query.rows;
}

export const editExpense = async ({ title, type, amount} : editTransaction, id:string) : Promise<void> => {
    await db.query("UPDATE expenses SET title=$1, type=$2, amount=$3 WHERE transaction_id=$4", [title, type, amount, id]);
}

export const deleteExpense = async (id:string) : Promise<void> => {
    await db.query("DELETE FROM expenses WHERE transaction_id=$1", [id]);
}
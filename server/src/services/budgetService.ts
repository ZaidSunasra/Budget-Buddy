import { db } from "../db/db"
import { addBudgetBody, editBudgetBody } from "../types/types";

export const getBudget = async (id: string) : Promise<any> => {
    const query = await db.query(`SELECT 
        b.id,
        b.category,
        b.allocated_value,
        COALESCE(SUM(e.amount), 0) AS total_expense
    FROM 
        user_budgets b
    LEFT JOIN 
        expenses e
    ON 
        b.user_id = e.user_id 
        AND b.category = e.category 
        AND e.transaction_time >= DATE_TRUNC('month', CURRENT_DATE) 
        AND e.transaction_time < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month'
    WHERE 
        b.user_id = $1 
    GROUP BY 
        b.id, b.category, b.allocated_value;`, 
        [id]
    );
    return query.rows;
}

export const addBudget = async ({allocated_value, category}: addBudgetBody, id:string) : Promise<void> => {
    await db.query('INSERT INTO user_budgets(category, allocated_value, user_id) VALUES($1, $2, $3)', [category, allocated_value, id]);
} 

export const editBudget = async ({allocated_value }: editBudgetBody, id:string) : Promise<void> => {
    await db.query('UPDATE user_budgets SET allocated_value=$1 WHERE id=$2', [allocated_value, id]);
} 

export const deleteBudget = async (id:string) : Promise<void> => {
    await db.query("DELETE FROM user_budgets WHERE id=$1", [id]);
} 
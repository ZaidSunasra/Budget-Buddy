import { db } from "../db/db"

export const sortByCategory = async (id: string): Promise<any> => {
    const query = await db.query(`
        SELECT 
            category, 
            SUM(amount) AS total_amount
        FROM 
            expenses
        WHERE 
            user_id = $1
            AND EXTRACT(MONTH FROM transaction_time) = EXTRACT(MONTH FROM CURRENT_DATE)
            AND EXTRACT(YEAR FROM transaction_time) = EXTRACT(YEAR FROM CURRENT_DATE)
            AND type = 'expense'
        GROUP BY 
            category;`, 
        [id]
    );
    return query.rows;
}

export const monthlyData = async (id: string): Promise<any> => {
    const query = await db.query(`
        WITH date_series AS (
            SELECT 
                generate_series(
                    DATE_TRUNC('month', CURRENT_DATE),  
                    DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month' - INTERVAL '1 day',  
                    '1 day'::interval  
                )
            ::date AS transaction_date
        )
        SELECT 
            ds.transaction_date,
            COALESCE(SUM(e.amount), 0) AS total_expenses
        FROM 
            date_series ds
        LEFT JOIN 
            expenses e ON DATE(e.transaction_time) = ds.transaction_date
            AND e.type = 'expense' 
            AND e.user_id = $1      
        GROUP BY 
            ds.transaction_date
        ORDER BY 
            ds.transaction_date;`,
        [id]
    );
    return query.rows;
}
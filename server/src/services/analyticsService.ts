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

export const yearlyData = async(id: string) : Promise<any> => {
    const query = await db.query(`
        WITH months AS (
            SELECT 
                generate_series(
                    DATE_TRUNC('year', CURRENT_DATE), 
                    DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year' - INTERVAL '1 month', 
                    '1 month'::interval
                )
            ::date AS month_start
        )
        SELECT 
            TO_CHAR(m.month_start, 'Mon') AS month,
            COALESCE(SUM(CASE WHEN e.type = 'expense' THEN e.amount ELSE 0 END), 0) AS total_expense,
            COALESCE(SUM(CASE WHEN e.type = 'income' THEN e.amount ELSE 0 END), 0) AS total_income
        FROM 
            months m
        LEFT JOIN 
            expenses e ON DATE_TRUNC('month', e.transaction_time) = m.month_start
            AND e.user_id = $1
        GROUP BY 
            m.month_start
        ORDER BY 
            m.month_start;`,    
        [id]
    );
    return query.rows;
}

export const currrentMonth = async(id: string) : Promise<any> => {
    const query = await db.query(`
        SELECT
            SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense,
            SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income
        FROM
            expenses
        WHERE
            EXTRACT(MONTH FROM transaction_time) = EXTRACT(MONTH FROM CURRENT_DATE)
            AND EXTRACT(YEAR FROM transaction_time) = EXTRACT(YEAR FROM CURRENT_DATE)
            AND user_id = $1; `,
        [id]
    );
    return query.rows;
}



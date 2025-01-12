import { db } from "../db/db";
import { addTransaction, editTransaction } from "../types/types";

export const addExpense = async (
  { title, type, transaction_time, amount, category }: addTransaction,
  id: string,
): Promise<void> => {
  await db.query(
    "INSERT INTO expenses(title, type, transaction_time, amount, user_id, category) VALUES($1,$2, $3, $4, $5, $6)",
    [title, type, transaction_time, amount, id, category],
  );
};

export const getExpense = async (id: string): Promise<any> => {
  const query = await db.query(
    "SELECT * FROM expenses WHERE user_id = $1 ORDER BY transaction_time DESC",
    [id],
  );
  return query.rows;
};

export const getExpenseById = async (id: string): Promise<any> => {
  const query = await db.query("SELECT * FROM expenses WHERE id = $1", [id]);
  return query.rows;
};

export const editExpense = async (
  { title, type, amount, category }: editTransaction,
  id: string,
): Promise<void> => {
  await db.query(
    "UPDATE expenses SET title=$1, type=$2, amount=$3, category=$4 WHERE id=$5",
    [title, type, amount, category, id],
  );
};

export const deleteExpense = async (id: string): Promise<void> => {
  await db.query("DELETE FROM expenses WHERE id=$1", [id]);
};

export const searchExpense = async (value: any, id: String): Promise<any> => {
  console.log(id);
  const query = await db.query(
    "SELECT * FROM expenses WHERE title ILIKE $1 OR category ILIKE $1 AND user_id=$2",
    [`%${value}%`, id],
  );
  return query.rows;
};

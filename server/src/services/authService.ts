import { SignIn } from "../types/types";
import { db } from "../db/db";
import bcrypt from "bcrypt";

export const findExistingUser = async (email: string): Promise<any> => {
  const query = await db.query("SELECT * FROM users WHERE email=$1", [email]);
  return query.rows;
};

export const addNewUser = async ({
  email,
  password,
  firstName,
  lastName,
}: SignIn): Promise<void> => {
  const hashedPassword = await hashPassword(password);
  await db.query(
    "INSERT INTO users(email, password, first_name, last_name) VALUES ($1, $2, $3, $4)",
    [email, hashedPassword, firstName, lastName],
  );
};

const hashPassword = async (password: string): Promise<string> => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  const compare = await bcrypt.compare(password, hashedPassword);
  return compare;
};

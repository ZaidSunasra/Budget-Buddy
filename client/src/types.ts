export type loginInput = {
  email: string;
  password: string;
};

export type expenseInput = {
  id: string;
  transaction_time: string;
  title: string;
  category: string;
  type: string;
  amount: string;
};

export type signupInput = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type userDetail = {
  firstName: string;
  lastName: string;
  email: string;
};

export type addCategory = {
  category: string;
  allocated_value: string;
};

export type editCategory = {
  category: string;
  allocated_value: string;
};

export type ThemeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

export const baseURL = import.meta.env.VITE_BASE_API;

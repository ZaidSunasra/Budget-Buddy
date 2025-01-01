export type SignIn = {
    email: string,
    password: string,
    firstName: string,
    lastName: string
}

export type SignUp = {
    email: string,
    password: string,
}

export type addTransaction = {
    title: string,
    type: string,
    transaction_time: string,
    amount: string,
    category: string
}

export type editTransaction = {
    title: string,
    type: string,
    amount: string,
    category: string
}

export type addBudgetBody = {
    category: string,
    allocated_value: string
}

export type editBudgetBody = {
    allocated_value: string
}
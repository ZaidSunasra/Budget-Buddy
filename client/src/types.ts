export type loginInput = {
    email: string,
    password: string
}

export type signupInput = {
    email: string,
    password: string,
    firstName: string,
    lastName: string
}

export const baseURL = import.meta.env.VITE_BASE_API;
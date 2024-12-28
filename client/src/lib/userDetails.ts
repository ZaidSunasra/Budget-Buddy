import { userDetail } from "@/types";

export const setUser = (userData: userDetail) => {
    localStorage.setItem("User", JSON.stringify(userData));
}

export const getUser = () => {
    const details = localStorage.getItem("User");
    return details ? JSON.parse(details) : null;
}

export const clearUser = () => {
    localStorage.removeItem("User");
}
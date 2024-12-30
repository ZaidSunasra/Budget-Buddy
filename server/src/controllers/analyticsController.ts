import { Request, Response } from "express";
import { currrentMonth, monthlyData, sortByCategory, yearlyData } from "../services/analyticsService";

export const sortByCategoryController = async (req: Request, res: Response) : Promise<any> => {
    const id = res.locals.id;
    try {
        const response = await  sortByCategory(id);
        return res.status(201).json({
           response: response
        });
    } catch (error) {
        console.log("Sort by Category: ", error);
        return res.status(500).send({
            msg: "Internal server error",
        });
    }
}

export const monthlyAnalyticsController = async(req: Request, res: Response) : Promise<any> => {

    const id = res.locals.id;
    try {
        const response = await monthlyData(id);
        return res.status(201).json({
            response: response
        })
    } catch (error) {
        console.log("Monthly data: ", error);
        return res.status(500).send({
            msg: "Internal server error",
        });
    }
}

export const yearlyAnalyticsController = async(req: Request, res: Response) : Promise<any> => {

    const id = res.locals.id;
    try {
        const response = await yearlyData(id);
        return res.status(201).json({
            response: response
        })
    } catch (error) {
        console.log("Yearly data: ", error);
        return res.status(500).send({
            msg: "Internal server error",
        });
    }
}

export const currentMonthAnalysisController = async(req: Request, res: Response) : Promise<any> => {

    const id = res.locals.id;
    try {
        const response = await currrentMonth(id);
        return res.status(201).json({
            response: response
        })
    } catch (error) {
        console.log("Current Month: ", error);
        return res.status(500).send({
            msg: "Internal server error",
        });
    }
}
import { Request, Response } from "express";
import {
  addBudget,
  deleteBudget,
  editBudget,
  getBudget,
} from "../services/budgetService";
import z from "zod";

export const getBudgetController = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const id = res.locals.id;
  try {
    const response = await getBudget(id);
    return res.status(201).json({
      response,
    });
  } catch (error) {
    console.log("Error in getting budgets: ", error);
    return res.status(500).send({
      msg: "Internal server error",
    });
  }
};

const addBudgetSchema = z.object({
  category: z.string(),
  allocated_value: z.coerce.number(),
});

export const addBudgetController = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const id = res.locals.id;
  const { category, allocated_value } = req.body;
  const zodValidation = addBudgetSchema.safeParse(req.body);

  if (!zodValidation.success) {
    return res.status(400).json({
      msg: "Incorrect data format",
      error: zodValidation.error.errors,
    });
  }

  try {
    await addBudget({ category, allocated_value }, id);
    return res.status(201).json({
      msg: "Category added successfully.",
    });
  } catch (error) {
    console.log("Error in adding category: ", error);
    return res.status(500).send({
      msg: "Internal server error",
    });
  }
};

const editBudgetSchema = z.object({
  allocated_value: z.coerce.number(),
});

export const editBudgetController = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const id = req.params.id;
  const { allocated_value } = req.body;
  const zodValidation = editBudgetSchema.safeParse(req.body);

  if (!zodValidation.success) {
    return res.status(400).json({
      msg: "Incorrect data format",
      error: zodValidation.error.errors,
    });
  }

  try {
    await editBudget({ allocated_value }, id);
    return res.status(201).json({
      msg: "Category edited successfully.",
    });
  } catch (error) {
    console.log("Error in editing budget: ", error);
    return res.status(500).send({
      msg: "Internal server error",
    });
  }
};

export const deleteBudgetController = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const id = req.params.id;
  try {
    await deleteBudget(id);
    return res.status(201).json({
      msg: "Category deleted successfully.",
    });
  } catch (error) {
    console.log("Error in deleting budget: ", error);
    return res.status(500).send({
      msg: "Internal server error",
    });
  }
};

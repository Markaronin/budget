import { Budget, Expense } from "../model";

export type CreateBudgetRequest = Omit<Budget, "id" | "users">;
export type UpdateBudgetRequest = Partial<Omit<Budget, "id">>;

export type CreateExpenseRequest = Omit<Expense, "id">;
export type UpdateExpenseRequest = Omit<Expense, "id">;

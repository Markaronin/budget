import { Budget, CompleteExpense } from "../model";

export type CreateBudgetRequest = Omit<Budget, "id" | "users">;
export type UpdateBudgetRequest = Partial<Omit<Budget, "id">>;

export type CreateExpenseRequest = Omit<CompleteExpense, "id">;
export type UpdateExpenseRequest = Omit<CompleteExpense, "id">;

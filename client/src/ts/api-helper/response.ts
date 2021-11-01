import { Budget, Expense } from "../model";

export interface UnsuccessfulResponse {
    success: false;
    reason: string;
}
export interface SuccessfulResponse {
    success: true;
}

export interface CreateBudgetResponse extends SuccessfulResponse {
    success: true;
    id: string;
}
export interface ListBudgetsResponse extends SuccessfulResponse {
    success: true;
    budgets: Budget[];
}
export interface UpdateBudgetResponse extends SuccessfulResponse {
    success: true;
}
export interface DeleteBudgetResponse extends SuccessfulResponse {
    success: true;
}

export interface CreateExpenseResponse extends SuccessfulResponse {
    success: true;
    id: string;
}
export interface ListExpensesResponse extends SuccessfulResponse {
    success: true;
    expenses: Expense[];
}
export interface UpdateExpenseResponse extends SuccessfulResponse {
    success: true;
}
export interface DeleteExpenseResponse extends SuccessfulResponse {
    success: true;
}

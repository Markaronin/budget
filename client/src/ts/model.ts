import { notUndefined } from "@markaronin/jefferson-util";

export interface Budget {
    id: string;
    name: string;
    users: string[];
}

export interface Expense {
    id: string;
    name: string;
    to: string;
    from: string;
    type: number;
    amount: number;
}

export interface RecurringExpense extends Expense {
    type: 1;
    frequency: number;
    start: number;
    end?: number;
}
export interface ContinuousExpense extends Expense {
    type: 2;
    period: number;
    start: number;
    end?: number;
}
export interface ManualExpense extends Expense {
    type: 3;
    date: number;
}
export interface PercentExpense extends Expense {
    type: 4;
    start: number;
    end?: number;
}

export function getValueOfExpense(expenseId: string, budgets: Budget[], expenses: Expense[]): number {
    const expense = notUndefined(expenses.find((expense) => expense.id === expenseId));
    if (expense.type === 1) {
        return expense.amount;
    }
    // TODO - remove
    budgets;
    throw new Error(`No logic set up to get value for expense type ${expense.type}`);
}

export function getBalanceOfBudget(budgetId: string, budgets: Budget[], expenses: Expense[]): number {
    return (
        expenses
            .filter((expense) => expense.to === budgetId)
            .map((expense) => getValueOfExpense(expense.id, budgets, expenses))
            .reduce((prev, curr) => prev + curr, 0) -
        expenses
            .filter((expense) => expense.from === budgetId)
            .map((expense) => getValueOfExpense(expense.id, budgets, expenses))
            .reduce((prev, curr) => prev + curr, 0)
    );
}
